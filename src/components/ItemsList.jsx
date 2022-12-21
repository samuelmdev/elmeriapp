import React, { useState, useEffect } from 'react'
import Fault from './Fault';

const ItemsList = ({objects}) => {

  const [obsArray, setObsArray] = useState([]);
  const [itemListComponent, setItemListComponent] = useState();

  let itemList = []
  let objectList = []

  useEffect(() => {
    objects.forEach((item) => {
      objectList.push({name: item.obj, showFault: false, okCount: 0, notOkCount: 0})
    })  
    setObsArray(objectList)
    console.log('Obsit on: ', objectList)
  }, [objects])
  console.log('itemList tila on: ', obsArray)

  const incrementCount = ({name, index}) => {
    let stateCopy = obsArray.slice()
    if (name === 'ok') {
      if (stateCopy[index].okCount < 15) {
        stateCopy[index].okCount += 1
        setObsArray(stateCopy)
        console.log('increment tila on: ', obsArray)
      }
    }
    if (name === 'notOk' && !stateCopy[index].showFault) {
      if (stateCopy[index].notOkCount < 15) {
        stateCopy[index].notOkCount += 1
        setObsArray(stateCopy)
        toggleFaultShow({index: index})
        console.log('increment tila on: ', obsArray)
      }
    }
  }

  const decrementCount = ({name, index}) => {
    let stateCopy = obsArray.slice()
    if (name === 'ok') {
      stateCopy[index].okCount -= 1
      setObsArray(stateCopy)
      console.log('decrement tila on: ', obsArray)
    }
    if (name === 'notOk' && !stateCopy[index].showFault) {
      stateCopy[index].notOkCount -= 1
      setObsArray(stateCopy)
      console.log('decrement tila on: ', obsArray)
    }
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
    console.log('tila toggled:', obsArray)
  }

  return (
    <div>{
      obsArray.map((item, index) => (
          <div className='my-5' key={item.name}>
            <p className='flex justify-left mx-6'>Kohta {index + 1}:<span className='font-bold pl-2'> {item.name}</span></p>
            <hr className='bg-gray-500 m-b-1'/>
            <div className='flex flex-row justify-center m-t-1 space-x-10'>
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
            {(obsArray[index].showFault) && <Fault decrement={() => decrementCount({name: 'notOk', index: index})} number={obsArray[index].notOkCount} show={() => toggleFaultShow({index: index})} />}
          </div>
  ))
  }</div>)
}

export default ItemsList