'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function Tech03({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b-2 border-orange-500">About</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b-2 border-orange-500">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded min-w-[28px] text-center">
                      {experience.indexOf(exp) + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-xs text-gray-600">{exp.company}{exp.location ? ` - ${exp.location}` : ''}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1.5 ml-9 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-orange-500">{h}</li>
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
            <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b-2 border-orange-500">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}{edu.location ? ` - ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-orange-500">{h}</li>
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
            <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b-2 border-orange-500">Tags</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-1.5">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, j) => (
                    <span key={j} className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-5">
            <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b-2 border-orange-500">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-blue-700">{proj.name}</h3>
                  {proj.url && <span className="text-xs text-orange-500 ml-2 truncate max-w-[150px]">{proj.url}</span>}
                </div>
                <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-orange-500">{h}</li>
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
            <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b-2 border-orange-500">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-2">
                  <div className="bg-yellow-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded min-w-[20px] text-center">
                    {'\u2605'}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-800">{cert.name}</h3>
                    <p className="text-[10px] text-gray-500">{cert.issuer} &middot; {formatDate(cert.date)}</p>
                  </div>
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
      {/* Header */}
      <div className="border-b-4 border-orange-500 px-8 py-5">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName}</h1>
            {personalInfo.title && <p className="text-sm text-orange-500 font-medium mt-0.5">{personalInfo.title}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 border border-orange-200 rounded px-3 py-1 text-center">
              <div className="text-lg font-bold text-orange-500">{experience.length}</div>
              <div className="text-[9px] text-gray-500">roles</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded px-3 py-1 text-center">
              <div className="text-lg font-bold text-orange-500">{projects.length}</div>
              <div className="text-[9px] text-gray-500">projects</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded px-3 py-1 text-center">
              <div className="text-lg font-bold text-orange-500">{skills.reduce((acc, s) => acc + s.items.length, 0)}</div>
              <div className="text-[9px] text-gray-500">skills</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-gray-500">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
