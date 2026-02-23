# 🤖 AI Interview Agent

A comprehensive AI-powered interview practice platform built with Next.js, Firebase, and TypeScript. Practice technical interviews with AI-generated questions and receive detailed feedback on your performance.

## ✨ Features

- 🔐 **Authentication** - Secure Firebase authentication with session management
- 📝 **Interview Creation** - Dynamic interview generation based on role, level, and tech stack
- 🎯 **Interactive Interview** - Voice and text-based interview experience
- 🤖 **AI-Powered Feedback** - Detailed performance analysis and improvement suggestions
- 📊 **Dashboard** - Track your interview history and progress
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS

## 🚀 Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, Firebase Admin SDK
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Voice:** VAPI integration ready

## 🛠 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/localghost09/interview-ai-agent.git
   cd interview-ai-agent
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database (start in test mode for development)
   - Generate a service account key from Project Settings > Service Accounts

4. **Environment Configuration**

   Create a `.env.local` file in the root directory:

   ```env
   FIREBASE_PROJECT_ID="your-project-id"
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL="your-service-account-email@project.iam.gserviceaccount.com"
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎯 Usage

1. **Sign Up/Sign In** - Create an account or sign in with existing credentials
2. **Create Interview** - Set up a new interview with your desired role and tech stack
3. **Review Questions** - Preview the AI-generated questions before starting
4. **Take Interview** - Answer questions using voice or text input
5. **Get Feedback** - Receive detailed AI analysis and improvement suggestions

## 🚀 Deployment

Deploy easily on Vercel:

```bash
npx vercel
```

Don't forget to add your environment variables in the Vercel dashboard!

---

Made with ❤️ by [localghost09](https://github.com/localghost09)
