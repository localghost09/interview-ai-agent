import React, { ReactNode } from 'react'
import WindowCloseHandler from '@/components/WindowCloseHandler'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const RootLayout = ({children}: {children:ReactNode}) => {
  return (
    <div className='root-layout min-h-screen flex flex-col'>
      <WindowCloseHandler />
      <Navigation />
      {/* Add top padding to account for fixed navbar */}
      <main className='flex-1 pt-16'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
