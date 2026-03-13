'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Executive01({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-8">
            <h2 className="font-serif text-sm font-semibold text-gray-800 uppercase tracking-[0.2em] mb-3">Executive Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-8">
            <h2 className="font-serif text-sm font-semibold text-gray-800 uppercase tracking-[0.2em] mb-3">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-xs text-amber-700 font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-1.5 before:h-1.5 before:border before:border-amber-600 before:rounded-full">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-8">
            <h2 className="font-serif text-sm font-semibold text-gray-800 uppercase tracking-[0.2em] mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                <p className="text-xs text-amber-700 font-medium">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-1.5 before:h-1.5 before:border before:border-amber-600 before:rounded-full">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-8">
            <h2 className="font-serif text-sm font-semibold text-gray-800 uppercase tracking-[0.2em] mb-3">Core Competencies</h2>
            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
              {skills.flatMap((group) => group.items).map((item, i) => (
                <span key={i} className="text-xs text-gray-700">{item}</span>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-8">
            <h2 className="font-serif text-sm font-semibold text-gray-800 uppercase tracking-[0.2em] mb-3">Notable Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-amber-700 ml-2 truncate max-w-[180px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-[10px] text-gray-500 mt-0.5 italic">{proj.technologies.join(', ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-1.5 before:h-1.5 before:border before:border-amber-600 before:rounded-full">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-8">
            <h2 className="font-serif text-sm font-semibold text-gray-800 uppercase tracking-[0.2em] mb-3">Professional Credentials</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                    <span className="text-xs text-gray-500"> &mdash; {cert.issuer}</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-14', className)}>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-semibold text-gray-900 tracking-wide">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-gray-600 mt-1 tracking-wide">{personalInfo.title}</p>}
        <div className="w-24 h-[2px] bg-amber-700 mx-auto mt-3" />
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-0.5 mt-3 text-xs text-gray-500">
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
