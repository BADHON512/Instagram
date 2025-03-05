"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, { useEffect, useState } from 'react'


import { motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'

import Search from '@/components/helper/Search';
import Messages from '@/components/helper/Messages';
import NotificationSidebar from '@/components/helper/Notification';
import Create from '@/components/Create/Create';
import MessageHomeBody from '@/components/Content/MessageHome/MessageHome';


type Props = {
     currentUser: any
     follower:any
}

const MessagesHome = ({currentUser ,follower}: Props) => {

    
     const [active, setActive] = useState<number | null>(4);
     console.log(active)
     const [uniqueUser, setUniqueUser] = useState<string>();
     const [UserToMessage, setUserToMessage] = useState()
     const [TargetUser, setTargetUser] = useState<string>()
     console.log(follower)

     useEffect(() => {
          
       const user= follower?.find((item:any,index:number)=>item?.id===uniqueUser)
       console.log(user)
       setUserToMessage(user?.follower)
       setTargetUser(uniqueUser)
       setActive(null)
     }, [uniqueUser])
     

     return (
          <div className='md:flex '>
               <div className="  fixed z-50 bg-yellow-300 ">
                    <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: active === 1 || active === 4 ? "79px" : "79px" }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="hidden md:block  h-screen relative "

                    >
                         <SideBar active={active} setActive={setActive}  currentUser={currentUser}/>



                         <div className="bg-black">
                              <Search active={active} setActive={setActive} />
                         </div>


                         <NotificationSidebar active={active} setActive={setActive} />

                         <Messages active={active} setActive={setActive} follower={follower} currentUser={currentUser} setUniqueUser={setUniqueUser} setTargetUser={setTargetUser}/>



                    </motion.div>
               </div>
               <div className=" fixed md:min-h-[60px] lg:h-0  z-[9999] top-0 bg-black w-full block md:hidden">
                    <Header />
               </div>
               <div className="mt-[60px] md:mt-0 w-full md:ml-[79px] lg:ml-[280px]  h-screen  ">
                <MessageHomeBody TargetUser={TargetUser} UserToMessage={UserToMessage} currentUser={currentUser} />

               </div>
               <div className="fixed bottom-0 bg-black w-full block md:hidden z-[99999]">
               <HeaderDown active={active} setActive={setActive}  currentUser={currentUser} />
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

export default MessagesHome