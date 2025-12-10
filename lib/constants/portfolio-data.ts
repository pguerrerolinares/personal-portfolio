export const personalInfo = {
  name: "Paul Guerrero Linares",
  initials: "PGL",
  role: "Software Engineer",
  location: "Spain",
  email: "pguerrerolinares@gmail.com",
  bio: {
    short:
      "Software Engineer specializing in full-stack development, AI/ML pipelines, and cloud-native architectures.",
    long: `Computer engineer with a solid foundation in backend and frontend development, evolved into a rare hybrid profile: someone who codes, understands architecture, masters complex pipelines, operates in strict security environments, and guides teams with agile methodologies.

Experience goes beyond writing code. Work on projects with strong corporate components, where integration between multiple legacy modules (large EARs, internal libraries, highly customized Spring services) coexists with modern frontends based on Angular and Ionic. This has required learning to move between layers, understanding why things are built the way they are, and above all, modernizing without breaking.

Notable for designing and maintaining high-level pipelines, especially in OCR, computer vision, and multimodal language models. Building pieces like docTR, PaddleOCR, LayoutLMv3, and Qwen3-VL, integrating them in containers, adjusting preprocessing, managing large GPU models, and deploying them in on-prem Kubernetes while meeting strict security requirements.`,
  },
  social: {
    github: "https://github.com/pguerrerolinares",
    linkedin: "https://www.linkedin.com/in/paul-guerrero-linares-584759134",
  },
  resumeUrl: "/resume.pdf", // Add your resume file to public folder
} as const;

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

export const skills: Skill[] = [
  // Frontend
  { name: "Angular", category: "frontend", level: "expert" },
  { name: "React", category: "frontend", level: "advanced" },
  { name: "Next.js", category: "frontend", level: "advanced" },
  { name: "TypeScript", category: "frontend", level: "expert" },
  { name: "Ionic/Capacitor", category: "frontend", level: "expert" },
  { name: "Tailwind CSS", category: "frontend", level: "advanced" },

  // Backend
  { name: "Java", category: "backend", level: "expert" },
  { name: "Spring Boot", category: "backend", level: "expert" },
  { name: "Node.js", category: "backend", level: "advanced" },
  { name: "Python", category: "backend", level: "expert" },
  { name: "FastAPI", category: "backend", level: "advanced" },
  { name: "Django", category: "backend", level: "intermediate" },

  // AI/ML
  { name: "OCR Pipelines", category: "ai-ml", level: "expert" },
  { name: "Computer Vision", category: "ai-ml", level: "advanced" },
  { name: "LLMs/VLMs", category: "ai-ml", level: "advanced" },
  { name: "docTR", category: "ai-ml", level: "expert" },
  { name: "PaddleOCR", category: "ai-ml", level: "expert" },
  { name: "LayoutLMv3", category: "ai-ml", level: "advanced" },

  // DevOps
  { name: "Docker", category: "devops", level: "expert" },
  { name: "Kubernetes", category: "devops", level: "advanced" },
  { name: "GitLab CI/CD", category: "devops", level: "expert" },
  { name: "AWS", category: "devops", level: "advanced" },
  { name: "JBoss EAP", category: "devops", level: "advanced" },

  // Tools & Methodologies
  { name: "Git", category: "tools", level: "expert" },
  { name: "Maven", category: "tools", level: "expert" },
  { name: "Veracode", category: "tools", level: "advanced" },
  { name: "Scrum", category: "methodologies", level: "expert" },
  { name: "Agile", category: "methodologies", level: "expert" },
];

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

export const experiences: Experience[] = [
  {
    id: "finnk",
    company: "Kutxabank Investment – Finnk",
    role: "Software Engineer (Frontend & Backend)",
    startDate: "2024-09",
    endDate: null,
    description:
      "Development of key functionalities within the Finnk ecosystem, combining frontend (Angular, Ionic/Capacitor, Angular Material, charting libraries) and backend Java in complex corporate environments.",
    highlights: [
      "Evolution of critical digital onboarding flows: document upload, validations, OTP, promotions, and financial visualization components",
      "Continuous integration and deployments via Kubernetes with automated GitLab CI pipelines",
      "Close collaboration with business, marketing, and security teams to align requirements and validate sensitive flows",
      "Intervention in environments with legacy architectures and custom Java modules, ensuring compatibility and stability",
    ],
    technologies: [
      "Angular",
      "Ionic",
      "Capacitor",
      "Java",
      "Spring",
      "Kubernetes",
      "GitLab CI",
    ],
    type: "fulltime",
  },
  {
    id: "onnera",
    company: "Onnera Group",
    role: "Software Developer – IoT & Cloud",
    startDate: "2022-01",
    endDate: "2024-06",
    description:
      "Development of IoT solutions combining Angular, Spring Boot, and AWS cloud services.",
    highlights: [
      "Implementation of lambdas, queues, topics, and device shadow for device-backend communication",
      "Creation of dashboards and internal tools for device monitoring and IoT network status",
      "Work under Scrum methodology, participating in sprints, refinements, estimation, and continuous improvement",
    ],
    technologies: [
      "Angular",
      "Spring Boot",
      "AWS Lambda",
      "AWS IoT",
      "SQS",
      "SNS",
      "Scrum",
    ],
    type: "fulltime",
  },
  {
    id: "personal",
    company: "Personal Projects & Technical Experimentation",
    role: "Independent Developer – Python, AI, Automation",
    startDate: "2021-01",
    endDate: null,
    description:
      "Constant development of personal projects in Python, especially for webscraping, task automation, and internal utilities.",
    highlights: [
      "In-depth experimentation with open-source AI, building complete OCR and data extraction pipelines from official documentation",
      "Continuous practice in containerization, Docker image creation, environment automation, and evaluation of vision-language models on local GPU",
      "Research and adoption of new tools, patterns, and architectures to improve productivity and technical quality",
    ],
    technologies: [
      "Python",
      "Docker",
      "OCR",
      "docTR",
      "PaddleOCR",
      "LayoutLMv3",
      "Qwen3-VL",
      "GPU/CUDA",
    ],
    type: "personal",
  },
];

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

export const projects: Project[] = [
  {
    id: "ocr-pipeline",
    title: "Intelligent Document Processing Pipeline",
    description:
      "End-to-end OCR and document understanding pipeline using state-of-the-art vision-language models.",
    longDescription:
      "A complete pipeline for extracting structured data from documents using docTR, PaddleOCR, LayoutLMv3, and Qwen3-VL. Deployed on Kubernetes with GPU support and strict security compliance.",
    technologies: [
      "Python",
      "docTR",
      "PaddleOCR",
      "LayoutLMv3",
      "Docker",
      "Kubernetes",
    ],
    featured: true,
    category: "ai",
  },
  {
    id: "finnk-onboarding",
    title: "Digital Banking Onboarding",
    description:
      "Critical digital onboarding flows for Finnk investment platform with document validation and OTP verification.",
    technologies: ["Angular", "Ionic", "Java", "Spring", "Kubernetes"],
    featured: true,
    category: "web",
  },
  {
    id: "iot-dashboard",
    title: "IoT Device Monitoring Dashboard",
    description:
      "Real-time monitoring dashboard for IoT devices with AWS integration and device shadow management.",
    technologies: ["Angular", "Spring Boot", "AWS IoT", "Lambda", "WebSockets"],
    featured: true,
    category: "web",
  },
  {
    id: "automation-toolkit",
    title: "Web Scraping & Automation Toolkit",
    description:
      "Collection of Python tools for web scraping, task automation, and data processing utilities.",
    technologies: ["Python", "Selenium", "BeautifulSoup", "Docker"],
    featured: false,
    category: "automation",
  },
];

export const skillCategories: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  "ai-ml": "AI & Machine Learning",
  devops: "DevOps & Cloud",
  tools: "Tools",
  methodologies: "Methodologies",
};
