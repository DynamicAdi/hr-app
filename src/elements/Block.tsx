import React from 'react'

function Block() {
  return (
    <div className='w-full py-10 relative rounded-2xl flex justify-center items-center'>
        <img src="https://picsum.photos/1080/1080" alt="welcome code" className='w-full absolute inset-0 h-full object-cover brightness-75  rounded-2xl' />
        <div className="relative z-50">
        <h1 className='text-white font-dm text-2xl font-bold text-center'>Find your dream Job</h1>
        <p className='text-gray-100 text-sm font-normal '>Discover opportunities that match your skills</p>
        </div>
    </div>
  )
}

export default Block