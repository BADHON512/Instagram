import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image';
import React from 'react'
import { FaRegEdit } from "react-icons/fa";


type Props = {
     active: number | null
     setActive: (active: number | null) => void | null

}

const Messages = ({ active, setActive }: Props) => {
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
                                        <h1 className='font-semibold text-[19px]'>badhon_9090</h1>
                                        <FaRegEdit size={27} className='cursor-pointer' />
                                   </div>

                                   <div className="mt-10 flex flex-col w-[70px] items-center">

                                        <Image
                                             src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png'}
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


                                   <div className="mt-5 flex gap-x-3 items-center hover:bg-[#cfb8b817] p-1 cursor-pointer">

                                        <Image
                                             src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png'}
                                             alt='img not found'
                                             height={1000}
                                             width={1000}
                                             className='h-[50px] w-[50px] rounded-full '
                                        />
                                        <div className="text-sm">
                                             <p>Raja</p>
                                             <p className='text-gray-400 text-[12px]'>Active 1m ago</p>
                                        </div>
                                   </div>

                                   <div className="mt-5 flex gap-x-3 items-center hover:bg-[#cfb8b817] p-1 cursor-pointer">

                                        <Image
                                             src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg'}
                                             alt='img not found'
                                             height={1000}
                                             width={1000}
                                             className='h-[50px] w-[50px] rounded-full object-cover object-center'
                                        />
                                        <div className="text-sm">
                                             <p>Sirazul monir</p>
                                             <p className='text-gray-400 text-[12px]'>you: kakka upni akhon kothai Active 2h ago</p>
                                        </div>
                                   </div>

                                   <div className="mt-5 flex gap-x-3 items-center hover:bg-[#cfb8b817] p-1 cursor-pointer">

                                        <Image
                                             src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1738331986/profile/415495503_374353825139621_6742367646166593496_n_y9ubj3.jpg'}
                                             alt='img not found'
                                             height={1000}
                                             width={1000}
                                             className='h-[50px] w-[50px] rounded-full object-cover object-center'
                                        />
                                        <div className="text-sm">
                                             <p>Abdul khalek</p>
                                             <p className='text-gray-400 text-[12px]'>ami akhon barit te Active 2h ago</p>
                                        </div>
                                   </div>

                                   <div className="mt-5 flex gap-x-3 items-center hover:bg-[#cfb8b817] p-1 rounded-md cursor-pointer">

                                        <Image
                                             src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220822/profile/473018861_954030496668402_2945812169270431767_n_drmzvb.jpg'}
                                             alt='img not found'
                                             height={1000}
                                             width={1000}
                                             className='h-[50px] w-[50px] rounded-full '
                                        />
                                        <div className="text-sm">
                                             <p>Muhammad raja</p>
                                             <p className='text-gray-400 text-[12px]'>Active 2h ago</p>
                                        </div>
                                   </div>



                              </motion.div>
                         </motion.div>
                    </motion.div>
               )}
          </AnimatePresence>

     )
}

export default Messages