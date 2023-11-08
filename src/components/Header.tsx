import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Teko } from 'next/font/google'
import SideBarToggle from './mobile/SideBarToggle';
const teko = Teko({subsets:['latin']});

const Header = () => {
  return (
    <header className='grow-0 bg-light drop-shadow-sm z-10'>
        <nav className='w-full px-4 lg:px-20 py-2 gap-x-3 sm:gap-x-6 flex items-center'>
            <SideBarToggle />
            <Link href={'/'} className='flex items-end gap-x-2'>
                <Image src={'/SVGs/robot.svg'} alt='GuideHub logo' priority width={40} height={40} />
                <h1 className={'text-2xl tracking-wider ' + teko.className}>GuideHub</h1>
            </Link>
            <div className='w-10 h-10 bg-bluejeans ml-auto text-light rounded-full flex items-center justify-center drop-shadow-sm'>GH</div>
        </nav>
    </header>
  )
}

export default Header