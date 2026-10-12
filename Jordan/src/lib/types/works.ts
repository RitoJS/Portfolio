export type Works = {
    startDate: Date | null;
    endDate: Date | null;
    jobName: string;
    company: string;
    screenshots: string[] | null;
    description: string;
    role: string;
    problem: string;
    solution: string;
    langages: string[] | null;
    hasDetail: boolean;
    formation: boolean;
    link: string;
}