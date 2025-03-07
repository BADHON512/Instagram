"use client";
import React, { useState } from "react";
import ReelPlayer from "../helper/ReelPlayer";

type Props = {
  reelsData:{
    id: number;
    videoUrl: string;
    likes: number;
    comments: number;
}[]
}

const ReelsContent = ({reelsData}: Props) => {
    const [isMuted, setIsMuted] = useState(true);
    





  return (
    <div className="">
      {
        reelsData?.map((reel,id)=>(
          <div key={id} className="w-full h-[100vh] relative">
            <ReelPlayer reel={reel} isMuted={isMuted} setIsMuted={setIsMuted} />
          </div>
        ))
      }
    </div>
  )
}

export default ReelsContent