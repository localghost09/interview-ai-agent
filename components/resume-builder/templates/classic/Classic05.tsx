'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Classic05({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const leftSections: ResumeSectionKey[] = ['summary', 'experience', 'projects'];
  const rightSections: ResumeSectionKey[] = ['education', 'skills', 'certifications'];

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-4">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider pt-2 border-t border-gray-400 mb-2">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed text-justify">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider pt-2 border-t border-gray-400 mb-2">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 last:mb-0">
                <h3 className="text-xs font-semibold text-gray-900">{exp.role}</h3>
                <p className="text-[10px] text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                <p className="text-[10px] text-gray-500">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</p>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-[10px] text-gray-700 text-justify">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider pt-2 border-t border-gray-400 mb-2">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <h3 className="text-xs font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-[10px] text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                <p className="text-[10px] text-gray-500">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</p>
                {edu.gpa && <p className="text-[10px] text-gray-600">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-3">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-[10px] text-gray-700 text-justify">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider pt-2 border-t border-gray-400 mb-2">Skills</h2>
            <div className="space-y-1.5">
              {skills.map((group, i) => (
                <div key={i}>
                  <span className="text-[10px] font-semibold text-gray-800">{group.category}: </span>
                  <span className="text-[10px] text-gray-700">{group.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider pt-2 border-t border-gray-400 mb-2">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <h3 className="text-xs font-semibold text-gray-900">{proj.name}</h3>
                {proj.url && <p className="text-[10px] text-gray-500 truncate">{proj.url}</p>}
                <p className="text-[10px] text-gray-700 mt-0.5 text-justify">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-[10px] text-gray-600 mt-0.5 italic">{proj.technologies.join(', ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-3">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-[10px] text-gray-700 text-justify">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider pt-2 border-t border-gray-400 mb-2">Certifications</h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-[10px] font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-[9px] text-gray-600">{cert.issuer} &middot; {formatDate(cert.date)}</p>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex flex-col px-10 py-8', className)}>
      {/* Header - centered */}
      <div className="text-center mb-4 pb-3 border-b-2 border-gray-400">
        <h1 className="font-serif text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-gray-600 mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 mt-2 text-xs text-gray-600">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && (
            <>
              <span>&bull;</span>
              <span>{personalInfo.linkedIn}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>&bull;</span>
              <span>{personalInfo.github}</span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>&bull;</span>
              <span>{personalInfo.portfolio}</span>
            </>
          )}
        </div>
      </div>

      {/* Two equal columns */}
      <div className="flex gap-6 flex-1">
        {/* Left column */}
        <div className="w-1/2">
          {sectionOrder
            .filter((key) => key !== 'personalInfo' && leftSections.includes(key))
            .map((key) => renderSection(key))}
        </div>

        {/* Right column */}
        <div className="w-1/2">
          {sectionOrder
            .filter((key) => key !== 'personalInfo' && rightSections.includes(key))
            .map((key) => renderSection(key))}
        </div>
      </div>
    </div>
  );
}
