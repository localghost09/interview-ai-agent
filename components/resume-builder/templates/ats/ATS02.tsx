'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function ATS02({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-3">
            <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-1">Summary</h2>
            <hr className="border-gray-400 mb-1.5" />
            <p className="text-xs text-black leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-3">
            <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-1">Professional Experience</h2>
            <hr className="border-gray-400 mb-1.5" />
            {experience.map((exp) => (
              <div key={exp.id} className="mb-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-black">{exp.company}</span>
                    <span className="text-xs text-black">{exp.location ? `, ${exp.location}` : ''}</span>
                  </div>
                  <span className="text-xs text-black whitespace-nowrap ml-4">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-xs text-black">{exp.role}</p>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-0.5 list-disc list-outside ml-4 space-y-0">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-black leading-tight">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-3">
            <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-1">Education</h2>
            <hr className="border-gray-400 mb-1.5" />
            {education.map((edu) => (
              <div key={edu.id} className="mb-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-black">{edu.institution}</span>
                    <span className="text-xs text-black">{edu.location ? `, ${edu.location}` : ''}</span>
                  </div>
                  <span className="text-xs text-black whitespace-nowrap ml-4">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <p className="text-xs text-black">{edu.degree}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-0.5 list-disc list-outside ml-4 space-y-0">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-black leading-tight">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-3">
            <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-1">Skills</h2>
            <hr className="border-gray-400 mb-1.5" />
            {skills.map((group, i) => (
              <p key={i} className="text-xs text-black mb-0.5">
                <span className="font-bold">{group.category}: </span>
                {group.items.join(', ')}
              </p>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-3">
            <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-1">Projects</h2>
            <hr className="border-gray-400 mb-1.5" />
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <span className="text-xs font-bold text-black">{proj.name}</span>
                {proj.url && <span className="text-xs text-black"> ({proj.url})</span>}
                <p className="text-xs text-black">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-black">Technologies: {proj.technologies.join(', ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-0.5 list-disc list-outside ml-4 space-y-0">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-black leading-tight">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-3">
            <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-1">Certifications</h2>
            <hr className="border-gray-400 mb-1.5" />
            {certifications.map((cert) => (
              <p key={cert.id} className="text-xs text-black mb-0.5">
                <span className="font-bold">{cert.name}</span> - {cert.issuer}, {formatDate(cert.date)}
              </p>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-7', className)}>
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-lg font-bold text-black">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-xs text-black">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-2 mt-0.5 text-xs text-black">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <><span>|</span><span>{personalInfo.linkedIn}</span></>}
          {personalInfo.github && <><span>|</span><span>{personalInfo.github}</span></>}
          {personalInfo.portfolio && <><span>|</span><span>{personalInfo.portfolio}</span></>}
        </div>
      </div>
      <hr className="border-gray-400 mb-3" />

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
