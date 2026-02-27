export type QuestionCategory =
  | 'all'
  | 'behavioral'
  | 'technical'
  | 'situational'
  | 'leadership'
  | 'communication'
  | 'problem-solving'
  | 'career'
  | 'culture-fit'
  | 'role-specific';

export interface PracticeQuestion {
  question: string;
  category: Exclude<QuestionCategory, 'all'>;
}

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  all: 'All',
  behavioral: 'Behavioral',
  technical: 'Technical',
  situational: 'Situational',
  leadership: 'Leadership',
  communication: 'Communication',
  'problem-solving': 'Problem Solving',
  career: 'Career',
  'culture-fit': 'Culture Fit',
  'role-specific': 'Role Specific',
};

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // ── Behavioral ──────────────────────────────────────────────────────
  { question: 'Tell me about yourself and your professional background.', category: 'behavioral' },
  { question: 'What is your greatest strength, and how has it helped you in your career?', category: 'behavioral' },
  { question: 'Describe a challenging project you worked on. How did you handle it?', category: 'behavioral' },
  { question: 'Tell me about a time you failed. What did you learn from it?', category: 'behavioral' },
  { question: 'Describe a time you had a disagreement with a teammate. How did you resolve it?', category: 'behavioral' },
  { question: 'Tell me about a time you received constructive criticism. How did you respond?', category: 'behavioral' },
  { question: 'Describe a situation where you took initiative beyond your role.', category: 'behavioral' },
  { question: 'Tell me about a time you had to adapt to a major change at work.', category: 'behavioral' },
  { question: 'Give an example of a goal you set and how you achieved it.', category: 'behavioral' },
  { question: 'Describe a time you went above and beyond for a customer or client.', category: 'behavioral' },
  { question: 'Tell me about a time you made a mistake at work. How did you fix it?', category: 'behavioral' },
  { question: 'Describe a situation where you had to work with someone difficult.', category: 'behavioral' },
  { question: 'Tell me about a time you had to meet a very tight deadline.', category: 'behavioral' },
  { question: 'Give an example of when you had to persuade someone to see your point of view.', category: 'behavioral' },
  { question: 'Describe a time you identified a problem before anyone else noticed.', category: 'behavioral' },
  { question: 'Tell me about a time you had to balance multiple competing priorities.', category: 'behavioral' },
  { question: 'Describe your most significant professional accomplishment.', category: 'behavioral' },
  { question: 'Tell me about a time you had to learn something completely new in a short period.', category: 'behavioral' },
  { question: 'Describe a situation where you had to deliver bad news to a team or client.', category: 'behavioral' },
  { question: 'Tell me about a time you successfully handled a high-pressure situation.', category: 'behavioral' },

  // ── Technical ───────────────────────────────────────────────────────
  { question: 'Explain a complex technical concept to someone non-technical.', category: 'technical' },
  { question: 'What is your approach to learning a new technology or framework?', category: 'technical' },
  { question: 'How do you approach debugging a difficult issue in production?', category: 'technical' },
  { question: 'Walk me through how you would design a scalable web application from scratch.', category: 'technical' },
  { question: 'Explain the difference between SQL and NoSQL databases. When would you use each?', category: 'technical' },
  { question: 'How do you ensure code quality in your projects?', category: 'technical' },
  { question: 'Describe your experience with version control and branching strategies.', category: 'technical' },
  { question: 'How do you approach writing tests for your code?', category: 'technical' },
  { question: 'Explain how you would optimize a slow database query.', category: 'technical' },
  { question: 'What is your experience with CI/CD pipelines? How do you set them up?', category: 'technical' },
  { question: 'How do you handle security concerns in your applications?', category: 'technical' },
  { question: 'Describe a technical architecture decision you made and why.', category: 'technical' },
  { question: 'How do you stay current with new programming languages and tools?', category: 'technical' },
  { question: 'Explain the concept of microservices and when you would use them.', category: 'technical' },
  { question: 'How would you handle a memory leak in a production application?', category: 'technical' },
  { question: 'What is your approach to API design? What makes a good API?', category: 'technical' },
  { question: 'Describe how you would migrate a legacy system to a modern architecture.', category: 'technical' },
  { question: 'How do you approach code reviews? What do you look for?', category: 'technical' },
  { question: 'Explain how caching works and describe different caching strategies.', category: 'technical' },
  { question: 'How would you design a system that needs to handle millions of concurrent users?', category: 'technical' },

  // ── Situational ─────────────────────────────────────────────────────
  { question: 'How do you handle tight deadlines and pressure at work?', category: 'situational' },
  { question: 'What would you do if you were assigned a task you had never done before?', category: 'situational' },
  { question: 'How would you handle a situation where your manager gave you unclear instructions?', category: 'situational' },
  { question: 'What would you do if you discovered a critical bug right before a product launch?', category: 'situational' },
  { question: 'How would you handle a situation where two team members are in constant conflict?', category: 'situational' },
  { question: 'What would you do if you strongly disagreed with a decision made by your manager?', category: 'situational' },
  { question: 'How would you respond if a client asked for something outside the project scope?', category: 'situational' },
  { question: 'What would you do if you realized halfway through a project that the approach was wrong?', category: 'situational' },
  { question: 'How would you handle being given more work than you can reasonably complete?', category: 'situational' },
  { question: 'What would you do if a teammate was not pulling their weight on a group project?', category: 'situational' },
  { question: 'How would you handle a situation where you made an error that affected a client?', category: 'situational' },
  { question: 'What would you do if you were asked to work on something that conflicts with your values?', category: 'situational' },
  { question: 'How would you approach joining a team with an existing codebase you have never seen?', category: 'situational' },
  { question: 'What would you do if your project requirements changed significantly mid-sprint?', category: 'situational' },
  { question: 'How would you handle receiving negative feedback during a performance review?', category: 'situational' },

  // ── Leadership ──────────────────────────────────────────────────────
  { question: 'Describe your leadership style and give an example of how you have applied it.', category: 'leadership' },
  { question: 'How do you motivate a team that is going through a difficult period?', category: 'leadership' },
  { question: 'Tell me about a time you had to make a difficult decision that affected your team.', category: 'leadership' },
  { question: 'How do you delegate tasks effectively across a team?', category: 'leadership' },
  { question: 'Describe a time you mentored or coached a junior colleague.', category: 'leadership' },
  { question: 'How do you handle underperforming team members?', category: 'leadership' },
  { question: 'Tell me about a time you led a team through a major change or transition.', category: 'leadership' },
  { question: 'How do you build trust within a new team?', category: 'leadership' },
  { question: 'Describe how you set goals and track progress for your team.', category: 'leadership' },
  { question: 'How do you handle conflicting priorities when leading multiple projects?', category: 'leadership' },
  { question: 'Tell me about a time you had to give tough feedback to a team member.', category: 'leadership' },
  { question: 'How do you foster innovation and creativity within your team?', category: 'leadership' },
  { question: 'Describe a situation where you had to lead without formal authority.', category: 'leadership' },
  { question: 'How do you ensure your team stays aligned with company goals?', category: 'leadership' },
  { question: 'Tell me about a time you helped resolve a conflict between team members.', category: 'leadership' },

  // ── Communication ───────────────────────────────────────────────────
  { question: 'Tell me about a time you had to explain a technical decision to stakeholders.', category: 'communication' },
  { question: 'How do you adjust your communication style for different audiences?', category: 'communication' },
  { question: 'Describe a presentation you gave that you are particularly proud of.', category: 'communication' },
  { question: 'How do you ensure everyone on your team is on the same page?', category: 'communication' },
  { question: 'Tell me about a time a miscommunication led to a problem. How did you resolve it?', category: 'communication' },
  { question: 'How do you handle giving feedback to peers or managers?', category: 'communication' },
  { question: 'Describe your approach to writing clear and effective documentation.', category: 'communication' },
  { question: 'How do you communicate project status and risks to non-technical stakeholders?', category: 'communication' },
  { question: 'Tell me about a time you had to negotiate a compromise between competing interests.', category: 'communication' },
  { question: 'How do you handle difficult conversations with colleagues or clients?', category: 'communication' },
  { question: 'Describe how you would run an effective meeting.', category: 'communication' },
  { question: 'How do you keep remote or distributed teams well-connected?', category: 'communication' },
  { question: 'Tell me about a time you had to convince a skeptical audience.', category: 'communication' },
  { question: 'How do you document decisions so others can understand the reasoning later?', category: 'communication' },
  { question: 'Describe a time you had to simplify a complex topic for a broad audience.', category: 'communication' },

  // ── Problem Solving ─────────────────────────────────────────────────
  { question: 'How do you prioritize tasks when you have multiple deadlines?', category: 'problem-solving' },
  { question: 'Describe your process for solving a problem you have never encountered before.', category: 'problem-solving' },
  { question: 'Tell me about a creative solution you came up with for a difficult problem.', category: 'problem-solving' },
  { question: 'How do you approach making decisions when you do not have all the information?', category: 'problem-solving' },
  { question: 'Describe a time you had to troubleshoot a complex system issue.', category: 'problem-solving' },
  { question: 'How do you break down a large, ambiguous task into actionable steps?', category: 'problem-solving' },
  { question: 'Tell me about a time you found an innovative way to reduce costs or save time.', category: 'problem-solving' },
  { question: 'How do you evaluate trade-offs when choosing between multiple solutions?', category: 'problem-solving' },
  { question: 'Describe a situation where you had to think on your feet under pressure.', category: 'problem-solving' },
  { question: 'How do you approach root cause analysis when something goes wrong?', category: 'problem-solving' },
  { question: 'Tell me about a time your first solution did not work. What did you do next?', category: 'problem-solving' },
  { question: 'How do you handle ambiguity in project requirements?', category: 'problem-solving' },
  { question: 'Describe a data-driven decision you made. What data did you use and why?', category: 'problem-solving' },
  { question: 'How do you test your assumptions when working on a new solution?', category: 'problem-solving' },
  { question: 'Tell me about a time you had to solve a problem with limited resources.', category: 'problem-solving' },

  // ── Career ──────────────────────────────────────────────────────────
  { question: 'Where do you see yourself in five years?', category: 'career' },
  { question: 'Why are you interested in this role and what excites you about it?', category: 'career' },
  { question: 'What motivates you to do your best work every day?', category: 'career' },
  { question: 'What is one thing you would change about your last job and why?', category: 'career' },
  { question: 'Why are you looking to leave your current position?', category: 'career' },
  { question: 'What are your long-term career goals?', category: 'career' },
  { question: 'What do you consider your biggest professional weakness, and how are you improving it?', category: 'career' },
  { question: 'Why should we hire you over other candidates?', category: 'career' },
  { question: 'What salary range are you expecting for this role?', category: 'career' },
  { question: 'Describe the best manager you have ever had and what made them great.', category: 'career' },
  { question: 'What professional achievement are you most proud of?', category: 'career' },
  { question: 'How do you define success in your career?', category: 'career' },
  { question: 'What would your previous colleagues say about working with you?', category: 'career' },
  { question: 'If you could go back and give advice to your younger professional self, what would it be?', category: 'career' },
  { question: 'What skills are you currently working on developing?', category: 'career' },

  // ── Culture Fit ─────────────────────────────────────────────────────
  { question: 'What makes you a good fit for a collaborative team environment?', category: 'culture-fit' },
  { question: 'Describe your ideal work environment and why it suits you.', category: 'culture-fit' },
  { question: 'How do you stay updated with the latest industry trends?', category: 'culture-fit' },
  { question: 'What type of company culture do you thrive in?', category: 'culture-fit' },
  { question: 'How do you handle working with people who have very different opinions?', category: 'culture-fit' },
  { question: 'What role do you typically take on in a team setting?', category: 'culture-fit' },
  { question: 'How do you maintain work-life balance?', category: 'culture-fit' },
  { question: 'Describe a team you really enjoyed being part of. What made it great?', category: 'culture-fit' },
  { question: 'How do you approach diversity and inclusion in the workplace?', category: 'culture-fit' },
  { question: 'What do you do outside of work that helps you recharge?', category: 'culture-fit' },
  { question: 'How do you handle feedback from people you do not agree with?', category: 'culture-fit' },
  { question: 'What values are most important to you in a workplace?', category: 'culture-fit' },
  { question: 'How do you contribute to building a positive team atmosphere?', category: 'culture-fit' },
  { question: 'Describe how you handle stress and prevent burnout.', category: 'culture-fit' },
  { question: 'What does accountability mean to you in a professional context?', category: 'culture-fit' },

  // ── Role-Specific ───────────────────────────────────────────────────
  { question: 'Walk me through a project from start to finish that you managed or contributed to significantly.', category: 'role-specific' },
  { question: 'How do you gather and prioritize requirements from multiple stakeholders?', category: 'role-specific' },
  { question: 'Describe your experience working in Agile or Scrum environments.', category: 'role-specific' },
  { question: 'How do you measure the success of a product feature after launch?', category: 'role-specific' },
  { question: 'Describe your experience with system design and architecture planning.', category: 'role-specific' },
  { question: 'How do you approach estimating the effort for a new feature or project?', category: 'role-specific' },
  { question: 'What is your experience with data analysis and how has it influenced decisions?', category: 'role-specific' },
  { question: 'How do you keep stakeholders engaged throughout a long project?', category: 'role-specific' },
  { question: 'Describe your experience with user research or customer interviews.', category: 'role-specific' },
  { question: 'How do you balance technical debt against new feature development?', category: 'role-specific' },
  { question: 'Tell me about a time you had to onboard onto an unfamiliar domain quickly.', category: 'role-specific' },
  { question: 'How do you ensure accessibility and inclusivity in the products you build?', category: 'role-specific' },
  { question: 'Describe your approach to cross-functional collaboration.', category: 'role-specific' },
  { question: 'How do you handle competing feature requests from different departments?', category: 'role-specific' },
  { question: 'What metrics do you use to evaluate the health of a project or product?', category: 'role-specific' },
];

/** Returns a random question, optionally filtered by category and excluding the current one. */
export function getRandomQuestion(
  exclude?: string,
  category: QuestionCategory = 'all'
): string {
  const pool = category === 'all'
    ? PRACTICE_QUESTIONS
    : PRACTICE_QUESTIONS.filter((q) => q.category === category);
  const filtered = exclude ? pool.filter((q) => q.question !== exclude) : pool;
  if (filtered.length === 0) return pool[Math.floor(Math.random() * pool.length)].question;
  return filtered[Math.floor(Math.random() * filtered.length)].question;
}
