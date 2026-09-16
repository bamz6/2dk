import React from 'react';
import { CategoryId, Platform, PageId } from '../types';
import { CATEGORIES } from '../data/categories';

interface BrowseGridProps {
  selectedPlatform: Platform;
  onSelectCategory: (id: CategoryId) => void;
  onNavigatePage?: (page: PageId) => void;
  onOpenVerification?: () => void;
}

export const BrowseGrid: React.FC<BrowseGridProps> = ({
  selectedPlatform,
  onSelectCategory,
  onNavigatePage,
  onOpenVerification,
}) => {
  const handleCardPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate pointer position relative to the card and limit to ~2.2 degrees maximum
    const tiltX = Math.max(-2.2, Math.min(2.2, ((y - centerY) / centerY) * -2.2));
    const tiltY = Math.max(-2.2, Math.min(2.2, ((x - centerX) / centerX) * 2.2));
    const glowX = `${((x / rect.width) * 100).toFixed(1)}%`;
    const glowY = `${((y / rect.height) * 100).toFixed(1)}%`;

    e.currentTarget.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--glow-x', glowX);
    e.currentTarget.style.setProperty('--glow-y', glowY);
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty('--tilt-x', '0deg');
    e.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section className="py-8 sm:py-10 bg-black text-white">
      <div className="mx-auto max-w-[980px] px-4 sm:px-6">
        {/* Informational Banner matching reference screenshot in black & white */}
        <div className="mb-8 rounded-md border border-zinc-800 bg-[#0D0D0D] px-4 py-3 sm:px-5 sm:py-3.5 text-xs text-zinc-400 leading-relaxed">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-400 mr-2.5 align-middle" />
          <span>
            Everything here is free. Listed downloads are verified before they go live — but always scan before installing. False positives are normal with repacked software. For concerns read more on our{' '}
          </span>
          <button
            type="button"
            onClick={() => onNavigatePage?.('about')}
            className="font-bold text-white hover:text-zinc-300 underline underline-offset-2 transition-colors"
          >
            About page
          </button>
          <span>.{' '}</span>
          <button
            type="button"
            onClick={onOpenVerification}
            className="text-zinc-500 hover:text-white underline transition-colors"
          >
            Why is this link bold?
          </button>
        </div>

        {/* Section Header */}
        <div className="mb-3">
          <span className="font-mono text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            BROWSE
          </span>
        </div>

        {/* Compact 3x3 Table Grid */}
        <div className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
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
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                className={`tilt-card group flex flex-col justify-start p-4 sm:px-5 sm:py-4.5 text-left transition-colors duration-150 focus:outline-none ${
                  isHighlighted
                    ? 'bg-zinc-900 hover:bg-zinc-800'
                    : 'bg-[#0D0D0D] hover:bg-[#141414]'
                }`}
              >
                {/* Title & Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-sans text-sm sm:text-[15px] font-bold text-white group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>

                  {showDetectedBadge && (
                    <span className="font-mono text-[9px] tracking-wider uppercase border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 rounded text-white font-semibold">
                      DETECTED
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
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
