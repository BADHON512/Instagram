import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'


// import { Spinner } from './Spinner' // Create a separate spinner component

type Props = {
  active: number | null
  setActive: (active: number | null) => void
}



const Create = ({ active, setActive }: Props) => {
  const [postData, setPostData] = useState({
    image: "",
    caption: ""
  })
console.log(postData)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPEG, PNG, or GIF.')
      return false
    }
    
    if (file.size > maxSize) {
      setError('File size too large. Maximum 5MB allowed.')
      return false
    }
    
    return true
  }

  const handleFile = useCallback((file: File) => {
    if (!validateFile(file)) return
    
    setIsLoading(true)
    const reader = new FileReader()
    
    reader.onload = () => {
     setPostData((pre)=>({...pre,image: reader.result as string}))
      setIsLoading(false)
    }
    
    reader.onerror = () => {
      setError('Error reading file')
      setIsLoading(false)
    }
    
    reader.readAsDataURL(file)
  }, [])

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   const data={
    caption:postData.caption,
    image:postData.image,
    
   }
    if(postData.caption==""|| postData.image==""){
      alert("fill the all field")
    }else{
      await axios.post("/api/user-post", data)
      .then((res) => {
           toast.success(res.data.message)
        setActive(null)
      })
      .catch((error) => {
        console.error("API Error:", error); // Debugging-এর জন্য Console-এ Error দেখাবে
        toast.error(error.response.data.error)
      });
    
    
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setActive])

  useEffect(() => {
     

     document.body.style.overflow = postData.image ? "hidden" : "auto";

     return () => {
         document.body.style.overflow = "auto"; // Cleanup on unmount
     };
 }, [postData.image]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div 
        className="bg-[#262626] rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h1 className="text-xl font-semibold text-white">Create New Post</h1>
          <button 
            onClick={() => setActive(null)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <RxCross1 className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Image Preview Section */}
          <div className="md:w-[60%] bg-blue-200 flex items-center justify-center relative">
            {postData.image ? (
              <div className="relative w-full h-full">
         
                  <Image
                    src={postData.image}
                    alt="Preview"
                    width={800}
                    height={800}
                    className="object-contain "
                  />
                 <div className="w-full py-1 mb-2 text-center mt-3">
                    <label htmlFor="change"  className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors'>
                         Change image
                         <input type="file" className='hidden' id='change' onChange={imageHandler} />
                    </label>
                 </div>
              </div>
            ) : (
              <div 
                className={`p-8 w-full h-full flex flex-col items-center justify-center transition-all 
                  ${isDragging ? 'bg-white/5' : 'bg-transparent'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mb-6 text-gray-400">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-white mb-4">
                  {isDragging ? 'Drop to upload' : 'Drag photos here'}
                </h2>
                <label className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
                  Select from computer
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={imageHandler}
                    accept="image/*"
                  />
                </label>
                <p className="mt-4 text-sm text-gray-400">Recommendation: Use high-quality JPG, PNG</p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="md:w-[40%] p-6 flex flex-col">
            <form onSubmit={handlePostSubmit} className="flex-1 flex flex-col">
              <div className="mb-6">
                <textarea
                  value={postData.caption}
                  onChange={(e) => setPostData({...postData, caption: e.target.value})}
                  placeholder="Write a caption..."
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none 
                    focus:outline-none border-b border-white/10 pb-2"
                  rows={4}
                />
              </div>

              <div className="mt-auto space-y-4">
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-gray-400 hover:text-white 
                    transition-colors cursor-pointer text-sm">
                    <input type="checkbox" className="accent-blue-500" />
                    Advanced Settings
                  </label>
                  
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled={isLoading || !postData.image}
                  >
                    {isLoading ? "s" : 'Post'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create