'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Classic06({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center justify-center gap-3 mb-3">
      <span className="text-gray-400 text-sm">&mdash;&mdash;</span>
      <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em]">{title}</h2>
      <span className="text-gray-400 text-sm">&mdash;&mdash;</span>
    </div>
  );

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Summary" />
            <p className="text-xs text-gray-700 leading-relaxed text-center max-w-[85%] mx-auto">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Experience" />
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="text-center mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-xs text-gray-600">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                  <p className="text-[10px] text-gray-500">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</p>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 max-w-[90%] mx-auto">
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
          <div key={key} className="mb-6">
            <SectionHeader title="Education" />
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0 text-center">
                <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-xs text-gray-600">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                <p className="text-[10px] text-gray-500">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</p>
                {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-left max-w-[90%] mx-auto">
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
          <div key={key} className="mb-6">
            <SectionHeader title="Skills" />
            <div className="space-y-1.5 max-w-[90%] mx-auto">
              {skills.map((group, i) => (
                <div key={i} className="text-center">
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
            <SectionHeader title="Projects" />
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <div className="text-center mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <p className="text-[10px] text-gray-500">{proj.url}</p>}
                </div>
                <p className="text-xs text-gray-700 text-center max-w-[90%] mx-auto">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-[10px] text-gray-500 text-center mt-1">{proj.technologies.join(' / ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 max-w-[90%] mx-auto">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">{h}</li>
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
            <SectionHeader title="Certifications" />
            <div className="space-y-1.5 text-center">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                  <span className="text-xs text-gray-600"> &mdash; {cert.issuer}, {formatDate(cert.date)}</span>
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
      <div className="text-center mb-6">
        <h1 className="font-serif text-3xl font-bold text-gray-900 tracking-wide">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-gray-500 mt-1">{personalInfo.title}</p>}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 mt-3 text-xs text-gray-600">
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
