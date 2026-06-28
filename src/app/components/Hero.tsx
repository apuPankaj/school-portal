import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import imgUpscaled1 from '../../imports/Hero_upscaled_1.jpg';
import imgUpscaled2 from '../../imports/Hero_upscaled_2.jpg';
import imgUpscaled3 from '../../imports/Hero_upscaled_3.jpg';

const carouselImages = [imgUpscaled1, imgUpscaled2, imgUpscaled3];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[80vh] w-full min-h-[500px] flex items-center justify-center overflow-hidden group">
      
      {/* Carousel Backgrounds */}
      {carouselImages.map((imgUrl, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={imgUrl} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
        </div>
      ))}

      {/* Carousel Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={32} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={32} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 z-20 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-amber-500' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md leading-tight transform transition-all duration-700 translate-y-0">
          Welcome to Modern Public School Balasore
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl drop-shadow">
          Empowering young minds with quality education, values, and an environment to excel in every sphere of life.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:scale-105 shadow-lg">
          Admissions Open - Apply Now
        </button>
      </div>
    </div>
  );
}
