'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Tech01({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  let lineNum = 1;
  const getLine = () => lineNum++;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold font-mono text-green-400 mb-2">/* Summary */</h2>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 font-mono">
              <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
            </div>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold font-mono text-green-400 mb-2">/* Experience */</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 bg-gray-50 border border-gray-200 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold font-mono text-gray-900">{exp.role}</h3>
                    <p className="text-xs font-mono text-green-600">{exp.company}{exp.location ? ` // ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <div className="mt-2 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="flex text-xs font-mono">
                        <span className="text-gray-400 w-6 text-right mr-2 select-none flex-shrink-0">{getLine()}</span>
                        <span className="text-gray-700">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold font-mono text-green-400 mb-2">/* Education */</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 bg-gray-50 border border-gray-200 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold font-mono text-gray-900">{edu.degree}</h3>
                    <p className="text-xs font-mono text-green-600">{edu.institution}{edu.location ? ` // ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs font-mono text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <div key={i} className="flex text-xs font-mono">
                        <span className="text-gray-400 w-6 text-right mr-2 select-none flex-shrink-0">{getLine()}</span>
                        <span className="text-gray-700">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold font-mono text-green-400 mb-2">/* Skills */</h2>
            <div className="bg-gray-50 border border-gray-200 rounded p-3">
              {skills.map((group, i) => (
                <div key={i} className="mb-2">
                  <span className="text-xs font-mono font-bold text-gray-800">{`const ${group.category.replace(/\s+/g, '_')} = `}</span>
                  <span className="text-xs font-mono text-green-700">[{group.items.map(item => `"${item}"`).join(', ')}]</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold font-mono text-green-400 mb-2">/* Projects */</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 bg-gray-50 border border-gray-200 rounded p-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold font-mono text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-xs font-mono text-green-600 ml-2 truncate max-w-[150px]">{proj.url}</span>}
                </div>
                <p className="text-xs font-mono text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="flex text-xs font-mono">
                        <span className="text-gray-400 w-6 text-right mr-2 select-none flex-shrink-0">{getLine()}</span>
                        <span className="text-gray-700">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold font-mono text-green-400 mb-2">/* Certifications */</h2>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="font-mono">
                  <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                  <span className="text-[10px] text-gray-500"> // {cert.issuer} | {formatDate(cert.date)}</span>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white', className)}>
      {/* Terminal Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="text-xs font-mono text-gray-400 ml-3">~/resume/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>

      {/* Header Info */}
      <div className="bg-gray-900 px-6 pb-5">
        <h1 className="text-2xl font-bold font-mono text-green-400">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm font-mono text-gray-400 mt-0.5">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs font-mono text-gray-500">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
