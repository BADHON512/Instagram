


"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Nute = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 overflow-hidden">
      {/* Moving Background Text */}
      <motion.div
        className="absolute text-gray-200 text-9xl font-bold opacity-10"
        animate={{ x: [0, -200, 200, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        LEARN ANYTHING
      </motion.div>

      {/* Logo or Title */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800 relative z-10">Learn Anything</h1>

      {/* Search Bar */}
      <div className="w-full max-w-2xl relative z-10">
        <input
          type="text"
          placeholder="Search for any topic..."
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
        />
      </div>

      {/* Suggested Topics */}
      <div className="mt-8 w-full max-w-3xl text-center relative z-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Popular Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["JavaScript", "React", "Next.js", "AI", "Blockchain", "Cybersecurity"].map((topic) => (
            <motion.button
              key={topic}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200"
              animate={{ y: scrollY * 0.1 }}
            >
              {topic}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Nute