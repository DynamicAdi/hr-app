import React from 'react'

function Wrapper({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-col justify-start items-center px-4 w-screen h-screen gap-4 mb-16'>
        {children}
    </div>
  )
}

export default Wrapper