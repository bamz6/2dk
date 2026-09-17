import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  ArrowRight,
  X,
  Archive,
  Wrench,
} from 'lucide-react';

interface BeginnersGuideProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

const SECTIONS = [
  { id: 'hardware', label: 'Hardware' },
  { id: 'ae-version', label: 'AE Version' },
  { id: 'plugins', label: 'Plugins' },
  { id: 'composition', label: 'Composition' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'shortcuts', label: 'Shortcuts' },
  { id: 'editing-pack', label: 'Editing Pack' },
];

export const BeginnersGuide: React.FC<BeginnersGuideProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hardware');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'extract' | 'install' | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText('flame');
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white py-8 sm:py-12 selection:bg-white selection:text-black">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-zinc-500">
          <button
            type="button"
            onClick={onBack}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigatePage?.('guides')}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Guides
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Beginner's Guide</span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-zinc-800">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-3">
            Beginner's Guide to After Effects
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            A practical first-read for editors setting up After Effects, choosing plugins, and building clean projects.
          </p>
        </header>

        {/* 2-Column Layout: Sidebar Nav + Guide Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Sticky Left Sidebar Navigation */}
          <aside className="w-full lg:w-48 shrink-0 lg:sticky lg:top-20 self-start">
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-3 lg:p-2">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 pt-2 pb-2">
                SECTIONS
              </div>
              <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`block w-full text-left whitespace-nowrap rounded px-3 py-2 text-xs transition-colors ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
                      }`}
                    >
                      {sec.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Guide Content Area */}
          <div className="flex-1 w-full min-w-0 max-w-3xl space-y-16">
            {/* ========================================================================= */}
            {/* 1. HARDWARE */}
            {/* ========================================================================= */}
            <section id="hardware" className="scroll-mt-24 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                Before You Start
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                What matters in a PC for After Effects?
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                <p>
                  After Effects is not a normal video editor. It leans heavily on CPU performance, RAM, fast storage, and cache space. A strong GPU helps with certain effects and previews, but it will not save a weak CPU or a system with too little memory.
                </p>
                <p>
                  If you are buying or upgrading a machine, prioritize a modern multi-core CPU, at least 32GB of RAM for comfortable editing, and an SSD with enough free space for media, project files, and disk cache. 16GB can work for light projects, but it gets tight quickly once you add plugins, high-resolution footage, and large comps.
                </p>
                <p>
                  Storage matters more than beginners expect. Keep After Effects, your footage, and your cache on SSD storage when possible. A nearly full drive can make previews, imports, renders, and autosaves feel broken even when the project itself is fine.
                </p>
                <p>
                  For short social edits, a balanced system beats chasing one extreme spec. CPU, RAM, SSD space, and source footage quality all matter.
                </p>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 2. AE VERSION */}
            {/* ========================================================================= */}
            <section id="ae-version" className="scroll-mt-24 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                Version Choice
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Which After Effects version should you use?
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                <p>
                  Start with the newest version your system can run well. Newer releases bring bug fixes, format support, and features that older tutorials may not cover. If your device is low-end or a plugin you rely on is unstable, stepping back one or two versions can be a reasonable tradeoff.
                </p>
                <p>
                  Project compatibility is the biggest thing to understand. After Effects can usually open projects made in the same or older versions, but older versions cannot reliably open projects saved in newer versions. If you need to share work with someone on an older release, use File &gt; Save As &gt; Save a Copy As for the target version when available.
                </p>
                <p>
                  If you are on Apple Silicon, plugin compatibility matters as much as the After Effects version itself. Some tools are native, some still need Rosetta, and some older plugins simply are not worth building a workflow around.
                </p>
                <p>
                  Do not choose a version because it is popular on TikTok. Choose the newest version that runs reliably with your plugins and hardware.
                </p>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 3. PLUGINS */}
            {/* ========================================================================= */}
            <section id="plugins" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Plugins
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  What plugins should a beginner install?
                </h2>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                  <p>
                    Plugins add effects and tools that are not built into After Effects. They can speed up your workflow and open up looks that would take much longer to build manually, but installing everything you find is a bad habit. Too many plugins can slow launch times, clutter menus, and make troubleshooting harder.
                  </p>
                  <p>
                    Start with a small set that matches what you actually edit. Color-focused editors may care about Looks and Deep Glow. Motion-heavy editors may care about RSMB, Sapphire, BCC, or Twixtor. 3D-heavy editors may want Element 3D. Glitch editors may look into tools like Signal, Pixel Sorter, Omino, Glitchify, or Datamosh.
                  </p>
                </div>
              </div>

              {/* Common plugin names you will see */}
              <div className="pt-2">
                <h3 className="font-sans text-base sm:text-lg font-bold text-white mb-4">
                  Common plugin names you will see
                </h3>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    {
                      name: 'RSMB',
                      desc: 'adds motion blur by analyzing movement between frames, which can make fast edits feel smoother.',
                    },
                    {
                      name: 'Magic Bullet Looks',
                      desc: 'a full color-building environment for looks, grades, curves, and finishing.',
                    },
                    {
                      name: 'Sapphire',
                      desc: 'a large effects suite used for glows, distortions, transitions, and stylized motion.',
                    },
                    {
                      name: 'BCC',
                      desc: 'another broad effects suite with transitions, image processing, and utility tools.',
                    },
                    {
                      name: 'Twixtor',
                      desc: 'used for speed ramps and slow motion when you need frame interpolation.',
                    },
                    {
                      name: 'Universe',
                      desc: 'a lighter pack of stylized effects, VHS treatments, glows, and glitch tools.',
                    },
                    {
                      name: 'Trapcode',
                      desc: 'particle and motion graphics tools for overlays, backgrounds, and abstract elements.',
                    },
                    {
                      name: 'Element 3D',
                      desc: '3D text, models, and object-based motion inside After Effects.',
                    },
                    {
                      name: 'Deep Glow',
                      desc: 'a cleaner glow effect than the built-in glow for text, logos, and PNG elements.',
                    },
                    {
                      name: 'Optical Flares',
                      desc: 'lens flare creation with more control than the basic built-in options.',
                    },
                  ].map((plugin) => (
                    <div
                      key={plugin.name}
                      className="rounded border border-zinc-800 bg-[#121212] p-4 text-xs sm:text-sm leading-relaxed"
                    >
                      <span className="font-bold text-white block mb-1">
                        {plugin.name}
                      </span>
                      <span className="text-zinc-400">
                        {plugin.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                Before installing a plugin, watch a demo from the developer or a creator who actually uses it. If you cannot explain what a plugin does, you probably do not need it yet.
              </p>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 4. COMPOSITION */}
            {/* ========================================================================= */}
            <section id="composition" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Project Setup
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Composition settings that matter
                </h2>

                <h3 className="font-sans text-base sm:text-lg font-bold text-white pt-2">
                  Resolution and aspect ratio
                </h3>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                  <p>
                    Resolution is the pixel count of your frame, such as 1920 by 1080. Aspect ratio is the shape of the frame, such as 16:9, 9:16, or 1:1. These are related, but they are not the same thing.
                  </p>
                  <p>
                    A lot of edit-style projects are made square at 1080 by 1080. It is simple, light to preview, easy to crop from most source footage, and works well when the edit is meant to sit in a grid or be reposted across multiple apps. If you are just practicing, making a pack, or building a general edit that is not platform-specific, 1:1 is usually the cleanest starting point.
                  </p>
                  <p>
                    Use the format your final platform needs. For TikTok, Reels, and Shorts, 1080 by 1920 is a practical vertical standard. For YouTube or widescreen edits, 1920 by 1080 is usually enough. Higher resolutions can look sharper, but they also increase preview time, cache size, render time, and storage pressure.
                  </p>
                </div>
              </div>

              {/* Composition Table */}
              <div className="overflow-x-auto rounded border border-zinc-800 bg-[#121212]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase">
                      <th className="py-3 px-4 font-bold">Ratio</th>
                      <th className="py-3 px-4 font-bold">Pixels</th>
                      <th className="py-3 px-4 font-bold">Good for</th>
                      <th className="py-3 px-4 font-bold text-center">Frame</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {[
                      { ratio: '1:1', pixels: '1080x1080', goodFor: 'Square edits, profile/grid posts, many classic edit comps', w: 'w-6', h: 'h-6' },
                      { ratio: '16:9', pixels: '1920x1080', goodFor: 'YouTube, landscape clips, widescreen footage', w: 'w-8', h: 'h-4.5' },
                      { ratio: '9:16', pixels: '1080x1920', goodFor: 'TikTok, Reels, Shorts, vertical edits', w: 'w-4.5', h: 'h-8' },
                      { ratio: '4:3', pixels: '1440x1080', goodFor: 'Older TV look, retro framing, some anime sources', w: 'w-7', h: 'h-5.5' },
                      { ratio: '3:4', pixels: '1080x1440', goodFor: 'Portrait edits that are not fully vertical', w: 'w-5.5', h: 'h-7' },
                      { ratio: '5:4', pixels: '1350x1080', goodFor: 'Slightly wide square-style crops', w: 'w-7', h: 'h-5.5' },
                      { ratio: '4:5', pixels: '1080x1350', goodFor: 'Portrait feed posts and tighter mobile crops', w: 'w-5.5', h: 'h-7' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                          {row.ratio}
                        </td>
                        <td className="py-3 px-4 font-mono text-zinc-300 whitespace-nowrap">
                          {row.pixels}
                        </td>
                        <td className="py-3 px-4 text-zinc-400">
                          {row.goodFor}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center items-center">
                            <div className={`border border-zinc-600 bg-zinc-800/80 rounded-sm ${row.w} ${row.h}`} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                The first number in a resolution is width. The second number is height. So 1080x1920 is vertical, while 1920x1080 is horizontal. If you swap those two numbers by accident, the composition shape changes completely.
              </p>

              {/* Frame rate */}
              <div className="space-y-3 pt-2">
                <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                  Frame rate
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  Pick a frame rate that fits your source. 23.976 or 24fps is common for film and anime footage. 30fps works well for general edits and many social platforms. 60fps is useful for gameplay, speed ramps, and motion-heavy work, but it asks more from your machine.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  If you want a choppy or low-frame-rate style, consider using Posterize Time on specific layers instead of lowering the entire composition. That keeps the comp flexible and avoids forcing every layer into the same look.
                </p>
              </div>

              {/* Duration and background */}
              <div className="space-y-3 pt-2">
                <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                  Duration and background
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  Set the duration to the length of the edit or audio you are building around. If your audio is 30 seconds, start with a 30-second comp. You can still adjust the composition duration and work area later.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  Background color only appears where there are no visible layers. Black is a clean default for fades, flashes, and most edit workflows.
                </p>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 5. WORKFLOW */}
            {/* ========================================================================= */}
            <section id="workflow" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Workflow
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Save reusable effect setups carefully
                </h2>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                  <p>
                    After Effects can save selected effects, keyframes, and property settings as animation presets. This is useful for keeping your own shakes, transitions, color setups, and repeated adjustments organized.
                  </p>
                  <p>
                    To save one, select the effects or keyframes you want to reuse, then use Animation &gt; Save Animation Preset. Keep your own files inside the user preset folder, not inside the application's default preset folders.
                  </p>
                </div>
              </div>

              {/* User Presets Paths */}
              <div className="space-y-2.5">
                {[
                  {
                    label: 'Windows',
                    path: 'Documents\\Adobe\\After Effects [version]\\User Presets',
                    key: 'win-presets',
                  },
                  {
                    label: 'MacOS',
                    path: '~/Documents/Adobe/After Effects [version]/User Presets',
                    key: 'mac-presets',
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded border border-zinc-800 bg-[#121212] px-4 py-3 font-mono text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="font-bold text-white shrink-0">{item.label}:</span>
                      <span className="text-zinc-300 truncate">{item.path}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.path, item.key)}
                      className="shrink-0 self-end sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      {copiedKey === item.key ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-white" />
                          <span className="text-[11px] font-bold text-white">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Magic Bullet Looks presets */}
              <div className="space-y-4 pt-4">
                <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                  Magic Bullet Looks presets (.mblook / .rgx)
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  MBL presets use a different format than standard .ffx files. Version 13 and older use .mblook files. Version 14+ uses .rgx in your Documents folder. If you have old .mblook files on MBL 14+, import them inside Looks Builder — they convert to .rgx automatically.
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      label: 'Windows (MBL v13-)',
                      path: 'C:\\Program Files (x86)\\LooksBuilder\\Looks',
                      key: 'win-mbl13',
                    },
                    {
                      label: 'Mac (MBL v13-)',
                      path: '/Library/Application Support/LooksBuilder/Looks/',
                      key: 'mac-mbl13',
                    },
                    {
                      label: 'Windows/Mac (MBL v14+)',
                      path: 'Documents\\Red Giant\\Magic Bullet Looks\\Presets',
                      key: 'winmac-mbl14',
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded border border-zinc-800 bg-[#121212] px-4 py-3 font-mono text-xs"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="font-bold text-white shrink-0">{item.label}:</span>
                        <span className="text-zinc-300 truncate">{item.path}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.path, item.key)}
                        className="shrink-0 self-end sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        {copiedKey === item.key ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-white" />
                            <span className="text-[11px] font-bold text-white">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                <p>
                  Create folders by purpose: color, shakes, text, transitions, camera, utility. A small organized library is more useful than hundreds of unnamed files.
                </p>
                <p>
                  Avoid dropping personal files into After Effects' built-in application preset folders. They may work, but updates and reinstalls can make them harder to manage.
                </p>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 6. SHORTCUTS */}
            {/* ========================================================================= */}
            <section id="shortcuts" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Speed
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Shortcuts worth learning first
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  Shortcuts are not about looking advanced. They reduce friction. Learn the keys you use every session before memorizing rare commands. On Mac, replace Ctrl with Cmd for most app-level shortcuts.
                </p>
              </div>

              {/* Grouped Shortcuts Grid */}
              <div className="space-y-5">
                {[
                  {
                    group: 'Timeline basics',
                    items: [
                      { key: 'Space', desc: 'start or stop preview' },
                      { key: '0 on numpad', desc: 'start or stop preview' },
                      { key: 'I / O', desc: 'jump to the selected layer in or out point' },
                      { key: 'B / N', desc: 'set the work area start or end' },
                    ],
                  },
                  {
                    group: 'Editing layers',
                    items: [
                      { key: 'Ctrl + Shift + D', desc: 'split selected layer' },
                      { key: 'Alt + [', desc: 'trim layer start' },
                      { key: 'Alt + ]', desc: 'trim layer end' },
                      { key: 'Ctrl + D', desc: 'duplicate selected layer' },
                    ],
                  },
                  {
                    group: 'Common tools',
                    items: [
                      { key: 'V', desc: 'selection tool' },
                      { key: 'H', desc: 'hand tool' },
                      { key: 'G', desc: 'pen tool' },
                      { key: 'Y', desc: 'pan-behind / anchor point tool' },
                      { key: 'Ctrl + Alt + Shift + T', desc: 'new text layer' },
                    ],
                  },
                  {
                    group: 'Layer properties',
                    items: [
                      { key: 'P', desc: 'position' },
                      { key: 'S', desc: 'scale' },
                      { key: 'R', desc: 'rotation' },
                      { key: 'T', desc: 'opacity' },
                      { key: 'U', desc: 'show animated properties' },
                      { key: 'L twice', desc: 'show audio waveform' },
                    ],
                  },
                  {
                    group: 'Project actions',
                    items: [
                      { key: 'Ctrl + S', desc: 'save' },
                      { key: 'Ctrl + I', desc: 'import' },
                      { key: 'Ctrl + K', desc: 'composition settings' },
                      { key: 'Ctrl + Alt + Y', desc: 'new adjustment layer' },
                      { key: 'Ctrl + Alt + Home', desc: 'center anchor point' },
                    ],
                  },
                ].map((block) => (
                  <div key={block.group} className="rounded border border-zinc-800 bg-[#121212] p-5">
                    <h4 className="font-sans text-sm font-bold text-white mb-3">
                      {block.group}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {block.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 rounded bg-zinc-950 px-3 py-2 border border-zinc-800/80"
                        >
                          <kbd className="font-mono text-[11px] font-bold text-white bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded shrink-0">
                            {item.key}
                          </kbd>
                          <span className="text-xs text-zinc-400 text-right truncate">
                            {item.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                <p>
                  Once these feel automatic, add keyframe shortcuts like Alt + Shift + P/S/R/T on Windows, or Option + P/S/R/T on Mac, for Position, Scale, Rotation, and Opacity. They save time when blocking out motion.
                </p>
                <p className="pt-2">
                  New to installing downloads too? Read the{' '}
                  <button
                    type="button"
                    onClick={() => setActiveModal('extract')}
                    className="text-white font-semibold underline underline-offset-2 hover:text-zinc-300"
                  >
                    extraction guide
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => setActiveModal('install')}
                    className="text-white font-semibold underline underline-offset-2 hover:text-zinc-300"
                  >
                    installation guide
                  </button>{' '}
                  before running anything.
                </p>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 7. EDITING PACK */}
            {/* ========================================================================= */}
            <section id="editing-pack" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Starter Pack
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Want a ready-made editing pack?
                </h2>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                  <p>
                    Building your own presets is the best long-term skill, but a good starter pack can help you begin faster. It gives you working examples to study, reusable motion pieces, and a baseline style library while you learn how After Effects handles effects, keyframes, and adjustment layers.
                  </p>
                  <p>
                    If you want that kind of starting point, 411's Essential Editing Pack is a one-time purchase built for edit workflows. The store page lists color corrections for After Effects 2023 and 2026+, Twixtor setups, Topaz settings, shakes, zooms, blurs, text effects, motion presets, styling presets, and setup guides.
                  </p>
                </div>
              </div>

              {/* 411's Essential Editing Pack Store Feature Box */}
              <div className="rounded-lg border border-zinc-800 bg-[#121212] p-6 sm:p-7 space-y-6">
                <div className="space-y-2">
                  <div className="font-mono text-xs font-semibold text-zinc-400">
                    scenepacks.com
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Essential Editing Pack
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                    Useful if you want organized presets to start with instead of building every shake, zoom, coloring, and text treatment from scratch.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://scenepacks.com"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                    >
                      <span>View the pack</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
                  {[
                    {
                      title: 'Color corrections',
                      desc: 'Looks for After Effects 2023 and 2026+.',
                    },
                    {
                      title: 'Motion presets',
                      desc: 'Shakes, zooms, blurs, glitches, panning, twitches, and styling presets.',
                    },
                    {
                      title: 'Speed tools',
                      desc: 'Twixtor setups for retimes and slow-motion workflows.',
                    },
                    {
                      title: 'Upscale setup',
                      desc: 'Topaz settings and screenshots for cleaner upscale exports.',
                    },
                    {
                      title: 'Text effects',
                      desc: 'Reusable text glow, gradient, scanline, turbulent, and wave presets.',
                    },
                    {
                      title: 'Setup guides',
                      desc: 'Included guides so you can import once and keep the pack organized.',
                    },
                  ].map((feat) => (
                    <div
                      key={feat.title}
                      className="rounded border border-zinc-800 bg-black p-4 space-y-1"
                    >
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-white">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Treat any pack as a learning tool, not a replacement for understanding the effects. Open the presets, press U or UU, and study what changes were made.
              </p>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* RELATED */}
            {/* ========================================================================= */}
            <section className="space-y-4 pt-2">
              <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                Related
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('extract-guide')}
                  className="rounded border border-zinc-800 bg-[#121212] p-3 text-center text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  Extract Guide
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal('install')}
                  className="rounded border border-zinc-800 bg-[#121212] p-3 text-center text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  Install Guide
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('windows')}
                  className="rounded border border-zinc-800 bg-[#121212] p-3 text-center text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  Windows Catalog
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('macos')}
                  className="rounded border border-zinc-800 bg-[#121212] p-3 text-center text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  MacOS Catalog
                </button>
              </div>
            </section>

            {/* Sub-footer matching prompt */}
            <footer className="pt-10 pb-6 border-t border-zinc-800 text-center space-y-4">
              <div className="text-zinc-500 font-mono text-xs flex items-center justify-center gap-2">
                <span>·</span>
                <span>Made with &lt;3</span>
                <span>·</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-zinc-400">
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  Status
                </button>
                <a
                  href="#tor"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors"
                >
                  Tor mirror
                </a>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  Credits
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </div>

              <div className="space-y-1 font-mono text-[11px] text-zinc-500">
                <p>© 2026, Est. April 2026.</p>
                <p>We don't host any downloads</p>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Extract / Install Guides Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-md border border-zinc-800 bg-[#121212] p-6 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="font-sans text-base font-bold text-white uppercase tracking-wide">
                {activeModal === 'extract' ? 'Extract Guide' : 'Install Guide'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeModal === 'extract' ? (
              <div className="mt-4 space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <Archive className="h-4 w-4 text-white" />
                  <span>7-ZIP & ARCHIVE EXTRACTION</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex gap-2">
                    <span className="text-white font-bold">1.</span>
                    <span>Download and verify official 64-bit 7-Zip (Windows) or Keka (Mac).</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">2.</span>
                    <span>Right-click the target <code>.7z</code> container &rarr; 7-Zip &rarr; Extract to destination folder.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">3.</span>
                    <span>When prompted for the container archive password, input:</span>
                  </div>
                  <div className="ml-5 flex items-center gap-2 pt-1">
                    <span className="bg-zinc-950 text-white px-3 py-1 rounded border border-zinc-700 font-mono font-bold">
                      flame
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="px-2.5 py-1 bg-white text-black font-mono font-bold rounded text-xs hover:bg-zinc-200 transition-colors"
                    >
                      {copiedPassword ? 'COPIED' : 'COPY PASSWORD'}
                    </button>
                  </div>
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <Wrench className="h-4 w-4 text-white" />
                  <span>SOFTWARE & PLUGIN INSTALLATION</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex gap-2">
                    <span className="text-white font-bold">1.</span>
                    <span>Add extraction & install folder exclusions in Windows Defender or macOS Gatekeeper.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">2.</span>
                    <span>Execute the installer (<code className="text-white">Set-up.exe</code> or <code className="text-white">.pkg</code>) with administrative rights.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">3.</span>
                    <span>If a patch/crack is included, copy replacement DLLs/executables into the application support folder.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">4.</span>
                    <span>Disable Adobe Genuine Software (AGS) service to maintain offline license persistence.</span>
                  </div>
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
