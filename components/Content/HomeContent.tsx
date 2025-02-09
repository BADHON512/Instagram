"use client"
import { motion } from 'motion/react';
import Image from 'next/image';
import { MdOutlineEmojiEmotions, MdVerified } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";

import React, { useState } from 'react'
import { BiMessageRounded } from 'react-icons/bi';

import { FiBookmark, } from 'react-icons/fi';
import { LuSend } from 'react-icons/lu';
import { FaRegHeart } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import PostCard from '../helper/PostCard';


const stories = [
  { id: 1, name: "sohel_hoss...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg" },
  { id: 2, name: "badhon ", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" },
  { id: 3, name: "sirazul_monir", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg" },
  { id: 4, name: "raja_9090", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png" }, { id: 5, name: "md_rahat", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg" },
  { id: 6, name: "sirazul_monir", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854193/profile/285636603_10209475645083898_8206659727678614489_n_kw8sbk.jpg" },
  { id: 7, name: "raja_5050", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220822/profile/473018861_954030496668402_2945812169270431767_n_drmzvb.jpg" },
  { id: 8, name: "mr_faisu_07", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282239/samples/people/smiling-man.jpg" },
];

const Posts = [
  { name: "sohel_hoss...", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg" },
  { name: "badhon .", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" },
  { name: "sirazul_monir", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg" },
  { name: "raja_9090", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png" },
  { name: "md_rahat", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg" },
  { name: "sirazul_monir", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854193/profile/285636603_10209475645083898_8206659727678614489_n_kw8sbk.jpg", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854193/profile/285636603_10209475645083898_8206659727678614489_n_kw8sbk.jpg" },
  { name: "raja_5050", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220822/profile/473018861_954030496668402_2945812169270431767_n_drmzvb.jpg", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220822/profile/473018861_954030496668402_2945812169270431767_n_drmzvb.jpg" },
  { name: "mr_faisu_07", avatar: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282239/samples/people/smiling-man.jpg", image: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282239/samples/people/smiling-man.jpg" },
];



const SuggestedBy = [
  { id: 1, name: "sohel_hoss...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg" },
  { id: 2, name: "ahmmed_r...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" },
  { id: 3, name: "cristiano", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg" },
  { id: 4, name: "mr_faisu_07", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png" }, { id: 5, name: "mr_faisu_07", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg" },]
type Props = {}

const HomeContent = (props: Props) => {
  const [selectedStory, setSelectedStory] = useState(null);





  return (

    <div className=" w-[90%] md:w-[1100px] mx-auto ">
      <div className="flex justify-center  lg:justify-between">
        {/* leftSide */}
        <div className="w-[80%] md:w-[60%] bg-black min-h-screen text-white flex flex-col items-center">

          {/* Story Section */}
          <div className="flex space-x-4 overflow-x-scroll w-[60%] md:w-full scrollNone p-4">
            {stories.map((story) => (
              <div className="" key={story.id}>
                <motion.div
                  key={story.id}
                  className="relative w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedStory(story.img)}
                >
                  <Image height={500} width={500} src={story.img} alt={story.name} className="w-full h-full object-cover" />

                </motion.div>
                <div className="text-white text-xs text-center py-1">
                  {story.name.length >= 8 ? story.name.slice(0, 8) + '...' : story.name}
                </div>
              </div>
            ))}



          </div>

          {/* Story Preview Animation */}
          {selectedStory && (
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStory(null)}
            >
              <motion.img
                src={selectedStory}
                className="w-3/5 h-auto rounded-lg"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
              />
            </motion.div>
          )}

          <div className=" ">

            {
              Posts.map((item, index) => (
                <PostCard key={index} post={item} />
              ))
            }

          </div>
        </div>


        {/* rightSide */}
        <div className="  max-w-[480px] mx-auto mt-10 hidden lg:block">

          <div className="flex justify-between items-center  gap-x-12">
            <div className="flex items-center w-full">
              <Image src={"https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg"} height={500} width={500} alt='img not found' className='w-[60px] h-[60px] rounded-full' />
              <div className="ml-3">
                <p className="text-sm font-semibold">badhon_9090</p>
                <p className="text-xs text-gray-500">Muhammad badhon</p>
              </div>
            </div>
            <span className='text-[#33adff] hover:text-white cursor-pointer text-sm '>Switch</span>
          </div>

          <div className="my-8 flex justify-between items-center">

            <p className=" text-gray-500">Suggested for you</p>

            <p className='text-sm'>See All</p>
          </div>

          <div className="space-y-3" >
            {
              SuggestedBy.map((item, index) => (

                <div key={index} className="flex justify-between items-center  gap-x-12">
                  <div className="flex items-center w-full">
                    <Image src={item.img} height={500} width={500} alt='img not found' className='w-[50px] h-[50px] rounded-full' />
                    <div className="ml-3">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">Muhammad badhon</p>
                    </div>
                  </div>
                  <span className='text-[#33adff] hover:text-white cursor-pointer text-sm '>Switch</span>
                </div>

              ))
            }

          </div>

          <div className=" pt-4 mt-8 w-[300px]">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span>About</span>
              <span>Help</span>
              <span>Press</span>
              <span>API</span>
              <span>Jobs</span>
              <span>Privacy</span>
              <span>Terms</span>
              <span>Locations</span>
              <span>Language</span>
              <span className="text-blue-500">Meta Verified</span>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              2025 INSTAGRAM FROM META
            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default HomeContent