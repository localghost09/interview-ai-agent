import React, { ReactNode } from 'react'
import  Link from 'next/link'
import Image from 'next/image'
import WindowCloseHandler from '@/components/WindowCloseHandler'
import LogoutButton from '../../components/LogoutButton'
import Footer from '@/components/Footer'

const RootLayout = ({children}: {children:ReactNode}) => {
  return (
    <div className='root-layout min-h-screen flex flex-col'>
      <WindowCloseHandler />
      <nav className='flex justify-between items-center'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src ='/logo.svg' alt='logo' width={38} height={32}/>
          <h2 className='text-primary-100'>AI MockPrep</h2>
        </Link>
        <LogoutButton />
      </nav>
      <main className='flex-1'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
