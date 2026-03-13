'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Classic01({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-300">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-300">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-3">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-xs text-gray-600 italic">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 list-disc list-outside ml-4">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-300">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-3">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                <p className="text-xs text-gray-600 italic">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-300">Skills</h2>
            <div className="space-y-1">
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
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-300">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-gray-500 ml-2 truncate max-w-[200px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5 italic">Technologies: {proj.technologies.join(', ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-300">Certifications</h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                    <span className="text-xs text-gray-600"> &mdash; {cert.issuer}</span>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-3">{formatDate(cert.date)}</span>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white px-12 py-10 flex flex-col', className)}>
      {/* Header - centered */}
      <div className="text-center mb-5 pb-3 border-b-2 border-gray-800">
        <h1 className="font-serif text-2xl font-bold text-gray-900 tracking-wide">{personalInfo.fullName}</h1>
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

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
