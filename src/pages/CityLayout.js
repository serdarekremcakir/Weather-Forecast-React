import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const CityLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='bg-gray-800 text-white h-12 px-2 flex items-center justify-between'>
        <button onClick={() => navigate('/')} className='border border-white py-1 rounded-2xl px-4 hover:bg-cyan-900 hover:text-white  transition-all'>

          <span className='lg:inline hidden'>Geri Dön</span>
          <span className='lg:hidden inline'> X </span>
        </button>

        <span className='font-bold text-xl underline '>SEC | Weather</span>

        <span className='text-sm italic font-thin'>v0.1</span>
      </div>

      <Outlet />

    </>
  )
}

export default CityLayout