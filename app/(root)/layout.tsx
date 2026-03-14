import React, { ReactNode } from 'react'
import WindowCloseHandler from '@/components/WindowCloseHandler'
import ConditionalNavigation from '@/components/ConditionalNavigation'
import ConditionalFooter from '@/components/ConditionalFooter'
import ConditionalRootContainer from '@/components/ConditionalRootContainer'

const RootLayout = ({children}: {children:ReactNode}) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <WindowCloseHandler />
      <ConditionalNavigation />
      <ConditionalRootContainer>
        <main className='flex-1'>
          {children}
        </main>
        <ConditionalFooter />
      </ConditionalRootContainer>
    </div>
  )
}

export default RootLayout
