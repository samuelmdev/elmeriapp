import React from 'react'
import { useState } from 'react'

let contentArray = []
let rIndex = 0
let tIndex = 0

const addRoom = (room) => {
  contentArray.push({room: room, targets:[]})
  setRoomIndex()
  console.log(contentArray)
}

const addTargets = (target) => {
  contentArray[rIndex].targets.push({name:target.target, obs:[]})
  console.log('target lisatty ',contentArray)
  setTargetIndex()
}

const addItems = (props) => {
  let itemsList = props.objectList
  for (let i = 0; i < itemsList.length; i++) {
    contentArray[rIndex].targets[tIndex].obs.push({name:itemsList[i].name, okCount:itemsList[i].okCount, notOkCount:itemsList[i].notOkCount, faults:[]})
  }
  console.log('addItems lista on: ', contentArray)
}

const addFault = ({fault, index}) => {
  const faultItem = {exception:fault.exception, responsible:fault.responsible, urgency:fault.urgency}
  contentArray[rIndex].targets[tIndex].obs[index].faults.push(faultItem)
  const countFaults = contentArray[rIndex].targets[tIndex].obs[index].faults.length
  contentArray[rIndex].targets[tIndex].obs[index].notOkCount = countFaults
}

const deleteFault = ({index}) => {
  contentArray[rIndex].targets[tIndex].obs[index].faults.pop()
  const countFaults = contentArray[rIndex].targets[tIndex].obs[index].faults.length
  contentArray[rIndex].targets[tIndex].obs[index].notOkCount = countFaults
}

const deleteFaultAtIndex = ({index, fIndex}) => {
  contentArray[rIndex].targets[tIndex].obs[index].faults.splice(fIndex, 1)
  const countFaults = contentArray[rIndex].targets[tIndex].obs[index].faults.length
  contentArray[rIndex].targets[tIndex].obs[index].notOkCount = countFaults
  console.log('fault poistettu: ', contentArray[rIndex].targets[tIndex].obs[index].faults)
}

const setOkCount = ({count, index}) => {
  contentArray[rIndex].targets[tIndex].obs[index].okCount = count
}

const setRoomIndex = () => {
  rIndex = contentArray.length - 1
}

const setTargetIndex = () => {
  tIndex = contentArray[rIndex].targets.length - 1
}

const getFaults = (index) => {
 return contentArray[rIndex].targets[tIndex].obs[index].faults
}

const getTargetList = (room) => {
  console.log('handleInputs room: ', room)
  let targetRoomList = contentArray.filter(target => {return target.room.name === room})
  console.log('getTargetList: ', targetRoomList)
  return targetRoomList
}

const Handleinputs = () => {
  console.log('HandleInputs kutsuttu')
  return contentArray
}

export default Handleinputs

export { addRoom, addTargets, addItems, addFault, deleteFault, setOkCount, getFaults, getTargetList, deleteFaultAtIndex }
