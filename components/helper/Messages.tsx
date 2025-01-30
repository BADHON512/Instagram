import { AnimatePresence,motion } from 'motion/react'
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx'

type Props = {
    active: number | null
    setActive: (active:number|null)=>void| null

}

const Messages = ({active,setActive}: Props) => {
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
                        <h1 className="text-[30px]">Search</h1>

                
                   </motion.div>
              </motion.div>
         </motion.div>
    )}
</AnimatePresence>

  )
}

export default Messages