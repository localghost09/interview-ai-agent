"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import DisplayTechIcons from "./DisplayTechIcons";

interface Props {
  interview: Interview;
  feedback: Feedback;
}

const FeedbackDisplay = ({ interview, feedback }: Props) => {
  const router = useRouter();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getOverallPerformance = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "text-green-600" };
    if (score >= 70) return { text: "Good", color: "text-yellow-600" };
    if (score >= 60) return { text: "Fair", color: "text-orange-600" };
    return { text: "Needs Improvement", color: "text-red-600" };
  };

  const performance = getOverallPerformance(feedback.totalScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Interview Feedback
            </h1>
            <p className="text-gray-600">
              {interview.role} • {interview.type} • {interview.level}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Completed on</div>
            <div className="font-medium">
              {dayjs(feedback.createdAt).format('MMM DD, YYYY')}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Technologies Covered:</h3>
            <DisplayTechIcons techStack={interview.techstack} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Questions Asked:</h3>
            <p className="text-gray-900">{interview.questions.length} questions</p>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              {feedback.totalScore}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Overall Score: {feedback.totalScore}/100
          </h2>
          <p className={`text-lg font-medium ${performance.color}`}>
            {performance.text} Performance
          </p>
        </div>
      </div>

      {/* Category Scores */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Detailed Assessment
        </h2>
        <div className="space-y-4">
          {feedback.categoryScores.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(category.score)}`}>
                  {category.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${
                    category.score >= 80 ? 'bg-green-500' :
                    category.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${category.score}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{category.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Strengths
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {feedback.strengths.map((strength, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">{strength}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Areas for Improvement */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Areas for Improvement
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {feedback.areasForImprovement.map((area, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700">{area}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Assessment */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Final Assessment
        </h2>
        <p className="text-blue-800 leading-relaxed mb-4">
          {feedback.finalAssessment}
        </p>
        
        {/* Enhanced Analysis Display */}
        {feedback.performanceLevel && (
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Performance Level:</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                feedback.performanceLevel === 'Excellent' ? 'bg-green-100 text-green-800' :
                feedback.performanceLevel === 'Good' ? 'bg-blue-100 text-blue-800' :
                feedback.performanceLevel === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                feedback.performanceLevel === 'Needs Improvement' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {feedback.performanceLevel}
              </span>
            </div>
            
            {feedback.hiringRecommendation && (
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Hiring Recommendation:</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  feedback.hiringRecommendation === 'Strong Hire' ? 'bg-green-100 text-green-800' :
                  feedback.hiringRecommendation === 'Hire' ? 'bg-blue-100 text-blue-800' :
                  feedback.hiringRecommendation === 'No Hire' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {feedback.hiringRecommendation}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Next Steps */}
      {feedback.nextSteps && feedback.nextSteps.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📋 Next Steps for Development
          </h2>
          <div className="space-y-3">
            {feedback.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700 flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interviewer Notes */}
      {feedback.interviewerNotes && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🗒️ Interviewer Notes
          </h2>
          <p className="text-gray-700 leading-relaxed italic">
            &ldquo;{feedback.interviewerNotes}&rdquo;
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
          className="px-6"
        >
          Back to Dashboard
        </Button>
        <Button
          onClick={() => router.push('/interview')}
          className="btn-primary px-6"
        >
          Take Another Interview
        </Button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
