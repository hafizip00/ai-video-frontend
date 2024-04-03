import React from 'react'

const Loading = () => {
  return (
    <div className='fixed w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center text-white'>
      <p className='text-xl'>Generating...//</p>
      <img src="https://superstorefinder.net/support/wp-content/uploads/2018/01/green_style.gif" alt="Loading..." className='h-[25px] w-[25px]' />
    </div>
  )
}

export default Loading