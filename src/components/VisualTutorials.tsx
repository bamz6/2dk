import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronRight,
  Search,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { PageId } from '../types';
import { TUTORIALS_DATA, TutorialItem } from '../data/tutorialsData';
import { TutorialVideoPlayer } from './TutorialVideoPlayer';

interface VisualTutorialsProps {
  onBack: () => void;
  onNavigatePage: (page: PageId) => void;
}

type SectionKey = 'index' | 'windows' | 'mac' | 'windows-plugins' | 'mac-plugins';

export const VisualTutorials: React.FC<VisualTutorialsProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [activeSection, setActiveSection] = useState<SectionKey>('index');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll spy for sidebar section highlighting
  useEffect(() => {
    const sections: SectionKey[] = [
      'index',
      'windows',
      'mac',
      'windows-plugins',
      'mac-plugins',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionKey) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTutorial = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Add brief focus highlight
      el.classList.add('ring-2', 'ring-white');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-white');
      }, 1500);
    }
  };

  // Filtered index items based on query
  const filteredIndexTutorials = useMemo(() => {
    if (!searchQuery.trim()) return TUTORIALS_DATA;
    const q = searchQuery.toLowerCase().trim();
    return TUTORIALS_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.sectionTitle.toLowerCase().includes(q) ||
        item.platform.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.note?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Group tutorials by section for the video feed
  const windowsSoftware = useMemo(
    () => TUTORIALS_DATA.filter((item) => item.sectionId === 'windows'),
    []
  );
  const macSoftware = useMemo(
    () => TUTORIALS_DATA.filter((item) => item.sectionId === 'mac'),
    []
  );
  const windowsPlugins = useMemo(
    () => TUTORIALS_DATA.filter((item) => item.sectionId === 'windows-plugins'),
    []
  );
  const macPlugins = useMemo(
    () => TUTORIALS_DATA.filter((item) => item.sectionId === 'mac-plugins'),
    []
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-400">
            <li>
              <button
                type="button"
                onClick={onBack}
                className="hover:text-white transition-colors"
              >
                Home
              </button>
            </li>
            <li className="text-zinc-600">/</li>
            <li>
              <button
                type="button"
                onClick={() => onNavigatePage('guides')}
                className="hover:text-white transition-colors"
              >
                Guides
              </button>
            </li>
            <li className="text-zinc-600">/</li>
            <li className="text-zinc-500">Visual tutorials</li>
          </ol>
        </nav>

        {/* Page Title & Subtitle in black & white */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            <span className="italic text-zinc-200 font-normal mr-2">Visual</span>
            <span className="text-white font-semibold">tutorials</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Screen recordings that walk through downloads, installs, and plugin setup step by step. Prefer text? Check the written guides in the{' '}
            <button
              type="button"
              onClick={() => onNavigatePage('faq')}
              className="text-zinc-300 underline underline-offset-4 hover:text-white transition-colors"
            >
              FAQ
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => onNavigatePage('guides')}
              className="text-zinc-300 underline underline-offset-4 hover:text-white transition-colors"
            >
              guide hub
            </button>
            .
          </p>
        </div>

        {/* Two-Column Layout: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column: Fixed / Sticky Navigation Sections */}
          <aside className="w-full lg:w-48 shrink-0 lg:sticky lg:top-20 z-20">
            <div className="rounded-lg border border-zinc-800 lg:border-transparent bg-[#0D0D0D] lg:bg-transparent p-4 lg:p-0">
              <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                SECTIONS
              </span>
              <ul className="space-y-1 text-sm font-sans">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('index')}
                    className={`w-full text-left px-3 py-1.5 rounded-md transition-all flex items-center justify-between ${
                      activeSection === 'index'
                        ? 'bg-zinc-800 text-white font-semibold border-l-2 border-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    <span>Index</span>
                    {activeSection === 'index' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('windows')}
                    className={`w-full text-left px-3 py-1.5 rounded-md transition-all flex items-center justify-between ${
                      activeSection === 'windows'
                        ? 'bg-zinc-800 text-white font-semibold border-l-2 border-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    <span>Windows</span>
                    {activeSection === 'windows' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('mac')}
                    className={`w-full text-left px-3 py-1.5 rounded-md transition-all flex items-center justify-between ${
                      activeSection === 'mac'
                        ? 'bg-zinc-800 text-white font-semibold border-l-2 border-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    <span>Mac</span>
                    {activeSection === 'mac' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('windows-plugins')}
                    className={`w-full text-left px-3 py-1.5 rounded-md transition-all flex items-center justify-between ${
                      activeSection === 'windows-plugins'
                        ? 'bg-zinc-800 text-white font-semibold border-l-2 border-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    <span>Windows plugins</span>
                    {activeSection === 'windows-plugins' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('mac-plugins')}
                    className={`w-full text-left px-3 py-1.5 rounded-md transition-all flex items-center justify-between ${
                      activeSection === 'mac-plugins'
                        ? 'bg-zinc-800 text-white font-semibold border-l-2 border-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    <span>Mac plugins</span>
                    {activeSection === 'mac-plugins' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Column: Main Content */}
          <main className="flex-1 min-w-0 w-full space-y-14">
            {/* ================= SECTION: INDEX ================= */}
            <section
              id="index"
              className="scroll-mt-20 rounded-xl border border-zinc-800 bg-[#0C0C0E] p-5 sm:p-7 md:p-8 shadow-2xl"
            >
              <span className="block font-mono text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-1.5">
                INDEX
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
                Jump straight to the right walkthrough.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                Search understands product aliases, plugin families, platform names, and file types. These links take you directly to the matching video section.
              </p>

              {/* Quick search inside index */}
              <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter walkthroughs (e.g. Adobe, Sapphire, Mac, .aex)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* 3-Column Index Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                {filteredIndexTutorials.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToTutorial(item.id)}
                    className="group rounded-lg border border-zinc-800/90 bg-[#121215] p-4 text-left hover:border-zinc-500 hover:bg-[#18181c] transition-all flex flex-col justify-between focus:outline-none"
                  >
                    <div>
                      {/* Badges in B&W */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-zinc-300 border border-zinc-700 bg-zinc-800 px-2 py-0.5 rounded">
                          {item.platform}
                        </span>
                        <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-zinc-400 border border-zinc-700/80 bg-zinc-900 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[15px] sm:text-base font-bold text-white group-hover:text-white transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Subtext */}
                    <p className="mt-3 font-sans text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {item.sectionTitle}
                    </p>
                  </button>
                ))}
              </div>

              {filteredIndexTutorials.length === 0 && (
                <div className="py-10 text-center text-zinc-500 text-xs font-mono">
                  No matching walkthrough found for &quot;{searchQuery}&quot;.
                </div>
              )}
            </section>

            {/* ================= SECTION: WINDOWS (SOFTWARE) ================= */}
            <section id="windows" className="scroll-mt-20">
              <div className="mb-6 pb-2 border-b border-zinc-800">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Windows
                </h2>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mt-1">
                  Windows software
                </p>
              </div>

              <div className="space-y-8">
                {windowsSoftware.map((tutorial) => (
                  <TutorialVideoPlayer key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </section>

            {/* ================= SECTION: MAC (SOFTWARE) ================= */}
            <section id="mac" className="scroll-mt-20">
              <div className="mb-6 pb-2 border-b border-zinc-800">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Mac
                </h2>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mt-1">
                  Mac software
                </p>
              </div>

              <div className="space-y-8">
                {macSoftware.map((tutorial) => (
                  <TutorialVideoPlayer key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </section>

            {/* ================= SECTION: WINDOWS PLUGINS ================= */}
            <section id="windows-plugins" className="scroll-mt-20">
              <div className="mb-6 pb-2 border-b border-zinc-800">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Windows plugins
                </h2>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mt-1">
                  Windows plugins
                </p>
              </div>

              <div className="space-y-8">
                {windowsPlugins.map((tutorial) => (
                  <TutorialVideoPlayer key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </section>

            {/* ================= SECTION: MAC PLUGINS ================= */}
            <section id="mac-plugins" className="scroll-mt-20">
              <div className="mb-6 pb-2 border-b border-zinc-800">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Mac plugins
                </h2>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mt-1">
                  Mac plugins
                </p>
              </div>

              <div className="space-y-8">
                {macPlugins.map((tutorial) => (
                  <TutorialVideoPlayer key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
