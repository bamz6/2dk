import React, { useState, useMemo } from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck, Tag, Music, Film, Box, Sparkles, Layers } from 'lucide-react';
import { RESOURCES } from '../data/resources';
import { Resource } from '../types';

interface FreeAssetsProps {
  onBack: () => void;
}

export const FreeAssets: React.FC<FreeAssetsProps> = ({ onBack }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const freeAssets = useMemo(() => {
    return RESOURCES.filter((r) => r.category === 'free-assets');
  }, []);

  const subcategories = [
    { id: 'all', label: 'ALL ASSETS' },
    { id: 'audio', label: 'AUDIO & SFX' },
    { id: 'vfx', label: 'VFX & OVERLAYS' },
    { id: 'footage', label: 'STOCK FOOTAGE' },
    { id: '3d', label: '3D & TEXTURES' },
  ];

  const filteredAssets = useMemo(() => {
    return freeAssets.filter((res) => {
      // Subcategory filter
      if (selectedSubcategory === 'audio') {
        if (!res.section?.includes('AUDIO') && !res.tags.includes('SFX') && !res.tags.includes('MUSIC')) return false;
      } else if (selectedSubcategory === 'vfx') {
        if (!res.section?.includes('VFX') && !res.tags.includes('VFX') && !res.tags.includes('ALPHA OVERLAYS')) return false;
      } else if (selectedSubcategory === 'footage') {
        if (!res.section?.includes('STOCK') && !res.tags.includes('B-ROLL')) return false;
      } else if (selectedSubcategory === '3d') {
        if (!res.section?.includes('3D') && !res.tags.includes('HDRI') && !res.tags.includes('PBR TEXTURES')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          res.name.toLowerCase().includes(q) ||
          res.description.toLowerCase().includes(q) ||
          res.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [freeAssets, selectedSubcategory, searchQuery]);

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
        <span className="tracking-wider">SEC.07 // ASSETS</span>
      </div>

      {/* Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Free Assets & Libraries
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#A1A1AA]">
          Curated high-grade public repositories for royalty-free sound effects, cinematic b-roll, CC0 3D textures, and practical VFX elements.
        </p>

        {/* Subcategory Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubcategory(sub.id)}
              className={`rounded px-3 py-1.5 transition-colors focus:outline-none ${
                selectedSubcategory === sub.id
                  ? 'bg-white text-black font-bold'
                  : 'border border-[#1F1F1F] bg-[#0D0D0D] text-[#A1A1AA] hover:text-white'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Free Assets */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="group flex flex-col justify-between rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 transition-all hover:border-zinc-400"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-[#71717A] tracking-wider block mb-1">
                    {asset.section}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-white group-hover:text-zinc-100">
                    {asset.name}
                  </h3>
                </div>
                {asset.license && (
                  <span className="font-mono text-[9px] text-[#A1A1AA] border border-[#1F1F1F] px-1.5 py-0.5 rounded bg-black">
                    {asset.license}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-[#A1A1AA] leading-relaxed">
                {asset.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {asset.tags.map((t) => (
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
              <span className="text-[10px] text-[#71717A] flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-zinc-400" />
                VERIFIED REPO
              </span>

              <a
                href={asset.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-1 font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                <span>OPEN REPOSITORY</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
