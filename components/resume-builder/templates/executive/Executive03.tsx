'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Executive03({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderMainSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-2 border-b border-teal-300 pb-1">Executive Profile</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-2 border-b border-teal-300 pb-1">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-teal-600 font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-teal-500">{h}</li>
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
            <h2 className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-2 border-b border-teal-300 pb-1">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-teal-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-teal-500">{h}</li>
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
            <h2 className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-2 border-b border-teal-300 pb-1">Key Initiatives</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-teal-600 ml-2 truncate max-w-[150px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-[10px] text-gray-500 mt-0.5">{proj.technologies.join(', ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-teal-500">{h}</li>
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
            <h2 className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-2 border-b border-teal-300 pb-1">Certifications</h2>
            <div className="space-y-1.5">
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

      case 'skills':
      case 'personalInfo':
        return null;

      default:
        return null;
    }
  };

  const renderSidebarSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2 border-b border-teal-300 pb-1">Competencies</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2">
                <h3 className="text-[10px] font-bold text-gray-800 mb-1">{group.category}</h3>
                <div className="space-y-1">
                  {group.items.map((item, j) => (
                    <div key={j}>
                      <span className="text-[10px] text-gray-700">{item}</span>
                      <div className="w-full h-1 bg-gray-200 rounded-full mt-0.5">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: `${65 + ((j * 13) % 35)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white', className)}>
      {/* Header */}
      <div className="bg-teal-700 text-white px-8 py-5">
        <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-teal-100 mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-teal-200">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Two Column Body */}
      <div className="flex">
        {/* Main Content */}
        <div className="w-[65%] p-6">
          {sectionOrder
            .filter((key) => key !== 'personalInfo')
            .map((key) => renderMainSection(key))}
        </div>

        {/* Sidebar */}
        <div className="w-[35%] bg-teal-50 p-6 border-l border-teal-200">
          {sectionOrder
            .filter((key) => key !== 'personalInfo')
            .map((key) => renderSidebarSection(key))}
        </div>
      </div>
    </div>
  );
}
