import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image';
import { format } from 'timeago.js';
import React from 'react'
import { FaRegEdit } from "react-icons/fa";


type Props = {
     active: number | null
     setActive: (active: number | null) => void | null
     follower: any
     currentUser: any
     setUniqueUser:(uniqueUser:string)=>void

}

const Messages = ({ active, setActive,setUniqueUser, follower, currentUser }: Props) => {
     console.log(follower)
     return (

          <AnimatePresence>
               {(active === 4) && (
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.5 }}
                         className="absolute w-[405px] h-full  top-0 left-0  bg-black"
                    >
                         <motion.div
                              initial={{ width: "0px" }}
                              animate={{ width: "405px" }}
                              exit={{ width: "0px" }}
                              transition={{ duration: 0.5 }}
                              className="border-[#262626] border-x fixed left-20 top-0 bottom-0 h-full z-[99999] p-5 bg-black "
                         >
                              <motion.div
                                   initial={{ opacity: 0, y: -20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -20 }}
                                   transition={{ duration: 0.5, ease: "easeInOut" }}
                                   className="ml-3"
                              >
                                   <div className="mt-5 w-full flex justify-between items-center">
                                        <h1 className='font-semibold text-[19px]'>{currentUser?.name}</h1>
                                        <FaRegEdit size={27} className='cursor-pointer' />
                                   </div>

                                   <div className="mt-10 flex flex-col w-[70px] items-center">

                                        <Image
                                             src={currentUser?.avatar?.url || "https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"}
                                             alt='img not found'
                                             height={1000}
                                             width={1000}
                                             className='h-[70px] w-[70px] rounded-full border-[3px] border-[#868484d8]'
                                        />
                                        <p className='text-gray-400 text-[12px] '>Your note</p>
                                   </div>

                                   <div className="mt-7 flex justify-between items-center ">
                                        <h1 className='font-semibold'>Messages</h1>
                                        <h1 className='text-gray-400 text-sm'>Requests</h1>
                                   </div>

                                   {
                                     follower.length===0?(<div className='h-[40vh] w-full flex justify-center items-center'>You have no followers yet </div>):(
                                        follower.map((item:any, index:any) => (

                                             <div onClick={()=>setUniqueUser(item.id)} key={index} className="mt-5 flex gap-x-3 items-center hover:bg-[#cfb8b817] p-1 cursor-pointer">

                                                  <Image
                                                       src={item?.followee?.avatar?.url || 'https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png'}
                                                       alt='img not found'
                                                       height={1000}
                                                       width={1000}
                                                       className='h-[50px] w-[50px] rounded-full '
                                                  />
                                                  <div className="text-sm">
                                                       <p>{item?.followee?.name}</p>
                                                       <p className='text-gray-400 text-[12px]'>{format(item.createdAt
                                                       )}</p>
                                                  </div>
                                             </div>
                                        ))
                                     )
                                   }



                              </motion.div>
                         </motion.div>
                    </motion.div>
               )}
          </AnimatePresence>

     )
}

export default Messages