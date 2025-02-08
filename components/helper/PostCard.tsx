"use client"
import { motion } from 'motion/react';
import Image from 'next/image';
import { MdOutlineEmojiEmotions, MdVerified } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";

import React, { useState } from 'react'
import { BiMessageRounded } from 'react-icons/bi';

import { FiBookmark, } from 'react-icons/fi';
import { LuSend } from 'react-icons/lu';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

type Props = {
    post: any
}

const PostCard = ({ post }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState("");
    const [input, setInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);

    const allText = "You're very welcome! 🎉 I'm so glad to hear you had a wonderful birthday with your loved ones. Wishing you even more amazing moments ahead! 🥳🎂 How did you celebrate?"
    const word = allText.split(" ")
    const visibleText = isExpanded ? allText : word.slice(0, 20).join(" ") + "..."

    const [PupUp, setPupUp] = useState({
        like: false,
        likeCount: 10032119,
        message: false,
        share: false,
        save: false
    })

    const handelLike = () => {
        setPupUp((prev) => ({ ...prev, like: !prev.like, likeCount: prev.like ? prev.likeCount + 1 : prev.likeCount - 1 }))
    }
    const handleChange = (event) => {



        setText(event.target.value);
        event.target.style.height = 'auto'; // Reset height to auto to calculate the new height
        event.target.style.height = `${event.target.scrollHeight}px`; // Set the height to scrollHeight
        setInput(event.target.value)
    };
    return (
        <div className="w-[485px]  mx-auto my-3">
            <div className="flex justify-between w-full items-center ">
                <div className="flex gap-x-3 items-center">
                    <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' />

                    <p className='flex items-center gap-x-1 font-semibold'>{post.name} <span><MdVerified color='#0095F6' /></span> <span className='text-[30px] -mt-5'>.</span> <span className='text-gray-500'>{Math.floor(Math.random() * 24) + 1}h</span></p>
                </div>
                <PiDotsThreeBold className='cursor-pointer ' size={20} />
            </div>

            <div className="w-full min-h-[20vh] border border-[#9e9a9a41] my-2 rounded-sm">
                <Image src={post.image} height={1000} width={1000} alt='img not found' className='wf h-full rounded-sm' />
            </div>
            <div className="my-2 flex justify-between w-full items-center">
                <div className="flex items-center gap-x-2">
                    <motion.div
                        whileTap={{ scale: 0.8 }} // Adds a small pop effect
                        animate={{ scale: PupUp.like ? 1.2 : 1 }} // Increases size slightly when liked
                        transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth animation
                        className="" onClick={handelLike}>
                        {PupUp.like ? (<FaHeart title='Like' size={24} color='red' className="cursor-pointer" />) : (<FaRegHeart title='Like' size={24} color='white' className="cursor-pointer" />)}
                    </motion.div>
                    <BiMessageRounded onClick={() => setPupUp((pre) => ({ ...pre, message: !pre.message }))} color='white' title='Comment' size={25} className="scale-x-[-1] cursor-pointer text-[#cacaca]" />
                    <LuSend title='Share' size={23} className="cursor-pointer  " />
                </div>
                <FiBookmark title='Save' color='white' size={25} className="cursor-pointer  " />
            </div>

            <span className='text-sm text-gray-300 font-semibold block'>❤️ {PupUp.likeCount.toLocaleString()} likes</span>

            <span className='text-sm text-gray-300 font-semibold   gap-x-2 my-1'>{post.name} <MdVerified color='#0095F6' className='inline-block -mt-1' /> {visibleText} {!isExpanded && <span className='cursor-pointer'
                onClick={() => setIsExpanded(!isExpanded)}> more</span>}</span>

            <div className="border-b border-[#928c8c71] flex w-full items-center relative
                ">
                <textarea value={input}
                    onChange={(e) => handleChange(e)} name="" className='w-full bg-transparent outline-none  my-1 resize-none  e  h-auto overflow-hidden ' id="" placeholder='Add a comment...'></textarea>



                {
                    input && (
                        <span className='text-[#33adff] hover:text-white cursor-pointer mr-3'>Post</span>
                    )
                }
                <button className='grayscale-[100%] rounded-full' onClick={() => setShowPicker(!showPicker)}><MdOutlineEmojiEmotions /></button>

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

            {
                PupUp.message && (
                    <div onClick={() => setPupUp((pre) => ({ ...pre, message: !pre.message }))} className=" fixed top-0 left-0 h-screen w-screen bg-[#000000] z-[99]">

                        <div onClick={(e) => e.stopPropagation()} className="h-full w-[1240px] mx-auto flex    bg-black  items-center">
                            <div className="w-[700px]  bg-black">

                                <Image
                                    src={post.image}
                                    alt="img not found"
                                    width={800}
                                    height={1000}
                                    className="w-[1000px] h-[900px] rounded-sm  object-cover"
                                />

                            </div>

                            <div className="   w-[500px] h-[900px] bg-black ">
                                <div className=" min-h-[78vh]">
                                    <div className="flex justify-between w-full items-center py-3 border-b border-[#928d8d60] p-5 ">
                                        <div className="flex gap-x-3 items-center ">
                                            <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' />

                                            <p className='flex items-center gap-x-1 font-semibold'>{post.name} <span><MdVerified color='#0095F6' /></span></p>
                                        </div>
                                        <PiDotsThreeBold className='cursor-pointer ' size={20} />
                                    </div>

                                    <div className="flex gap-x-3  p-5 ">
                                        <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ' />

                                        <div className="">
                                            <h1 className=" font-semibold  ">
                                                <span className='cursor-pointer hover:text-gray-400'>{post.name}</span> <MdVerified color="#0095F6" className='inline' />
                                                <span className="text-sm text-gray-300"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, eveniet.</span>
                                            </h1>

                                            <div className='flex gap-x-4'>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>18h</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>Reply</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>See translation </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-x-3  p-5 ">
                                        <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ' />

                                        <div className="">
                                            <h1 className=" font-semibold  ">
                                                <span className='cursor-pointer hover:text-gray-400'>{post.name}</span> <MdVerified color="#0095F6" className='inline' />
                                                <span className="text-sm text-gray-300"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, eveniet.</span>
                                            </h1>

                                            <div className='flex gap-x-4'>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>18h</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>Reply</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>See translation </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-3  p-5 ">
                                        <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ' />

                                        <div className="">
                                            <h1 className=" font-semibold  ">
                                                <span className='cursor-pointer hover:text-gray-400'>{post.name}</span> <MdVerified color="#0095F6" className='inline' />
                                                <span className="text-sm text-gray-300"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, eveniet.</span>
                                            </h1>

                                            <div className='flex gap-x-4'>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>18h</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>Reply</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>See translation </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-3  p-5 ">
                                        <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ' />

                                        <div className="">
                                            <h1 className=" font-semibold  ">
                                                <span className='cursor-pointer hover:text-gray-400'>{post.name}</span> <MdVerified color="#0095F6" className='inline' />
                                                <span className="text-sm text-gray-300"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, eveniet.</span>
                                            </h1>

                                            <div className='flex gap-x-4'>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>18h</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>Reply</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>See translation </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-x-3  p-5 ">
                                        <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ' />

                                        <div className="">
                                            <h1 className=" font-semibold  ">
                                                <span className='cursor-pointer hover:text-gray-400'>{post.name}</span> <MdVerified color="#0095F6" className='inline' />
                                                <span className="text-sm text-gray-300"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, eveniet.</span>
                                            </h1>

                                            <div className='flex gap-x-4'>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>18h</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>Reply</p>
                                                <p className='text-[12px] text-gray-400 cursor-pointer'>See translation </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-y  border-[#928d8d60] p-5">
                                    <div className=" flex justify-between w-full items-center ">
                                        <div className="flex items-center gap-x-2">
                                            <motion.div
                                                whileTap={{ scale: 0.8 }} // Adds a small pop effect
                                                animate={{ scale: PupUp.like ? 1.2 : 1 }} // Increases size slightly when liked
                                                transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth animation
                                                className="" onClick={handelLike}>
                                                {PupUp.like ? (<FaHeart title='Like' size={24} color='red' className="cursor-pointer" />) : (<FaRegHeart title='Like' size={24} color='white' className="cursor-pointer" />)}
                                            </motion.div>
                                            <BiMessageRounded onClick={() => setPupUp((pre) => ({ ...pre, message: !pre.message }))} color='white' title='Comment' size={25} className="scale-x-[-1] cursor-pointer text-[#cacaca]" />
                                            <LuSend title='Share' size={23} className="cursor-pointer  " />
                                        </div>
                                        <FiBookmark title='Save' color='white' size={25} className="cursor-pointer  " />
                                    </div>
                                    <span className='text-sm text-gray-300 font-semibold block mt-5'>{PupUp.likeCount.toLocaleString()} likes</span>
                                    <p className='text-[12px] text-gray-300'>15 hours ago</p>

                                </div>

                                <div className="border-b border-[#928c8c71] flex w-full items-center  relative
                                    p-5 gap-x-3 ">


                                    <button className='grayscale-[100%] rounded-full' onClick={() => setShowPicker2(!showPicker2)}><MdOutlineEmojiEmotions size={25} /></button>
                                    {showPicker2 && (
                                        <div className="absolute bottom-14  left-6">
                                            <EmojiPicker
                                                onEmojiClick={(emoji) => setInput((prev) => prev + emoji.emoji)}

                                                theme='dark'
                                                skinTonesDisabled
                                            />
                                        </div>
                                    )}
                                    <textarea value={input}
                                        onChange={(e) => setInput(e.target.value)} name="" className='w-full bg-transparent outline-none  my-1 resize-none  h-[25px]  overflow-hidden ' id="" placeholder='Add a comment...'></textarea>




                                    <span
                                        className={`${input ? 'text-[#33adff]' : 'grayscale-[100%] pointer-events-none opacity-50'} hover:text-white cursor-pointer mr-3`}
                                    >
                                        Post
                                    </span>




                                </div>

                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default PostCard