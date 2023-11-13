import { TaskStatus } from '@/shared/types/TaskStatus'
import { TaskType } from '@/shared/types/TaskType'
import React, { FC } from 'react'
import Task from '../Task'
import { useDrop } from 'react-dnd'
import TaskWrapper from '../wrappers/TaskWrapper'

type DNDContainerProps = {
    tasks: Array<TaskType>,
    status: TaskStatus
}

const changeStatus = (task:TaskType,status:TaskStatus) => {
    task.status !== status && console.log(task,status)
}

const DNDContainer: FC<DNDContainerProps> = ({tasks,status}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'TaskComponent',
        drop: (task:TaskType) => changeStatus(task,status),
        collect: (monitor) => ({
            isOver: monitor.isOver() && monitor.getItem().status !== status
        })
    }));
    return (
        <div 
            ref={drop} 
            className={`h-full drop-shadow-sm p-2 flex flex-wrap content-start gap-2 transition-transform duration-200 
            ${isOver ? 'bg-bluejeans/20' : 'bg-secondary'} `}
        >
            {
                tasks.map(task => (
                    <TaskWrapper key={task.id} task={task}>
                        <Task key={task.id} task={task} />
                    </TaskWrapper>
                ))
            }
        </div>
  )
}

export default DNDContainer