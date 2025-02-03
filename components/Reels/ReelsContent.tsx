"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
import { HiSpeakerWave } from "react-icons/hi2";
import { PiSpeakerSlashFill } from "react-icons/pi";

import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { LiaBookmarkSolid } from "react-icons/lia";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaMusic } from "react-icons/fa6";
import { IoPlay } from "react-icons/io5";


import Image from "next/image";

type Props = {}

const ReelsContent = (props: Props) => {

  const reelsData = [
    {
      id: 1,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419061/reels%20video/AQNt_GW4sHTDHGKJs1kxdkTISQ06v0hLX54IJNjZuLf2MLah7NqCURiAaSOe7uBHLTaCaelKoCjzrpHJipVojULUOnmu6Fs-E-wYlb0_kbbwfe.mp4",
      likes: 120,
      comments: 30,
    },
    {
      id: 2,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419061/reels%20video/One_of_the_greatest_skills_you_can_learn_is_how_to_be_alone..._lanatureshub_losangeles_usa_newyork_dallas_sanfrancisco_canada_california_chicago_sandiego_beach_ocean_florida_america_instadaily_uvrwhs.mp4",
      likes: 200,
      comments: 50,
    },
    {
      id: 3,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419086/reels%20video/I_used_to_look_at_landscapes_in_movies_and_would_think_to_myself_if_places_like_these_really_exist._When_I_started_traveling_myself_I_found_out_that_places_even_better_than_those_exist._I_saw_locations_never_ever_s_jgxif3.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 5,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419067/reels%20video/Schwende_Switzerland_Follow_for_daily_Swiss_Content_Want_to_know_the_exact_location_of_this_spot_Check_the_link_in_my_bio_Save_this_for_your_trip_to_Switzerland_by-_swisswoow_schwende_alpstein_appen_xv1np1.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 6,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419064/reels%20video/The_gentle_rhythm_of_two_calming_waves_intertwining_creates_a_serene_atmosphere._As_they_meet_they_produce_a_soothing_melody_the_soft_rush_of_water_blending_with_the_tranquil_sounds_of_the_ocean._This_harmonio_1_imhqry.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 7,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419062/reels%20video/Snapsave.app_-f71qsartrtJQvYgFNZH1loGOoeOiLdhM_mglxax.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 8,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419062/reels%20video/Feel_The_Vibe_Sukoon_...._reelkrofeelkro_reelsinstagram_reelitfeelit_trendingreels_trendingnow_trending_summer_tulipgarden_tulipgardenkashmir_tulipgardensrinagar_summervibes_summerinkashmir_summer_tra_w8ggz5.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 9,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419087/reels%20video/The_whirlpool_under_this_river_was_absolutely_amazing_.Captured_in_New_Zealand_.More_johnderting_._newzealand_dn2wxo.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 12,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419101/reels%20video/__48m.66_Reel_Real_._._._._._._._Like_comment_and_follow_._._._._._._._._alhamdulillah_foryoupage_foryou_islam_explorepage_quranpost_muslim_dark_darkedits_48m.66_viralreels_dark_nasheed_ufbqwu.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 13,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419063/reels%20video/But_no_internet_HighRes_wallpaper_download_link_in_bio._afternoonvibes_home_nature_peace_sunset_chilltime_homelife_naturewalk_peaceful_sunsetviews_relaxing_homedecor_naturephotography_serenity_sunsetl_gsbp4c.mp4",
      likes: 300,
      comments: 70,
    },
    {
      id: 14,
      videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419063/reels%20video/Snapsave.app_AQO29lQee5aLbrOaRQg6vbQiY37VitI5Y8WThEXteSQ7FpQk0vB_7SFt3saYEOjYMCqynr0azOenq5SBQaAeoZ0j_zsciur.mp4",
      likes: 300,
      comments: 70,
    },
  ];
  const text = 'my music is the my name is badhon best music hello'
  const Words = text.split("");
  const isLongText = Words.length > 50;

  const [currentReel, setCurrentReel] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);


  const fullText: [string] = ["Lorem ipsum dolor sit molestiae non blanditiis! abad;asldkjf asdfoiasdjf asdfiasd foas[pdof asdopf  asdf asdf asdf asd fasdfasd fasdfasdf  asd fasdf adsf af a faf asf asdf"]
  const words = fullText[0].split(" ");
  const [showMore, setShowMore] = useState(false);
  const visibleText = showMore ? fullText : words.slice(0, 8).join(" ")

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev); // আগের স্টেটের উল্টো হবে
  };
  return (
    <div className="h-screen  bg-black flex justify-center items-center relative overflow-y-auto">
      <motion.div
        key={currentReel}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}

      >

        <div className="flex w-full  gap-x-5 ">
          <div className="flex relative h-full w-[350px] md:w-[450px]">
            <ReactPlayer
              url={'https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419061/reels%20video/One_of_the_greatest_skills_you_can_learn_is_how_to_be_alone..._lanatureshub_losangeles_usa_newyork_dallas_sanfrancisco_canada_california_chicago_sandiego_beach_ocean_florida_america_instadaily_uvrwhs.mp4'}
              playing={isPlaying}
              loop
              muted={isMuted}
              width="100%"
              height="100%"
              className="object-cover cursor-pointer rounded-md"
              onClick={togglePlayPause}

            />

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
                <div className="h-[30px] rounded-3xl w-[90%] bg-[#5a443c96] mx-auto">

                  <div className=" relative flex items-center h-full px-1 overflow-hidden  ">
                    {/* 🎵 Static Music Icon (Does NOT Animate) */}
                    <div className="absolute top-0 left-0 bottom-0 badhon-left bg-[#5a443c] z-20 h-[30px] px-2  -ml-[5px] flex items-center justify-center">
                      <FaMusic className="" />
                    </div>


                    <div className="">
                      {isLongText ? (
                        // Animated Marquee Effect
                        <motion.div
                          className="whitespace-nowrap "

                          initial={{ x: 0 }} // ডান দিক থেকে শুরু হবে
                          animate={{ x: ["0%", "-100%"] }} // সম্পূর্ণ বাঁ দিকে যাব
                          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
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


          <div className=" flex gap-y-5 flex-col justify-end  py-3">
            <div className=" flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
              <FaRegHeart size={30} />
              <span className="text-sm">33.2M</span>
            </div>
            <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
              <FiMessageCircle size={30} className="scale-x-[-1]" />
              <span className="text-sm">10k</span>
            </div>

            <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
              <LuSend size={30} />

            </div>
            <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
              <LiaBookmarkSolid size={30} />

            </div>
            <div className="flex flex-col justify-center items-center w-[40px] cursor-pointer hover:text-[#a79a9a]">
              <PiDotsThreeBold size={30} />

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

export default ReelsContent