import React from 'react';
import { ArrowLeft, Sparkles, ExternalLink, Calendar, MessageSquare } from 'lucide-react';
import { RESOURCES } from '../data/resources';
import { DISCORD_INVITE_URL } from '../lib/constants';

interface NewDropsProps {
  onBack: () => void;
}

export const NewDrops: React.FC<NewDropsProps> = ({ onBack }) => {
  const drops = RESOURCES.filter((r) => r.category === 'new-drops');

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 bg-black text-white">
      {/* Back button and Section Tag */}
      <div className="mb-6 flex items-center justify-between font-mono text-xs text-[#71717A]">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-1.5 text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>INDEX // BROWSE</span>
        </button>
        <span className="tracking-wider">SEC.05 // FEED</span>
      </div>

      {/* Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-white" />
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Fresh Drops & Updates
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#A1A1AA]">
          Fresh tools, major software releases, and curated asset packs added to 3DFX this month.
        </p>
      </div>

      {/* Timeline List of Drops */}
      <div className="mt-8 space-y-4">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 transition-all hover:border-zinc-400"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
                <span className="flex items-center gap-1 text-[#71717A]">
                  <Calendar className="h-3 w-3" />
                  {drop.lastVerified}
                </span>
                {drop.version && (
                  <span className="bg-black border border-[#1F1F1F] px-1.5 py-0.5 rounded text-white text-[10px]">
                    v{drop.version}
                  </span>
                )}
                <span className="text-[#71717A]">•</span>
                <span className="text-[#A1A1AA] text-[10px] uppercase">
                  {drop.author}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white">
                {drop.name}
              </h3>

              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {drop.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {drop.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-[#71717A] bg-black border border-[#1F1F1F] px-1.5 py-0.5 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 pt-2 sm:pt-0">
              <a
                href={drop.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded bg-white px-4 py-2 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
              >
                <span>EXPLORE DROP</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Discord Notification Card */}
      <div className="mt-12 rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block mb-1">
            NOTIFICATIONS // COMMUNITY FEED
          </span>
          <h3 className="text-xl font-bold text-white">
            Get pinged when new tools drop
          </h3>
          <p className="mt-2 text-xs text-[#A1A1AA] max-w-xl">
            We post release announcements, changelogs, and download links in our Discord <code>#drops</code> channel the minute tools are verified.
          </p>
        </div>

        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-2.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors shrink-0"
        >
          <MessageSquare className="h-4 w-4" />
          <span>JOIN DISCORD DROPS</span>
        </a>
      </div>
    </div>
  );
};
