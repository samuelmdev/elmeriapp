import { Input } from 'postcss';
import React, { useState, useRef } from 'react'
import CompletedItems from './CompletedItems';
import CompletedLabs from './CompletedLabs';
import Dropdown2 from './Dropdown2';
import ItemsList from './ItemsList';
import Fault from './Fault';
import { addRoom, addTargets } from './Handleinputs';
import CompletedTargets from './CompletedTargets';

const Report = () => {

  const [laborators, setLaborators] = useState([{ value: '5A102', label: '5A102' },
                {value: '5A101', label: '5A101' }, 
                {value: '5A103', label: '5A103' }, 
                {value: '5B103', label: '5B103' }, 
                {value: '5A105', label: '5A105' }, 
                {value: 'LVI-tekniikka', label: 'LVI-tekniikka' }  
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
  const [showCompleted, setShowCompleted] = useState([false, false])

  let obsNumber = 0;
  let currentObsCount = 0

  let objCompleted = false

  let tCount = 0
  let oCount = null
  let curCount = null

  const setDate = () => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let separator = '.'
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
  }

  const incrementTargetCount = () => {
    setTargetCount(targetCount + 1)
  }

  const nextPressed = () => {
    if (targetCount === targetQuantity) {
      setLabCompleted(lab)
      setLab(null)
      setTargets(null)
      setTargetCount(0)
    }else {
      setTargetCompleted(targets.target)
      targetSelector()
      //addTargets({target: targets.target})
    }
  } 

  const  getChildState = () => {
    let childState = childStateRef.current.getChildOption()
    setLab(childState.label)
    targetSelector()
    addRoom({name: childState.label})
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
    incrementTargetCount()
  }
  
  const NextButtonLabel = () => {
    if (targetCount === targetQuantity) return <p>Tila valmis</p>
    return <p>Seuraava kohde</p>
  }

  const handleShow = (props) => {
    let stateCopy = showCompleted
    if (stateCopy[props.index]) stateCopy[props.index] = !stateCopy[props.index]
    else {
      stateCopy = [false, false]
      stateCopy[props.index] = !stateCopy[props.index]
    }
    setShowCompleted(stateCopy)
  }

  const nextRoomText = () => {
    return ((completedLabs.length > 0) ? <p className='text-xl'>Valitse seuraava tila</p> : <p className='text-xl'>Valitse tila</p>)
  }

  const ChooseLab = () => {
    return (
      <div className='flex flex-col justify-center items-center content-center space-y-4 mt-10'>
        <div>
          <p>Havainnoitsijat: </p>
          <input
            type="text"
            className="px-1 py-1 border border-black rounded-lg"
            value={observers}
            placeholder="Etunimi Sukunimi,..."
            onChange={(event) => setObservers(event.target.value)}
          />
        </div>
        {(completedLabs.length > 0) &&
          <div>
            <button className='border-b-2 hover:bg-primary-blue hover:scale-125 hover:text-white px-8 py-1 text-lg transition ease-in-out duration-300' onClick={() => handleShow({index:0})}>Suoritukset kohteittain</button>
            <button className='border-b-2 hover:bg-primary-blue hover:scale-125 hover:text-white px-8 py-1 text-lg transition ease-in-out duration-300' onClick={() => handleShow({index:1})}>Suoritetut tilat</button>
          </div>}
        {(showCompleted[0] && completedLabs.length > 0) ? <CompletedTargets completed={completedLabs} /> : null}
        {(showCompleted[1] && completedLabs.length > 0) && <CompletedLabs completed={completedLabs} />}
        <div className='pt-10 px-10'>
          {nextRoomText()}
          <Dropdown2 list = {laborators} ref={childStateRef} />
        </div>
        <button className="my-2 px-5 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-xl" onClick={() => getChildState()}>Valitse</button>
      </div>
    )
  }

  const LabChosen = () => {
    return (
      <div className='my-8 space-y-4 pb-8'>
        <p>Havainnoitsijat: {observers}</p>
        {console.log('raportin completedLabs: ', completedLabs)}
        {/*CompletedItems({completed: {completedTargets}})*/}
        <p>Valittu tila: <span className='font-bold font-lg'>{lab}</span></p>
        <p>Tarkastelukohde: <span className='font-bold font-md'>{targets.target}</span></p>
        {addTargets({target: targets.target})}
        <ItemsList objects= {targets.obs} />
        <button className="my-2 px-3 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-lg" onClick={() => nextPressed()}>{NextButtonLabel()}</button>
      </div>
    )
  }

  return (
    <div className='mx-10 my-8'>
      <div>
        <div className='flex flex-row justify-around mt-8 text-lg'><p>Turvallisuusraportti</p><p>{setDate()}</p></div>
        {(lab) ? LabChosen() : ChooseLab()}
      </div>
    </div>
  )
}

export default Report