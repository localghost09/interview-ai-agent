'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3">
      <h2 className="font-serif text-xl font-bold text-amber-900 tracking-wide">{title}</h2>
      <div className="mt-1 h-[3px] w-full bg-gradient-to-r from-amber-400 via-orange-300 to-transparent rounded-full" />
    </div>
  );
}

export default function Creative03({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Summary" />
            <p className="text-sm text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Experience" />
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-amber-800 font-medium">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                    </div>
                    <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5 font-bold">~</span>
                          <span>{h}</span>
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
          <div key={key} className="mb-6">
            <SectionHeader title="Education" />
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-amber-800 font-medium">{edu.institution}{edu.location ? ` — ${edu.location}` : ''}</p>
                    </div>
                    <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="font-mono text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5 font-bold">~</span>
                          <span>{h}</span>
                        </li>
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
          <div key={key} className="mb-6">
            <SectionHeader title="Skills" />
            <div className="space-y-2 font-mono">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-amber-900">{skillGroup.category}:</span>{' '}
                  <span className="text-gray-700">{skillGroup.items.join(' | ')}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-6">
            <SectionHeader title="Projects" />
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-bold text-gray-900">
                    {proj.name}
                    {proj.url && <span className="text-amber-600 font-normal font-mono text-xs ml-2">({proj.url})</span>}
                  </h3>
                  <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <p className="font-mono text-[10px] text-amber-700 mt-1">
                      [{proj.technologies.join(', ')}]
                    </p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5 font-bold">~</span>
                          <span>{h}</span>
                        </li>
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
          <div key={key} className="mb-6">
            <SectionHeader title="Certifications" />
            <div className="space-y-2 font-mono">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  <span className="text-amber-700"> — {cert.issuer}, {formatDate(cert.date)}</span>
                  {cert.url && <span className="text-gray-500 block text-[10px]">{cert.url}</span>}
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white overflow-hidden', className)}>
      {/* Full-bleed warm header */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-500 to-orange-400 text-white px-10 py-8">
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-amber-100 text-sm mt-1 font-serif italic">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-amber-50 font-mono">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>·  {personalInfo.phone}</span>}
          {personalInfo.location && <span>·  {personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>·  {personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>·  {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>·  {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-8">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
