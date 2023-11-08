'use client'
import { useCycle, motion, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const tabs = [
	{
		label:'tasks',
		image:'tasks'
	},
	{
		label:'budgets',
		image:'coins'
	},
	{
		label:'notes',
		image:'notes'
	}
]


const sidebarVariant: Variants = {
    open : {
        x:0
    },
    closed : {
        x:'-100%'
    }
}

const SideBarToggle = () => {
    const [isSideBarOpen,toggleSideBarOpen] = useCycle(false,true);
  return (
    <>
        <button onClick={() => toggleSideBarOpen()} className='block lg:hidden'>
            <Image src={'/SVGs/menu.svg'} alt='menu icon' priority width={30} height={30} />
        </button>
        <motion.aside 
            initial={{x:'-100%'}} 
            animate={isSideBarOpen ? "open" : "closed"}
            variants={sidebarVariant} 
            transition={{duration:0.43}} 
            className='w-screen sm:w-1/2 md:w-2/5 h-screen p-4 bg-light drop-shadow-md absolute top-0 left-0 flex justify-center items-center z-20'>
            <button  onClick={() => toggleSideBarOpen()} className='p-1 border-2 border-black rounded-2xl flex items-center justify-center click-effect absolute top-0 left-0 m-4'>
                <Image src={'/SVGs/back.svg'} alt='back button' priority width={30} height={30} />
            </button>
            <nav className='flex flex-col gap-y-8'>
                {
                    tabs.map(tab => (
                        <Link onClick={() => toggleSideBarOpen()} className='flex items-center gap-x-3' href={tab.label} key={tab.label}>
                            <Image src={'/SVGs/'+tab.image+'.svg'} alt={tab.image} priority width={30} height={30} />
                            <p className='capitalize'>{tab.label}</p>
                        </Link>
                    ))
                }
            </nav>
        </motion.aside>
    </>
  )
}

export default SideBarToggle