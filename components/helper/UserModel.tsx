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
import { format } from 'timeago.js';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { DeletePost } from '@/@actions/GetAllPost/deletePost';



type Props = {
    PupUp: {
        like: boolean;
        likeCount: number;
        message: boolean;
        share: boolean;
        save: boolean;
        postSetting: boolean;
    }
    setPupUp: React.Dispatch<React.SetStateAction<{
        like: boolean;
        likeCount: number;
        message: boolean;
        share: boolean;
        save: boolean;
        postSetting: boolean;
    }>>,
    post: any,
    input?: string
    setInput?: ((input: string) => void)
    handelLike?: (() => void)
    user: any

}

const UserModel = ({ PupUp, setPupUp, post, input, setInput, handelLike, user }: Props) => {
    console.log(post)

    const [showPicker2, setShowPicker2] = useState(false);

    const handleDeletePost = async (onTarget: string) => {
        if (onTarget === "Delete") {
            if (!post?.id) {
                toast.error("Post ID not found!");
                return;
            }

            const deletePost = await DeletePost(post.id);

            if (deletePost?.success) {
                toast.success(deletePost.message);
            } else {
                toast.error(deletePost?.message || "Failed to delete post.");
            }
        }
    };
    return (
        <div
            onClick={() => {
                setPupUp((prev) => ({ ...prev, message: !prev.message }))
                setShowPicker2(!showPicker2)
            }}
            className="fixed inset-0 flex items-center justify-center bg-[#000000e5] z-[99] p-4"
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
                        src={post?.image.url}
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
                                src={user?.avatar?.url||"https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"}
                                height={40}
                                width={40}
                                alt="User Avatar"
                                className="rounded-full border p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 w-[50px] h-[50px] object-cover"
                            />
                            <p className="font-semibold  flex items-center gap-x-1 cursor-pointer">
                                {user?.name} <MdVerified color="#0095F6" />
                            </p>
                        </div>
                        <PiDotsThreeBold onClick={() => setPupUp((pre) => ({ ...pre, postSetting: !pre.postSetting }))} className="cursor-pointer" size={20} />
                    </div>

                    {/* Comments Section */}
                    <div className="flex-grow overflow-auto p-4 space-y-4 hidden md:block">
                        {post?.comments?.length === 0 ? (
                            <div className='h-full w-full flex justify-center items-center'>No Comments here</div>
                        ) : (
                            post?.comments?.map((comment: any, index: number) => (
                                <div key={index} className="flex gap-3">
                                    <Image
                                        src={comment?.user?.avatar?.url || "https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"}
                                        height={40}
                                        width={40}
                                        alt="User Avatar"
                                        className="rounded-full w-[40px] h-[40px] object-cover"
                                    />
                                    <div>
                                        <Link href={`/profile/${comment?.user?.username}`} className="font-semibold ">
                                            {comment.name} <MdVerified color="#0095F6" className="inline" />
                                            <span className="text-sm text-gray-300"> {comment.text}</span>
                                        </Link>
                                        <div className="flex gap-x-4 text-xs text-gray-400 cursor-pointer">
                                            <p>{format(comment?.createdAt)}</p>
                                            <p onClick={() => toast.error('Currently not available')}>Reply</p>
                                            <p>See translation</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

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
                        <p className="text-xs text-gray-300">{format(post?.createdAt)}</p>
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
                                ["Delete", "Edit", "Hide like count to others", "Turn off commenting", "Go to post", "Share to", "Copy link", "Embed", "About this account", "Cancel"].map((item, index) => (
                                    <h1 onClick={() => handleDeletePost(item)} key={index} className={`${index === 0 ? "text-red-600 " : "text-white"} ${index === 0 && "border-none"} text-sm text-center p-3  cursor-pointer font-semibold border-t mt-1 border-[#c4bfbf17]`}>{item}</h1>
                                ))
                            }


                        </motion.div>
                    </div>
                )
            }


        </div>
    )
}

export default UserModel