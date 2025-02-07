"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, {  useState } from 'react'


import {  motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'

import Search from '@/components/helper/Search';
import NotificationSidebar from '@/components/helper/Notification';
import ProfileContent from '@/components/Content/ProfileContent/ProfileContent';
import Create from '@/components/Create/Create';


type Props = {}

const Profile = (props: Props) => {


     const [active, setActive] = useState<number | null>(null);


     return (
          <div className=' md:flex  '>
               <div className=" w-[335px] fixed z-[99999] ">
                    <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: active === 1 || active === 5 ? "79px" : "280px" }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="hidden md:block  h-screen relative "

                    >
                         <SideBar active={active} setActive={setActive} />


                   <Search active={active} setActive={setActive}/>


                       <NotificationSidebar active={active} setActive={setActive}/>


                    </motion.div>
               </div>
               <div className=" fixed top-0 bg-black w-full block md:hidden z-[999999]">
                    <Header />
               </div>
               <div className=" w-full md:ml-[79px] xl:ml-[300px]  h-screen ">
                    <ProfileContent />
               </div>
               <div className=" fixed  bottom-0 bg-black w-full block md:hidden">
                    <HeaderDown />
                    
               </div>

               {
                    active === 6 && (
                   <div className="fixed  w-[100vw] h-[100vh] top-0 left-0">
                    <Create active={active} setActive={setActive}/>
                   </div>
                    )
               }

          </div>
     )
}

export default Profile