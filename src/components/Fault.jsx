import React, { useEffect, useState } from 'react'

const Fault = (props) => {

  console.log('Faultin props: ', props)
  const handleSubmit = () => {
    props.show({index: props.index})
  }

  const handleCancel = () => {
    props.show({index: props.index})
    props.decrement()
  }

  return (
    <div className='border-2 border-primary-blue rounded-lg my-4 space-y-2 mx-10 py-2 flex flex-col items-center transition duration-500'>
      <p className='font-bold'>{props.number}. Poikkeama/Huomio</p>
      <input
        type="textarea"
        className="w-5/6"
        placeholder="Poikkeama/Toimenpide"
      />
      <div className='flex gap-x-4 w-5/6'>
        <input
          type="textarea"
          className=""
          placeholder="Vastuutaho"
        />
        <input
          type="textarea"
          className=""
          placeholder="Kiireellisyys"
        />
      </div>
      <div className='gap-x-10'>
        <button className='border-2 border-primary-blue rounded-lg mx-2 my-2 px-3 py-1 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white'>Ota kuva</button>
        <span>tai</span>
        <button className='border-2 border-primary-blue rounded-lg mx-2 my-2 px-3 py-1 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white'>Lisää kuva</button>
      </div>
      <div className='flex gap-x-10'>
        <button className='border-2 border-white bg-oamk-orange rounded-lg mx-2 my-2 px-4 py-1 hover:scale-110 transition ease-in-out duration-300 text-lg' onClick={handleCancel}>Peruuta</button>
        <button className='border-2 border-white bg-primary-blue text-white rounded-lg mx-2 my-2 px-4 py-1  hover:scale-110 transition ease-in-out duration-300 text-lg' onClick={handleSubmit}>Tallenna</button>
      </div>
    </div>
  )
}

export default Fault