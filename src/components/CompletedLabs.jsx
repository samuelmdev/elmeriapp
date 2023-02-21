import React, { useState, useEffect } from 'react'
import CompletedItems from './CompletedItems'

const CompletedLabs = ({completed}) => {

 // const [isOpen, setIsOpen] = useState(false)
  const [completedLabs, setCompletedLabs] = useState()
  let completedList = []
  let completedItems = []
  const [selectedRoom, setSelectedRoom] = useState('')

 // if (completed.length > 0) {setCompletedLabs(completed)}
  useEffect(() => {
    setCompletedLabs(completed)}, [completed])
  
  const handleClick = (index) => {
    let newRoom = completedLabs[index]
    if (newRoom !== selectedRoom) {
      setSelectedRoom(newRoom)
      console.log('Valittu tila:', selectedRoom)
    } else {setSelectedRoom('')}
  }

  const setCompletedList = () => {
    completedLabs.forEach((item, index) => {completedList.push( 
      <button className='border-b-2 hover:bg-primary-blue hover:scale-125 hover:text-white px-8 py-1 text-lg transition ease-in-out duration-300' key={item} onClick={() => {handleClick(index)}}>
        <p>{item}</p>
      </button>
    )})
    return completedList
  }

  return (
    <div>
      {(completedLabs) ? 
      <div className='flex flex-row justify-center mx-10'>
        {setCompletedList()}
      </div> : null}
      {(selectedRoom) && <CompletedItems room={selectedRoom} />}
    </div>
  )
}

export default CompletedLabs