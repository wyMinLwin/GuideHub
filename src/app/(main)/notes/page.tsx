import DesktopNotesContainer from '@/components/desktop/DesktopNotesContainer'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Notes | GuideHub"
}
export default function NotesPage() {
  return (
    <div className='w-full h-full bg-light border-2 flex flex-col'>
        <h1 className='text-xl px-5 py-2 grow-0'>Notes</h1>
        <DesktopNotesContainer />
    </div>
  )
}
