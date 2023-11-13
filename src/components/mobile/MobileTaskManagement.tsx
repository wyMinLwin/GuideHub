import React from 'react'
import Task from '../Task'

const MobileTaskManagement = () => {
  return (
    <div className='w-full h-full p-2 bg-secondary sm:hidden overflow-y-scroll'>
        <div className='flex flex-wrap gap-2'>
            {/* <Task labelColor='done' />
            <Task labelColor='done' />
            <Task labelColor='done' />
            <Task labelColor='done' />
            <Task labelColor='done' /> */}
        </div>
    </div>
  )
}

export default MobileTaskManagement