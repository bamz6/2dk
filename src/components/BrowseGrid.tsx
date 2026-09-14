import React from 'react';
import { CategoryId, Platform } from '../types';
import { CATEGORIES } from '../data/categories';

interface BrowseGridProps {
  selectedPlatform: Platform;
  onSelectCategory: (id: CategoryId) => void;
}

export const BrowseGrid: React.FC<BrowseGridProps> = ({
  selectedPlatform,
  onSelectCategory,
}) => {
  return (
    <section className="py-10 sm:py-14 bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#71717A] uppercase">
            BROWSE
          </span>
        </div>

        {/* Monolithic 3x3 Table Grid */}
        <div className="overflow-hidden rounded-md border border-[#1F1F1F] bg-[#1F1F1F] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {CATEGORIES.map((cat) => {
            const isWindows = cat.id === 'windows';
            const isMac = cat.id === 'macos';
            const isHighlighted =
              (isWindows && (selectedPlatform === 'windows' || selectedPlatform === 'all')) ||
              (isMac && selectedPlatform === 'macos');

            const showDetectedBadge =
              (isWindows && (selectedPlatform === 'windows' || selectedPlatform === 'all')) ||
              (isMac && selectedPlatform === 'macos');

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex flex-col justify-start p-6 sm:p-8 text-left transition-colors duration-150 focus:outline-none ${
                  isHighlighted
                    ? 'bg-[#181818] hover:bg-[#1F1F1F]'
                    : 'bg-[#0D0D0D] hover:bg-[#141414]'
                }`}
              >
                {/* Title & Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>

                  {showDetectedBadge && (
                    <span className="font-mono text-[10px] tracking-wider uppercase border border-[#3F3F46] bg-black/60 px-1.5 py-0.5 rounded text-[#D4D4D8] font-semibold">
                      DETECTED
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed group-hover:text-[#D4D4D8] transition-colors">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
