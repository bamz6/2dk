import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Search,
  ArrowLeft,
  ShieldCheck,
  Check,
  Copy,
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { RESOURCES } from '../data/resources';

interface CategoryPageProps {
  categoryId: CategoryId;
  onBack: () => void;
  onNavigateCategory: (id: CategoryId) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  onBack,
  onNavigateCategory,
}) => {
  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // All resources for this category
  const categoryResources = useMemo(() => {
    return RESOURCES.filter((r) => r.category === categoryId);
  }, [categoryId]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return categoryResources.filter((r) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.author?.toLowerCase().includes(q)
      );
    });
  }, [categoryResources, searchQuery]);

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb & Navigation */}
      <div className="mb-6 flex items-center justify-between font-mono text-xs text-[#71717A]">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-1.5 text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>INDEX // BROWSE</span>
        </button>

        <span className="tracking-wider">{category.section}</span>
      </div>

      {/* Category Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {category.title}
          </h1>
          {category.badge && (
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded border border-[#1F1F1F] bg-[#0D0D0D] text-[#A1A1AA]">
              {category.badge}
            </span>
          )}
        </div>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#A1A1AA]">
          {category.description}
        </p>

        {/* Filter / Search Bar inside category */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#71717A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Filter ${category.title}...`}
              className="w-full rounded-md border border-[#1F1F1F] bg-[#0D0D0D] py-2 pl-9 pr-4 font-mono text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-white"
            />
          </div>

          <div className="font-mono text-xs text-[#71717A]">
            SHOWING {filteredResources.length} OF {categoryResources.length} ENTRIES
          </div>
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="mt-8">
        {filteredResources.length === 0 ? (
          <div className="py-20 text-center font-mono text-xs text-[#71717A]">
            NO TOOLS FOUND MATCHING "{searchQuery.toUpperCase()}".
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-white underline underline-offset-4 hover:text-zinc-300"
              >
                CLEAR FILTER
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="group flex flex-col justify-between rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 transition-all hover:border-zinc-400"
              >
                <div>
                  {/* Top line: Name and Version */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-sans text-lg font-bold text-white group-hover:text-zinc-100">
                        {res.name}
                      </h3>
                      {res.author && (
                        <span className="font-mono text-[11px] text-[#71717A]">
                          by {res.author}
                        </span>
                      )}
                    </div>
                    {res.version && (
                      <span className="font-mono text-[10px] text-[#A1A1AA] border border-[#1F1F1F] px-1.5 py-0.5 rounded bg-black">
                        v{res.version}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs text-[#A1A1AA] leading-relaxed">
                    {res.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-[#71717A] bg-black border border-[#1F1F1F] px-1.5 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 border-t border-[#1F1F1F] pt-4 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 text-[10px] text-[#71717A]">
                    {res.license && <span>{res.license}</span>}
                    {res.isVerified && (
                      <span className="flex items-center gap-1 text-zinc-400" title="Audited Official Release">
                        <ShieldCheck className="h-3 w-3" />
                        VERIFIED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(res.link, res.id)}
                      className="p-1.5 rounded text-[#71717A] hover:bg-white hover:text-black transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === res.id ? (
                        <Check className="h-3.5 w-3.5 text-white" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <a
                      href={res.link}
                      target={res.link.startsWith('#') ? '_self' : '_blank'}
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-1 font-semibold text-black hover:bg-zinc-200 transition-colors"
                    >
                      <span>GET</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
