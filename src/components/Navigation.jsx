import React from 'react'
import { Link } from 'react-router-dom'
import { MdAssignment, MdAssignmentLate, MdHelpOutline } from "react-icons/md"
import { HiFolder } from "react-icons/hi";

// käyttöliittymän navigaatio linkit
const Navigation = () => {
  return (
    <div className='flex flex-row mx-16 gap-x-16'>
      <div className='flex flex-col gap-y-6 my-10 items-start justify-items-start ml-6'>
        <div>
          <Link to="/report"><button className='flex flex-row gap-1 border-2 border-primary-blue rounded-lg my-1 px-3 py-1 hover:scale-110 transition ease-in-out duration-300 text-xl hover:bg-primary-blue hover:text-white'><MdAssignment className='scale-110 mt-0.5' />Uusi raportti</button></Link>
        </div>
        <Link to="/reportslist"><button className='flex flex-row gap-1 border-2 border-primary-blue rounded-lg my-1 px-3 py-1 hover:scale-110 transition ease-in-out duration-300 text-xl hover:bg-primary-blue hover:text-white'><HiFolder className='scale-110 mt-0.5'/>Raportit</button></Link>
        <Link to="/guide"><button className='flex flex-row gap-1 border-2 border-primary-blue rounded-lg my-1 px-3 py-1 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white text-xl'><MdHelpOutline className='scale-110 mt-0.5'/>Ohjeet</button></Link>
      </div>
      <div className='my-10'>
        <Link to="/report"><button className='flex flex-row gap-1 px-3 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-2xl'><MdAssignmentLate className='scale-110 mt-0.5' />Keskeneräinen raportti</button></Link>
      </div>
    </div>
  )
}

export default Navigation