'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

export default function Minimal01({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Experience</h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-gray-700 leading-relaxed">{h}</li>
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
          <div key={key} className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-gray-700">{h}</li>
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
          <div key={key} className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="space-y-1.5">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">{skillGroup.category}:</span>{' '}
                  {skillGroup.items.join(', ')}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {proj.name}
                    {proj.url && <span className="text-gray-500 font-normal ml-2">({proj.url})</span>}
                  </h3>
                  <p className="text-sm text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <p className="text-sm text-gray-600 mt-0.5">{proj.technologies.join(', ')}</p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-gray-700">{h}</li>
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
          <div key={key} className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-sm font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}, {formatDate(cert.date)}</p>
                  {cert.url && <p className="text-sm text-gray-500">{cert.url}</p>}
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
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-sm text-gray-600 mt-1">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
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
