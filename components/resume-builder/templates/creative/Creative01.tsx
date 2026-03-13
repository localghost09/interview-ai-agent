'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

const sectionColors: Record<string, string> = {
  summary: 'bg-yellow-50',
  experience: 'bg-pink-50',
  education: 'bg-blue-50',
  skills: 'bg-green-50',
  projects: 'bg-purple-50',
  certifications: 'bg-orange-50',
};

const sectionIcons: Record<string, string> = {
  summary: '📝',
  experience: '💼',
  education: '🎓',
  skills: '⚡',
  projects: '🚀',
  certifications: '🏅',
};

export default function Creative01({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className={cn('rounded-xl p-5', sectionColors[key])}>
            <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-200 text-sm">{sectionIcons[key]}</span>
              Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className={cn('rounded-xl p-5', sectionColors[key])}>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-200 text-sm">{sectionIcons[key]}</span>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-pink-700 font-medium">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                          <span className="text-pink-400 mt-0.5">●</span>
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
          <div key={key} className={cn('rounded-xl p-5', sectionColors[key])}>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 text-sm">{sectionIcons[key]}</span>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-blue-700 font-medium">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                          <span className="text-blue-400 mt-0.5">●</span>
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
          <div key={key} className={cn('rounded-xl p-5', sectionColors[key])}>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-200 text-sm">{sectionIcons[key]}</span>
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <span className="text-xs font-bold text-green-800">{skillGroup.category}: </span>
                  <span className="text-xs text-gray-700">{skillGroup.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className={cn('rounded-xl p-5', sectionColors[key])}>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-200 text-sm">{sectionIcons[key]}</span>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-bold text-gray-900">
                      {proj.name}
                      {proj.url && (
                        <span className="text-purple-500 font-normal text-xs ml-2">({proj.url})</span>
                      )}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full">{tech}</span>
                      ))}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                          <span className="text-purple-400 mt-0.5">●</span>
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
          <div key={key} className={cn('rounded-xl p-5', sectionColors[key])}>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-200 text-sm">{sectionIcons[key]}</span>
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-xs text-orange-700">{cert.issuer} · {formatDate(cert.date)}</p>
                    {cert.url && <p className="text-[10px] text-gray-500">{cert.url}</p>}
                  </div>
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
    <div className={cn('w-[794px] min-h-[1123px] bg-white p-10', className)}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          {personalInfo.fullName}
        </h1>
        {personalInfo.title && (
          <p className="text-sm text-gray-600 mt-1 font-medium">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>·  {personalInfo.phone}</span>}
          {personalInfo.location && <span>·  {personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>·  {personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>·  {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>·  {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sectionOrder
          .filter((key) => key !== 'personalInfo')
          .map((key) => renderSection(key))}
      </div>
    </div>
  );
}
