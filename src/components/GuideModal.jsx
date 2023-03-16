import React, { useState } from 'react'
import Modal from 'react-modal';

const GuideModal = ({open, handleClose, room}) => {
  const [selectedRoom, setSelectedRoom] = useState("")

  useState(() => {
    if (room === '5A102') setSelectedRoom("Elmeri1.pdf")
    if (room === '5A101') setSelectedRoom("Elmeri2.pdf")
    if (room === '5A103') setSelectedRoom("Elmeri3.pdf")
    if (room === '5B103') setSelectedRoom("Elmeri4.pdf")
    if (room === '5A105') setSelectedRoom("Elmeri5.pdf")
    if (room === 'LVI-tekniikka') setSelectedRoom("Elmeri6.pdf")
  }, [])


  if(!open) return null

  return (
    <Modal isOpen={open} ariaHideApp={false} className=''>
      <p>Valittu tila: {room}</p>
      <button onClick={() => handleClose()}>close Modal</button>
      <iframe seamless className='w-full h-full' src="public/Elmeri1.pdf" ></iframe>
    </Modal>
  )
}

export default GuideModal