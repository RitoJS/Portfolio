import type { About } from "$lib/types/about";
export const aboutMock: About = {
    avatarDesktop: 'assets/imgs/home6.png',
    avatarMobile: 'assets/imgs/home2.png',
    name: 'Jordan Sama',
    age: new Date("1994-08-02"),
    job: 'Developpeur Web Front-End / Intégrateur Web',
    stability: 100,
    creativity: 80,
    skills: {
        front: [
            {
                name: 'HTML',
                bar: 100,
                icon: 'assets/icons/html.svg',
            },
                        {
                name: 'CSS',
                bar: 100,
                icon: 'assets/icons/css.svg',
            },
                        {
                name: 'Bootsraps',
                bar: 80,
                icon: 'assets/icons/bootstrap.svg',
            },
                        {
                name: 'JavaScript',
                bar: 80,
                icon: 'assets/icons/js.svg',
            },
                        {
                name: 'Tailwindcss',
                bar: 80,
                icon: 'assets/icons/tailwind.svg',
            },
                        {
                name: 'TypeScript',
                bar: 80,
                icon: 'assets/icons/typescript.svg',
            },
                        {
                name: 'Angular',
                bar: 70,
                icon: 'assets/icons/angular.svg',
            },
                        {
                name: 'React.js',
                bar: 40,
                icon: 'assets/icons/react.svg',
            },
                        {
                name: 'Next.js',
                bar: 65,
                icon: 'assets/icons/nextjs.svg',
            },
                        {
                name: 'Vue.js',
                bar: 80,
                icon: 'assets/icons/vue.svg',
            },
                        {
                name: 'jQuery',
                bar: 75,
                icon: 'assets/icons/jquery.svg',
            },
                        {
                name: 'Wordpress',
                bar: 70,
                icon: 'assets/icons/wordpress.svg',
            },
                        {
                name: 'Svelte',
                bar: 79,
                icon: 'assets/icons/svelte.svg',
            },

        ],
        back: [
            {
                name: 'php',
                bar: 65,
                icon: 'assets/icons/php.svg',
            },
                        {
                name: 'Symfony',
                bar: 40,
                icon: 'assets/icons/symfony.svg',
            },
                                    {
                name: 'SQL/Postgresql',
                bar: 45,
                icon: 'assets/icons/sql.svg',
            },
                                    {
                name: 'Node.js',
                bar: 40,
                icon: 'assets/icons/nodejs.svg',
            },
                                    {
                name: 'MongoDB',
                bar: 40,
                icon: 'assets/icons/mongodb.svg',
            },

                                    {
                name: 'Python',
                bar: 60,
                icon: 'assets/icons/python.svg',
            },
                                    {
                name: 'Django',
                bar: 60,
                icon: 'assets/icons/django.svg',
            },
        ],
        workflow: [
            {
                name: 'trello',
                bar: 80,
                icon:'assets/icons/trello.svg',
            },
                        {
                name: 'Git',
                bar: 80,
                icon:'assets/icons/git.svg',
            },
                        {
                name: 'AzureDevOps',
                bar: 60,
                icon:'assets/icons/azure-devops.svg',
            },
                        {
                name: 'AWS',
                bar: 30,
                icon:'assets/icons/aws.svg',
            },
        ],
        plugin: [
            {
                name: 'Photoshop',
                bar: 70,
                icon:'assets/icons/photoshop.svg',
            },
            
                        {
                name: 'Paint.NET',
                bar: 60,
                icon:'assets/icons/paint.svg',
            },
                        {
                name: 'Postman',
                bar: 65,
                icon:'assets/icons/postman.svg',
            },
                        {
                name: 'Figma',
                bar: 60,
                icon:'assets/icons/figma.svg',
            },
        ],
    },
    description: " Je suis Jordan, développeur front-end. Ce que je préfère, c’est le moment où une maquette devient une interface qui bouge. Chez Elap, j’ai conçu et intégré de zéro une web app de planning en Angular. Depuis, je me forme en continu sur React, Vue, Next.js et Svelte en construisant des projets réels. Ce portfolio, volontairement construit comme un menu de jeu vidéo, montre ma façon de travailler."
}