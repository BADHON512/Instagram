"use client"
import SideBar from '@/components/SideBar/SideBar'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import Header from '@/components/SideBar/Header'
import HeaderDown from '@/components/SideBar/ForMobile'
import Search from '@/components/helper/Search';
import NotificationSidebar from '@/components/helper/Notification';
import Create from '@/components/Create/Create';
import Loader from '@/components/Loader/Loader';
import { useParams } from 'next/navigation';
import SingleProfile from '@/components/Content/SingleProfile/SingleProfile';
import { GetSingleUser } from '@/@actions/user/GetSingleUser';
import { GetUser } from '@/@actions/user/getUser';


const Page = () => {
    const { id } = useParams()
    const [user, setUser] = useState<any>()
    const [currentUser, setCurrentUser] = useState<any>()
    const [loader, setLoader] = useState<any>()
    const [active, setActive] = useState<number | null>(null);
    useEffect(() => {
        if (!id) return
        const fetcher = async () => {
            try {
                const currentUser: any = await GetUser()
                setCurrentUser(currentUser.user)
                const userData: any = await GetSingleUser(id[0]);
                setUser(userData.user);
                setLoader(userData.statusCode)
            } catch (error) {
                console.error("Error fetching user:", error);

            }
        };

        fetcher();
    }, [])
    return (
        <div className=' md:flex  '>
            <div className=" w-[335px] fixed z-[99999] ">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: active === 1 || active === 5 ? "79px" : "280px" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="hidden md:block  h-screen relative "
                >
                    <SideBar active={active} setActive={setActive} currentUser={currentUser} />
                    <Search active={active} setActive={setActive} />
                    <NotificationSidebar active={active} setActive={setActive} />
                </motion.div>
            </div>
            <div className="fixed md:min-h-[60px] lg:h-0   top-0 bg-black w-full block md:hidden z-[999999]">
                <Header />
            </div>
            <div className="mt-[60px] lg:mt-0 w-full md:ml-[79px] xl:ml-[300px]  h-screen ">
                {
                    loader === 200 ? <SingleProfile user={user} /> : <Loader />
                }
            </div>
            <div className=" fixed  bottom-0 bg-black w-full block md:hidden">
                <HeaderDown active={active} setActive={setActive} currentUser={currentUser} />
            </div>
            {
                active === 6 && (
                    <div className="fixed  w-[100vw] h-[100vh] top-0 left-0 z-[5]">
                        <Create active={active} setActive={setActive} />
                    </div>
                )
            }

        </div>
    )
}

export default Page