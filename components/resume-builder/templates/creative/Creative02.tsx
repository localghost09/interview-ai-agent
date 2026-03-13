'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

function SectionMarker({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-0 h-0 border-l-[10px] border-l-fuchsia-700 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"
      />
      <h2 className="text-base font-extrabold text-fuchsia-700 uppercase tracking-wider">{label}</h2>
    </div>
  );
}

export default function Creative02({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="bg-fuchsia-50 p-5 -mt-2 relative" style={{ clipPath: 'polygon(0 0, 100% 4px, 100% 100%, 0 calc(100% - 4px))' }}>
            <SectionMarker label="Summary" />
            <p className="text-sm text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="bg-white p-5 -mt-2 relative" style={{ clipPath: 'polygon(0 4px, 100% 0, 100% calc(100% - 4px), 0 100%)' }}>
            <SectionMarker label="Experience" />
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-fuchsia-300 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-fuchsia-700 font-medium">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-0 before:h-0 before:border-l-[4px] before:border-l-fuchsia-400 before:border-t-[3px] before:border-t-transparent before:border-b-[3px] before:border-b-transparent">
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
          <div key={key} className="bg-fuchsia-50 p-5 -mt-2 relative" style={{ clipPath: 'polygon(0 0, 100% 4px, 100% 100%, 0 calc(100% - 4px))' }}>
            <SectionMarker label="Education" />
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-fuchsia-300 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-fuchsia-700 font-medium">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-0 before:h-0 before:border-l-[4px] before:border-l-fuchsia-400 before:border-t-[3px] before:border-t-transparent before:border-b-[3px] before:border-b-transparent">
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

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="bg-white p-5 -mt-2 relative" style={{ clipPath: 'polygon(0 4px, 100% 0, 100% calc(100% - 4px), 0 100%)' }}>
            <SectionMarker label="Skills" />
            <div className="space-y-2">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <span className="text-xs font-bold text-fuchsia-800 uppercase">{skillGroup.category}: </span>
                  <span className="text-xs text-gray-700">{skillGroup.items.join(' · ')}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="bg-fuchsia-50 p-5 -mt-2 relative" style={{ clipPath: 'polygon(0 0, 100% 4px, 100% 100%, 0 calc(100% - 4px))' }}>
            <SectionMarker label="Projects" />
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-fuchsia-300 pl-4">
                  <h3 className="text-sm font-bold text-gray-900">
                    {proj.name}
                    {proj.url && <span className="text-fuchsia-500 font-normal text-xs ml-2">({proj.url})</span>}
                  </h3>
                  <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] bg-fuchsia-200 text-fuchsia-800 px-2 py-0.5 rounded">{tech}</span>
                      ))}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-0 before:h-0 before:border-l-[4px] before:border-l-fuchsia-400 before:border-t-[3px] before:border-t-transparent before:border-b-[3px] before:border-b-transparent">
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

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="bg-white p-5 -mt-2 relative" style={{ clipPath: 'polygon(0 4px, 100% 0, 100% calc(100% - 4px), 0 100%)' }}>
            <SectionMarker label="Certifications" />
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="border-l-2 border-fuchsia-300 pl-4">
                  <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-xs text-fuchsia-700">{cert.issuer} · {formatDate(cert.date)}</p>
                  {cert.url && <p className="text-[10px] text-gray-500">{cert.url}</p>}
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
      {/* Header */}
      <div className="bg-fuchsia-700 text-white p-8" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), 0 100%)' }}>
        <h1 className="text-3xl font-extrabold tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-fuchsia-200 text-sm mt-1 font-medium">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-fuchsia-100">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|  {personalInfo.phone}</span>}
          {personalInfo.location && <span>|  {personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>|  {personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>|  {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>|  {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Sections */}
      <div className="px-8 py-4">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
