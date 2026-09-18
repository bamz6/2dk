import React from 'react';
import {
  CheckCircle2,
  Disc,
  Folder,
  Sparkles,
  Sliders,
  Volume2,
  Cpu,
  Monitor,
  HardDrive,
  Terminal,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { TutorialItem } from '../data/tutorialsData';

interface SoftwareWalkthroughProps {
  tutorial: TutorialItem;
  currentTime: number;
}

// ---------------- FL STUDIO 2025 (Windows) ----------------
export const FLStudioWalkthrough: React.FC<SoftwareWalkthroughProps> = ({ currentTime }) => {
  // 0:00 - 0:12 -> Desktop & Launching flstudio_win64_2025.exe
  if (currentTime < 12) {
    return (
      <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] to-[#040406]" />

        {/* Desktop Icon */}
        <div className="absolute top-8 left-12 flex flex-col items-center">
          <div className="w-12 h-12 bg-orange-950/60 border border-orange-600/50 rounded flex items-center justify-center shadow-lg">
            <span className="text-xl">🌶️</span>
          </div>
          <span className="mt-1 text-[11px] font-sans text-white text-center max-w-[150px] drop-shadow leading-tight">
            flstudio_win64_2025.exe
          </span>
        </div>

        {/* Setup Prompt */}
        <div className="relative z-20 w-full max-w-sm rounded-lg border border-zinc-700 bg-[#141418] shadow-2xl p-4 text-left">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
            <span className="text-xs font-semibold text-white">Open Executable - Security Warning</span>
            <span className="text-[10px] font-mono text-zinc-400">Image-Line</span>
          </div>
          <div className="space-y-2 text-xs">
            <p className="text-zinc-200 font-medium">Do you want to run this file?</p>
            <div className="p-2.5 rounded bg-black/60 border border-zinc-800 font-mono text-[10.5px] space-y-1">
              <div className="text-zinc-300 truncate">
                <span className="text-zinc-500">File:</span> flstudio_win64_2025.exe
              </div>
              <div className="text-zinc-300">
                <span className="text-zinc-500">Publisher:</span> Image-Line Software NV
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="px-3 py-1 rounded bg-white text-black font-semibold text-xs shadow">
                Run
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:12 - 0:24 -> Setup Wizard & Components Checklist
  if (currentTime >= 12 && currentTime < 24) {
    return (
      <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-4 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-800 mb-2 flex items-center justify-between">
            <div>
              <h5 className="font-sans text-xs font-bold text-white">FL Studio 2025 Setup</h5>
              <p className="text-[10px] text-zinc-400">Select components to install</p>
            </div>
            <span className="font-mono text-[10px] text-orange-400 border border-orange-500/30 bg-orange-950/40 px-1.5 py-0.5 rounded">
              v25.1.0
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px] bg-black/70 p-3 rounded border border-zinc-800 mb-3">
            <div className="flex items-center gap-2 text-white">
              <span className="w-3.5 h-3.5 rounded bg-orange-500 text-black flex items-center justify-center text-[9px] font-bold">✓</span>
              <span className="font-semibold">FL Studio 64-bit Core</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-3.5 h-3.5 rounded bg-orange-500 text-black flex items-center justify-center text-[9px] font-bold">✓</span>
              <span>FL Studio ASIO Low-Latency Driver</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-3.5 h-3.5 rounded bg-orange-500 text-black flex items-center justify-center text-[9px] font-bold">✓</span>
              <span>Plugin Database &amp; Shared Data</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-3.5 h-3.5 rounded bg-orange-500 text-black flex items-center justify-center text-[9px] font-bold">✓</span>
              <span>FLEX Synth Factory Soundbanks</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <div className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 text-xs">Back</div>
            <div className="px-3 py-1 rounded bg-white text-black font-semibold text-xs">Next</div>
          </div>
        </div>
      </div>
    );
  }

  // 0:24 - 0:36 -> Destination Folders & VST3 Path
  if (currentTime >= 24 && currentTime < 36) {
    return (
      <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-4 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-800 mb-3">
            <h5 className="font-sans text-xs font-bold text-white">Choose Install Locations</h5>
            <p className="text-[10px] text-zinc-400">Destination folders for 64-bit application &amp; VST3 plugins</p>
          </div>

          <div className="space-y-2.5 mb-3 font-mono text-[10.5px]">
            <div>
              <span className="text-zinc-400 block mb-1">Application Folder:</span>
              <div className="p-2 rounded bg-black/80 border border-zinc-700 text-zinc-200 truncate">
                C:\Program Files\Image-Line\FL Studio 2025\
              </div>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">VST3 Plugins Directory:</span>
              <div className="p-2 rounded bg-black/80 border border-zinc-700 text-zinc-200 truncate">
                C:\Program Files\Common Files\VST3\
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <div className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 text-xs">Back</div>
            <div className="px-3 py-1 rounded bg-white text-black font-semibold text-xs">Next</div>
          </div>
        </div>
      </div>
    );
  }

  // 0:36 - 0:52 -> Extracting & Installing
  if (currentTime >= 36 && currentTime < 52) {
    const elapsed = currentTime - 36;
    const progress = Math.min(100, Math.round((elapsed / 15) * 100));

    let stage = 'Extracting FLEX soundbanks and drum kits...';
    if (currentTime >= 42 && currentTime < 47) {
      stage = 'Registering FL Studio ASIO v1.04 driver...';
    } else if (currentTime >= 47) {
      stage = 'Generating VST3 and CLAP plugin cache...';
    }

    return (
      <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-5 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-800 mb-4">
            <h5 className="font-sans text-xs font-bold text-white">Installing FL Studio 2025</h5>
            <p className="text-[10px] text-zinc-400">Please wait while setup copies files to your hard drive.</p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between font-mono text-[10.5px] text-zinc-400">
              <span className="truncate max-w-[280px]">{stage}</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-800 font-mono text-[10px] text-zinc-500">
            Image-Line Installer Engine 2025
          </div>
        </div>
      </div>
    );
  }

  // 0:52 - 1:08 -> FL Studio 2025 Workspace / Channel Rack / ASIO Output
  return (
    <div className="relative w-full h-full bg-[#121417] flex flex-col justify-between select-none font-sans">
      {/* Top Transport Bar */}
      <div className="bg-[#1a1c22] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-300">
        <div className="flex items-center gap-3 font-mono">
          <span className="text-orange-400 font-bold">FL25</span>
          <span className="text-white font-semibold bg-black/50 px-2 py-0.5 rounded border border-zinc-700">
            140.000 BPM
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            PAT
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span>FL Studio ASIO (12ms)</span>
          <span className="text-zinc-600">|</span>
          <span className="text-emerald-400">Master Peak: -3.2 dB</span>
        </div>
      </div>

      {/* Channel Rack & Sequencer */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white font-mono">Channel Rack</span>
            <span className="text-[10px] font-mono text-zinc-500">16 Steps (Pattern 1)</span>
          </div>

          <div className="space-y-1.5 font-mono text-[10.5px]">
            {['808 Sub Kick', '808 Clap', 'HiHat Tight', 'Snare Dry'].map((inst, i) => (
              <div key={inst} className="flex items-center gap-2 bg-black/50 p-1.5 rounded border border-zinc-800">
                <span className="w-24 text-zinc-300 truncate">{inst}</span>
                <div className="flex gap-1 flex-1">
                  {Array.from({ length: 16 }).map((_, step) => {
                    const active = (i === 0 && step % 4 === 0) || (i === 1 && (step === 4 || step === 12)) || (i === 2 && step % 2 === 0);
                    return (
                      <span
                        key={step}
                        className={`h-4 flex-1 rounded-xs ${
                          active
                            ? 'bg-orange-500 shadow-xs'
                            : step % 4 === 0
                            ? 'bg-zinc-700/60'
                            : 'bg-zinc-800/40'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Engine Calibration Dialog */}
        <div className="bg-black/80 border border-zinc-800 rounded p-2.5 flex items-center justify-between text-[10.5px] font-mono">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-zinc-300">ASIO Driver: FL Studio ASIO 2025</span>
          </div>
          <span className="text-emerald-400 font-semibold">44,100 Hz • 512 smp • Zero Dropouts</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#15171c] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3 h-3 text-orange-400" />
          FL Studio 2025 installed &amp; operational (1:08)
        </span>
        <span className="text-white font-semibold">100% OPERATIONAL</span>
      </div>
    </div>
  );
};

// ---------------- VEGAS PRO 23 (Windows) ----------------
export const VegasProWalkthrough: React.FC<SoftwareWalkthroughProps> = ({ currentTime }) => {
  // 0:00 - 0:10 -> Setup Language & EULA
  if (currentTime < 10) {
    return (
      <div className="relative w-full h-full bg-[#07090d] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-lg border border-blue-900/40 bg-[#0f141c] shadow-2xl p-4 text-left">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
            <span className="text-xs font-semibold text-white">VEGAS Pro 23 Setup</span>
            <span className="text-[10px] font-mono text-blue-400">MAGIX Software</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-400 text-[10.5px] block mb-1">Select Setup Language:</label>
              <div className="p-1.5 rounded bg-black/60 border border-zinc-700 text-zinc-200 font-mono text-[10.5px]">
                English (United States)
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="w-3.5 h-3.5 rounded bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
              <span className="text-[10.5px] text-zinc-300">I accept the MAGIX End User License Agreement</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <button type="button" className="px-3 py-1 rounded bg-white text-black font-semibold text-xs shadow">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:10 - 0:22 -> Installation Path & OFX Components
  if (currentTime >= 10 && currentTime < 22) {
    return (
      <div className="relative w-full h-full bg-[#07090d] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-blue-900/40 bg-[#0f141c] shadow-2xl p-4 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-800 mb-3">
            <h5 className="font-sans text-xs font-bold text-white">Component Selection &amp; Destination</h5>
            <p className="text-[10px] text-zinc-400">Choose installation folder and OpenFX extensions</p>
          </div>

          <div className="space-y-2 mb-3 font-mono text-[10.5px]">
            <div className="p-2 rounded bg-black/80 border border-zinc-800">
              <span className="text-zinc-400 block mb-0.5">Destination:</span>
              <span className="text-zinc-200 truncate block">C:\Program Files\VEGAS\VEGAS Pro 23.0\</span>
            </div>

            <div className="p-2.5 rounded bg-black/60 border border-zinc-800 space-y-1 text-zinc-300">
              <div className="flex items-center gap-2 text-white">
                <span className="text-blue-400">✓</span>
                <span>MAGIX OFX Video Filters Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Boris FX Continuum 3D Objects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Vegas Audio Stream Engine</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <div className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 text-xs">Back</div>
            <div className="px-3 py-1 rounded bg-white text-black font-semibold text-xs">Install</div>
          </div>
        </div>
      </div>
    );
  }

  // 0:22 - 0:42 -> Installing & Registering DirectX/Vulkan Decoders
  if (currentTime >= 22 && currentTime < 42) {
    const elapsed = currentTime - 22;
    const progress = Math.min(100, Math.round((elapsed / 18) * 100));

    let stage = 'Copying VEGAS Pro 23 core binaries...';
    if (currentTime >= 28 && currentTime < 35) {
      stage = 'Configuring DirectX 12 / Vulkan preview pipeline...';
    } else if (currentTime >= 35) {
      stage = 'Registering NVIDIA NVDEC hardware decoder...';
    }

    return (
      <div className="relative w-full h-full bg-[#07090d] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-blue-900/40 bg-[#0f141c] shadow-2xl p-5 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-800 mb-4">
            <h5 className="font-sans text-xs font-bold text-white">Installing VEGAS Pro 23</h5>
            <p className="text-[10px] text-zinc-400">Decompressing and registering video processing filters.</p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between font-mono text-[10.5px] text-zinc-400">
              <span className="truncate max-w-[280px]">{stage}</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-800 font-mono text-[10px] text-zinc-500">
            Setup Progress
          </div>
        </div>
      </div>
    );
  }

  // 0:42 - 0:54 -> Splash Screen with GPU Decoder Check
  if (currentTime >= 42 && currentTime < 54) {
    return (
      <div className="relative w-full h-full bg-[#050608] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-lg border border-blue-700/50 bg-[#0d121c] p-5 shadow-2xl text-left relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-serif text-lg font-bold text-white tracking-tight">
                VEGAS Pro <span className="font-mono text-blue-400 text-sm">23</span>
              </h4>
              <p className="text-[10px] text-zinc-400 mt-0.5">MAGIX Software GmbH</p>
            </div>
            <div className="w-8 h-8 rounded bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-200 font-bold text-xs">
              V23
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-blue-900/40 font-mono text-[10.5px] text-zinc-300 space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Hardware Acceleration: NVDEC / D3D12</span>
            </div>
            <p className="text-[9.5px] text-zinc-500">Loading OFX Plug-Ins (Boris FX Continuum)...</p>
          </div>
        </div>
      </div>
    );
  }

  // 0:54 - 1:04 -> Vegas Pro 23 Timeline Workspace
  return (
    <div className="relative w-full h-full bg-[#10131a] flex flex-col justify-between select-none font-sans">
      {/* Menu Bar */}
      <div className="bg-[#181d28] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-300">
        <div className="flex items-center gap-3">
          <span className="font-bold text-blue-400">VEGAS 23</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Insert</span>
          <span>Tools</span>
          <span>Options</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400">Preview: 3840x2160@59.940p</span>
      </div>

      {/* Workspace Preview & Timeline */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-2 h-24">
          <div className="rounded bg-black/80 border border-zinc-800 p-2 flex flex-col justify-between font-mono text-[10px]">
            <span className="text-zinc-400">Project Media</span>
            <div className="flex gap-2">
              <span className="p-1 rounded bg-zinc-800 text-zinc-200">Clip_01.mp4</span>
              <span className="p-1 rounded bg-zinc-800 text-zinc-200">Audio_Master.wav</span>
            </div>
          </div>
          <div className="rounded bg-black border border-blue-900/40 p-2 flex flex-col items-center justify-center text-center font-mono text-[10px]">
            <span className="text-blue-300 font-semibold">Video Preview (NVDEC Realtime)</span>
            <span className="text-zinc-500 text-[9px]">Frame: 00:01:24:16 / 60.00 FPS</span>
          </div>
        </div>

        {/* Timeline Tracks */}
        <div className="space-y-1 font-mono text-[10px] mt-2">
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded border border-zinc-800">
            <span className="w-16 text-blue-400 font-semibold">Track 1 [V]</span>
            <div className="flex-1 h-4 rounded bg-blue-950/60 border border-blue-800/40 flex items-center px-2 text-zinc-300 text-[9px]">
              Main_Action_4K.mov (ProRes 422 HQ)
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded border border-zinc-800">
            <span className="w-16 text-emerald-400 font-semibold">Track 2 [A]</span>
            <div className="flex-1 h-4 rounded bg-emerald-950/60 border border-emerald-800/40 flex items-center px-2 text-zinc-300 text-[9px]">
              Stereo_Mixdown_24bit_48kHz.wav
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#141720] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3 h-3 text-blue-400" />
          Vegas Pro 23 setup verified (1:04)
        </span>
        <span className="text-white font-semibold">100% OPERATIONAL</span>
      </div>
    </div>
  );
};

// ---------------- MAC ADOBE 2024 / 2025 ----------------
export const MacAdobeWalkthrough: React.FC<SoftwareWalkthroughProps> = ({ currentTime }) => {
  // 0:00 - 0:14 -> macOS Finder & Mounted DMG volume with Install.app
  if (currentTime < 14) {
    return (
      <div className="relative w-full h-full bg-[#1c1c24] flex items-center justify-center p-4">
        {/* macOS Finder Window */}
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#252530] shadow-2xl overflow-hidden text-left">
          {/* Mac Window Titlebar */}
          <div className="bg-[#2d2d3a] px-3 py-2 flex items-center justify-between border-b border-zinc-700">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[11px] font-medium text-zinc-300">Adobe CC 2025 macOS</span>
            <div className="w-10" />
          </div>

          <div className="p-6 flex items-center justify-center gap-8 relative">
            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-red-600/30 border border-red-500/60 flex items-center justify-center shadow-lg">
                <span className="font-serif font-bold text-red-400 text-lg">CC</span>
              </div>
              <span className="text-[11px] text-white mt-1.5 font-medium">Install.app</span>
            </div>

            {/* Context Menu Right-Click Open */}
            <div className="p-2 rounded-lg bg-[#1a1a22] border border-zinc-600 shadow-2xl font-mono text-[10.5px] space-y-1 text-left">
              <div className="px-2 py-0.5 rounded bg-blue-600 text-white font-medium flex items-center justify-between gap-3">
                <span>Open (Bypass Gatekeeper)</span>
                <span>↵</span>
              </div>
              <div className="px-2 py-0.5 text-zinc-400">Show Package Contents</div>
              <div className="px-2 py-0.5 text-zinc-400">Get Info</div>
            </div>
          </div>

          <div className="bg-[#1e1e28] px-3 py-1.5 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 text-center">
            Tip: Right-click &gt; Open bypasses macOS Sequoia/Sonoma Gatekeeper block
          </div>
        </div>
      </div>
    );
  }

  // 0:14 - 0:26 -> macOS Security Warning & Touch ID Authorization
  if (currentTime >= 14 && currentTime < 26) {
    return (
      <div className="relative w-full h-full bg-[#1c1c24] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-600 bg-[#282834] p-5 shadow-2xl text-center">
          <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 text-red-400" />
          </div>

          <h5 className="font-sans text-xs font-bold text-white mb-1.5">
            &ldquo;Install.app&rdquo; is an app downloaded from the internet
          </h5>
          <p className="text-[10.5px] text-zinc-300 leading-relaxed mb-4">
            Are you sure you want to open it? Opening this application will allow it to configure Adobe Creative Cloud 2025.
          </p>

          <div className="flex gap-2">
            <div className="flex-1 py-1.5 rounded-lg border border-zinc-600 text-xs text-zinc-300">
              Cancel
            </div>
            <div className="flex-1 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-lg">
              Open
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:26 - 0:48 -> Adobe Creative Cloud Installer on macOS
  if (currentTime >= 26 && currentTime < 48) {
    const elapsed = currentTime - 26;
    const progress = Math.min(100, Math.round((elapsed / 20) * 100));

    return (
      <div className="relative w-full h-full bg-[#1c1c24] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#1f1f28] shadow-2xl p-5 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-800 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-red-600 text-white font-serif font-bold text-xs flex items-center justify-center">CC</span>
              <span className="font-sans text-xs font-bold text-white">Adobe Creative Cloud 2025</span>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">macOS ARM64</span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between font-mono text-[10.5px] text-zinc-300">
              <span>Writing Apple Silicon optimized binaries...</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800 font-mono text-[10px] text-zinc-500">
            Target: /Applications/Adobe Creative Cloud/
          </div>
        </div>
      </div>
    );
  }

  // 0:48 - 1:10 -> macOS Activity Monitor & Verified Native Execution
  return (
    <div className="relative w-full h-full bg-[#1e1e26] flex flex-col justify-between select-none font-sans">
      {/* Activity Monitor Header */}
      <div className="bg-[#292934] px-3 py-2 border-b border-zinc-700 flex items-center justify-between text-[11px] text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="font-medium text-white ml-2">Activity Monitor — CPU</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400">Architecture: Apple (Native ARM64)</span>
      </div>

      {/* Process Table */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="rounded border border-zinc-700 bg-black/60 overflow-hidden font-mono text-[10.5px]">
          <div className="grid grid-cols-4 bg-[#2f2f3e] p-2 text-zinc-300 font-semibold border-b border-zinc-700">
            <span>Process Name</span>
            <span>% CPU</span>
            <span>Kind</span>
            <span>User</span>
          </div>
          <div className="grid grid-cols-4 p-2 text-white bg-blue-900/30 border-b border-zinc-800">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Adobe After Effects 2025
            </span>
            <span>1.8%</span>
            <span className="text-emerald-400 font-bold">Apple</span>
            <span>macOS User</span>
          </div>
          <div className="grid grid-cols-4 p-2 text-zinc-400">
            <span>Creative Cloud UI helper</span>
            <span>0.2%</span>
            <span>Apple</span>
            <span>macOS User</span>
          </div>
        </div>

        <div className="p-2.5 rounded bg-black/70 border border-zinc-800 text-[10.5px] font-mono text-zinc-300 flex items-center justify-between">
          <span>Rosetta 2 Translation: None Required</span>
          <span className="text-emerald-400">Apple Neural Engine &amp; Metal Engine Active</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#181820] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3 h-3 text-white" />
          Adobe 2024 / 2025 macOS verified (1:10)
        </span>
        <span className="text-white font-semibold">100% OPERATIONAL</span>
      </div>
    </div>
  );
};

// ---------------- MAC AFTER EFFECTS (2023 / 2022 / 2021) ----------------
export const MacAfterEffectsWalkthrough: React.FC<SoftwareWalkthroughProps> = ({ tutorial, currentTime }) => {
  const version = tutorial.title.includes('2023') ? '2023' : tutorial.title.includes('2022') ? '2022' : '2021';

  // 0:00 - 0:14 -> DMG Mount & Drag to /Applications
  if (currentTime < 14) {
    return (
      <div className="relative w-full h-full bg-[#181820] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#22222d] shadow-2xl overflow-hidden text-left">
          <div className="bg-[#2a2a38] px-3 py-2 flex items-center gap-1.5 border-b border-zinc-700">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-[11px] font-medium text-zinc-300 ml-2">After Effects {version} macOS</span>
          </div>

          <div className="p-6 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-purple-900/60 border border-purple-400 flex items-center justify-center text-white font-bold font-serif text-lg">
                Ae
              </div>
              <span className="text-[10.5px] text-zinc-300 mt-1.5">After Effects {version}.app</span>
            </div>

            <span className="text-zinc-500 font-mono text-xl">➔</span>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-blue-900/40 border border-blue-400/60 flex items-center justify-center text-blue-300">
                <Folder className="w-7 h-7" />
              </div>
              <span className="text-[10.5px] text-zinc-300 mt-1.5">Applications</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:14 - 0:32 -> Terminal Gatekeeper Quarantine Clearance (sudo xattr -cr)
  if (currentTime >= 14 && currentTime < 32) {
    const isExecuted = currentTime >= 24;
    return (
      <div className="relative w-full h-full bg-[#14141c] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-black/90 shadow-2xl overflow-hidden font-mono text-left">
          <div className="bg-[#1f1f28] px-3 py-2 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[10px] text-zinc-400">Terminal — zsh — 80x24</span>
            <div className="w-8" />
          </div>

          <div className="p-4 space-y-2 text-[11px] leading-relaxed">
            <div className="text-zinc-400">Last login: Today on ttys001</div>
            <div className="text-white">
              <span className="text-emerald-400">user@MacBook-Pro</span> <span className="text-blue-400">~</span> %{' '}
              <span className="text-amber-300">
                sudo xattr -cr &quot;/Applications/Adobe After Effects {version}&quot;
              </span>
            </div>
            {isExecuted && (
              <>
                <div className="text-zinc-500">Password: [••••••••]</div>
                <div className="text-emerald-400">Quarantine attributes cleared successfully (exit 0).</div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 0:32 - 0:44 -> Rosetta 2 / Architecture Verification
  if (currentTime >= 32 && currentTime < 44) {
    return (
      <div className="relative w-full h-full bg-[#181820] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border border-zinc-700 bg-[#22222c] p-4 text-left shadow-2xl">
          <h5 className="text-xs font-bold text-white pb-2 border-b border-zinc-700 mb-3">
            Adobe After Effects {version} Info
          </h5>
          <div className="space-y-2 font-mono text-[10.5px]">
            <div className="flex justify-between text-zinc-300">
              <span className="text-zinc-500">Kind:</span>
              <span>{version === '2021' ? 'Intel (Rosetta 2)' : 'Universal (ARM64/Intel)'}</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span className="text-zinc-500">Gatekeeper:</span>
              <span className="text-emerald-400">Bypassed (Clean)</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span className="text-zinc-500">GPU Acceleration:</span>
              <span className="text-blue-400">Apple Metal Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:44 - End -> After Effects Workspace
  return (
    <div className="relative w-full h-full bg-[#131318] flex flex-col justify-between select-none font-sans">
      <div className="bg-[#1f1f26] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[10.5px] text-zinc-300">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">Ae {version}</span>
          <span>Composition</span>
          <span>Layer</span>
          <span>Effect</span>
          <span>Window</span>
        </div>
        <span className="font-mono text-[9px] text-emerald-400">Mercury Metal Engine</span>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-400/50 flex items-center justify-center text-white font-serif font-bold text-xl mb-2">
          Ae
        </div>
        <h4 className="text-base font-bold text-white mb-1">After Effects {version}</h4>
        <p className="text-xs text-zinc-400">Bypassed and fully operational on macOS.</p>
      </div>

      <div className="bg-[#16161d] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3 h-3 text-white" />
          macOS installation verified ({tutorial.formattedDuration})
        </span>
        <span className="text-white font-semibold">100% OPERATIONAL</span>
      </div>
    </div>
  );
};

// ---------------- MAC DAVINCI RESOLVE 20 ----------------
export const MacDaVinciWalkthrough: React.FC<SoftwareWalkthroughProps> = ({ currentTime }) => {
  // 0:00 - 0:12 -> Mounted DMG & Install Resolve 20.pkg
  if (currentTime < 12) {
    return (
      <div className="relative w-full h-full bg-[#16181f] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#20232d] shadow-2xl overflow-hidden text-left">
          <div className="bg-[#282c38] px-3 py-2 flex items-center gap-1.5 border-b border-zinc-700">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-[11px] font-medium text-zinc-300 ml-2">DaVinci Resolve Studio 20 macOS</span>
          </div>

          <div className="p-6 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-600 flex items-center justify-center shadow-lg">
                <Disc className="w-8 h-8 text-zinc-300" />
              </div>
              <span className="text-[11px] text-white mt-1.5 font-medium">Install Resolve 20.pkg</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:12 - 0:34 -> Standard macOS PKG Installer
  if (currentTime >= 12 && currentTime < 34) {
    return (
      <div className="relative w-full h-full bg-[#16181f] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#20232d] shadow-2xl p-4 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-700 mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-white">Install DaVinci Resolve Studio</span>
            <span className="font-mono text-[10px] text-zinc-400">Introduction</span>
          </div>

          <div className="space-y-2 text-xs text-zinc-300 mb-4 leading-relaxed">
            <p className="font-medium text-white">Welcome to the DaVinci Resolve Studio Installer</p>
            <p className="text-[11px] text-zinc-400">
              You will be guided through the steps necessary to install DaVinci Resolve Studio on Macintosh HD.
            </p>
            <div className="p-2 rounded bg-black/60 border border-zinc-800 font-mono text-[10px] text-zinc-400">
              Target: /Applications/DaVinci Resolve/
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-700">
            <div className="px-3 py-1 rounded bg-blue-600 text-white font-semibold text-xs shadow">
              Continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:34 - 0:54 -> Writing Files & Components
  if (currentTime >= 34 && currentTime < 54) {
    const elapsed = currentTime - 34;
    const progress = Math.min(100, Math.round((elapsed / 18) * 100));

    return (
      <div className="relative w-full h-full bg-[#16181f] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#20232d] shadow-2xl p-5 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-700 mb-4">
            <h5 className="font-sans text-xs font-bold text-white">Installing DaVinci Resolve Studio</h5>
            <p className="text-[10px] text-zinc-400">Writing Blackmagic RAW &amp; Fairlight audio components...</p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between font-mono text-[10.5px] text-zinc-300">
              <span>Writing files to /Library/Application Support/...</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-700 font-mono text-[10px] text-zinc-500">
            macOS Package Installer
          </div>
        </div>
      </div>
    );
  }

  // 0:54 - 1:12 -> DaVinci Resolve Studio Workspace on macOS
  return (
    <div className="relative w-full h-full bg-[#101217] flex flex-col justify-between select-none font-sans">
      <div className="bg-[#1a1d25] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">DaVinci Resolve Studio 20</span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-400">macOS Apple Silicon</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400">Metal GPU Active</span>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h5 className="font-serif text-base font-bold text-white mb-2">Project Manager</h5>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded border border-white bg-zinc-800 text-left">
              <div className="text-xs font-bold text-white">Feature Film 4K Grade</div>
              <div className="text-[10px] text-zinc-400 mt-1">Apple Silicon Unified Memory (Zero-Copy)</div>
            </div>
            <div className="p-3 rounded border border-zinc-700 bg-black/60 text-left">
              <div className="text-xs font-medium text-zinc-300">Commercial Cut</div>
              <div className="text-[10px] text-zinc-500 mt-1">Fairlight 5.1 Surround</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 py-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400">
          <span>Media</span>
          <span>Cut</span>
          <span className="text-white font-bold underline">Edit</span>
          <span>Fusion</span>
          <span>Color</span>
          <span>Fairlight</span>
          <span>Deliver</span>
        </div>
      </div>

      <div className="bg-[#14161c] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3 h-3 text-white" />
          macOS installation verified (1:12)
        </span>
        <span className="text-white font-semibold">100% OPERATIONAL</span>
      </div>
    </div>
  );
};

// ---------------- MAC TOPAZ VIDEO AI ----------------
export const MacTopazWalkthrough: React.FC<SoftwareWalkthroughProps> = ({ currentTime }) => {
  // 0:00 - 0:14 -> DMG drag to /Applications
  if (currentTime < 14) {
    return (
      <div className="relative w-full h-full bg-[#181820] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#22222d] shadow-2xl overflow-hidden text-left">
          <div className="bg-[#2a2a38] px-3 py-2 flex items-center gap-1.5 border-b border-zinc-700">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-[11px] font-medium text-zinc-300 ml-2">Topaz Video AI macOS</span>
          </div>

          <div className="p-6 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-600 flex items-center justify-center text-white font-bold text-base">
                TV
              </div>
              <span className="text-[10.5px] text-zinc-300 mt-1.5">Topaz Video AI.app</span>
            </div>

            <span className="text-zinc-500 font-mono text-xl">➔</span>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-blue-900/40 border border-blue-400/60 flex items-center justify-center text-blue-300">
                <Folder className="w-7 h-7" />
              </div>
              <span className="text-[10.5px] text-zinc-300 mt-1.5">Applications</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 0:14 - 0:34 -> Preferences > AI Processor: Apple Neural Engine (ANE)
  if (currentTime >= 14 && currentTime < 34) {
    return (
      <div className="relative w-full h-full bg-[#15151c] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#1e1e28] shadow-2xl p-4 text-left flex flex-col justify-between">
          <div className="pb-2 border-b border-zinc-700 mb-3">
            <h5 className="font-sans text-xs font-bold text-white">Topaz Video AI — Preferences</h5>
            <p className="text-[10px] text-zinc-400">Processing hardware and AI acceleration setup</p>
          </div>

          <div className="space-y-3 font-mono text-[10.5px] mb-3">
            <div>
              <span className="text-zinc-400 block mb-1">AI Processor:</span>
              <div className="p-2 rounded bg-black/80 border border-zinc-700 text-emerald-400 flex items-center justify-between">
                <span>Apple Neural Engine (ANE) + Metal GPU</span>
                <span>✓</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-400 block mb-1">Model Cache Directory:</span>
              <div className="p-2 rounded bg-black/80 border border-zinc-700 text-zinc-300 truncate">
                ~/Library/Application Support/Topaz Labs LLC/Topaz Video AI/models/
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-700">
            <div className="px-3 py-1 rounded bg-white text-black font-semibold text-xs">Save</div>
          </div>
        </div>
      </div>
    );
  }

  // 0:34 - 1:05 -> Real-Time Processing Preview & Benchmark
  return (
    <div className="relative w-full h-full bg-[#101015] flex flex-col justify-between select-none font-sans">
      <div className="bg-[#181822] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-300">
        <span className="font-bold text-white">Topaz Video AI (macOS)</span>
        <span className="font-mono text-[10px] text-emerald-400">Apple M-Series ANE Active</span>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-2 h-28">
          <div className="rounded bg-black border border-zinc-800 p-2 flex flex-col justify-between font-mono text-[10px]">
            <span className="text-zinc-500">Source (1080p 24fps)</span>
            <span className="text-zinc-400 text-center">Original Frame</span>
          </div>
          <div className="rounded bg-black border border-white/60 p-2 flex flex-col justify-between font-mono text-[10px]">
            <span className="text-white font-semibold">AI Output (4K 60fps Proteus v4)</span>
            <span className="text-emerald-400 text-center font-bold">Tensor Enhanced</span>
          </div>
        </div>

        <div className="p-2.5 rounded bg-black/80 border border-zinc-800 flex items-center justify-between font-mono text-[10.5px]">
          <span className="text-zinc-300">Processing Speed: 38.4 fps</span>
          <span className="text-emerald-400 font-semibold">Memory: 4.2 GB Unified RAM</span>
        </div>
      </div>

      <div className="bg-[#13131a] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3 h-3 text-white" />
          Topaz Video AI macOS verified (1:05)
        </span>
        <span className="text-white font-semibold">100% OPERATIONAL</span>
      </div>
    </div>
  );
};
