

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
export type About = {
    avatar: string;
    name: string;
    age: Date;
    job: string;
    stability: number;
    creativity: number;
    skills: Skills;
    description: string;
};