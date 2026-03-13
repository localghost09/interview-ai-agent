'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Modern03({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const mainSections: ResumeSectionKey[] = ['summary', 'experience', 'projects'];
  const sidebarSections: ResumeSectionKey[] = ['education', 'skills', 'certifications'];

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 border border-gray-100 rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-sky-600">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2 bg-gray-50 px-2 py-0.5 rounded">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-sky-400">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 border border-gray-100 rounded-md p-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-[10px] text-sky-500 ml-2 truncate max-w-[150px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-1">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-sky-400">{h}</li>
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
            <h2 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="text-xs font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-[10px] text-sky-600">{edu.institution}</p>
                <p className="text-[10px] text-gray-500">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</p>
                {edu.gpa && <p className="text-[10px] text-gray-600">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-[10px] text-gray-700 pl-2 relative before:content-['•'] before:absolute before:left-0 before:text-sky-400">{h}</li>
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
            <h2 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2">Skills</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2">
                <h3 className="text-[10px] font-semibold text-gray-800 mb-1">{group.category}</h3>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item, j) => (
                    <span key={j} className="text-[10px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <h3 className="text-[10px] font-semibold text-gray-800">{cert.name}</h3>
                <p className="text-[10px] text-gray-600">{cert.issuer} &middot; {formatDate(cert.date)}</p>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex flex-col', className)}>
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-500 text-white px-8 py-6">
        <h1 className="text-2xl font-bold tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-sky-100 font-medium mt-1">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-sky-100">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex flex-1">
        {/* Main column 60% */}
        <div className="w-[60%] p-6">
          {sectionOrder
            .filter((key) => key !== 'personalInfo' && mainSections.includes(key))
            .map((key) => renderSection(key))}
        </div>

        {/* Sidebar column 40% */}
        <div className="w-[40%] p-6 border-l border-gray-100">
          {sectionOrder
            .filter((key) => key !== 'personalInfo' && sidebarSections.includes(key))
            .map((key) => renderSection(key))}
        </div>
      </div>
    </div>
  );
}
