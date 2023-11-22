'use client'
import { TaskType } from '@/shared/types/TaskType'
import Image from 'next/image'
import React, { FC } from 'react'

const labelColors = {
    'todo' : 'before:bg-bluejeans',
    'in progress' : 'before:bg-progress',
    'done' : 'before:bg-success'
}

const circleColors = {
    'todo':'bg-bluejeans',
    'in progress':'bg-progress',
    'done': 'bg-success'
}

interface TaskProps {
    task: TaskType
}

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {}

const Task: FC<TaskProps> = ({task,...props}) => {
    
    return (
        <div {...props} className={`transition-opacity duration-100 w-full bg-light drop-shadow-lg sm:drop-shadow-sm p-2 pl-4 pr-2 rounded-sm relative task-label ${labelColors[task.status]}`}>        
            <div className='flex items-center gap-x-1'>
                <h2 className='w-11/12 overflow-hidden text-ellipsis whitespace-nowrap font-bold'>{task.title}</h2>
                <button className='w-1/12'>
                    <Image src={'/SVGs/options.svg'} alt='option button' priority width={20} height={20} />
                </button>
            </div>         
            <p className='text-sm overflow-hidden ellipsis-1 sm:ellipsis-3'>{task.body}</p>
            <div className='flex items-center gap-x-2 mt-2'>
                <div className={`w-2.5 h-2.5 rounded-full ${circleColors[task.status]}`}></div>
                <p className='text-xs text-black/60 capitalize'>{task.status}</p>
            </div>
        </div>
    )
}

export default Task