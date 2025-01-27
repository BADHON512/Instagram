import React from 'react'
import { AnimatePresence, motion } from 'motion/react'



type Props = {
    active: number | null
    setActive: (active: number | null) => void | null

}


const NotificationSidebar  = ({ active, }: Props) => {
    return (
        <AnimatePresence>
            {(active === 5) && (
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
                        className="border-[#262626] border-r fixed left-16 top-0 bottom-0 h-full z-[99] p-5 bg-black"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="ml-3"
                        >
                            <h1 className="text-[30px]">Notification</h1>


                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default NotificationSidebar 