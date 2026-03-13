export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/janesmith',
    github: 'github.com/janesmith',
    portfolio: 'janesmith.dev',
    title: 'Senior Software Engineer',
  },
  summary: {
    content:
      'Results-driven software engineer with 6+ years of experience building scalable web applications and leading cross-functional teams. Passionate about clean architecture, developer experience, and delivering impactful products. Proven track record of reducing deployment times by 40% and improving system reliability to 99.9% uptime.',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'Stanford University',
      degree: 'M.S. Computer Science',
      location: 'Stanford, CA',
      startDate: '2016-09',
      endDate: '2018-06',
      gpa: '3.9',
      highlights: [
        'Focus on Distributed Systems and Machine Learning',
        'Teaching Assistant for CS 229 (Machine Learning)',
      ],
    },
    {
      id: 'edu-2',
      institution: 'University of California, Berkeley',
      degree: 'B.S. Computer Science',
      location: 'Berkeley, CA',
      startDate: '2012-09',
      endDate: '2016-05',
      gpa: '3.7',
      highlights: ['Dean\'s List all semesters', 'ACM Programming Contest finalist'],
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Stripe',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: 'Present',
      highlights: [
        'Led a team of 5 engineers to redesign the payment processing pipeline, reducing latency by 35%',
        'Architected a microservices migration that improved deployment frequency from weekly to daily',
        'Mentored 3 junior engineers who were all promoted within 18 months',
        'Implemented real-time fraud detection system processing 10K+ transactions per second',
      ],
    },
    {
      id: 'exp-2',
      company: 'Airbnb',
      role: 'Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2018-07',
      endDate: '2021-02',
      highlights: [
        'Built and maintained the search ranking service used by 150M+ users globally',
        'Developed an A/B testing framework adopted by 20+ engineering teams',
        'Reduced search response time by 50% through query optimization and caching strategies',
        'Contributed to open-source projects used across the company',
      ],
    },
    {
      id: 'exp-3',
      company: 'Google',
      role: 'Software Engineering Intern',
      location: 'Mountain View, CA',
      startDate: '2017-06',
      endDate: '2017-09',
      highlights: [
        'Developed a data pipeline for analyzing user engagement metrics across Google Maps',
        'Presented results to senior leadership, leading to a product feature prioritization change',
      ],
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'Python', 'Go', 'Java', 'SQL', 'Rust'],
    },
    {
      category: 'Frameworks',
      items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Spring Boot'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'Redis', 'MongoDB', 'DynamoDB', 'Elasticsearch'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenTrace',
      description:
        'An open-source distributed tracing library for microservices with automatic instrumentation and real-time visualization.',
      technologies: ['Go', 'React', 'gRPC', 'Jaeger'],
      url: 'github.com/janesmith/opentrace',
      highlights: [
        '2.5K+ GitHub stars, adopted by 50+ companies',
        'Featured in GopherCon 2022 talk',
      ],
    },
    {
      id: 'proj-2',
      name: 'CodeReview AI',
      description:
        'An AI-powered code review assistant that provides actionable feedback on pull requests using LLM analysis.',
      technologies: ['Python', 'TypeScript', 'OpenAI API', 'GitHub Actions'],
      url: 'github.com/janesmith/codereview-ai',
      highlights: [
        'Reduced code review turnaround time by 60%',
        'Integrated with GitHub and GitLab',
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023-05',
      url: 'aws.amazon.com/certification',
    },
    {
      id: 'cert-2',
      name: 'Google Cloud Professional DevOps Engineer',
      issuer: 'Google Cloud',
      date: '2022-11',
      url: 'cloud.google.com/certification',
    },
  ],
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
