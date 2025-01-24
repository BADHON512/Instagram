"use client"
import SideBar from '@/components/SideBar/SideBar'
import React from 'react'
import HomeContent from '@/components/Content/HomeContent'
import ForMobile from '@/components/SideBar/ForMobile'

type Props = {}

const Home = (props: Props) => {

  return (
    <div className='md:flex '>
        <div className='hidden md:block w-[79px] xl:w-[280px] h-screen'>
        <SideBar/>

        </div>
        <div className="fixed top-0 left-0 z-20 w-full block md:hidden">
              < ForMobile/>
        </div>
        <div className="w-full h-screen mt-20">
             <HomeContent/>
        </div>
    </div>
  )
}

export default Home