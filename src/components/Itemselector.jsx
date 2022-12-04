import React from 'react'
import Dropdown3 from './Dropdown3'

const Itemselector = ({list}) => {
  console.log('lista on selectorissa', list)
  return (
    <div>
      <Dropdown3 list={list}/>
    </div>
  )
}

export default Itemselector