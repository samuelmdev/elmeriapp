import { Input } from 'postcss';
import React, { useState, useRef } from 'react'
import Dropdown2 from './Dropdown2';
import Fault from './Fault';
import Faultslist from './Faultslist';
import Item from './Item';

const Report = () => {

  let laborators = [{ value: 'lab1', label: 'Lab1' },
                {value: 'lab2', label: 'Lab2' }, 
                {value: 'lab3', label: 'Lab3' }, 
                {value: 'lab4', label: 'Lab4' }, 
                {value: 'lab5', label: 'Lab5' }, 
                {value: 'lab6', label: 'Lab6' }  
  ]

  const obsObjects = [ {target: 'Työskentely', objs: [{obj: 'Riskinotto, Suojaimet, Vaatetus'}]},
                    {target: 'Ergonomia', objs: [{obj: 'Fyysinen kuormitus', obj: 'Työpisteiden ja välineiden ergonomia'}]}, 
                    {target: 'Kone- ja laiteturvallisuus', objs: [{obj: 'Koneiden kunto ja suojalaitteet'}, {obj: 'Koneiden hallintalaitteet ja merkintä'}]}, 
                    {target: 'Liikkumisturvallisuus', objs: [{obj: 'Kulkuteiden ja lattian rakenne, putoamissuojaus'}, {obj: 'Poistumistiet'}]},
                    {target: 'Järjestys', objs: [{obj: 'Kulkuteiden ja lattioiden järjestys'}, {obj: 'Pöydät, päällyset, hyllyt'}, {obj: 'Jäteastiat'}]},
                    {target: 'Työympäristötekijät', objs: [{obj: 'Melu', obj: 'Valaistus'}, {obj: 'Lämpöolosuhteet'}, {obj: 'Ilman puhtaus ja käsiteltävät aineet'}]}
  ]

  const [started, setStarted] = useState(false);
  const [lab, setLab] = useState(null);
  const [observers, setObservers] = useState("");
  const [targetCount, setTargetCount] = useState(0);
  const [targets, setTargets] = useState({target: null, obs:[]});
  const childStateRef = useRef();
  const [target, setTarget] = useState(null)
  const [selectedObs, setSelectedObs] = useState(null)
  const [obsCount, setObsCount] = useState(0)
  const [workingCount, setWorkingCount] = useState(0)
  const [notWorkingCount, setNotWorkingCount] = useState(0)
  const [showFault, setShowFault] = useState(false)

  let obsNumber = 0;
  let currentObsCount = 0
  let targetQuantity = 0

  let objCompleted = false

  let tCount = 0
  let oCount = null

  const toggleFaultShow = () => {
    console.log('showFault on ', showFault)
    let toggled = !showFault
    setShowFault(!showFault)
    console.log('showFault toggled')
    console.log('showFault on ', showFault)
  }

  const incrementTargetCount = () => {
    setTargetCount(targetCount + 1)
  }

  const incrementCount = (String) => {
    if (String === 'ok' && workingCount < 20) {
      let workingC = workingCount + 1
      setWorkingCount(workingC)
    }
    if (String === 'notOk' && !showFault && notWorkingCount < 20) {
      let notWorkingC = notWorkingCount + 1
      setNotWorkingCount(notWorkingC)
      toggleFaultShow()
    }
  }

  const decrementCount = String => {
    if (String === 'ok'&& workingCount > 0) {
      let workingC = workingCount - 1
      setWorkingCount(workingC)
    }
    if (String === 'notOk' && notWorkingCount > 0) {
      let notWorkingC = notWorkingCount - 1
      setNotWorkingCount(notWorkingC)
    }
  }

  const nextPressed = () => {
    incrementTargetCount()
    targetSelector()
  } 

  const  getChildState = () => {
    let childState = childStateRef.current.getChildOption()
    setLab(childState.label)
    targetSelector()
    obsCounter()
  }

  const countTargetQuantity = () => {
    obsObjects.forEach(target => {
      targetQuantity++
    });
    return targetQuantity
  }

  const targetSelector = () => {
    setTargets({target: obsObjects[targetCount].target, obs: obsObjects[targetCount].objs})
  }

  const ItemsList = () => {
    let count = 0
    let itemList = []
    console.log('Obsit on: ', targets.obs[0])
    targets.obs.map((obs, index) => {
      count++
      console.log('Kohta on: ', obs.obj)
      console.log('kohta count on: ', count)
      itemList.push(
        <div>
          <p className='flex justify-left'>Kohta {index + 1}: <span className='font-bold'> {obs.obj}</span></p>
          <hr className='bg-gray-500'/>
          <div>
            <p>Kunnossa</p>
            <div>
              <button onClick={() => decrementCount('ok')}>-</button>
              <input
                defaultValue={workingCount}
                type="number"
                onChange={(e) => {setWorkingCount(Number(e.target.value))}}
                value={workingCount}
                />
              <button onClick={() => incrementCount('ok')}>+</button>
            </div>
          </div>
          <div>
            <p>Ei Kunnossa</p>
            <div>
              <button onClick={() => decrementCount('notOk')}>-</button>
              <input
                type="number"
                defaultValue={notWorkingCount}
                onChange={(e) => {setNotWorkingCount(Number(e.target.value))}}
                value={notWorkingCount}
                />
                <button onClick={() => incrementCount('notOk')}>+</button>
            </div>
          </div>
          {(showFault) ? <Fault show= {toggleFaultShow} /> : null}
        </div>
    )
    })
    return itemList
  }

  const obsCounter = () => {
    setObsCount(0)
  }
  
  const NextButtonLabel = () => {
    if (obsCount === currentObsCount) return 'Seuraava kohde'
    return 'Seuraava kohta'
  }

  const ChooseLab = () => {
    return (
      <div>
        <p>Havainnoitsijat: </p>
        <input
          type="text"
          className=""
          value={observers}
          placeholder="Etunimi Sukunimi,..tai Etunimi,.."
          onChange={(event) => setObservers(event.target.value)}
        />
        <p>Valitse tila</p>
        <Dropdown2 list = {laborators} ref={childStateRef} />
        <button onClick={() => getChildState()}>Valitse</button>
      </div>
    )
  }

  const LabChosen = () => {
    return (
      <div>
        <p>Havainnoitsijat: {observers}</p>
        <p>Valittu tila: <span className='font-bold'>{lab}</span></p>
        <p>Tarkastelukohde: <span className='font-bold'>{targets.target}</span></p>
        <div>{ItemsList()}</div>
        <button className="nextBtn" onClick={() => nextPressed()}>{NextButtonLabel()}</button>
      </div>
    )
  }

  const plusPressed = () => {
    console.log('Plus painettu')
    
    return (<div>{setStarted(true)}<Item /></div>)
  }

  return (
    <div className='mx-5'>
      <div>
        <div className='flex flex-row justify-around'><p>Turvallisuusraportti</p><p>29.11.2022</p></div>
      {/*  <Dropdown3  list = {laborators} setLab = {setLab}/>*/}
        {(lab) ? LabChosen() : ChooseLab()}
      </div>
    </div>
  )
}

export default Report