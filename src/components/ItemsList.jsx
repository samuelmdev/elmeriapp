import React, { useState, useEffect } from 'react'
import Fault from './Fault';
import Faultslist from './Faultslist';
import { addItems, deleteFault, setOkCount } from './Handleinputs';

const ItemsList = ({objects}) => {

  const [obsArray, setObsArray] = useState([]);
  const [itemListComponent, setItemListComponent] = useState();

  let itemList = []
  let objectList = []

  useEffect(() => {
    objects.forEach((item) => {
      objectList.push({name: item.obj, showFault: false, okCount: 0, notOkCount: 0, faults: []})
    })  
    setObsArray(objectList)
    addItems({objectList})
  }, [objects])

  const incrementCount = ({name, index}) => {
    let stateCopy = obsArray.slice()
    if (name === 'ok') {
      if (stateCopy[index].okCount < 15) {
        stateCopy[index].okCount += 1
        setObsArray(stateCopy)
        setOkCount({count:stateCopy[index].okCount, index:index})
      }
    }
    if (name === 'notOk' && !stateCopy[index].showFault) {
      if (stateCopy[index].notOkCount < 15) {
        stateCopy[index].notOkCount += 1
        setObsArray(stateCopy)
        toggleFaultShow({index: index})
      }
    }
  }

  const decrementCount = ({name, index}) => {
    let stateCopy = obsArray.slice()
    if (name === 'ok') {
      stateCopy[index].okCount -= 1
      setObsArray(stateCopy)
      setOkCount({count:stateCopy[index].okCount, index:index})
    }
    if (name === 'notOk' && !stateCopy[index].showFault) {
      stateCopy[index].notOkCount -= 1
      stateCopy[index].faults.pop()
      deleteFault({index:index})
      setObsArray(stateCopy)
    }
  }

  const handleCancel = ({index}) => {
    let stateCopy = obsArray.slice()
    stateCopy[index].notOkCount -= 1
    setObsArray(stateCopy)
  }

  const addFaultAtIndex = ({fault, index}) => {
    let stateCopy = obsArray.slice()
    stateCopy[index].faults.push(fault)
    setObsArray(stateCopy)
  }

  const deleteFaultFromArray = ({index, fIndex}) => {
    let stateCopy = obsArray.slice()
    console.log('delete obs indeksi:', index)
    console.log('delete indeksi:', fIndex)
    stateCopy[index].faults.splice(fIndex, 1)
    stateCopy[index].notOkCount -= 1
    setObsArray(stateCopy)
  }

  const Counter = ({ value, incrementCount, decrementCount }) => {
    return (
      <div className='mx-4 space-x-2'>
        {value > 0 && (
          <button className='bg-light-blue/80 hover:bg-bright-blue text-gray-800 font-bold py-2 px-4 rounded-lg' onClick={decrementCount}>
            -
          </button>)}
          {/*
        <input
          type="number"
          onChange={(e) => {value = (e.target.value)}}
          value={value}
        /> */}
        <span>{value}</span>
        <button className='bg-light-blue/80 hover:bg-bright-blue text-gray-800 font-bold py-2 px-4 rounded-lg' onClick={incrementCount}>
          +
        </button>
      </div>
    )
  }

  const setCounter = () => {
  }

  const obsCounter = () => {
  }

  const itemListSetter = (props) => {
    setItemListComponent(props.list)
    return itemListComponent
  }

  const toggleFaultShow = ({index}) => {
    let stateCopy = obsArray.slice()
    stateCopy[index].showFault = !stateCopy[index].showFault
    setObsArray(stateCopy)
  }

  return (
    <div>{
      obsArray.map((item, index) => (
          <div className='my-5' key={item.name}>
            <p className='flex justify-left mx-6'>Kohta {index + 1}:<span className='font-bold pl-2'> {item.name}</span></p>
            <hr className='bg-gray-500 m-b-1'/>
            <div className='flex flex-row justify-center m-t-1 space-x-16 mb-2'>
              <div>
                <p>Kunnossa</p>
                <div>
                  {Counter({
                    value: obsArray[index].okCount,
                    incrementCount: () => incrementCount({name: 'ok', index: index}),
                    decrementCount: () => decrementCount({name: 'ok', index: index})
                  })}
                </div>
              </div>
              <div>
                <p>Ei kunnossa</p>
                <div>
                  {Counter({
                    value: obsArray[index].notOkCount,
                    incrementCount: () => incrementCount({name: 'notOk', index: index}),
                    decrementCount: () => decrementCount({name: 'notOk', index: index})
                  })}
                </div>
              </div>
            </div>
            {(obsArray[index].showFault) && <Fault index={index} cancel={() => handleCancel({index: index})} increment={() => incrementCount({name: 'notOk', index: index})} number={obsArray[index].notOkCount} show={() => toggleFaultShow({index: index})} addFault={(fault) => addFaultAtIndex({fault: fault, index: index})} />}
            {(obsArray[index].faults.length > 0) && <Faultslist oIndex={index} faults={obsArray[index].faults} deleteFault={deleteFaultFromArray} />}
          </div>
  ))
  }</div>)
}

export default ItemsList