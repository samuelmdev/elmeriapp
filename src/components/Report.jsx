import { Input } from 'postcss';
import React, { useState, useRef } from 'react'
import CompletedItems from './CompletedItems';
import CompletedLabs from './CompletedLabs';
import Dropdown2 from './Dropdown2';
import Fault from './Fault';

const Report = () => {

  const [laborators, setLaborators] = useState([{ value: 'lab1', label: 'Lab1' },
                {value: 'lab2', label: 'Lab2' }, 
                {value: 'lab3', label: 'Lab3' }, 
                {value: 'lab4', label: 'Lab4' }, 
                {value: 'lab5', label: 'Lab5' }, 
                {value: 'lab6', label: 'Lab6' }  
  ])

  const obsObjects = [ {target: 'Työskentely', objs: [{obj: 'Riskinotto, Suojaimet, Vaatetus'}]},
                    {target: 'Ergonomia', objs: [{obj: 'Fyysinen kuormitus'}, {obj: 'Työpisteiden ja välineiden ergonomia'}]}, 
                    {target: 'Kone- ja laiteturvallisuus', objs: [{obj: 'Koneiden kunto ja suojalaitteet'}, {obj: 'Koneiden hallintalaitteet ja merkintä'}]}, 
                    {target: 'Liikkumisturvallisuus', objs: [{obj: 'Kulkuteiden ja lattian rakenne, putoamissuojaus'}, {obj: 'Poistumistiet'}]},
                    {target: 'Järjestys', objs: [{obj: 'Kulkuteiden ja lattioiden järjestys'}, {obj: 'Pöydät, päällyset, hyllyt'}, {obj: 'Jäteastiat'}]},
                    {target: 'Työympäristötekijät', objs: [{obj: 'Melu', obj: 'Valaistus'}, {obj: 'Lämpöolosuhteet'}, {obj: 'Ilman puhtaus ja käsiteltävät aineet'}]}
  ]

  const [started, setStarted] = useState(false);
  const [completedLabs, setCompletedLabs] = useState([]);
  const [completedTargets, setCompletedTargets] = useState([]);
  const [lab, setLab] = useState(null);
  const [observers, setObservers] = useState("");
  const [targetCount, setTargetCount] = useState(0);
  const [targets, setTargets] = useState({target: null, obs:[]});
  const childStateRef = useRef();
  const [targetQuantity, setTargetQuantity] = useState(0);
  const [obsCount, setObsCount] = useState(0);
  const [workingCount, setWorkingCount] = useState(0);
  const [notWorkingCount, setNotWorkingCount] = useState(0);
  const [showFault, setShowFault] = useState(false);
  const [obsArray, setObsArray] = useState([]);
  const [counters, setCounters] = useState([])

  let obsNumber = 0;
  let currentObsCount = 0

  let objCompleted = false

  let tCount = 0
  let oCount = null
  let curCount = null

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

  const incrementCount = ({name, index}) => {
    const countersCopy = [...counters]
    if (name === 'ok') {
      countersCopy[index].ok += 1
      setCounters({ok: countersCopy})
    }
    if (name === 'notOk') {
      countersCopy[index].notOk += 1
      setCounters({notOk: countersCopy})
    }
  }

  const decrementCount = ({name, index}) => {
    const countersCopy = [...counters]
    if (name === 'ok') {
      countersCopy[index].ok -= 1
      setCounters({ok: countersCopy})
    }
    if (name === 'notOk') {
      countersCopy[index].notOk -= 1
      setCounters({notOk: countersCopy})
    }
  }

  const getCurCount = (num) => {
    console.log('num curCountissa on: ', num)
    return curCount = num}

  const nextPressed = () => {
    incrementTargetCount()
    setCounters([])
    if (targetCount === targetQuantity) {
      setLabCompleted(lab)
      setLab(null)
      setTargets(null)
      setTargetCount(0)
    }else {
      setTargetCompleted(targets.target)
      targetSelector()
      setCounter()
    }
  } 

  const  getChildState = () => {
    let childState = childStateRef.current.getChildOption()
    setLab(childState.label)
    targetSelector()
    obsCounter()
    setCounter()
  }

  const setLabCompleted = String => {
    setCompletedLabs([...completedLabs, String])
    let filtered = laborators.filter(item => {return item.label !== String})
    setLaborators(filtered)
  }

  const setTargetCompleted = String => {
    setCompletedTargets([...completedTargets, String])
  }

  const targetCounter = () => {
    let targetsCount = obsObjects.length
    setTargetQuantity(targetsCount)
  }

  const targetSelector = () => {
    targetCounter()
    setTargets({target: obsObjects[targetCount].target, obs: obsObjects[targetCount].objs})
  }

  const setCounter = () => {
    targets.obs.forEach(
      setCounters([...counters, {ok: 0, notOk: 0}])
    )
  }

  const Counter = ({ value, incrementCount, decrementCount }) => {
    return (
      <div>
        {value > 0 && (
          <button onClick={() => decrementCount()}>
            -
          </button>)}
        <input
          type="number"
          onChange={(e) => {value = (e.target.value)}}
          value={value}
          />
        <button onClick={() => incrementCount()}>
          +
        </button>
      </div>
    )
  }

  const ItemsList = () => {
    let count = 0
    let itemList = []
    console.log('Obsit on: ', targets.obs[0])
    targets.obs.map((obs, index) => {
      count++
      console.log('Kohta on: ', obs.obj)
      console.log('kohta count on: ', count)
      console.log('Counterit tila on: ', counters)
      itemList.push(
        <div key={obs.obj}>
          <p className='flex justify-left'>Kohta {index + 1}: <span className='font-bold'> {obs.obj}</span></p>
          <hr className='bg-gray-500'/>
          <div>
            <p>Kunnossa</p>
            <div>
              <Counter
                value={counters[index].ok}
                incrementCount={incrementCount({name: 'ok', index: index})}
                decrementCount={decrementCount({name: 'ok', index: index})}
              />
            </div>
          </div>
          <div>
            <p>Ei Kunnossa</p>
            <div>
              <Counter
                value={counters[index].notOk}
                incrementCount={incrementCount({name: 'notOk', index: index})}
                decrementCount={decrementCount({name: 'notOk', index: index})}
              />
            </div>
          </div>
          {(showFault) ? <Fault show= {toggleFaultShow} /> : null}
        </div>
    )
    })
    //setObsArray(obsList)
    return itemList
  }

  const obsCounter = () => {
    setObsCount(0)
  }
  
  const NextButtonLabel = () => {
    console.log('targettien maara: ', targetQuantity)
    console.log('targetCount on: ', targetCount)
    if (targetCount === targetQuantity) return <p>Tila valmis</p>
    return <p>Seuraava kohde</p>
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
        {CompletedLabs({completed: completedLabs})}
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
        {CompletedLabs({completed: completedLabs})}
        {CompletedItems({completed: {completedTargets}})}
        <p>Valittu tila: <span className='font-bold'>{lab}</span></p>
        <p>Tarkastelukohde: <span className='font-bold'>{targets.target}</span></p>
        <div>{ItemsList()}</div>
        <button className="nextBtn" onClick={() => nextPressed()}>{NextButtonLabel()}</button>
      </div>
    )
  }

  return (
    <div className='mx-5'>
      <div>
        <div className='flex flex-row justify-around'><p>Turvallisuusraportti</p><p>29.11.2022</p></div>
        {(lab) ? LabChosen() : ChooseLab()}
      </div>
    </div>
  )
}

export default Report