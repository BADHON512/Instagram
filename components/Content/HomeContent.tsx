"use client"
import { motion } from 'motion/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PostCard from '../helper/PostCard';
import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { StoriesCreate } from '@/@actions/Stories/StoriesCreate';
import { GetAllStories } from '@/@actions/Stories/getAllStories';
import toast from 'react-hot-toast';
import { CreateFollow } from '@/@actions/Follow/CreateFollow';

type Props = {
  user: any
  Posts: any
  users: any
  stories: any
}

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-[40%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
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
      className="absolute right-0 top-[40%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
    >
      <IoIosArrowForward />
    </button>
  );
};

const HomeContent = ({ user, Posts, users, stories }: Props) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [ReFetcher, setReFetcher] = useState(false)
  const [Stories, setStories] = useState<[]>(stories)
  const [Follow, setFollow] = useState<{ [key: string]: string }>({})

  const removeStories = (id: number) => {
    // if(visibleStories.length>6){
    //   setVisibleStories((pre)=>pre.filter((story)=>story.id!==id))
    // }

  }

  useEffect(() => {
    async function Fetcher() {
      const stories: any = await GetAllStories()
      setStories(stories.stories)

    }
    Fetcher()
  }, [ReFetcher])

  const settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 6,
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

  const handelImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        const imageData = reader.result as string;


        // Avatar স্টেট সেট হওয়ার পরেই API কল করো
        try {
          const stories = await StoriesCreate({ avatar: imageData });
          if (stories.success) {
            toast.success(stories.message)
            setReFetcher(true)
          }

        } catch (error) {
          console.error("Error uploading story:", error);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFollow = async (followingId: string) => {

    setFollow((pre) => ({ ...pre, [followingId]: pre[followingId] === "Following" ? "Follow" : "Following" }))
    const follow = await CreateFollow(followingId)

  }
  return (

    <div className=" w-[90%] md:w-[1100px] mx-auto ">
      <div className="flex justify-center  lg:justify-between">
        {/* leftSide */}
        <div className="w-[90%] md:w-[60%]  bg-black min-h-screen text-white flex flex-col items-center">

          {/* Story Section */}
          <div className="flex w-full items-center gap-x-2  mt-2 ">
            <label htmlFor='joiner' className="w-16 h-16 -mt-4">
              <input type="file" id='joiner' className='hidden' onChange={(e) => handelImage(e)} />
              <div className=" h-14 w-14 border flex justify-center items-center border-[#737373] rounded-full cursor-pointer">
                <BsPlusLg color="#737373" size={40} />
              </div>
              <p className='text-center mt-1 text-[12px] text-gray-400'>Create story</p>
            </label>
            <Slider {...settings} className="flex space-x-4 overflow-hidden w-[60%] md:w-full   p-5">


              {Stories?.map((story: any, index: number) => (
                <div onClick={() => removeStories(index)} className=" flex   flex-col justify-center items-center pt-2" key={index}>
                  <motion.div
                    key={story.id}
                    className="relative w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden cursor-pointer"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedStory(story?.image?.url)}
                  >
                    <Image height={500} width={500} src={story?.image?.url} alt={"img not found"} className="w-full h-full object-cover" />

                  </motion.div>
                  <div className="text-white text-xs py-1 text-center w-[70px] ">
                    {story?.user?.name?.length >= 8 ? story?.user?.name.slice(0, 8) + '...' : story?.user?.name}
                  </div>
                </div>
              ))}



            </Slider>
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
              Posts?.map((item, index) => (
                <PostCard key={index} post={item} />
              ))
            }

          </div>
        </div>


        {/* rightSide */}
        <div className="  max-w-[480px] mx-auto mt-10 hidden lg:block">

          <div className="flex justify-between items-center  gap-x-12">
            <div className="flex items-center w-full">
              <Image src={user?.avatar?.url||"https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"} height={500} width={500} alt='img not found' className='w-[60px] h-[60px] rounded-full' />
              <div className="ml-3">
                <Link href={"/profile-page"} className="text-sm font-semibold cursor-pointer">{user?.name}</Link>
                <p className="text-xs text-gray-500">{user?.username || "username"}</p>
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
              users?.map((item: any, index: number) => (

                <div key={index} className="flex justify-between items-center  gap-x-12">
                  <div className="flex items-center w-full">
                    <Image src={item?.avatar?.url} height={500} width={500} alt='img not found' className='w-[50px] h-[50px] rounded-full' />
                    <div className="ml-3">
                      <Link href={`/profile/${item?.username}`} className="text-sm font-semibold cursor-pointer">{item?.name}</Link>
                      <p className="text-xs text-gray-500">{item?.username}</p>
                    </div>
                  </div>
                  <span onClick={() => handleFollow(item?.id)} className={`${Follow[item.id] ? "text-white hover:text-[#e9e1e1] cursor-pointer text-sm" : "text-[#33adff] hover:text-white cursor-pointer text-sm"}`}>  {Follow[item.id] || "Follow"}</span>
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