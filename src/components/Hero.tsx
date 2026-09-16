import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Search } from 'lucide-react';
import { Platform } from '../types';

const ThreeScene = lazy(() => import('./ThreeScene'));

interface HeroProps {
  selectedPlatform: Platform;
  onSelectPlatform: (platform: Platform) => void;
  onOpenSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedPlatform,
  onSelectPlatform,
  onOpenSearch,
}) => {
  const [detectedOS, setDetectedOS] = useState<'WINDOWS' | 'MACOS'>('WINDOWS');
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const platformString = (
        (window.navigator as any).userAgentData?.platform ||
        window.navigator.platform ||
        window.navigator.userAgent ||
        ''
      ).toLowerCase();

      if (platformString.includes('mac') || platformString.includes('iphone') || platformString.includes('ipad')) {
        setDetectedOS('MACOS');
        setIsMac(true);
      } else {
        setDetectedOS('WINDOWS');
        setIsMac(false);
      }
    }
  }, []);

  return (
    <section className="relative pt-12 pb-10 sm:pt-20 sm:pb-14 border-b border-[#1F1F1F] overflow-hidden">
      {/* 3D Visual Layer */}
      <div className="three-layer">
        <Suspense fallback={<div aria-hidden="true" className="three-fallback" />}>
          <ThreeScene variant="hero" />
        </Suspense>
      </div>

      {/* Subtle monochrome technical background grid & atmosphere */}
      <div className="hero-technical-grid" aria-hidden="true" />
      <div className="hero-radial-atmosphere" aria-hidden="true" />

      <div className="hero-content relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="font-sans text-6xl sm:text-8xl font-black tracking-tighter text-white leading-none">
            3DFX
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-[#A1A1AA] font-normal tracking-tight">
            Free tools & resources for editors — curated, no gimmicks.
          </p>

          {/* Search Trigger Bar */}
          <div className="mt-8">
            <button
              type="button"
              onClick={onOpenSearch}
              className="group flex w-full max-w-xl items-center justify-between rounded-md border border-[#1F1F1F] bg-[#0D0D0D] px-4 py-3 text-left transition-all hover:border-zinc-500 focus:outline-none focus:border-white"
            >
              <div className="flex items-center gap-3 text-[#71717A] group-hover:text-[#A1A1AA]">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search tools, guides, assets...</span>
              </div>
              <kbd className="rounded border border-[#1F1F1F] bg-[#000000] px-2 py-0.5 font-mono text-xs text-[#71717A] group-hover:text-white">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>
          </div>

          {/* Platform Filter Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-[#71717A] uppercase tracking-wider text-[11px]">
              PLATFORM
            </span>

            <div className="flex items-center rounded-md border border-[#1F1F1F] p-0.5 bg-[#000000]">
              <button
                type="button"
                onClick={() => onSelectPlatform('windows')}
                className={`rounded px-3 py-1 font-medium transition-colors focus:outline-none ${
                  selectedPlatform === 'windows'
                    ? 'bg-white text-black'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Windows
              </button>

              <button
                type="button"
                onClick={() => onSelectPlatform('macos')}
                className={`rounded px-3 py-1 font-medium transition-colors focus:outline-none ${
                  selectedPlatform === 'macos'
                    ? 'bg-white text-black'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                MacOS
              </button>

              <button
                type="button"
                onClick={() => onSelectPlatform('all')}
                className={`rounded px-3 py-1 font-medium transition-colors focus:outline-none ${
                  selectedPlatform === 'all'
                    ? 'bg-white text-black'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                All
              </button>
            </div>

            <span className="ml-2 text-[11px] text-[#71717A] font-mono tracking-wider">
              DETECTED: {detectedOS}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
