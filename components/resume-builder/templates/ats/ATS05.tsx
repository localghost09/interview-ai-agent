'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function ATS05({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-black uppercase mb-1 border-b border-black pb-0.5">Objective</h2>
            <p className="text-xs text-black leading-relaxed mt-1.5">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-black uppercase mb-1 border-b border-black pb-0.5">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 mt-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-black">{exp.role}</h3>
                    <p className="text-xs text-black italic">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-black whitespace-nowrap ml-4">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-black">{h}</li>
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
            <h2 className="font-serif text-sm font-bold text-black uppercase mb-1 border-b border-black pb-0.5">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 mt-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-black">{edu.degree}</h3>
                    <p className="text-xs text-black italic">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-black whitespace-nowrap ml-4">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-black mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-black">{h}</li>
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
            <h2 className="font-serif text-sm font-bold text-black uppercase mb-1 border-b border-black pb-0.5">Skills</h2>
            <div className="mt-1.5">
              {skills.map((group, i) => (
                <p key={i} className="text-xs text-black mb-0.5">
                  <span className="font-bold">{group.category}: </span>
                  {group.items.join(', ')}
                </p>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="font-serif text-sm font-bold text-black uppercase mb-1 border-b border-black pb-0.5">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2 mt-1.5">
                <h3 className="text-sm font-bold text-black">{proj.name}</h3>
                <p className="text-xs text-black">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-black italic mt-0.5">Technologies: {proj.technologies.join(', ')}</p>
                )}
                {proj.url && <p className="text-xs text-black">{proj.url}</p>}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-black">{h}</li>
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
            <h2 className="font-serif text-sm font-bold text-black uppercase mb-1 border-b border-black pb-0.5">Certifications</h2>
            <div className="mt-1.5 space-y-0.5">
              {certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-black">
                  {cert.name} - {cert.issuer}, {formatDate(cert.date)}
                </p>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-10', className)}>
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="font-serif text-2xl font-bold text-black">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="font-serif text-sm text-black mt-0.5">{personalInfo.title}</p>}
        <div className="flex justify-center flex-wrap gap-x-2 mt-1.5 text-xs text-black">
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

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
