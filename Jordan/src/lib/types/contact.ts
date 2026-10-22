type ExternLink = {
    name: string;
    icon: string;
    link: string;
}
export type ContactPage = {
    mail: string;
    gitHub: string;
    cv: string;
    externLink: ExternLink[];
}

export type ContactForm = {
    from: string;
    to: string;
    name: string;
    subject: string;
    html: HTMLElement
}