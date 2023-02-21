import React, { useState, useEffect } from 'react'
import Handleinputs from './Handleinputs'

const CompletedTargets = ({completed}) => {

  const[targetArray, setTargetArray] = useState()
  const[filteredTarget, setFilteredTarget] = useState()
  let room = []
  let completedTargetsList = []
  let editedTargetsList = []
  let mappedList = []
  let filteredList = []

  useEffect(() => {
    completedTargetsList = Handleinputs()
    console.log('completed targets useEffect suoritettu')
    setTargetArray(editArray())
  }, [completed])

  const editArray = () => {
    completedTargetsList.map((item, index) => {
      room.push(item.room.name)
      item.targets.map((target, tIndex) => {
        let found = editedTargetsList.find(item => item.target === target.name)
        if (!found) editedTargetsList.push({target: target.name, obs: []})
        target.obs.map((item, oIndex) => {
          let foundO = editedTargetsList[tIndex].obs.find(listItem => listItem.name === item.name)
          if (!foundO) {editedTargetsList[tIndex].obs.push({name: item.name, okCount: item.okCount, notOkcount: item.notOkCount, faults:[{room: room[index], roomFaults: [...item.faults]}]})
          console.log('if push suoritettu')}
          else {
            editedTargetsList[tIndex].obs[oIndex].okCount = editedTargetsList[tIndex].obs[oIndex].okCount + item.okCount
            editedTargetsList[tIndex].obs[oIndex].notOkCount = editedTargetsList[tIndex].obs[oIndex].notOkCount + item.notOkCount
            editedTargetsList[tIndex].obs[oIndex].faults.push({room: room[index], roomFaults: [...item.faults]})
            console.log('else add suoritettu')
          }
        })
      })
    })
    //setTargetArray(editedTargetsList)
    console.log('valmis array kohteittain:', editedTargetsList)
    return editedTargetsList
  }

  const handleClick = () => {

  }

  const mapTargetList = () => {
    if (targetArray) {
      targetArray.forEach((item, index) => {mappedList.push( 
        <button className='border-b-2 px-8 hover:bg-primary-blue hover:scale-110 hover:text-white' key={item} onClick={() => {handleClick(index)}}>
          <p>{item.target}</p>
        </button>
      )})
      return mappedList}
  }

  const mapTargetObs = ({name}) => {
    filteredList = targetArray.find(item => item.target === name)
  }

  return (
    <div>
      {(targetArray) ? <div>{mapTargetList()}</div> : null}
    </div>
  )
}

export default CompletedTargets