import React from 'react';
import { Sparkles, Clock, ShieldCheck } from 'lucide-react';

const DeliveryBanner = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-[#8B2FC9] to-purple-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-yellow-300 font-semibold">SUPER FAST DELIVERY</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Groceries Delivered in
              <span className="block text-yellow-300">10 Minutes!</span>
            </h2>
            <p className="text-purple-200 text-lg max-w-md">
              From fresh produce to daily essentials, get everything delivered to your doorstep in just 10 minutes.
            </p>
          </div>

          {/* Right - Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
              <Clock className="w-10 h-10 text-yellow-300 mb-3" />
              <h3 className="font-bold text-lg mb-1">Lightning Fast</h3>
              <p className="text-purple-200 text-sm">Average delivery time of 10 minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
              <ShieldCheck className="w-10 h-10 text-green-400 mb-3" />
              <h3 className="font-bold text-lg mb-1">Quality Assured</h3>
              <p className="text-purple-200 text-sm">100% fresh & quality products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryBanner;
