import React from 'react';
import { Info } from 'lucide-react';

interface DisclaimerProps {
  onOpenVerification: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onOpenVerification }) => {
  return (
    <div className="border-b border-[#1F1F1F] bg-[#000000] py-3 text-xs">
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 sm:px-6 text-[#A1A1AA]">
        <Info className="h-4 w-4 shrink-0 text-[#71717A]" />
        <p className="flex-1 leading-normal">
          All tools listed here are free and sourced from their official channels. Always scan downloads before installing.{' '}
          <button
            type="button"
            onClick={onOpenVerification}
            className="underline underline-offset-4 text-white hover:text-zinc-300 focus:outline-none transition-colors"
          >
            How we verify downloads
          </button>
        </p>
      </div>
    </div>
  );
};
