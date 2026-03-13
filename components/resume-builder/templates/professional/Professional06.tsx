'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Professional06({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderMainSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-200 pb-1">Strategy Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-200 pb-1">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-indigo-600 font-medium">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-indigo-400">{h}</li>
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
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-200 pb-1">Education</h2>
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
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-indigo-400">{h}</li>
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
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-200 pb-1">Strategic Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-indigo-600 ml-2 truncate max-w-[120px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-indigo-400">{h}</li>
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
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-200 pb-1">Certifications</h2>
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
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-200 pb-1">Competencies</h2>
            <div className="space-y-2">
              {skills.map((group, i) => (
                <div key={i}>
                  <h3 className="text-[10px] font-bold text-gray-800 mb-1">{group.category}</h3>
                  <div className="grid grid-cols-2 gap-1">
                    {group.items.map((item, j) => (
                      <div key={j} className="text-[10px] text-gray-700 bg-indigo-50 px-1.5 py-0.5 rounded text-center">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  // Gather key achievements from first few experience highlights
  const keyAchievements = experience
    .flatMap((exp) => exp.highlights.slice(0, 1))
    .slice(0, 3);

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white', className)}>
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-indigo-600 font-semibold mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-600">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Key Achievements Banner */}
      {keyAchievements.length > 0 && (
        <div className="bg-indigo-50 mx-8 rounded-lg p-4 mb-4">
          <h2 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Key Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            {keyAchievements.map((a, i) => (
              <div key={i} className="text-[10px] text-gray-700 border-l-2 border-indigo-400 pl-2">{a}</div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Body */}
      <div className="flex px-8 pb-8">
        {/* Main Column */}
        <div className="w-[65%] pr-5">
          {sectionOrder
            .filter((key) => key !== 'personalInfo')
            .map((key) => renderMainSection(key))}
        </div>

        {/* Sidebar - Competency Grid */}
        <div className="w-[35%] pl-5 border-l border-gray-200">
          {sectionOrder
            .filter((key) => key !== 'personalInfo')
            .map((key) => renderSidebarSection(key))}
        </div>
      </div>
    </div>
  );
}
