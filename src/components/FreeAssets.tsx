import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Search,
  X,
  Info,
  Check,
  Star,
  Send,
} from 'lucide-react';
import { FREE_ASSET_CATEGORIES, AssetCategory, AssetGroup, AssetResource } from '../data/freeAssetsData';

interface FreeAssetsProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

const SIDEBAR_CATEGORIES = [
  { id: 'audio', label: 'Audio' },
  { id: 'fonts', label: 'Fonts' },
  { id: 'video', label: 'Video' },
  { id: 'images', label: 'Images' },
  { id: '3d', label: '3D' },
  { id: 'graphics', label: 'Graphics' },
  { id: 'design', label: 'Design' },
  { id: 'utilities', label: 'Utilities' },
];

export const FreeAssets: React.FC<FreeAssetsProps> = ({ onBack, onNavigatePage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('audio');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [suggestSubmitted, setSuggestSubmitted] = useState(false);
  const [suggestForm, setSuggestForm] = useState({
    name: '',
    url: '',
    category: 'audio',
    notes: '',
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalResourceCount = useMemo(() => {
    return FREE_ASSET_CATEGORIES.reduce((acc, cat) => {
      return acc + cat.groups.reduce((gAcc, grp) => gAcc + grp.items.length, 0);
    }, 0);
  }, []);

  // Filtered categories and resources
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return FREE_ASSET_CATEGORIES.map((category) => {
      // Filter groups inside category
      const matchedGroups = category.groups
        .map((group) => {
          const matchedItems = group.items.filter((item) => {
            // Tag filter
            if (activeTag && !item.tags.includes(activeTag)) {
              return false;
            }

            // Search query filter
            if (!q) return true;

            const nameMatch = item.name.toLowerCase().includes(q);
            const descMatch = item.description.toLowerCase().includes(q);
            const tagMatch = item.tags.some((t) => t.toLowerCase().includes(q));
            const groupMatch = group.title.toLowerCase().includes(q);
            const catMatch = category.name.toLowerCase().includes(q);

            return nameMatch || descMatch || tagMatch || groupMatch || catMatch;
          });

          if (matchedItems.length === 0) return null;

          return {
            ...group,
            items: matchedItems,
          };
        })
        .filter(Boolean) as AssetGroup[];

      if (matchedGroups.length === 0) return null;

      return {
        ...category,
        groups: matchedGroups,
      };
    }).filter(Boolean) as AssetCategory[];
  }, [searchQuery, activeTag]);

  // Scroll spy to update active category as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const categoryIds = SIDEBAR_CATEGORIES.map((c) => c.id);
      const scrollPosition = window.scrollY + 140;

      for (let i = categoryIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(categoryIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveCategory(categoryIds[i]);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredCategories]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(catId);
    if (el) {
      const yOffset = -24;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Global Ctrl/Cmd + K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="mx-auto max-w-[1560px] px-4 py-8 sm:px-6 sm:py-10 bg-black text-white">
      {/* 3-Column Layout: Left Sidebar (Categories) + Center Main + Right Sidebar (Curated & More) */}
      <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10">
        {/* Left Sticky Categories Sidebar */}
        <aside className="w-full lg:w-44 xl:w-48 shrink-0 lg:sticky lg:top-8 z-10">
          <div className="font-sans text-[11px] font-bold tracking-widest text-zinc-500 uppercase mb-3 px-3">
            CATEGORIES
          </div>
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 gap-1 lg:gap-0.5 no-scrollbar">
            {SIDEBAR_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  className={`text-left text-sm py-2 px-3 transition-colors flex items-center whitespace-nowrap rounded-r-sm ${
                    isActive
                      ? 'border-l-2 border-white bg-zinc-900 text-white font-medium'
                      : 'border-l-2 border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 space-y-8 w-full">
          {/* Breadcrumb Navigation matching reference: Home / Free Assets */}
          <nav className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-zinc-300">Free Assets</span>
          </nav>

          {/* Header */}
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Free Assets
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-400">
              Handpicked resources — fonts, SFX, LUTs, footage, 3D, and more.
            </p>
          </div>

          {/* Search Bar with Ctrl/Cmd + K */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fonts, sounds, tools…"
                className="w-full rounded-md border border-zinc-800 bg-[#0D0D0D] py-2.5 pl-9 pr-24 text-sm text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1.5">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="rounded p-1 text-zinc-500 hover:text-white transition-colors"
                    title="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  <span>Ctrl/⌘</span>
                  <span>K</span>
                </kbd>
              </div>
            </div>

            {activeTag && (
              <div className="flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200">
                <span className="text-zinc-500">Tag:</span>
                <span className="font-mono text-white font-semibold">#{activeTag}</span>
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="ml-1 text-zinc-500 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* Informational Banner */}
          <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-4 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 mt-1 sm:mt-0" />
              <span>
                Everything here is free. Some sites have paid tiers — we only link to the free parts.
              </span>
            </div>
          </div>

          {/* Main Asset Directory */}
          <div className="space-y-16 pt-4">
            {filteredCategories.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-800 p-12 text-center">
                <Search className="mx-auto h-8 w-8 text-zinc-600" />
                <h3 className="mt-3 font-sans text-base font-semibold text-white">
                  No matching resources found
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  No free assets match &quot;{searchQuery || activeTag}&quot;. Try adjusting your keywords or category filter.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="rounded border border-zinc-800 bg-[#141414] px-3 py-1.5 text-xs text-white hover:border-zinc-500 transition-colors"
                    >
                      Clear search
                    </button>
                  )}
                  {activeTag && (
                    <button
                      type="button"
                      onClick={() => setActiveTag(null)}
                      className="rounded border border-zinc-800 bg-[#141414] px-3 py-1.5 text-xs text-white hover:border-zinc-500 transition-colors"
                    >
                      Clear tag filter
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <section key={category.id} id={category.id} className="space-y-8 scroll-mt-20">
                  {/* Category Header */}
                  <div className="border-b border-zinc-800 pb-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                      {category.id}
                    </span>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {category.name}
                      </h2>
                      <span className="font-mono text-xs text-zinc-500">
                        {category.groups.reduce((acc, g) => acc + g.items.length, 0)} resources
                      </span>
                    </div>
                    {category.description && (
                      <p className="mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-4xl">
                        {category.description.includes('Sourcing Anime Footage') ? (
                          <>
                            {category.description.split('Sourcing Anime Footage')[0]}
                            <button
                              type="button"
                              onClick={() => onNavigatePage?.('sourcing-footage')}
                              className="font-semibold text-white underline hover:text-zinc-300"
                            >
                              Sourcing Anime Footage
                            </button>
                            {category.description.split('Sourcing Anime Footage')[1]}
                          </>
                        ) : (
                          category.description
                        )}
                      </p>
                    )}
                  </div>

                  {/* Subgroups in Category */}
                  <div className="space-y-12">
                    {category.groups.map((group) => (
                      <div key={group.id} className="space-y-4">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                            {group.title}
                          </h3>
                          {group.description && (
                            <p className="mt-1 text-sm text-zinc-400 leading-relaxed max-w-3xl">
                              {group.description.includes('Sourcing Anime Footage guide') ? (
                                <>
                                  {group.description.split('Sourcing Anime Footage guide')[0]}
                                  <button
                                    type="button"
                                    onClick={() => onNavigatePage?.('sourcing-footage')}
                                    className="font-semibold text-white underline hover:text-zinc-300"
                                  >
                                    Sourcing Anime Footage guide
                                  </button>
                                  {group.description.split('Sourcing Anime Footage guide')[1]}
                                </>
                              ) : (
                                group.description
                              )}
                            </p>
                          )}
                        </div>

                        {/* Resources Grid - 2 columns matching reference */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {group.items.map((item) => (
                            <a
                              key={item.id}
                              href={item.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="group relative flex flex-col justify-between rounded-md border border-zinc-800 bg-[#0E0E0E] p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-[#141414] hover:shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                            >
                              <div>
                                <div className="flex items-start justify-between gap-2.5">
                                  <h4 className="font-sans text-sm sm:text-[15px] font-semibold text-white group-hover:text-zinc-200 transition-colors">
                                    {item.name}
                                  </h4>
                                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                                </div>

                                <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>

                              <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                                {item.tags.map((tag) => (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveTag(activeTag === tag ? null : tag);
                                    }}
                                    className={`rounded border px-1.5 py-0.5 font-mono text-[10.5px] transition-colors ${
                                      activeTag === tag
                                        ? 'border-white bg-white text-black font-semibold'
                                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-white'
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </main>

        {/* Right Sticky Sidebar: CURATED & MORE cards (in the other side like that and black & white only) */}
        <aside className="w-full lg:w-60 xl:w-64 shrink-0 lg:sticky lg:top-8 z-10 space-y-4">
          {/* CURATED Stats Box */}
          <div className="rounded border border-zinc-800 bg-[#0D0D0D] p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-white uppercase">
              <Star className="h-3.5 w-3.5 fill-transparent text-white" />
              <span>CURATED</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white leading-none">
                  {totalResourceCount}
                </div>
                <div className="mt-1.5 font-mono text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                  ITEMS
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white leading-none">
                  {SIDEBAR_CATEGORIES.length}
                </div>
                <div className="mt-1.5 font-mono text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                  CATEGORIES
                </div>
              </div>
            </div>
          </div>

          {/* MORE Navigation Box */}
          <div className="rounded border border-zinc-800 bg-[#0D0D0D] p-4">
            <div className="font-sans text-[11px] font-bold tracking-widest text-zinc-500 uppercase mb-4">
              MORE
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => (onNavigatePage ? onNavigatePage('windows') : onBack())}
                  className="group flex items-center gap-2.5 text-left font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 group-hover:bg-white group-hover:scale-125 transition-transform" />
                  <span>Windows Software</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => (onNavigatePage ? onNavigatePage('faq') : onBack())}
                  className="group flex items-center gap-2.5 text-left font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 group-hover:bg-white group-hover:scale-125 transition-transform" />
                  <span>FAQ</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsSuggestOpen(true)}
                  className="group flex items-center gap-2.5 text-left font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 group-hover:bg-white group-hover:scale-125 transition-transform" />
                  <span>Suggest a resource</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Suggest a Resource Modal (Black and White only) */}
      {isSuggestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl border border-zinc-800 bg-[#0D0D0D] p-6 sm:p-7 shadow-2xl text-white">
            <button
              type="button"
              onClick={() => {
                setIsSuggestOpen(false);
                setSuggestSubmitted(false);
              }}
              className="absolute right-4 top-4 rounded p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {suggestSubmitted ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-white mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Suggestion Received!
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Thank you for helping keep this free asset directory fresh. We will check it out and curate it into the directory!
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuggestOpen(false);
                      setSuggestSubmitted(false);
                      setSuggestForm({ name: '', url: '', category: 'audio', notes: '' });
                    }}
                    className="rounded border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!suggestForm.name.trim() || !suggestForm.url.trim()) return;
                  setSuggestSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
                  <Star className="h-4 w-4 fill-transparent text-white" />
                  <span>COMMUNITY CONTRIBUTION</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Suggest a Resource
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    Know a high-quality free asset library, tool, or website that should be featured?
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Resource Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FreeSFX Library"
                      value={suggestForm.name}
                      onChange={(e) => setSuggestForm({ ...suggestForm, name: e.target.value })}
                      className="w-full rounded border border-zinc-800 bg-black px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={suggestForm.url}
                      onChange={(e) => setSuggestForm({ ...suggestForm, url: e.target.value })}
                      className="w-full rounded border border-zinc-800 bg-black px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Category
                    </label>
                    <select
                      value={suggestForm.category}
                      onChange={(e) => setSuggestForm({ ...suggestForm, category: e.target.value })}
                      className="w-full rounded border border-zinc-800 bg-black px-3 py-2 text-sm text-white focus:border-white focus:outline-none"
                    >
                      {SIDEBAR_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-zinc-900 text-white">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What makes this resource great? (e.g. CC0 license, no registration required)"
                      value={suggestForm.notes}
                      onChange={(e) => setSuggestForm({ ...suggestForm, notes: e.target.value })}
                      className="w-full rounded border border-zinc-800 bg-black px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">
                    Checked by humans before publishing
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSuggestOpen(false)}
                      className="rounded px-3 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded border border-white bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
