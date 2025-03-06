"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BiSolidMessageRounded } from 'react-icons/bi';
import { GoHeartFill } from 'react-icons/go';
import MessageModel from '../helper/MessageModle';
import { GetComment } from '@/@actions/Comment/getCommet';
import { CreateSavePost } from '@/@actions/SavePost/createSavePost';
import toast from 'react-hot-toast';
import { CreateComment } from '@/@actions/Comment/createComment';


type Props = {
  Posts: any
}

const ExploreContent = ({ Posts }: Props) => {
  const [input, setInput] = useState<string>()
  console.log(Posts)
  const [PupUp, setPupUp] = useState({
    like: false,
    likeCount: 10032119,
    message: false,
    share: false,
    save: false,
    postSetting: false

  })
  console.log(PupUp.message)
  const handelLike = () => {
    setPupUp((pre) => ({ ...pre, like: !pre.like }))
    if (PupUp.like) {
      setPupUp((pre) => ({ ...pre, likeCount: pre.likeCount - 1 }))
    } else {
      setPupUp((pre) => ({ ...pre, likeCount: pre.likeCount + 1 }))
    }
  }
  const [comment, setComment] = useState<any>();
  console.log(comment)



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


  async function Fetcher(postId: string) {
    const Comments = await GetComment(postId)
    setComment(Comments.comments)
  }



  const handleComment = async (postId: string) => {
  toast.error('Currently not available')
  };
  const Send = (id: string) => {
    setPupUp((pre) => ({ ...pre, message: !pre.message }))
    Fetcher(id)
  }
  return (
    <div className="columns-3 md:columns-4 gap-2 p-2 max-w-[1170px] mx-auto mt-3">
      {Posts?.map((post: any) => (
        <div
          key={post.id}
          className="relative mb-2 break-inside-avoid"

        >
          <Image
            src={post?.image?.url}
            alt="Instagram post"
            width={400}
            height={post?.image?.height || 400}
            className="w-full h-auto rounded-lg object-cover cursor-pointer hover:opacity-75 transition duration-300"
          />
          <div onClick={() => Send(post?.id)} className="absolute top-0 left-0 w-full h-full bg-[#0e0c0c5e] opacity-0 hover:opacity-100 flex justify-center items-center gap-x-4 cursor-pointer">
            <div className="flex gap-x-2">
              <GoHeartFill size={25} className="text-white" />
              <span className="text-white">15</span>
            </div>
            <div className="flex gap-x-2">
              <BiSolidMessageRounded size={25} className="scale-x-[-1] text-white" />
              <span className="text-white">10</span>
            </div>
          </div>

          {
            PupUp.message && (
              <MessageModel PupUp={PupUp} setPupUp={setPupUp} post={post} input={input} setInput={setInput} handelLike={handelLike} comment={comment} handleComment={handleComment}/>
            )
          }
        </div>
      ))}
    </div>

  )
}

export default ExploreContent