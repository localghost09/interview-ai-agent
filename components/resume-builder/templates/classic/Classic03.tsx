'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Classic03({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  let sectionIndex = 0;

  const renderSection = (key: ResumeSectionKey) => {
    const isAlt = sectionIndex % 2 === 1;

    switch (key) {
      case 'summary':
        sectionIndex++;
        return summary?.content ? (
          <div key={key} className={cn('py-4 px-6', isAlt && 'bg-gray-50')}>
            <h2 className="text-sm font-bold text-gray-600 mb-2 pb-1 border-b border-gray-300">SUMMARY</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        if (experience?.length === 0) return null;
        sectionIndex++;
        return experience?.length > 0 ? (
          <div key={key} className={cn('py-4 px-6', isAlt && 'bg-gray-50')}>
            <h2 className="text-sm font-bold text-gray-600 mb-2 pb-1 border-b border-gray-300">PROFESSIONAL EXPERIENCE</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-3">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
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
        if (education?.length === 0) return null;
        sectionIndex++;
        return education?.length > 0 ? (
          <div key={key} className={cn('py-4 px-6', isAlt && 'bg-gray-50')}>
            <h2 className="text-sm font-bold text-gray-600 mb-2 pb-1 border-b border-gray-300">EDUCATION</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-3">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
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
        if (skills?.length === 0) return null;
        sectionIndex++;
        return skills?.length > 0 ? (
          <div key={key} className={cn('py-4 px-6', isAlt && 'bg-gray-50')}>
            <h2 className="text-sm font-bold text-gray-600 mb-2 pb-1 border-b border-gray-300">SKILLS</h2>
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
        if (projects?.length === 0) return null;
        sectionIndex++;
        return projects?.length > 0 ? (
          <div key={key} className={cn('py-4 px-6', isAlt && 'bg-gray-50')}>
            <h2 className="text-sm font-bold text-gray-600 mb-2 pb-1 border-b border-gray-300">PROJECTS</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-gray-500 ml-2 truncate max-w-[200px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5">Technologies: {proj.technologies.join(', ')}</p>
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
        if (certifications?.length === 0) return null;
        sectionIndex++;
        return certifications?.length > 0 ? (
          <div key={key} className={cn('py-4 px-6', isAlt && 'bg-gray-50')}>
            <h2 className="text-sm font-bold text-gray-600 mb-2 pb-1 border-b border-gray-300">CERTIFICATIONS</h2>
            <div className="space-y-1.5">
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex flex-col', className)}>
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-gray-600 mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-600">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Sections with alternating backgrounds */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
