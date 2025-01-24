"use client"
import SideBar from '@/components/SideBar/SideBar'
import React from 'react'
import HomeContent from '@/components/Content/HomeContent'

type Props = {}

const Home = (props: Props) => {

  return (
    <div className='flex '>
        <div className='w-[279px] border-r border-[#262626] h-screen'>
        <SideBar/>

        </div>
        <div className="w-full h-screen">
             <HomeContent/>
        </div>
    </div>
  )
}

export default Home