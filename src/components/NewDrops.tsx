import React from 'react';

interface NewDropsProps {
  onBack: () => void;
}

export const NewDrops: React.FC<NewDropsProps> = ({ onBack }) => {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 bg-black text-white selection:bg-white selection:text-black min-h-[60vh]">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[#71717A]">
        <button
          type="button"
          onClick={onBack}
          className="text-[#A1A1AA] hover:text-white transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-white font-semibold">New Drops</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          New Drops
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#A1A1AA]">
          Latest software additions from the 2dk catalog.
        </p>
      </div>

      {/* Subtle Horizontal Divider */}
      <div className="mt-6 border-b border-[#1F1F1F]" />

      {/* Centered Empty State */}
      <div className="flex flex-col items-center justify-center py-28 sm:py-36 text-center">
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          No drops yet — check back soon.
        </p>
      </div>
    </div>
  );
};
