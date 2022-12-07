import React from 'react'
import Dropdown3 from './Dropdown3'

const Itemselector = (props) => {
  console.log('lista on selectorissa', props.list)

  return (
    <div>
      <Dropdown3 list = {props.list} handleObsChange={props.handleObsChange}/>
    </div>
  )
}

export default Itemselector