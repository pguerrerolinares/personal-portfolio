export type SkillCategory =
    | "frontend"
    | "backend"
    | "ai-ml"
    | "devops"
    | "tools"
    | "methodologies";

export interface Skill {
    name: string;
    category: SkillCategory;
    level: "expert" | "advanced" | "intermediate";
    icon?: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string | null; // null means "Present"
    description: string;
    highlights: string[];
    technologies: string[];
    type: "fulltime" | "freelance" | "personal";
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    image?: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    category: "web" | "mobile" | "ai" | "automation" | "other";
}
