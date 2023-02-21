import React, { useState, useRef } from 'react'
import { addFault } from './Handleinputs';
import Dropdown2 from './Dropdown2';
import PictureTaking from './PictureTaking'

const Fault = (props) => {
  const [exception, setException] = useState("");
  const [responsible, setResponsible] = useState("");
 // const [urgency, setUrgency] = useState("");
  const childStateRef = useRef();
  const urgencyArray = [{ value: 'matala', label: 'matala' },
                {value: 'normaali', label: 'normaali' }, 
                {value: 'kiireellinen', label: 'kiireellinen'}]

  const handleSubmit = () => {
    let childState = childStateRef.current.getChildOption()
   // setUrgency(childState.label)
    let urgency = childState.label
    handleInput(props.index)
    props.addFault({fault:{exception: exception, responsible: responsible, urgency: urgency}, index: props.index})
    addFault({fault:{exception, responsible, urgency}, index:props.index})
    setException("")
    setResponsible("")
   // setUrgency("")
    props.increment()
    props.show({index: props.index})
  }

  const handleCancel = () => {
    setException("")
    setResponsible("")
   // setUrgency("")
    props.cancel()
    props.show({index: props.index})
  }

  const handleInput = (index) => {
  }

  return (
    <div className='border-2 border-primary-blue rounded-lg my-4 space-y-2 mx-10 py-2 flex flex-col items-start px-16 transition duration-500 gap-y-2'>
      <p className='font-bold m-x-10'>{props.number}. Poikkeama/Huomio</p>
      <input
        type="textarea"
        className="px-1 py-2 border border-black rounded-lg w-4/5"
        placeholder="Poikkeama/Toimenpide"
        onChange={(e) => setException(e.target.value)}
      />
      <div className='flex align-start justify-between gap-x-4'>
        <input
          type="textarea"
          className="px-1 border border-black rounded-lg w-1/3"
          placeholder="Vastuutaho"
          onChange={(e) => setResponsible(e.target.value)}
        />
      {/*  <input
          type="textarea"
          className="px-1 border border-black rounded-lg"
          placeholder="Kiireellisyys"
          onChange={(e) => setUrgency(e.target.value)}
  /> */}
        <div className='flex flex-row items-start w-1/3'>
          <p className='mt-2'>Kiireellisyys:</p>
          <Dropdown2 list = {urgencyArray} ref={childStateRef} />
        </div>
      </div>
      <PictureTaking />
      <div className='flex self-center gap-x-10 my-4'>
        <button className='border-2 border-white bg-oamk-orange rounded-lg mx-2 my-4 px-4 py-1 hover:scale-110 transition ease-in-out duration-300 text-lg' onClick={handleCancel}>Peruuta</button>
        <button className='border-2 border-white bg-primary-blue text-white rounded-lg mx-2 my-4 px-4 py-1  hover:scale-110 transition ease-in-out duration-300 text-lg' onClick={handleSubmit}>Tallenna</button>
      </div>
    </div>
  )
}

export default Fault