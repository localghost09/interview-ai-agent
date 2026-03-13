'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function ATS04({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-black uppercase mb-2">SUMMARY</h2>
            <p className="text-xs text-gray-800 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-black uppercase mb-2">WORK EXPERIENCE</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-black">{exp.role}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4 text-right">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-xs text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
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
            <h2 className="text-sm font-bold text-black uppercase mb-2">EDUCATION</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-black">{edu.degree}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4 text-right">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <p className="text-xs text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-xs text-gray-700 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
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
            <h2 className="text-sm font-bold text-black uppercase mb-2">SKILLS</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-1">
                <span className="text-xs font-bold text-black">{group.category}: </span>
                <span className="text-xs text-gray-700">{group.items.join(', ')}</span>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-black uppercase mb-2">PROJECTS</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <h3 className="text-sm font-bold text-black">{proj.name}</h3>
                <p className="text-xs text-gray-700">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5">Technologies: {proj.technologies.join(', ')}</p>
                )}
                {proj.url && <p className="text-xs text-gray-600">{proj.url}</p>}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
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
            <h2 className="text-sm font-bold text-black uppercase mb-2">CERTIFICATIONS</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-1 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-black">{cert.name}</span>
                  <span className="text-xs text-gray-700"> - {cert.issuer}</span>
                </div>
                <span className="text-xs text-gray-600 ml-4">{formatDate(cert.date)}</span>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-8', className)}>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-black">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-xs text-gray-600 mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-600">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <><span>|</span><span>{personalInfo.linkedIn}</span></>}
          {personalInfo.github && <><span>|</span><span>{personalInfo.github}</span></>}
          {personalInfo.portfolio && <><span>|</span><span>{personalInfo.portfolio}</span></>}
        </div>
        <hr className="border-gray-300 mt-3" />
      </div>

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
