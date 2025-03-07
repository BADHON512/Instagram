"use client"
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { MdOutlineEmojiEmotions, MdOutlineMail, MdVerified } from "react-icons/md";
import { PiDotsThreeBold, PiMessengerLogoBold } from "react-icons/pi";

import React, { useEffect, useState } from 'react'
import { BiLinkAlt, BiMessageRounded } from 'react-icons/bi';

import { FiBookmark, } from 'react-icons/fi';
import { LuSend } from 'react-icons/lu';
import { FaBookmark, FaHeart, FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { RxCross1 } from 'react-icons/rx';
import { IoIosCheckmark, IoIosLink, IoIosSearch } from 'react-icons/io';
import { CiBookmarkCheck, CiFacebook } from 'react-icons/ci';
import { FaThreads } from 'react-icons/fa6';
import { TiSocialLinkedin } from 'react-icons/ti';
import { LiaShareSolid } from 'react-icons/lia';
import MessageModel from './MessageModle';
import { format } from "timeago.js"
import Link from 'next/link';
import { CreateLike } from '@/@actions/Like/CrateLike';
import { GetLikeCount } from '@/@actions/Like/getLikeCount';
import { CreateComment } from '@/@actions/Comment/createComment';
import { GetComment } from '@/@actions/Comment/getCommet';
import { CreateSavePost } from '@/@actions/SavePost/createSavePost';
import toast from 'react-hot-toast';


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
    const [input, setInput] = useState<string>('');
    const [showPicker, setShowPicker] = useState(false);
    const [ReFetcher, setReFetcher] = useState(false)
    const [inputClick, setInputClick] = useState(false)
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]); // Track multiple selections

    const [comment, setComment] = useState<any>();



    const handelSavePost = async (postId: string, UserId: string) => {
        setPupUp((pre) => ({ ...pre, save: !pre.save }))
        const savePost = await CreateSavePost({ postId, UserId })
        if (savePost.success) {
            toast.success(savePost?.message)
        }
        else {
            toast.error(savePost?.message)
        }
    }

    useEffect(() => {
        async function Fetcher(postId: string) {
            const Comments = await GetComment(postId)
            setComment(Comments.comments)
        }
        Fetcher(post?.id)
    }, [ReFetcher])

    const handleComment = async (postId: string) => {
        const comment = await CreateComment({ postId, content: input })
        setReFetcher(!ReFetcher)
        setShowPicker(false)
        if (comment.success) {
            setInput("")
        }
    };


    const [PupUp, setPupUp] = useState({
        like: false,
        likeCount: 0,
        message: false,
        share: false,
        save: false,
        postSetting: false

    })

    useEffect(() => {

        async function Fetcher(postId: string) {

            const likeCount = await GetLikeCount(postId)

            if (likeCount.likeExist) {
                setPupUp((pre) => ({ ...pre, like: true }))
            }
            setPupUp((pre) => ({ ...pre, likeCount: likeCount.likeCount || 0 }));
        }
        Fetcher(post?.id)
    }, [post?.id, PupUp.like])

    const handleSelect = (index: number) => {
        setSelectedIndexes((pre) =>
            pre.includes(index) ? pre.filter((i) => i !== index) : [...pre, index]
        )
    };
    const handelLike = async (postId: string) => {
        setPupUp((prev) => ({
            ...prev,
            like: !prev.like,
            likeCount: prev.like ? prev.likeCount - 1 : prev.likeCount + 1
        }))
        await CreateLike({ postId })
    }

    useEffect(() => {
        const shouldDisableScroll = PupUp.message || PupUp.share;
        document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [PupUp.message, PupUp.share]);

    const handleChange = (event) => {
        setText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
        setInput(event.target.value)
    };

    const [heartVisible, setHeartVisible] = useState(false);
    const handleDoubleTap = () => {
        setHeartVisible(true);
        setTimeout(() => setHeartVisible(false), 600);
    };

    const TrimCaption = (allText: string) => {

        const word = allText.split(" ")
        return isExpanded ? allText : word.slice(0, 20).join(" ") + "..."
    }
    return (
        <div className=" w-[95%]  md:w-[485px] mx-auto my-3 bg-black">
            <div className="flex justify-between w-full items-center ">
                <div className="flex gap-x-3 items-center">
                    <Image src={post?.user?.avatar?.url} height={500} width={500} alt='img not found' className='h-[40px] w-[40px] object-cover  p-[2px] border-transparent rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' />

                    <Link href={`/profile/${post?.user?.username}`} className='flex items-center gap-x-1 font-semibold '>{post?.user?.name} <span><MdVerified color='#0095F6' /></span> <span className='text-[30px] -mt-5 hidden md:block'>.</span> <span className='text-gray-500 hidden md:block'>{format(post?.createdAt)}</span></Link>
                </div>
                <PiDotsThreeBold className='cursor-pointer ' size={20} onClick={() => setPupUp((pre) => ({ ...pre, postSetting: !pre.postSetting }))} />
            </div>

            <div onDoubleClick={handleDoubleTap} className="w-full min-h-[20vh] border border-[#9e9a9a41] my-2 rounded-sm relative">
                <Image src={post?.image?.url} height={1000} width={1000} alt='img not found' className='wf h-full rounded-sm' />
                <AnimatePresence>
                    {heartVisible && (
                        <motion.div

                            initial={{ scale: 0, opacity: 1 }}  // Start small and fully opaque
                            animate={{
                                scale: 3,
                                y: -100,
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -200,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}

                            className="absolute top-0 left-0  w-full h-full flex  justify-center items-center">
                            <FaHeart size={30} color="red" />
                        </motion.div>)}
                </AnimatePresence>
            </div>
            <div className="my-2 flex justify-between w-full items-center">
                <div className="flex items-center gap-x-2">
                    <motion.div
                        whileTap={{ scale: 0.8 }} // Adds a small pop effect
                        animate={{ scale: PupUp.like ? 1.2 : 1 }} // Increases size slightly when liked
                        transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth animation
                        className="" onClick={() => handelLike(post?.id)}>
                        {PupUp.like ? (<FaHeart title='Like' size={24} color='red' className="cursor-pointer" />) : (<FaRegHeart title='Like' size={24} color='white' className="cursor-pointer" />)}
                    </motion.div>
                    <BiMessageRounded onClick={() => setPupUp((pre) => ({ ...pre, message: !pre.message }))} color='white' title='Comment' size={25} className="scale-x-[-1] cursor-pointer text-[#cacaca]" />
                    <LuSend title='Share' size={23} className="cursor-pointer  " onClick={() => setPupUp((pre) => ({ ...pre, share: !pre.share }))} />
                </div>
                <div onClick={() => handelSavePost(post?.id, post?.user?.id)} className="cursor-pointer">
                    {
                        PupUp.save ? <FaBookmark title='Unsave' color='white' size={25} className="cursor-pointer text-red-500" /> : <FiBookmark title='Save' color='white' size={25} />
                    }
                </div>

            </div>

            <span className='text-sm text-gray-300 font-semibold block'>❤️ {PupUp.likeCount} likes</span>

            <span className='text-sm text-gray-300 font-semibold   gap-x-2 my-1'>{post.name} <MdVerified color='#0095F6' className='inline-block -mt-1' /> {TrimCaption(post?.caption)} {!isExpanded && <span className='cursor-pointer'
                onClick={() => setIsExpanded(!isExpanded)}> more</span>}</span>

            <div className="border-b border-[#928c8c71] flex w-full items-center relative
                ">
                <textarea value={input}
                    onChange={(e) => handleChange(e)} name="" className='w-full bg-transparent outline-none  my-1 resize-none  e  h-auto overflow-hidden ' id="" placeholder='Add a comment...'></textarea>



                {
                    input && (
                        <span onClick={() => handleComment(post?.id)} className='text-[#33adff] hover:text-white cursor-pointer mr-3'>Post</span>
                    )
                }
                <button className='grayscale-[100%] rounded-full' onClick={() => setShowPicker(!showPicker)}><MdOutlineEmojiEmotions size={20} /></button>

                {showPicker && (
                    <div className="absolute bottom-10  right-0 md:-right-[340px]">
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
                    <MessageModel PupUp={PupUp} setPupUp={setPupUp} post={post} input={input} setInput={setInput} handelLike={handelLike} handleComment={handleComment} comment={comment} />
                )
            }

            {
                PupUp.share && (
                    <div onClick={() => {
                        setPupUp((prev) => ({ ...prev, share: !prev.share }))

                    }} className="fixed inset-0 z-[9999999] bg-black bg-opacity-80 flex justify-center items-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 1.5, z: -500 }} // Starts from behind with reduced scale
                            animate={{ opacity: 1, scale: 1, z: 0 }}




                            onClick={(e) => e.stopPropagation()} className="h-[65vh] w-[50vw] xl:w-[30vw] bg-[#262626] rounded-md">
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




                            onClick={(e) => e.stopPropagation()} className="min-h-[50vh] w-[50vw] xl:w-[20vw] bg-[#262626] rounded-md">
                            {
                                ["Report", "Unfollow", "Add to favorites", "Go to post", "Share to", "Copy link", "Embed", "About this account", "Cancel"].map((item, index) => (
                                    <h1 key={index} className={`${index === 0 || index === 1 ? "text-red-600 " : "text-white"} ${index === 0 && "border-none"} text-center p-3  cursor-pointer font-semibold border-t mt-1 border-[#c4bfbf17]`}>{item}</h1>
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