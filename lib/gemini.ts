import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export const generateInterviewQuestions = async (
  role: string,
  level: string,
  techStack: string[],
  type: string = 'Technical'
): Promise<string[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Generate 8 diverse and challenging interview questions for a ${level} level ${role} position.

Interview Details:
- Role: ${role}
- Experience Level: ${level}
- Technical Stack: ${techStack.join(', ')}
- Interview Type: ${type}

Requirements:
1. Include a mix of technical, behavioral, and problem-solving questions
2. Questions should be appropriate for ${level} level (${level === 'Junior' ? 'focus on fundamentals and learning ability' : level === 'Mid' ? 'focus on practical experience and problem-solving' : 'focus on leadership, architecture, and mentoring'})
3. At least 3-4 questions should be specific to the mentioned tech stack: ${techStack.join(', ')}
4. Include 1-2 behavioral questions about teamwork, challenges, and growth
5. Include 1-2 scenario-based or problem-solving questions
6. Make questions realistic and commonly asked in real interviews
7. Avoid extremely basic questions for senior roles
8. Avoid overly complex theoretical questions for junior roles

Format: Return only the questions as a numbered list, one question per line.
Do not include any explanations, just the questions.

Example format:
1. Question here
2. Question here
...
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract questions
    const questions = text
      .split('\n')
      .filter(line => line.trim().match(/^\d+\./))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(question => question.length > 0);

    // Fallback to static questions if API fails or returns insufficient questions
    if (questions.length < 5) {
      console.warn('Gemini returned insufficient questions, using fallback');
      return generateFallbackQuestions(role, level, techStack);
    }

    return questions.slice(0, 8); // Return max 8 questions
  } catch (error) {
    console.error('Error generating questions with Gemini:', error);
    // Fallback to static questions if API fails
    return generateFallbackQuestions(role, level, techStack);
  }
};

// Fallback function for when Gemini API is unavailable
const generateFallbackQuestions = (
  role: string,
  level: string,
  techStack: string[]
): string[] => {
  const baseQuestions = [
    `Tell me about yourself and your experience with ${role.toLowerCase()} development.`,
    `What interests you most about this ${role.toLowerCase()} position?`,
    "Describe a challenging project you've worked on recently.",
  ];

  const techQuestions = techStack.flatMap(tech => [
    `What is your experience with ${tech}?`,
    `How would you approach debugging issues in ${tech}?`,
    `Can you explain the key features and benefits of ${tech}?`,
  ]);

  const levelQuestions = level === 'Junior' ? [
    "How do you stay updated with new technologies?",
    "Describe a time you had to learn something new quickly.",
    "What coding practices do you follow to write clean code?",
  ] : level === 'Mid' ? [
    "How do you handle code reviews and feedback?",
    "Describe your approach to testing and quality assurance.",
    "How do you balance technical debt with feature development?",
  ] : [
    "How do you mentor junior developers?",
    "Describe your approach to system architecture and design decisions.",
    "How do you handle technical debt and legacy code in large projects?",
    "What's your experience with team leadership and project management?",
  ];

  const behavioralQuestions = [
    "Describe a time when you had to work with a difficult team member.",
    "How do you handle tight deadlines and pressure?",
    "Tell me about a mistake you made and how you handled it.",
  ];

  const allQuestions = [...baseQuestions, ...techQuestions, ...levelQuestions, ...behavioralQuestions];
  
  // Return a balanced subset of questions
  return allQuestions.slice(0, 8);
};

export const generateFeedbackWithGemini = async (
  questions: string[],
  responses: string[],
  role: string,
  level: string,
  techStack: string[]
): Promise<{
  totalScore: number;
  finalAssessment: string;
  detailedFeedback: { question: string; response: string; score: number; feedback: string; }[];
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const questionResponsePairs = questions.map((q, i) => 
      `Q${i + 1}: ${q}\nA${i + 1}: ${responses[i] || 'No response provided'}\n`
    ).join('\n');

    const prompt = `
You are an experienced technical interviewer evaluating a candidate for a ${level} ${role} position with tech stack: ${techStack.join(', ')}.

Please analyze the following interview responses and provide comprehensive feedback:

${questionResponsePairs}

Provide feedback in this exact JSON format:
{
  "totalScore": <number between 0-100>,
  "finalAssessment": "<2-3 sentence overall assessment>",
  "detailedFeedback": [
    {
      "question": "<question text>",
      "response": "<candidate response>",
      "score": <number between 0-100>,
      "feedback": "<specific feedback on this response>"
    }
  ]
}

Evaluation Criteria:
- Technical knowledge appropriate for ${level} level
- Communication and clarity
- Problem-solving approach
- Relevant experience with mentioned technologies
- Cultural fit and soft skills (for behavioral questions)

Be constructive and specific in your feedback. Highlight both strengths and areas for improvement.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const feedbackData = JSON.parse(jsonMatch[0]);
        return feedbackData;
      }
    } catch (parseError) {
      console.error('Error parsing Gemini feedback response:', parseError);
    }

    // Fallback if JSON parsing fails
    return generateFallbackFeedback(questions, responses);
  } catch (error) {
    console.error('Error generating feedback with Gemini:', error);
    return generateFallbackFeedback(questions, responses);
  }
};

const generateFallbackFeedback = (questions: string[], responses: string[]) => {
  const detailedFeedback = questions.map((question, index) => ({
    question,
    response: responses[index] || 'No response provided',
    score: responses[index] ? Math.floor(Math.random() * 30) + 60 : 0, // 60-90 if answered, 0 if not
    feedback: responses[index] 
      ? 'Good response showing understanding of the topic. Consider providing more specific examples.'
      : 'No response provided. This question requires technical knowledge and practical examples.'
  }));

  const totalScore = Math.round(
    detailedFeedback.reduce((sum, item) => sum + item.score, 0) / detailedFeedback.length
  );

  return {
    totalScore,
    finalAssessment: `Based on your responses, you demonstrate ${totalScore >= 80 ? 'strong' : totalScore >= 60 ? 'good' : 'developing'} technical knowledge. Focus on providing more detailed examples and practical experience in future interviews.`,
    detailedFeedback
  };
};
