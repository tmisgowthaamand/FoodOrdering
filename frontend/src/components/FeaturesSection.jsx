import React from 'react';
import { Truck, Clock, BadgeCheck, Headphones } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '10-Minute Delivery',
    description: 'Get your groceries in just 10 minutes',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: BadgeCheck,
    title: 'Best Quality',
    description: 'Fresh products with quality assurance',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery on orders above ₹99',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round the clock customer support',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 md:p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 transition-transform group-hover:scale-110`}>
                <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
