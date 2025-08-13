import React, { Suspense } from 'react'
import AuthForm from '@/components/AuthForm'

function SignUpContent() {
  return <AuthForm type='sign-up' />
}

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  )
}

export default page
