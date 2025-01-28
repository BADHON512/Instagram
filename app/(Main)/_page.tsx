"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, { useState } from 'react'

import HomeContent from '@/components/Content/HomeContent'
import { motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'

import Search from '@/components/helper/Search';
import NotificationSidebar from '@/components/helper/Notification';


type Props = {}

const Home = (props: Props) => {


     const [active, setActive] = useState<number | null>(null);


     return (
          <div className='md:flex '>
               <div className=" w-[335px] fixed">
                    <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: active === 1 || active === 5 ? "79px" : "280px" }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="hidden md:block  h-screen relative "

                    >
                         <SideBar active={active} setActive={setActive} />



                         <Search active={active} setActive={setActive} />

                         <NotificationSidebar active={active} setActive={setActive} />




                    </motion.div>
               </div>
               <div className=" sticky top-0 bg-black w-full block md:hidden">
                    <Header />
               </div>
               <div className="w-full h-screen ml-[335px] ">
                    <HomeContent />
               </div>
               <div className=" sticky bottom-0 bg-black w-full block md:hidden">
                    <HeaderDown />
               </div>

          </div>
     )
}

export default Home