import { SearchUsers } from '@/@actions/SearchAllUser/searchAllUser'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx'

type Props = {
     active: number | null
     setActive: (active: number | null) => void | null

}

const Search = ({ active, setActive }: Props) => {
     const [query, setQuery] = useState<string>()
     const [users, setUsers] = useState<[]>()
     
     useEffect(() => {
          const QueryUserFetchers = async () => {
               if (!query) return
               const users:any = await SearchUsers(query)
               setUsers(users?.users)                  
          }
          QueryUserFetchers()
     }, [query])

     return (

          <AnimatePresence>
               {(active === 1) && (
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.5 }}
                         className="absolute w-[405px] h-full z-[99999]  top-0 left-0  bg-black"
                    >
                         <motion.div
                              initial={{ width: "0px" }}
                              animate={{ width: "405px" }}
                              exit={{ width: "0px" }}
                              transition={{ duration: 0.5 }}
                              className="border-[#262626] border-r fixed left-16 top-0 bottom-0 h-full z-[99999]  bg-black "
                         >
                              <motion.div
                                   initial={{ opacity: 0, y: -20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -20 }}
                                   transition={{ duration: 0.5, ease: "easeInOut" }}
                                   className="ml-3"
                              >
                                   <div className="p-5">
                                        <h1 className="text-[30px]">Search</h1>

                                        <div className="relative w-full max-w-sm mt-7">
                                             <input
                                                  type="text"
                                                  value={query}
                                                  onChange={(e) => setQuery(e.target.value)}
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
                                   </div>
                                   <div className=" border-t border-[#7e7a7a83] my-3" />
                                   <div className="px-5">
                                        <h1 className=" text-gray-400">Recent</h1>
                                   </div>
                                   {users?.length === 0 ? (<div className="h-[60vh] w-full flex items-center justify-center">
                                        <h1 className='text-gray-400'>No search here</h1>
                                   </div>) : (<div className="p-5 flex flex-col gap-y-4 " >
                                        {
                                             users?.map((item: any, index: number) => (

                                                  <Link href={`/profile/${item?.username}`} key={index} className="flex justify-between items-center  gap-x-12">
                                                       <div className="flex items-center w-full">
                                                            <Image src={item?.avatar?.url} height={500} width={500} alt='img not found' className='w-[50px] h-[50px] rounded-full object-cover'  />
                                                            <div className="ml-3">
                                                                 <Link href={`/profile/${item?.username}`} className="text-sm font-semibold cursor-pointer">{item?.name}</Link>
                                                               <div className="flex gap-x-1 items-center">
                                                               <p className="text-sm text-gray-400 font-semibold">{item?.username}</p><span className='font-extrabold -mt-[5px]'>.</span>
                                                               <p className="text-xs text-gray-400 font-semibold">{item?.followers?.length}  Followers</p>
                                                               </div>
                                                            </div>
                                                       </div>


                                                       

                                                  </Link>

                                             ))
                                        }

                                   </div>)
                                   }

                              </motion.div>
                         </motion.div>
                    </motion.div>
               )}
          </AnimatePresence>

     )
}

export default Search