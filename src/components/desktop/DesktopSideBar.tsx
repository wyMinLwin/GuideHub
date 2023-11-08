'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {Variants, motion} from 'framer-motion'
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

const activeVariant: Variants = {
	active: {
		x: 0
	},
	inactive: {
		x: '-100%'
	}
}

const activeTextVariant: Variants = {
	active: {
		x: 15
	},
	inactive: {
		x: 0
	}
}

const DesktopSideBar = () => {
	const currentPath = usePathname();
    return (
        <>
			{
				tabs.map(tab => (
					<Link 
						key={tab.label} href={tab.label}
						className='relative w-full'
					>
						<motion.div 
							variants={activeTextVariant}
							initial={'inactive'}
							animate={currentPath === '/'+tab.label ? 'active' : 'inactive'}
							className={'w-full flex gap-x-2 items-center py-2 pr-36 pl-3 rounded-md'}
						>
							<Image src={'/SVGs/'+tab.image+'.svg'} alt={tab.image} priority width={30} height={30} />
							<p className='capitalize'>{tab.label}</p>
						</motion.div>
						<motion.div 
							className='sidebar-active' 
							variants={activeVariant}
							initial={'inactive'}
							animate={currentPath === '/'+tab.label ? 'active' : 'inactive'}
						></motion.div>
					</Link>
				))
			}
		</>
    )
}

export default DesktopSideBar