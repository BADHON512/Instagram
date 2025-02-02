import React from 'react'
import {  GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { FaRegPlusSquare } from 'react-icons/fa';
import { LuSend } from 'react-icons/lu';
import Image from 'next/image';
type Props = {}

function HeaderDown({ }: Props) {
    return (
   
    
            <div className="w-full   ">
          

                {/* downSide */}
                <div className="w-full flex justify-around p-3 border-t border-[#262626]  ">
                  <GoHomeFill size={30} className='cursor-pointer'/>
                  <MdExplore size={30} className='cursor-pointer'/>
                  <PiFilmReel size={30} className='cursor-pointer'/>
                  <FaRegPlusSquare size={30} className='cursor-pointer'/>
                  <LuSend size={30} className='cursor-pointer'/>
                    <Image src="https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" height={500} width={500} className='h-[30px] w-[30px] rounded-full' alt="" />
                </div>
            </div>
        
    )
}

export default HeaderDown