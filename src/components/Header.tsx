import React from 'react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1F1F1F] bg-[#000000]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2 text-left focus:outline-none"
        >
          <span className="font-mono text-xl font-extrabold tracking-tighter text-white transition-colors group-hover:text-zinc-300">
            2dk
          </span>
          <span className="hidden font-mono text-[10px] text-[#71717A] sm:inline-block border border-[#1F1F1F] px-1.5 py-0.5 rounded">
            v2.4 // SPEC
          </span>
        </button>

        {/* Right Navigation */}
        <nav className="flex items-center gap-1 sm:gap-4 font-mono text-xs">
          <button
            onClick={() => onNavigate('new-drops')}
            className={`rounded px-2.5 py-1.5 transition-colors focus:outline-none ${
              currentPage === 'new-drops'
                ? 'bg-white text-black'
                : 'text-[#A1A1AA] hover:bg-white hover:text-black'
            }`}
          >
            New Drops
          </button>

          <button
            onClick={() => onNavigate('guides')}
            className={`rounded px-2.5 py-1.5 transition-colors focus:outline-none ${
              currentPage === 'guides' || currentPage === 'beginners-guide' || currentPage === 'tutorials'
                ? 'bg-white text-black'
                : 'text-[#A1A1AA] hover:bg-white hover:text-black'
            }`}
          >
            Guides
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`rounded px-2.5 py-1.5 transition-colors focus:outline-none ${
              currentPage === 'about'
                ? 'bg-white text-black'
                : 'text-[#A1A1AA] hover:bg-white hover:text-black'
            }`}
          >
            About
          </button>

          <button
            onClick={() => onNavigate('faq')}
            className={`rounded px-2.5 py-1.5 transition-colors focus:outline-none ${
              currentPage === 'faq'
                ? 'bg-white text-black'
                : 'text-[#A1A1AA] hover:bg-white hover:text-black'
            }`}
          >
            FAQ
          </button>
        </nav>
      </div>
    </header>
  );
};
