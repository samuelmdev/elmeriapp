import { Input } from 'postcss';
import React, { useState, useRef } from 'react'
import CompletedItems from './CompletedItems';
import CompletedLabs from './CompletedLabs';
import Dropdown2 from './Dropdown2';
import ItemsList from './ItemsList';
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

  let obsNumber = 0;
  let currentObsCount = 0

  let objCompleted = false

  let tCount = 0
  let oCount = null
  let curCount = null

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
    }
  } 

  const  getChildState = () => {
    let childState = childStateRef.current.getChildOption()
    setLab(childState.label)
    targetSelector()
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
    console.log('targettien maara: ', targetQuantity)
    console.log('targetCount on: ', targetCount)
    if (targetCount === targetQuantity) return <p>Tila valmis</p>
    return <p>Seuraava kohde</p>
  }

  const ChooseLab = () => {
    return (
      <div className='flex flex-col justify-center items-center content-center space-y-4 mt-4'>
        <div>
          <p>Havainnoitsijat: </p>
          <input
            type="text"
            className=""
            value={observers}
            placeholder="Etunimi Sukunimi,..tai Etunimi,.."
            onChange={(event) => setObservers(event.target.value)}
          />
        </div>
        {{completedLabs} && CompletedLabs({completed: completedLabs})}
        <div>
          <p>Valitse tila</p>
          <Dropdown2 list = {laborators} ref={childStateRef} />
        </div>
        <button className="my-2 px-3 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-lg" onClick={() => getChildState()}>Valitse</button>
      </div>
    )
  }

  const LabChosen = () => {
    return (
      <div className='my-8 space-y-4 pb-8'>
        <p>Havainnoitsijat: {observers}</p>
        {{completedLabs} && CompletedLabs({completed: completedLabs})}
        {/*CompletedItems({completed: {completedTargets}})*/}
        <p>Valittu tila: <span className='font-bold font-lg'>{lab}</span></p>
        <p>Tarkastelukohde: <span className='font-bold font-md'>{targets.target}</span></p>
        <ItemsList objects= {targets.obs} />
        <button className="my-2 px-3 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-lg" onClick={() => nextPressed()}>{NextButtonLabel()}</button>
      </div>
    )
  }

  return (
    <div className='mx-10 my-8'>
      <div>
        <div className='flex flex-row justify-around mt-8'><p>Turvallisuusraportti</p><p>29.11.2022</p></div>
        {(lab) ? LabChosen() : ChooseLab()}
      </div>
    </div>
  )
}

export default Report