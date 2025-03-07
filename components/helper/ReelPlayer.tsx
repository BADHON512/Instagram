"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { HiSpeakerWave } from "react-icons/hi2";
import { PiSpeakerSlashFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { LiaBookmarkSolid } from "react-icons/lia";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaMusic } from "react-icons/fa6";
import { IoPlay, } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import Image from "next/image";
import { motion } from "framer-motion";


type Props = {
    reel: {
        id: number;
        videoUrl: string;
        likes: number;
        comments: number;

    }

    isMuted: boolean;
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReelPlayer = ({ reel, isMuted, setIsMuted }: Props) => {
    const [Like, setLike] = useState<number>(reel.likes)
    const text = 'Listen to millions of songs, watch music videos, and experience live performances all on Apple '
    const Words = text.split("");
    const isLongText = Words.length > 50;

    const [heartClick, setHeartClick] = useState(false);
    const [pupUp, setPupUp] = useState({
        message: false,
        threeDots: false
    })

    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [ThreeDots, setThreeDots] = useState<boolean>(false)


    const fullText: [string] = ["Lorem ipsum dolor sit molestiae non blanditiis! abad;asldkjf asdfoiasdjf asdfiasd foas[pdof asdopf  asdf asdf asdf asd fasdfasd fasdfasdf  asd fasdf adsf af a faf asf asdf"]
    const words = fullText[0].split(" ");
    const [showMore, setShowMore] = useState(false);
    const visibleText = showMore ? fullText : words.slice(0, 8).join(" ")

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev); // আগের স্টেটের উল্টো হবে
    };
    const playerRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsPlaying(entry.isIntersecting); // স্ক্রিনে এলে প্লে, চলে গেলে পজ
            },
            { threshold: 0.7 } // ৭০% ভিডিও স্ক্রিনে এলে প্লে হবে
        );

        if (playerRef.current) {
            observer.observe(playerRef.current);
        }

        return () => {
            if (playerRef.current) {
                observer.unobserve(playerRef.current);
            }
        };
    }, []);

    const handleLike = (like: number) => {
        setHeartClick(!heartClick)
        setLike((pre) => (!heartClick ? pre + 1 : pre - 1))
    }
    return (
        <div className="h-screen  bg-black flex justify-center items-center relative overflow-y-auto">
            <motion.div

                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}

            >

                <div className="flex w-full  gap-x-5 ">
                    <div className="flex relative h-full w-[350px] md:w-[450px]">
                        <div ref={playerRef} className="h-full w-full border border-[#80808081] rounded-sm">
                            <ReactPlayer
                                url={reel.videoUrl}
                                playing={isPlaying}
                                loop
                                muted={isMuted}
                                width="100%"
                                height="100%"
                                className="object-cover cursor-pointer rounded-md "
                                onClick={togglePlayPause}

                            />
                        </div>

                        {
                            isMuted ? (< PiSpeakerSlashFill className="absolute top-4 right-4 bg-[#262626] w-[30px] h-[30px] rounded-full p-1 cursor-pointer" size={25} onClick={() => setIsMuted(!isMuted)} />) : (< HiSpeakerWave className="absolute top-4 right-4 bg-[#262626] w-[30px] h-[30px] rounded-full p-1 cursor-pointer" size={25} onClick={() => setIsMuted(!isMuted)} />
                            )

                        }

                        <motion.div
                            initial={{ scale: 1, y: 0 }}
                            animate={{
                                scale: isPlaying ? 0 : 1.5,
                                y: isPlaying ? 0 : 1.5,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-[45%] left-[45%] w-16 h-16 bg-[#3a2e2e] rounded-full flex items-center justify-center cursor-pointer"
                            onClick={togglePlayPause}
                        >
                            <IoPlay size={30} className="text-white" />
                        </motion.div>


                        <div className="absolute bottom-2 left-1  w-full">
                            <div className="flex  items-center gap-x-3 p-3">
                                <Image src="https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" height={500} width={500} className='h-[30px] w-[30px]  rounded-full' alt="" />
                                <span>badhon_9090 . </span>
                                <button className="px-3 border border-[#91db6038] rounded-full bg-transparent">Follow</button>
                            </div>


                            <div className="px-3">
                                {/* Animated Expandable Text */}
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-sm cursor-pointer" onClick={() => setShowMore(!showMore)}>{visibleText}</span>
                                </motion.div>

                                {/* Animate "More" & "Show Less" Buttons */}

                                <div className="">
                                    {!showMore ? (
                                        <motion.span

                                            className="text-[12px] text-gray-200 cursor-pointer ml-1"
                                            onClick={() => setShowMore(true)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            ... more
                                        </motion.span>
                                    ) : (
                                        <motion.span

                                            className="text-[12px]cursor-pointer "
                                            onClick={() => setShowMore(false)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >

                                        </motion.span>
                                    )}

                                </div>


                            </div>

                            <div className="  w-full mx-auto py-1">
                                <div className="h-[30px] rounded-3xl w-[90%] bg-[#3e3c5a96] mx-auto">

                                    <div className=" relative flex items-center h-full px-1 overflow-hidden  ">
                                        {/* 🎵 Static Music Icon (Does NOT Animate) */}
                                        <div className="absolute top-0 left-0 bottom-0 badhon-left bg-[#3e3c5a] z-20 h-[30px] px-2  -ml-[5px] flex items-center justify-center">
                                            <FaMusic className="" />
                                        </div>


                                        <div className="">
                                            {isLongText ? (
                                                // Animated Marquee Effect
                                                <motion.div
                                                    className="whitespace-nowrap overflow-hidden "

                                                    animate={{
                                                        x: ["100%", "-100%"], // ১০০% থেকে -১০০% পর্যন্ত অ্যানিমেশন হবে
                                                    }}
                                                    transition={{
                                                        repeat: Infinity, // ইনফিনিটি লুপে চলবে
                                                        duration: 20, // ৫ সেকেন্ডে একবার কমপ্লিট হবে
                                                        ease: "linear", // স্মুথ মোশন
                                                    }}
                                                >
                                                    {text}
                                                </motion.div>
                                            ) : (

                                                <span className="whitespace-nowrap">{text}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className=" flex gap-y-5 flex-col justify-end  py-3 relative">
                        <div

                            className=" flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]" onClick={() => handleLike(reel.likes)}>
                            <motion.div
                                whileTap={{ scale: 0.8 }} // Adds a small pop effect
                                animate={{ scale: heartClick ? 1.2 : 1 }} // Increases size slightly when liked
                                transition={{ type: "spring", stiffness: 300, damping: 10 }} >
                                {
                                    heartClick ? (<FaHeart size={30} className="text-red-500" />) : (<FaRegHeart size={30} />)
                                }
                            </motion.div>
                            <span className="text-sm">{Like} </span>
                        </div>
                        <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a] relative" onClick={() => setPupUp((pre) => ({ ...pre, message: !pupUp.message }))}>
                            <FiMessageCircle size={30} className="scale-x-[-1]" />
                            <span className="text-sm">10k</span>

                            {/* <div className="absolute top-0 left-20 bg-gray-100 h-full w-full">
                                badhon
                            </div> */}
                        </div>

                        <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
                            <LuSend size={30} />

                        </div>
                        <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
                            <LiaBookmarkSolid size={30} />

                        </div>
                        <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a] ">
                            <PiDotsThreeBold size={30} onClick={() => setThreeDots(!ThreeDots)} />

                            {
                                ThreeDots && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.1 }}
                                        className="absolute md:-left-10 md:bottom-32 xl:left-2 xl:bottom-24 bg-[#262626] min-h-[300px] md:w-[250px] bottom-32 w-[200px] rounded-lg">
                                        <div className="flex flex-col gap-y-2 p-2 ">
                                            {
                                                ["Report", "Follow", "Go to post", "Share to...", "Copy link", "Embed", "About this account"].map((item, index) => (
                                                    <span key={index} className={` ${index === 0 && "!text-red-500"} ${index === 1 && "text-green-500"} text-sm hover:bg-[#3C3C3C] text-white py-2 px-3 rounded-md font-semibold`}>{item}</span>
                                                ))
                                            }


                                        </div>

                                    </motion.div>
                                )
                            }

                        </div>

                        <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
                            <Image src="https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg" height={500} width={500} className='h-[30px] w-[30px]  rounded-md border border-gray-300' alt="" />

                        </div>
                    </div>
                </div>




            </motion.div>




        </div>
    )
}

export default ReelPlayer