import Image from 'next/image'
import React from 'react'
import { Teko } from 'next/font/google'
import Link from 'next/link';
import LoginForm from '@/components/forms/LoginForm';
const teko = Teko({subsets:['latin']});

export default function LoginPage() {
  return (
    <main className='w-full h-full px-3 sm:px-10 flex justify-center items-center font-light'>
        <div className='drop-shadow-lg px-3 py-16 w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-[420px] bg-light rounded-3xl flex flex-col gap-y-4'>
            <Image className='mx-auto' src={'/SVGs/robot.svg'} priority alt='assistant robot logo' width={50} height={50} />
            <p className={'text-center tracking-wider font-normal text-lg sm:text-xl lg:text-2xl ' + teko.className}>GuideHub made things easier.</p>
            <LoginForm />
            <Link className='text-center text-bluejeans sm:px-16 md:px-8 ' href={'/signup'}>New to Assistant? Sign up here.</Link>
        </div>
    </main>
  )
}
