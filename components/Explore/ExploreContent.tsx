import Image from 'next/image'
import React from 'react'
import { BiSolidMessageRounded } from 'react-icons/bi';
import { GoHeartFill } from 'react-icons/go';

type Props = {}

const ExploreContent = (props: Props) => {
  const exploreData = [
    { id: 1, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282258/cld-sample-2.jpg", type: "image" },
    { id: 2, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282259/cld-sample-4.jpg", type: "image" },
    { id: 3, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282259/cld-sample-4.jpg", type: "image" },
    { id: 4, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282241/samples/people/boy-snow-hoodie.jpg", type: "image" },
    { id: 5, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282243/samples/landscapes/beach-boat.jpg", type: "image" },
    { id: 6, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282243/samples/people/bicycle.jpg", type: "image" },
    { id: 7, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282242/samples/animals/three-dogs.jpg", type: "image" },
    { id: 8, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282240/samples/bike.jpg", type: "image" },
    { id: 9, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282238/samples/food/fish-vegetables.jpg", type: "image" },
    { id: 10, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282233/sample.jpg", type: "image" },

    { id: 11, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282246/samples/food/spices.jpg", type: "image" },

    { id: 12, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282258/cld-sample-3.jpg", type: "image" },
  ];
  return (
    <div className="grid grid-cols-3 gap-1 p-2 md:gap-2 max-w-[1170px] mx-auto">
      {exploreData.map((item, index) => (
        <div key={item.id} className={`relative `}>
          <Image
            src={item.src}
            alt="Instagram post"
            layout="responsive"
            width={200}
            height={200}
            className="rounded-lg object-cover cursor-pointer hover:opacity-75 transition duration-300"
          />

              <div className="absolute top-0 left-0 w-full h-full bg-[#0e0c0c5e] opacity-0 hover:opacity-100   flex justify-center items-center gap-x-4 cursor-pointer">
                        <div className="flex gap-x-2">
                          <GoHeartFill size={25} className="text-white" />
                          <span className="text-white">15</span>
                        </div>
                        <div className="flex gap-x-2">
                          <BiSolidMessageRounded size={25} className="scale-x-[-1] text-white" />
                          <span className="text-white">10</span>
                        </div>
                      </div>
        </div>
      ))}
    </div>
  )
}

export default ExploreContent