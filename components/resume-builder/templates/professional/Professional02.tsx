'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Professional02({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-300">Professional Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-300">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pb-3 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-xs italic text-gray-600">{exp.role}{exp.location ? ` | ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-emerald-600">{h}</li>
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
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-300">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 pb-2 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{edu.institution}</h3>
                    <p className="text-xs italic text-gray-600">{edu.degree}{edu.location ? ` | ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-emerald-600 mt-0.5 font-medium">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-emerald-600">{h}</li>
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
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-300">Skills &amp; Competencies</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2">
                <span className="text-xs font-semibold text-gray-800">{group.category}: </span>
                <span className="text-xs text-gray-700">{group.items.join(', ')}</span>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-300">Key Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 pb-2 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-emerald-600 ml-2 truncate max-w-[150px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1 italic">Technologies: {proj.technologies.join(', ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-emerald-600">{h}</li>
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
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-300">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2 flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-[10px] text-gray-600">{cert.issuer}</p>
                </div>
                <span className="text-[10px] text-gray-500">{formatDate(cert.date)}</span>
              </div>
            ))}
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
      <div className="mb-5 pb-3 border-b-2 border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-emerald-600 font-medium mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-600">
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
