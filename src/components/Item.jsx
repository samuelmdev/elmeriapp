import React from 'react'
import Dropdown from './Dropdown'
import Fault from './Fault'

const Item = () => {

  let working = ['Kunnossa', 'Ei kunnossa'];
  let counter = 0;

  console.log('Itemiin paasty')
  return (
    <div>
      <Dropdown list = {working} />
      <input
          type="textarea"
          className=""
          placeholder="Poikkeama/Toimenpide"
      />
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
  
      <div>
        <button>Ota kuva</button>
        <button>Lisää kuva</button>
      </div>
    </div>
  )
}

export default Item