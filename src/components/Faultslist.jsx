import React from 'react'
import { useState } from 'react'
import Fault from './Fault'

const Faultslist = Number => {

  const[faultArray, setFaultArray] = useState(null)
  let arrayToUse = []
  const pushToArray = Number => {
    for (let i = 0; i > Number; i++) {
      pushToArray.push((Fault))
    }
   // setFaultArray(pushToArray)
  }

  return (
    <div>
      {faultArray}
    </div>
  )
}

export default Faultslist