"use client";

import Vapi from "@vapi-ai/web";

// VAPI configuration
const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "";

export class VapiService {
  private vapi: Vapi;
  private isSessionActive = false;
  private currentQuestionIndex = 0;
  private questions: string[] = [];
  private candidateAnswers: { question: string; answer: string; score: number; feedback: string }[] = [];
  private questionStartTime: number = 0;
  private readonly QUESTION_TIMEOUT = 60000; // 60 seconds timeout
  private questionTimer?: NodeJS.Timeout;

  constructor() {
    this.vapi = new Vapi(VAPI_PUBLIC_KEY);
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.vapi.on("call-start", () => {
      console.log("Call started");
      this.isSessionActive = true;
    });

    this.vapi.on("call-end", () => {
      console.log("Call ended");
      this.isSessionActive = false;
      // Clear any pending timers
      if (this.questionTimer) {
        clearTimeout(this.questionTimer);
      }
    });

    this.vapi.on("speech-start", () => {
      console.log("Speech started");
      // Clear question timer when candidate starts speaking
      if (this.questionTimer) {
        clearTimeout(this.questionTimer);
      }
    });

    this.vapi.on("speech-end", () => {
      console.log("Speech ended");
    });

    this.vapi.on("volume-level", (volume) => {
      console.log("Volume level:", volume);
    });

    this.vapi.on("message", (message) => {
      console.log("Message received:", message);
      
      // Handle user transcripts (candidate answers)
      const messageObj = message as { 
        type?: string; 
        role?: string; 
        transcriptType?: string; 
        transcript?: string; 
      };
      
      if (messageObj.type === "transcript" && 
          messageObj.role === "user" && 
          messageObj.transcriptType === "final" &&
          messageObj.transcript) {
        
        // Process the candidate's answer
        this.processAnswer(messageObj.transcript);
      }
    });

    this.vapi.on("error", (error) => {
      console.error("VAPI Error:", error);
    });
  }

  // Start interview session with structured workflow
  async startInterviewSession(interviewConfig: {
    role: string;
    level: string;
    type: string;
    questions: string[];
    currentQuestionIndex: number;
  }) {
    try {
      this.questions = interviewConfig.questions;
      this.currentQuestionIndex = interviewConfig.currentQuestionIndex;
      this.candidateAnswers = [];

      if (VAPI_ASSISTANT_ID) {
        await this.vapi.start(VAPI_ASSISTANT_ID);
      } else {
        // Use basic configuration without complex typing
        await this.vapi.start("Interview Assistant");
      }

      // Initialize interview workflow - ask first question immediately
      setTimeout(() => {
        this.askCurrentQuestion();
      }, 2000); // Wait 2 seconds then ask first question
      
      return true;
    } catch (error) {
      console.error("Failed to start interview session:", error);
      return false;
    }
  }

  // Stop the current session
  async stopSession() {
    try {
      this.vapi.stop();
      return true;
    } catch (error) {
      console.error("Failed to stop session:", error);
      return false;
    }
  }

  // Check if session is active
  isActive() {
    return this.isSessionActive;
  }

  // Ask current question with voice verification
  askCurrentQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.completeInterview();
      return;
    }

    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionStartTime = Date.now();
    
    // Clear any existing timer
    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
    }

    // Set timeout for unanswered questions
    this.questionTimer = setTimeout(() => {
      this.handleUnansweredQuestion();
    }, this.QUESTION_TIMEOUT);

    // Send question to VAPI for voice output
    this.vapi.send({
      type: "add-message",
      message: {
        role: "assistant",
        content: `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}: ${currentQuestion}. Please take your time to answer this question clearly.`,
      },
    });

    console.log(`Asking question ${this.currentQuestionIndex + 1}: ${currentQuestion}`);
  }

  // Handle unanswered questions (give 0 score)
  private handleUnansweredQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    
    // Record zero score for unanswered question
    this.candidateAnswers.push({
      question: currentQuestion,
      answer: "No answer provided",
      score: 0,
      feedback: "No response was provided within the time limit. This question receives 0 points."
    });

    // Provide voice feedback for unanswered question
    this.vapi.send({
      type: "add-message",
      message: {
        role: "assistant",
        content: "I didn't receive an answer for this question, so it will be marked as 0 points. Let's move to the next question.",
      },
    });

    // Move to next question after a brief pause
    setTimeout(() => {
      this.moveToNextQuestion();
    }, 3000);
  }

  // Process candidate's answer and provide AI analysis
  private processAnswer(candidateAnswer: string) {
    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
    }

    const currentQuestion = this.questions[this.currentQuestionIndex];
    
    // Analyze answer using Gemini AI (simulate for now)
    const analysis = this.analyzeAnswer(currentQuestion, candidateAnswer);
    
    // Store the response
    this.candidateAnswers.push({
      question: currentQuestion,
      answer: candidateAnswer,
      score: analysis.score,
      feedback: analysis.feedback
    });

    // Provide voice feedback
    this.vapi.send({
      type: "add-message",
      message: {
        role: "assistant",
        content: `Thank you for your answer. ${analysis.feedback} Your score for this question is ${analysis.score} out of 10. ${analysis.correctAnswer ? `The ideal answer would include: ${analysis.correctAnswer}` : ''} Now let's move to the next question.`,
      },
    });

    // Move to next question after feedback
    setTimeout(() => {
      this.moveToNextQuestion();
    }, 5000);
  }

  // Analyze candidate's answer (this would integrate with Gemini AI)
  private analyzeAnswer(question: string, answer: string): {
    score: number;
    feedback: string;
    correctAnswer?: string;
  } {
    // Simplified analysis - in production, this would use Gemini AI
    if (!answer || answer.trim().length < 10) {
      return {
        score: 0,
        feedback: "Your answer was too brief and didn't demonstrate understanding of the concept.",
      };
    }

    // Basic scoring logic
    const wordCount = answer.split(' ').length;
    let score = Math.min(Math.floor(wordCount / 10) + 3, 8); // Base score 3-8 based on length
    
    // Check for key technical terms (simplified)
    const technicalTerms = ['function', 'variable', 'object', 'class', 'method', 'algorithm', 'data', 'structure'];
    const mentionedTerms = technicalTerms.filter(term => 
      answer.toLowerCase().includes(term)
    );
    
    if (mentionedTerms.length > 0) {
      score += 1;
    }

    score = Math.min(score, 10);

    let feedback = "";
    if (score <= 3) {
      feedback = "Your answer shows basic understanding but lacks depth and technical details.";
    } else if (score <= 6) {
      feedback = "Good answer with some technical insight. Consider providing more specific examples.";
    } else if (score <= 8) {
      feedback = "Very good answer with solid technical understanding and good examples.";
    } else {
      feedback = "Excellent comprehensive answer demonstrating deep understanding of the concept.";
    }

    return { score, feedback };
  }

  // Move to next question
  private moveToNextQuestion() {
    this.currentQuestionIndex++;
    
    if (this.currentQuestionIndex < this.questions.length) {
      this.askCurrentQuestion();
    } else {
      this.completeInterview();
    }
  }

  // Complete the interview
  private completeInterview() {
    const totalScore = this.candidateAnswers.reduce((sum, answer) => sum + answer.score, 0);
    const averageScore = totalScore / this.questions.length;
    
    this.vapi.send({
      type: "add-message",
      message: {
        role: "assistant",
        content: `Congratulations! You have completed the interview. Your overall score is ${totalScore} out of ${this.questions.length * 10} points, which is ${(averageScore * 10).toFixed(1)}%. Thank you for your time, and we'll be in touch with the results soon.`,
      },
    });

    // Stop the session after final message
    setTimeout(() => {
      this.stopSession();
    }, 5000);
  }

  // Get interview results
  getInterviewResults() {
    return {
      answers: this.candidateAnswers,
      totalScore: this.candidateAnswers.reduce((sum, answer) => sum + answer.score, 0),
      maxScore: this.questions.length * 10,
      completedQuestions: this.candidateAnswers.length,
      totalQuestions: this.questions.length
    };
  }

  // Listen for specific messages
  onMessage(callback: (message: unknown) => void) {
    this.vapi.on("message", callback);
  }

  // Listen for function calls
  onFunctionCall(callback: (functionCall: unknown) => void) {
    this.vapi.on("message", (message: unknown) => {
      const messageObj = message as { type?: string };
      if (messageObj.type === "function-call") {
        callback(message);
      }
    });
  }

  // Send function call result
  sendFunctionResult(result: unknown) {
    this.vapi.send({
      type: "add-message",
      message: {
        role: "assistant",
        content: JSON.stringify(result),
      },
    });
  }

  // Update assistant with new question
  async updateQuestion(newQuestion: string, questionIndex: number, totalQuestions: number) {
    try {
      this.vapi.send({
        type: "add-message",
        message: {
          role: "system",
          content: `New question (${questionIndex + 1}/${totalQuestions}): "${newQuestion}". Ask this question to the candidate now.`,
        },
      });
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  }
}

// Export singleton instance
export const vapiService = new VapiService();
