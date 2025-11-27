import React from 'react';

const PromoBanner = () => {
  const promos = [
    {
      id: 1,
      title: 'Fresh Fruits',
      subtitle: 'Up to 30% OFF',
      bgColor: 'from-orange-400 to-orange-500',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Dairy Products',
      subtitle: 'Buy 2 Get 1 Free',
      bgColor: 'from-blue-400 to-blue-500',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Snacks Corner',
      subtitle: 'Starting at ₹10',
      bgColor: 'from-yellow-400 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Personal Care',
      subtitle: 'Flat 20% OFF',
      bgColor: 'from-pink-400 to-pink-500',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop'
    }
  ];

  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Today's Deals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${promo.bgColor} p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}
            >
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                  {promo.title}
                </h3>
                <p className="text-white/90 text-sm font-medium">
                  {promo.subtitle}
                </p>
                <button className="mt-3 bg-white text-gray-800 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
              <img
                src={promo.image}
                alt={promo.title}
                className="absolute right-0 bottom-0 w-24 h-24 md:w-32 md:h-32 object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
