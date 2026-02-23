const API_URL = '/api/speech/analyze';

/**
 * Sends a recorded audio blob to the speech analysis API and returns
 * the full analysis response including metrics and coaching feedback.
 */
export const analyzeSpeech = async (
  audioBlob: Blob,
  confidenceScore: number
): Promise<SpeechAnalysisResponse> => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('confidenceScore', String(confidenceScore));

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Speech analysis failed' }));
    throw new Error(error.error || 'Speech analysis failed');
  }

  return response.json();
};
