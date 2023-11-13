import { TaskType } from '@/shared/types/TaskType'
import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
type TaskWrapperProps = {
    task: TaskType
    children: React.ReactNode
}
const TaskWrapper: FC<TaskWrapperProps> = ({task,children}) => {
    const [{opacity}, drag] = useDrag(() => ({
        type: 'TaskComponent',
        item: task,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    }))
  return (
    <div ref={drag} style={{opacity}} className='w-fit h-fit'>
        {children}
    </div>
  )
}

export default TaskWrapper