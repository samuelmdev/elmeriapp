import React from 'react'
import Item from './Item'

const ObjectTarget = (props) => {
  const obsName = props.obsTarget
  return (
    props.completed ? <div>{obsName} ------- Completed</div> : Item()
  )
}

export default ObjectTarget