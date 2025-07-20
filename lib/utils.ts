import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    }))
  );

  return results;
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};

export const generateQuestions = async (
  role: string, 
  level: string, 
  techstack: string[], 
  type: string
): Promise<string[]> => {
  // This would typically call an AI service to generate questions
  // For now, we'll return some sample questions based on the tech stack
  
  const baseQuestions = [
    `Tell me about yourself and your experience with ${role.toLowerCase()} development.`,
    `What interests you most about this ${role.toLowerCase()} position?`,
    "Describe a challenging project you've worked on recently."
  ];

  const techQuestions = techstack.flatMap(tech => [
    `What is your experience with ${tech}?`,
    `How would you approach debugging issues in ${tech}?`,
    `Can you explain the key features of ${tech}?`
  ]);

  const levelQuestions = level === 'Junior' ? [
    "How do you stay updated with new technologies?",
    "Describe a time you had to learn something new quickly."
  ] : [
    "How do you mentor junior developers?",
    "Describe your approach to system architecture.",
    "How do you handle technical debt in projects?"
  ];

  const allQuestions = [...baseQuestions, ...techQuestions, ...levelQuestions];
  
  // Return a subset of questions (typically 5-8 for an interview)
  return allQuestions.slice(0, Math.min(8, allQuestions.length));
};
