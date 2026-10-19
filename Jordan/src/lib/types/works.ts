export type Works = {
    startDate: Date | null;
    endDate: Date | null;
    jobName: string;
    company: string;
    screenshots: string[];
    description: string;
    role: string;
    problem: string | null;
    solution: string | null;
    languages: string[] | null;
    hasDetail: boolean;
    formation: boolean;
    link: string | null;
}