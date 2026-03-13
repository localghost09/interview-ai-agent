'use client';

import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function ATS06({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  const renderMainSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-4">
            <h2 className="text-sm font-bold text-black uppercase mb-1">Summary</h2>
            <p className="text-xs text-gray-800 leading-relaxed">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-sm font-bold text-black uppercase mb-1">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-black">{exp.role}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-2">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-xs text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.highlights?.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
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
          <div key={key} className="mb-4">
            <h2 className="text-sm font-bold text-black uppercase mb-1">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-black">{edu.degree}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-2">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
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
          <div key={key} className="mb-4">
            <h2 className="text-sm font-bold text-black uppercase mb-1">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <h3 className="text-xs font-bold text-black">{proj.name}</h3>
                <p className="text-xs text-gray-700">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5">Technologies: {proj.technologies.join(', ')}</p>
                )}
                {proj.url && <p className="text-xs text-gray-600">{proj.url}</p>}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700">{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'certifications':
        return certifications?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-sm font-bold text-black uppercase mb-1">Certifications</h2>
            {certifications.map((cert) => (
              <p key={cert.id} className="text-xs text-gray-700 mb-0.5">
                {cert.name} - {cert.issuer}, {formatDate(cert.date)}
              </p>
            ))}
          </div>
        ) : null;

      case 'skills':
      case 'personalInfo':
        return null;

      default:
        return null;
    }
  };

  const renderSidebarSection = (key: ResumeSectionKey) => {
    switch (key) {
      case 'skills':
        return skills?.length > 0 ? (
          <div key={key} className="mb-4">
            <h2 className="text-xs font-bold text-black uppercase mb-1">Skills</h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2">
                <h3 className="text-[10px] font-bold text-gray-800">{group.category}</h3>
                <p className="text-[10px] text-gray-700">{group.items.join(', ')}</p>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-[794px] min-h-[1123px] bg-white', className)}>
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-xl font-bold text-black">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-xs text-gray-600 mt-0.5">{personalInfo.title}</p>}
      </div>

      {/* Two Column */}
      <div className="flex px-8 pb-8">
        {/* Left Sidebar - narrow */}
        <div className="w-[28%] pr-4 border-r border-gray-300">
          {/* Contact */}
          <div className="mb-4">
            <h2 className="text-xs font-bold text-black uppercase mb-1">Contact</h2>
            <div className="space-y-0.5 text-[10px] text-gray-700">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
              {personalInfo.linkedIn && <p>{personalInfo.linkedIn}</p>}
              {personalInfo.github && <p>{personalInfo.github}</p>}
              {personalInfo.portfolio && <p>{personalInfo.portfolio}</p>}
            </div>
          </div>

          {/* Sidebar sections */}
          {sectionOrder
            .filter((key) => key !== 'personalInfo')
            .map((key) => renderSidebarSection(key))}
        </div>

        {/* Right Main - wide */}
        <div className="w-[72%] pl-5">
          {sectionOrder
            .filter((key) => key !== 'personalInfo')
            .map((key) => renderMainSection(key))}
        </div>
      </div>
    </div>
  );
}
