import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { banners } from '../data/mockData';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Main Banner */}
      <div className="relative h-[200px] md:h-[320px] lg:h-[400px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${banner.bgColor} relative`}>
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
                  {/* Text Content */}
                  <div className="text-white z-10 text-center md:text-left max-w-lg">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                      {banner.title}
                    </h1>
                    <p className="text-sm md:text-lg opacity-90 mb-4 md:mb-6">
                      {banner.subtitle}
                    </p>
                    <Button className="bg-white text-[#8B2FC9] hover:bg-gray-100 font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full transition-all transform hover:scale-105">
                      Order Now
                    </Button>
                  </div>
                  
                  {/* Image */}
                  <div className="hidden md:block relative">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-[300px] lg:w-[400px] h-[200px] lg:h-[280px] object-cover rounded-2xl shadow-2xl"
                    />
                    {/* Floating badge */}
                    <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                      10 MIN
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 right-32 w-20 h-20 bg-white rounded-full"></div>
                <div className="absolute top-1/2 right-20 w-16 h-16 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
