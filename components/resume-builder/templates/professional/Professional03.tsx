'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Professional03({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">Executive Summary</h2>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
            </div>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-3">Leadership Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{exp.role}</h3>
                    <p className="text-xs text-purple-600 font-medium">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4 mt-1">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-gray-700">{h}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{edu.degree}</h3>
                    <p className="text-xs text-purple-600 font-medium">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4 mt-1">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-purple-500">{h}</li>
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
            <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">Core Competencies</h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((group, i) => (
                <div key={i} className="bg-purple-50 rounded-lg p-3">
                  <h3 className="text-xs font-bold text-purple-800 mb-1">{group.category}</h3>
                  <p className="text-[10px] text-gray-700">{group.items.join(' | ')}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">Strategic Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-purple-600 ml-2 truncate max-w-[150px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="mt-1.5 space-y-1">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-gray-700">{h}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">Certifications &amp; Credentials</h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-purple-50 rounded-lg p-3">
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-8', className)}>
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-purple-700">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-purple-700 font-semibold mt-0.5">{personalInfo.title}</p>}
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
