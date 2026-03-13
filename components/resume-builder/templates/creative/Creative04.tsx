'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

const tileColors = [
  'bg-emerald-100 text-emerald-800',
  'bg-sky-100 text-sky-800',
  'bg-violet-100 text-violet-800',
  'bg-rose-100 text-rose-800',
  'bg-amber-100 text-amber-800',
  'bg-teal-100 text-teal-800',
  'bg-fuchsia-100 text-fuchsia-800',
  'bg-lime-100 text-lime-800',
];

const categoryHeaderColors = [
  'bg-emerald-500',
  'bg-sky-500',
  'bg-violet-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-teal-500',
  'bg-fuchsia-500',
  'bg-lime-500',
];

export default function Creative04({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-2 border-b-2 border-gray-300 pb-1">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-2 border-b-2 border-gray-300 pb-1">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap ml-3 bg-white px-2 py-0.5 rounded">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-gray-700 flex items-start gap-1.5">
                          <span className="text-indigo-400 mt-0.5 text-[8px]">&#9632;</span>
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
          <div key={key} className="mb-5">
            <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-2 border-b-2 border-gray-300 pb-1">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap ml-3 bg-white px-2 py-0.5 rounded">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-[10px] text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-gray-700 flex items-start gap-1.5">
                          <span className="text-indigo-400 mt-0.5 text-[8px]">&#9632;</span>
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
          <div key={key} className="mb-5">
            <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-2 border-b-2 border-gray-300 pb-1">Skills</h2>
            <div className="space-y-3">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={cn('w-2 h-2 rounded-sm', categoryHeaderColors[idx % categoryHeaderColors.length])} />
                    <span className="text-xs font-bold text-gray-800">{skillGroup.category}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {skillGroup.items.map((item, i) => (
                      <div
                        key={i}
                        className={cn(
                          'text-[10px] font-semibold px-2 py-1.5 rounded-md text-center',
                          tileColors[idx % tileColors.length]
                        )}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-2 border-b-2 border-gray-300 pb-1">Projects</h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((proj, idx) => (
                <div key={proj.id} className={cn('rounded-lg p-3', tileColors[idx % tileColors.length].split(' ')[0])}>
                  <h3 className="text-xs font-bold text-gray-900">
                    {proj.name}
                    {proj.url && <span className="text-gray-500 font-normal text-[10px] block">{proj.url}</span>}
                  </h3>
                  <p className="text-[10px] text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[9px] bg-white/60 text-gray-700 px-1.5 py-0.5 rounded">{tech}</span>
                      ))}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-[10px] text-gray-700 flex items-start gap-1">
                          <span className="text-gray-400 mt-0.5 text-[8px]">&#9632;</span>
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
          <div key={key} className="mb-5">
            <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-2 border-b-2 border-gray-300 pb-1">Certifications</h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert, idx) => (
                <div key={cert.id} className={cn('rounded-lg p-2.5', tileColors[idx % tileColors.length].split(' ')[0])}>
                  <h3 className="text-xs font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-[10px] text-gray-600">{cert.issuer} · {formatDate(cert.date)}</p>
                  {cert.url && <p className="text-[9px] text-gray-500 mt-0.5">{cert.url}</p>}
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
      <div className="mb-5 pb-4 border-b-2 border-gray-300">
        <div className="flex items-end gap-4">
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
            {['bg-emerald-400', 'bg-sky-400', 'bg-violet-400', 'bg-rose-400', 'bg-amber-400', 'bg-teal-400'].map((color, i) => (
              <div key={i} className={cn('w-3 h-3 rounded-sm', color)} />
            ))}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
            {personalInfo.title && (
              <p className="text-sm text-indigo-600 font-semibold">{personalInfo.title}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-2.5 text-[11px] text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>·  {personalInfo.phone}</span>}
          {personalInfo.location && <span>·  {personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>·  {personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>·  {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>·  {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
