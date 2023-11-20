import Header from '@/components/Header'
import DesktopSideBar from '@/components/desktop/DesktopSideBar'
import React from 'react'


export default function HomeLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
    return (
        <main className='w-full h-full flex flex-col'>
            <Header />
            <div className='grow overflow-hidden flex'>
				<aside className='hidden grow-0 bg-light drop-shadow-sm lg:flex flex-col py-3 gap-y-3'>
					<DesktopSideBar /> 
				</aside>
				<div className='grow p-3'>
					{children}
				</div>
            </div>
        </main>
    )
}
