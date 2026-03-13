'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Classic02({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const leftSections: ResumeSectionKey[] = ['skills', 'certifications'];
  const rightSections: ResumeSectionKey[] = ['summary', 'experience', 'education', 'projects'];

  const renderLeftSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-2 pb-1 border-b border-slate-600">Skills</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2">
                <h3 className="text-[10px] font-semibold text-slate-300 mb-0.5">{group.category}</h3>
                <div className="space-y-0.5">
                  {group.items.map((item, j) => (
                    <p key={j} className="text-[10px] text-slate-400">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-2 pb-1 border-b border-slate-600">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <h3 className="text-[10px] font-semibold text-slate-200">{cert.name}</h3>
                <p className="text-[9px] text-slate-400">{cert.issuer}</p>
                <p className="text-[9px] text-slate-500">{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  const renderRightSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-slate-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 list-disc list-outside ml-4">
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
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-slate-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
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
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-[10px] text-slate-500 ml-2 truncate max-w-[160px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-0.5 italic">Tech: {proj.technologies.join(', ')}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex', className)}>
      {/* Left column - dark */}
      <div className="w-[40%] bg-slate-800 text-white p-6">
        {/* Personal Info */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white leading-tight">{personalInfo.fullName}</h1>
          {personalInfo.title && <p className="text-xs text-slate-300 font-medium mt-1">{personalInfo.title}</p>}
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h2 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-2 pb-1 border-b border-slate-600">Contact</h2>
          <div className="space-y-1.5 text-[10px] text-slate-300">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
            {personalInfo.linkedIn && <p className="truncate">{personalInfo.linkedIn}</p>}
            {personalInfo.github && <p className="truncate">{personalInfo.github}</p>}
            {personalInfo.portfolio && <p className="truncate">{personalInfo.portfolio}</p>}
          </div>
        </div>

        {/* Sidebar sections */}
        {sectionOrder
          .filter((key) => key !== 'personalInfo' && leftSections.includes(key))
          .map((key) => renderLeftSection(key))}
      </div>

      {/* Right column */}
      <div className="w-[60%] p-6">
        {sectionOrder
          .filter((key) => key !== 'personalInfo' && rightSections.includes(key))
          .map((key) => renderRightSection(key))}
      </div>
    </div>
  );
}
