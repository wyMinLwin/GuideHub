import './globals.css'
import type { Metadata } from 'next'
import {Ubuntu} from 'next/font/google'

export const metadata: Metadata = {
  title: 'GuideHub',
}

const ubuntu = Ubuntu({weight:['300'],subsets:['latin']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={'w-screen h-screen overflow-hidden bg-light ' + ubuntu.className}>
        {children}
      </body>
    </html>
  )
}
