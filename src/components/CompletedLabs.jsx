import React, { useState } from 'react'
import { useEffect } from 'react'

const CompletedLabs = ({completed}) => {

 // const [isOpen, setIsOpen] = useState(false)
  const [completedLabs, setCompletedLabs] = useState([])
  let completedList = []

 // if (completed.length > 0) {setCompletedLabs(completed)}
  useEffect(() => {setCompletedLabs({...completedLabs, completed})}, [completed])
  
  const handleClick = () => {
  //  setIsOpen(!isOpen)
  }

  const setCompletedList = () => {
    completedList.push(
    completedLabs.completed.forEach((item) => {completedList.push( 
      <button className='hover:scale-125' key={item} onClick={() => {handleClick()}}>
        <hr className='bg-gray-400' />
        <p>{item}</p>
        <hr className='bg-gray-400' />
      </button>
    )}))
    return completedList
  }

  return (
    <div>
      {(completed.length > 0) ? 
      <div className='flex flex-col'>
        {setCompletedList()}
      </div> : null}
    </div>
  )
}

export default CompletedLabs