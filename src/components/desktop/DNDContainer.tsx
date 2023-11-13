import { TaskStatus } from '@/shared/types/TaskStatus'
import { TaskType } from '@/shared/types/TaskType'
import React, { FC } from 'react'
import Task from '../Task'
import { useDrop } from 'react-dnd'

type DNDContainerProps = {
    tasks: Array<TaskType>,
    status: TaskStatus
}

const DNDContainer: FC<DNDContainerProps> = ({tasks,status}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'TaskComponent',
        drop: (task:TaskType) => console.log(task,status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));
    return (
        <div 
            ref={drop} 
            className={`h-full drop-shadow-sm p-2 flex flex-wrap content-start gap-2 transition-transform duration-200 
            ${isOver ? 'bg-bluejeans/20' : 'bg-secondary'} `}
        >
            {
                tasks.map(todo => (
                    <Task key={todo.id} task={todo} labelColor={status} />
                ))
            }
        </div>
  )
}

export default DNDContainer