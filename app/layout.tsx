import type { Metadata } from "next";
import {Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const mona_Sans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Interview AI",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body
        className={`${mona_Sans.className} antialiased`}
      >
        {children}

        <Toaster/>
      </body>
    </html>
  );
}
