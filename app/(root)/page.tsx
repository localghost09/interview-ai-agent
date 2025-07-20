import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import { getUserInterviews } from '@/lib/actions/interview.action'
import { getCurrentUser, requireAuth } from '@/lib/auth'

const page = async () => {
  await requireAuth(); // Ensure user is authenticated
  const user = await getCurrentUser();
  
  // Get user interviews if logged in
  let userInterviews: Interview[] = [];
  if (user) {
    const userInterviewsResult = await getUserInterviews(user.uid);
    userInterviews = userInterviewsResult.success ? userInterviewsResult.interviews : [];
  }

  return (
    <>
        <section className='card-cta'>
            <div className='flex flex-col gap-6 max-w-lg'>
              <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
              <p className='text-lg'>
                Practice on real interview questions and get instant feedback on your performance.
              </p>
              <Button asChild className='btn-primary max-sm:w-full'>
                <Link href='/interview'> Start an Interview</Link>
                
              </Button>
            </div>

            <Image src='/robot.png' alt='robot-dude' width={400} height={400} className='max-sm:hidden' />
        </section>
        
        {user && userInterviews.length > 0 && (
          <section className='flex flex-col gap-6 mt-8'>
            <h2>Your Recent Interviews</h2>
            <div className='interviews-section'>
              {userInterviews.slice(0, 3).map((interview) => (
                <InterviewCard 
                  key={interview.id} 
                  interviewId={interview.id}
                  userId={interview.userId}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))}
            </div>
          </section>
        )}

        <section className='flex flex-col gap-6 mt-8'>
          <h2>Popular Interview Types</h2>
          <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
              <InterviewCard 
                key={interview.id} 
                interviewId={interview.id}
                userId={interview.userId}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))}
          </div>
        </section>
    </>
  )
}

export default page
