'use client';

import { cn } from '@/lib/utils';

const formatDate = (date: string): string => {
  if (!date || date.toLowerCase() === 'present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

let sectionCounter = 0;

function DoodleHeading({ title, number }: { title: string; number: number }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-7 h-7 rounded-full border-2 border-purple-500 flex items-center justify-center text-xs font-bold text-purple-600">
        {number}
      </div>
      <h2 className="text-base font-bold text-gray-800 border-b-2 border-dashed border-purple-300 pb-0.5">{title}</h2>
    </div>
  );
}

export default function Creative06({ data, className }: TemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, sectionOrder } = data;

  sectionCounter = 0;

  const getNextNumber = () => {
    sectionCounter += 1;
    return sectionCounter;
  };

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary?.content ? (
          <div key={key} className="mb-6">
            <DoodleHeading title="About Me" number={getNextNumber()} />
            <p className="text-sm text-gray-700 leading-relaxed pl-10">{summary.content}</p>
          </div>
        ) : null;

      case 'experience':
        return experience?.length > 0 ? (
          <div key={key} className="mb-6">
            <DoodleHeading title="Experience" number={getNextNumber()} />
            <div className="space-y-4 pl-10">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-purple-50 rounded-2xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-purple-600 font-medium">{exp.company}{exp.location ? ` ~ ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4 bg-white px-2 py-0.5 rounded-full">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">~</span>
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
            <DoodleHeading title="Education" number={getNextNumber()} />
            <div className="space-y-3 pl-10">
              {education.map((edu) => (
                <div key={edu.id} className="bg-purple-50 rounded-2xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-purple-600 font-medium">{edu.institution}{edu.location ? ` ~ ${edu.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4 bg-white px-2 py-0.5 rounded-full">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-0.5">GPA: {edu.gpa}</p>}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">~</span>
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
            <DoodleHeading title="Skills" number={getNextNumber()} />
            <div className="pl-10 space-y-2">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <span className="text-xs font-bold text-purple-700">{skillGroup.category}: </span>
                  <span className="text-xs text-gray-700">
                    {skillGroup.items.map((item, i) => (
                      <span key={i}>
                        <span className="bg-purple-100 px-1.5 py-0.5 rounded-full inline-block mr-1 mb-1">{item}</span>
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects?.length > 0 ? (
          <div key={key} className="mb-6">
            <DoodleHeading title="Projects" number={getNextNumber()} />
            <div className="space-y-3 pl-10">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-purple-50 rounded-2xl p-4">
                  <h3 className="text-sm font-bold text-gray-900">
                    {proj.name}
                    {proj.url && <span className="text-purple-500 font-normal text-xs ml-2">({proj.url})</span>}
                  </h3>
                  <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] bg-white text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">{tech}</span>
                      ))}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">~</span>
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
            <DoodleHeading title="Certifications" number={getNextNumber()} />
            <div className="space-y-2 pl-10">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-xs text-purple-600">{cert.issuer} · {formatDate(cert.date)}</p>
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
      <div className="text-center mb-8 pb-4 border-b-2 border-dashed border-purple-300">
        <h1 className="text-3xl font-extrabold text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-sm text-purple-500 mt-1 font-medium">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {personalInfo.email && (
            <span className="text-xs text-gray-600 bg-purple-50 px-3 py-1 rounded-full">{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="text-xs text-gray-600 bg-purple-50 px-3 py-1 rounded-full">{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="text-xs text-gray-600 bg-purple-50 px-3 py-1 rounded-full">{personalInfo.location}</span>
          )}
          {personalInfo.linkedIn && (
            <span className="text-xs text-gray-600 bg-purple-50 px-3 py-1 rounded-full">{personalInfo.linkedIn}</span>
          )}
          {personalInfo.github && (
            <span className="text-xs text-gray-600 bg-purple-50 px-3 py-1 rounded-full">{personalInfo.github}</span>
          )}
          {personalInfo.portfolio && (
            <span className="text-xs text-gray-600 bg-purple-50 px-3 py-1 rounded-full">{personalInfo.portfolio}</span>
          )}
        </div>
      </div>

      {/* Sections */}
      {sectionOrder
        .filter((key) => key !== 'personalInfo')
        .map((key) => renderSection(key))}
    </div>
  );
}
