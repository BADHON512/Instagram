"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, { use, useEffect, useState } from 'react'


import { motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'

import Search from '@/components/helper/Search';
import Messages from '@/components/helper/Messages';
import NotificationSidebar from '@/components/helper/Notification';
import Create from '@/components/Create/Create';

import { useParams } from 'next/navigation';
import MessageBodyById from '@/components/Content/MessageHome/MessageBodyById';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader/Loader';
import { GetSingleMessage } from '@/@actions/Message/GetSingleMessage';
import { GetUser } from '@/@actions/user/getUser';
import { GetFollower } from '@/@actions/Follow/getFollower';

const Page = () => {
     const [active, setActive] = useState<number | null>(4);
     const [user, setUser] = useState<any>()
     const [LoginUser, setLoginUser] = useState()
     const [followers, setFollowers] = useState()
console.log(LoginUser)
     const [loader, setLoader] = useState<any>()
     const { id } = useParams()
  useEffect(() => {
     if (!id) {
          toast.error("Something went wrong");
          return;
     }

     const fetchData = async () => {
          try {
               // দুইটা API কল একসাথে চালানো
               const [userData, currentUser,Follower] = await Promise.all([
                    GetSingleMessage(id[0]),
                    GetUser(),
                GetFollower()
               ]);

               setUser(userData.user);
               setLoginUser(currentUser?.user);
               setFollowers(Follower?.follower?.followers)

               // statusCode যোগ করা
               setLoader(userData.statusCode + currentUser?.statusCode);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     fetchData();
}, []);




     return (
          <div className='md:flex '>
               <div className=" w-[335px] fixed z-[99999]">
                    <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: active === 1 || active === 4 ? "79px" : "280px" }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="hidden md:block  h-screen relative "

                    >
                         <SideBar active={active} setActive={setActive} currentUser={LoginUser} />



                         <div className="bg-black">
                              <Search active={active} setActive={setActive} />
                         </div>


                         <NotificationSidebar active={active} setActive={setActive} />





                    </motion.div>
               </div>
               <div className=" fixed md:min-h-[60px] lg:h-0  z-[9999] top-0 bg-black w-full block md:hidden">
                    <Header />
               </div>
               <div className="mt-[60px]  md:mt-0 w-full md:ml-[79px]  h-screen  ">

                    {loader === 400 ? <MessageBodyById user={user} LoginUser={LoginUser}  followers={followers}/> : <Loader />}
               </div>
               <div className="fixed bottom-0 bg-black w-full block md:hidden">
                    <HeaderDown active={active} setActive={setActive} currentUser={LoginUser} />
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

export default Page