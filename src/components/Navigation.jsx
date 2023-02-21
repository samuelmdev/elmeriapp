import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='flex flex-row mx-16 gap-x-16'>
      <div className='flex flex-col gap-y-6 my-10 items-start justify-items-start ml-6'>
        <div>
          <Link to="/report"><button className='px-3 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-xl'>Uusi raportti</button></Link>
        </div>
        <Link to="/reportslist"><button className='border-2 border-primary-blue rounded-lg my-1 px-3 py-1 hover:scale-110 transition ease-in-out duration-300 text-xl hover:bg-primary-blue hover:text-white'>Raportit</button></Link>
        <Link to="/guide"><button className='border-2 border-primary-blue rounded-lg my-1 px-3 py-1 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white text-xl'>Ohjeet</button></Link>
      </div>
      <div className='my-10'>
        <Link to="/report"><button className='px-3 py-1 bg-primary-blue text-white rounded-lg hover:scale-110 transition ease-in-out duration-300 text-xl'>Keskeneräinen raportti</button></Link>
      </div>
    </div>
  )
}

export default Navigation