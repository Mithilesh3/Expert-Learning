export type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  category: "ai" | "genai" | "agentic-ai" | "devsecops" | "aws" | "azure";
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: "live" | "self-paced" | "recorded" | "hybrid";
  certification: string;
  duration: string;
  status: "draft" | "published";
};

export type AdminModule = {
  id: string;
  courseId: string;
  title: string;
  sequence: number;
  summary: string;
};

export type AdminLesson = {
  id: string;
  moduleId: string;
  title: string;
  type: "video" | "pdf" | "notes" | "assignment" | "guide" | "external-link";
  youtubeUrl?: string;
  externalUrl?: string;
  duration: string;
  status: "locked" | "available";
};

export type AdminResource = {
  id: string;
  title: string;
  type: "microsoft-learn" | "aws-skill-builder" | "azure-docs" | "pdf" | "notes" | "assignment" | "guide";
  url: string;
  courseId?: string;
  notes: string;
};

export const adminMockCourses: AdminCourse[] = [
  {
    id: "c-az104",
    title: "Azure Administrator (AZ-104)",
    slug: "azure-administrator",
    category: "azure",
    level: "Intermediate",
    mode: "hybrid",
    certification: "AZ-104",
    duration: "6-8 Weeks",
    status: "published",
  },
  {
    id: "c-genai",
    title: "Generative AI Master Program",
    slug: "generative-ai",
    category: "genai",
    level: "Advanced",
    mode: "live",
    certification: "GENAI-PROGRAM",
    duration: "10-12 Weeks",
    status: "published",
  },
];

export const adminMockModules: AdminModule[] = [
  {
    id: "m-az104-1",
    courseId: "c-az104",
    title: "Identity and Access",
    sequence: 1,
    summary: "Azure Entra ID and RBAC fundamentals.",
  },
  {
    id: "m-genai-1",
    courseId: "c-genai",
    title: "Prompt Systems",
    sequence: 1,
    summary: "Prompt architecture and evaluation basics.",
  },
];

export const adminMockLessons: AdminLesson[] = [
  {
    id: "l-az104-1",
    moduleId: "m-az104-1",
    title: "RBAC Deep Dive",
    type: "video",
    youtubeUrl: "https://www.youtube.com/watch?v=vEeAXhz0bSE",
    duration: "18 min",
    status: "available",
  },
  {
    id: "l-genai-1",
    moduleId: "m-genai-1",
    title: "Prompt Evaluation Template",
    type: "pdf",
    duration: "Resource",
    status: "available",
  },
];

export const adminMockResources: AdminResource[] = [
  {
    id: "r-1",
    title: "Microsoft Learn - Azure Administrator",
    type: "microsoft-learn",
    url: "https://learn.microsoft.com/en-us/certifications/azure-administrator/",
    courseId: "c-az104",
    notes: "Official certification path",
  },
  {
    id: "r-2",
    title: "AWS Skill Builder Portal",
    type: "aws-skill-builder",
    url: "https://skillbuilder.aws/",
    notes: "Official AWS practice resources",
  },
  {
    id: "r-3",
    title: "Azure Docs Portal",
    type: "azure-docs",
    url: "https://learn.microsoft.com/en-us/azure/",
    notes: "Official product documentation",
  },
];
