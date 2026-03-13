'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Professional05({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-semibold text-navy-800 uppercase tracking-widest mb-2 text-[#1e3a5f]">Professional Profile</h2>
            <div className="border-t border-[#1e3a5f] pt-2">
              <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
            </div>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#1e3a5f]">Engagement History</h2>
            <div className="border-t border-[#1e3a5f] pt-2">
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                  </div>
                  <p className="text-xs text-[#1e3a5f] font-medium">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-gray-400 before:text-[10px]">{h}</li>
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
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#1e3a5f]">Education</h2>
            <div className="border-t border-[#1e3a5f] pt-2">
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                  </div>
                  <p className="text-xs text-[#1e3a5f] font-medium">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-gray-400 before:text-[10px]">{h}</li>
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
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#1e3a5f]">Areas of Expertise</h2>
            <div className="border-t border-[#1e3a5f] pt-2">
              {skills.map((group, i) => (
                <div key={i} className="mb-2">
                  <span className="text-xs font-semibold text-gray-800">{group.category}: </span>
                  <span className="text-xs text-gray-700">{group.items.join(' | ')}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#1e3a5f]">Key Engagements</h2>
            <div className="border-t border-[#1e3a5f] pt-2">
              {projects.map((proj) => (
                <div key={proj.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                    {proj.url && <span className="text-xs text-[#1e3a5f] ml-2 truncate max-w-[150px]">{proj.url}</span>}
                  </div>
                  <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <p className="text-[10px] text-gray-500 mt-0.5">{proj.technologies.join(' | ')}</p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-gray-400 before:text-[10px]">{h}</li>
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
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-2 text-[#1e3a5f]">Professional Certifications</h2>
            <div className="border-t border-[#1e3a5f] pt-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                    <span className="text-xs text-gray-600"> — {cert.issuer}</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-10', className)}>
      {/* Header */}
      <div className="mb-6 text-center pb-4 border-b-2 border-[#1e3a5f]">
        <h1 className="text-2xl font-semibold text-[#1e3a5f] tracking-wide">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm text-gray-600 mt-0.5">{personalInfo.title}</p>}
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-gray-500">
          <span>{personalInfo.email}</span>
          <span className="text-gray-300">|</span>
          <span>{personalInfo.phone}</span>
          <span className="text-gray-300">|</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <><span className="text-gray-300">|</span><span>{personalInfo.linkedIn}</span></>}
          {personalInfo.github && <><span className="text-gray-300">|</span><span>{personalInfo.github}</span></>}
          {personalInfo.portfolio && <><span className="text-gray-300">|</span><span>{personalInfo.portfolio}</span></>}
        </div>
      </div>

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
