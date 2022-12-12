import React from 'react'
import { useEffect, useState } from 'react'

const Fault = (props) => {

  console.log('Faultin props: ', props)
  const handleSubmit = () => {
    props.show()
  }

  const handleCancel = () => {
    props.show()
  }

  return (
    <div className='border border-black rounded-md'>
      <input
        type="textarea"
        className=""
        placeholder="Poikkeama/Toimenpide"
      />
      <div>
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
      <div>
        <button>Ota kuva</button>
        <button>Lisää kuva</button>
      </div>
      <div>
        <button onClick={() => handleSubmit()}>Tallenna</button>
        <button onClick={() => handleCancel()}>Peruuta</button>
      </div>
    </div>
  )
}

export default Fault