'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

function NeonHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
      <span className="w-3 h-[2px] bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
      {children}
      <span className="flex-1 h-[1px] bg-cyan-900" />
    </h2>
  );
}

export default function Creative05({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <NeonHeading>Summary</NeonHeading>
            <p className="text-sm text-gray-300 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <NeonHeading>Experience</NeonHeading>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l border-cyan-800 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                      <p className="text-sm text-cyan-400 font-medium">{exp.company}{exp.location ? ` // ${exp.location}` : ''}</p>
                    </div>
                    <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-cyan-500 mt-0.5 font-mono">&gt;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-6">
            <NeonHeading>Education</NeonHeading>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border-l border-cyan-800 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                      <p className="text-sm text-cyan-400 font-medium">{edu.institution}{edu.location ? ` // ${edu.location}` : ''}</p>
                    </div>
                    <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="font-mono text-xs text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-cyan-500 mt-0.5 font-mono">&gt;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-6">
            <NeonHeading>Skills</NeonHeading>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-900/50 font-mono text-xs">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <span className="text-cyan-400">const</span>{' '}
                  <span className="text-white">{skillGroup.category.replace(/\s+/g, '_').toLowerCase()}</span>{' '}
                  <span className="text-gray-500">=</span>{' '}
                  <span className="text-gray-400">[</span>
                  {skillGroup.items.map((item, i) => (
                    <span key={i}>
                      <span className="text-emerald-400">&quot;{item}&quot;</span>
                      {i < skillGroup.items.length - 1 && <span className="text-gray-500">, </span>}
                    </span>
                  ))}
                  <span className="text-gray-400">];</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-6">
            <NeonHeading>Projects</NeonHeading>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l border-cyan-800 pl-4">
                  <h3 className="text-sm font-bold text-white">
                    {proj.name}
                    {proj.url && <span className="text-cyan-600 font-normal font-mono text-xs ml-2">({proj.url})</span>}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded shadow-[0_0_4px_rgba(34,211,238,0.15)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-cyan-500 mt-0.5 font-mono">&gt;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-6">
            <NeonHeading>Certifications</NeonHeading>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="border-l border-cyan-800 pl-4">
                  <h3 className="text-sm font-bold text-white">{cert.name}</h3>
                  <p className="text-xs text-cyan-400">{cert.issuer} · <span className="font-mono text-gray-500">{formatDate(cert.date)}</span></p>
                  {cert.url && <p className="text-[10px] font-mono text-gray-600">{cert.url}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-slate-900 text-white overflow-hidden', className)}>
      {/* Header */}
      <div className="px-10 pt-10 pb-6 border-b border-cyan-800/50">
        <h1 className="font-mono text-3xl font-extrabold text-white tracking-tight">
          {personalInfo.fullName}
          <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
        </h1>
        {personalInfo.title && (
          <p className="text-cyan-400 text-sm mt-1 font-mono">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400 font-mono">
          {personalInfo.email && <span className="hover:text-cyan-400 transition-colors">{personalInfo.email}</span>}
          {personalInfo.phone && <span>|  {personalInfo.phone}</span>}
          {personalInfo.location && <span>|  {personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>|  {personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>|  {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>|  {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-8">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
