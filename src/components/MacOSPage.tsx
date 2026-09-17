import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  ArrowLeft,
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  X,
  FileArchive,
  Wrench,
  Cpu,
  ShieldAlert,
  MessageSquare,
} from 'lucide-react';
import { MACOS_SECTIONS_DATA } from '../data/macosData';

interface MacOSPageProps {
  onBack: () => void;
  onNavigatePage: (page: string) => void;
  onOpenSearch: () => void;
}

export const MacOSPage: React.FC<MacOSPageProps> = ({
  onBack,
  onNavigatePage,
  onOpenSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bottomSearchQuery, setBottomSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState<string>('software');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [activeGuideModal, setActiveGuideModal] = useState<
    'extract' | 'install' | 'rosetta' | 'gatekeeper' | null
  >(null);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Active query merges top and bottom search inputs
  const effectiveQuery = (searchQuery || bottomSearchQuery).toLowerCase().trim();

  // Filtered sections and groups based on search
  const filteredSections = useMemo(() => {
    if (!effectiveQuery) {
      return MACOS_SECTIONS_DATA;
    }

    return MACOS_SECTIONS_DATA.map((sec) => {
      const filteredGroups = sec.groups.filter((group) => {
        const titleMatch = group.title.toLowerCase().includes(effectiveQuery);
        const subtitleMatch = group.subtitle.toLowerCase().includes(effectiveQuery);
        const releasesMatch = group.releases.some(
          (rel) =>
            rel.name.toLowerCase().includes(effectiveQuery) ||
            rel.version.toLowerCase().includes(effectiveQuery) ||
            rel.description.toLowerCase().includes(effectiveQuery) ||
            rel.tags.some((t) => t.toLowerCase().includes(effectiveQuery))
        );
        return titleMatch || subtitleMatch || releasesMatch;
      });

      return {
        ...sec,
        groups: filteredGroups,
      };
    }).filter((sec) => sec.groups.length > 0);
  }, [effectiveQuery]);

  // Overall totals matching exact numbers
  const totalItems = useMemo(() => {
    return MACOS_SECTIONS_DATA.reduce((total, sec) => {
      return total + sec.groups.reduce((gTotal, g) => gTotal + g.releases.length, 0);
    }, 0);
  }, []);

  const totalCategories = MACOS_SECTIONS_DATA.length;

  // Toggle group accordion
  const toggleGroupAccordion = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Copy download link
  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  // Copy flame password
  const handleCopyPassword = () => {
    navigator.clipboard.writeText('flame');
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  // Copy Gatekeeper xattr command
  const handleCopyGatekeeperCommand = () => {
    navigator.clipboard.writeText('sudo xattr -cr /Applications/"AppName.app"');
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  // Scroll to section
  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = sectionRefs.current[id];
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Intersection observer for sticky active navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const sec of MACOS_SECTIONS_DATA) {
        const el = sectionRefs.current[sec.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 antialiased">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12">
        {/* Top Breadcrumb */}
        <div className="mb-4 flex items-center justify-between font-mono text-xs text-zinc-500">
          <button
            type="button"
            onClick={onBack}
            className="group flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Home</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200">MacOS</span>
          </button>
        </div>

        {/* Page Title & Subtitle in Black & White aesthetic */}
        <div className="pb-6 mb-8 border-b border-zinc-800/80">
          <h1 className="font-serif text-5xl sm:text-6xl font-normal tracking-tight text-white">
            MacOS
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Verified software and plugins for Mac editors.
          </p>
        </div>

        {/* Main Search Bar */}
        <div className="mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setBottomSearchQuery(e.target.value);
              }}
              placeholder="Search software, plugins..."
              className="w-full rounded-md border border-zinc-800 bg-[#121212] py-3.5 pl-11 pr-24 font-mono text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={onOpenSearch}
              className="absolute right-3 flex items-center gap-1 rounded border border-zinc-700 bg-zinc-800/80 px-2 py-1 font-mono text-[10px] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
              title="Open global search (⌘K)"
            >
              <span>Ctrl/⌘</span>
              <span className="font-bold text-white">K</span>
            </button>
          </div>
        </div>

        {/* THREE COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT COLUMN: SECTIONS SIDEBAR */}
          <aside className="w-full lg:w-48 xl:w-52 shrink-0 lg:sticky lg:top-20">
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-2 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 pt-2 pb-2.5">
                SECTIONS
              </div>

              <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none">
                {MACOS_SECTIONS_DATA.map((sec) => {
                  const isActive = activeSectionId === sec.id && !effectiveQuery;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`group shrink-0 flex items-center justify-between rounded px-3 py-2 text-left text-xs transition-colors ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
                      }`}
                    >
                      <span className="truncate">{sec.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* CENTER COLUMN: CALLOUTS + SOFTWARE RELEASES */}
          <main className="flex-1 w-full min-w-0 space-y-6">
            {/* CALLOUT BOX 1: ARCHIVER & PASSWORD NOTICE */}
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-5 shadow-sm space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="text-white font-bold shrink-0 leading-relaxed">•</span>
                <p className="leading-relaxed">
                  For Keyflame downloads, use{' '}
                  <a
                    href="https://www.keka.io"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-white underline underline-offset-2 hover:text-zinc-300"
                  >
                    Keka
                  </a>{' '}
                  or{' '}
                  <span className="font-semibold text-white underline underline-offset-2">
                    The Unarchiver
                  </span>{' '}
                  — Finder&apos;s Archive Utility is unreliable for password-protected .7z files.
                </p>
              </div>
              <p className="pl-4 text-xs text-zinc-400 leading-relaxed">
                If MacOS blocks a tool or plugin after extraction, use the Gatekeeper guide before assuming the file is broken.
              </p>
              <div className="pl-4 pt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-zinc-400">
                  Every download is a password-protected .7z archive. The password is always
                </span>
                <div className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                  <span>flame</span>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="ml-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
                    title="Copy password"
                  >
                    {copiedPassword ? (
                      <Check className="h-3 w-3 text-white" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* CALLOUT BOX 2: COMPATIBILITY CALLOUT */}
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-5 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="font-bold tracking-wider text-white uppercase">
                  COMPATIBILITY
                </span>
                <span className="text-zinc-200 font-semibold">
                  Check Apple Silicon, Rosetta, and AE version together.
                </span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed list-disc list-inside">
                <li>
                  On Apple Silicon, prefer native or Universal plugin builds. Intel-only plugins need Rosetta and a host version that still supports it.
                </li>
                <li>
                  After Effects 2024+ removed the Rosetta option. If an Intel-only plugin is required, use AE 2022–2023 or find a newer native build.
                </li>
                <li>
                  Gatekeeper, quarantine, and signing errors are separate from compatibility. Use the{' '}
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal('gatekeeper')}
                    className="text-white font-semibold underline underline-offset-2 hover:text-zinc-300"
                  >
                    Gatekeeper guide
                  </button>{' '}
                  for blocked apps and the{' '}
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal('rosetta')}
                    className="text-white font-semibold underline underline-offset-2 hover:text-zinc-300"
                  >
                    Rosetta guide
                  </button>{' '}
                  for CPU/plugin issues.
                </li>
              </ul>
            </div>

            {/* SECTIONS & GROUPS LIST */}
            {filteredSections.length === 0 ? (
              <div className="rounded-md border border-zinc-800 bg-[#121212] p-12 text-center">
                <p className="font-mono text-sm text-zinc-400">
                  No MacOS software matching &quot;{effectiveQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setBottomSearchQuery('');
                  }}
                  className="mt-3 text-xs text-white underline underline-offset-2 hover:text-zinc-300 font-mono"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              filteredSections.map((sec) => (
                <section
                  key={sec.id}
                  id={`section-${sec.id}`}
                  ref={(el) => {
                    sectionRefs.current[sec.id] = el;
                  }}
                  className="scroll-mt-24 space-y-4 pt-4"
                >
                  {/* Section Title Header */}
                  <div className="border-b border-zinc-800 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                      {sec.name.toUpperCase()}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                      {sec.subtitle}
                    </h2>
                    {sec.description && (
                      <p className="mt-1.5 text-xs text-zinc-400">
                        {sec.description}
                      </p>
                    )}
                    {sec.note && (
                      <p className="mt-1.5 text-xs text-zinc-500 italic">
                        {sec.note}
                      </p>
                    )}
                  </div>

                  {/* Software Accordion Cards */}
                  <div className="space-y-3">
                    {sec.groups.map((group) => {
                      const isExpanded = Boolean(expandedGroups[group.id]);
                      return (
                        <div
                          key={group.id}
                          className="rounded-md border border-zinc-800 bg-[#121212] overflow-hidden transition-all shadow-sm"
                        >
                          {/* Accordion Header matching screenshot */}
                          <button
                            type="button"
                            onClick={() => toggleGroupAccordion(group.id)}
                            className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-zinc-800/40 border-b border-zinc-800/70"
                          >
                            <span className="text-sm sm:text-base font-semibold text-white tracking-normal">
                              {group.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60">
                                {group.count}
                              </span>
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-zinc-400" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-zinc-500" />
                              )}
                            </div>
                          </button>

                          {/* Expanded Releases Table matching screenshot */}
                          {isExpanded && (
                            <div className="divide-y divide-zinc-800/70 bg-[#0E0E0E]">
                              {group.releases.map((rel) => (
                                <div
                                  key={rel.id}
                                  className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#141414] transition-colors"
                                >
                                  {/* Left: Title, note, and Host pill */}
                                  <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h4 className="text-sm font-medium text-white tracking-tight">
                                        {rel.name}
                                      </h4>
                                      {rel.badge && (
                                        <span className="font-mono text-[9px] uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700 px-1.5 py-0.2 rounded">
                                          {rel.badge}
                                        </span>
                                      )}
                                    </div>

                                    {/* Description / Shared archive note */}
                                    {rel.description && (
                                      <p className="text-xs text-zinc-400 leading-relaxed">
                                        {rel.description}
                                      </p>
                                    )}

                                    {/* Host Badge */}
                                    {rel.host && rel.host !== 'none' && (
                                      <div className="pt-0.5 flex items-center gap-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900/90 text-[11px] font-mono text-zinc-400">
                                          Host: {rel.host}
                                        </span>
                                        {rel.tags && rel.tags.length > 0 && !rel.tags.includes('SHARED ARCHIVE') && (
                                          <div className="hidden md:flex items-center gap-1.5">
                                            {rel.tags.slice(0, 2).map((t) => (
                                              <span
                                                key={t}
                                                className="text-[10px] font-mono text-zinc-500"
                                              >
                                                #{t}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* Right: Actions */}
                                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                                    <button
                                      type="button"
                                      onClick={() => handleCopyLink(rel.downloadUrl, rel.id)}
                                      className="inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900/60 p-1.5 font-mono text-xs text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                                      title="Copy download link"
                                    >
                                      {copiedUrlId === rel.id ? (
                                        <Check className="h-3.5 w-3.5 text-white" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                      )}
                                    </button>
                                    <a
                                      href={rel.downloadUrl}
                                      target="_blank"
                                      rel="noreferrer noopener"
                                      className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900/60 px-3.5 py-1.5 font-sans text-xs font-medium text-zinc-200 hover:text-white hover:border-white hover:bg-zinc-800 transition-colors shadow-sm"
                                    >
                                      <Download className="h-3.5 w-3.5" />
                                      <span>Download</span>
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))
            )}

            {/* NEED A MAC RELEASE CALLOUT */}
            <div className="mt-12 rounded-md border border-zinc-800 bg-[#121212] p-6 text-center space-y-3 shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                Need a Mac release that is not here?
              </h3>
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Ask in Discord with the app name, MacOS version, and whether your Mac is Intel or Apple Silicon. That compatibility context matters before we mirror a build.
              </p>
              <div className="pt-2">
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded border border-white bg-white px-5 py-2.5 font-mono text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-black" />
                  <span>Request on Discord</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70 text-black" />
                </a>
              </div>
            </div>
          </main>

          {/* RIGHT COLUMN: MACOS STATS & GUIDES */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-5 lg:sticky lg:top-20">
            {/* STATS CARD */}
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-4">
                <span className="text-sm"></span>
                <span className="font-mono">MACOS</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-sans text-3xl font-bold text-white tracking-tight">
                    {totalItems}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">
                    ITEMS
                  </div>
                </div>
                <div>
                  <div className="font-sans text-3xl font-bold text-white tracking-tight">
                    {totalCategories}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">
                    CATEGORIES
                  </div>
                </div>
              </div>
            </div>

            {/* GUIDES CARD */}
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-5 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                GUIDES
              </div>

              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal('extract')}
                    className="group flex items-center gap-2 text-left text-zinc-300 hover:text-white transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                    <span className="font-semibold underline-offset-2 group-hover:underline">
                      Extract Guide
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal('install')}
                    className="group flex items-center gap-2 text-left text-zinc-300 hover:text-white transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                    <span className="font-semibold underline-offset-2 group-hover:underline">
                      Install Guide
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal('rosetta')}
                    className="group flex items-center gap-2 text-left text-zinc-300 hover:text-white transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                    <span className="font-semibold underline-offset-2 group-hover:underline">
                      Rosetta Guide
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal('gatekeeper')}
                    className="group flex items-center gap-2 text-left text-zinc-300 hover:text-white transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                    <span className="font-semibold underline-offset-2 group-hover:underline">
                      Gatekeeper Fixes
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* BOTTOM SEARCH & FOOTER SECTION */}
        <div className="mt-16 pt-8 border-t border-zinc-800 space-y-8">
          {/* Bottom Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={bottomSearchQuery}
                onChange={(e) => {
                  setBottomSearchQuery(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search MacOS..."
                className="w-full rounded-md border border-zinc-800 bg-[#121212] py-3 pl-11 pr-4 font-mono text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Footer Metadata & Links */}
          <div className="text-center space-y-3 font-mono text-xs text-zinc-500">
            <div className="flex flex-wrap items-center justify-center gap-2 text-zinc-400">
              <span className="text-white">Made with &lt;3</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigatePage('status')}
                className="hover:text-white transition-colors"
              >
                Status
              </button>
              <span>·</span>
              <a
                href="#tor"
                className="hover:text-white transition-colors"
              >
                Tor mirror
              </a>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigatePage('about')}
                className="hover:text-white transition-colors"
              >
                About
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigatePage('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigatePage('credits')}
                className="hover:text-white transition-colors"
              >
                Credits
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onNavigatePage('faq')}
                className="hover:text-white transition-colors"
              >
                FAQ
              </button>
            </div>

            <div className="text-zinc-600 text-[11px] space-y-1">
              <p>© 2026, Est. April 2026. We don&apos;t host any downloads.</p>
              <p>Site last updated: September 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* GUIDE MODALS */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-lg border border-zinc-700 bg-[#121212] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setActiveGuideModal(null)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* EXTRACT GUIDE MODAL */}
            {activeGuideModal === 'extract' && (
              <>
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-bold">
                  <FileArchive className="h-4 w-4" />
                  <span>MacOS Archive Extraction Guide</span>
                </div>
                <h3 className="font-serif text-2xl text-white">
                  Extracting Password-Protected .7z Archives
                </h3>
                <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                  <p>
                    macOS&apos;s default <strong>Archive Utility</strong> frequently fails on password-protected 7z archives with error codes like <code className="text-white bg-zinc-900 border border-zinc-700 px-1 py-0.5 rounded">Error -1</code> or produces empty folders.
                  </p>
                  <div className="rounded border border-zinc-800 bg-[#0A0A0A] p-3 space-y-2">
                    <p className="font-bold text-white">Recommended Extractors:</p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400">
                      <li>
                        <strong className="text-white">Keka</strong> (Free, open source): Drag the .7z onto Keka, enter password <span className="font-mono text-white font-bold">flame</span>.
                      </li>
                      <li>
                        <strong className="text-white">The Unarchiver</strong>: Free from Mac App Store, supports multipart archives.
                      </li>
                    </ul>
                  </div>
                  <p>
                    The universal extraction password across Keyflame is always <strong className="text-white font-bold">flame</strong> (lowercase, no spaces).
                  </p>
                </div>
              </>
            )}

            {/* INSTALL GUIDE MODAL */}
            {activeGuideModal === 'install' && (
              <>
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-bold">
                  <Wrench className="h-4 w-4" />
                  <span>MacOS Installation Protocol</span>
                </div>
                <h3 className="font-serif text-2xl text-white">
                  Clean Installation on macOS
                </h3>
                <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                  <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                    <li>Mount the downloaded .dmg or extract the .7z archive.</li>
                    <li>If an installer package (.pkg) is included, run it. If an application (.app) is included, drag it into your <code className="text-white bg-zinc-900 border border-zinc-700 px-1 py-0.5 rounded">/Applications</code> folder.</li>
                    <li>For Adobe plugins, extract directly to:
                      <div className="mt-1 font-mono text-[11px] bg-black p-2 rounded border border-zinc-800 text-zinc-300">
                        /Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore
                      </div>
                    </li>
                    <li>If prompted with security or damaged warnings, consult the Gatekeeper guide below.</li>
                  </ol>
                </div>
              </>
            )}

            {/* ROSETTA GUIDE MODAL */}
            {activeGuideModal === 'rosetta' && (
              <>
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-bold">
                  <Cpu className="h-4 w-4" />
                  <span>Apple Silicon vs Rosetta 2</span>
                </div>
                <h3 className="font-serif text-2xl text-white">
                  Understanding Architecture Compatibility
                </h3>
                <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                  <p>
                    Apple Silicon Macs (M1, M2, M3, M4) run ARM64 binaries natively. Many classic legacy visual effects plugins were compiled exclusively for x86_64 Intel CPUs.
                  </p>
                  <div className="rounded border border-zinc-800 bg-[#0A0A0A] p-3 space-y-2">
                    <p className="font-bold text-white">Critical Notice for After Effects 2024+:</p>
                    <p className="text-zinc-400">
                      Adobe removed the &quot;Open using Rosetta&quot; checkbox starting in AE 2024. If you must run older Intel-only plugins that do not have native Apple Silicon builds, keep <strong>After Effects 2023 (v23.6.5)</strong> installed. Right-click the AE 2023 app icon, select <em>Get Info</em>, and check <strong>Open using Rosetta</strong>.
                    </p>
                  </div>
                  <p>
                    To install Rosetta 2 manually on any M-series Mac via Terminal:
                  </p>
                  <div className="font-mono text-xs bg-black p-2.5 rounded border border-zinc-800 text-zinc-200">
                    softwareupdate --install-rosetta --agree-to-license
                  </div>
                </div>
              </>
            )}

            {/* GATEKEEPER FIXES MODAL */}
            {activeGuideModal === 'gatekeeper' && (
              <>
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-bold">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Gatekeeper & Quarantine Fixes</span>
                </div>
                <h3 className="font-serif text-2xl text-white">
                  &quot;App is damaged and can&apos;t be opened&quot;
                </h3>
                <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                  <p>
                    macOS assigns a quarantine extended attribute (<code className="text-white bg-zinc-900 border border-zinc-700 px-1 py-0.5 rounded">com.apple.quarantine</code>) to any application or plugin downloaded outside the official Mac App Store without Apple Developer notarization.
                  </p>
                  <div className="rounded border border-zinc-800 bg-[#0A0A0A] p-3 space-y-2">
                    <p className="font-bold text-white">Instant Terminal Fix:</p>
                    <p className="text-zinc-400">
                      Open Terminal (<code className="text-zinc-300">Terminal.app</code>) and execute the recursive attribute strip command:
                    </p>
                    <div className="flex items-center justify-between font-mono text-xs bg-black p-2.5 rounded border border-zinc-800 text-white">
                      <span className="truncate">sudo xattr -cr /Applications/&quot;AppName.app&quot;</span>
                      <button
                        type="button"
                        onClick={handleCopyGatekeeperCommand}
                        className="ml-2 text-zinc-400 hover:text-white"
                        title="Copy command"
                      >
                        {copiedCommand ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-zinc-400">
                    Alternatively, navigate to <strong>System Settings &gt; Privacy & Security</strong>, scroll down to the Security section, and click <strong>Open Anyway</strong>.
                  </p>
                </div>
              </>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveGuideModal(null)}
                className="rounded border border-zinc-700 bg-zinc-800 px-4 py-2 font-mono text-xs text-white hover:bg-zinc-700 transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
