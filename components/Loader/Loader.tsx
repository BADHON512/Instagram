import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='flex h-screen w-full justify-center items-center'>
        <div className="loader"></div>
    </div>
  )
}

export default Loader