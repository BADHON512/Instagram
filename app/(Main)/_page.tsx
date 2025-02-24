"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, { useState } from 'react'

import HomeContent from '@/components/Content/HomeContent'
import { motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'

import Search from '@/components/helper/Search';
import NotificationSidebar from '@/components/helper/Notification';
import Create from '@/components/Create/Create';


type Props = {
     user:any
     Posts:any
     users:any
     stories:any
}



const Home = ({user,Posts,users,stories}:Props) => {


     const [active, setActive] = useState<number | null>(null);
     

     return (
          <div className='md:flex '>
               <div className=" w-[335px] fixed z-[999] ">
                    <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: active === 1 || active === 5 ? "79px" : "280px" }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="hidden md:block  h-screen relative "

                    >
                         <SideBar active={active} setActive={setActive} />



                         <div className="bg-black">
                              <Search active={active} setActive={setActive} />
                         </div>


                         <NotificationSidebar active={active} setActive={setActive} />





                    </motion.div>
               </div>
               <div className=" fixed md:min-h-[60px] lg:h-0  z-[9999] top-0 right-0 bg-black w-full md:hidden">
                    <Header />
               </div>
               <div className="mt-[60px] lg:mt-0 w-full ml-0 md:ml-[79px] xl:ml-[300px]  h-screen  ">
                    <HomeContent user={user} Posts={Posts} users={users} stories={stories}/>

               </div>
               <div className=" fixed bottom-0 bg-black w-full block md:hidden">
                    <HeaderDown active={active} setActive={setActive}  />
               </div>

               {
                    active === 6 && (
                         <div className="fixed  w-[100vw] h-[100vh] top-0 left-0">
                              <Create active={active} setActive={setActive} />
                         </div>
                    )
               }

          </div>
     )
}

export default Home