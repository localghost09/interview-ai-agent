export function createEmptyResumeData(): ResumeData {
  return {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      portfolio: '',
      title: '',
    },
    summary: {
      content: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    sectionOrder: [
      'personalInfo',
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
    ],
  };
}

export function createEducationEntry(): ResumeEducation {
  return {
    id: crypto.randomUUID(),
    institution: '',
    degree: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    highlights: [],
  };
}

export function createExperienceEntry(): ResumeExperience {
  return {
    id: crypto.randomUUID(),
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    highlights: [''],
  };
}

export function createProjectEntry(): ResumeProject {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    technologies: [],
    url: '',
    highlights: [],
  };
}

export function createCertificationEntry(): ResumeCertification {
  return {
    id: crypto.randomUUID(),
    name: '',
    issuer: '',
    date: '',
    url: '',
  };
}

export function createSkillCategory(): ResumeSkill {
  return {
    category: '',
    items: [],
  };
}
