import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegEdit, FaRegHeart, FaRegImage } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { LuSticker } from 'react-icons/lu'
import { MdCall, MdVerified } from 'react-icons/md'
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TbVideo } from 'react-icons/tb'
import { TiMicrophoneOutline } from 'react-icons/ti'
import EmojiPicker from 'emoji-picker-react'

type Props = {
    user: any
    LoginUser:any
}

const messages = [
    { id: 1, text: "Hey, what's up?", senderId: "user1" },
    { id: 2, text: "All good! You?", senderId: "me" },
    { id: 3, text: "Same here!", senderId: "user1" },
  ];
  
const MessageBodyById = ({ user,LoginUser }: Props) => {
    const [open, setOpen] = useState(false)
    const [showPicker, setShowPicker] = useState(false);
    const [input, setInput] = useState<string>('');

    return (
        <div className='flex  h-screen bg-black'>
            {/* Left Sidebar */}
            <div className="w-[30%] md:w-[300px] border-r border-[#262626] flex-shrink-0">
                <div className="p-4 md:p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className='text-xl font-semibold'>{user?.username}</h1>
                        <FaRegEdit size={24} className='text-gray-400 hover:text-white transition-colors' />
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-2  ">
                            <Image
                                src={LoginUser?.avatar?.url}
                                alt="Profile"
                                width={80}
                                height={80}
                                className="rounded-full border-2 border-gray-600 h-[80px] w-[80px] object-cover"
                            />
                            <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 rounded-full">You</span>
                        </div>
                        <p className="text-gray-400 text-sm">Your note</p>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold">Messages</h2>
                        <button className="text-blue-500 text-sm hidden md:block hover:text-blue-400">
                            Requests
                        </button>
                    </div>

                    {/* Conversation List */}
                    <div className="space-y-4 overflow-y-auto">
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div key={idx} className="flex items-center p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors">
                                <Image
                                    src={user?.avatar?.url}
                                    alt="User"
                                    width={500}
                                    height={500}
                                    className="rounded-full object-cover flex-shrink-0 h-[50px] w-[50px]"
                                />
                                <div className="ml-3 flex-1 min-w-0 hidden md:block">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium truncate">Contact {idx + 1}</p>
                                        <span className="text-xs text-gray-400">1h ago</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">
                                        {idx % 2 === 0 ? 'Active now' : 'Away'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="flex justify-between items-center p-4 border-b border-[#262626]">
                    <div className="flex items-center gap-3">
                        <Image
                            src={user?.avatar?.url}
                            alt="Profile"
                            width={405}
                            height={405}
                            className="rounded-full object-cover h-[50px] w-[50px]"
                        />
                        <div>
                            <h2 className="flex items-center gap-1 font-semibold">
                                {user?.name}
                                <MdVerified className="text-blue-500" />
                            </h2>
                            <p className="text-sm text-gray-400">@{user?.username}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-gray-400">
                        <MdCall size={24} className="hover:text-white cursor-pointer" />
                        <TbVideo size={24} className="hover:text-white cursor-pointer" />
                        <IoMdInformationCircleOutline size={24} className="hover:text-white cursor-pointer" />
                    </div>
                </div>

                {/* Chat Content */}
                <div className="flex-1 overflow-y-scroll scrollNone p-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-6">
                            <Image
                                src={user?.avatar?.url}
                                alt="Profile"
                                width={100}
                                height={100}
                                className="rounded-full object-cover mx-auto mb-4 h-[100px] w-[100px]"
                            />
                            <h1 className="text-2xl font-semibold mb-1">{user?.name}</h1>
                            <p className="text-gray-400 mb-4">@{user?.username} <span className='text-[20px] font-bold -mt-[30px]'>.</span> Instagram</p>
                            <Link
                                href={`/profile/${user?.username}`}
                                className="inline-block px-6 py-2 text-sm bg-[#262626] rounded-lg hover:bg-[#333] transition-colors"
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
  

                </div>

                <div className="w-[95%] mx-auto">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"} mb-4`}
                    >
                        <div
                            className={`p-3 rounded-lg ${message.senderId === "me" ? "bg-blue-500 text-white" : "bg-[#262626] text-white"}`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
               </div>


                {/* Message Input */}
                <div className="p-4 border-t border-[#262626] relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message..."
                            className="w-full pl-12 pr-24 py-3 bg-[#1a1a1a] rounded-full focus:outline-none  bg-transparent focus:ring-2 focus:ring-[#1a1a52c5]"
                        />
                        <HiOutlineEmojiHappy
                            onClick={() => setShowPicker(!showPicker)}
                            className="absolute left-4 top-3.5 text-gray-400 hover:text-white cursor-pointer"
                            size={24}
                        />
                        <div className="absolute right-4 top-2.5 flex gap-3">
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
    )
}

export default MessageBodyById