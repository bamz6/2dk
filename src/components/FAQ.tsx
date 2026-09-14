import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, MessageSquare } from 'lucide-react';
import { DISCORD_INVITE_URL } from '../lib/constants';

interface FAQProps {
  onBack: () => void;
}

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: 'Why is it called 3DFX?',
    a: 'It is a deliberate tribute to 3dfx Interactive — the legendary creators of the Voodoo graphics chipsets that defined hardware 3D acceleration in the late 1990s. The name embodies a focus on raw hardware efficiency, technical utility, and uncompromising performance over commercial fluff.',
  },
  {
    q: 'Are all the tools and resources listed on 3DFX truly free?',
    a: 'Yes. Everything listed is either completely free and open-source (FOSS), freeware, or offers a permanent free functional tier (like the free edition of DaVinci Resolve). If a script or plugin is "Name Your Own Price", we explicitly note how to obtain it for $0.',
  },
  {
    q: 'How do you verify downloads and ensure no malware?',
    a: 'We never re-upload or repackage software onto our own servers. Every link directs straight to the official author’s website, verified GitHub release, or primary developer repository. Furthermore, installers are vetted across 70+ antivirus engines using VirusTotal before entering our catalog.',
  },
  {
    q: 'Do you accept paid sponsorships or affiliate rankings?',
    a: 'Strictly no. We have never accepted money, affiliate kickbacks, or sponsored placements from any software company. Tools are cataloged exclusively based on real-world utility, reliability, and community trust. If a tool degrades or introduces adware, it is removed immediately.',
  },
  {
    q: 'What is the purpose of the platform toggle (Windows vs MacOS)?',
    a: 'Many high-performance video utilities rely on platform-specific APIs (such as Apple Silicon VideoToolbox and Metal on macOS, or NVENC/DirectML and AviSynth on Windows). The platform filter ensures you only see tools and binaries that run natively on your current operating system.',
  },
  {
    q: 'Can I use the free assets (SFX, footage, LUTs) in commercial client projects?',
    a: 'Most asset repositories featured on 3DFX (such as Freesound CC0, Pexels Video, and Poly Haven) allow commercial usage without licensing fees. However, licenses vary (e.g. CC-BY requires attribution, while CC0 does not). We clearly tag the licensing type on each resource card.',
  },
  {
    q: 'How can I submit a new script, tool, or bug report?',
    a: 'Join our community Discord. We maintain an active #submissions channel where creators and editors post new tools, report broken URLs, or request specific workflow guides.',
  },
];

export const FAQ: React.FC<FAQProps> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
        <span className="tracking-wider">SEC.10 // FAQ</span>
      </div>

      {/* Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#A1A1AA]">
          Clarifications on 3DFX curation standards, link verification, licensing, and naming origins.
        </p>
      </div>

      {/* Accordion List */}
      <div className="mt-8 max-w-3xl divide-y divide-[#1F1F1F] border-y border-[#1F1F1F]">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.q} className="py-5">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-start justify-between text-left gap-4 focus:outline-none group"
              >
                <span className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {faq.q}
                </span>
                <span className="p-1 rounded bg-[#0D0D0D] border border-[#1F1F1F] text-[#A1A1AA] group-hover:border-zinc-400 transition-colors shrink-0 mt-0.5">
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>

              {isOpen && (
                <p className="mt-3 text-sm text-[#A1A1AA] leading-relaxed pr-8 animate-in fade-in duration-150">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions? */}
      <div className="mt-12 max-w-3xl rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="text-white font-bold block">HAVE ANOTHER QUESTION?</span>
          <span className="text-[#71717A] text-[11px]">Our editing community is active daily on Discord.</span>
        </div>
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200 transition-colors shrink-0"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>ASK IN DISCORD</span>
        </a>
      </div>
    </div>
  );
};
