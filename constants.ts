import { Project, Experience, Skill } from "./types";

// ==========================================
// IMAGE CONFIGURATION
// ==========================================
// INSTRUCTIONS:
// 1. Save your photo as 'profile.jpg' in the project's root folder (same folder as index.html).
// 2. UNCOMMENT the line below (remove the //):
export const PROFILE_IMAGE_URL = "./profile.jpg";

// 3. COMMENT OUT the line below (add // at the start) to stop using the placeholder:
//export const PROFILE_IMAGE_URL = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80";

export const PERSONAL_INFO = {
  name: "Steven Developer",
  role: "Creative Engineer",
  profileImage: PROFILE_IMAGE_URL,
  tagline:
    "I build pixel-perfect, engaging, and accessible digital experiences.",
  bio: "I'm a full-stack developer who treats code like art. With a focus on motion design and interactivity, I transform static concepts into living, breathing web applications. I love React, 3D graphics, and pushing the browser to its limits.",
  location: "San Francisco, CA",
  email: "steven@example.com",
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description:
      "A real-time data visualization dashboard for tracking satellite telemetry. Built with WebGL and React.",
    tags: ["React", "Three.js", "WebSocket", "Tailwind"],
    imageUrl: "https://picsum.photos/800/600?random=1",
    link: "#",
  },
  {
    id: 2,
    title: "Echo Commerce",
    description:
      "A headless e-commerce platform featuring AI-driven product recommendations and instant checkout.",
    tags: ["Next.js", "Stripe", "Gemini API", "PostgreSQL"],
    imageUrl: "https://picsum.photos/800/600?random=2",
    link: "#",
  },
  {
    id: 3,
    title: "Zenith UI Kit",
    description:
      "An open-source accessible component library used by over 5,000 developers worldwide.",
    tags: ["TypeScript", "Storybook", "A11y", "NPM"],
    imageUrl: "https://picsum.photos/800/600?random=3",
    link: "#",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "TechNova Inc.",
    period: "2021 - Present",
    description:
      "Leading the core UI team, migrated legacy app to React 18, improved performance metrics by 40%.",
  },
  {
    id: 2,
    role: "Creative Developer",
    company: "Studio Pulse",
    period: "2018 - 2021",
    description:
      "Developed award-winning marketing sites for Fortune 500 clients using WebGL and GSAP.",
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "StartUp Flow",
    period: "2016 - 2018",
    description:
      "Built the MVP from scratch, handling both React frontend and Node.js backend services.",
  },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "design" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Three.js / WebGL", level: 75, category: "frontend" },
  { name: "UI/UX Design", level: 85, category: "design" },
  { name: "GenAI Integration", level: 85, category: "tools" },
  { name: "GraphQL", level: 80, category: "backend" },
];
