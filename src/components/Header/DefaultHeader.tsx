import React from 'react'

const DefaultHeader = () => {
  return (
    <div className='flex items-center justify-between bg-emerald-700 px-3 py-3'>
      <h2 className='text-white text-2xl font-semibold cursor-pointer'>
        FroschBoardgame
      </h2>
      <div className='flex items-center justify-center gap-4'>
        <a className='text-sm text-white hover:underline' href="./">Log in</a>
        <a className='text-sm text-white hover:underline' href="./signup">Sign up</a>
      </div>
    </div>
  )
}

export default DefaultHeader
