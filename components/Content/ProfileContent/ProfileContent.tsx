import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FiSettings, FiGrid, FiUserPlus, FiBookmark } from 'react-icons/fi';
import { BsPlusLg } from "react-icons/bs";
import Link from 'next/link';
import { BiSolidMessageRounded } from "react-icons/bi";
import { GoHeartFill } from "react-icons/go";
import axios from 'axios';
import toast from 'react-hot-toast';
import { UpdateProfile } from '@/@actions/user/updataProfile';
import MessageModel from '@/components/helper/MessageModle';
import UserModel from '@/components/helper/UserModel';


type Props = {
  user: any
  reFetcher: boolean
  setReFetcher: (reFetcher: boolean) => void
}

const ProfileContent = ({ user, reFetcher, setReFetcher }: Props) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [EditProfileShow, setEditProfileShow] = useState(false)
  const [avatar, setAvatar] = useState<string>(user?.avatar?.url)
  const [updateProfile, setUpdataProfile] = useState({
    bio: "",
    gender: "Male"
  })
  const [input, setInput] = useState()
  const words = user?.bio?.split(" ");
  const visibleText = showMore ? user?.bio : words?.slice(0, 10).join(" ");
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [PupUp, setPupUp] = useState({
    like: false,
    likeCount: 8,
    message: false,
    share: false,
    save: false,
    postSetting: false

  })

  const handelLike = () => {
    setPupUp((pre) => ({ ...pre, like: !PupUp.like, likeCount: pre.like ? pre.likeCount + 1 : pre.likeCount - 1 }))
  }



  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    if (activeButton) {
      setUnderlineStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth
      });
    }

  }, [activeTab]);

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fileReader = new FileReader()
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const imageUrl = fileReader.result as string;
        setAvatar(imageUrl);
        await UpdateProfile(imageUrl); 
        setReFetcher(!reFetcher)
      }
    }
    fileReader.readAsDataURL(file)


  }
  const handleUpdataProfile = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      bio: updateProfile.bio,
      gender: updateProfile.gender
    }

    await axios.put("/api/profile-update", data).then((res) => {

      toast.success(res.data.message)
      setReFetcher(!reFetcher)
      setEditProfileShow(false)
    }).catch((error) => {
      toast.error("You can not update at a time")
    })

  }
  return (
    <div className='max-w-[940px] mx-auto pt-8 px-4'>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative h-[150px] w-[150px] rounded-full overflow-hidden border-2 border-gray-300 z-[-1]">
            <Image
              src={user?.avatar?.url || "https://res.cloudinary.com/dfng3w9jm/image/upload/v1740510861/instagram-clone-stories/Profile_y0cbxs.png"}
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
            <h1 className="text-2xl font-light">{user?.name}</h1>
            <button onClick={() => setEditProfileShow(true)} className='px-4 py-1 text-sm font-medium bg-[#ccc9c985] rounded-lg hover:bg-[#262626]'>
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
              <span className="font-semibold">{user?.posts?.length}</span> posts
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{user?.followers?.length}</span> followers
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{user.following?.length}</span> following
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="break-words">
              {visibleText}
              {!showMore && words?.length > 10 && "..."}
              {words?.length > 10 && (
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
        <div className="relative border-t border-[#737373] mt-4 z-[1]">
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

      <div className="min-h-[30vh] flex w-full flex-wrap gap-2  justify-center md:justify-start p-3">
        {activeTab === 'posts' && (
          user?.posts?.length === 0 ? (
            <div className="text-center text-gray-500 h-[30vh] w-[20vw] flex justify-center items-center">No posts available</div>
          ) : (
            user?.posts?.map((item: any, index: number) => (
              <div key={index} className="min-h-[310px] w-[288px] flex-shrink-0 relative group">
                <div className='h-full w-full block'>
                  <Image
                    src={item?.image?.url}
                    alt='img not found'
                    height={1000}
                    width={1000}
                    className='h-full w-full cursor-pointer object-cover'
                  />
                </div>

                {/* Overlay & Icons */}
                <div      onClick={() => {
        setPupUp((pre) => ({ ...pre, message: !pre.message }));
        setSelectedPost(item); // ✅ শুধুমাত্র ক্লিক করা পোস্ট সেট করো
      }}className="absolute top-0 left-0 w-full h-full bg-[#0e0c0c5e] opacity-0 hover:opacity-100 flex justify-center items-center gap-x-4 cursor-pointer">
                  <div className="flex gap-x-2">
                    <GoHeartFill size={25} className="text-white" />
                    <span className="text-white">{user?.likes?.length}</span>
                  </div>
                  <div className="flex gap-x-2">
                    <BiSolidMessageRounded size={25} className="scale-x-[-1] text-white" />
                    <span className="text-white">{user?.comments?.length}</span>
                  </div>
                </div>

                {PupUp.message && (
                  <UserModel PupUp={PupUp} setPupUp={setPupUp} post={selectedPost} user={user} input={input} setInput={setInput} handelLike={handelLike} />
                )}
              </div>
            ))
          )
        )}


        {activeTab === 'saved' && (
          user?.savePost.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center flex-col  mt-8 space-y-2 p-5">
              <svg aria-label="Saved" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>Saved</title><path d="M80 48a16 16 0 1 1-32 0 16 16 0 0 1 32 0ZM48 80a16 16 0 1 1 0-32 16 16 0 0 1 0 32Z"></path><path d="M64 64a16 16 0 1 1-32 0 16 16 0 0 1 32 0Z"></path></svg>
              <h1 className='text-2xl font-semibold'>Save</h1>
              <p className='text-gray-400'>Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.</p>
            </div>
          ) : (
            user?.savePost.map((item: any, index: number) => (
              <div key={index} className="h-[310px]  w-[288px] flex-shrink-0 relative group"> {/* Added 'group' here */}
                <div className='h-full w-full '> {/* Make sure Link is block-level */}
                  <Image
                    src={item?.post?.image?.url}
                    alt='img not found'
                    height={1000}
                    width={1000}
                    className='h-full w-full'
                  />
                </div>

                {/* Overlay & Icons */}
                <Link href={`/profile/${item?.post?.user?.username}`} className="absolute top-0 left-0 w-full h-full bg-[#0e0c0c5e] opacity-0 hover:opacity-100   flex  items-end gap-x-4 cursor-pointer">

                  <span className='font-semibold p-5 text-[18px]'>All post</span>
                </Link>
              </div>
            )))

        )}


        {activeTab === 'tagged' && (
          <div className="w-full h-full flex justify-center items-center flex-col  mt-8 space-y-2 p-5">


            <svg aria-label="Photos of you" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>Photos of you</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M56.826 44.119a8.824 8.824 0 1 1-8.823-8.825 8.823 8.823 0 0 1 8.823 8.825Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></path><path d="M63.69 67.999a9.038 9.038 0 0 0-9.25-8.998H41.56A9.038 9.038 0 0 0 32.31 68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M48 20.215c-2.94 0-7.125 8.76-11.51 8.785h-4.705A8.785 8.785 0 0 0 23 37.784v22.428a8.785 8.785 0 0 0 8.785 8.785h32.43A8.785 8.785 0 0 0 73 60.212V37.784A8.785 8.785 0 0 0 64.215 29h-4.704c-4.385-.026-8.57-8.785-11.511-8.785Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></path></svg>

            <h1 className='text-[25px] font-bold'>Photos of you</h1>

            <p>When people tag you in photos, they&#39;ll appear here.</p>
          </div>
        )}


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
      <div className="text-sm text-gray-500 flex gap-x-4 justify-center pb-10">
        <p>English </p>
        <p>&copy; 2025 Instagram from Meta</p>
      </div>

      {
        EditProfileShow && (
          <div onClick={() => setEditProfileShow(false)} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleUpdataProfile} className="max-w-2xl mx-auto p-4 bg-[#262626]  rounded-lg">
              {/* Header */}
              <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">

                  {avatar ? (
                    <Image
                      src={avatar}
                      alt="Profile Picture"
                      height={100}
                      width={100}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-500">MB</span>
                  )}





                </div>
                <div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-gray-500">{user?.username || "username"}</p>
                </div>

                <label htmlFor="change" className="ml-auto cursor-pointer hover:bg-blue-700 bg-blue-600 text-white py-1 px-2 rounded-md font-medium">
                  Change photo
                  <input type="file" id='change' className='hidden' onChange={imageHandler} />
                </label>
              </div>

              {/* Website Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Website</label>
                <div className="space-y-2">
                  <div className="p-2 cursor-not-allowed rounded bg-[#1A1A1A] border border-[#b9b4b45e]  outline-none">https://badhon/portfolio.com</div>

                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.
                </p>
              </div>

              {/* Bio Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={updateProfile.bio}
                  onChange={(e) => setUpdataProfile((pre) => ({ ...pre, bio: e.target.value }))}
                  className="w-full p-2 rounded-md h-32 resize-none bg-[#1A1A1A] border border-[#b9b4b45e]  outline-none"
                  required
                />
                <div className="text-right text-sm text-gray-500 mt-1">144 / 150</div>
              </div>

              {/* Gender Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  value={updateProfile.gender}
                  onChange={(e) => setUpdataProfile((pre) => ({ ...pre, gender: e.target.value }))}
                  className="w-full p-2 bg-[#1A1A1A] border border-[#b9b4b45e] cursor-pointer outline-none rounded-md"
                  required
                >
                  <option className='cursor-pointer'>Male</option>
                  <option className='cursor-pointer'>Female</option>
                  <option className='cursor-pointer'>Other</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">This won't be part of your public profile.</p>
              </div>

              {/* Account Suggestions */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-medium">Show account suggestions on profiles</p>
                  <p className="text-sm text-gray-500">Choose whether people can see similar account suggestions...</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"

                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button type='submit' className='ml-auto block hover:bg-blue-700 bg-blue-600 text-white py-1 px-2 rounded-md font-medium'>Update profile</button>

            </form>
          </div>

        )
      }



    </div >
  )
}

export default ProfileContent