import React from 'react';
import {
  CheckCircle2,
  Folder,
  HardDrive,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Terminal,
  ShieldCheck,
  Eye,
  Sliders,
  Play,
  RotateCw,
  Box,
  FileCode,
  ArrowRight,
  Monitor,
  Flame,
  Film,
  Camera,
  Disc,
} from 'lucide-react';
import { TutorialItem } from '../data/tutorialsData';

interface PluginWalkthroughProps {
  tutorial: TutorialItem;
  currentTime: number;
}

// =========================================================================
// 1. Red Giant (Trapcode, Magic Bullet, VFX Suite, Universe)
// =========================================================================
export const RedGiantWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  // Stages:
  // 0 - 20%: Maxon App / Installer Suite Selection
  // 20 - 45%: Host & Directory Setup (MediaCore)
  // 45 - 75%: Package Extraction & Shader Compilation
  // 75 - 100%: After Effects Particular / Magic Bullet Test

  const currentStage =
    currentTime < tutorial.duration * 0.22
      ? 'select'
      : currentTime < tutorial.duration * 0.45
      ? 'configure'
      : currentTime < tutorial.duration * 0.72
      ? 'installing'
      : 'verified';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      {/* Top OS / App Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                Maxon App — Red Giant Complete 2025
              </span>
            </div>
          )}
          {isMac && (
            <span className="font-mono text-xs font-semibold text-zinc-300 ml-2">
              Maxon App (Apple Silicon ARM64)
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
            {isMac ? 'Apple Metal 3' : 'NVIDIA CUDA 12.6'}
          </span>
          <span className="font-mono text-xs text-red-400 font-bold">{progressPercent}%</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'select' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Select Red Giant Toolsets</h3>
                <p className="text-xs text-zinc-400">Choose plugins for Adobe After Effects 2025</p>
              </div>
              <span className="text-[10px] font-mono text-red-400 border border-red-500/30 bg-red-500/10 px-2 py-0.5 rounded">
                v2025.1
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: 'Trapcode Suite 2025', desc: 'Particular, Form, Mir, 3D Stroke', active: true },
                { name: 'Magic Bullet Suite 2025', desc: 'Looks, Colorista, Mojo, Cosmo', active: true },
                { name: 'VFX Suite 2025', desc: 'Supercomp, Optical Glow, Primatte', active: true },
                { name: 'Universe 2025', desc: 'Glitches, Generators, Retro Transitions', active: true },
              ].map((suite) => (
                <div
                  key={suite.name}
                  className="p-2.5 rounded bg-zinc-900/90 border border-red-500/40 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-zinc-200">{suite.name}</div>
                    <div className="text-[10px] text-zinc-400">{suite.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900/60 p-2.5 rounded border border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Target Host Applications:</span>
              <span className="text-zinc-200 font-mono">After Effects 2025, Premiere 2025</span>
            </div>
          </div>
        )}

        {currentStage === 'configure' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-semibold text-white">MediaCore Destination Path</h3>
            <p className="text-xs text-zinc-400">
              Plugins will be registered into the shared Adobe MediaCore directory:
            </p>
            <div className="p-3 bg-black/60 border border-zinc-800 rounded font-mono text-xs text-emerald-400 break-all flex items-center gap-2">
              <Folder className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>
                {isMac
                  ? '/Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore/RedGiant'
                  : 'C:\\Program Files\\Adobe\\Common\\Plug-ins\\7.0\\MediaCore\\RedGiant'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/60 p-2.5 rounded">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Administrator write privileges verified. Auto-linking presets and LUT tables.</span>
            </div>
          </div>
        )}

        {currentStage === 'installing' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Deploying Red Giant Binaries & Presets...
              </span>
              <span className="text-xs font-mono text-red-400">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="font-mono text-[11px] text-zinc-400 space-y-1">
              <p className="text-zinc-300">Extracting: Particular.aex / Particular.plugin...</p>
              <p>Compiling {isMac ? 'Metal' : 'CUDA'} 3D particle emitter kernel shaders...</p>
              <p className="text-zinc-500">Writing 450+ Magic Bullet Looks LUT profiles...</p>
            </div>
          </div>
        )}

        {currentStage === 'verified' && (
          <div className="w-full max-w-xl bg-[#111116] border border-zinc-700/80 rounded-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">
                  Adobe After Effects 2025 — RG Trapcode Particular Verified
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                ACTIVE GPU 60 FPS
              </span>
            </div>

            {/* Simulated AE Viewport */}
            <div className="relative h-44 bg-black rounded border border-zinc-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15),transparent_70%)]" />
              {/* Particle simulation art */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                <div className="h-16 w-16 rounded-full border-2 border-red-500/50 flex items-center justify-center animate-spin">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-red-500 to-amber-400 blur-sm animate-pulse" />
                </div>
                <div className="text-center">
                  <span className="font-mono text-xs text-white font-medium">
                    Trapcode Particular: 250,000 Particles/sec
                  </span>
                  <p className="text-[10px] text-zinc-400">
                    Physics: Fluid Dynamics • Emitter: 3D Box Point • Color: Fire Glow
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
              <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">
                RG Trapcode: OK
              </div>
              <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">
                RG Magic Bullet: OK
              </div>
              <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-emerald-400 font-semibold">
                Status: Ready
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Step Tracker */}
      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-red-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. Boris FX Sapphire 2026 Walkthrough
// =========================================================================
export const SapphireWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  const currentStage =
    currentTime < tutorial.duration * 0.25
      ? 'wizard'
      : currentTime < tutorial.duration * 0.5
      ? 'host'
      : currentTime < tutorial.duration * 0.75
      ? 'compiling'
      : 'ae-preview';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                Boris FX Sapphire 2026 Installer
              </span>
            </div>
          )}
          <span className="font-mono text-xs text-zinc-300 ml-2">
            Sapphire 2026 for Adobe After Effects ({isMac ? 'Metal' : 'CUDA/DirectX'})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-blue-400 border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 rounded">
            270+ OFX Visual Effects
          </span>
          <span className="font-mono text-xs text-blue-400 font-bold">{progressPercent}%</span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'wizard' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <div className="h-10 w-10 rounded bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Boris FX Sapphire 2026 Setup</h3>
                <p className="text-xs text-zinc-400">End User License Agreement & Product Verification</p>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Sapphire delivers world-class visual effects including S_Glow, S_Blur, S_Shake, S_Zap, and S_LensFlare with hardware GPU acceleration.
            </p>
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400 flex items-center justify-between">
              <span>License Status:</span>
              <span className="text-emerald-400 font-mono font-medium">Licensed / Multi-Host Verified</span>
            </div>
          </div>
        )}

        {currentStage === 'host' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">Target Host Integration</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-zinc-900 border border-blue-500/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">Adobe After Effects 2024 / 2025 / 2026</span>
                </div>
                <span className="font-mono text-zinc-400 text-[10px]">MediaCore 7.0</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Adobe Premiere Pro 2025</span>
                </div>
                <span className="font-mono text-[10px]">Enabled</span>
              </div>
            </div>
            <p className="font-mono text-[10px] text-zinc-500">
              Path: {isMac ? '/Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore' : 'C:\\Program Files\\Adobe\\Common\\Plug-ins\\7.0\\MediaCore'}
            </p>
          </div>
        )}

        {currentStage === 'compiling' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Building GPU Shader Cache & Filters...</span>
              <span className="text-xs font-mono text-blue-400">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="font-mono text-[11px] text-zinc-400 space-y-1">
              <p className="text-zinc-300">Compiling S_Glow & S_Shake GPU kernel binaries...</p>
              <p>Registering Boris FX Lens Flare Designer lens elements...</p>
              <p className="text-zinc-500">Writing plugin registry keys and host bridge...</p>
            </div>
          </div>
        )}

        {currentStage === 'ae-preview' && (
          <div className="w-full max-w-xl bg-[#111116] border border-zinc-700/80 rounded-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">
                  After Effects — S_Glow & S_Shake GPU Acceleration
                </span>
              </div>
              <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded">
                CUDA / METAL ACTIVE
              </span>
            </div>

            {/* AE Viewport simulation */}
            <div className="relative h-44 bg-black rounded border border-zinc-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.25),transparent_65%)]" />
              <div className="relative z-10 text-center space-y-2">
                <div className="font-black text-3xl tracking-widest text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.9)] animate-pulse">
                  SAPPHIRE 2026
                </div>
                <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-zinc-300">
                  <span className="bg-zinc-900/90 px-2 py-0.5 rounded border border-blue-500/30">
                    S_Glow: Brightness 1.85
                  </span>
                  <span className="bg-zinc-900/90 px-2 py-0.5 rounded border border-blue-500/30">
                    Threshold: 0.20
                  </span>
                  <span className="bg-zinc-900/90 px-2 py-0.5 rounded border border-blue-500/30">
                    S_Shake: 12.4 Hz
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Effect Controls: Boris FX Sapphire &gt; S_Glow</span>
              <span className="text-emerald-400">Zero Frame Drops (Real-time Playback)</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Step Tracker */}
      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-blue-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. Boris FX Continuum (BCC) 2026 Walkthrough
// =========================================================================
export const ContinuumWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  const currentStage =
    currentTime < tutorial.duration * 0.25
      ? 'setup'
      : currentTime < tutorial.duration * 0.5
      ? 'components'
      : currentTime < tutorial.duration * 0.75
      ? 'installing'
      : 'mocha-ae';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                Boris FX Continuum 2026 Installer
              </span>
            </div>
          )}
          <span className="font-mono text-xs text-zinc-300 ml-2">
            Continuum Complete + Mocha Planar Tracking Integration
          </span>
        </div>
        <span className="font-mono text-xs text-emerald-400 font-bold">{progressPercent}%</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'setup' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">Continuum 2026 Host Setup</h3>
            <p className="text-xs text-zinc-400">
              Installing 300+ VFX filters, transitions, 3D text extrusions, and Particle Illusion.
            </p>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded space-y-2 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Architecture:</span>
                <span className="font-mono text-emerald-400">{isMac ? 'Apple Silicon ARM64 Universal' : 'Windows 64-bit x86_64'}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Graphic Acceleration:</span>
                <span className="font-mono text-emerald-400">DirectX 12 / Metal 3 / Vulkan</span>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'components' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">Select Features</h3>
            <div className="space-y-1.5 text-xs">
              {[
                'BCC 3D Objects & Title Studio',
                'Mocha Continuum Planar Tracking Engine',
                'Particle Illusion Standalone & Plugin',
                'BCC Transitions, Lights, and Keying',
              ].map((comp) => (
                <div key={comp} className="p-2 bg-zinc-900 rounded border border-emerald-500/30 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-zinc-200">{comp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStage === 'installing' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Writing Continuum & Particle Illusion assets...</span>
              <span className="text-xs font-mono text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="font-mono text-[11px] text-zinc-400 space-y-1">
              <p className="text-zinc-300">Unpacking Particle Illusion emitter emitters database...</p>
              <p>Registering Mocha planar tracker tracking binaries...</p>
            </div>
          </div>
        )}

        {currentStage === 'mocha-ae' && (
          <div className="w-full max-w-xl bg-[#111116] border border-zinc-700/80 rounded-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">
                  After Effects — Mocha AE Planar Tracking Surface Active
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                MOCHA ENGINE READY
              </span>
            </div>

            {/* Mocha planar tracking wireframe preview */}
            <div className="relative h-44 bg-black rounded border border-zinc-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
              {/* Planar surface grid */}
              <div className="relative z-10 w-48 h-28 border-2 border-emerald-400/80 bg-emerald-500/10 rounded flex flex-col justify-between p-2 transform rotate-2 skew-x-3">
                <div className="flex justify-between text-[9px] font-mono text-emerald-300">
                  <span>P1: (192, 104)</span>
                  <span>P2: (410, 118)</span>
                </div>
                <div className="text-center">
                  <span className="font-mono text-xs font-bold text-white bg-black/70 px-2 py-0.5 rounded border border-emerald-500/40">
                    MOCHA PLANAR TRACK: 100%
                  </span>
                  <div className="text-[10px] text-emerald-200 mt-1">
                    Perspective • Shear • Translation Tracked
                  </div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-emerald-300">
                  <span>P4: (185, 235)</span>
                  <span>P3: (420, 248)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Effect: BCC Lens Flare &amp; Mocha Tracking</span>
              <span className="text-emerald-400 font-semibold">Track Exported to AE Corner Pin</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-emerald-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. RE:Vision Effects (Twixtor Pro & RSMB Pro)
// =========================================================================
export const REVisionWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  const currentStage =
    currentTime < tutorial.duration * 0.3
      ? 'installer'
      : currentTime < tutorial.duration * 0.65
      ? 'files'
      : 'twixtor-ae';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                RE:Vision Effects Installer
              </span>
            </div>
          )}
          <span className="font-mono text-xs text-zinc-300 ml-2">
            Twixtor Pro &amp; ReelSmart Motion Blur (RSMB Pro)
          </span>
        </div>
        <span className="font-mono text-xs text-purple-400 font-bold">{progressPercent}%</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'installer' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">RE:Vision Effects Software Selection</h3>
            <p className="text-xs text-zinc-400">
              Optical flow frame synthesis and motion vector calculation:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-zinc-900 border border-purple-500/40 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">Twixtor Pro 7.5 (Super Slow Motion)</span>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                  Optical Flow
                </span>
              </div>
              <div className="p-3 bg-zinc-900 border border-purple-500/40 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">ReelSmart Motion Blur Pro (RSMB)</span>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                  Vector Blur
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'files' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Installing MediaCore Plug-ins...</span>
              <span className="text-xs font-mono text-purple-400">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="font-mono text-[11px] text-zinc-400 space-y-1">
              <p className="text-zinc-300">Writing: Twixtor7AE.aex / Twixtor7AE.plugin</p>
              <p>Writing: RSMB6AE.aex / RSMB6AE.plugin</p>
              <p className="text-zinc-500">Destination: MediaCore 7.0 Plug-ins directory</p>
            </div>
          </div>
        )}

        {currentStage === 'twixtor-ae' && (
          <div className="w-full max-w-xl bg-[#111116] border border-zinc-700/80 rounded-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">
                  After Effects — Twixtor Pro Optical Flow Verification
                </span>
              </div>
              <span className="font-mono text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded">
                SPEED: 15.0%
              </span>
            </div>

            {/* Slow Motion Frame interpolation viewport */}
            <div className="relative h-44 bg-black rounded border border-zinc-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_70%)]" />
              <div className="relative z-10 text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-12 w-24 border border-purple-400/40 bg-purple-500/10 rounded flex items-center justify-center font-mono text-xs text-purple-200">
                    Frame A
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 animate-pulse" />
                  <div className="h-14 w-28 border-2 border-purple-400 bg-purple-500/20 rounded flex flex-col items-center justify-center font-mono text-xs text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <span className="font-bold">Synthetic Sub-Frame</span>
                    <span className="text-[9px] text-purple-300">Optical Flow Vectors</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 animate-pulse" />
                  <div className="h-12 w-24 border border-purple-400/40 bg-purple-500/10 rounded flex items-center justify-center font-mono text-xs text-purple-200">
                    Frame B
                  </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-300">
                  Motion Vectors: High Precision • Motion Sensitivity: 85 • Zero Ghosting
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Effect Controls: RE:Vision Effects &gt; Twixtor Pro</span>
              <span className="text-emerald-400 font-semibold">Butter-Smooth 1000 FPS Playback</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-purple-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. VideoCopilot Element 3D (with 3D Viewport Scene Setup)
// =========================================================================
export const Element3DWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  // Stages:
  // 0 - 25%: Setup & Model Directory
  // 25 - 45%: (Mac Terminal xattr quarantine if Mac, or Win file copy)
  // 45 - 65%: AE Solid + Element 3D Application
  // 65 - 100%: Scene Setup 3D OpenGL Viewport

  const currentStage =
    currentTime < tutorial.duration * 0.28
      ? 'installer'
      : isMac && currentTime < tutorial.duration * 0.48
      ? 'terminal-xattr'
      : currentTime < tutorial.duration * 0.62
      ? 'ae-apply'
      : 'scene-setup';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Box className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                Video Copilot Element 3D Setup
              </span>
            </div>
          )}
          <span className="font-mono text-xs text-zinc-300 ml-2">
            Element 3D v2.2.3 (OpenGL &amp; PBR Shading)
          </span>
        </div>
        <span className="font-mono text-xs text-cyan-400 font-bold">{progressPercent}%</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'installer' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <div className="h-10 w-10 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Element 3D v2 Setup Wizard</h3>
                <p className="text-xs text-zinc-400">Real-Time 3D Object Based Particle Engine</p>
              </div>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded space-y-2 text-xs">
              <div className="text-zinc-300">
                <span className="text-zinc-400">3D Asset &amp; Model Path:</span>
                <p className="font-mono text-cyan-300 mt-0.5">
                  {isMac ? '~/Documents/VideoCopilot/Models/' : 'Documents\\VideoCopilot\\Models\\'}
                </p>
              </div>
              <div className="text-zinc-300">
                <span className="text-zinc-400">Target After Effects Version:</span>
                <p className="font-mono text-emerald-400 mt-0.5">Adobe After Effects 2024 / 2025 / 2026</p>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'terminal-xattr' && (
          <div className="w-full max-w-lg bg-black border border-zinc-700 rounded-lg p-5 shadow-2xl font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                macOS Terminal — Clear Gatekeeper Quarantine
              </span>
              <span className="text-[10px] text-zinc-500">bash</span>
            </div>
            <div className="space-y-1.5">
              <p className="text-zinc-400">user@MacBook-Pro ~ %</p>
              <p className="text-emerald-400 font-bold break-all">
                sudo xattr -cr &quot;/Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore/VideoCopilot&quot;
              </p>
              <p className="text-zinc-400">Password: [••••••••••••]</p>
              <p className="text-zinc-500">com.apple.quarantine attribute cleared successfully.</p>
              <p className="text-emerald-400 font-semibold">[Done] Element.plugin authorized by Gatekeeper.</p>
            </div>
          </div>
        )}

        {currentStage === 'ae-apply' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">Create Solid &amp; Apply Element 3D</h3>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Layer Name:</span>
                <span className="text-white font-mono font-medium">E3D Solid (1920x1080)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Applied Effect:</span>
                <span className="text-cyan-400 font-mono font-medium">Video Copilot &gt; Element</span>
              </div>
            </div>
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/50 rounded flex items-center justify-between">
              <span className="text-xs text-cyan-200">Clicking Scene Setup to open 3D workspace...</span>
              <span className="font-mono text-xs bg-cyan-500 text-black px-2 py-0.5 rounded font-bold">
                SCENE SETUP
              </span>
            </div>
          </div>
        )}

        {currentStage === 'scene-setup' && (
          <div className="w-full max-w-xl bg-[#0c0c10] border border-cyan-500/60 rounded-lg p-3 sm:p-4 shadow-[0_0_25px_rgba(6,182,212,0.25)] space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white tracking-wide">
                  ELEMENT 3D — SCENE SETUP 3D VIEWPORT
                </span>
              </div>
              <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                OPENGL 4.5 • 60 FPS
              </span>
            </div>

            {/* 3D Viewport simulation */}
            <div className="relative h-44 bg-zinc-950 rounded border border-zinc-800 overflow-hidden flex items-center justify-center">
              {/* 3D Grid Perspective */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 transform perspective-[300px] rotateX(60deg) translate-y-10" />
              {/* 3D Model Wireframe/PBR Mesh */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="h-20 w-20 border-2 border-cyan-400/80 bg-gradient-to-tr from-cyan-600/40 via-blue-500/30 to-purple-600/40 rounded-xl transform rotate-45 animate-spin shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center">
                  <div className="h-10 w-10 border border-white/60 rounded-lg transform -rotate-45" />
                </div>
                <div className="mt-3 font-mono text-[11px] text-white bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  Model: SciFi_Interceptor.obj • Shaders: Pro Shaders 2 PBR
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
              <div className="p-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-300">
                Polygons: 124,500
              </div>
              <div className="p-1 bg-zinc-900 border border-zinc-800 rounded text-cyan-300">
                PBR Env: Studio Light
              </div>
              <div className="p-1 bg-emerald-950/60 border border-emerald-500/40 rounded text-emerald-400 font-semibold">
                Status: Ready
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-cyan-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 6. Twitch (.aex / .plugin Manual MediaCore Copy)
// =========================================================================
export const TwitchWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  const currentStage =
    currentTime < tutorial.duration * 0.35
      ? 'copy-plugin'
      : currentTime < tutorial.duration * 0.68
      ? 'copy-presets'
      : 'ae-twitch';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                Manual Plugin &amp; Presets Deployment
              </span>
            </div>
          )}
          <span className="font-mono text-xs text-zinc-300 ml-2">
            Twitch {isMac ? 'Twitch.plugin' : 'Twitch.aex'} &amp; User Presets
          </span>
        </div>
        <span className="font-mono text-xs text-amber-400 font-bold">{progressPercent}%</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'copy-plugin' && (
          <div className="w-full max-w-xl bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">Step 1: Copy Plugin Binary to MediaCore</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded space-y-1.5">
                <span className="text-zinc-400 font-mono text-[10px]">SOURCE (Extracted Archive):</span>
                <div className="flex items-center gap-2 text-white font-medium">
                  <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{isMac ? 'Twitch.plugin' : 'Twitch.aex'}</span>
                </div>
              </div>
              <div className="p-3 bg-zinc-900 border border-amber-500/40 rounded space-y-1.5">
                <span className="text-amber-400 font-mono text-[10px]">DESTINATION (MediaCore):</span>
                <div className="flex items-center gap-2 text-white font-mono text-[11px] truncate">
                  <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">.../Plug-ins/7.0/MediaCore/VideoCopilot/</span>
                </div>
              </div>
            </div>
            <div className="p-2.5 bg-black/60 rounded border border-zinc-800 font-mono text-[11px] text-zinc-400 flex items-center justify-between">
              <span>File Status: Transferring to system plug-in path...</span>
              <span className="text-emerald-400 font-bold">COPIED</span>
            </div>
          </div>
        )}

        {currentStage === 'copy-presets' && (
          <div className="w-full max-w-xl bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">Step 2: Copy Twitch Presets to User Directory</h3>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded space-y-2 text-xs">
              <div className="text-zinc-300">
                <span className="text-zinc-400">Twitch Presets Folder:</span>
                <p className="font-mono text-amber-300">Blur Twitch, Chaos Shake, Light Bloom, Color Glitch (.ffx)</p>
              </div>
              <div className="text-zinc-300">
                <span className="text-zinc-400">Target Preset Directory:</span>
                <p className="font-mono text-zinc-200 break-all">
                  {isMac
                    ? '~/Documents/Adobe/After Effects [Version]/User Presets/Twitch/'
                    : 'Documents\\Adobe\\After Effects [Version]\\User Presets\\Twitch\\'}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'ae-twitch' && (
          <div className="w-full max-w-xl bg-[#111116] border border-amber-500/60 rounded-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-semibold text-white">
                  After Effects — Video Copilot Twitch Effect Active
                </span>
              </div>
              <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                OPERATORS SYNCED
              </span>
            </div>

            {/* Twitch Glitch Viewport preview */}
            <div className="relative h-44 bg-black rounded border border-zinc-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2),transparent_70%)]" />
              <div className="relative z-10 text-center space-y-2">
                <div className="font-black text-2xl tracking-widest text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse">
                  TWITCH GLITCH SYNC
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-[10px] font-mono text-zinc-200">
                  <span className="bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded">
                    Blur: ON
                  </span>
                  <span className="bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded">
                    Light: ON
                  </span>
                  <span className="bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded">
                    Chaos: 100%
                  </span>
                  <span className="bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded">
                    Slide: ON
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Effect: Video Copilot &gt; Twitch</span>
              <span className="text-emerald-400 font-semibold">Presets Loaded in Animation &gt; Presets</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-amber-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 7. Flow & ZXP Extensions (Flow.zxp, Anastasiy, aescripts)
// =========================================================================
export const FlowAndZXPWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  const currentStage =
    currentTime < tutorial.duration * 0.35
      ? 'zxp-drop'
      : currentTime < tutorial.duration * 0.65
      ? 'ae-prefs'
      : 'flow-panel';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                ZXP Installer &amp; CEP Extension Manager
              </span>
            </div>
          )}
          <span className="font-mono text-xs text-zinc-300 ml-2">
            {tutorial.title} ({tutorial.id.includes('flow') ? 'Flow.zxp' : 'ZXP Package Installer'})
          </span>
        </div>
        <span className="font-mono text-xs text-emerald-400 font-bold">{progressPercent}%</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'zxp-drop' && (
          <div className="w-full max-w-lg bg-[#14141c] border-2 border-dashed border-emerald-500/60 rounded-xl p-8 text-center shadow-2xl space-y-3">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <FileCode className="w-7 h-7 animate-bounce" />
            </div>
            <h3 className="text-sm font-semibold text-white">ZXP Extension Drop Zone</h3>
            <p className="text-xs text-zinc-400">
              Drag &amp; drop {tutorial.title} (.zxp) into the window
            </p>
            <div className="p-2.5 bg-black/60 rounded border border-zinc-800 inline-block font-mono text-xs text-emerald-400">
              Flow.zxp — Version 1.4.2 Verified
            </div>
            <div className="text-[10px] text-zinc-500">
              Installing into CEP extensions folder (Common/CEP/extensions)
            </div>
          </div>
        )}

        {currentStage === 'ae-prefs' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-4">
            <div className="border-b border-zinc-800 pb-2">
              <h3 className="text-sm font-semibold text-white">After Effects Preferences</h3>
              <p className="text-xs text-zinc-400">Scripting &amp; Expressions Security Settings</p>
            </div>
            <div className="p-3 bg-zinc-900 border border-emerald-500/50 rounded flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-white font-medium">
                  Allow Scripts to Write Files and Access Network
                </span>
                <p className="text-zinc-400 mt-0.5">
                  Required for Flow, Motion, and aescripts CEP extensions to apply mathematical tangent curves.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <span className="font-mono text-xs bg-emerald-500 text-black px-3 py-1 rounded font-bold">
                OK (Saved)
              </span>
            </div>
          </div>
        )}

        {currentStage === 'flow-panel' && (
          <div className="w-full max-w-xl bg-[#111116] border border-emerald-500/60 rounded-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-white">
                  Window &gt; Extensions &gt; Flow Easing Editor
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                BEZIER ACTIVE
              </span>
            </div>

            {/* Flow Curve Graph representation */}
            <div className="relative h-44 bg-zinc-950 rounded border border-zinc-800 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Curve: Cubic-Bezier (0.65, 0.00, 0.35, 1.00)</span>
                <span className="text-emerald-400">Preset: Snappy Ease Out</span>
              </div>
              {/* Curve line */}
              <div className="relative h-24 w-full flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 80">
                  <path
                    d="M 10 70 C 80 70, 100 10, 190 10"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  <circle cx="10" cy="70" r="4" fill="#10b981" />
                  <circle cx="190" cy="10" r="4" fill="#10b981" />
                </svg>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>In: 65% / Out: 100%</span>
                <span className="text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                  Apply to Selected Keyframes
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Status: CEP Extension running</span>
              <span className="text-emerald-400 font-semibold">1-Click Tangent Interpolation Verified</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-emerald-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 8. Deep Glow 2 / FilmConvert / Optical Flares / Bokeh Generic Handler
// =========================================================================
export const SpecializedPluginWalkthrough: React.FC<PluginWalkthroughProps> = ({
  tutorial,
  currentTime,
}) => {
  const isMac = tutorial.platform === 'mac';
  const progressPercent = Math.min(100, Math.round((currentTime / tutorial.duration) * 100));

  const isDeepGlow = tutorial.id.includes('deep-glow');
  const isFilmConvert = tutorial.id.includes('filmconvert');
  const isOpticalFlares = tutorial.id.includes('optical-flares');
  const isBokeh = tutorial.id.includes('bokeh');

  const currentStage =
    currentTime < tutorial.duration * 0.35
      ? 'extract'
      : currentTime < tutorial.duration * 0.7
      ? 'deploy'
      : 'verify';

  return (
    <div className="absolute inset-0 bg-[#0d0d12] flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          {isMac ? (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                {tutorial.title} Plugin Setup
              </span>
            </div>
          )}
          <span className="font-mono text-xs text-zinc-300 ml-2">
            {tutorial.title} ({isMac ? 'Apple Silicon Metal' : 'Windows 64-bit'})
          </span>
        </div>
        <span className="font-mono text-xs text-amber-400 font-bold">{progressPercent}%</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        {currentStage === 'extract' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-5 shadow-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white">Extract Package &amp; Installer Setup</h3>
            <p className="text-xs text-zinc-400">
              Unpacking {tutorial.title} binaries and camera/filter presets:
            </p>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Package Type:</span>
                <span className="font-mono text-zinc-200">{isMac ? '.pkg / .plugin bundle' : '.exe / .aex 64-bit'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Host Integration:</span>
                <span className="font-mono text-emerald-400">Adobe After Effects 2024 / 2025</span>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'deploy' && (
          <div className="w-full max-w-lg bg-[#14141c] border border-zinc-800 rounded-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Deploying {tutorial.title} to MediaCore...</span>
              <span className="text-xs font-mono text-amber-400">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="font-mono text-[11px] text-zinc-400 space-y-1">
              <p className="text-zinc-300">Writing binaries to Plug-ins directory...</p>
              <p>Compiling shader acceleration kernels...</p>
            </div>
          </div>
        )}

        {currentStage === 'verify' && (
          <div className="w-full max-w-xl bg-[#111116] border border-amber-500/50 rounded-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">
                  After Effects — {tutorial.title} Verified Active
                </span>
              </div>
              <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                GPU ACCELERATED
              </span>
            </div>

            {/* Custom contextual preview */}
            <div className="relative h-44 bg-black rounded border border-zinc-800 overflow-hidden flex items-center justify-center p-4">
              {isDeepGlow && (
                <div className="text-center space-y-2">
                  <div className="text-3xl font-black text-white drop-shadow-[0_0_25px_rgba(251,191,36,0.95)] animate-pulse tracking-wider">
                    DEEP GLOW 2
                  </div>
                  <p className="text-[10px] font-mono text-amber-300">
                    Inverse Square Falloff • Chromatic Aberration • ACES Color Space
                  </p>
                </div>
              )}

              {isFilmConvert && (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-20 w-32 border border-zinc-700 bg-zinc-900 rounded p-1 flex flex-col justify-between text-[9px] font-mono text-zinc-400">
                      <span>Input: ARRI LogC</span>
                      <span className="text-zinc-500">Flat Dynamic Range</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                    <div className="h-20 w-32 border border-amber-500/50 bg-gradient-to-tr from-amber-950 to-orange-950 rounded p-1 flex flex-col justify-between text-[9px] font-mono text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                      <span>Kodak 5207 250D</span>
                      <span className="text-amber-400 font-bold">35mm Organic Grain</span>
                    </div>
                  </div>
                </div>
              )}

              {isOpticalFlares && (
                <div className="text-center space-y-2">
                  <div className="relative flex items-center justify-center">
                    <div className="h-2 w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm animate-pulse" />
                    <div className="absolute h-8 w-8 rounded-full bg-cyan-300/80 blur-md" />
                  </div>
                  <p className="text-[10px] font-mono text-cyan-300">
                    Anamorphic Streak 2.0 • Iris Aperture • GPU Real-time Render
                  </p>
                </div>
              )}

              {isBokeh && (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border border-teal-400/50 bg-teal-500/20 backdrop-blur blur-[1px] animate-pulse"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-mono text-teal-300">
                    Depth-of-Field Defocus • 8-Blade Octagon Iris • Metal Acceleration
                  </p>
                </div>
              )}

              {!isDeepGlow && !isFilmConvert && !isOpticalFlares && !isBokeh && (
                <div className="text-center space-y-2">
                  <span className="text-sm font-semibold text-white">{tutorial.title}</span>
                  <p className="text-xs text-zinc-400">Effect Controls parameters verified &amp; ready to render</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Effect Controls: {tutorial.title}</span>
              <span className="text-emerald-400 font-semibold">Verified in Composition Window</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-amber-400 font-bold">CURRENT STEP:</span>
          <span className="truncate">{tutorial.steps[Math.min(tutorial.steps.length - 1, Math.floor((currentTime / tutorial.duration) * tutorial.steps.length))]}</span>
        </div>
        <div className="font-mono text-zinc-500 shrink-0">
          {Math.floor(currentTime)}s / {tutorial.duration}s
        </div>
      </div>
    </div>
  );
};
