import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Footer = ({ onNavigate }) => {
  const categories = [
    'Fruits & Vegetables', 'Dairy & Breakfast', 'Munchies', 'Cold Drinks & Juices',
    'Instant Food', 'Tea Coffee & Health Drinks', 'Bakery', 'Sweet Tooth'
  ];

  const usefulLinks = [
    'About Us', 'Careers', 'Blog', 'Press', 'Contact Us', 'FAQ'
  ];

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 font-sans relative overflow-hidden">
      {/* Subtle background gradient blob for richness without lag */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Newsletter Section - Styled to look premium */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Stay in the loop
              </h3>
              <p className="text-gray-400 text-lg">
                Join our newsletter for exclusive offers, new arrivals, and fresh updates delivered to your inbox.
              </p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm max-w-md w-full mx-auto md:mx-0">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0 h-12 px-6 rounded-full w-full"
                />
                <Button className="rounded-full h-12 px-8 bg-white text-black hover:bg-gray-200 transition-all duration-300 font-medium">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-6">Foodeo</h2>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Experience the future of grocery shopping. Fresh produce, daily essentials, and premium products delivered in minutes.
              </p>
            </div>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-white">Categories</h4>
            <ul className="space-y-4">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#8B2FC9] transition-all duration-300" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#8B2FC9] transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-semibold text-lg mb-6 text-white">Get the App</h4>
            <div className="space-y-4 mb-8">
              <p className="text-gray-400 text-sm mb-4">Download our app for the best experience and exclusive mobile-only offers.</p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="block transition-transform hover:-translate-y-1 duration-300">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                    alt="Get it on Google Play"
                    className="h-12"
                  />
                </a>
                <a href="#" className="block transition-transform hover:-translate-y-1 duration-300">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                    alt="Download on App Store"
                    className="h-12"
                  />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <h5 className="font-semibold mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B2FC9]" />
                24/7 Support
              </h5>
              <p className="text-2xl font-bold text-white mb-1">1800-123-4567</p>
              <p className="text-sm text-gray-400">support@foodeo.com</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm">© 2025 Foodeo. All rights reserved.</p>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {[
                { label: 'Privacy Policy', key: 'privacy' },
                { label: 'Terms & Conditions', key: 'terms' },
                { label: 'Shipping Policy', key: 'shipping' },
                { label: 'Cancellation & Refund Policy', key: 'refund' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
