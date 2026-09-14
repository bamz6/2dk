import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Archive,
  Wrench,
  X,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
  FolderTree,
  Zap,
  Package,
} from 'lucide-react';

interface BeginnersGuideProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

const SECTIONS = [
  { id: 'hardware-specs', label: 'Hardware' },
  { id: 'version-roadmap', label: 'AE Version' },
  { id: 'essential-plugins', label: 'Plugins' },
  { id: 'comp-standards', label: 'Composition' },
  { id: 'preset-directories', label: 'Workflow' },
  { id: 'velocity-hotkeys', label: 'Shortcuts' },
  { id: 'preset-starter-bundle', label: 'Editing Pack' },
];

export const BeginnersGuide: React.FC<BeginnersGuideProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'extract' | 'install' | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hardware-specs');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
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

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText('flame');
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 bg-black text-white selection:bg-white selection:text-black">
      {/* Breadcrumbs */}
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[#71717A]">
        <button
          type="button"
          onClick={onBack}
          className="text-[#A1A1AA] hover:text-white transition-colors"
        >
          Index
        </button>
        <span>/</span>
        <span className="text-white font-semibold">Docs</span>
        <span>/</span>
        <span className="text-white font-semibold">Beginner's Handbook</span>
      </div>

      {/* Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#121212] border border-[#27272A] font-mono text-[11px] text-[#A1A1AA] mb-3">
          <span>3DFX PROTOCOL // AE PRODUCTION ONBOARDING</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Beginner's Handbook
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] max-w-2xl">
          Core workstation specifications, timeline parameters, plugin architectures, preset directories, and velocity hotkeys.
        </p>
      </div>

      {/* Main Layout: Sticky Sections Sidebar + Guide Document */}
      <div className="mt-10 flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
        {/* Sticky Sections Sidebar matching requested design */}
        <aside className="w-full lg:w-48 shrink-0 lg:sticky lg:top-24 self-start">
          <div className="rounded-lg lg:rounded-none border border-[#1F1F1F] lg:border-0 bg-[#0D0D0D] lg:bg-transparent p-3 lg:p-0">
            <div className="font-sans text-[11px] font-bold tracking-wider text-[#71717A] uppercase mb-2 px-3">
              SECTIONS
            </div>
            <nav className="flex flex-row lg:flex-col gap-0.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(sec.id);
                      const el = document.getElementById(sec.id);
                      if (el) {
                        const yOffset = -90;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className={`block whitespace-nowrap px-3 py-2 text-sm transition-all border-l-2 ${
                      isActive
                        ? 'border-white bg-[#1A1A1A] text-white font-medium'
                        : 'border-transparent text-[#8A8A8E] hover:text-white hover:bg-[#121212]'
                    }`}
                  >
                    {sec.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 min-w-0 max-w-4xl space-y-16">
        {/* ========================================================================= */}
        {/* 1. HARDWARE ARCHITECTURE */}
        {/* ========================================================================= */}
        <section id="hardware-specs" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#71717A] mb-2">
            <Cpu className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>SEC.01 // SYSTEM BENCHMARKS</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            Workstation Architecture
          </h2>
          <h3 className="font-sans text-base sm:text-lg font-medium text-[#D4D4D8] mb-4">
            Hardware bottlenecks and resource allocation in After Effects
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            <p>
              Unlike conventional NLEs that rely heavily on hardware GPU decoders for stream playback, After Effects processes raster compositions on a frame-by-frame basis. This computational pipeline makes CPU IPC (single-core instructions per cycle), memory density, and scratch disk throughput the primary determiners of system responsiveness.
            </p>
            <p>
              A high-end graphics card accelerates specific OpenCL/CUDA shaders and preview rendering, but it cannot offset an overloaded memory bus or an underpowered processor. For modern composition pipelines, 32GB of RAM is the realistic baseline to prevent constant frame cache flushing. While 16GB allows basic timeline assembly, it quickly degrades once complex adjustment stacks, optical motion blur, and 4K source plates are introduced.
            </p>
            <p>
              Disk write speed directly dictates the stability of your render buffer. Isolate your OS, active project assets, and After Effects disk cache on dedicated NVMe SSD volumes whenever possible. When scratch drives exceed 85% capacity, timeline scrubbing, background autosaves, and RAM preview generation often manifest severe micro-stuttering.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4">
              <span className="text-[#71717A] block mb-1">01. CPU SINGLE-CORE</span>
              <span className="text-white font-bold text-sm block mb-1">IPC &gt; Core Count</span>
              <p className="font-sans text-xs text-[#A1A1AA]">
                Prioritize single-thread turbo frequencies for rapid expression evaluation and timeline scrubbing.
              </p>
            </div>
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4">
              <span className="text-[#71717A] block mb-1">02. MEMORY THRESHOLD</span>
              <span className="text-white font-bold text-sm block mb-1">32GB – 64GB DDR4/5</span>
              <p className="font-sans text-xs text-[#A1A1AA]">
                Maintains multi-second green-bar RAM preview caches without continuous frame recalculation.
              </p>
            </div>
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4">
              <span className="text-[#71717A] block mb-1">03. SCRATCH VOLUME</span>
              <span className="text-white font-bold text-sm block mb-1">Dedicated NVMe</span>
              <p className="font-sans text-xs text-[#A1A1AA]">
                Allocate at least 100GB of fast, dedicated disk cache space to eliminate preview dropped frames.
              </p>
            </div>
          </div>
        </section>

        <div className="border-b border-[#1F1F1F]" />

        {/* ========================================================================= */}
        {/* 2. VERSION SELECTION & COMPATIBILITY */}
        {/* ========================================================================= */}
        <section id="version-roadmap" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#71717A] mb-2">
            <Layers className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>SEC.02 // HOST RELEASES & COMPATIBILITY</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            Selecting an After Effects Build
          </h2>
          <h3 className="font-sans text-base sm:text-lg font-medium text-[#D4D4D8] mb-4">
            Deployment stability, native architecture, and backward compatibility
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            <p>
              The optimal rule of thumb is deploying the latest stable release your hardware and third-party plugin collection support. Current point releases feature updated color management engines, native Apple Silicon optimizations, and modern format decoders that legacy versions lack.
            </p>
            <p>
              Project schema backwards-compatibility requires careful planning. While After Effects natively opens project archives authored in earlier builds, legacy installations cannot read files saved in newer releases. When delivering comp files to collaborators running earlier versions, always execute <code className="text-white bg-[#181818] px-1.5 py-0.5 rounded border border-[#27272A] font-mono text-xs">File &gt; Save As &gt; Save a Copy As [Previous Version]</code>.
            </p>
            <p>
              For macOS workstations running Apple Silicon, verify whether your core plugins compile to native ARM64 or require the Rosetta 2 translation layer. Mixing legacy non-universal binaries inside a native host application can cause intermittent crashes or render errors.
            </p>

            <div className="rounded border border-[#27272A] bg-[#0D0D0D] p-4 text-white font-medium text-xs sm:text-sm">
              Avoid selecting software builds based on social media trends. Choose the modern revision that consistently validates with your installed plugins and hardware drivers.
            </div>
          </div>
        </section>

        <div className="border-b border-[#1F1F1F]" />

        {/* ========================================================================= */}
        {/* 3. PLUGIN ARCHITECTURES */}
        {/* ========================================================================= */}
        <section id="essential-plugins" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#71717A] mb-2">
            <Sparkles className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>SEC.03 // THIRD-PARTY ECOSYSTEM</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            Plugin Architectures
          </h2>
          <h3 className="font-sans text-base sm:text-lg font-medium text-[#D4D4D8] mb-4">
            Building a curated, lightweight effects library
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            <p>
              Third-party plugins extend After Effects beyond its stock native toolset, delivering hardware-accelerated shaders, procedural particles, and automated optical calculations. However, indiscriminately hoarding every package degrades application launch times, bloats context menus, and creates dependency conflicts.
            </p>
            <p>
              Tailor your toolset strictly to your visual output: colorists utilize <strong className="text-white">Magic Bullet Looks</strong> and <strong className="text-white">Deep Glow</strong>; kinetic editors lean on <strong className="text-white">RSMB</strong>, <strong className="text-white">Sapphire</strong>, <strong className="text-white">BCC</strong>, and <strong className="text-white">Twixtor</strong>; 3D motion designers rely on <strong className="text-white">Element 3D</strong>; and experimental creators employ <strong className="text-white">Signal</strong>, <strong className="text-white">Pixel Sorter</strong>, <strong className="text-white">Glitchify</strong>, or <strong className="text-white">Datamosh</strong>.
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Standard Production Toolsets
            </h4>

            <div className="border border-[#1F1F1F] bg-[#1F1F1F] rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-[1px]">
              {[
                {
                  name: 'ReelSmart Motion Blur (RSMB)',
                  tag: 'VECTOR BLUR',
                  desc: 'Calculates per-pixel optical flow vectors to generate organic motion blur across dynamic transitions.',
                },
                {
                  name: 'Magic Bullet Looks',
                  tag: 'COLOR PROFILE',
                  desc: 'Comprehensive color-grading suite featuring customized LUT emulation, curves, film grain, and halation.',
                },
                {
                  name: 'Boris FX Sapphire',
                  tag: 'VFX & SHADERS',
                  desc: 'Industry-standard effect library providing optical glows, procedural textures, lens distortions, and glitch passes.',
                },
                {
                  name: 'Boris FX Continuum (BCC)',
                  tag: 'CLEANUP & RESTORE',
                  desc: 'Extensive toolkit for digital cleanup, lens flare generation, chroma keying, and motion graphics styling.',
                },
                {
                  name: 'RE:Vision Effects Twixtor',
                  tag: 'FRAME INTERPOLATION',
                  desc: 'Advanced optical flow frame synthesis engine designed for clean speed ramps and cinematic slow-motion.',
                },
                {
                  name: 'Maxon Universe',
                  tag: 'RETRO & TEXTURE',
                  desc: 'Lightweight GPU-accelerated suite with VHS tape degradation, chromatic aberrations, and retro visual presets.',
                },
                {
                  name: 'Trapcode Particular',
                  tag: '3D PARTICLES',
                  desc: 'Physics-based procedural particle engine for atmospheric dust, sparks, organic fluid dynamics, and 3D shapes.',
                },
                {
                  name: 'Video Copilot Element 3D',
                  tag: 'OPENGL 3D',
                  desc: 'Real-time particle and 3D mesh rendering engine supporting OBJ/C4D models, PBR materials, and physical shaders.',
                },
                {
                  name: 'Deep Glow',
                  tag: 'PHOTOMETRIC GLOW',
                  desc: 'Inverse-square glow calculation simulating real optical light falloff with chromatic dispersion and gamma correction.',
                },
                {
                  name: 'Optical Flares',
                  tag: 'PROCEDURAL LENS FLARES',
                  desc: 'Parametric lens flare generator offering dynamic light tracking, iris reflection control, and custom element design.',
                },
              ].map((plugin) => (
                <div key={plugin.name} className="bg-[#0D0D0D] p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-sans text-sm sm:text-base font-bold text-white">
                        {plugin.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#71717A] border border-[#27272A] px-1.5 py-0.5 rounded">
                        {plugin.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {plugin.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 text-xs text-[#A1A1AA]">
              Tip: Study developer documentation and technical breakdowns before installing any package. Understanding how an effect modifies pixel values prevents unnecessary render load.
            </div>
          </div>
        </section>

        <div className="border-b border-[#1F1F1F]" />

        {/* ========================================================================= */}
        {/* 4. COMPOSITION STANDARDS */}
        {/* ========================================================================= */}
        <section id="comp-standards" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#71717A] mb-2">
            <Sliders className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>SEC.04 // COMPOSITION SPECIFICATIONS</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            Timeline Configuration
          </h2>
          <h3 className="font-sans text-base sm:text-lg font-medium text-[#D4D4D8] mb-4">
            Resolution, aspect ratios, and temporal cadence
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            <h4 className="font-sans text-base font-bold text-white">
              Aspect Ratios & Pixel Density
            </h4>
            <p>
              Resolution specifies the total horizontal and vertical pixel grid, while aspect ratio defines the proportional relationship of width to height. Matching target delivery platforms during project initiation eliminates awkward letterboxing and resubmission requirements.
            </p>
            <p>
              Square 1:1 framing (<code className="text-white bg-[#181818] px-1.5 py-0.5 rounded border border-[#27272A] font-mono text-xs">1080×1080</code>) remains a versatile standard for social feed carousels and multi-platform distribution. Vertical 9:16 (<code className="text-white bg-[#181818] px-1.5 py-0.5 rounded border border-[#27272A] font-mono text-xs">1080×1920</code>) serves mobile reels and short-form video, while widescreen 16:9 (<code className="text-white bg-[#181818] px-1.5 py-0.5 rounded border border-[#27272A] font-mono text-xs">1920×1080</code>) remains the reference format for long-form desktop and broadcast displays.
            </p>
          </div>

          {/* Ratio Matrix */}
          <div className="mt-6 border border-[#1F1F1F] rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="border-b border-[#1F1F1F] bg-[#141414] text-[#71717A] uppercase">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Aspect</th>
                    <th className="py-3 px-4 font-semibold">Resolution</th>
                    <th className="py-3 px-4 font-semibold font-sans">Target Output</th>
                    <th className="py-3 px-4 font-semibold text-center">Viewport Frame</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F] bg-[#0D0D0D]">
                  {[
                    {
                      ratio: '1:1',
                      pixels: '1080×1080',
                      goodFor: 'Universal social feed posts, album art, classic edit comps',
                      frameStyle: 'w-6 h-6',
                    },
                    {
                      ratio: '16:9',
                      pixels: '1920×1080',
                      goodFor: 'YouTube standard, desktop monitors, cinematic widescreen',
                      frameStyle: 'w-8 h-4.5',
                    },
                    {
                      ratio: '9:16',
                      pixels: '1080×1920',
                      goodFor: 'TikTok, Instagram Reels, YouTube Shorts, mobile full-screen',
                      frameStyle: 'w-4 h-7',
                    },
                    {
                      ratio: '4:3',
                      pixels: '1440×1080',
                      goodFor: 'CRT monitor emulation, vintage anime master sources, retro framing',
                      frameStyle: 'w-7 h-5',
                    },
                    {
                      ratio: '3:4',
                      pixels: '1080×1440',
                      goodFor: 'Custom portrait framing without full vertical mobile bleed',
                      frameStyle: 'w-5 h-6.5',
                    },
                    {
                      ratio: '5:4',
                      pixels: '1350×1080',
                      goodFor: 'Wide-square photography crops and legacy monitor ratios',
                      frameStyle: 'w-6.5 h-5',
                    },
                    {
                      ratio: '4:5',
                      pixels: '1080×1350',
                      goodFor: 'Vertical mobile feeds optimized for maximum vertical screen coverage',
                      frameStyle: 'w-5 h-6',
                    },
                  ].map((row) => (
                    <tr key={row.ratio} className="hover:bg-[#121212] transition-colors">
                      <td className="py-3 px-4 text-white font-bold">{row.ratio}</td>
                      <td className="py-3 px-4 text-zinc-300">{row.pixels}</td>
                      <td className="py-3 px-4 font-sans text-xs text-[#A1A1AA]">{row.goodFor}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <div className={`border border-[#3F3F46] bg-black rounded-[2px] ${row.frameStyle}`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 text-xs text-[#A1A1AA] leading-relaxed">
            Note: Dimension values always follow <code className="text-white font-mono">Width × Height</code>. Inverting 1080×1920 into 1920×1080 alters vertical canvas orientation into landscape mode.
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h4 className="font-sans text-base font-bold text-white mb-2">
                Frame Rate Discipline
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
                Synchronize project timebases with source material. Standard cinematic film and animation footage runs natively at 23.976 or 24 FPS. Standard commercial edits target 30 FPS. High-tempo gameplay sequences or complex retiming workflows benefit from 60 FPS, though 60 FPS quadruples frame cache calculation overhead.
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
                To produce a stylized low-frame-rate stop-motion aesthetic, apply the <strong className="text-white">Posterize Time</strong> effect to targeted adjustment layers rather than downclocking the base composition settings. This preserves native velocity curves on titles, cameras, and audio sync.
              </p>
            </div>

            <div>
              <h4 className="font-sans text-base font-bold text-white mb-2">
                Timeline Boundaries & Background Solid
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
                Constrain comp length to your master audio track duration from the start to prevent rendering dead air. Keep the default comp background color black to guarantee predictable alpha channels during luminance transitions and flash overlays.
              </p>
            </div>
          </div>
        </section>

        <div className="border-b border-[#1F1F1F]" />

        {/* ========================================================================= */}
        {/* 5. PRESET DIRECTORIES */}
        {/* ========================================================================= */}
        <section id="preset-directories" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#71717A] mb-2">
            <FolderTree className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>SEC.05 // PRESET ARCHITECTURE & PATHS</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            Preset Organization
          </h2>
          <h3 className="font-sans text-base sm:text-lg font-medium text-[#D4D4D8] mb-4">
            Managing user .FFX animations and Magic Bullet Looks trees
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            <p>
              After Effects exports compound effect combinations, spatial keyframes, and custom expressions into reusable <code className="text-white font-mono text-xs">.ffx</code> animation preset bundles. Preserving custom transitions, camera shakes, and text stylizations requires structured directory hygiene.
            </p>
            <p>
              Save customized presets via <code className="text-white bg-[#181818] px-1.5 py-0.5 rounded border border-[#27272A] font-mono text-xs">Animation &gt; Save Animation Preset</code>. Always write files to the designated user documents path to isolate personal assets from host application update cycles.
            </p>
          </div>

          {/* User Presets Paths */}
          <div className="mt-6 space-y-3 font-mono text-xs">
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[#71717A] text-[10px] block mb-1">WINDOWS // USER PRESETS REPOSITORY</span>
                <code className="text-white break-all">Documents\Adobe\After Effects [version]\User Presets</code>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('Documents\\Adobe\\After Effects [version]\\User Presets', 'win-preset')}
                className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 rounded border border-[#27272A] bg-black px-3 py-1.5 text-xs text-white hover:border-white transition-colors"
              >
                {copiedKey === 'win-preset' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-white" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>COPY PATH</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[#71717A] text-[10px] block mb-1">MACOS // USER PRESETS REPOSITORY</span>
                <code className="text-white break-all">~/Documents/Adobe/After Effects [version]/User Presets</code>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('~/Documents/Adobe/After Effects [version]/User Presets', 'mac-preset')}
                className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 rounded border border-[#27272A] bg-black px-3 py-1.5 text-xs text-white hover:border-white transition-colors"
              >
                {copiedKey === 'mac-preset' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-white" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>COPY PATH</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-sans text-base font-bold text-white mb-2">
              Magic Bullet Looks Profiles (.mblook / .rgx)
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-[#A1A1AA] mb-4">
              MBL uses dedicated proprietary profile containers. Builds v13 and older read legacy <code className="text-white font-mono text-xs">.mblook</code> formats. Builds v14 and later transition to XML-based <code className="text-white font-mono text-xs">.rgx</code> files in the user documents directory. Older <code className="text-white font-mono text-xs">.mblook</code> presets can be converted by opening them directly within the Looks Builder interface.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[#71717A] text-[10px] block mb-1">WINDOWS // MBL v13 LEGACY PATH</span>
                  <code className="text-white break-all">C:\Program Files (x86)\LooksBuilder\Looks</code>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('C:\\Program Files (x86)\\LooksBuilder\\Looks', 'mbl-win-13')}
                  className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 rounded border border-[#27272A] bg-black px-3 py-1.5 text-xs text-white hover:border-white transition-colors"
                >
                  {copiedKey === 'mbl-win-13' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY PATH</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[#71717A] text-[10px] block mb-1">MACOS // MBL v13 LEGACY PATH</span>
                  <code className="text-white break-all">/Library/Application Support/LooksBuilder/Looks/</code>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('/Library/Application Support/LooksBuilder/Looks/', 'mbl-mac-13')}
                  className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 rounded border border-[#27272A] bg-black px-3 py-1.5 text-xs text-white hover:border-white transition-colors"
                >
                  {copiedKey === 'mbl-mac-13' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY PATH</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[#71717A] text-[10px] block mb-1">CROSS-PLATFORM // MBL v14+ MODERN PATH</span>
                  <code className="text-white break-all">Documents\Red Giant\Magic Bullet Looks\Presets</code>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('Documents\\Red Giant\\Magic Bullet Looks\\Presets', 'mbl-14')}
                  className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 rounded border border-[#27272A] bg-black px-3 py-1.5 text-xs text-white hover:border-white transition-colors"
                >
                  {copiedKey === 'mbl-14' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY PATH</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs sm:text-sm text-[#A1A1AA]">
              <p>
                Best Practice: Structure subdirectories by function (<code className="text-zinc-300">/Color</code>, <code className="text-zinc-300">/Motion</code>, <code className="text-zinc-300">/Typography</code>, <code className="text-zinc-300">/Distortion</code>).
              </p>
              <p>
                Never install third-party presets into the internal Program Files application root directory; subsequent Adobe software updates overwrite or purge non-native content.
              </p>
            </div>
          </div>
        </section>

        <div className="border-b border-[#1F1F1F]" />

        {/* ========================================================================= */}
        {/* 6. VELOCITY COMMANDS */}
        {/* ========================================================================= */}
        <section id="velocity-hotkeys" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#71717A] mb-2">
            <Zap className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>SEC.06 // TIMELINE EFFICIENCY</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            High-Velocity Key Commands
          </h2>
          <h3 className="font-sans text-base sm:text-lg font-medium text-[#D4D4D8] mb-4">
            Eliminating mouse-travel latency in the timeline
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-[#A1A1AA] mb-6">
            Key commands streamline routine assembly actions into muscle memory. Master foundational playback, layer splitting, and property revelations before memorizing specialized secondary macros. On macOS systems, replace <kbd className="font-mono text-xs text-white">Ctrl</kbd> with <kbd className="font-mono text-xs text-white">Cmd</kbd>.
          </p>

          <div className="space-y-4">
            {/* Playback & Playhead */}
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-5">
              <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block mb-3 font-semibold">
                01. Preview & Playhead Transport
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Space</span>
                  <span className="text-[#A1A1AA] font-sans">Toggle RAM Preview</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">0 (Numpad)</span>
                  <span className="text-[#A1A1AA] font-sans">Cached Audio & Video Preview</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">I / O</span>
                  <span className="text-[#A1A1AA] font-sans">Seek to Layer In / Out Marker</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">B / N</span>
                  <span className="text-[#A1A1AA] font-sans">Define Work Area In / Out Boundary</span>
                </div>
              </div>
            </div>

            {/* Layer Manipulation */}
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-5">
              <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block mb-3 font-semibold">
                02. Layer Trimming & Assembly
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + Shift + D</span>
                  <span className="text-[#A1A1AA] font-sans">Split Selected Layer at Playhead</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Alt + [</span>
                  <span className="text-[#A1A1AA] font-sans">Trim Layer In-Point to Playhead</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Alt + ]</span>
                  <span className="text-[#A1A1AA] font-sans">Trim Layer Out-Point to Playhead</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + D</span>
                  <span className="text-[#A1A1AA] font-sans">Duplicate Layer Stack</span>
                </div>
              </div>
            </div>

            {/* Core Tools */}
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-5">
              <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block mb-3 font-semibold">
                03. Primary Workspace Tools
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">V</span>
                  <span className="text-[#A1A1AA] font-sans">Pointer / Selection</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">H</span>
                  <span className="text-[#A1A1AA] font-sans">Viewport Hand Pan</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">G</span>
                  <span className="text-[#A1A1AA] font-sans">Bezier Pen Vector</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Y</span>
                  <span className="text-[#A1A1AA] font-sans">Pan-Behind (Anchor Point)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2 sm:col-span-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + Alt + Shift + T</span>
                  <span className="text-[#A1A1AA] font-sans">Instantiate New Typography Layer</span>
                </div>
              </div>
            </div>

            {/* Transform Properties */}
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-5">
              <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block mb-3 font-semibold">
                04. Spatial & Transform Properties
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">P</span>
                  <span className="text-[#A1A1AA] font-sans">Reveal Position Property</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">S</span>
                  <span className="text-[#A1A1AA] font-sans">Reveal Scale Property</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">R</span>
                  <span className="text-[#A1A1AA] font-sans">Reveal Rotation Property</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">T</span>
                  <span className="text-[#A1A1AA] font-sans">Reveal Opacity (Transparency)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">U</span>
                  <span className="text-[#A1A1AA] font-sans">Filter to Animated Keyframes Only</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">L (Double Tap)</span>
                  <span className="text-[#A1A1AA] font-sans">Expand Audio Waveform</span>
                </div>
              </div>
            </div>

            {/* Document & Setup */}
            <div className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-5">
              <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider block mb-3 font-semibold">
                05. Composition & Document Operations
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + S</span>
                  <span className="text-[#A1A1AA] font-sans">Commit Project State (Save)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + I</span>
                  <span className="text-[#A1A1AA] font-sans">Import Media Assets</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + K</span>
                  <span className="text-[#A1A1AA] font-sans">Access Composition Settings</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + Alt + Y</span>
                  <span className="text-[#A1A1AA] font-sans">Instantiate Adjustment Layer</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2 sm:col-span-2">
                  <span className="text-white font-bold bg-black px-2 py-0.5 rounded border border-[#27272A]">Ctrl + Alt + Home</span>
                  <span className="text-[#A1A1AA] font-sans">Center Anchor Point in Layer Bounds</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded border border-[#1F1F1F] bg-[#0D0D0D] p-4 text-xs text-[#A1A1AA] leading-relaxed">
            Pro Tip: For rapid spatial blocking, assign immediate keyframes with <kbd className="font-mono text-white">Alt + Shift + P/S/R/T</kbd> (Windows) or <kbd className="font-mono text-white">Option + P/S/R/T</kbd> (macOS) without manually expanding twirl-down properties.
          </div>

          <div className="mt-4 rounded border border-[#27272A] bg-black p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-[#A1A1AA]">
              First time deploying archive packages? Review our verified archive extraction and system installation runbooks.
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal('extract')}
                className="rounded border border-[#3F3F46] bg-[#0D0D0D] px-2.5 py-1 text-white hover:bg-white hover:text-black font-semibold transition-colors"
              >
                Extract Runbook
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('install')}
                className="rounded border border-[#3F3F46] bg-[#0D0D0D] px-2.5 py-1 text-white hover:bg-white hover:text-black font-semibold transition-colors"
              >
                Install Runbook
              </button>
            </div>
          </div>
        </section>

        <div className="border-b border-[#1F1F1F]" />

        {/* ========================================================================= */}
        {/* 7. STARTER PACK / PRESET BUNDLE */}
        {/* ========================================================================= */}
        <section id="preset-starter-bundle" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#71717A] mb-2">
            <Package className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>SEC.07 // EXTERNAL RESOURCES</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
            Production Starter Bundles
          </h2>
          <h3 className="font-sans text-base sm:text-lg font-medium text-[#D4D4D8] mb-4">
            Deconstructing reference animation presets and styling frameworks
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            <p>
              Authoring customized presets remains the most sustainable skill for any visual editor. However, analyzing professional project files and well-architected preset bundles can significantly compress the initial learning curve. Studying how experienced creators layer optical blurs, curve dampeners, and displacement maps accelerates timeline mastery.
            </p>
            <p>
              If you require an organized production baseline, 411's Essential Editing Pack on ScenePacks is a structured community bundle tailored for kinetic workflows. It includes pre-calibrated color grades across After Effects 2023 through 2026, dynamic camera shakes, zoom transitions, temporal retiming parameters, and typography treatments.
            </p>
          </div>

          {/* Preset Card */}
          <div className="mt-6 rounded-md border border-[#27272A] bg-[#0D0D0D] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#1F1F1F] pb-6">
              <div>
                <span className="font-mono text-xs text-[#71717A] tracking-wider block mb-1">
                  SCENEPACKS.COM // PRODUCTION BUNDLE
                </span>
                <h4 className="font-sans text-xl sm:text-2xl font-bold text-white">
                  Essential Editing Pack
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] max-w-xl">
                  A modular reference pack providing foundational motion presets, retiming presets, and color profiles without building each component from scratch.
                </p>
              </div>

              <a
                href="https://scenepacks.com"
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
              >
                <span>Access Catalog</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Breakdown */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              <div className="border border-[#1F1F1F] bg-black p-4 rounded">
                <span className="text-white font-bold block mb-1">Color Grading</span>
                <p className="font-sans text-xs text-[#A1A1AA]">Looks profiles engineered for AE 2023 through 2026+ releases.</p>
              </div>
              <div className="border border-[#1F1F1F] bg-black p-4 rounded">
                <span className="text-white font-bold block mb-1">Kinetic Presets</span>
                <p className="font-sans text-xs text-[#A1A1AA]">Organic camera shakes, zooms, directional blurs, and glitch textures.</p>
              </div>
              <div className="border border-[#1F1F1F] bg-black p-4 rounded">
                <span className="text-white font-bold block mb-1">Optical Retiming</span>
                <p className="font-sans text-xs text-[#A1A1AA]">Configured Twixtor parameters for smooth speed ramps and frame blending.</p>
              </div>
              <div className="border border-[#1F1F1F] bg-black p-4 rounded">
                <span className="text-white font-bold block mb-1">Upscale Profiles</span>
                <p className="font-sans text-xs text-[#A1A1AA]">Tested Topaz Video AI model settings for crisp footage upscaling.</p>
              </div>
              <div className="border border-[#1F1F1F] bg-black p-4 rounded">
                <span className="text-white font-bold block mb-1">Typography Stylization</span>
                <p className="font-sans text-xs text-[#A1A1AA]">Parametric text glows, gradients, scanlines, and turbulent wave animations.</p>
              </div>
              <div className="border border-[#1F1F1F] bg-black p-4 rounded">
                <span className="text-white font-bold block mb-1">Import Documentation</span>
                <p className="font-sans text-xs text-[#A1A1AA]">Step-by-step setup guides to maintain directory cleanliness.</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-[#71717A] leading-relaxed">
              Workflow Tip: Treat commercial packs as analytical templates. Inspect imported layers by pressing <kbd className="font-mono text-zinc-300">U</kbd> or <kbd className="font-mono text-zinc-300">UU</kbd> to inspect keyframe easing curves and expression bindings.
            </p>
          </div>
        </section>

        <div className="border-b border-[#1F1F1F]" />

        {/* ========================================================================= */}
        {/* RELATED DIRECTORIES */}
        {/* ========================================================================= */}
        <section className="pt-2">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#71717A] mb-4">
            System Runbooks & Catalogs
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveModal('extract')}
              className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:border-white hover:text-white transition-colors"
            >
              Extraction Runbook
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('install')}
              className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:border-white hover:text-white transition-colors"
            >
              Installation Runbook
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage && onNavigatePage('windows')}
              className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:border-white hover:text-white transition-colors"
            >
              Windows Catalog
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage && onNavigatePage('macos')}
              className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:border-white hover:text-white transition-colors"
            >
              macOS Catalog
            </button>
          </div>
        </section>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE GUIDE MODALS */}
      {/* ========================================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-md border border-[#27272A] bg-[#0D0D0D] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
              <h3 className="font-sans text-base font-bold text-white uppercase tracking-wide">
                {activeModal === 'extract' ? 'Archive Extraction Protocol' : 'Deployment Protocol'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#71717A] hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeModal === 'extract' ? (
              <div className="mt-4 space-y-4 text-xs sm:text-sm text-[#A1A1AA]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
                  <Archive className="h-4 w-4 text-white" />
                  <span>SEC.01 // 7-ZIP VERIFICATION PROTOCOL</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-white font-bold">1.</span>
                    <span>Download and verify official 64-bit 7-Zip binaries from 7-zip.org.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">2.</span>
                    <span>Right-click the target <code>.7z</code> container &rarr; 7-Zip &rarr; Extract to destination folder.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">3.</span>
                    <span>When prompted for the container decryption key, input:</span>
                  </div>
                  <div className="ml-5 flex items-center gap-2 pt-1">
                    <span className="bg-[#181818] text-white px-3 py-1 rounded border border-[#27272A] font-mono font-bold">
                      flame
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="px-2.5 py-1 bg-white text-black font-mono font-bold rounded text-xs hover:bg-zinc-200 transition-colors"
                    >
                      {copiedPassword ? 'COPIED' : 'COPY KEY'}
                    </button>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-xs sm:text-sm text-[#A1A1AA]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
                  <Wrench className="h-4 w-4 text-white" />
                  <span>SEC.02 // STANDARD RUNTIME DEPLOYMENT</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex gap-2">
                    <span className="text-white font-bold">1.</span>
                    <span>Temporarily pause active real-time heuristics to prevent false-positive quarantines on patch files.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">2.</span>
                    <span>Execute the primary package installer (<code className="text-white">setup.exe</code>) with administrative rights.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">3.</span>
                    <span>If a medicine / patched binary directory is included, replace original files in the application root.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">4.</span>
                    <span>Establish outbound blocking rules in Windows Defender Firewall to maintain offline license persistence.</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
