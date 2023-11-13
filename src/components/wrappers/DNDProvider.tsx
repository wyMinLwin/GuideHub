import React, { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DNDProvider: FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <DndProvider backend={HTML5Backend}>
        {children}
    </DndProvider>
  )
}

export default DNDProvider