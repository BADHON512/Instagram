"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, { useState } from 'react'
import HomeContent from '@/components/Content/HomeContent'
import { motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'

type Props = {}

const Home = (props: Props) => {
     const [active, setActive] = useState<number | null>(null);


     return (
          <div className='md:flex '>
               <motion.div
                    initial={{ width: "0" }}
                    animate={{ width: active === 1 ? "79px" : "280px" }}
                    transition={{ duration: 0.5 }}
                    className='hidden md:block w-[79px] xl:w-[280px] h-screen relative'>
                    <SideBar active={active} setActive={setActive} />

                    <div className={`${(active === 1 || active === 5) ? "absolute w-[100vw] h-full bg-[unset] top-0 left-0 " : ""}  `}
                         onClick={() => setActive(null)}>
                         <motion.div
                              initial={{ width: "0" }}
                              animate={{ width: active === 1 ? "405px" : '0' }}
                              transition={{ duration: 0.5 }}
                              className={`${(active === 1 || active === 5) ? "border-[#262626] border-r" : ""} absolute left-16 top-0 bottom-0 h-full `}>

                         </motion.div>
                    </div>

               </motion.div>
               <div className=" sticky top-0 bg-black w-full block md:hidden">
                    <Header />
               </div>
               <div className="w-full h-screen ">
                    <HomeContent />
               </div>
               <div className=" sticky bottom-0 bg-black w-full block md:hidden">
                    <HeaderDown />
               </div>

          </div>
     )
}

export default Home