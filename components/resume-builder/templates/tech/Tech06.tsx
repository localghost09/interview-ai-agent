'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Tech06({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-green-600 rounded-sm" />
              System Overview
            </h2>
            <div className="border border-dashed border-green-300 rounded p-3">
              <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
            </div>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-green-600 rounded-sm" />
              Experience Modules
            </h2>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="relative">
                  {idx < experience.length - 1 && (
                    <div className="absolute left-[7px] top-8 bottom-0 w-0 border-l-2 border-dashed border-green-300" />
                  )}
                  <div className="flex gap-3">
                    <div className="w-4 h-4 border-2 border-green-600 rounded-sm flex-shrink-0 mt-0.5 bg-white" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                          <p className="text-xs text-green-600">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                      </div>
                      {exp.highlights?.length > 0 && (
                        <ul className="mt-1 space-y-0.5">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-green-500">{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-green-600 rounded-sm" />
              Education
            </h2>
            <div className="border border-dashed border-green-300 rounded p-3 space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="border-b border-dashed border-green-200 pb-2 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-green-600">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-green-500">{h}</li>
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
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-green-600 rounded-sm" />
              Component Library
            </h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-xs font-semibold text-gray-800 mb-1.5">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, j) => (
                    <span key={j} className="text-[10px] border-2 border-green-600 text-green-700 px-3 py-1 rounded">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-green-600 rounded-sm" />
              Project Boards
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border border-dashed border-green-300 rounded p-3">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <p className="text-[10px] text-green-600 truncate">{proj.url}</p>}
                  <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[9px] border border-green-400 text-green-700 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-[10px] text-gray-700 pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-green-500">{h}</li>
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
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-green-600 rounded-sm" />
              Verified Credentials
            </h2>
            <div className="border border-dashed border-green-300 rounded p-3 space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{cert.issuer} &middot; {formatDate(cert.date)}</span>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-8', className)}>
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-green-600">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-2 border-green-600 rounded flex items-center justify-center">
            <div className="w-6 h-6 bg-green-600 rounded-sm" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
            {personalInfo.title && <p className="text-sm text-green-600 font-medium">{personalInfo.title}</p>}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-3 text-xs text-gray-600">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
