import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { FaRegPlusSquare } from 'react-icons/fa';
import { LuSend } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
active: number | null;
    setActive: (active: number | null) => void
    currentUser:any
}


function HeaderDown({ active,setActive,currentUser }: Props) {
    console.log(active)
    return (


        <div className="w-full   ">


            {/* downSide */}
            <div className="w-full flex justify-around p-3 border-t border-[#262626]  "><Link href={"/"}>
                <GoHomeFill size={30} className='cursor-pointer' />
            </Link>
                <Link href={"/explore"}>
                    <MdExplore size={30} className='cursor-pointer' />
                </Link>
                <Link href={"/reels"}>
                    <PiFilmReel size={30} className='cursor-pointer' />
                </Link>




                <FaRegPlusSquare onClick={() => {
                        console.log("📢 Button Clicked!"); 
                        setActive(6); // ✅ Active state আপডেট করো
                        console.log("🎯 Active State Updated:", 6)
                }} size={30} className='cursor-pointer' />
                <LuSend size={30} className='cursor-pointer' />
                <Link href={"/profile-page"}>
                    <Image src={currentUser?.avatar?.url||"https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"} height={500} width={500} className='h-[30px] w-[30px] rounded-full object-cover' alt="" /></Link>
            </div>
        </div>

    )
}

export default HeaderDown