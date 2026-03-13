'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

export default function Minimal04({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6 pb-6 border-b border-dotted border-gray-400">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6 pb-6 border-b border-dotted border-gray-400">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{exp.role}</h3>
                      <p className="text-xs text-gray-500">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5 text-[8px] leading-none select-none">{'\u2022'}</span>
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
          <div key={key} className="mb-6 pb-6 border-b border-dotted border-gray-400">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-xs text-gray-500">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-500 mt-0.5">{'\u2022'} GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5 text-[8px] leading-none select-none">{'\u2022'}</span>
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
          <div key={key} className="mb-6 pb-6 border-b border-dotted border-gray-400">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Skills</h2>
            <div className="space-y-1.5">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 text-[8px] leading-none select-none">{'\u2022'}</span>
                  <span>
                    <span className="font-medium text-gray-700">{skillGroup.category}:</span>{' '}
                    {skillGroup.items.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-6 pb-6 border-b border-dotted border-gray-400">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {proj.name}
                    {proj.url && <span className="text-gray-400 font-normal text-xs ml-2">({proj.url})</span>}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i}>
                          {i > 0 && ' \u2022 '}
                          {tech}
                        </span>
                      ))}
                    </p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5 text-[8px] leading-none select-none">{'\u2022'}</span>
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
          <div key={key} className="mb-6 pb-6 border-b border-dotted border-gray-400 last:border-b-0">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 text-[8px] leading-none select-none">{'\u2022'}</span>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-800">{cert.name}</h3>
                    <p className="text-xs text-gray-500">{cert.issuer} · {formatDate(cert.date)}</p>
                    {cert.url && <p className="text-[10px] text-gray-400">{cert.url}</p>}
                  </div>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-12', className)}>
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-dotted border-gray-400">
        <h1 className="text-xl font-bold text-gray-800">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-sm text-gray-500 mt-0.5">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedIn,
            personalInfo.github,
            personalInfo.portfolio,
          ].filter(Boolean).map((item, i, arr) => (
            <span key={i} className="text-xs text-gray-500">
              {item}{i < arr.length - 1 && <span className="mx-1.5 text-gray-300">{'\u2022'}</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
