import React, { useState, useMemo } from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck, Search, Check, Copy } from 'lucide-react';
import { RESOURCES } from '../data/resources';
import { DISCORD_INVITE_URL } from '../lib/constants';

interface ExtensionsScriptsProps {
  onBack: () => void;
}

export const ExtensionsScripts: React.FC<ExtensionsScriptsProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const scripts = useMemo(() => {
    return RESOURCES.filter((r) => r.category === 'extensions-scripts');
  }, []);

  const filteredScripts = useMemo(() => {
    return scripts.filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.author?.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [scripts, searchQuery]);

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
        <span className="tracking-wider">SEC.06 // SCRIPT</span>
      </div>

      {/* Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Extensions & Automation Scripts
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#A1A1AA]">
          Vetted, production-tested scripts and workflow extensions for Adobe After Effects, Premiere Pro, and motion design pipelines.
        </p>

        {/* Filter controls */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#71717A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scripts and plugins..."
              className="w-full rounded-md border border-[#1F1F1F] bg-[#0D0D0D] py-2 pl-9 pr-4 font-mono text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-white"
            />
          </div>

          <div className="font-mono text-xs text-[#71717A]">
            {filteredScripts.length} CURATED SCRIPTS
          </div>
        </div>
      </div>

      {/* Grid of Scripts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScripts.map((script) => (
          <div
            key={script.id}
            className="group flex flex-col justify-between rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 transition-all hover:border-zinc-400"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-[#71717A] block mb-1">
                    {script.section}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-white group-hover:text-zinc-100">
                    {script.name}
                  </h3>
                  {script.author && (
                    <span className="font-mono text-[11px] text-[#71717A]">
                      by {script.author}
                    </span>
                  )}
                </div>
                {script.version && (
                  <span className="font-mono text-[10px] text-[#A1A1AA] border border-[#1F1F1F] px-1.5 py-0.5 rounded bg-black">
                    v{script.version}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-[#A1A1AA] leading-relaxed">
                {script.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {script.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-[#71717A] bg-black border border-[#1F1F1F] px-1.5 py-0.5 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-[#1F1F1F] pt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-[10px] text-[#71717A]">
                {script.license || 'VERIFIED SCRIPT'}
              </span>

              <a
                href={script.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-1 font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                <span>GET SCRIPT</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Community Submission Banner */}
      <div className="mt-12 rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-6 text-center font-mono text-xs">
        <p className="text-[#A1A1AA]">
          HAVE A VERIFIED EXTENSION OR JSX SCRIPT TO SUBMIT?
        </p>
        <p className="mt-1 text-[#71717A] text-[11px]">
          We test and feature open-source and developer tools that eliminate timeline friction.
        </p>
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-block rounded bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200 transition-colors"
        >
          SUBMIT SCRIPT ON DISCORD
        </a>
      </div>
    </div>
  );
};
