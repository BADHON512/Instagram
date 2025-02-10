"use client"
import { motion } from 'motion/react';
import Image from 'next/image';
import { MdOutlineEmojiEmotions, MdOutlineMail, MdVerified } from "react-icons/md";
import { PiDotsThreeBold, PiMessengerLogoBold } from "react-icons/pi";

import React, { useEffect, useState } from 'react'
import { BiLinkAlt, BiMessageRounded } from 'react-icons/bi';

import { FiBookmark, } from 'react-icons/fi';
import { LuSend } from 'react-icons/lu';
import { FaHeart, FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { RxCross1 } from 'react-icons/rx';
import { IoIosCheckmark, IoIosLink, IoIosSearch } from 'react-icons/io';
import { CiFacebook } from 'react-icons/ci';
import { FaThreads } from 'react-icons/fa6';
import { TiSocialLinkedin } from 'react-icons/ti';
import { LiaShareSolid } from 'react-icons/lia';


type Props = {
    post: any
}

const ShareLink = [
    { link: "Copy link", icon: <BiLinkAlt size={25} /> },
    { link: "Facebook", icon: <CiFacebook size={25} /> },
    { link: "Messenger", icon: <PiMessengerLogoBold size={25} /> },
    { link: "Whatsapp", icon: <FaWhatsapp size={25} /> },
    { link: "Email", icon: <MdOutlineMail size={25} /> },
    { link: "Threads", icon: <FaThreads size={25} /> },
    { link: "Linkedin", icon: <TiSocialLinkedin size={25} /> },
    { link: "See all", icon: <LiaShareSolid size={25} /> },
]

const stories = [
    { id: 1, name: "sohel_hoss...", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg" },
    { id: 2, name: "badhon ", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" },
    { id: 3, name: "sirazul_monir", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220719/profile/315100994_10209906491094779_654405519663392346_n_axklsy.jpg" },
    { id: 4, name: "raja_9090", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737221207/profile/d2a54a36-0025-4332-8339-c1eef1b5eb70.png" }, { id: 5, name: "md_rahat", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg" },
    { id: 6, name: "sirazul_monir", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854193/profile/285636603_10209475645083898_8206659727678614489_n_kw8sbk.jpg" },
    { id: 7, name: "raja_5050", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220822/profile/473018861_954030496668402_2945812169270431767_n_drmzvb.jpg" },
    { id: 8, name: "mr_faisu_07", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282239/samples/people/smiling-man.jpg" },
    { id: 6, name: "sirazul_monir", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854193/profile/285636603_10209475645083898_8206659727678614489_n_kw8sbk.jpg" },
    { id: 5, name: "md_rahat", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1738854226/profile/476164061_1327580994932700_4948948658324637344_n_wwevz7.jpg" },
    { id: 2, name: "badhon ", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" },
    { id: 7, name: "raja_5050", img: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220822/profile/473018861_954030496668402_2945812169270431767_n_drmzvb.jpg" },

];
const PostCard = ({ post }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState("");
    const [input, setInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [inputClick, setInputClick] = useState(false)
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]); // Track multiple selections
    const allText = "You're very welcome! 🎉 I'm so glad to hear you had a wonderful birthday with your loved ones. Wishing you even more amazing moments ahead! 🥳🎂 How did you celebrate?"
    const word = allText.split(" ")
    const visibleText = isExpanded ? allText : word.slice(0, 20).join(" ") + "..."

    const [PupUp, setPupUp] = useState({
        like: false,
        likeCount: 10032119,
        message: false,
        share: false,
        save: false,
        postSetting: false

    })


    const handleSelect = (index: number) => {
        setSelectedIndexes((pre) =>
            pre.includes(index) ? pre.filter((i) => i !== index) : [...pre, index]

        )
    };
    const handelLike = () => {
        setPupUp((prev) => ({ ...prev, like: !prev.like, likeCount: prev.like ? prev.likeCount + 1 : prev.likeCount - 1 }))
    }

    useEffect(() => {
        const shouldDisableScroll = PupUp.message || PupUp.share;

        document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto"; // Cleanup on unmount
        };
    }, [PupUp.message, PupUp.share]);


    const handleChange = (event) => {

        setText(event.target.value);
        event.target.style.height = 'auto'; // Reset height to auto to calculate the new height
        event.target.style.height = `${event.target.scrollHeight}px`; // Set the height to scrollHeight
        setInput(event.target.value)
    };
    return (
        <div className=" w-[95%]  md:w-[485px] mx-auto my-3 bg-black">
            <div className="flex justify-between w-full items-center ">
                <div className="flex gap-x-3 items-center">
                    <Image src={post.avatar} height={500} width={500} alt='img not found' className='h-[40px] w-[40px]  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' />

                    <p className='flex items-center gap-x-1 font-semibold'>{post.name} <span><MdVerified color='#0095F6' /></span> <span className='text-[30px] -mt-5'>.</span> <span className='text-gray-500'>{Math.floor(Math.random() * 24) + 1}h</span></p>
                </div>
                <PiDotsThreeBold className='cursor-pointer ' size={20} onClick={() => setPupUp((pre) => ({ ...pre, postSetting: !pre.postSetting }))} />
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
                    <LuSend title='Share' size={23} className="cursor-pointer  " onClick={() => setPupUp((pre) => ({ ...pre, share: !pre.share }))} />
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
                    <div
                        onClick={() => {
                            setPupUp((prev) => ({ ...prev, message: !prev.message }))
                            setShowPicker2(!showPicker2)
                        }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[99] p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 1.5, z: -500 }} // Starts from behind with reduced scale
                            animate={{ opacity: 1, scale: 1, z: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex flex-col md:flex-row bg-black max-w-[1200px] w-[70%] md:w-[80vw]  md:h-auto xl:h-[80vh] rounded-lg overflow-scroll scrollNone"
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 h-full ">
                                <Image
                                    src={post.image}
                                    alt="Post Image"

                                    width={800}
                                    height={1000}
                                    className="object-cover w-full h-full md:h-[500px] xl:h-[80vh]"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 bg-black flex flex-col">
                                {/* Header */}
                                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={post.avatar}
                                            height={40}
                                            width={40}
                                            alt="User Avatar"
                                            className="rounded-full border p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                                        />
                                        <p className="font-semibold flex items-center gap-x-1">
                                            {post.name} <MdVerified color="#0095F6" />
                                        </p>
                                    </div>
                                    <PiDotsThreeBold className="cursor-pointer" size={20} />
                                </div>

                                {/* Comments Section */}
                                <div className="flex-grow overflow-auto p-4 space-y-4 hidden md:block">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="flex gap-3">
                                            <Image src={post.avatar} height={4000} width={4000} alt="User Avatar" className="rounded-full w-[40px] h-[40px]" />
                                            <div>
                                                <p className="font-semibold">
                                                    {post.name} <MdVerified color="#0095F6" className="inline" />
                                                    <span className="text-sm text-gray-300"> Lorem ipsum dolor sit amet...</span>
                                                </p>
                                                <div className="flex gap-x-4 text-xs text-gray-400 cursor-pointer">
                                                    <p>18h</p>
                                                    <p>Reply</p>
                                                    <p>See translation</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="border-t border-gray-700 p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <motion.div whileTap={{ scale: 0.8 }} animate={{ scale: PupUp.like ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 10 }} onClick={handelLike}>
                                                {PupUp.like ? <FaHeart color="red" size={24} className="cursor-pointer" /> : <FaRegHeart color="white" size={24} className="cursor-pointer" />}
                                            </motion.div>
                                            <BiMessageRounded size={25} className="cursor-pointer" onClick={() => setPupUp((prev) => ({ ...prev, message: !prev.message }))} />
                                            <LuSend size={23} className="cursor-pointer" />
                                        </div>
                                        <FiBookmark size={25} className="cursor-pointer" />
                                    </div>
                                    <p className="text-sm text-gray-300 mt-2 font-semibold">{PupUp.likeCount.toLocaleString()} likes</p>
                                    <p className="text-xs text-gray-300">15 hours ago</p>
                                </div>

                                {/* Comment Input */}
                                <div className="border-t border-gray-700 p-4 flex items-center gap-3">
                                    <button onClick={() => setShowPicker2(!showPicker2)}>
                                        <MdOutlineEmojiEmotions size={25} />
                                    </button>
                                    {showPicker2 && (
                                        <div className="absolute bottom-14 right-60">
                                            <EmojiPicker onEmojiClick={(emoji) => setInput((prev) => prev + emoji.emoji)} theme="dark" skinTonesDisabled />
                                        </div>
                                    )}
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full bg-transparent outline-none resize-none h-[25px] overflow-hidden"
                                        placeholder="Add a comment..."
                                    />
                                    <span className={`${input ? "text-[#33adff] hover:text-white cursor-pointer" : "text-gray-500 pointer-events-none opacity-50"}`}>Post</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )
            }

            {
                PupUp.share && (
                    <div onClick={() => {
                        setPupUp((prev) => ({ ...prev, share: !prev.share }))

                    }} className="fixed inset-0  bg-black bg-opacity-80 flex justify-center items-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 1.5, z: -500 }} // Starts from behind with reduced scale
                            animate={{ opacity: 1, scale: 1, z: 0 }}




                            onClick={(e) => e.stopPropagation()} className="h-[65vh] w-[30vw] bg-[#262626] rounded-md">
                            <div className="p-5 flex w-full justify-between">
                                <div className=""></div>
                                <h1 className='font-bold cursor-pointer'>Share</h1>
                                <RxCross1 size={20} className='cursor-pointer' onClick={() => {
                                    setPupUp((prev) => ({ ...prev, share: !prev.share }))

                                }} />
                            </div>
                            <div className="mt-3 w-[90%] mx-auto flex relative">
                                <div className="relative w-full">
                                    <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[white]" size={18} />
                                    <input
                                        onClick={() => setInputClick(true)}
                                        type="text"
                                        placeholder="Search"
                                        className="h-[35px] outline-none w-full bg-black text-white rounded-lg pl-10 pr-4"
                                    />
                                </div>
                                <button
                                    onClick={() => setInputClick(!inputClick)} className={`bg-transparent text-white px-4 py-1 rounded-md ml-2 ${inputClick ? "block" : "hidden"}`}>
                                    Cancel
                                </button>
                            </div>

                            <div className="mt-5 w-[90%] mx-auto flex justify-center flex-wrap
                            items-center h-[35vh] overflow-y-scroll  ">
                                {stories.map((item, index) => (
                                    <div key={index} onClick={() => handleSelect(index)} className="w-[110px] cursor-pointer  hover:bg-[#3C3C3C] h-[115px] rounded-lg flex-col gap-y-1 flex justify-center items-center p-2 ">
                                        <div className='relative'>
                                            <Image src={item.img} height={1000} width={1000} alt='img not work' className='w-[60px] h-[60px] object-cover rounded-full' />
                                            {selectedIndexes.includes(index) && (
                                                <IoIosCheckmark className="absolute bottom-0 right-0 bg-blue-600 h-4 w-4 rounded-full" />
                                            )}
                                        </div>
                                        <h1 className='font-semibold'>{item.name}</h1>
                                    </div>
                                ))}

                            </div>

                            <div className="border-t border-[#c2c0c073] mt-5">
                                <div className="w-[90%] mx-auto">
                                    <input type="text" className='bg-transparent outline-none mt-4 w-full' placeholder='Write a message' />
                                    <button className='w-full bg-blue-400 p-1 mt-5 rounded-lg font-semibold'>{selectedIndexes.length > 1 ? 'Send separately' : "Send"}</button>
                                </div>

                                {/* 
                                <div className="w-[90%] h-[13vh] flex items-center gap-x-3 mx-auto justify-center overflow-x-scroll scrollNone">

                          {
                            ShareLink.map((item,index)=>(
                                <div key={index} className="w-[80px] h-[80px] flex-col gap-y-1  flex items-center justify-center">
                                <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-black">{item.icon}

                                </div>
                                <span className='text-[12px] text-gray-300'>{item.link}</span>
                            </div>
                            ))
                          }

                                   
                                </div> */}
                            </div>
                        </motion.div>
                    </div>
                )
            }


            {
                PupUp.postSetting && (
                    <div onClick={() => {
                        setPupUp((prev) => ({ ...prev, postSetting: !prev.postSetting }))

                    }} className="fixed inset-0  bg-black bg-opacity-80 flex justify-center items-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 1.5, z: -500 }} // Starts from behind with reduced scale
                            animate={{ opacity: 1, scale: 1, z: 0 }}




                            onClick={(e) => e.stopPropagation()} className="min-h-[50vh] w-[20vw] bg-[#262626] rounded-md">
                            {
                                ["Report", "Unfollow", "Add to favorites", "Go to post", "Share to", "Copy link", "Embed", "About this account", "Cancel"].map((item, index) => (
                                    <h1 key={index} className={`${index === 0 || index === 1 ? "text-red-600 " : "text-white"} ${index === 0 && "border-none"} text-center p-3  font-semibold border-t mt-1 border-[#c4bfbf17]`}>{item}</h1>
                                ))
                            }


                        </motion.div>
                    </div>
                )
            }
        </div>
    )
}

export default PostCard