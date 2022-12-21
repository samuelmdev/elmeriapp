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
      <button className='border-t-2 border-b-2 hover:bg-primary-blue hover:scale-125 hover:text-white px-8 py-1 text-lg transition ease-in-out duration-300' key={item} onClick={() => {handleClick()}}>
        <p>{item}</p>
      </button>
    )}))
    return completedList
  }

  return (
    <div>
      {(completed.length > 0) ? 
      <div className='flex flex-row justify-center mx-10'>
        {setCompletedList()}
      </div> : null}
    </div>
  )
}

export default CompletedLabs