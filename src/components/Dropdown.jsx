import React from 'react'

const Dropdown = (props, {setLab}) => {
  return (
    <div className="relative lg:max-w-sm">
        <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
        {props.list.map((item) =>
          <option key={item} onClick={console.log(item)} >{item}</option>)}
        </select>
    </div>
  )
}

export default Dropdown