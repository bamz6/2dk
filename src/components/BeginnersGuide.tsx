import React from 'react';
import { ArrowLeft, Cpu, Sliders, Layers, FolderTree, AlertCircle, Wrench } from 'lucide-react';

interface BeginnersGuideProps {
  onBack: () => void;
}

export const BeginnersGuide: React.FC<BeginnersGuideProps> = ({ onBack }) => {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 bg-black text-white">
      {/* Back button and Section Tag */}
      <div className="mb-6 flex items-center justify-between font-mono text-xs text-[#71717A]">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-1.5 text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>INDEX // BROWSE</span>
        </button>
        <span className="tracking-wider">SEC.02 // ONBOARD</span>
      </div>

      {/* Guide Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Beginner's Video Editing & Motion Guide
        </h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base text-[#A1A1AA]">
          A pragmatic, zero-fluff manual for setting up an editing workstation, standardizing project parameters, avoiding software crashes, and mastering core NLE fundamentals.
        </p>
      </div>

      {/* Quick Nav / Spec Matrix */}
      <div className="my-8 grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
        <a
          href="#hardware"
          className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:bg-white hover:text-black transition-colors"
        >
          01. HARDWARE
        </a>
        <a
          href="#compositions"
          className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:bg-white hover:text-black transition-colors"
        >
          02. TIMELINE SPECS
        </a>
        <a
          href="#stability"
          className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:bg-white hover:text-black transition-colors"
        >
          03. NLE STABILITY
        </a>
        <a
          href="#plugins"
          className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:bg-white hover:text-black transition-colors"
        >
          04. FIRST SCRIPTS
        </a>
        <a
          href="#file-structure"
          className="rounded border border-[#1F1F1F] bg-[#0D0D0D] p-3 text-center text-[#A1A1AA] hover:bg-white hover:text-black transition-colors"
        >
          05. DIRECTORIES
        </a>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 max-w-4xl text-sm leading-relaxed">
        {/* SECTION 1: HARDWARE */}
        <section id="hardware" className="scroll-mt-20 border border-[#1F1F1F] rounded-md bg-[#0D0D0D] p-6 sm:p-8">
          <div className="flex items-center gap-3 font-mono text-xs text-[#71717A] mb-3">
            <Cpu className="h-4 w-4 text-white" />
            <span>SPEC.01 // HARDWARE SIZING</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            1. Workstation & System Specifications
          </h2>
          <p className="text-[#A1A1AA] mb-6">
            Video editing and motion graphics tax systems differently. Premiere Pro and DaVinci Resolve prioritize GPU VRAM and playback decoding engines, whereas After Effects is notoriously RAM-intensive and relies heavily on high single-core clock speeds for composition rendering.
          </p>

          <div className="space-y-4 font-mono text-xs">
            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold mb-1">RAM (System Memory)</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                • <strong>32 GB:</strong> The bare minimum for comfortable 1080p and light 4K timeline cuts.<br />
                • <strong>64 GB:</strong> The sweet spot for motion design, multi-layer After Effects comps, and 4K ProRes.<br />
                • <strong>128 GB+:</strong> Necessary for 6K/8K RAW footage, 32-bit floating point color composites, and heavy 3D passes.
              </p>
            </div>

            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold mb-1">VRAM & Dedicated GPU</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                GPU VRAM capacity determines timeline stability when grading in DaVinci Resolve or stacking noise reduction and optical flow. Aim for a minimum of <strong>8 GB VRAM</strong> (RTX 4060 / Apple M-series unified memory), or <strong>12–16 GB VRAM</strong> for 4K color pipelines to avoid the dreaded "GPU Memory Full" crash.
              </p>
            </div>

            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold mb-1">Storage: The Dedicated Scratch Disk Rule</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                Never put your OS, footage, and Media Cache on the same physical drive. Dedicate a fast NVMe M.2 SSD (e.g. 1TB PCIe Gen4) strictly as your <strong>Cache / Scratch disk</strong>. This prevents read/write queue saturation during timeline scrubbing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: TIMELINE SPECS */}
        <section id="compositions" className="scroll-mt-20 border border-[#1F1F1F] rounded-md bg-[#0D0D0D] p-6 sm:p-8">
          <div className="flex items-center gap-3 font-mono text-xs text-[#71717A] mb-3">
            <Sliders className="h-4 w-4 text-white" />
            <span>SPEC.02 // TIMELINE STANDARDS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            2. Standardizing Composition & Sequence Settings
          </h2>
          <p className="text-[#A1A1AA] mb-6">
            Starting a project with misconfigured sequence settings guarantees blurry exports, juddering frame cadence, or unexpected letterboxing. Always establish these locked parameters before dragging your first clip:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold mb-2">FRAME RATES (FPS)</div>
              <ul className="space-y-1 text-[#A1A1AA] font-sans text-xs">
                <li>• <strong>23.976 / 24.0 fps:</strong> Cinema, cinematic narratives, music videos.</li>
                <li>• <strong>29.97 / 30.0 fps:</strong> Broadcast TV, commercial social media content.</li>
                <li>• <strong>60.0 fps:</strong> High-motion UI screencasts, gaming, sports capture.</li>
                <li className="pt-2 text-zinc-400 font-mono text-[11px]">Rule: Never mix 24fps and 30fps without proper pull-down or re-interpretation.</li>
              </ul>
            </div>

            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold mb-2">PIXEL ASPECT RATIO</div>
              <ul className="space-y-1 text-[#A1A1AA] font-sans text-xs">
                <li>• <strong>Square Pixels (1.0):</strong> Always select Square Pixels for modern web, YouTube, and mobile.</li>
                <li>• <strong>Avoid D1/DV NTSC (0.91):</strong> Legacy anamorphic settings that cause horizontal distortion.</li>
              </ul>
            </div>

            <div className="border border-[#1F1F1F] bg-black p-4 rounded sm:col-span-2">
              <div className="text-white font-bold mb-2">COLOR DEPTH: 8-BIT vs 16-BIT vs 32-BIT FLOAT</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                Default After Effects compositions launch in <strong>8-bpc (bits per channel)</strong>, which causes visible banding across subtle gradients, lens flares, and dark shadows. Hold <code className="bg-[#1F1F1F] px-1 py-0.5 rounded text-white font-mono text-[11px]">Alt</code> (or <code className="bg-[#1F1F1F] px-1 py-0.5 rounded text-white font-mono text-[11px]">Option</code>) and click the project bit depth toggle to switch to <strong>16-bpc</strong> for banding-free motion graphics.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: NLE STABILITY */}
        <section id="stability" className="scroll-mt-20 border border-[#1F1F1F] rounded-md bg-[#0D0D0D] p-6 sm:p-8">
          <div className="flex items-center gap-3 font-mono text-xs text-[#71717A] mb-3">
            <AlertCircle className="h-4 w-4 text-white" />
            <span>SPEC.03 // STABILITY PROTOCOLS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            3. Software Stability & Crash Prevention
          </h2>
          <p className="text-[#A1A1AA] mb-4">
            Professional post-production facilities adhere to strict operational guidelines to ensure projects never corrupt midway through delivery:
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="border-l-2 border-white pl-4 py-1">
              <div className="text-white font-bold font-sans text-sm">Rule 1: Never Upgrade During an Active Client Project</div>
              <p className="text-[#A1A1AA] font-sans text-xs mt-1">
                When Adobe or Blackmagic releases a major .0 release (e.g. 2026.0), do not upgrade your daily production machine until at least the .2 or .3 maintenance update arrives. New releases frequently alter plugin compatibility.
              </p>
            </div>

            <div className="border-l-2 border-white pl-4 py-1">
              <div className="text-white font-bold font-sans text-sm">Rule 2: The Weekly Media Cache Purge</div>
              <p className="text-[#A1A1AA] font-sans text-xs mt-1">
                Stale disk cache files are the #1 cause of render errors and preview glitches. Once a week, navigate to <em>Preferences → Media Cache</em> and click <strong>Delete Unused Cache</strong>.
              </p>
            </div>

            <div className="border-l-2 border-white pl-4 py-1">
              <div className="text-white font-bold font-sans text-sm">Rule 3: Five-Minute Auto-Save Intervals with 50 Versions</div>
              <p className="text-[#A1A1AA] font-sans text-xs mt-1">
                Configure auto-save to run every <strong>5 minutes</strong> and store at least <strong>50 versions</strong>. Also practice the muscle memory of <code className="bg-[#1F1F1F] px-1 py-0.5 rounded text-white font-mono text-[11px]">Ctrl+S</code> after every significant cut or keyframe adjustment.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: FIRST ESSENTIAL SCRIPTS */}
        <section id="plugins" className="scroll-mt-20 border border-[#1F1F1F] rounded-md bg-[#0D0D0D] p-6 sm:p-8">
          <div className="flex items-center gap-3 font-mono text-xs text-[#71717A] mb-3">
            <Wrench className="h-4 w-4 text-white" />
            <span>SPEC.04 // WORKFLOW ESSENTIALS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            4. The Essential First Plugins & Scripts
          </h2>
          <p className="text-[#A1A1AA] mb-4">
            Do not overload your NLE with 200 plugins. Install only the high-impact workflow utilities that eliminate repetitive friction:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold">1. FX CONSOLE (Video Copilot)</div>
              <div className="text-[#71717A] text-[10px] mb-2">Cost: 100% Free</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                Press Ctrl+Space anywhere in After Effects to instantly search and apply effects, create color swatch palettes, and snapshot frames.
              </p>
            </div>

            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold">2. EASECOPY (Ian Haigh)</div>
              <div className="text-[#71717A] text-[10px] mb-2">Cost: Name Your Own Price ($0+)</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                Copies easing speed curves from one keyframe and applies it to others without overwriting positional or rotation values.
              </p>
            </div>

            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold">3. SHUTTER ENCODER (Paul Pacifico)</div>
              <div className="text-[#71717A] text-[10px] mb-2">Cost: Free / Open Source</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                Batch transcode unstable VFR (variable frame rate) smartphone and OBS recordings into editing-friendly ProRes or DNxHR before importing.
              </p>
            </div>

            <div className="border border-[#1F1F1F] bg-black p-4 rounded">
              <div className="text-white font-bold">4. LOSSLESSCUT (Mikael Finstad)</div>
              <div className="text-[#71717A] text-[10px] mb-2">Cost: Free / Open Source</div>
              <p className="text-[#A1A1AA] font-sans text-xs">
                Trim multi-hour raw takes down to select b-roll shots instantly without re-rendering or losing original sensor camera metadata.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: DIRECTORY STRUCTURE */}
        <section id="file-structure" className="scroll-mt-20 border border-[#1F1F1F] rounded-md bg-[#0D0D0D] p-6 sm:p-8">
          <div className="flex items-center gap-3 font-mono text-xs text-[#71717A] mb-3">
            <FolderTree className="h-4 w-4 text-white" />
            <span>SPEC.05 // FOLDER ARCHITECTURE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            5. Standard Project Directory Structure
          </h2>
          <p className="text-[#A1A1AA] mb-4">
            Maintain this exact numerical folder template on your storage array for every single project. It makes relinking footage instantaneous and ensures backups remain tidy:
          </p>

          <div className="border border-[#1F1F1F] bg-black p-4 rounded font-mono text-xs text-[#A1A1AA] space-y-1">
            <div className="text-white font-bold">PROJECT_NAME_2026/</div>
            <div className="pl-4">├── <strong>01_FOOTAGE/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#71717A]">// CAM_A, CAM_B, DRONE, SCREEN_RECORDS</span></div>
            <div className="pl-4">├── <strong>02_AUDIO/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#71717A]">// DIALOGUE, SFX, MUSIC, FOLEY</span></div>
            <div className="pl-4">├── <strong>03_ASSETS/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#71717A]">// LOGOS, LUTS, 3D_MODELS, OVERLAYS</span></div>
            <div className="pl-4">├── <strong>04_PROJECT_FILES/</strong> &nbsp;&nbsp;&nbsp;<span className="text-[#71717A]">// .PRPROJ, .AEP, .DRP (WITH AUTOSAVE SUBFOLDER)</span></div>
            <div className="pl-4">├── <strong>05_EXPORTS/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#71717A]">// WIPS, CLIENT_REVIEWS, FINAL_MASTERS</span></div>
            <div className="pl-4">└── <strong>06_DOCS/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#71717A]">// SCRIPTS, BRIEFS, STORYBOARDS, RELEASES</span></div>
          </div>
        </section>
      </div>
    </div>
  );
};
