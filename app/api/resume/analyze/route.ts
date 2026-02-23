import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    // 1. Validation
    if (!resumeText || !resumeText.trim()) {
      return NextResponse.json(
        { error: 'Resume content is required' },
        { status: 400 }
      );
    }
    if (!jobDescription || !jobDescription.trim()) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    // 2. Initialize Gemini
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured. Set GEMINI_API_KEY in environment variables.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // 3. Prompt Engineering
    const systemInstruction = `
      You are an expert ATS (Applicant Tracking System) simulator and elite resume coach.
      Analyze the provided Resume against the Job Description.
      Be critical but constructive.
      Return purely JSON data. No markdown formatting.
    `;

    const prompt = `
      RESUME:
      ${resumeText.slice(0, 15000)}

      JOB DESCRIPTION:
      ${jobDescription.slice(0, 5000)}

      Analyze the resume against the job description and return a JSON object with this exact schema:
      {
        "keyword_analysis": {
          "matched": ["string"],
          "missing": ["string"],
          "partial": ["string"],
          "categorized": {
            "technical": ["string"],
            "soft": ["string"],
            "tools": ["string"],
            "certifications": ["string"]
          },
          "keyword_score": number (0-100)
        },
        "semantic_analysis": {
          "semantic_score": number (0-100),
          "explanation": "string (max 2 sentences summary)"
        },
        "impact_analysis": {
          "impact_score": number (0-100),
          "weak_bullets": ["string (exact bullet text from resume)"],
          "issues": ["string (e.g., 'No Metrics', 'Passive Voice')"]
        },
        "rewrites": [
          {
            "original": "string",
            "improved": "string",
            "explanation": "string"
          }
        ],
        "projected_score": number (expected score after fixes),
        "skills_alignment": number (0-100),
        "experience_alignment": number (0-100),
        "format_compliance": number (0-100)
      }
    `;

    // 4. Call Model
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const text = response.text;
    if (!text) throw new Error('No response from AI');

    const data = JSON.parse(text);

    // 5. Compute Weighted Score
    const k = data.keyword_analysis?.keyword_score || 0;
    const s = data.semantic_analysis?.semantic_score || 0;
    const i = data.impact_analysis?.impact_score || 0;
    const sa = data.skills_alignment || 0;
    const ea = data.experience_alignment || 0;
    const fc = data.format_compliance || 0;

    data.final_score = Math.round(
      k * 0.3 + s * 0.25 + i * 0.15 + sa * 0.1 + ea * 0.1 + fc * 0.1
    );

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
