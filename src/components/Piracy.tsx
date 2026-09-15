import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ExternalLink,
  Search,
  X,
  AlertTriangle,
  Skull,
  Send,
  Check,
} from 'lucide-react';
import {
  PIRACY_CATEGORIES,
  PiracyCategory,
  PiracyGroup,
  PiracyResource,
} from '../data/piracyData';

interface PiracyProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

export const Piracy: React.FC<PiracyProps> = ({ onBack, onNavigatePage }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('fmhy');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [suggestSubmitted, setSuggestSubmitted] = useState(false);
  const [suggestForm, setSuggestForm] = useState({
    name: '',
    url: '',
    category: 'fmhy',
    notes: '',
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalItemsCount = useMemo(() => {
    return PIRACY_CATEGORIES.reduce((acc, cat) => {
      return acc + cat.groups.reduce((gAcc, grp) => gAcc + grp.items.length, 0);
    }, 0);
  }, []);

  const activeCategory = useMemo(() => {
    return (
      PIRACY_CATEGORIES.find((c) => c.id === activeCategoryId) ||
      PIRACY_CATEGORIES[0]
    );
  }, [activeCategoryId]);

  // Filtered categories and resources - all categories rendered continuously for natural scrolling
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return PIRACY_CATEGORIES
      .map((category) => {
        const matchedGroups = category.groups
          .map((group) => {
            const matchedItems = group.items.filter((item) => {
              if (activeTag && !item.tags.includes(activeTag)) {
                return false;
              }

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
          .filter(Boolean) as PiracyGroup[];

        if (matchedGroups.length === 0) return null;

        return {
          ...category,
          groups: matchedGroups,
        };
      })
      .filter(Boolean) as PiracyCategory[];
  }, [searchQuery, activeTag]);

  // Scroll spy to automatically update active category in sidebar as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const categoryIds = PIRACY_CATEGORIES.map((c) => c.id);
      const scrollPosition = window.scrollY + 160;

      for (let i = categoryIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(categoryIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveCategoryId(categoryIds[i]);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredCategories]);

  const scrollToCategory = (catId: string) => {
    setActiveCategoryId(catId);
    if (searchQuery || activeTag) {
      setSearchQuery('');
      setActiveTag(null);
      setTimeout(() => {
        const el = document.getElementById(catId);
        if (el) {
          const yOffset = -24;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    const el = document.getElementById(catId);
    if (el) {
      const yOffset = -24;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handle global or in-page Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
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

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestForm.name.trim() || !suggestForm.url.trim()) return;
    setSuggestSubmitted(true);
    setTimeout(() => {
      setSuggestSubmitted(false);
      setIsSuggestOpen(false);
      setSuggestForm({ name: '', url: '', category: 'fmhy', notes: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12">
        {/* Breadcrumb Navigation: Home / Piracy */}
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-zinc-500">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-300">Piracy</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-5xl sm:text-6xl font-normal tracking-tight text-white">
            Piracy
          </h1>
          <p className="mt-2.5 max-w-3xl text-sm sm:text-base text-zinc-400 leading-relaxed">
            Curated index of external piracy resources — sites, guides, and tools we don&apos;t host or scan.
          </p>
        </div>

        {/* 3-Column Layout exactly like the screenshot */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Column: Categories List */}
          <aside className="w-full lg:w-48 xl:w-52 shrink-0 space-y-2 lg:sticky lg:top-8">
            <div className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-3 px-3">
              CATEGORIES
            </div>
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              {PIRACY_CATEGORIES.map((cat) => {
                const isActive = activeCategoryId === cat.id && !searchQuery;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollToCategory(cat.id)}
                    className={`shrink-0 flex items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? 'border-l-2 border-white bg-zinc-900 text-white font-medium shadow-sm'
                        : 'border-l-2 border-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Center / Main Content Column */}
          <main className="flex-1 min-w-0 space-y-6 w-full">
            {/* Search Input with Ctrl/⌘ K */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trackers, tools, sites..."
                className="w-full rounded-md border border-zinc-800 bg-[#0D0D0D] py-2.5 pl-10 pr-24 text-sm text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 gap-1.5">
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
                <div className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  <span>Ctrl/⌘</span>
                  <span>K</span>
                </div>
              </div>
            </div>

            {/* Active Tag Filter Indicator */}
            {activeTag && (
              <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200">
                <span className="text-zinc-500">Filtering by tag:</span>
                <span className="font-mono text-white font-semibold">#{activeTag}</span>
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="ml-auto rounded p-0.5 text-zinc-500 hover:text-white"
                  title="Clear tag filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Read This First Warning Banner */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-5 text-xs leading-relaxed text-zinc-300 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 shrink-0 text-zinc-400 mt-0.5" />
                <div className="space-y-2.5">
                  <p>
                    <strong className="text-white font-semibold">Read this first.</strong> Piracy is illegal in most places. Consequences vary by country and enforcement — from ISP warnings and fines to civil claims or criminal charges in serious cases. Know your local laws before you proceed.
                  </p>
                  <p className="text-zinc-400">
                    Also follow{' '}
                    <a
                      href="https://www.reddit.com/r/Piracy/wiki/megathread/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold text-white underline underline-offset-2 hover:text-zinc-300 transition-colors"
                    >
                      r/Piracy&apos;s Megathread
                    </a>{' '}
                    &ldquo;Do this first&rdquo; instructions before you dive in.
                  </p>
                  <p className="text-zinc-400">
                    We recommend{' '}
                    <a
                      href="https://mullvad.net"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold text-white underline underline-offset-2 hover:text-zinc-300 transition-colors"
                    >
                      Mullvad VPN
                    </a>
                    , run an <strong className="text-white font-semibold">adblocker</strong>, never enter your real email or card details on these sites, and cross-check every link against{' '}
                    <a
                      href="https://fmhy.net/unsafe"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold text-white underline underline-offset-2 hover:text-zinc-300 transition-colors"
                    >
                      FMHY&apos;s unsafe sites list
                    </a>
                    . We don&apos;t host anything here — these are public links to third-party sites. Domains change often; cross-check current URLs on FMHY if something breaks.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Category Content Sections */}
            <div className="space-y-12 pt-2">
              {filteredCategories.length === 0 ? (
                <div className="rounded-md border border-dashed border-zinc-800 bg-[#0D0D0D]/50 p-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-zinc-600" />
                  <h3 className="mt-3 font-sans text-base font-semibold text-white">
                    No matching resources found
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    No resources matched &quot;{searchQuery || activeTag}&quot;. Try adjusting your keywords or category filter.
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white hover:border-zinc-600 transition-colors"
                      >
                        Clear search
                      </button>
                    )}
                    {activeTag && (
                      <button
                        type="button"
                        onClick={() => setActiveTag(null)}
                        className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white hover:border-zinc-600 transition-colors"
                      >
                        Clear tag
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <section key={category.id} id={category.id} className="space-y-8 scroll-mt-6">
                    {/* Category Header */}
                    <div className="border-b border-zinc-800 pb-5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                        {category.label}
                      </span>
                      <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
                        {category.name}
                      </h2>
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-3xl">
                        {category.description}
                      </p>
                    </div>

                    {/* Subgroups within Category */}
                    <div className="space-y-8">
                      {category.groups.map((group) => (
                        <div key={group.id} className="space-y-3">
                          <div>
                            <h3 className="font-serif text-xl font-normal text-zinc-200">
                              {group.title}
                            </h3>
                            {group.description && (
                              <p className="mt-1 text-xs text-zinc-400">
                                {group.description}
                              </p>
                            )}
                          </div>

                          {/* 2-Column Resource Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {group.items.map((item: PiracyResource) => (
                              <a
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="group relative flex flex-col justify-between rounded-md border border-zinc-800 bg-[#0D0D0D] p-4 transition-all duration-150 hover:border-zinc-600 hover:bg-[#121212] hover:shadow-lg"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="font-sans text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                                      {item.name}
                                    </h4>
                                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-500 group-hover:text-white transition-colors" />
                                  </div>
                                  <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>

                                <div className="mt-3.5 flex flex-wrap gap-1.5">
                                  {item.tags.map((tag) => (
                                    <button
                                      key={tag}
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveTag(activeTag === tag ? null : tag);
                                      }}
                                      className={`rounded border px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
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

          {/* Right Column: Stat Card & MORE Box */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4 lg:sticky lg:top-8">
            {/* PIRACY Stats Box */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-4">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-white uppercase">
                <Skull className="h-3.5 w-3.5" />
                <span>PIRACY</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-serif text-3xl font-bold text-white leading-none">
                    {totalItemsCount}
                  </div>
                  <div className="mt-1 font-mono text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                    ITEMS
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-bold text-white leading-none">
                    {PIRACY_CATEGORIES.length}
                  </div>
                  <div className="mt-1 font-mono text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                    CATEGORIES
                  </div>
                </div>
              </div>
            </div>

            {/* MORE Navigation Box */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-4">
              <div className="font-mono text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-3">
                MORE
              </div>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage?.('free-assets')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>Free Assets</span>
                  </button>
                </li>
                <li>
                  <a
                    href="https://fmhy.net"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>FMHY Wiki</span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsSuggestOpen(true)}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>Suggest a resource</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Suggest Resource Modal */}
      {isSuggestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-[#0D0D0D] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Skull className="h-4 w-4 text-white" />
                <h3 className="font-serif text-lg font-normal text-white">
                  Suggest a Resource
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSuggestOpen(false)}
                className="rounded p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {suggestSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white border border-zinc-700">
                  <Check className="h-5 w-5" />
                </div>
                <p className="mt-3 font-medium text-white">Suggestion Received</p>
                <p className="mt-1 text-xs text-zinc-400">
                  Thank you! We will inspect and audit before adding to the index.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                    Resource Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Libgen Mirror, Nicotine+"
                    value={suggestForm.name}
                    onChange={(e) =>
                      setSuggestForm({ ...suggestForm, name: e.target.value })
                    }
                    className="w-full rounded border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                    Official / Direct URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={suggestForm.url}
                    onChange={(e) =>
                      setSuggestForm({ ...suggestForm, url: e.target.value })
                    }
                    className="w-full rounded border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                    Target Category
                  </label>
                  <select
                    value={suggestForm.category}
                    onChange={(e) =>
                      setSuggestForm({ ...suggestForm, category: e.target.value })
                    }
                    className="w-full rounded border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-xs text-white focus:border-zinc-400 focus:outline-none"
                  >
                    {PIRACY_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                    Notes / Safety context
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Why should this be added? Any mirrors or precautions?"
                    value={suggestForm.notes}
                    onChange={(e) =>
                      setSuggestForm({ ...suggestForm, notes: e.target.value })
                    }
                    className="w-full rounded border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsSuggestOpen(false)}
                    className="rounded border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
                  >
                    <Send className="h-3 w-3" />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
