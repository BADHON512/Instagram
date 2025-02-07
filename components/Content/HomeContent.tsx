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


const stories = [
  { id: 1, name: "sohel_hoss...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg" },
  { id: 2, name: "badhon mida_r...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" },
  { id: 3, name: "sirazul_monir", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg" },
  { id: 4, name: "raja_9090", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png" }, { id: 5, name: "md_rahat", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg" },
  { id: 6, name: "sirazul_monir", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854193/profile/285636603_10209475645083898_8206659727678614489_n_kw8sbk.jpg" },
  { id: 7, name: "raja_5050", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220822/profile/473018861_954030496668402_2945812169270431767_n_drmzvb.jpg" },
  { id: 8, name: "mr_faisu_07", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282239/samples/people/smiling-man.jpg" },
];

const SuggestedBy = [
  { id: 1, name: "sohel_hoss...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg" },
  { id: 2, name: "ahmmed_r...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" },
  { id: 3, name: "cristiano", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg" },
  { id: 4, name: "mr_faisu_07", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png" }, { id: 5, name: "mr_faisu_07", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg" },]
type Props = {}

const HomeContent = (props: Props) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState("");
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const allText = "You're very welcome! 🎉 I'm so glad to hear you had a wonderful birthday with your loved ones. Wishing you even more amazing moments ahead! 🥳🎂 How did you celebrate?"
  const word = allText.split(" ")
  const visibleText = isExpanded ? allText : word.slice(0, 20).join(" ") + "..."
  const handleChange = (event) => {
    setText(event.target.value);
    event.target.style.height = 'auto'; // Reset height to auto to calculate the new height
    event.target.style.height = `${event.target.scrollHeight}px`; // Set the height to scrollHeight
    setInput(event.target.value)
  };


  return (

    <div className="max-w-[1100px] mx-auto ">
      <div className="flex justify-center lg:justify-between">
        {/* leftSide */}
        <div className="bg-black min-h-screen text-white flex flex-col items-center">

          {/* Story Section */}
          <div className="flex space-x-4 overflow-x-auto p-4">
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

          <div className="w-[485px]  mx-auto my-3">
            <div className="flex justify-between w-full items-center ">
              <div className="flex gap-x-3 items-center">
                <Image src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png'} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' />

                <p className='flex items-center gap-x-1 font-semibold'>raja_5050 <span><MdVerified color='#0095F6' /></span> <span className='text-[30px] -mt-5'>.</span> <span className='text-gray-500'>15h</span></p>
              </div>
              <PiDotsThreeBold className='cursor-pointer ' size={20} />
            </div>

            <div className="w-full min-h-[20vh] border border-[#9e9a9a41] my-2 rounded-sm">
              <Image src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png'} height={1000} width={1000} alt='img not found' className='wf h-full rounded-sm' />
            </div>
            <div className="my-2 flex justify-between w-full items-center">
              <div className="flex items-center gap-x-2">
                <FaRegHeart title='Like' size={24} color='white' className="cursor-pointer" />
                <BiMessageRounded color='white' title='Comment' size={25} className="scale-x-[-1] cursor-pointer text-[#cacaca]" />
                <LuSend title='Share' size={23} className="cursor-pointer  " />
              </div>
              <FiBookmark title='Save' color='white' size={25} className="cursor-pointer  " />
            </div>

            <span className='text-sm text-gray-300 font-semibold block'>❤️ 10.032.119 likes</span>

            <span className='text-sm text-gray-300 font-semibold   gap-x-2 my-1'>raja_5050 <MdVerified color='#0095F6' className='inline-block -mt-1' /> {visibleText} {!isExpanded && <span className='cursor-pointer'
              onClick={() => setIsExpanded(!isExpanded)}> more</span>}</span>

            <div className="border-b border-[#928c8c71] flex w-full items-center relative
            ">
              <textarea value={input}
                onChange={(e) => handleChange(e)} name="" className='w-full bg-transparent outline-none  my-1 resize-none  e  h-auto overflow-hidden ' id="" placeholder='Add a comment...'></textarea>


            
            {
               input&&(
                <span className='text-[#33adff] hover:text-white cursor-pointer mr-3'>Post</span>
               )
            }
              <button className='grayscale-[100%] rounded-full'  onClick={() => setShowPicker(!showPicker)}><MdOutlineEmojiEmotions /></button>

              {showPicker && (
                <div className="absolute bottom-10  -right-[340px]">
                  <EmojiPicker
                    onEmojiClick={(emoji) => setInput((prev) => prev + emoji.emoji)}

                    theme='dark'
                    skinTonesDisabled
                  />
                </div>
              )}
            </div>
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