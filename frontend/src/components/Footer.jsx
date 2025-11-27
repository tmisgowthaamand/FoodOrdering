import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Smartphone, Mail, MapPin, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Footer = () => {
  const categories = [
    'Fruits & Vegetables', 'Dairy & Breakfast', 'Munchies', 'Cold Drinks & Juices',
    'Instant Food', 'Tea Coffee & Health Drinks', 'Bakery', 'Sweet Tooth'
  ];

  const usefulLinks = [
    'About Us', 'Careers', 'Blog', 'Press', 'Contact Us', 'FAQ', 'Privacy Policy', 'Terms & Conditions'
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-[#8B2FC9]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Subscribe to our Newsletter</h3>
              <p className="text-purple-200 text-sm">Get updates on offers and new arrivals</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 w-full md:w-64"
              />
              <Button className="bg-white text-[#8B2FC9] hover:bg-gray-100 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-3xl font-bold text-white mb-4">Foodeo</h2>
            <p className="text-gray-400 text-sm mb-4">
              Groceries delivered in 10 minutes. Fresh produce, daily essentials & more.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B2FC9] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B2FC9] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B2FC9] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B2FC9] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <a href="#" className="text-sm hover:text-[#8B2FC9] transition-colors">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-[#8B2FC9] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-semibold mb-4">We Deliver In</h4>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city}>
                  <a href="#" className="text-sm hover:text-[#8B2FC9] transition-colors">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & App */}
          <div>
            <h4 className="text-white font-semibold mb-4">Download App</h4>
            <div className="space-y-3 mb-6">
              <a href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                  alt="Download on App Store"
                  className="h-10"
                />
              </a>
            </div>
            
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B2FC9]" />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8B2FC9]" />
                <span>support@foodeo.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2025 Foodeo. All rights reserved.</p>
            <div className="flex items-center gap-4">
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
