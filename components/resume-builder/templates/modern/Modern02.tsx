'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Modern02({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-2 h-2 rounded-full bg-violet-600 flex-shrink-0" />
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{title}</h2>
    </div>
  );

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Summary" />
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Experience" />
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-violet-600 font-medium">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
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
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Education" />
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-violet-600 font-medium">{edu.institution}{edu.location ? ` — ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
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
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Skills" />
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
            <SectionHeader title="Projects" />
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-violet-500 ml-2 truncate max-w-[180px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium text-gray-600">Tech:</span> {proj.technologies.join(', ')}
                  </p>
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
            <SectionHeader title="Certifications" />
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex', className)}>
      {/* Left accent bar */}
      <div className="w-1 bg-violet-600 flex-shrink-0" />

      {/* Main content */}
      <div className="flex-1 p-8 pl-10">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
          {personalInfo.title && <p className="text-sm text-violet-600 font-medium mt-1">{personalInfo.title}</p>}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
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
    </div>
  );
}
