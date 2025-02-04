import Image from 'next/image'
import React from 'react'

type Props = {}

const ExploreContent = (props: Props) => {
    const exploreData = [
        { id: 1, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282258/cld-sample-2.jpg", type: "image" },
        { id: 2, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282259/cld-sample-4.jpg", type: "image" },
        { id: 3, src: "https://res.cloudinary.com/dfng3w9jm/image/upload/v1680282259/cld-sample-4.jpg", type: "image" },
        { id: 4, src: "/images/4.jpg", type: "image" },
        { id: 5, src: "/images/5.jpg", type: "image" },
        { id: 6, src: "/images/6.jpg", type: "image" },
        { id: 7, src: "/images/7.jpg", type: "image" },
        { id: 8, src: "/images/8.jpg", type: "image" },
        { id: 9, src: "/images/9.jpg", type: "image" },
      ];
  return (
    <div className="grid grid-cols-3 gap-1 p-2 md:gap-2">
    {exploreData.map((item, index) => (
      <div key={item.id} className={`relative ${index % 5 === 0 ? "col-span-2 row-span-2" : ""}`}>
        <Image
          src={item.src}
          alt="Instagram post"
          layout="responsive"
          width={200}
          height={200}
          className="rounded-lg object-cover cursor-pointer hover:opacity-75 transition duration-300"
        />
      </div>
    ))}
  </div>
  )
}

export default ExploreContent