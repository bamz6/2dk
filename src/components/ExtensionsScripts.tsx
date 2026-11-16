import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ExternalLink,
  Copy,
  Check,
  Layers,
  ChevronRight,
  ChevronDown,
  Download,
  Flag,
} from 'lucide-react';
import {
  EXTENSIONS_DATA,
  EXTENSION_SECTIONS,
  ExtensionSectionId,
  ExtensionItem,
} from '../data/extensionsData';

interface ExtensionsScriptsProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

function getHostName(urlStr: string, explicitHost?: string): string {
  if (explicitHost) return explicitHost;
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return 'direct';
  }
}

export const ExtensionsScripts: React.FC<ExtensionsScriptsProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<ExtensionSectionId>('workflow');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [openSubgroups, setOpenSubgroups] = useState<Record<string, boolean>>({});
  const [reportedItem, setReportedItem] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSubgroup = (subgroupId: string) => {
    setOpenSubgroups((prev) => ({
      ...prev,
      [subgroupId]: !prev[subgroupId],
    }));
  };

  const handleReport = (itemName: string) => {
    setReportedItem(itemName);
    setTimeout(() => setReportedItem(null), 3000);
  };

  // Global Ctrl/Cmd + K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyPassword = () => {
    navigator.clipboard.writeText('flame');
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  // Filter items based on search query, active tag, and section
  const filteredData = useMemo(() => {
    let list = EXTENSIONS_DATA;

    if (activeTag) {
      list = list.filter((item) => item.tags.includes(activeTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          item.subgroup.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [searchQuery, activeTag]);

  // Group filtered items by section and then by subgroup
  const groupedSections = useMemo(() => {
    return EXTENSION_SECTIONS.map((sec) => {
      const sectionItems = filteredData.filter((item) => item.category === sec.id);

      const subgroups = sec.subgroups
        .map((sg) => {
          const items = sectionItems.filter((i) => i.subgroup === sg.title);
          return {
            ...sg,
            items,
          };
        })
        .filter((sg) => sg.items.length > 0);

      return {
        ...sec,
        totalItems: sectionItems.length,
        subgroups,
      };
    }).filter((sec) => sec.subgroups.length > 0);
  }, [filteredData]);

  const scrollToSection = (sectionId: ExtensionSectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: SECTIONS NAVIGATION                        */}
          {/* ======================================================== */}
          <aside className="lg:col-span-3 xl:col-span-2 hidden lg:block">
            <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
              <div className="font-mono text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                SECTIONS
              </div>
              <nav className="space-y-1">
                {EXTENSION_SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  const count = filteredData.filter((i) => i.category === sec.id).length;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`group flex w-full items-center justify-between rounded px-3 py-2 text-left text-xs transition-colors ${
                        isActive
                          ? 'border-l-2 border-white bg-zinc-900 font-medium text-white'
                          : 'text-zinc-400 hover:bg-[#141414] hover:text-white'
                      }`}
                    >
                      <span className="truncate">{sec.label}</span>
                      {count > 0 && (
                        <span
                          className={`font-mono text-[10px] ${
                            isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* CENTER COLUMN: MAIN CONTENT AREA                         */}
          {/* ======================================================== */}
          <main className="lg:col-span-6 xl:col-span-7 space-y-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <button
                type="button"
                onClick={onBack}
                className="hover:text-white transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-zinc-300">Extensions &amp; Scripts</span>
            </nav>

            {/* Page Header */}
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                <span>Extensions </span>
                <span className="italic font-normal text-zinc-300">&amp;</span>
                <span> Scripts</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                After Effects and Premiere Pro panels, scripts, and workflow tools.
              </p>
            </div>

            {/* Search Bar with Ctrl/Cmd + K */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search extensions, scripts, categories..."
                className="w-full rounded-md border border-zinc-800 bg-[#0D0D0D] py-2.5 pl-10 pr-24 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
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
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  <span>Ctrl/⌘</span>
                  <span>K</span>
                </kbd>
              </div>
            </div>

            {/* Active Tag Filter indicator */}
            {activeTag && (
              <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 w-fit">
                <span className="text-zinc-500">Filtered by tag:</span>
                <span className="font-mono text-white font-semibold">#{activeTag}</span>
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="ml-1 text-zinc-500 hover:text-white"
                  title="Remove tag filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Informational Banner 1 (Notes & Password) */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-4 text-xs text-zinc-400 space-y-2 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
                <span>
                  Extensions and scripts may ship as ZXP panels, CEP folders, JSX/JSXBIN scripts, or Premiere Pro panels. Mirrors are added after verification — unlinked entries show as Pending.
                </span>
              </div>
              <p className="pl-4 text-zinc-400">
                Check the{' '}
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('beginners-guide')}
                  className="font-bold text-white hover:text-zinc-300 underline underline-offset-2 transition-colors"
                >
                  install locations guide
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('beginners-guide')}
                  className="font-bold text-white hover:text-zinc-300 underline underline-offset-2 transition-colors"
                >
                  After Effects paths guide
                </button>{' '}
                before moving files.
              </p>
              <div className="pl-4 flex items-center gap-2 pt-0.5">
                <span>Every download is a password-protected .7z archive. The password is</span>
                <button
                  type="button"
                  onClick={copyPassword}
                  className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-[11px] font-bold text-white hover:border-zinc-500 transition-colors"
                  title="Click to copy password"
                >
                  <span>flame</span>
                  {copiedPassword ? (
                    <Check className="h-3 w-3 text-white" />
                  ) : (
                    <Copy className="h-3 w-3 text-zinc-400" />
                  )}
                </button>
                {copiedPassword && (
                  <span className="font-mono text-[10px] text-zinc-300">Copied!</span>
                )}
              </div>
            </div>

            {/* Informational Banner 2 (Compatibility Box) */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-4 text-xs space-y-2.5 leading-relaxed">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 rounded">
                  COMPATIBILITY
                </span>
                <span className="font-bold text-white">
                  Panels, scripts, and plugins are not interchangeable.
                </span>
              </div>

              <ul className="space-y-1.5 pl-1 text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="h-1 w-1 rounded-full bg-zinc-500 shrink-0 mt-2" />
                  <span>
                    CEP/ZXP panels depend on the host app&apos;s CEP/CSXS support. If nothing appears, check the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigatePage?.('faq')}
                      className="font-bold text-white underline underline-offset-2 hover:text-zinc-300"
                    >
                      CEP debug-mode FAQ
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => onNavigatePage?.('beginners-guide')}
                      className="font-bold text-white underline underline-offset-2 hover:text-zinc-300"
                    >
                      install-location guide
                    </button>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1 w-1 rounded-full bg-zinc-500 shrink-0 mt-2" />
                  <span>
                    JSX/JSXBIN scripts belong in Scripts or ScriptUI Panels, not MediaCore or plugin folders.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1 w-1 rounded-full bg-zinc-500 shrink-0 mt-2" />
                  <span>
                    When a panel is old, test it in the AE or Premiere version it was built for before assuming the download is broken.
                  </span>
                </li>
              </ul>
            </div>

            {/* ======================================================== */}
            {/* SECTIONS & RESOURCE CARDS GRID BY SUBGROUPS              */}
            {/* ======================================================== */}
            <div className="space-y-14 pt-2">
              {groupedSections.length === 0 ? (
                <div className="rounded-lg border border-dashed border-zinc-800 p-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-zinc-600" />
                  <h3 className="mt-3 font-sans text-base font-semibold text-white">
                    No matching extensions found
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    No items match &quot;{searchQuery || activeTag}&quot;. Try clearing your search or filter.
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white hover:bg-zinc-800"
                      >
                        Clear search
                      </button>
                    )}
                    {activeTag && (
                      <button
                        type="button"
                        onClick={() => setActiveTag(null)}
                        className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white hover:bg-zinc-800"
                      >
                        Clear tag
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                    <span className="font-mono text-[11px] text-zinc-500">
                      Showing {groupedSections.reduce((acc, s) => acc + s.totalItems, 0)} tools across {groupedSections.length} categories
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const allIds: Record<string, boolean> = {};
                          groupedSections.forEach((s) =>
                            s.subgroups.forEach((sg) => {
                              allIds[sg.id] = true;
                            })
                          );
                          setOpenSubgroups(allIds);
                        }}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        Expand all
                      </button>
                      <span className="text-zinc-600">•</span>
                      <button
                        type="button"
                        onClick={() => setOpenSubgroups({})}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        Collapse all
                      </button>
                    </div>
                  </div>

                  {groupedSections.map((section) => (
                    <section
                      key={section.id}
                      id={`section-${section.id}`}
                      className="scroll-mt-24 space-y-4"
                    >
                      {/* Main Section Header (Black and White) */}
                      <div className="pt-2 pb-1">
                        <div className="font-mono text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">
                          {section.id.toUpperCase().replace('-', ' & ')}
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-0.5">
                          {section.displayTitle}
                        </h2>
                      </div>

                      {/* Subgroups in Section as Collapsible Accordions (Black and White) */}
                      <div className="space-y-3">
                        {section.subgroups.map((subgroup) => {
                          const isOpen =
                            Boolean(searchQuery.trim()) || Boolean(openSubgroups[subgroup.id]);

                          return (
                            <div
                              key={subgroup.id}
                              className="rounded-md border border-zinc-800 bg-[#0E0E0E] overflow-hidden transition-colors hover:border-zinc-700"
                            >
                              {/* Subgroup Header Button */}
                              <button
                                type="button"
                                onClick={() => toggleSubgroup(subgroup.id)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 text-left transition-colors hover:bg-zinc-900/50 ${
                                  isOpen ? 'border-b border-zinc-800' : ''
                                }`}
                              >
                                <span className="font-sans text-sm sm:text-base font-semibold text-white">
                                  {subgroup.title}
                                </span>
                                <div className="flex items-center gap-2.5">
                                  <span className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded">
                                    {subgroup.items.length}
                                  </span>
                                  {isOpen ? (
                                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                                  )}
                                </div>
                              </button>

                              {/* Expanded Items List (Strict Black & White) */}
                              {isOpen && (
                                <div className="divide-y divide-zinc-800/80">
                                  {subgroup.items.map((item) => {
                                    const host = getHostName(item.link, item.host);
                                    return (
                                      <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 transition-colors hover:bg-zinc-900/40"
                                      >
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-sans text-sm sm:text-base font-semibold text-white">
                                              {item.name}
                                            </h4>
                                          </div>
                                          <div className="mt-1">
                                            <span className="inline-flex items-center rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                                              Host: {host}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                                          <button
                                            type="button"
                                            onClick={() => handleReport(item.name)}
                                            title="Report link or issue"
                                            className="p-1.5 text-zinc-500 hover:text-white transition-colors rounded"
                                          >
                                            <Flag className="h-3.5 w-3.5" />
                                          </button>
                                          <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black hover:border-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white transition-all"
                                          >
                                            <Download className="h-3.5 w-3.5" />
                                            <span>Download</span>
                                          </a>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </>
              )}
            </div>
          </main>

          {/* ======================================================== */}
          {/* RIGHT SIDEBAR: EXTENSIONS STATS, GUIDES & REQUEST        */}
          {/* ======================================================== */}
          <aside className="lg:col-span-3 xl:col-span-3 space-y-4">
            <div className="sticky top-20 space-y-4">
              {/* EXTENSIONS Metrics Box */}
              <div className="rounded border border-zinc-800 bg-[#0D0D0D] p-5">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
                  <Layers className="h-4 w-4 text-white" />
                  <span>EXTENSIONS</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4">
                  <div>
                    <div className="font-serif text-3xl font-bold tracking-tight text-white">
                      {EXTENSIONS_DATA.length}
                    </div>
                    <div className="mt-1.5 font-mono text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                      ITEMS
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-bold tracking-tight text-white">
                      {EXTENSION_SECTIONS.length}
                    </div>
                    <div className="mt-1.5 font-mono text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                      CATEGORIES
                    </div>
                  </div>
                </div>
              </div>

              {/* GUIDES Navigation Box */}
              <div className="rounded border border-zinc-800 bg-[#0D0D0D] p-5">
                <div className="font-mono text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-3.5">
                  GUIDES
                </div>
                <ul className="space-y-2.5 text-xs">
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigatePage?.('beginners-guide')}
                      className="group flex items-center gap-2.5 text-left font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 group-hover:bg-white group-hover:scale-125 transition-transform" />
                      <span>Install Locations</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigatePage?.('beginners-guide')}
                      className="group flex items-center gap-2.5 text-left font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 group-hover:bg-white group-hover:scale-125 transition-transform" />
                      <span>After Effects Paths</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigatePage?.('windows')}
                      className="group flex items-center gap-2.5 text-left font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 group-hover:bg-white group-hover:scale-125 transition-transform" />
                      <span>Windows Install Guide</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Flag Report Toast */}
      {reportedItem && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white shadow-xl animate-fade-in">
          <Flag className="h-3.5 w-3.5 text-zinc-400" />
          <span>Report received for <strong>{reportedItem}</strong>. We will review this link.</span>
        </div>
      )}
    </div>
  );
};
