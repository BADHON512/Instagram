"use client"
import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart, FaRegImage } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward, IoMdInformationCircleOutline } from 'react-icons/io'
import { LuSticker } from 'react-icons/lu'
import { MdCall, MdVerified } from 'react-icons/md'
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TbVideo } from 'react-icons/tb'
import { TiMicrophoneOutline } from 'react-icons/ti'
import EmojiPicker from 'emoji-picker-react'
import { useRef } from "react";
import { motion } from "framer-motion";
import { CreateMessage } from '@/@actions/Message/createMessage'
import { GetMessage } from '@/@actions/Message/getMessage'
import { io } from 'socket.io-client'
import Slider from "react-slick";
type Props = {
    TargetUser: any
    UserToMessage: any
    currentUser: any
    follower: any
    setUniqueUser: any
}

const MessageHomeBody = ({ TargetUser, UserToMessage, currentUser, follower, setUniqueUser }: Props) => {
    const socket = io('http://localhost:5000')

    const [message, setMessage] = useState<any>([])
    const [open, setOpen] = useState(false)
    const [showPicker, setShowPicker] = useState(false);
    const [input, setInput] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [Refetcher, setRefetcher] = useState(false)

    const handleSend = async () => {
        if (input.trim() === '') return;
        const message = await CreateMessage({ text: input, receiverId: UserToMessage?.id })

        if (message?.success) {
            setRefetcher(!Refetcher)
            setShowPicker(false)
            if (socket.connected) {
                socket.emit("private_message", {
                    senderId: currentUser?.id,
                    receiverId: UserToMessage?.id,
                    message: input,
                });
            }
            setInput('')
        }
    }

    useEffect(() => {
        socket.on("connect", () => {
            socket.emit("register", currentUser.id); // 🔥 ইউজার রেজিস্টার করা
        });

        socket.on("private_message", (data) => {

            if (data.senderId === UserToMessage?.id) {
                setMessage((prev) => [
                    ...prev,
                    { senderId: data.senderId, receiverId: data.receiverId, text: data.message }
                ]);
            }
        });

        return () => {
            socket.off("private_message"); // শুধু ইভেন্ট আনবাইন্ড করো
            socket.off("connect");
        };
    }, [Refetcher]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [message]);

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, },
    };
    const handelEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSend()
        }

    }
    useEffect(() => {
        const getMessageFunction = async () => {
            const Message: any = await GetMessage(UserToMessage?.id)
            setMessage(Message.getMessage)
        }
        getMessageFunction()
    }, [Refetcher, UserToMessage])



    const getShortName = (name: string) => {

        const words = name.split(" ");
        return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : name;
    };

    const CustomPrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute left-0 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10 "
            >
                <IoIosArrowBack />
            </button>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute right-0 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
            >
                <IoIosArrowForward />
            </button>
        );
    };

    const settings = {

        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className=''>

            {/* <Slider {...settings} className="w-[90%] hidden  mx-auto items-center justify-center flex gap-x-3 min-h-[10vh] ">
                {follower?.map((item:any, index:number) => (
                    <div onClick={() => setUniqueUser(item.id)} key={index} className=" py-2 flex gap-x-3 items-center flex-col hover:bg-[#cfb8b817] p-1 cursor-pointer mx-[30px]">

                        <Image
                            src={item?.follower?.avatar?.url || 'https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png'}
                            alt='img not found'
                            height={1000}
                            width={1000}
                            className='h-[50px] w-[50px] rounded-full '
                        />
                        <div className="text-sm">
                        
                         
                        </div>
                    </div>
                ))}
            </Slider> */}
            {
                TargetUser ? (

                    <div>
                        {/* Right Chat Area */}
                        <div className="flex-1 flex flex-col   ">
                            {/* Chat Header */}
                            <div className="flex justify-between items-center p-4 border-b  border-[#262626]">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={UserToMessage?.avatar?.url || "https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"}
                                        alt="Profile"
                                        width={405}
                                        height={405}
                                        className="rounded-full object-cover h-[50px] w-[50px]"
                                    />
                                    <div>
                                        <h2 className="flex items-center gap-1 font-semibold">
                                            {UserToMessage?.name}
                                            <MdVerified className="text-blue-500" />
                                        </h2>
                                        <p className="text-sm text-gray-400">@{UserToMessage?.username}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-gray-400">
                                    <MdCall size={24} className="hover:text-white cursor-pointer" />
                                    <TbVideo size={24} className="hover:text-white cursor-pointer" />
                                    <IoMdInformationCircleOutline size={24} className="hover:text-white cursor-pointer" />
                                </div>
                            </div>

                            <div className="h-[67vh] md:h-[82vh] flex flex-col justify-end overflow-y-scroll">
                                {/* Chat Content */}
                                <div className="flex-1 overflow-y-scroll scrollNone p-4">
                                    <div className="max-w-2xl mx-auto text-center">
                                        <div className="mb-6">
                                            <Image
                                                src={UserToMessage?.avatar?.url || "https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"}
                                                alt="Profile"
                                                width={100}
                                                height={100}
                                                className="rounded-full object-cover mx-auto mb-4 h-[100px] w-[100px]"
                                            />
                                            <h1 className="text-2xl font-semibold mb-1">{UserToMessage?.name}</h1>
                                            <p className="text-gray-400 mb-4">@{UserToMessage?.username} <span className='text-[20px] font-bold -mt-[30px]'>.</span> Instagram</p>
                                            <Link
                                                href={`/profile/${UserToMessage?.username}`}
                                                className="inline-block px-6 py-2 text-sm bg-[#262626] rounded-lg hover:bg-[#333] transition-colors"
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>


                                </div>

                                <div className="w-[95%] mx-auto max-h-[50vh] ">
                                    {message?.map((item: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            variants={messageVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className={`flex ${item.senderId === currentUser?.id ? "justify-end" : "justify-start"} mb-4 `}
                                        >
                                            <div
                                                className={`px-3 py-1 rounded-md font-serif mb-4 ${item.senderId === currentUser?.id ? "bg-blue-500 text-white" : "bg-[#262626] text-white mb-3"}`}
                                            >
                                                {item?.text}
                                            </div>

                                        </motion.div>
                                    ))}
                                    <div className='' ref={messagesEndRef} />
                                </div>

                            </div>


                            {/* Message Input */}
                            <div className="p-4 border-t border-[#262626] relative">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => handelEnter(e)}
                                        placeholder="Message..."
                                        className="w-full pl-12 pr-24 py-3 bg-[#1a1a1a] rounded-full focus:outline-none  bg-transparent focus:ring-2 focus:ring-[#1a1a52c5]"
                                    />
                                    <HiOutlineEmojiHappy
                                        onClick={() => setShowPicker(!showPicker)}
                                        className="absolute left-4 top-3.5 text-gray-400 hover:text-white cursor-pointer"
                                        size={24}
                                    />
                                    <div className="absolute right-4 top-2.5 flex gap-3 z-20">
                                        <button disabled={input === ""} onClick={handleSend} className=' bg-blue-500 text-white p-1 px-2 rounded-md text-sm cursor-pointer'>Send</button>
                                        <TiMicrophoneOutline className="text-gray-400 hover:text-white cursor-pointer" size={24} />
                                        <FaRegImage className="text-gray-400 hover:text-white cursor-pointer" size={24} />
                                        <LuSticker className="text-gray-400 hover:text-white cursor-pointer" size={24} />
                                        <FaRegHeart className="text-gray-400 hover:text-white cursor-pointer" size={24} />
                                    </div>
                                </div>

                                {showPicker && (
                                    <div className="absolute bottom-20 left-4 z-50">
                                        <EmojiPicker
                                            onEmojiClick={(emoji) => setInput(prev => prev + emoji.emoji)}
                                            theme="dark"
                                            skinTonesDisabled
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {
                            showPicker && (
                                <div className="absolute w-[100vw] h-[100vh] inset-0 " onClick={() => setShowPicker(!setShowPicker)}></div>
                            )
                        }
                    </div>


                ) : (<div>
                    <div className='w-full h-screen flex
               justify-center  items-center flex-col gap-y-3'>

                        <svg aria-label="" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title></title><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>

                        <h1 className='text-[20px] font-semibold'>Your messages</h1>
                        <h1 className='text-sm text-gray-400'>Send a message to start a chat.
                        </h1>
                        <button onClick={() => setOpen(!open)} className='px-3 py-1 rounded-lg bg-[#3397f5] hover:bg-[#1877F2] font-semibold'>Send message</button>

                    </div>
                    {open && (
                        <div className=" absolute flex justify-center items-center top-0 left-0  w-[100vw] h-[100vh] bg-[#00000046]">

                            <div className="w-[550px] min-h-[600px]  bg-[#262626] rounded-lg shadow-sm ">
                                {/* Header */}
                                <div className="flex justify-between items-center w-full p-2
                 ">
                                    <h1></h1>
                                    <h2 className="font-semibold">New message</h2>
                                    <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpen(!open)} />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    {/* Search row */}
                                    <div className="flex items-center gap-2 px-3  border-y border-[#bebcbc3d]">
                                        <span className="text-gray-100">To :</span>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="flex-1 px-3 py-2  bg-[#262626] rounded-md focus:outline-none "
                                        />
                                    </div>

                                    {/* Account alert */}
                                    <div className="px-4 pb-4 min-h-[48vh] overflow-y-scroll custom-scrollbar">
                                        <p className="text-gray-400 text-sm">No account found.</p>

                                        <div className="h-[60vh]"></div>

                                    </div>

                                    {/* Buttons */}
                                    <div className="px-2 mt-1 ">

                                        <button className='px-3 py-1 w-full rounded-lg bg-[#3397f5] hover:bg-[#1877F2] font-semibold '>Chat</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>)
            }

        </div>
    )
}

export default MessageHomeBody