"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, { useState } from 'react'
import HomeContent from '@/components/Content/HomeContent'
import { AnimatePresence, motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'
import { IoSearchOutline } from 'react-icons/io5';
import { RxCrossCircled } from "react-icons/rx";


type Props = {}

const Home = (props: Props) => {
     const [active, setActive] = useState<number | null>(null);


     return (
          <div className='md:flex '>
               <div className=" w-[335px] ">
                    <motion.div
                         initial={{ width: 0 }}
                         animate={{ width: active === 1 || active === 5 ? "79px" : "280px" }}
                         transition={{ duration: 0.5, ease: "easeInOut" }}
                         className="hidden md:block  h-screen relative "

                    >
                         <SideBar active={active} setActive={setActive} />

                           <div   className=" absolute w-[100vw] h-full bg-[unset] top-0 left-0 z-[2] bg-red-600" onClick={
                              () => setActive(null)
                           }></div>
                         {

                              <AnimatePresence>
                                   {(active === 1 || active === 5) && (
                                        <motion.div
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                             exit={{ opacity: 0 }}
                                             transition={{ duration: 0.5 }}
                                             className="absolute w-[405px] h-full bg-[unset] top-0 left-0  bg-black"
                                        >
                                             <motion.div
                                                  initial={{ width: "0px" }}
                                                  animate={{ width: "405px" }}
                                                  exit={{ width: "0px" }}
                                                  transition={{ duration: 0.5 }}
                                                  className="border-[#262626] border-r fixed left-16 top-0 bottom-0 h-full z-[99] p-5"
                                             >
                                                  <motion.div
                                                       initial={{ opacity: 0, y: -20 }}
                                                       animate={{ opacity: 1, y: 0 }}
                                                       exit={{ opacity: 0, y: -20 }}
                                                       transition={{ duration: 0.5, ease: "easeInOut" }}
                                                       className=""
                                                  >
                                                       <h1 className="text-[30px]">Search</h1>

                                                       <div className="relative w-full max-w-sm mt-7">
                                                            <input
                                                                 type="text"
                                                                 placeholder="Search"
                                                                 className="w-full pl-10 pr-4 py-[8px] rounded-lg border bg-[#363636] focus:outline-none outline-none border-none "
                                                            />
                                                            <IoSearchOutline
                                                                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                                 size={20}
                                                            />
                                                            <RxCrossCircled
                                                                 className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-400"
                                                                 size={20}
                                                                 onClick={() => setActive(null)} // Clear the active state
                                                            />
                                                       </div>
                                                  </motion.div>
                                             </motion.div>
                                        </motion.div>
                                   )}
                              </AnimatePresence>

                         }

                    </motion.div>
               </div>
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