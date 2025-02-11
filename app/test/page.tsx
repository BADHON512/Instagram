"use client"
import { useState } from 'react';

const Slides = [
  {
    location: "Підвір, К_001",
    time: "0:15",
    apparatus: ["ЗНАТЬ", "СЛУЖБИ", "КОМПЕНТ", "РОДЕЙСТВІ"],
    year: "2025",
    code: "к_501",
    naming: {
      title: "Найменувати",
      values: ["100", "150"]
    }
  },
  // Add more slides as needed
];

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === Slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? Slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {/* Carousel container */}
      <div className="flex transition-transform duration-300 ease-in-out"
           style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {Slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 p-6 bg-white rounded-lg shadow-lg">
            {/* Card Content */}
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex justify-between items-center text-gray-600">
                <span className="font-medium">{slide.location}</span>
                <span className="text-sm">{slide.time}</span>
              </div>

              {/* Apparatus Grid */}
              <div className="grid grid-cols-2 gap-4 text-center">
                {slide.apparatus.map((item, i) => (
                  <div key={i} className="p-2 bg-gray-100 rounded-md">
                    {item}
                  </div>
                ))}
              </div>

              {/* Year */}
              <div className="text-center font-bold text-gray-700">
                НІЖЕ ЗАТСИ - {slide.year}
              </div>

              {/* Code */}
              <div className="text-center text-sm text-gray-500">
                Тільки, {slide.code}
              </div>

              {/* Naming Section */}
              <div className="space-y-2">
                <h3 className="text-gray-600 font-medium">Найменування:</h3>
                <div className="flex justify-center gap-4">
                  {slide.naming.values.map((value, i) => (
                    <div key={i} className="bg-gray-100 px-4 py-2 rounded-md">
                      {value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Standards */}
              <div className="text-center text-gray-500">
                Виду та стандартизація:
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`w-3 h-3 rounded-full ${i === activeSlide ? 'bg-gray-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}