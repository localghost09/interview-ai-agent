'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Tech02({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5 bg-white border border-gray-200 rounded-md p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">About</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5 bg-white border border-gray-200 rounded-md p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-gray-600">{exp.company}{exp.location ? ` - ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2 bg-gray-100 px-2 py-0.5 rounded-full">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-5 bg-white border border-gray-200 rounded-md p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}{edu.location ? ` - ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-5 bg-white border border-gray-200 rounded-md p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">Tech Stack</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-1.5">{group.category}</h3>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item, j) => {
                    const level = (j % 5) + 1;
                    return (
                      <div key={j} className="flex items-center gap-1 mr-3 mb-1">
                        <span className="text-[10px] text-gray-700">{item}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className={cn(
                                'w-2.5 h-2.5 rounded-sm',
                                n <= level ? 'bg-green-500' : 'bg-gray-200'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5 bg-white border border-gray-200 rounded-md p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">Pinned Repositories</h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-3 h-3 rounded-full border-2 border-blue-500" />
                    <h3 className="text-xs font-semibold text-blue-600">{proj.name}</h3>
                  </div>
                  <p className="text-[10px] text-gray-600 mb-1.5 line-clamp-2">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[10px] border border-blue-200 bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.url && <p className="text-[9px] text-gray-400 mt-1 truncate">{proj.url}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5 bg-white border border-gray-200 rounded-md p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-800">{cert.name}</h3>
                    <p className="text-[10px] text-gray-500">{cert.issuer} &middot; {formatDate(cert.date)}</p>
                  </div>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-gray-50', className)}>
      {/* Header */}
      <div className="bg-gray-900 px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-gray-300">
              {personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{personalInfo.fullName}</h1>
            {personalInfo.title && <p className="text-sm text-gray-400 mt-0.5">{personalInfo.title}</p>}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-500">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.location}</span>
              {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
              {personalInfo.github && <span>{personalInfo.github}</span>}
              {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
