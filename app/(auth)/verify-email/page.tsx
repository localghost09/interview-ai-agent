'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { applyActionCode, checkActionCode } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function VerifyEmailContent() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      const actionCode = searchParams.get('oobCode')
      
      if (!actionCode) {
        setVerificationStatus('invalid')
        setErrorMessage('Invalid verification link. Please request a new verification email.')
        return
      }

      try {
        // Check if the action code is valid
        await checkActionCode(auth, actionCode)
        
        // Apply the email verification
        await applyActionCode(auth, actionCode)
        
        setVerificationStatus('success')
        toast.success('Email verified successfully! You can now sign in.')
        
        // Redirect to sign-in page after 3 seconds
        setTimeout(() => {
          router.push('/sign-in')
        }, 3000)
        
      } catch (error: unknown) {
        console.error('Email verification error:', error)
        setVerificationStatus('error')
        
        const authError = error as { code?: string, message?: string }
        
        if (authError.code === 'auth/expired-action-code') {
          setErrorMessage('This verification link has expired. Please request a new one.')
        } else if (authError.code === 'auth/invalid-action-code') {
          setErrorMessage('This verification link is invalid. Please request a new one.')
        } else if (authError.code === 'auth/user-disabled') {
          setErrorMessage('This account has been disabled.')
        } else {
          setErrorMessage('Failed to verify email. Please try again.')
        }
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-md w-full">
        <div className="card-border">
          <div className="flex flex-col gap-6 card py-14 px-10 text-center">
            {/* Logo */}
            <div className="flex flex-row gap-2 justify-center">
              <Image src='/logo.svg' alt='logo' height={32} width={38}/>
              <h2 className="text-primary-100">AI MockPrep</h2>
            </div>

            {/* Status Content */}
            {verificationStatus === 'loading' && (
              <>
                <Loader2 className="w-16 h-16 text-blue-400 mx-auto animate-spin" />
                <h3 className="text-xl font-semibold text-white">Verifying Your Email</h3>
                <p className="text-gray-300">Please wait while we verify your email address...</p>
              </>
            )}

            {verificationStatus === 'success' && (
              <>
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                <h3 className="text-xl font-semibold text-white">Email Verified Successfully!</h3>
                <p className="text-gray-300">
                  Your email has been verified. You can now sign in to your account.
                </p>
                <p className="text-sm text-gray-400">
                  Redirecting you to sign in page in 3 seconds...
                </p>
                <Link href="/sign-in">
                  <Button className="btn w-full">
                    Continue to Sign In
                  </Button>
                </Link>
              </>
            )}

            {(verificationStatus === 'error' || verificationStatus === 'invalid') && (
              <>
                <XCircle className="w-16 h-16 text-red-400 mx-auto" />
                <h3 className="text-xl font-semibold text-white">Verification Failed</h3>
                <p className="text-gray-300">{errorMessage}</p>
                <div className="flex flex-col gap-3">
                  <Link href="/sign-up">
                    <Button className="btn w-full">
                      Request New Verification
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button variant="outline" className="w-full">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
