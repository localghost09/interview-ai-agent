'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Mic, Type, Shuffle, MessageSquareQuote, Filter } from 'lucide-react';
import AudioRecorder from '@/components/speech/AudioRecorder';
import SpeechDashboard from '@/components/speech/SpeechDashboard';
import {
  PRACTICE_QUESTIONS,
  CATEGORY_LABELS,
  getRandomQuestion,
  type QuestionCategory,
} from '@/lib/speech/practiceQuestions';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as QuestionCategory[];

/**
 * Orchestrates the speech analysis flow: record → analyze → display results.
 * Follows the same state-machine pattern as ResumeAnalyzer.
 */
export default function SpeechAnalyzer() {
  const [view, setView] = useState<'input' | 'analyzing' | 'dashboard'>('input');
  const [result, setResult] = useState<SpeechAnalysisResponse | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [category, setCategory] = useState<QuestionCategory>('all');
  const [currentQuestion, setCurrentQuestion] = useState(PRACTICE_QUESTIONS[0].question);

  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);

  // Pick a random question on mount (client-only) to avoid hydration mismatch
  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);

  // Auto-scroll only the transcript container (not the page)
  useEffect(() => {
    const container = transcriptContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [liveTranscript, interimText]);

  const handleAnalysisComplete = (data: SpeechAnalysisResponse) => {
    setResult(data);
    setView('dashboard');
  };

  const handleError = (error: string) => {
    toast.error(error);
    setView('input');
  };

  const handleStateChange = (state: 'idle' | 'recording' | 'analyzing') => {
    setIsRecording(state === 'recording');
    if (state === 'analyzing') {
      setView('analyzing');
    }
    if (state === 'idle') {
      setLiveTranscript('');
      setInterimText('');
    }
  };

  const handleTranscriptUpdate = useCallback((text: string, isInterim: boolean) => {
    if (isInterim) {
      setInterimText(text);
    } else {
      setLiveTranscript(text);
      setInterimText('');
    }
  }, []);

  const handleCategoryChange = (newCategory: QuestionCategory) => {
    setCategory(newCategory);
    setCurrentQuestion(getRandomQuestion(currentQuestion, newCategory));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Input / Recording View */}
      {(view === 'input' || view === 'analyzing') && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Mic className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Speech Coach
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Record yourself answering an interview question. Get instant feedback on your
              confidence, clarity, filler words, and pacing — powered by AI.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex-wrap justify-center max-w-2xl">
              <Filter className="w-3.5 h-3.5 text-gray-400 ml-2 shrink-0" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  disabled={isRecording}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    category === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  } ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Practice Question Card */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <MessageSquareQuote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Practice Question</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                      {currentQuestion}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentQuestion(getRandomQuestion(currentQuestion, category))}
                  disabled={isRecording}
                  className={`flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors ${
                    isRecording ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title="Get another question"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recorder + Live Transcript Layout */}
          <div className={`mx-auto transition-all duration-500 ${
            isRecording || view === 'analyzing'
              ? 'max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'max-w-lg'
          }`}>
            {/* Recorder Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
              <AudioRecorder
                onAnalysisComplete={handleAnalysisComplete}
                onError={handleError}
                onStateChange={handleStateChange}
                onTranscriptUpdate={handleTranscriptUpdate}
                question={currentQuestion}
              />
            </div>

            {/* Live Transcript Panel */}
            {(isRecording || view === 'analyzing') && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Live Transcript
                    </h3>
                  </div>
                </div>

                <div ref={transcriptContainerRef} className="flex-1 min-h-[200px] max-h-[300px] overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
                  {!liveTranscript && !interimText ? (
                    <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                      Start speaking to see live transcription...
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed">
                      <span className="text-gray-900 dark:text-white">{liveTranscript}</span>
                      {interimText && interimText.length > liveTranscript.length && (
                        <span className="text-gray-400 dark:text-gray-500 italic">
                          {interimText.slice(liveTranscript.length)}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {isRecording && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Listening...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analyzing Overlay */}
          {view === 'analyzing' && (
            <div className="mt-8 text-center animate-in fade-in duration-500">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Transcribing and analyzing your speech...
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dashboard View */}
      {view === 'dashboard' && result && (
        <div className="animate-in fade-in duration-700">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => {
                setResult(null);
                setLiveTranscript('');
                setInterimText('');
                setView('input');
              }}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Record Again
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Speech Analysis</h2>
          </div>
          <SpeechDashboard data={result} />
        </div>
      )}
    </div>
  );
}
