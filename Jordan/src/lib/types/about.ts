

type gauge = {
    name: string;
    bar: number;
    icon: string;
}
type Skills = {
    front: gauge[];
    back: gauge[];
    workflow: gauge[];
    plugin: gauge[];
}

type formation = {
    startDate: Date,
    endDate: Date,
    jobName: string,
    company: string,
    description: string,
    role: string,
}

export type About = {
    avatarDesktop: string;
    avatarMobile: string;
    name: string;
    age: Date;
    job: string;
    stability: number;
    creativity: number;
    skills: Skills;
    description: string;
    formations: formation[];
};