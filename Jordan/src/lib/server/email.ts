import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

export interface ContactMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export type SendResult = { ok: true } | { ok: false; reason: 'config' | 'provider' };

const escapeHtml = (value: string) =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

export async function sendContactEmail({ name, email, subject, message }: ContactMessage): Promise<SendResult> {
    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;

    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
        console.error('[email] variables Resend manquantes');
        return { ok: false, reason: 'config' };
    }

    const resend = new Resend(RESEND_API_KEY);
    const safeName = oneLine(name);
    const safeSubject = oneLine(subject);

    try {
        const { error } = await resend.emails.send({
            from: CONTACT_FROM_EMAIL,
            to: [CONTACT_TO_EMAIL],
            replyTo: email,
            subject: `[Portfolio] ${safeSubject}`,
            text: `De : ${safeName} <${email}>\nSujet : ${safeSubject}\n\n${message}`,
            html: `<p><strong>De :</strong> ${escapeHtml(safeName)} &lt;${escapeHtml(email)}&gt;</p>
                   <p><strong>Sujet :</strong> ${escapeHtml(safeSubject)}</p>
                   <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
        });

        if (error) {
            console.error('[email] Resend :', error);
            return { ok: false, reason: 'provider' };
        }
        return { ok: true };
    } catch (err) {
        console.error('[email] exception :', err);
        return { ok: false, reason: 'provider' };
    }
}