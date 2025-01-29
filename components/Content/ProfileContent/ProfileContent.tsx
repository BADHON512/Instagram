import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FiSettings, FiGrid, FiUserPlus, FiBookmark } from 'react-icons/fi';
import { BsPlusLg } from "react-icons/bs";


type Props = {}

const ProfileContent = (props: Props) => {
  const text = "🎨 Front-End Developer 🚀 | Creating Engaging Web Experiences ✨ | HTML/CSS Wizard 🌟 | UI/UX Enthusiast 🌐 | Let's Build the Web of Tomorrow! 🌈";
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');

  const words = text.split(" ");
  const visibleText = showMore ? text : words.slice(0, 10).join(" ");
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  console.log(tabsRef)
  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    if (activeButton) {
      setUnderlineStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth
      });
    }
  }, [activeTab]);
  return (
    <div className='max-w-[940px] mx-auto pt-8 px-4'>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative h-[150px] w-[150px] rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={'https://res.cloudinary.com/dfng3w9jm/image/upload/v1737220875/profile/badhon.jpg'}
              layout="fill"
              objectFit="cover"
              alt='Profile picture'
              priority
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-grow w-full">
          {/* Username and Actions */}
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-light">badhon_9090</h1>
            <button className='px-4 py-1 text-sm font-medium bg-[#ccc9c985] rounded-lg hover:bg-[#262626]'>
              Edit Profile
            </button>
            <button className='px-4 py-1 text-sm font-medium bg-[#ccc9c985] rounded-lg hover:bg-[#262626]'>
              View archive
            </button>
            <button className='p-2'>
              <FiSettings size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mb-4">
            <div className="flex gap-1">
              <span className="font-semibold">500</span> posts
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">15k</span> followers
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">90k</span> following
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="break-words">
              {visibleText}
              {!showMore && words.length > 10 && "..."}
              {words.length > 10 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="ml-1 text-blue-900 hover:text-blue-700 font-medium"
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              )}
            </p>
          </div>


        </div>
      </div>




        <div className="mt-14 h-[80px] w-[80px] border flex justify-center items-center border-[#737373] rounded-full cursor-pointer">
          <BsPlusLg color="#737373" size={50} />
        </div>
        <p className='ml-6 mt-3'>New</p>


    



      <div className="mt-14">
        <div className="relative border-t border-[#737373] mt-4">
          <div className="flex justify-center gap-16 relative">
            {/* Animated Underline - Fixed */}
            <div
              className="absolute top-0 h-0.5 bg-[#ffffff] transition-all duration-300"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`
              }}
            />

            {/* Posts Tab - Fixed color */}
            <button
              ref={el => tabsRef.current['posts'] = el}
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-2 py-4 text-xs font-medium ${activeTab === 'posts' ? 'text-[#737373]' : 'text-gray-400'
                }`}
            >
              <FiGrid className="h-4 w-4" />
              POSTS
            </button>

            {/* Saved Tab - Fixed color */}
            <button
              ref={el => tabsRef.current['saved'] = el}
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 py-4 text-xs font-medium ${activeTab === 'saved' ? 'text-[#737373]' : 'text-gray-400'
                }`}
            >
              <FiBookmark className="h-4 w-4" />
              SAVED
            </button>

            {/* Tagged Tab - Fixed color */}
            <button
              ref={el => tabsRef.current['tagged'] = el}
              onClick={() => setActiveTab('tagged')}
              className={`flex items-center gap-2 py-4 text-xs font-medium ${activeTab === 'tagged' ? 'text-[#737373]' : 'text-gray-400'
                }`}
            >
              <FiUserPlus className="h-4 w-4" />
              TAGGED
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-[20vh] flex w-full flex-wrap gap-2 bg-red-500 justify-start p-3">
  <div className="h-[310px] bg-white w-[288px] flex-shrink-0"></div> {/* First item */}
  <div className="h-[310px] bg-white w-[288px] flex-shrink-0"></div> {/* Second item */}
  <div className="h-[310px] bg-white w-[288px] flex-shrink-0"></div> {/* Third item */}
  <div className="h-[310px] bg-white w-[288px] flex-shrink-0"></div> {/* Fourth item */}
  <div className="h-[310px] bg-white w-[288px] flex-shrink-0"></div> {/* Fifth item */}
  <div className="h-[310px] bg-white w-[288px] flex-shrink-0"></div> {/* Sixth item */}
  <div className="h-[310px] bg-white w-[288px] flex-shrink-0"></div> {/* Sixth item */}
</div>

     {/* Footer Links */}
     <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4 mt-10">
        {[
          'Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms',
          'Locations', 'Instagram Like', 'Threads', 'Contact', 'Uploading & Non-Users', 'Meta Verified'
        ].map((link) => (
          <span key={link} className=" cursor-pointer">
            {link}
          </span>
        ))}
      </div>

 

      {/* Language Section */}
      <div className="text-sm text-gray-500 flex gap-x-4 justify-center">
        <p>English </p>
        <p>&copy; 2025 Instagram from Meta</p>
      </div>
  
   

    </div>
  )
}

export default ProfileContent
