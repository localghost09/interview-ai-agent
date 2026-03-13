'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function getYear(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Now';
  return date.split('-')[0];
}

export default function Executive04({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderMainSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">Career Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">Career Timeline</h2>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[28px] top-2 bottom-0 w-[2px] bg-slate-300" />
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-3 mb-3 relative">
                  {/* Year marker */}
                  <div className="w-14 flex-shrink-0 text-right">
                    <span className="text-[10px] font-bold text-slate-600">{getYear(exp.startDate)}</span>
                  </div>
                  {/* Timeline dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600 border-2 border-white flex-shrink-0 mt-1 z-10" />
                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-gray-900">{exp.role}</h3>
                        <p className="text-[10px] text-slate-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                      </div>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} &ndash; {formatDate(exp.endDate)}</span>
                    </div>
                    {exp.highlights?.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="text-[10px] text-gray-700 pl-2.5 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400">{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'education':
        return education?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-[10px] text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-[10px] text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">Expertise</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-1.5">
                <span className="text-[10px] font-bold text-gray-800">{group.category}: </span>
                <span className="text-[10px] text-gray-700">{group.items.join(', ')}</span>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">Key Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-gray-900">{proj.name}</h3>
                  {proj.url && <span className="text-[10px] text-slate-600 ml-2 truncate max-w-[120px]">{proj.url}</span>}
                </div>
                <p className="text-[10px] text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-[9px] text-gray-500 mt-0.5">{proj.technologies.join(' | ')}</p>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">Credentials</h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span className="text-[10px] text-gray-800 font-medium">{cert.name} &mdash; {cert.issuer}</span>
                  <span className="text-[10px] text-gray-500">{formatDate(cert.date)}</span>
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

  // Quick stats for the sidebar strip
  const totalSkills = skills.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white flex', className)}>
      {/* Thin sidebar strip */}
      <div className="w-[60px] bg-slate-700 flex flex-col items-center py-6 gap-6 flex-shrink-0">
        <div className="text-center">
          <div className="text-lg font-bold text-white">{experience.length}</div>
          <div className="text-[8px] text-slate-300 uppercase tracking-wider">Roles</div>
        </div>
        <div className="w-6 h-[1px] bg-slate-500" />
        <div className="text-center">
          <div className="text-lg font-bold text-white">{totalSkills}</div>
          <div className="text-[8px] text-slate-300 uppercase tracking-wider">Skills</div>
        </div>
        <div className="w-6 h-[1px] bg-slate-500" />
        <div className="text-center">
          <div className="text-lg font-bold text-white">{projects.length}</div>
          <div className="text-[8px] text-slate-300 uppercase tracking-wider">Projects</div>
        </div>
        <div className="w-6 h-[1px] bg-slate-500" />
        <div className="text-center">
          <div className="text-lg font-bold text-white">{certifications.length}</div>
          <div className="text-[8px] text-slate-300 uppercase tracking-wider">Certs</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-7">
        {/* Header */}
        <div className="mb-5 pb-3 border-b-2 border-slate-700">
          <h1 className="text-2xl font-bold text-slate-800">{personalInfo.fullName}</h1>
          {personalInfo.title && <p className="text-sm text-slate-600 mt-0.5">{personalInfo.title}</p>}
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-500">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
            {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
          </div>
        </div>

        {/* Sections */}
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderMainSection(key))}
      </div>
    </div>
  );
}
