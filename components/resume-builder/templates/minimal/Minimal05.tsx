'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

export default function Minimal05({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key}>
            <h2 className="text-sm font-medium text-gray-700 mb-3">Summary</h2>
            <p className="text-xs text-gray-600 leading-loose">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key}>
            <h2 className="text-sm font-medium text-gray-700 mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-800">{exp.role}</h3>
                      <p className="text-xs text-gray-500 mt-1">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-6">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-600 leading-loose">{h}</li>
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
          <div key={key}>
            <h2 className="text-sm font-medium text-gray-700 mb-4">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-xs text-gray-500 mt-1">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-6">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-[10px] text-gray-500 mt-2">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-600 leading-loose">{h}</li>
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
          <div key={key}>
            <h2 className="text-sm font-medium text-gray-700 mb-4">Skills</h2>
            <div className="space-y-3">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="text-xs text-gray-600 leading-loose">
                  <span className="font-medium text-gray-700">{skillGroup.category}:</span>{' '}
                  {skillGroup.items.join(', ')}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key}>
            <h2 className="text-sm font-medium text-gray-700 mb-4">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-xs font-semibold text-gray-800">
                    {proj.name}
                    {proj.url && <span className="text-gray-400 font-normal ml-2 text-[10px]">({proj.url})</span>}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 leading-loose">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <p className="text-[10px] text-gray-500 mt-1">{proj.technologies.join(', ')}</p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-600 leading-loose">{h}</li>
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
          <div key={key}>
            <h2 className="text-sm font-medium text-gray-700 mb-4">Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-xs font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{cert.issuer} · {formatDate(cert.date)}</p>
                  {cert.url && <p className="text-[10px] text-gray-400 mt-0.5">{cert.url}</p>}
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-16', className)}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-xl font-semibold text-gray-800">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-xs text-gray-500 mt-2">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-[10px] text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Sections with generous spacing */}
      <div className="space-y-8">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
