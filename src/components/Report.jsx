import React, { useState, useRef } from 'react'
import CompletedLabs from './CompletedLabs';
import Dropdown2 from './Dropdown2';
import ItemsList from './ItemsList';
import { addRoom, addTargets } from './Handleinputs';
import CompletedTargets from './CompletedTargets';

// raportti komponentti
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
  const [ready, setReady] = useState(false);
  const [completedLabs, setCompletedLabs] = useState([]);
  const [completedTargets, setCompletedTargets] = useState([]);
  const [lab, setLab] = useState(null);
  const [observers, setObservers] = useState([]);
  const [observer, setObserver] = useState("")
  const [targetCount, setTargetCount] = useState(0);
  const [targets, setTargets] = useState({target: null, obs:[]});
  const childStateRef = useRef();
  const inputRef = useRef();
  const [targetQuantity, setTargetQuantity] = useState(0);
  const [showCompleted, setShowCompleted] = useState([false, false]);

  // asettaa nykyisen päivämäärän reaporttiin
  const setDate = () => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let separator = '.'
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
  }

  // kasvattaa kohteiden määrää
  const incrementTargetCount = () => {
    setTargetCount(targetCount + 1)
  }

  // seuraava painettu tilan ollessa valittuna
  // tarkistaa onko huoneessa kaikki kohdat käyty läpi
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

  // hakee alasvetovalikosta valitun huoneen
  const  getChildState = () => {
    let childState = childStateRef.current.getChildOption()
    setLab(childState.label)
    targetSelector()
    addRoom({name: childState.label})
  }

  // asettaa huoneen läpikäydyksi ja poistaa alasvetovalikon listasta huoneen
  const setLabCompleted = String => {
    setCompletedLabs([...completedLabs, String])
    let filtered = laborators.filter(item => {return item.label !== String})
    setLaborators(filtered)
  }

  // asettaa kohdan läpikäytyjen listaan
  const setTargetCompleted = String => {
    setCompletedTargets([...completedTargets, String])
  }

  
  const targetCounter = () => {
    let targetsCount = obsObjects.length
    setTargetQuantity(targetsCount)
  }

  // kasvattaa in
  const targetSelector = () => {
    targetCounter()
    setTargets({target: obsObjects[targetCount].target, obs: obsObjects[targetCount].objs})
    incrementTargetCount()
  }
  
  // kohteiden läpikäynnissä vaihtaa näppäimen tekstiä
  const NextButtonLabel = () => {
    if (targetCount === targetQuantity) return <p>Tila valmis</p>
    return <p>Seuraava kohde</p>
  }

  const addObserver = () => {
    setObservers([...observers, observer])
    setObserver("")
    console.log('observers:', observers)
    inputRef.current.focus()
  }

  const mapObservers = () => {
    let obsString = ''
    observers.map((observer, index) => {
      if (index === 0) {obsString += observer}
      else {obsString += ", " + observer}
    })
    return obsString
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

  // asettaa huoneenvalinta-näppäimen tekstin
  const nextRoomText = () => {
    return ((completedLabs.length > 0) ? <p className='text-xl'>Valitse seuraava tila</p> : <p className='text-xl'>Valitse tila</p>)
  }

  // vaihtaa tilan, kun kutsutaan raportin valmistuessa
  const reportReady = () => {
    setReady(true)
  }

  // näkymä kun huone ei ole valittu ja vaihtuu, kun huoneet on käyty läpi
  const ChooseLab = () => {
    return (
      <div className='flex flex-col justify-center items-center content-center space-y-4 mt-10'>
      {/*  <div>
          <p>Havainnoitsijat: </p>
          <input
            type="text"
            className="px-1 py-1 border border-black rounded-lg"
            value={observers}
            placeholder="Etunimi Sukunimi,..."
            onChange={(event) => setObservers(event.target.value)}
          />
    </div> */}
        {(!ready) ?
        <div className='flex flex-col justify-center items-center content-center'>
          {/*(showCompleted[0] && completedLabs.length > 0) ? <CompletedTargets completed={completedLabs} /> : null*/}
          {(completedLabs.length > 0) && <CompletedLabs completed={completedLabs} />}
          {(completedLabs.length < 6) ? <div className='flex flex-col justify-center items-center content-center'><div className='pt-10 px-10 mb-4'>
            {nextRoomText()}
            <Dropdown2 list = {laborators} ref={childStateRef} />
          </div>
          <button className="my-2 px-5 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-xl" onClick={() => getChildState()}>Valitse</button></div> :
          <div className='pt-10'>
            <p className='mb-4'>Kaikki tilat suoritettu</p>
            <button onClick={() => {reportReady()}} className="my-2 px-5 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-xl">Raportti valmis</button>  
          </div>}
        </div> :
        <CompletedTargets />}
      </div>
    )
  }

  // näkymä kun huone on vaslittu
  const LabChosen = () => {
    return (
      <div className='my-8 space-y-4 pb-8'>
       {/* <p>Havainnoitsijat: {observers}</p> */}
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

  // raportin ylätekstit ja alemmat näkymät sen mukaan onko huone valittu
  return (
    <div className='mx-10 my-8'>
      <div>
        <div className='flex flex-row justify-around mt-8 text-lg'><p>Turvallisuusraportti</p><p>{setDate()}</p></div>
        <div className='flex flex-row justify-around mt-8 text-lg'>
          {(lab || completedLabs.length > 0) ?
            <p>Havainnoitsijat: {mapObservers()}</p> :
            <div>
            <input
            type="text"
            className="px-1 py-1 border border-black rounded-lg"
            value={observer}
            placeholder="Etunimi Sukunimi"
            onChange={(event) => setObserver(event.target.value)}
            autoFocus
            ref={inputRef}
            />
            <button className="my-2 ml-2 px-3 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-lg"  onClick={() => addObserver()}>Lisää</button>
          {(observers.length > 0) ? <p className='max-w-2/3'>Havainnoitsijat: {mapObservers()}</p> :
          <p className='max-w-2/3 invisible'>Havainnoitsijat: {mapObservers()}</p>}
          </div>}
        </div>
        {(lab) ? LabChosen() : ChooseLab()}
      </div>
    </div>
  )
}

export default Report