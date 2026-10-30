import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendContactEmail } from '$lib/server/email';

// Limite simple : 3 envois par adresse IP et par heure (en mémoire)
const hits = new Map<string, number[]>();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= LIMIT) return true;
    recent.push(now);
    hits.set(ip, recent);
    return false;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
    default: async ({ request, getClientAddress }) => {
        const form = await request.formData();

        // Piège à robots 
        if (form.get('website')) return { success: true };

        const nom = String(form.get('nom') ?? '').trim();
        const email = String(form.get('email') ?? '').trim();
        const sujet = String(form.get('sujet') ?? '').trim();
        const description = String(form.get('description') ?? '').trim();
        const values = { nom, email, sujet, description };

        const errors: Record<string, string> = {};
        if (nom.length < 2 || nom.length > 100) errors.nom = 'Indiquez votre nom (2 à 100 caractères).';
        if (!EMAIL.test(email) || email.length > 254) errors.email = 'Adresse e-mail invalide.';
        if (sujet.length < 3 || sujet.length > 150) errors.sujet = 'Sujet trop court ou trop long.';
        if (description.length < 10 || description.length > 5000) errors.description = 'Message trop court ou trop long.';
        if (Object.keys(errors).length) return fail(400, { errors, values });

        if (rateLimited(getClientAddress())) {
            return fail(429, { error: 'Trop de messages envoyés. Réessayez plus tard.', values });
        }

        const result = await sendContactEmail({ name: nom, email, subject: sujet, message: description });
        if (!result.ok) {
            return fail(500, { error: "L'envoi a échoué. Réessayez dans un instant.", values });
        }

        return { success: true };
    }
};