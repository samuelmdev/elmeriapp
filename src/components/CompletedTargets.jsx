import React, { useState, useEffect } from 'react'
import Handleinputs from './Handleinputs'

const CompletedTargets = ({completed}) => {

  const[targetArray, setTargetArray] = useState()
  const[faultsShow, setFaultsShow] = useState([])
  const[filteredTarget, setFilteredTarget] = useState()
  const[mappedTargets, setMappedTargets] = useState()
  let room = []
  let completedTargetsList = []
  let editedTargetsList = []
  let mappedList = []
  let mappedObs = []
  let filteredList = []

  useEffect(() => {
    completedTargetsList = Handleinputs()
    console.log('completed targets useEffect suoritettu')
    setTargetArray(editArray())
  }, [])

  const editArray = () => {
    completedTargetsList.map((item, index) => {
      room.push(item.room.name)
      item.targets.map((target, tIndex) => {
        let found = editedTargetsList.find(item => item.target === target.name)
        if (!found) editedTargetsList.push({target: target.name, obs: []})
        target.obs.map((item, oIndex) => {
          let foundO = editedTargetsList[tIndex].obs.find(listItem => listItem.name === item.name)
          if (!foundO) {editedTargetsList[tIndex].obs.push({name: item.name, okCount: item.okCount, notOkCount: item.notOkCount, showFaults: false, faults:[{room: room[index], roomFaults: [...item.faults]}]})
          console.log('if push suoritettu')
        }
          else {
            editedTargetsList[tIndex].obs[oIndex].okCount += item.okCount
            editedTargetsList[tIndex].obs[oIndex].notOkCount += item.notOkCount
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

  const handleShowFaults = (props) => {
    console.log('handleShowFaultsin props:', props)
    console.log('showFaults value: ', targetArray[props.tIndex].obs[props.tIndex])
    let stateCopy = targetArray.slice()
    stateCopy[props.tIndex].obs[props.oIndex].showFaults = !stateCopy[props.tIndex].obs[props.oIndex].showFaults
    setTargetArray(stateCopy)
  }

  const mapObs = ({tIndex}) => {
    return (targetArray[tIndex].obs.map((obj, oIndex) => (
      <div className='m-b-2'>
        <p className='border-b-2'>{obj.name}</p>
        <p>Kunnossa: {obj.okCount}</p>
        <p>Ei kunnossa: {obj.notOkCount}</p>
        <button onClick={() => handleShowFaults({tIndex, oIndex})} className='border-b-2 bg-light-blue py-1 px-16 my-2 font-md'>Näytä poikkeukset</button>
        {obj.faults.map((fault, index) => {
          <p>Tila: {fault.room}</p>
        })}
        {(obj.showFaults) && mapFaults({tIndex, oIndex})}
        </div>
    )))
  }

  const mapFaults = (props) => {
    console.log("mapfaults propsit:", props)
    return(targetArray[props.tIndex].obs[props.oIndex].faults.map((fault, index) => (
      <div>
        <p>{fault.room}</p>
        <p></p>
      </div>
    ))
    )
  }

  const mapTargetList = () => {
      return(
      targetArray.map((item, index) => (
        <div className='flex flex-col justify-items-start' key={item}>
          <p className='border-b-2 px-8 font-bold text-lg'>{item.target}</p>
          <div>
            {mapObs({tIndex:index})}
          </div>
        </div>
      )))
  
  }

  return (
    <div>
      {(targetArray) ? <div className='flex flex-col gap-4'>{mapTargetList()}</div> : null}
    </div>
  )
}

export default CompletedTargets