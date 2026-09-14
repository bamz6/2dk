import React from 'react';
import { ArrowLeft, ShieldCheck, Heart, Terminal, FileCheck2, ExternalLink } from 'lucide-react';
import { DISCORD_INVITE_URL } from '../lib/constants';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
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
        <span className="tracking-wider">SEC.09 // ABOUT</span>
      </div>

      {/* Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          About 3DFX
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#A1A1AA]">
          An independent, zero-commercial directory of tools, encoders, extensions, and reference guides built for video editors and VFX artists.
        </p>
      </div>

      {/* Core Mission & Philosophy */}
      <div className="mt-10 max-w-3xl space-y-10 text-sm leading-relaxed text-[#A1A1AA]">
        <div>
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
            01 // WHY WE BUILT THIS
          </h2>
          <p>
            The video editing ecosystem is flooded with bloated "SaaS tools", paywalled plugins, fake download portals with hidden adware, and generic clickbait top-10 articles. Finding a straightforward utility to batch-transcode footage into ProRes, clean an audio track, or copy an easing curve without paying $60/month or risking a trojan has become needlessly difficult.
          </p>
          <p className="mt-3">
            3DFX is an unmonetized, community-maintained technical index. Every tool, script, asset pack, and tutorial cataloged here has been tested in real production workflows.
          </p>
        </div>

        <div className="rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-6 font-mono text-xs space-y-3">
          <div className="text-white font-bold text-sm">THE 3DFX PRINCIPLES:</div>
          <div className="space-y-2 text-[#A1A1AA] font-sans">
            <p>• <strong>Strictly Black & White:</strong> No bright neon marketing gradients or visual distraction. A technical datasheet aesthetic designed for professionals.</p>
            <p>• <strong>Zero Sponsored Rankings:</strong> Nobody can buy priority placement, special badges, or banner features. Everything is ranked purely on utility.</p>
            <p>• <strong>Official Mirrors Only:</strong> All download links go directly to developer repositories (GitHub, SourceForge, official domains). We never wrap or re-host executables.</p>
            <p>• <strong>No Tracking or Cookie Walls:</strong> Pure static front-end with zero user telemetry, trackers, or behavioral analytics.</p>
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
            02 // WHO MAINTAINS THIS
          </h2>
          <p>
            3DFX is maintained by a collective of freelance motion designers, colorists, and post-production engineers. We collaborate actively with the editing community to audit releases, report broken links, and document new workflows.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
            03 // CONTRIBUTE & REPORT
          </h2>
          <p>
            If you've authored an open-source script, created a high-quality free asset library, or spotted an outdated link, join our Discord server. We review submissions within 24–48 hours.
          </p>
          <div className="mt-4">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
            >
              <span>JOIN THE 3DFX DISCORD</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
