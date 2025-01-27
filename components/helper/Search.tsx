import { AnimatePresence,motion } from 'motion/react'
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx'

type Props = {
    active: number | null
    setActive: (active:number|null)=>void| null

}

const Search = ({active,setActive}: Props) => {
  return (
   
    <AnimatePresence>
    {(active === 1) && (
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
                   className="border-[#262626] border-r fixed left-16 top-0 bottom-0 h-full z-[99] p-5 bg-black "
              >
                   <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="ml-3"
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

  )
}

export default Search