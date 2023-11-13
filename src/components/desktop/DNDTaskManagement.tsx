'use client'
import React, { useState } from 'react'
import { TaskType } from '@/shared/types/TaskType'
import DNDProvider from '../wrappers/DNDProvider'
import DNDContainer from './DNDContainer'
const todosSample:Array<TaskType> = [
  {
    id:'1',
    title:'GuideHub Dnd',
    body: 'Need to implement drag and drop feature to Tasks for GuideHub.'
  },
  {
    id:'2',
    title:'To Drink Coffee',
    body: 'Let me get a coffee.'
  }
]



const DNDTaskManagement = () => {
  const [todos,setTodos] = useState<Array<TaskType>>(todosSample);
  const [inProgress,setInProgress] = useState<Array<TaskType>>([]);
  const [done,setDone] = useState<Array<TaskType>>([]);
  return (
    <DNDProvider>
        <DNDContainer tasks={todos} status='todo' />
        <DNDContainer tasks={inProgress} status='in progress' />
        <DNDContainer tasks={done} status='done' />
    </DNDProvider>
  )
}

export default DNDTaskManagement