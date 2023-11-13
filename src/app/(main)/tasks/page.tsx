import DesktopTaskManagement from '@/components/desktop/DesktopTaskManagement'
import MobileTaskManagement from '@/components/mobile/MobileTaskManagement'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
   title: 'Tasks | GuideHub'
}

export default function TasksPage() {
  return (
    <div className='w-full h-full bg-light border-2'>
        <MobileTaskManagement />
        <DesktopTaskManagement />
    </div>
  )
}
