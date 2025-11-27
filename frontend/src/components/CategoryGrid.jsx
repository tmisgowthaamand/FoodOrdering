import React from 'react';
import { categories } from '../data/mockData';

const CategoryGrid = ({ onCategoryClick }) => {
  return (
    <section className="py-6 md:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 md:gap-4">
          {categories.slice(0, 20).map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick && onCategoryClick(category)}
              className="group cursor-pointer"
            >
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl p-2 md:p-3 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-purple-100 hover:to-pink-100">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <p className="mt-2 text-center text-xs md:text-sm font-medium text-gray-700 line-clamp-2 group-hover:text-[#8B2FC9] transition-colors">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
