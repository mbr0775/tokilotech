export type ProjectCategory =
  | "All"
  | "Website"
  | "Mobile App"
  | "AI Solution"
  | "Dashboard"
  | "Branding";

export type ProjectMedia = {
  type: "image" | "video" | "mockup";
  url: string;
  title: string;
};

export type ProjectItem = {
  id: number;
  title: string;
  slug: string;
  category: Exclude<ProjectCategory, "All">;
  client: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  media: ProjectMedia[];
};

export const projectCategories: ProjectCategory[] = [
  "All",
  "Website",
  "Mobile App",
  "AI Solution",
  "Dashboard",
  "Branding",
];

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Arwa Water Bottle Company Website",
    slug: "arwa-water-bottle-company-website",
    category: "Website",
    client: "Arwa Water Bottle Company",
    shortDescription:
      "A modern company website for a water bottle brand with product showcase and business contact features.",
    description:
      "This project is a clean and professional business website designed for Arwa Water Bottle Company. The website focuses on product presentation, brand trust, mobile-friendly design, and clear customer contact actions.",
    coverImage:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1400",
    liveUrl: "https://example.com",
    githubUrl: "",
    technologies: ["Next.js", "React", "Tailwind CSS", "Responsive UI"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1400",
        title: "Homepage preview",
      },
      {
        type: "mockup",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400",
        title: "Mobile mockup",
      },
    ],
  },
  {
    id: 2,
    title: "Business Portfolio Website",
    slug: "business-portfolio-website",
    category: "Website",
    client: "Business Client",
    shortDescription:
      "A responsive portfolio website for a growing business client.",
    description:
      "A modern portfolio website built to present services, company details, team information, and contact details in a professional way.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400",
    liveUrl: "https://example.com",
    technologies: ["Next.js", "Tailwind CSS", "SEO"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400",
        title: "Website preview",
      },
    ],
  },
  {
    id: 3,
    title: "Mobile App UI Design",
    slug: "mobile-app-ui-design",
    category: "Mobile App",
    client: "Mobile App Client",
    shortDescription:
      "A clean mobile app interface with user-friendly navigation.",
    description:
      "A mobile-first user interface design focused on simple navigation, clean layouts, and modern visual design.",
    coverImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400",
    technologies: ["React Native", "UI Design", "Mobile UX"],
    media: [
      {
        type: "mockup",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400",
        title: "Mobile app mockup",
      },
    ],
  },
  {
    id: 4,
    title: "AI Analytics Dashboard",
    slug: "ai-analytics-dashboard",
    category: "AI Solution",
    client: "Analytics Client",
    shortDescription:
      "An intelligent dashboard for business data insights and performance tracking.",
    description:
      "An AI-powered analytics dashboard designed to help businesses monitor performance, understand data, and make better decisions.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400",
    technologies: ["AI", "Dashboard", "Data Analytics", "React"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400",
        title: "Dashboard screen",
      },
    ],
  },
];