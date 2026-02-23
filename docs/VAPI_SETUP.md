# VAPI Interview Agent Setup Guide

This document explains how to set up VAPI (Voice AI) integration for the interview platform.

## Prerequisites

1. **VAPI Account**: Sign up at [vapi.ai](https://vapi.ai)
2. **API Keys**: Get your VAPI public key from the dashboard

## Environment Variables

Add these variables to your `.env.local` file:

```bash
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key_here
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here
```

## VAPI Assistant Configuration

### 1. Create an Assistant in VAPI Dashboard

Go to your VAPI dashboard and create a new assistant with these settings:

### 2. Model Configuration

```json
{
  "provider": "openai",
  "model": "gpt-4",
  "temperature": 0.7,
  "systemMessage": "You are an AI interviewer conducting technical interviews. Your role is to ask questions, listen to responses, provide feedback, and guide candidates through the interview process. Be encouraging, professional, and help candidates showcase their best abilities."
}
```

### 3. Voice Configuration

```json
{
  "provider": "playht",
  "voiceId": "jennifer",
  "speed": 1.0,
  "stability": 0.8,
  "similarityBoost": 0.8
}
```

### 4. Transcriber Configuration

```json
{
  "provider": "deepgram",
  "model": "nova-2",
  "language": "en-US"
}
```

### 5. Functions Configuration

Add these functions to your VAPI assistant:

#### Function 1: moveToNextQuestion

```json
{
  "name": "moveToNextQuestion",
  "description": "Move to the next interview question when the candidate finishes answering",
  "parameters": {
    "type": "object",
    "properties": {
      "completed": {
        "type": "boolean",
        "description": "Whether the current question is completed"
      },
      "summary": {
        "type": "string",
        "description": "Brief summary of the candidate's answer"
      }
    },
    "required": ["completed"]
  }
}
```

#### Function 2: provideFeedback

```json
{
  "name": "provideFeedback",
  "description": "Provide immediate feedback on the candidate's answer",
  "parameters": {
    "type": "object",
    "properties": {
      "feedback": {
        "type": "string",
        "description": "Constructive feedback on the answer"
      },
      "score": {
        "type": "number",
        "description": "Score for this answer (1-10)",
        "minimum": 1,
        "maximum": 10
      }
    },
    "required": ["feedback", "score"]
  }
}
```

## Workflow Features

### 1. Dynamic Question Updates

- The system automatically updates the assistant with new questions
- Questions are contextualized with role, level, and type information

### 2. Real-time Transcription

- Live conversation display
- User and AI speech separation
- Final transcript capture

### 3. Interactive Functions

- Move to next question functionality
- Real-time feedback provision
- Answer completion detection

### 4. Mode Switching

- Seamless switching between text and voice modes
- Persistent interview state across modes

## Usage Instructions

### For Candidates:

1. **Start Interview**: Choose between text or voice mode
2. **Voice Mode**: Click "🎤 Start Voice Interview" to begin
3. **Natural Conversation**: Speak naturally, the AI will guide you
4. **Question Navigation**: Say "next question" or let the AI move you forward
5. **Real-time Feedback**: Receive immediate feedback on your answers

### For Developers:

1. **Environment Setup**: Configure VAPI keys in `.env.local`
2. **Assistant Creation**: Set up VAPI assistant with provided configuration
3. **Testing**: Test voice functionality in development environment
4. **Deployment**: Ensure environment variables are set in production

## Error Handling

The system includes comprehensive error handling:

- Fallback to text mode if voice fails
- Connection retry mechanisms
- User-friendly error messages
- Graceful degradation

## Best Practices

1. **Audio Quality**: Ensure good microphone setup for accurate transcription
2. **Network Stability**: Stable internet connection for real-time voice processing
3. **Browser Permissions**: Grant microphone permissions when prompted
4. **Environment**: Use in quiet environment for best results

## Troubleshooting

### Common Issues:

1. **No Voice Input**: Check microphone permissions
2. **Poor Transcription**: Verify audio quality and background noise
3. **Connection Errors**: Verify VAPI keys and network connectivity
4. **Assistant Not Responding**: Check VAPI assistant configuration

### Debug Mode:

Enable console logging to see VAPI events:

```javascript
console.log("VAPI Event:", event);
```

## Integration Architecture

```
[Interview Interface]
      ↓
[VAPI Service]
      ↓
[VAPI API] → [OpenAI GPT-4] → [Voice Synthesis] → [User]
      ↓
[Transcription] → [Function Calls] → [Interview Logic]
```

This integration provides a seamless voice-powered interview experience while maintaining all existing text-based functionality.
