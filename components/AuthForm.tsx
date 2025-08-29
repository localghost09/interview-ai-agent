'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from 'zod'
import Image from 'next/image'   
import Link from 'next/link'



import { Button } from "@/components/ui/button"
import {
  Form,
  
} from "@/components/ui/form"
import { toast } from "sonner";
import FormField from "@/components/FormField";
import EmailVerification from "@/components/EmailVerification";
import PasswordReset from "@/components/PasswordReset";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "@/firebase/client";
import {signIn , signUp} from "@/lib/actions/auth.action";
import { emailVerificationConfig, fallbackEmailVerificationConfig } from "@/lib/emailConfig";
import { useState, useEffect } from "react";


const authFormSchema = (type:FormType) =>{
  return z.object({
    name : type==='sign-up' ? z.string().min(3) : z.string().optional(),
    email :z.string().email(),
    password : z.string().min(8),
  })
}

const AuthForm = ({ type }:{type: FormType}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showEmailVerification, setShowEmailVerification] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showEmailExistsHelper, setShowEmailExistsHelper] = useState(false);
    const formSchema = authFormSchema(type);
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name : '',
        email: "",
        password: "",
      },
    })

    // Auto-fill email from URL params when coming from sign-up and show verification success
    useEffect(() => {
      const emailFromUrl = searchParams.get('email');
      const verifiedFromUrl = searchParams.get('verified');
      
      if (emailFromUrl && type === 'sign-in') {
        form.setValue('email', emailFromUrl);
      }
      
      // Show success message if user just verified their email
      if (verifiedFromUrl === 'true' && type === 'sign-in') {
        toast.success('Email verified successfully! You can now sign in to your account.');
      }
    }, [searchParams, type, form]);
   
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try{
        if(type==='sign-up'){

          const { name,email,password} = values;

          const userCredentials = await createUserWithEmailAndPassword(auth,email,password);

          // Update user profile with their name
          if (name) {
            await updateProfile(userCredentials.user, {
              displayName: name
            });
          }

          // Send email verification - try simple approach first
          try {
            // Try without any custom configuration first (simplest approach)
            await sendEmailVerification(userCredentials.user);
            
            // Store the name in localStorage to use when they verify and sign in
            localStorage.setItem(`pendingUser_${userCredentials.user.uid}`, name!);
            
            setUserEmail(email);
            setShowEmailVerification(true);
            toast.success('Account created! Please check your email to verify your account before signing in.') 
          } catch (emailError) {
            console.error('Simple email verification failed:', emailError);
            
            // Try with custom configuration as fallback
            try {
              await sendEmailVerification(userCredentials.user, emailVerificationConfig);
              
              localStorage.setItem(`pendingUser_${userCredentials.user.uid}`, name!);
              setUserEmail(email);
              setShowEmailVerification(true);
              toast.success('Account created! Please check your email to verify your account before signing in.') 
            } catch (customError) {
              console.error('Custom email verification failed:', customError);
              
              // Last attempt with fallback config
              try {
                await sendEmailVerification(userCredentials.user, fallbackEmailVerificationConfig);
                
                localStorage.setItem(`pendingUser_${userCredentials.user.uid}`, name!);
                setUserEmail(email);
                setShowEmailVerification(true);
                toast.success('Account created! Please check your email to verify your account.') 
              } catch (fallbackError) {
                console.error('All email verification attempts failed:', fallbackError);
                
                // Still allow user to proceed to verification screen to manually resend
                localStorage.setItem(`pendingUser_${userCredentials.user.uid}`, name!);
                setUserEmail(email);
                setShowEmailVerification(true);
                toast.error('Account created but failed to send verification email. You can resend it from the next screen.');
              }
            }
          }
          // Don't redirect immediately, show verification component instead
        }else{
          const {email , password} = values;

          const userCredentials = await signInWithEmailAndPassword(auth , email, password);

          // Check if email is verified
          if (!userCredentials.user.emailVerified) {
            toast.error('Please verify your email before signing in. Check your inbox for verification email.');
            
            // Option to resend verification email
            try {
              // Try simple approach first
              await sendEmailVerification(userCredentials.user);
              toast.info('Verification email sent again. Please check your inbox.');
            } catch (emailError) {
              console.error('Simple resend verification failed:', emailError);
              // Try with custom configuration
              try {
                await sendEmailVerification(userCredentials.user, emailVerificationConfig);
                toast.info('Verification email sent. Please check your inbox.');
              } catch (customError) {
                console.error('Custom resend verification failed:', customError);
                // Try with fallback configuration
                try {
                  await sendEmailVerification(userCredentials.user, fallbackEmailVerificationConfig);
                  toast.info('Verification email sent. Please check your inbox.');
                } catch (fallbackError) {
                  console.error('All resend verification attempts failed:', fallbackError);
                  toast.error('Failed to send verification email. Please try again later or contact support.');
                }
              }
            }
            return;
          }

          const idToken = await userCredentials.user.getIdToken();

          if(!idToken){
            toast.error('Sign in failed')
            return;
          }

          // First sign in after email verification - create user in Firestore
          const signInResult = await signIn({
            email,idToken
          });

          // If sign in fails because user doesn't exist in Firestore, create them
          if (!signInResult.success && signInResult.message.includes('User does not exist')) {
            // Get the stored name from localStorage or use a default
            const storedName = localStorage.getItem(`pendingUser_${userCredentials.user.uid}`);
            const userName = storedName || userCredentials.user.displayName || 'User';
            
            const signUpResult = await signUp({
              uid: userCredentials.user.uid,
              name: userName,
              email,
            });

            if (!signUpResult.success) {
              toast.error(signUpResult.message);
              return;
            }

            // Clean up the stored name
            localStorage.removeItem(`pendingUser_${userCredentials.user.uid}`);
            toast.success('Account setup completed! Welcome!');

            // Try signing in again after creating user
            const finalSignInResult = await signIn({
              email,idToken
            });

            if (!finalSignInResult.success) {
              toast.error(finalSignInResult.message);
              return;
            }
          } else if (!signInResult.success) {
            toast.error(signInResult.message);
            return;
          }

          toast.success('Sign In Successfully') 
          router.push('/')
        }
      }catch(error: unknown){
        console.log(error);
        
        const authError = error as { code?: string, message?: string }
        
        // Handle specific Firebase auth errors
        if (authError.code === 'auth/email-already-in-use') {
          // Check if this is during signup - offer to resend verification
          if (type === 'sign-up') {
            setUserEmail(values.email);
            toast.error('Account exists but may not be verified.', {
              description: 'Try signing in or reset password if needed.',
              action: {
                label: 'Go to Sign In',
                onClick: () => router.push(`/sign-in?email=${encodeURIComponent(values.email)}`)
              }
            });
          } else {
            setUserEmail(values.email);
            setShowEmailExistsHelper(true);
            toast.error('This email is already registered.', {
              description: 'Click here to sign in instead.',
              action: {
                label: 'Sign In',
                onClick: () => router.push('/sign-in')
              }
            });
          }
        } else if (authError.code === 'auth/unauthorized-continue-uri') {
          toast.error('Email verification setup issue. Please contact support or try again in a few minutes.');
        } else if (authError.code === 'auth/weak-password') {
          toast.error('Password should be at least 6 characters long.');
        } else if (authError.code === 'auth/invalid-email') {
          toast.error('Please enter a valid email address.');
        } else if (authError.code === 'auth/user-not-found') {
          toast.error('No account found with this email. Please sign up first.');
        } else if (authError.code === 'auth/wrong-password') {
          toast.error('Incorrect password. Please try again.');
        } else if (authError.code === 'auth/invalid-credential') {
          toast.error('Invalid email or password. Please check your credentials.');
        } else {
          toast.error(`Authentication error: ${authError.message || 'Unknown error'}`);
        }

      }
      console.log(values)
    }

    const isSignIn = type === "sign-in";

    // Show password reset component for sign-in
    if (showPasswordReset && isSignIn) {
      return (
        <div className="card-border lg:min-w-[566px]">
          <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
              <Image src='/logo.svg' alt='logo' height={32} width={38}/>
              <h2 className="text-primary-100">AI MockPrep</h2>
            </div>
            <h3 className="text-center">Reset Password</h3>
            
            <PasswordReset onBack={() => setShowPasswordReset(false)} />
          </div>
        </div>
      );
    }

    // Show email verification component for sign-up after account creation
    if (showEmailVerification && !isSignIn) {
      return (
        <div className="card-border lg:min-w-[566px]">
          <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
              <Image src='/logo.svg' alt='logo' height={32} width={38}/>
              <h2 className="text-primary-100">AI MockPrep</h2>
            </div>
            <h3 className="text-center">Check Your Email</h3>
            
            <EmailVerification email={userEmail} />
            
            <p className='text-center text-sm text-gray-400'>
              Want to use a different email?{' '}
              <button 
                onClick={() => setShowEmailVerification(false)}
                className='font-bold text-blue-400 hover:text-blue-300'
              >
                Sign up again
              </button>
            </p>
          </div>
        </div>
      );
    }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src='/logo.svg' alt='logo' height={32} width={38}/>
          <h2 className="text-primary-100">AI MockPrep </h2>
        </div>
        <h3>Practice job interview with AI</h3>
      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn &&(
          <FormField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter Your Name"
          />
        )}
        <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your email address"
            type='email'
          />
        <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Your password"
            type="password"
          />
        <Button className="btn" type='submit'>{isSignIn ?'Sign In ' : 'Create an Account'}</Button>
        
        {isSignIn && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowPasswordReset(true)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        )}
      </form>
    </Form>
    
    {/* Email Already Exists Helper */}
    {showEmailExistsHelper && !isSignIn && (
      <div className="border border-orange-500/20 bg-orange-500/10 rounded-lg p-4 text-center">
        <div className="text-orange-400 text-sm mb-3">
          <strong>Email Already Registered</strong>
        </div>
        <p className="text-gray-300 text-sm mb-4">
          The email <strong>{userEmail}</strong> is already associated with an account.
        </p>
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={() => {
              // Navigate to sign-in with email prefilled
              router.push(`/sign-in?email=${encodeURIComponent(userEmail)}`);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm transition-colors"
          >
            Go to Sign In
          </Button>
          <Button 
            onClick={() => {
              setShowEmailExistsHelper(false);
              form.reset();
            }}
            variant="outline"
            className="border-gray-500 text-gray-300 hover:bg-gray-700 px-6 py-2 rounded-md text-sm transition-colors"
          >
            Try Different Email
          </Button>
        </div>
      </div>
    )}
    
    <p className='text-center'>
      {isSignIn ? 'No account yet?' : 'Already have an account?'}
      <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold text-user-primary ml-1'>
        {isSignIn ? 'Sign up' : 'Sign In'}
      </Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm

