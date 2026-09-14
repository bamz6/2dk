import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink, ArrowRight, CornerDownLeft, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { Resource, CategoryId } from '../types';
import { RESOURCES } from '../data/resources';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateCategory: (id: CategoryId) => void;
}

const POPULAR_QUERIES = [
  'HandBrake',
  'DaVinci Resolve',
  'Free SFX',
  'LUTs',
  'FX Console',
  'FMHY',
  'LosslessCut',
  'Audio LUFS',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateCategory,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus on mount / open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered results
  const filtered = RESOURCES.filter((res) => {
    const matchesCategory =
      activeCategoryFilter === 'all' || res.category === activeCategoryFilter;

    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    const matchName = res.name.toLowerCase().includes(q);
    const matchDesc = res.description.toLowerCase().includes(q);
    const matchTags = res.tags.some((t) => t.toLowerCase().includes(q));
    const matchAuthor = res.author?.toLowerCase().includes(q);
    const matchCategory = res.category.toLowerCase().includes(q);

    return matchName || matchDesc || matchTags || matchAuthor || matchCategory;
  });

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategoryFilter]);

  // Keyboard navigation for results
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filtered[selectedIndex];
      if (current) {
        handleOpenResource(current);
      }
    }
  };

  const handleOpenResource = (res: Resource) => {
    if (res.link.startsWith('#/')) {
      const catId = res.category;
      onNavigateCategory(catId);
      onClose();
    } else {
      window.open(res.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-16 sm:pt-24 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-md border border-[#1F1F1F] bg-[#0D0D0D] shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Box */}
        <div className="flex items-center border-b border-[#1F1F1F] px-4 py-3 bg-[#000000]">
          <Search className="h-4 w-4 text-[#71717A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search all tools, encoders, assets, scripts, guides..."
            className="w-full bg-transparent px-3 text-sm text-white placeholder-[#71717A] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#71717A] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded px-2 py-0.5 font-mono text-xs text-[#71717A] hover:bg-white hover:text-black transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular queries pills (clickable) */}
        {!query && (
          <div className="border-b border-[#1F1F1F] px-4 py-2.5 bg-[#0D0D0D]">
            <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
              <span className="text-[#71717A] shrink-0">POPULAR:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {POPULAR_QUERIES.map((pq) => (
                  <button
                    key={pq}
                    type="button"
                    onClick={() => {
                      setQuery(pq);
                      inputRef.current?.focus();
                    }}
                    className="rounded border border-[#1F1F1F] bg-[#000000] px-2 py-0.5 text-[#A1A1AA] hover:bg-white hover:text-black transition-colors focus:outline-none"
                  >
                    {pq}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 border-b border-[#1F1F1F] px-4 py-2 bg-[#000000]/60 overflow-x-auto font-mono text-[11px]">
          <span className="text-[#71717A]">FILTER:</span>
          {[
            { id: 'all', label: 'ALL ENTRIES' },
            { id: 'windows', label: 'WINDOWS' },
            { id: 'macos', label: 'MACOS' },
            { id: 'free-assets', label: 'FREE ASSETS' },
            { id: 'extensions-scripts', label: 'SCRIPTS' },
            { id: 'piracy', label: 'COMMUNITY REPOS' },
            { id: 'guides', label: 'SPECS & GUIDES' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`rounded px-2 py-0.5 transition-colors ${
                activeCategoryFilter === tab.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#71717A] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-2 divide-y divide-[#1F1F1F]/40"
        >
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#71717A] font-mono">
              NO VERIFIED ENTRIES FOUND FOR "{query}".
              <p className="mt-2 text-[11px] text-[#A1A1AA]">
                Try searching for encoders (HandBrake), audio (Freesound), or NLEs (DaVinci).
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenResource(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-start justify-between rounded p-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black'
                      : 'hover:bg-[#151515] text-white'
                  }`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-sm font-bold ${
                          isSelected ? 'text-black' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </span>
                      {item.version && (
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.2 rounded border ${
                            isSelected
                              ? 'border-black text-black'
                              : 'border-[#1F1F1F] text-[#71717A]'
                          }`}
                        >
                          v{item.version}
                        </span>
                      )}
                      <span
                        className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-[#1F1F1F] text-[#A1A1AA]'
                        }`}
                      >
                        {item.category.replace('-', ' ')}
                      </span>
                      {item.isVerified && (
                        <span
                          className={`flex items-center gap-1 text-[10px] font-mono ${
                            isSelected ? 'text-zinc-800' : 'text-zinc-400'
                          }`}
                          title="Verified authentic source"
                        >
                          <ShieldCheck className="h-3 w-3" />
                          VERIFIED
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-zinc-800' : 'text-[#A1A1AA]'
                      }`}
                    >
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`font-mono text-[9px] ${
                            isSelected ? 'text-zinc-600' : 'text-[#71717A]'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 pt-1">
                    <ExternalLink
                      className={`h-4 w-4 ${
                        isSelected ? 'text-black' : 'text-[#71717A]'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between border-t border-[#1F1F1F] px-4 py-2.5 font-mono text-[11px] text-[#71717A] bg-[#000000]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" />
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" />
              <span>select / open</span>
            </span>
          </div>
          <span>
            {filtered.length} {filtered.length === 1 ? 'RESULT' : 'RESULTS'}
          </span>
        </div>
      </div>
    </div>
  );
};
