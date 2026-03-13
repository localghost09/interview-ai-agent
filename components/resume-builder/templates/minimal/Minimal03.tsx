'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

export default function Minimal03({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const leftSections = ['summary', 'experience', 'projects'];
  const rightSections = ['education', 'skills', 'certifications'];

  const orderedLeft = sectionOrder.filter((key) => key !== 'personalInfo' && leftSections.includes(key));
  const orderedRight = sectionOrder.filter((key) => key !== 'personalInfo' && rightSections.includes(key));

  const renderSectionContent = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Summary</h2>
            <p className="text-xs text-gray-600 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-xs font-semibold text-gray-800">{exp.role}</h3>
                  <p className="text-xs text-gray-500">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  <p className="text-[10px] text-gray-400">
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </p>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-gray-600 leading-relaxed">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-xs text-gray-500">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  <p className="text-[10px] text-gray-400">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && <p className="text-[10px] text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-gray-600 leading-relaxed">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Skills</h2>
            <div className="space-y-1.5">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <p className="text-xs font-medium text-gray-700">{skillGroup.category}</p>
                  <p className="text-[11px] text-gray-500">{skillGroup.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Projects</h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-xs font-semibold text-gray-800">
                    {proj.name}
                    {proj.url && <span className="text-gray-400 font-normal ml-1 text-[10px]">({proj.url})</span>}
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{proj.technologies.join(', ')}</p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-gray-600 leading-relaxed">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-xs font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-[10px] text-gray-500">{cert.issuer} · {formatDate(cert.date)}</p>
                  {cert.url && <p className="text-[10px] text-gray-400">{cert.url}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-8', className)}>
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-xs text-gray-500 mt-0.5">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Two-column wireframe layout */}
      <div className="flex border border-gray-200">
        {/* Left Column */}
        <div className="flex-1 p-5 border-r border-gray-200">
          {orderedLeft.map((key) => renderSectionContent(key))}
        </div>

        {/* Right Column */}
        <div className="w-[280px] p-5">
          {orderedRight.map((key) => renderSectionContent(key))}
        </div>
      </div>
    </div>
  );
}
