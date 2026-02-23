# Firebase Domain Configuration Guide

## ✅ SOLUTION IMPLEMENTED: Stable URL Setup

Your email verification is now configured with a **stable URL** that never changes!

## Current Configuration:

**Production URL (STABLE):** `https://ai-mockprep-stable.vercel.app`
**Development URL:** `http://localhost:3000`

## Firebase Console Setup:

### 1. Add ONLY This Domain to Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: `ai-mockprep-firebase`
3. **Navigate to Authentication**:

   - Click on "Authentication" in the left sidebar
   - Go to the "Settings" tab
   - Click on "Authorized domains"

4. **Add This Stable Domain**:

   ```
   localhost (for development)
   ai-mockprep-stable.vercel.app (for production)
   ```

   **✅ Advantage**: This URL NEVER changes, even with new deployments!

   **How to add:**

   - Click "Add domain"
   - Paste the domain (without https://)
   - Click "Add"

### 2. Configure Email Templates (Optional but Recommended)

1. **Go to Authentication > Templates**
2. **Email address verification**:

   - Customize the email template
   - Ensure the action URL points to your domain

3. **Password reset**:
   - Customize the email template
   - Ensure the action URL points to your domain

### 3. Current Production URL

Your current production URL is:

```
https://interview-ai-agent-gik8pym9y-nikhilprataps66-gmailcoms-projects.vercel.app
```

**⚠️ Important**: This URL changes with each deployment! Consider setting up a custom domain.

### 4. Environment Variables (Optional)

To make URL management easier, you can add this to your Vercel environment variables:

```
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
```

### 5. Verify the Fix

After adding the domain:

1. Deploy your updated code
2. Try signing up with a new email
3. Check that email verification works
4. Test password reset functionality

## Common Issues:

- **Domain case sensitivity**: Make sure the domain matches exactly
- **Protocol**: Don't include `https://` when adding to Firebase
- **Subdomains**: Each Vercel deployment gets a unique subdomain
- **Custom domains**: If you set up a custom domain, add that instead

## Quick Test Commands:

```bash
# Build and deploy
npm run build
npx vercel --prod

# Check the new deployment URL and update Firebase accordingly
```

## Future Improvements:

Consider setting up a custom domain in Vercel for a more stable URL that won't change between deployments.
