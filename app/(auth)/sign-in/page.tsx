
import { Suspense } from 'react'
import AuthForm from '@/components/auth/AuthForm'

function SignInContent() {
  return <AuthForm type='sign-in' />
}

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  )
}

export default page


