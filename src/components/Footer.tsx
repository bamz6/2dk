import React from 'react';
import { ArrowUp, ExternalLink, ShieldCheck, MessageSquare } from 'lucide-react';
import { PageId } from '../types';
import { DISCORD_INVITE_URL, GITHUB_REPO_URL, LAST_VERIFIED_DATE } from '../lib/constants';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenVerification: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenVerification }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#1F1F1F] bg-[#000000] py-12 font-mono text-xs">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tighter text-white">3DFX</span>
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
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 text-[#A1A1AA] hover:text-white transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Discord</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#71717A]">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onOpenVerification}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>COMMUNITY AUDITED // {LAST_VERIFIED_DATE}</span>
            </button>
            <span>•</span>
            <span>NO SPONSORSHIPS ACCEPTED</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#A1A1AA] hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
