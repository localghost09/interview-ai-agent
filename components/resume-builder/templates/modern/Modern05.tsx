'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Modern05({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-1">
            <h2 className="text-sm font-bold text-gray-900 mb-1 pb-1 border-b-2 border-teal-500">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-1">
            <h2 className="text-sm font-bold text-gray-900 mb-3 pb-1 border-b-2 border-teal-500">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-teal-600 font-medium">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2 bg-teal-50 px-2 py-0.5 rounded-full">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-teal-400">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-1">
            <h2 className="text-sm font-bold text-gray-900 mb-3 pb-1 border-b-2 border-teal-500">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <h3 className="text-xs font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-[10px] text-teal-600 font-medium">{edu.institution}</p>
                <p className="text-[10px] text-gray-500">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</p>
                {edu.gpa && <p className="text-[10px] text-gray-600">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-[10px] text-gray-700 pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-teal-400">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-1">
            <h2 className="text-sm font-bold text-gray-900 mb-3 pb-1 border-b-2 border-teal-500">Skills</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <h3 className="text-[10px] font-semibold text-gray-800 mb-1">{group.category}</h3>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item, j) => (
                    <span key={j} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-1">
            <h2 className="text-sm font-bold text-gray-900 mb-3 pb-1 border-b-2 border-teal-500">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-[10px] text-teal-500 ml-2 truncate max-w-[180px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-teal-400">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-1">
            <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-teal-500">Certifications</h2>
            <div className="grid grid-cols-2 gap-2">
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
    <div className={cn('w-[794px] min-h-[1123px] bg-gray-50 p-6 flex flex-col', className)}>
      {/* Header card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-3">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-teal-600 font-medium mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Grid layout for sections */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
