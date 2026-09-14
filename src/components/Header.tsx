import React from 'react';
import { Search, MessageSquare, ExternalLink } from 'lucide-react';
import { PageId } from '../types';
import { DISCORD_INVITE_URL } from '../lib/constants';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
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
            3DFX
          </span>
          <span className="hidden font-mono text-[10px] text-[#71717A] sm:inline-block border border-[#1F1F1F] px-1.5 py-0.5 rounded">
            v2.4 // SPEC
          </span>
        </button>

        {/* Right Navigation */}
        <nav className="flex items-center gap-1 sm:gap-4 font-mono text-xs">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded px-2.5 py-1.5 text-[#A1A1AA] hover:bg-white hover:text-black transition-colors border border-transparent hover:border-white focus:outline-none"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block rounded bg-[#1F1F1F] px-1.5 py-0.5 text-[10px] text-[#71717A]">
              Ctrl+K
            </kbd>
          </button>

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
            onClick={() => onNavigate('beginners-guide')}
            className={`rounded px-2.5 py-1.5 transition-colors focus:outline-none ${
              currentPage === 'beginners-guide'
                ? 'bg-white text-black'
                : 'text-[#A1A1AA] hover:bg-white hover:text-black'
            }`}
          >
            Guide
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

          {/* Discord CTA */}
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-1 flex items-center justify-center rounded-full p-2 text-[#A1A1AA] hover:bg-white hover:text-black transition-colors focus:outline-none"
            title="Join 3DFX Discord"
            aria-label="Discord Community"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
};
