import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface AnswerAnalysis {
  score: number; // 0-10 scale
  feedback: string;
  correctAnswer: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface InterviewAnalysis {
  overallScore: number; // 0-100 scale
  totalQuestions: number;
  answeredQuestions: number;
  averageScore: number;
  finalFeedback: string;
  performanceLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' | 'Poor';
  detailedAnalysis: {
    technical: number;
    communication: number;
    problemSolving: number;
    overallKnowledge: number;
  };
  keyStrengths: string[];
  improvementAreas: string[];
  hiringRecommendation: 'Strong Hire' | 'Hire' | 'No Hire' | 'Strong No Hire';
  nextSteps: string[];
  interviewerNotes: string;
}

class RealTimeAnalysisService {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Add method to detect inadequate responses
  private isInadequateResponse(answer: string): boolean {
    const cleanAnswer = answer.toLowerCase().trim();
    
    // Check for explicit "don't know" patterns
    const dontKnowPatterns = [
      /^i don'?t know$/,
      /^don'?t know$/,
      /^no idea$/,
      /^not sure$/,
      /^i have no idea$/,
      /^i'm not sure$/,
      /^idk$/,
      /^dunno$/,
      /^no clue$/,
      /^i don'?t understand$/,
      /^i'm not familiar$/,
      /^never heard of/,
      /^i can'?t answer/,
      /^i don'?t have experience/,
      /^pass$/,
      /^skip$/,
      /^next$/,
      /^nothing$/,
      /^none$/,
      /^n\/?a$/,
      /^not applicable$/
    ];

    // Check if answer matches any "don't know" pattern
    if (dontKnowPatterns.some(pattern => pattern.test(cleanAnswer))) {
      return true;
    }

    // Check for very short, non-substantive answers
    if (cleanAnswer.length < 10) {
      return true;
    }

    // Check for generic filler responses
    const fillerPatterns = [
      /^(um+|uh+|well|so|like|you know|basically|actually)[\s\.,]*$/,
      /^(yes|no|maybe|possibly|probably)[\s\.,]*$/,
      /^(good question|interesting|that'?s hard)[\s\.,]*$/
    ];

    if (fillerPatterns.some(pattern => pattern.test(cleanAnswer))) {
      return true;
    }

    return false;
  }

  async analyzeAnswer(
    question: string,
    candidateAnswer: string,
    role: string,
    techStack: string[],
    level: string
  ): Promise<AnswerAnalysis> {
    // Check for inadequate response first
    if (this.isInadequateResponse(candidateAnswer)) {
      return {
        score: 0,
        feedback: `No substantive answer was provided. This question required technical knowledge and explanation. Simply stating "I don't know" or providing no meaningful response does not demonstrate the competency expected for a ${role} position.`,
        correctAnswer: "A comprehensive answer would demonstrate understanding of the concepts, provide specific technical details, explain the reasoning, and include practical examples or implementation approaches.",
        strengths: [],
        weaknesses: [
          "Did not attempt to answer the question",
          "No demonstration of technical knowledge",
          "Missed opportunity to show problem-solving approach",
          "Did not engage with the technical concepts"
        ],
        suggestions: [
          "Study the fundamental concepts related to this topic",
          "Practice explaining technical concepts even when uncertain",
          "Learn to break down complex problems into smaller parts",
          "Research industry best practices and common approaches",
          "Even when unsure, attempt to discuss what you do know about related topics"
        ]
      };
    }

    try {
      const prompt = `
You are a world-class technical interviewer with 20+ years of experience. Your task is to:
1. Generate the PERFECT answer for the given question
2. Compare the candidate's answer against the perfect answer
3. Provide detailed analysis and scoring

EVALUATION CONTEXT:
Position: ${role}
Level: ${level}
Tech Stack: ${techStack.join(', ')}
Question: "${question}"
Candidate's Answer: "${candidateAnswer}"

STEP 1: Generate the IDEAL/PERFECT answer for this question considering:
- Technical accuracy and depth appropriate for ${level} level
- Best practices and industry standards
- Practical examples and real-world applications
- Common pitfalls and edge cases
- Technology stack relevance: ${techStack.join(', ')}

STEP 2: Compare candidate's answer against the ideal answer:
- Technical accuracy comparison
- Completeness assessment  
- Depth of understanding evaluation
- Missing key concepts identification
- Incorrect information detection

STEP 3: Scoring criteria (BE EXTREMELY STRICT):
- 0-1: No answer/"I don't know"/completely wrong/no technical content
- 2-3: Major misconceptions, serious inaccuracies, minimal relevant content
- 4-5: Some correct elements but significant gaps or errors
- 6-7: Mostly correct with minor gaps, demonstrates competency
- 8-9: Comprehensive, accurate, shows strong understanding
- 10: Perfect answer matching or exceeding the ideal response

CRITICAL INSTRUCTIONS:
- If candidate says "I don't know" or similar → Score 0-1
- If answer contains major technical errors → Score 2-4 max
- If answer misses critical concepts → Reduce score significantly
- Only award 7+ for genuinely strong technical answers
- Be extremely harsh - most answers should score 3-6

Provide analysis in JSON format:
{
  "score": 0-10 (integer - BE EXTREMELY STRICT),
  "feedback": "Detailed comparison between candidate's answer and ideal answer. Highlight what was correct, what was missing, what was wrong. Be specific about gaps and provide constructive criticism.",
  "correctAnswer": "The comprehensive, perfect answer for this question with technical details, best practices, examples, and common considerations. This should be the gold standard response.",
  "strengths": ["Specific correct elements from candidate's answer, empty array if none"],
  "weaknesses": ["Specific gaps, errors, or missing concepts from candidate's answer"],
  "suggestions": ["Actionable steps to improve - study specific topics, practice specific skills, learn specific concepts"]
}
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response and parse JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      const analysis = JSON.parse(cleanedText);
      
      return {
        score: Math.max(0, Math.min(10, analysis.score)),
        feedback: analysis.feedback || "Good effort on this question.",
        correctAnswer: analysis.correctAnswer || "The correct approach involves understanding the core concepts.",
        strengths: analysis.strengths || [],
        weaknesses: analysis.weaknesses || [],
        suggestions: analysis.suggestions || []
      };
    } catch (error) {
      console.error('Error analyzing answer:', error);
      
      // Enhanced fallback with strict inadequate response handling
      if (this.isInadequateResponse(candidateAnswer)) {
        return {
          score: 0,
          feedback: "No meaningful answer was provided to this technical question.",
          correctAnswer: "A proper answer would demonstrate technical knowledge and understanding of the concepts involved.",
          strengths: [],
          weaknesses: ["Did not provide a substantive answer"],
          suggestions: ["Study the topic thoroughly", "Practice explaining technical concepts"]
        };
      }

      // Regular fallback for other cases
      const wordCount = candidateAnswer.trim().split(/\s+/).length;
      const hasCodeOrTechnicalTerms = /\b(function|class|const|let|var|if|else|for|while|return|import|export|async|await|promise|callback|api|database|server|client|algorithm|data structure|time complexity|space complexity|big o|o\(n\)|optimization|react|angular|vue|node|javascript|typescript|python|java|sql|html|css)\b/i.test(candidateAnswer);
      
      let fallbackScore = 1; // Start very low
      if (wordCount > 20) fallbackScore += 1;
      if (wordCount > 50) fallbackScore += 1;
      if (hasCodeOrTechnicalTerms) fallbackScore += 2;
      if (candidateAnswer.length > 100) fallbackScore += 1;
      
      return {
        score: Math.min(5, fallbackScore), // Cap fallback at 5
        feedback: `Your response shows ${wordCount > 30 ? 'some effort in providing detail' : 'limited detail'}. ${hasCodeOrTechnicalTerms ? 'Technical terminology was used appropriately.' : 'More technical terminology and concepts would strengthen your answer.'}`,
        correctAnswer: "A comprehensive answer would include technical concepts, practical examples, best practices, and clear explanations of the underlying principles.",
        strengths: [
          ...(wordCount > 30 ? ["Provided detailed response"] : []),
          ...(hasCodeOrTechnicalTerms ? ["Used technical terminology"] : []),
          ...(candidateAnswer.length > 0 ? ["Attempted to answer"] : [])
        ],
        weaknesses: [
          ...(wordCount < 20 ? ["Response too brief"] : []),
          ...(hasCodeOrTechnicalTerms ? [] : ["Lacks technical terminology"]),
          "Could provide more specific technical details"
        ],
        suggestions: [
          "Study fundamental concepts more thoroughly",
          "Practice explaining technical details clearly",
          "Include specific examples and use cases",
          "Learn industry terminology and best practices"
        ]
      };
    }
  }

  async generateFinalAnalysis(
    answers: Array<{ question: string; answer: string; score: number; feedback: string }>,
    role: string,
    techStack: string[],
    level: string
  ): Promise<InterviewAnalysis> {
    // Count inadequate responses
    const inadequateCount = answers.filter(answer => 
      this.isInadequateResponse(answer.answer) || answer.score <= 1
    ).length;
    
    const inadequatePercentage = (inadequateCount / answers.length) * 100;
    
    // IMMEDIATE CHECK: If all or most answers are inadequate, return poor performance immediately
    if (inadequatePercentage >= 80) {
      return {
        overallScore: Math.min(15, Math.round((answers.reduce((sum, answer) => sum + answer.score, 0) / answers.length / 10) * 100)),
        totalQuestions: answers.length,
        answeredQuestions: answers.length - inadequateCount,
        averageScore: answers.reduce((sum, answer) => sum + answer.score, 0) / answers.length,
        finalFeedback: `Critical performance issue: ${inadequateCount} out of ${answers.length} questions (${inadequatePercentage.toFixed(1)}%) received inadequate responses such as "I don't know" or no meaningful answer. This indicates severe lack of preparation and technical knowledge for the ${role} position. Technical interviews require demonstrating knowledge and problem-solving abilities, not simply stating unfamiliarity with concepts. This performance suggests the candidate is not ready for this role and requires substantial study before reapplying.`,
        performanceLevel: 'Poor',
        detailedAnalysis: {
          technical: 10,
          communication: 15,
          problemSolving: 5,
          overallKnowledge: 10
        },
        keyStrengths: [],
        improvementAreas: [
          "Fundamental technical knowledge is critically lacking",
          "Interview preparation and study methodology",
          "Basic understanding of core concepts for the role",
          "Technical vocabulary and terminology",
          "Problem-solving approach and methodology"
        ],
        hiringRecommendation: 'Strong No Hire',
        nextSteps: [
          "Complete comprehensive technical training program",
          "Study fundamental concepts extensively before reapplying",
          "Practice technical interview questions with detailed answers",
          "Build practical projects to demonstrate learning",
          "Consider entry-level positions or internships for experience"
        ],
        interviewerNotes: `Candidate provided ${inadequateCount} inadequate responses out of ${answers.length} questions (${inadequatePercentage.toFixed(1)}% inadequate rate). This level of non-response indicates insufficient technical knowledge and preparation. Not recommended for any technical role at this time.`
      };
    }

    try {
      const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
      const averageScore = answers.length > 0 ? totalScore / answers.length : 0;
      const overallScore = Math.round((averageScore / 10) * 100);

      const prompt = `
You are a senior technical interviewer conducting a final evaluation. You must be EXTREMELY STRICT and accurate.

CRITICAL METRICS:
- ${inadequateCount} out of ${answers.length} questions received inadequate responses ("I don't know" or similar)
- Inadequate Response Rate: ${inadequatePercentage.toFixed(1)}%
- Average Score: ${averageScore.toFixed(2)}/10
- Raw Overall Score: ${overallScore}/100

STRICT EVALUATION RULES:
- If >50% inadequate responses: Performance Level = "Poor", Score = 0-30
- If >30% inadequate responses: Performance Level = "Needs Improvement", Score = 31-45  
- If >15% inadequate responses: Performance Level = "Average" (max), Score = 46-60
- Only candidates with <10% inadequate responses can be "Good" or "Excellent"

DETAILED QUESTION-BY-QUESTION ANALYSIS:
${answers.map((answer, index) => `
Question ${index + 1}: ${answer.question}
Candidate Answer: ${answer.answer}
Score: ${answer.score}/10
Detailed Assessment: ${answer.feedback}
`).join('\n')}

Provide comprehensive analysis in JSON format:
{
  "finalFeedback": "6-8 paragraph analysis covering overall performance, inadequate response impact, technical gaps, and recommendations",
  "performanceLevel": "Excellent|Good|Average|Needs Improvement|Poor",
  "detailedAnalysis": {
    "technical": 0-100,
    "communication": 0-100, 
    "problemSolving": 0-100,
    "overallKnowledge": 0-100
  },
  "keyStrengths": ["Only list genuine strengths with evidence"],
  "improvementAreas": ["Specific areas needing work based on answer analysis"],
  "hiringRecommendation": "Strong Hire|Hire|No Hire|Strong No Hire",
  "nextSteps": ["Specific learning recommendations based on gaps identified"],
  "interviewerNotes": "Professional notes for hiring decision including specific examples"
}

BE EXTREMELY STRICT. High inadequate response rates should result in poor scores and negative recommendations.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      const analysis = JSON.parse(cleanedText);
      
      // Apply strict score adjustments based on inadequate responses
      let adjustedScore = overallScore;
      
      // CRITICAL: If candidate provided mostly inadequate responses, override the AI score
      if (inadequatePercentage >= 50) {
        adjustedScore = Math.min(20, overallScore); // Force very low score
      } else if (inadequatePercentage >= 30) {
        adjustedScore = Math.min(35, overallScore); // Force low score
      } else if (inadequatePercentage >= 15) {
        adjustedScore = Math.min(50, overallScore); // Cap at 50
      }
      
      // Additional check: if average score is very low due to inadequate responses, force it down
      if (averageScore <= 2 && inadequateCount > 0) {
        adjustedScore = Math.min(25, adjustedScore);
      }

      return {
        overallScore: adjustedScore,
        totalQuestions: answers.length,
        answeredQuestions: answers.length - inadequateCount,
        averageScore,
        finalFeedback: analysis.finalFeedback || `This interview revealed significant knowledge gaps with ${inadequateCount} inadequate responses out of ${answers.length} questions (${inadequatePercentage.toFixed(1)}%).`,
        performanceLevel: inadequatePercentage >= 50 ? 'Poor' : 
                         inadequatePercentage >= 30 ? 'Needs Improvement' : 
                         adjustedScore < 40 ? 'Poor' :
                         adjustedScore < 55 ? 'Needs Improvement' :
                         adjustedScore < 70 ? 'Average' :
                         analysis.performanceLevel || 'Average',
        detailedAnalysis: {
          technical: Math.min(analysis.detailedAnalysis?.technical || adjustedScore, adjustedScore),
          communication: Math.min(analysis.detailedAnalysis?.communication || adjustedScore, adjustedScore),
          problemSolving: Math.min(analysis.detailedAnalysis?.problemSolving || adjustedScore, adjustedScore),
          overallKnowledge: Math.min(analysis.detailedAnalysis?.overallKnowledge || adjustedScore, adjustedScore)
        },
        keyStrengths: inadequatePercentage > 30 ? [] : (analysis.keyStrengths || []),
        improvementAreas: analysis.improvementAreas || ["Fundamental technical knowledge", "Interview preparation", "Technical communication"],
        hiringRecommendation: inadequatePercentage > 50 ? 'Strong No Hire' :
                            inadequatePercentage > 30 ? 'No Hire' :
                            analysis.hiringRecommendation || 'No Hire',
        nextSteps: analysis.nextSteps || ["Intensive study of fundamental concepts", "Technical interview practice"],
        interviewerNotes: analysis.interviewerNotes || `${inadequateCount} inadequate responses indicate insufficient preparation for this role.`
      };
    } catch (error) {
      console.error('Error generating final analysis:', error);
      
      const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
      const averageScore = answers.length > 0 ? totalScore / answers.length : 0;
      let adjustedScore = Math.round((averageScore / 10) * 100);
      
      // Apply strict penalties for inadequate responses in fallback
      if (inadequatePercentage >= 80) {
        adjustedScore = Math.min(adjustedScore, 15); // Extremely poor performance
      } else if (inadequatePercentage >= 50) {
        adjustedScore = Math.min(adjustedScore, 25); // Very poor performance
      } else if (inadequatePercentage >= 30) {
        adjustedScore = Math.min(adjustedScore, 40); // Poor performance
      } else if (inadequatePercentage >= 15) {
        adjustedScore = Math.min(adjustedScore, 55); // Below average performance
      }
      
      // Additional penalty for very low average scores
      if (averageScore <= 1) {
        adjustedScore = Math.min(adjustedScore, 20);
      } else if (averageScore <= 2) {
        adjustedScore = Math.min(adjustedScore, 30);
      }
      
      return {
        overallScore: adjustedScore,
        totalQuestions: answers.length,
        answeredQuestions: answers.length - inadequateCount,
        averageScore,
        finalFeedback: `Interview performance analysis for ${role} position (${level} level) with ${techStack.join(', ')} tech stack: ${inadequateCount} out of ${answers.length} questions received inadequate responses (${inadequatePercentage.toFixed(1)}%). This indicates ${inadequatePercentage > 50 ? 'severe knowledge gaps and lack of preparation' : inadequatePercentage > 30 ? 'significant preparation issues and technical deficiencies' : 'some areas requiring improvement'}. The candidate ${inadequatePercentage > 50 ? 'is not ready for this role and requires substantial study' : inadequatePercentage > 30 ? 'needs additional preparation before being considered' : 'shows some potential but requires development'}. Technical interviews require demonstrating knowledge even when uncertain, and the high rate of non-responses suggests insufficient preparation for a ${role} position.`,
        performanceLevel: inadequatePercentage >= 80 ? 'Poor' : 
                         inadequatePercentage >= 50 ? 'Poor' : 
                         inadequatePercentage >= 30 ? 'Needs Improvement' : 
                         adjustedScore >= 60 ? 'Average' : 
                         adjustedScore >= 40 ? 'Needs Improvement' : 'Poor',
        detailedAnalysis: {
          technical: Math.max(adjustedScore - 10, 0),
          communication: Math.max(adjustedScore - 5, 0),
          problemSolving: Math.max(adjustedScore - 15, 0),
          overallKnowledge: Math.max(adjustedScore - 10, 0)
        },
        keyStrengths: inadequatePercentage > 30 ? [] : ["Completed the interview process"],
        improvementAreas: [
          "Fundamental technical knowledge gaps",
          "Interview preparation and readiness",
          "Technical communication skills",
          "Problem-solving approach",
          "Basic understanding of core concepts"
        ],
        hiringRecommendation: inadequatePercentage > 50 ? 'Strong No Hire' : inadequatePercentage > 30 ? 'No Hire' : adjustedScore >= 60 ? 'No Hire' : 'Strong No Hire',
        nextSteps: [
          "Intensive study of fundamental technical concepts",
          "Complete structured learning program or bootcamp",
          "Practice technical interview questions",
          "Build practical projects to demonstrate skills",
          "Retake assessment after significant preparation"
        ],
        interviewerNotes: `Candidate provided ${inadequateCount} inadequate responses out of ${answers.length} questions (${inadequatePercentage.toFixed(1)}% inadequate rate). This indicates insufficient technical knowledge for the ${role} position. Recommend substantial additional preparation before reconsideration.`
      };
    }
  }
}

export const realTimeAnalysisService = new RealTimeAnalysisService();
