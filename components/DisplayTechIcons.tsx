import { cn } from '@/lib/utils'
import React from 'react'
import TechImage from './TechImage'

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  // Simple tech icon mapping without async operations
  const getTechIcon = (tech: string) => {
    const techName = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
    
    // Map of common technologies to their icons
    const techIconMap: Record<string, string> = {
      react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      html5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      css3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      "vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    };

    return techIconMap[techName] || "/tech.svg";
  };

  const techIcons = techStack.map(tech => ({
    tech,
    url: getTechIcon(tech)
  }));

  return (
    <div className='flex flex-row gap-2'>
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && '-ml-3')}> 
          <span className='tech-tooltip'>{tech}</span>
          <TechImage 
            src={url} 
            alt={tech} 
            className='size-5'
          />
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons
