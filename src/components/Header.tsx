import React from 'react'

export default function Header() {
  return (
    <div className='w-screen h-16 text-orange-600 mb-2 flex justify-center items-center gap-1.5'>
      <img 
      src='/logo.png'
      alt='logo'
      className='h-1/2'
      />
        <h1 className='font-bold font-dm text-2xl'>Alpran Softwares</h1>
    </div>
  )
}
