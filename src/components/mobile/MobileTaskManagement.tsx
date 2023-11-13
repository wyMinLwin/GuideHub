import { TaskType } from '@/shared/types/TaskType'
import React from 'react'
import Task from '../Task'

const tasks:Array<TaskType> = [
  {
    id:'1',
    title:'GuideHub Dnd',
    body: 'Need to implement drag and drop feature to Tasks for GuideHub.',
    status:'in progress'
  },
  {
    id:'3',
    title:'To Learn New Things',
    body: 'Need to learn something that can improve the career.',
    status:'todo'
  },
  {
    id:'2',
    title:'To Drink Coffee',
    body: 'Let me get a coffee.',
    status:'done'
  }
]
const MobileTaskManagement = () => {
  return (
    <div className='w-full h-full p-2 bg-secondary sm:hidden overflow-y-scroll'>
      <div className='flex flex-wrap gap-y-2.5'>
        {
          tasks.map(task => (
            <Task key={task.id} task={task} />
          ))  
        }
      </div>
    </div>
  )
}

export default MobileTaskManagement