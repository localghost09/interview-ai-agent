'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Professional01({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderMainSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-200 pb-1">Professional Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-200 pb-1">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">{h}</li>
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
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-200 pb-1">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">{h}</li>
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
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-blue-200 pb-1">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-blue-600 ml-2 truncate max-w-[150px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
      case 'certifications':
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
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-blue-500 pb-1">Skills</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2">
                <h3 className="text-[10px] font-semibold text-blue-200 mb-1">{group.category}</h3>
                <div className="space-y-1">
                  {group.items.map((item, j) => (
                    <div key={j}>
                      <span className="text-[10px] text-white">{item}</span>
                      <div className="w-full h-1.5 bg-blue-200 rounded-full mt-0.5">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${70 + ((j * 13) % 30)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-blue-500 pb-1">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <h3 className="text-[10px] font-semibold text-white">{cert.name}</h3>
                <p className="text-[10px] text-blue-200">{cert.issuer}</p>
                <p className="text-[10px] text-blue-300">{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex', className)}>
      {/* Left Sidebar - 35% */}
      <div className="w-[35%] bg-blue-700 p-6 text-white">
        {/* Personal Info */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white leading-tight">{personalInfo.fullName}</h1>
          {personalInfo.title && <p className="text-xs text-blue-200 font-medium mt-1">{personalInfo.title}</p>}
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-blue-500 pb-1">Contact</h2>
          <div className="space-y-1.5 text-[10px] text-blue-100">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
            {personalInfo.linkedIn && <p className="truncate">{personalInfo.linkedIn}</p>}
            {personalInfo.github && <p className="truncate">{personalInfo.github}</p>}
            {personalInfo.portfolio && <p className="truncate">{personalInfo.portfolio}</p>}
          </div>
        </div>

        {/* Sidebar sections */}
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSidebarSection(key))}
      </div>

      {/* Right Main Content - 65% */}
      <div className="w-[65%] p-6">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderMainSection(key))}
      </div>
    </div>
  );
}
