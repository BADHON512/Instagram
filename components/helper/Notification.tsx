import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'



type Props = {
    active: number | null
    setActive: (active: number | null) => void | null

}


const NotificationSidebar = ({ active, }: Props) => {
    return (
        <AnimatePresence>
            {(active === 5) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-[405px] h-full bg-[unset] top-0 left-0  bg-black "
                >
                    <motion.div
                        initial={{ width: "0px" }}
                        animate={{ width: "405px" }}
                        exit={{ width: "0px" }}
                        transition={{ duration: 0.5 }}
                        className="border-[#262626] border-x fixed left-20 top-0 bottom-0 h-full z-[99]  bg-black"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className=""
                        >
                            <h1 className="text-[30px] p-3">Notification</h1>


                            <div className="mt-5 border-t border-[#262626] w-full p-4 ">
                                <h1 className='font-semibold'>Today</h1>

                                <div className="mt-3 flex justify-between w-full items-center  ">
                                    <div className="flex gap-4 items-center">
                                        <Image src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png'} alt='img not found' height={500} width={500} className='w-[40px] h-[40px] rounded-full o' />

                                        <div className="">
                                            <h1 className='font-semibold text-[13px]'>raja2021year started</h1>
                                            <p className='text-[12px]'> following you 10h</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.1, ease: "easeInOut" }}
                                        className="px-5 text-sm font-semibold h-[30px] bg-[#ccc9c985] rounded-lg hover:bg-[#262626]"
                                    >
                                        Following
                                    </motion.button>
                                </div>
                            </div>


                            <div className="mt-5 border-t border-[#262626] w-full p-4 ">
                                <h1 className='font-semibold'>This week</h1>

                                <div className="mt-3 flex justify-between w-full items-center  ">
                                    <div className="flex gap-4 items-center">
                                        <Image src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png'} alt='img not found' height={500} width={500} className='w-[40px] h-[40px] rounded-full o' />

                                        <div className="">
                                            <h1 className='font-semibold text-[13px]'>
                                                mohammadullah652</h1>
                                            <p className='text-[12px]'> following you 10h</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.1, ease: "easeInOut" }}
                                        className="px-5 text-sm font-semibold h-[30px] bg-[#ccc9c985] rounded-lg hover:bg-[#262626]"
                                    >
                                        Following
                                    </motion.button>
                                </div>
                            </div>



                            <div className="mt-5 border-t border-[#262626] w-full p-4 ">
                                <h1 className='font-semibold'>Earlier</h1>

                                <div className="mt-3 flex justify-between w-full items-center  ">
                                    <div className="flex gap-4 items-center">
                                        <Image src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg'} alt='img not found' height={500} width={500} className='w-[40px] h-[40px] rounded-full o' />

                                        <div className="">
                                            <h1 className='font-semibold text-[13px]'>raja2021year started</h1>
                                            <p className='text-[12px]'> following you 10h</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.1, ease: "easeInOut" }}
                                        className="px-5 text-sm font-semibold h-[30px] bg-[#ccc9c985] rounded-lg hover:bg-[#262626]"
                                    >
                                        Following
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default NotificationSidebar 