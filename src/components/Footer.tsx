import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenVerification?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#1F1F1F] bg-[#000000] py-12 font-mono text-xs">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tighter text-white">2dk</span>
              <span className="text-[#71717A] text-[11px]">// CURATED REPOSITORY</span>
            </div>
            <p className="mt-2 font-sans text-xs text-[#A1A1AA] max-w-md">
              A community-curated, zero-bloat archive of tools, encoders, extensions, and free assets for motion designers and video editors.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 font-mono text-xs">
            <button
              onClick={() => onNavigate('guides')}
              className="text-[#A1A1AA] hover:text-white transition-colors"
            >
              Guides
            </button>
            <button
              onClick={() => onNavigate('beginners-guide')}
              className="text-[#A1A1AA] hover:text-white transition-colors"
            >
              Beginner's Guide
            </button>
            <button
              onClick={() => onNavigate('new-drops')}
              className="text-[#A1A1AA] hover:text-white transition-colors"
            >
              New Drops
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="text-[#A1A1AA] hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="text-[#A1A1AA] hover:text-white transition-colors"
            >
              FAQ
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end text-[11px] text-[#71717A]">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#A1A1AA] hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
