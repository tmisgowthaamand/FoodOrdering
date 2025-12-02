import React from 'react';
import { Smartphone, Star, Download } from 'lucide-react';

const AppDownloadSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#8B2FC9] to-purple-700 rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="p-8 md:p-12 text-white flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Download the Foodeo App
              </h2>
              <p className="text-purple-200 text-lg mb-6 max-w-md">
                Get exclusive offers, track your orders in real-time, and enjoy a seamless shopping experience.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-semibold">4.8/5</span>
                <span className="text-purple-200">| 10M+ Downloads</span>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <span className="text-xs text-gray-400">Download on the</span>
                    <p className="font-semibold">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-left">
                    <span className="text-xs text-gray-400">Get it on</span>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="hidden md:block relative p-8">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Phone Screen Content */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-100 to-white">
                      <div className="p-4">
                        <div className="bg-[#8B2FC9] text-white text-center py-3 rounded-xl font-bold text-sm mb-4">
                          Foodeo
                        </div>
                        <div className="bg-gray-100 rounded-lg p-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search groceries...
                          </div>
                        </div>
                        {/* Mini Category Grid */}
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-purple-50 rounded-lg p-2 aspect-square flex items-center justify-center">
                              <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  10 MIN
                </div>
                <div className="absolute bottom-20 -left-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  FREE DELIVERY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
