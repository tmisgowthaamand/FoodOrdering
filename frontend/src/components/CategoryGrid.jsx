import React from 'react';
import { categories } from '../data/mockData';

const CategoryGrid = ({ onCategoryClick }) => {
  return (
    <div className="bg-white border-b sticky top-[73px] z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto py-3 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick && onCategoryClick(category)}
              className="flex items-center gap-2 min-w-fit group flex-col md:flex-row"
            >
              <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-gray-50 p-1 group-hover:bg-purple-50 transition-colors border border-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#8B2FC9] whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryGrid;
