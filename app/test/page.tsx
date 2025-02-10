"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const ShareLink = [
  { icon: "📷", link: "Instagram" },
  { icon: "📘", link: "Facebook" },
  { icon: "🐦", link: "Twitter" },
  { icon: "📌", link: "Pinterest" },
  { icon: "💬", link: "WhatsApp" },
];

const SocialSlider = () => {
  const controls = useAnimation();
  const [position, setPosition] = useState(0);
  const slideWidth = 100; // Adjust based on item size
  const maxPosition = -(ShareLink.length - 3) * slideWidth; // Limits movement

  const nextSlide = () => {
    if (position > maxPosition) {
      setPosition((prev) => prev - slideWidth);
      controls.start({ x: position - slideWidth });
    }
  };

  const prevSlide = () => {
    if (position < 0) {
      setPosition((prev) => prev + slideWidth);
      controls.start({ x: position + slideWidth });
    }
  };

  return (
    <div className="relative w-[95%] mx-auto overflow-hidden">
      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 z-10 bg-black text-white p-2 rounded-full top-1/2 -translate-y-1/2"
      >
        ◀
      </button>

      <motion.div
        className="flex gap-x-3"
        animate={controls}
        transition={{ type: "spring", stiffness: 200 }}
        drag="x"
        dragConstraints={{ left: maxPosition, right: 0 }}
      >
        {ShareLink.map((item, index) => (
          <div key={index} className="w-[80px] h-[80px] flex flex-col gap-y-1 items-center">
            <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-black text-white text-xl">
              {item.icon}
            </div>
            <span className="text-[12px] text-gray-300">{item.link}</span>
          </div>
        ))}
      </motion.div>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 z-10 bg-black text-white p-2 rounded-full top-1/2 -translate-y-1/2"
      >
        ▶
      </button>
    </div>
  );
};

export default SocialSlider;
