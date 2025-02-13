"use client"
import axios from "axios";
import { error } from "console";
import { useState } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  profile?: {
    bio: string;
    avatarUrl: string;
  };
};

const UserInput = () => {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    profile: { bio: "", avatarUrl: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "bio" || name === "avatarUrl") {
      setUser((prev) => ({
        ...prev,
        profile: { ...prev.profile, [name]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/me',{user}).then((res)=>alert("working")).catch((error)=>alert(error))
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded-lg w-96 bg-white shadow-lg">
        <h2 className="text-xl font-semibold text-center">Create User Profile</h2>
        <input type="text" name="username" placeholder="Username" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange}></textarea>
        <input type="text" name="avatarUrl" placeholder="Avatar URL" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition">Submit</button>
      </form>
      {user.username && (
        <div className="border p-6 rounded-lg w-96 flex flex-col items-center bg-white shadow-lg">
          {user.profile?.avatarUrl && <img src={user.profile.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-blue-500" />}
          <h2 className="text-lg font-bold mt-3">{user.username}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-800 mt-2">{user.profile?.bio}</p>
        </div>
      )}
    </div>
  );
};

export default UserInput;


// "use client"
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const Nute=()=> {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 overflow-hidden">
//       {/* Moving Background Text */}
//       <motion.div
//         className="absolute text-gray-200 text-9xl font-bold opacity-10"
//         animate={{ x: [0, -200, 200, 0], rotate: [0, 10, -10, 0] }}
//         transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//       >
//         LEARN ANYTHING
//       </motion.div>

//       {/* Logo or Title */}
//       <h1 className="text-4xl font-bold mb-6 text-gray-800 relative z-10">Learn Anything</h1>
      
//       {/* Search Bar */}
//       <div className="w-full max-w-2xl relative z-10">
//         <input
//           type="text"
//           placeholder="Search for any topic..."
//           className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
//         />
//       </div>
      
//       {/* Suggested Topics */}
//       <div className="mt-8 w-full max-w-3xl text-center relative z-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Popular Topics</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {["JavaScript", "React", "Next.js", "AI", "Blockchain", "Cybersecurity"].map((topic) => (
//             <motion.button
//               key={topic}
//               className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200"
//               animate={{ y: scrollY * 0.1 }}
//             >
//               {topic}
//             </motion.button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default  Nute