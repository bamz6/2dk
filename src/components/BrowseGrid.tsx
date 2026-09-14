import React from 'react';
import {
  Monitor,
  Laptop,
  BookOpen,
  Play,
  FileText,
  Sparkles,
  Code,
  Box,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import { Category, CategoryId, Platform } from '../types';
import { CATEGORIES } from '../data/categories';
import { RESOURCES } from '../data/resources';

interface BrowseGridProps {
  selectedPlatform: Platform;
  onSelectCategory: (id: CategoryId) => void;
}

export const BrowseGrid: React.FC<BrowseGridProps> = ({
  selectedPlatform,
  onSelectCategory,
}) => {
  // Filter categories according to selectedPlatform
  const filteredCategories = CATEGORIES.filter((cat) => {
    if (!cat.platform || cat.platform === 'all') return true;
    if (selectedPlatform === 'all') return true;
    return cat.platform === selectedPlatform;
  });

  const getIcon = (iconName: string) => {
    const props = { className: 'h-5 w-5 text-white' };
    switch (iconName) {
      case 'monitor':
        return <Monitor {...props} />;
      case 'laptop':
        return <Laptop {...props} />;
      case 'book-open':
        return <BookOpen {...props} />;
      case 'play':
        return <Play {...props} />;
      case 'file-text':
        return <FileText {...props} />;
      case 'sparkles':
        return <Sparkles {...props} />;
      case 'code':
        return <Code {...props} />;
      case 'box':
        return <Box {...props} />;
      case 'shield':
        return <Shield {...props} />;
      default:
        return <Box {...props} />;
    }
  };

  const getResourceCount = (catId: CategoryId) => {
    if (catId === 'beginners-guide') return '5 SECTIONS';
    return `${RESOURCES.filter((r) => r.category === catId).length} ENTRIES`;
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#71717A] uppercase">
            BROWSE
          </span>
          <div className="h-[1px] flex-1 bg-[#1F1F1F]" />
        </div>

        {/* Dense Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className="group relative flex flex-col justify-between rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 text-left transition-all duration-150 hover:border-zinc-400 hover:bg-[#121212] focus:outline-none focus:border-white"
            >
              <div>
                {/* Top bar: Icon and Badge/Section */}
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded bg-black border border-[#1F1F1F] group-hover:border-zinc-400 transition-colors">
                    {getIcon(cat.icon)}
                  </div>
                  {cat.badge && (
                    <span className="font-mono text-[10px] tracking-wider text-[#A1A1AA] bg-black border border-[#1F1F1F] px-2 py-0.5 rounded">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-sans text-base font-bold text-white group-hover:text-zinc-100 transition-colors">
                    {cat.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-[#71717A] opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:text-white" />
                </div>

                {/* Description */}
                <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Spec Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-[#1F1F1F] pt-3 font-mono text-[10px] text-[#71717A]">
                <span>{cat.section}</span>
                <span className="text-zinc-400 font-medium">
                  {getResourceCount(cat.id)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
