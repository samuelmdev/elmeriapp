import React, { useState, useRef } from 'react'
import Dropdown2 from './Dropdown2';
import Item from './Item';
import Itemselector from './Itemselector';
import ObjectTarget from './ObjectTarget';

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
 // const [targetCount, setTargetCount] = useState(0);
  const [obsCount, setObsCount] = useState(1);
  const [targetObs, setTargetObs] = useState([]);
  const childStateRef = useRef();
  const [target, setTarget] = useState(null)

  let count = 0;
  let obsNumber = 0;
  let currentObsCount = 0
  let targetCount = 0
  let targetQuantity = 0

  let objCompleted = false

  let tCount = 0
  let oCount = 0

  const nextPressed = () => {
    objCompleted = true
  }

  const  getChildState = () => {
    let childState = childStateRef.current.getChildOption()
    setLab(childState.label)
    targetSelector()
    obsSelector()
    obsCounter()
  }

  const countTargetQuantity = () => {
    obsObjects.forEach(target => {
      targetQuantity++
    });
    return targetQuantity
  }

  const targetSelector = () => {
    setTarget(obsObjects[targetCount].target)
  }

  const obsSelector = () => {
    setTargetObs(obsObjects[targetCount].objs)
  }

  const obsCounter = () => {
    oCount = 0
    for(Object in targetObs) {oCount++}
  }

  const obsLabel = () => {
    targetObs.map((item) => item.obj)
  }
  
  const NextButtonLabel = () => {
    if (obsCount === currentObsCount) return 'Seuraava kohde'
    return 'Seuraava kohta'
  }

  const nextTarget = () => {
    console.log('Seuraava painettu')
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
    console.log(observers)
    console.log(target)
    console.log(targetObs)
    return (
      <div>
        <p>Havainnoitsijat: {observers}</p>
        <p>Valittu tila: <span className='font-bold'>{lab}</span></p>
        <p>Tarkastelukohde: <span className='font-bold'>{target}</span></p>
        <p>Kohta: <span className='font-bold'>{targetObs[0].obj}</span></p>
        {(oCount === 1) ? obsLabel() : <Itemselector list={targetObs}/>}
        <Itemselector list={targetObs}/>
        <Item />
        <button className="nextBtn" onClick={() => nextPressed()}>{NextButtonLabel()}</button>
      </div>
    )
  }

  const plusPressed = () => {
    console.log('Plus painettu')
    
    return (<div>{setStarted(true)}<Item /></div>)
  }

  return (
    <div>
      <div>
        <div className='flex flex-row justify-around'><p>Turvallisuusraportti</p><p>29.11.2022</p></div>
      {/*  <Dropdown3  list = {laborators} setLab = {setLab}/>*/}
        {(lab) ? LabChosen() : ChooseLab()}
      </div>
    </div>
  )
}

export default Report