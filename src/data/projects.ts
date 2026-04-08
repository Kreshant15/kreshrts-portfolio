export interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  client: string;
  date: string;
  tags: string[];
  fullDescription: string;
  liveUrl?: string;
}

export const projects: ProjectDetail[] = [
  {
    id: "driphive",
    title: "Driphive",
    category: "Branding",
    tag: "BRAND",
    image: "/images/projects/driphive/Cover-Image.webp",
    description:
      "A modern identity for a premium streetwear brand rooted in urban culture and sustainability.",
    client: "Personal Project",
    date: "March 2025",
    tags: ["Branding", "Visual Identity", "Graphic Design"],
    fullDescription:
      "DripHive – The Pulse of Street Culture.\n\nDripHive is an imaginative concept brand created as a showcase of my design skills, creativity, and branding capabilities.\n\nThis project brings together elements of streetwear, skate culture, and urban aesthetics to craft a bold and visually striking identity.\n\n💥 No Rules. No Limits. Just Drip. 💥\n\nThis project is purely for creative exploration and is not a real brand.",
  },

  {
    id: "vexels",
    title: "Vexels",
    category: "Branding",
    tag: "BRAND",
    image: "/images/projects/vexels/cover.webp",
    description:
      "Visual identity for a tech-forward creative agency at the intersection of art and engineering.",
    client: "Personal Project",
    date: "August 2024",
    tags: ["Branding", "Visual Identity"],
    fullDescription:
      "Vexels Studio required an identity that communicated technical precision and creative energy simultaneously.\n\nThe brand system uses geometric modular shapes and a sharp palette to represent where technology meets art.",
  }
];