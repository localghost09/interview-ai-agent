'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Modern04({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-2">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-3">Experience</h2>
            <div className="relative pl-5">
              {/* Vertical dotted line */}
              <div className="absolute left-[3px] top-1 bottom-1 border-l-2 border-dotted border-violet-300" />
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4 relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-violet-100" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-xs text-violet-600 font-medium">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-violet-400">{h}</li>
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
            <h2 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-3">Education</h2>
            <div className="relative pl-5">
              <div className="absolute left-[3px] top-1 bottom-1 border-l-2 border-dotted border-violet-300" />
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 relative">
                  <div className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-violet-100" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-violet-600 font-medium">{edu.institution}{edu.location ? ` — ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-violet-400">{h}</li>
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
            <h2 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-2">Skills</h2>
            <div className="space-y-2">
              {skills.map((group, i) => (
                <div key={i}>
                  <span className="text-xs font-semibold text-gray-800">{group.category}: </span>
                  <span className="text-xs text-gray-700">{group.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-2">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-[10px] text-violet-500 ml-2 truncate max-w-[180px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-violet-400">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-2">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-xs font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-[10px] text-gray-600">{cert.issuer} &middot; {formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'personalInfo':
        return null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex flex-col', className)}>
      {/* Diagonal header */}
      <div
        className="relative bg-violet-700 text-white px-8 pt-8 pb-14"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }}
      >
        <h1 className="text-2xl font-bold tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-violet-200 font-medium mt-1">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-violet-100">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="px-8 pb-8 -mt-4 flex-1">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
