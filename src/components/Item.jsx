import React from 'react'
import Dropdown from './Dropdown'
import Fault from './Fault'

const Item = () => {

  let working = ['Kunnossa', 'Ei kunnossa'];
  let counter = 0;

  console.log('Itemiin paasty')
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
    </div>
  )
}

export default Item