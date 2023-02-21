import React from 'react'
import { useState, useEffect } from 'react'
import Fault from './Fault'
import { deleteFaultAtIndex, getFaults } from './Handleinputs'

const Faultslist = ({oIndex, faults, deleteFault}) => {

  const[faultArray, setFaultArray] = useState(null)
  const[showList, setShowList] = useState(false)
  
  useEffect(() => {
    console.log('Faultlist fault on: ', faults)
    setFaultArray(faults)}, [faults])

  const changeShow = () => {
    let newBool = !showList
    setShowList(newBool)
  }

  const handleChange = () => {

  }

  const handleDelete = ({fIndex}) => {
    console.log('delete painettu')
    console.log('delete fIndex:', fIndex)
    deleteFault({index:oIndex, fIndex:fIndex})
    deleteFaultAtIndex({index:oIndex, fIndex:fIndex})
  }

  const mapFaults = () => {
    if (faultArray) {
      return (
      faultArray.map((item, index) => (
        <div className='flex flex-col space-between items-center border-b'>
          <p className='font-bold'>{index + 1}. Poikkeama</p>
          <div className='px-1 items-center my-2'>
            <p>Poikkeama: {item.fault.exception}</p>
            <div className='flex flex-row gap-x-8 my-2'>
              <p>Vastuutaho: {item.fault.responsible}</p>
              <p>Kiireellisyys: {item.fault.urgency}</p>
            </div>
          </div>
          <div className='flex flex-row gap-x-10'>
            <button className='border-2 border-white bg-primary-blue text-white rounded-lg mx-2 my-4 px-4 py-1  hover:scale-110 transition ease-in-out duration-300 text-lg' onClick={() => handleChange({fIndex: index})}>Muokkaa</button>
            <button className='border-2 border-white bg-oamk-orange rounded-lg mx-2 my-4 px-4 py-1 hover:scale-110 transition ease-in-out duration-300 text-lg' onClick={() => handleDelete({fIndex: index})}>Poista</button>
          </div>
        </div>
      )))
    }
  }

  return (
    <div className=''>
      {(faultArray) && (faultArray.length > 0) && <button onClick={changeShow} className='border-b-2 py-1 px-16 my-2 font-md'>Näytä poikkeukset</button>}
      {(showList) && mapFaults()}
    </div>
  )
}

export default Faultslist