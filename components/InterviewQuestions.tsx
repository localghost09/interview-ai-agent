"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import DisplayTechIcons from "./DisplayTechIcons";
import Image from "next/image";
import dayjs from "dayjs";

interface Props {
  interview: Interview;
}

const InterviewQuestions = ({ interview }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    setLoading(true);
    try {
      // Navigate to the actual interview interface
      router.push(`/interview/${interview.id}/start`);
    } catch {
      toast.error("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = dayjs(interview.createdAt).format('DD/MM/YYYY');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Interview Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {interview.role} Interview
            </h1>
            <p className="text-gray-600 mt-1">
              {interview.type} • {interview.level} Level
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/calendar.svg" alt="calendar" width={20} height={20} />
              <span className="text-sm text-gray-600">{formattedDate}</span>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {interview.type}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h3>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6 ">
        <h2 className="text-lg font-semibold text-blue-900 mb-3 ">
          Interview Instructions
        </h2>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start text-black">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            This interview will contain {interview.questions.length} questions
          </li>
          <li className="flex items-start text-black">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            You can take your time to answer each question thoughtfully
          </li>
          <li className="flex items-start text-black">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            The AI will provide feedback on your responses after completion
          </li>
          <li className="flex items-start text-black">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            You can use voice or text to respond to questions
          </li>
        </ul>
      </div>

      {/* Questions Preview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Questions Preview
        </h2>
        <div className="space-y-3">
          {interview.questions.map((question, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">Question {index + 1}</p>
              <p className="text-gray-900">{question}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="px-6"
        >
          Go Back
        </Button>
        <Button
          onClick={handleStartInterview}
          disabled={loading}
          className="btn-primary px-8"
        >
          {loading ? "Starting..." : "Start Interview"}
        </Button>
      </div>
    </div>
  );
};

export default InterviewQuestions;
