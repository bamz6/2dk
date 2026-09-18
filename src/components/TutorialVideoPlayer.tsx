import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  Video as VideoIcon,
  Folder,
  Disc,
  FileCode,
  HardDrive,
  MousePointer,
  Sparkles,
} from 'lucide-react';
import { TutorialItem } from '../data/tutorialsData';
import {
  FLStudioWalkthrough,
  VegasProWalkthrough,
  MacAdobeWalkthrough,
  MacAfterEffectsWalkthrough,
  MacDaVinciWalkthrough,
  MacTopazWalkthrough,
} from './SoftwareWalkthroughs';
import {
  RedGiantWalkthrough,
  SapphireWalkthrough,
  ContinuumWalkthrough,
  REVisionWalkthrough,
  Element3DWalkthrough,
  TwitchWalkthrough,
  FlowAndZXPWalkthrough,
  SpecializedPluginWalkthrough,
} from './PluginWalkthroughs';

interface TutorialVideoPlayerProps {
  tutorial: TutorialItem;
}

export const TutorialVideoPlayer: React.FC<TutorialVideoPlayerProps> = ({ tutorial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5 | 2>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [customVideoName, setCustomVideoName] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const totalDuration = tutorial.duration;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Handle local video file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (customVideoUrl) {
        URL.revokeObjectURL(customVideoUrl);
      }
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setCustomVideoName(file.name);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  // Sync HTML5 video element if loaded
  useEffect(() => {
    if (!videoRef.current || !customVideoUrl) return;

    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, customVideoUrl]);

  useEffect(() => {
    if (!videoRef.current || !customVideoUrl) return;
    videoRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed, customVideoUrl]);

  useEffect(() => {
    if (!videoRef.current || !customVideoUrl) return;
    videoRef.current.muted = isMuted;
  }, [isMuted, customVideoUrl]);

  // Synthetic Playback timer animation when running simulation
  useEffect(() => {
    if (customVideoUrl) return; // Managed by native HTML5 video

    if (!isPlaying) {
      lastTickRef.current = null;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const loop = (now: number) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = now;
      }
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      setCurrentTime((prev) => {
        const next = prev + delta * playbackSpeed;
        if (next >= totalDuration) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, playbackSpeed, totalDuration, customVideoUrl]);

  // Handle Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current && customVideoUrl) {
      videoRef.current.currentTime = val;
    }
  };

  // Copy command or step
  const handleCopy = (text: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Determine current active step based on currentTime progress
  const progressRatio = totalDuration > 0 ? currentTime / totalDuration : 0;
  const currentStepIndex = Math.min(
    tutorial.steps.length - 1,
    Math.floor(progressRatio * tutorial.steps.length)
  );

  // Render Adobe After Effects 2025 recording simulation
  const renderAdobeWalkthrough = () => {
    // 0:00 - 0:08 -> Desktop & 7-Zip Extract with Password "rd"
    if (currentTime < 8) {
      const extractProgress = Math.min(100, Math.max(0, Math.round(((currentTime - 3) / 5) * 100)));
      return (
        <div className="relative w-full h-full bg-[#0a0a0d] flex items-center justify-center p-4">
          {/* Windows Desktop Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] to-[#040406]" />

          {/* Desktop Archive Icon */}
          <div className="absolute top-8 left-12 flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-950/40 border border-amber-500/50 rounded flex items-center justify-center shadow-lg">
              <Folder className="w-7 h-7 text-amber-400" />
            </div>
            <span className="mt-1 text-[11px] font-sans text-white text-center max-w-[130px] drop-shadow leading-tight">
              Adobe After Effects 2025.6 WIN - satem.7z
            </span>
          </div>

          {/* Context menu preview at 2-4 seconds */}
          {currentTime >= 1.5 && currentTime < 4.5 && (
            <div className="absolute top-20 left-44 z-20 w-48 rounded bg-[#18181c] border border-zinc-700 shadow-2xl py-1 text-[11.5px] text-zinc-300">
              <div className="px-3 py-1 hover:bg-zinc-700/60 cursor-pointer">Open</div>
              <div className="px-3 py-1 bg-zinc-800 text-white font-medium flex justify-between items-center">
                <span>7-Zip</span>
                <span>▶</span>
              </div>
              <div className="px-3 py-1 hover:bg-zinc-700/60 cursor-pointer">Extract All...</div>
              {/* Submenu */}
              <div className="absolute left-full top-6 w-44 rounded bg-[#18181c] border border-zinc-700 shadow-2xl py-1 text-[11px]">
                <div className="px-3 py-1 hover:bg-zinc-700/60">Open archive</div>
                <div className="px-3 py-1 bg-white text-black font-semibold">Extract files...</div>
                <div className="px-3 py-1 hover:bg-zinc-700/60">Extract Here</div>
              </div>
            </div>
          )}

          {/* 7-Zip Password Prompt & Extract Dialog */}
          {currentTime >= 4 && (
            <div className="relative z-30 w-full max-w-sm rounded-lg border border-zinc-700 bg-[#16161a] p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
                <span className="font-sans text-xs font-semibold text-white">7-Zip — Extracting</span>
                <span className="text-[10px] text-zinc-400">Password required</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-zinc-300 block mb-1">Enter password:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="rd"
                      className="w-full rounded border border-zinc-600 bg-black px-2.5 py-1 text-xs text-white font-mono"
                    />
                    <span className="text-[10px] text-zinc-400 whitespace-nowrap">✓ Show</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10.5px] text-zinc-400 mb-1">
                    <span>Extracting archive...</span>
                    <span>{extractProgress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-200"
                      style={{ width: `${extractProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <div className="px-3 py-1 rounded bg-white text-black text-xs font-semibold">
                    OK
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // 0:08 - 0:18 -> Windows Explorer showing ISO & Mounted Virtual DVD
    if (currentTime >= 8 && currentTime < 18) {
      const isMounted = currentTime >= 13;
      return (
        <div className="relative w-full h-full bg-[#0d0d10] p-4 flex flex-col justify-between">
          {/* File Explorer Header */}
          <div className="rounded-t-lg bg-[#18181d] border border-zinc-800 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
              <Folder className="w-4 h-4 text-zinc-400" />
              <span>{isMounted ? 'DVD Drive (D:) AEFT 2025' : 'After Effects 2025'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
          </div>

          {/* Explorer File List */}
          <div className="flex-1 bg-[#121215] border-x border-b border-zinc-800 p-3 space-y-1.5 font-mono text-[11px]">
            {!isMounted ? (
              <>
                <div className="flex items-center justify-between p-2 rounded bg-zinc-800/80 text-white border border-zinc-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Disc className="w-4 h-4 text-white" />
                    <span className="font-semibold">Adobe.After.Effects.2025.u10.Multilingual.iso</span>
                  </div>
                  <span className="text-zinc-400">4,717,798 KB (Disc Image)</span>
                </div>
                <div className="flex items-center justify-between p-2 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4" />
                    <span>m0nkrus.nfo</span>
                  </div>
                  <span>2 KB</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-2 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-zinc-400" />
                    <span>Adobe 2025</span>
                  </div>
                  <span className="text-zinc-500">File folder</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-zinc-800 text-white border border-white cursor-pointer relative">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-white" />
                    <span className="font-bold underline">Autoplay.exe</span>
                  </div>
                  <span className="text-zinc-300">186 KB (Application)</span>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-sans bg-white text-black px-2 py-0.5 rounded font-bold">
                    <MousePointer className="w-3 h-3" /> Double Click
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4" />
                    <span>autorun.inf</span>
                  </div>
                  <span>1 KB</span>
                </div>
              </>
            )}
          </div>

          <div className="mt-2 text-center text-[10.5px] font-mono text-zinc-400">
            {isMounted
              ? '▶ Running Autoplay.exe from mounted DVD Disc image...'
              : '▶ Double-clicking .iso to mount virtual drive...'}
          </div>
        </div>
      );
    }

    // 0:18 - 0:26 -> Adobe After Effects 2025 Installer Window
    if (currentTime >= 18 && currentTime < 26) {
      const isOptionsScreen = currentTime >= 22;
      return (
        <div className="relative w-full h-full bg-[#09090b] flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-lg border border-zinc-700 bg-[#141418] shadow-2xl overflow-hidden">
            {/* Installer Titlebar */}
            <div className="bg-[#1c1c22] px-4 py-2 flex items-center justify-between border-b border-zinc-800">
              <span className="text-xs font-semibold text-white">Adobe After Effects 2025 Installer</span>
              <span className="text-[10px] font-mono text-zinc-400">v25.6</span>
            </div>

            {/* Installer Body */}
            <div className="p-5 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-white font-serif font-bold text-2xl">
                Ae
              </div>

              {!isOptionsScreen ? (
                <>
                  <div>
                    <h5 className="font-serif text-base font-bold text-white">Adobe After Effects 2025</h5>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Version 25.6</p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      className="w-full py-2.5 rounded bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-lg"
                    >
                      Install
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-left space-y-2 text-[11px]">
                    <div className="text-zinc-300 font-semibold">Installation Options</div>
                    <div className="p-2 rounded bg-black/60 border border-zinc-800 space-y-1 font-mono text-[10px] text-zinc-300">
                      <div>Language: English (North America)</div>
                      <div>Location: C:\Program Files\Adobe</div>
                    </div>
                    <p className="text-[9.5px] text-zinc-400 italic">
                      Previous build detected. Installing to default program path.
                    </p>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      className="w-full py-2 rounded bg-white text-black font-semibold text-xs"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 0:26 - 0:35 -> Installation Progress (0% -> 100%) and "Install Complete"
    if (currentTime >= 26 && currentTime < 35) {
      // Scale percentage from 0% to 100% across the 9 seconds
      const elapsedInPhase = currentTime - 26;
      let installPercent = Math.min(100, Math.round((elapsedInPhase / 7) * 100));
      if (elapsedInPhase >= 7) installPercent = 100;

      const isComplete = installPercent >= 100;

      return (
        <div className="relative w-full h-full bg-[#0a0a0d] flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-lg border border-zinc-700 bg-[#141418] shadow-2xl p-5 text-center relative overflow-hidden">
            <div className="mx-auto w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-white font-serif font-bold text-xl mb-3">
              Ae
            </div>

            <h5 className="font-serif text-sm font-bold text-white mb-1">
              {isComplete ? 'Install Complete' : `Installing (${installPercent}%)`}
            </h5>
            <p className="text-[11px] text-zinc-400 mb-4">
              {isComplete
                ? 'Adobe After Effects 2025 has been successfully installed.'
                : 'Creativity for all.'}
            </p>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden mb-4">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${installPercent}%` }}
              />
            </div>

            {isComplete && (
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 py-1.5 rounded border border-zinc-700 text-xs text-zinc-300"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="flex-1 py-1.5 rounded bg-white text-black font-semibold text-xs shadow-lg"
                >
                  Launch
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 0:35 - 0:49 -> Launching & Splash Screen (Angela Ho / XBoy artwork)
    if (currentTime >= 35 && currentTime < 49) {
      const isSplash = currentTime >= 39;
      let substatus = 'Initializing Required Components...';
      if (currentTime >= 43 && currentTime < 46) {
        substatus = 'Scanning Folder: Autokroma Influx';
      } else if (currentTime >= 46) {
        substatus = 'Scanning Folder: RG Trapcode';
      }

      return (
        <div className="relative w-full h-full bg-[#050507] flex items-center justify-center p-4">
          {!isSplash ? (
            <div className="text-center space-y-3">
              <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-sans text-xs text-zinc-300 tracking-wide">
                Opening Adobe After Effects 2025...
              </p>
            </div>
          ) : (
            <div className="w-full max-w-sm rounded-lg border border-purple-500/30 bg-[#120b1c] p-5 shadow-2xl text-left relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-xl font-extrabold text-white tracking-tight">
                    <span className="text-red-500 mr-1.5">Adobe</span>
                    After Effects
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-1">Artwork by Angela Ho / XBoy</p>
                  <p className="text-[9px] text-zinc-500 mt-0.5">© 1992-2025 Adobe. All rights reserved.</p>
                </div>
                <div className="w-10 h-10 rounded bg-purple-700/40 border border-purple-400 flex items-center justify-center text-white font-serif font-bold text-sm">
                  Ae
                </div>
              </div>

              {/* Artwork graphic representation */}
              <div className="mt-4 h-24 rounded bg-gradient-to-r from-purple-950 via-fuchsia-950 to-indigo-950 border border-purple-800/40 flex items-center justify-center relative overflow-hidden">
                <Sparkles className="w-8 h-8 text-fuchsia-300 animate-pulse" />
                <span className="absolute bottom-1 right-2 text-[9px] font-mono text-purple-300/60">
                  Release v25.6
                </span>
              </div>

              <div className="mt-4 pt-2 border-t border-purple-900/40 font-mono text-[10px] text-purple-200 truncate">
                {substatus}
              </div>
            </div>
          )}
        </div>
      );
    }

    // 0:49 - 0:57 -> After Effects 2025 Welcome Workspace
    return (
      <div className="relative w-full h-full bg-[#121215] flex flex-col justify-between select-none">
        {/* Top App Bar */}
        <div className="bg-[#1e1e24] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[10.5px] font-sans text-zinc-300">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Ae</span>
            <span>File</span>
            <span>Edit</span>
            <span>Composition</span>
            <span>Layer</span>
            <span>Effect</span>
            <span>Animation</span>
            <span>View</span>
            <span>Window</span>
            <span>Help</span>
          </div>
          <span className="font-mono text-[9px] text-zinc-400">Untitled Project.aep</span>
        </div>

        {/* Welcome Screen Main Panel */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
            Welcome to After Effects
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mb-5">
            Adobe After Effects 2025 (v25.6) verified operational. Clean bypass confirmed.
          </p>

          <div className="flex gap-3">
            <div className="px-4 py-2 rounded bg-white text-black font-semibold text-xs">
              New project
            </div>
            <div className="px-4 py-2 rounded border border-zinc-700 text-zinc-300 text-xs">
              Open project
            </div>
          </div>
        </div>

        {/* Status Bottom Footer */}
        <div className="bg-[#18181d] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <CheckCircle2 className="w-3 h-3 text-white" />
            Walkthrough completed successfully (0:57)
          </span>
          <span>100% WORKING</span>
        </div>
      </div>
    );
  };

  // Render Topaz Video Setup Wizard walkthrough simulation
  const renderTopazWalkthrough = () => {
    // 0:00 - 0:08 -> Desktop & Windows Open File Security Warning (TopazVideo-1.1.0.msi)
    if (currentTime < 8) {
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] to-[#040406]" />

          {/* Desktop Package Icon */}
          <div className="absolute top-8 left-12 flex flex-col items-center">
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center shadow-lg">
              <Disc className="w-7 h-7 text-zinc-300" />
            </div>
            <span className="mt-1 text-[11px] font-sans text-white text-center max-w-[130px] drop-shadow leading-tight">
              TopazVideo-1.1.0.msi
            </span>
          </div>

          {/* Windows Open File - Security Warning Modal */}
          <div className="relative z-20 w-full max-w-sm rounded-lg border border-zinc-700 bg-[#141418] shadow-2xl p-4 text-left">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
              <span className="text-xs font-semibold text-white">Open File - Security Warning</span>
              <span className="text-[10px] font-mono text-zinc-400">Windows Installer</span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-zinc-200 font-medium">Do you want to run this file?</p>
              <div className="p-2.5 rounded bg-black/60 border border-zinc-800 font-mono text-[10.5px] space-y-1">
                <div className="text-zinc-300 truncate">
                  <span className="text-zinc-500">Name:</span> TopazVideo-1.1.0.msi
                </div>
                <div className="text-zinc-300">
                  <span className="text-zinc-500">Publisher:</span> Topaz Labs LLC
                </div>
                <div className="text-zinc-300">
                  <span className="text-zinc-500">Type:</span> Windows Installer Package
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-zinc-500">Always ask before opening</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-white text-black font-semibold text-xs shadow"
                  >
                    Run
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 0:08 - 0:16 -> Welcome to Topaz Video Setup Wizard
    if (currentTime >= 8 && currentTime < 16) {
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-[#1f1f26] px-4 py-2 flex items-center justify-between border-b border-zinc-800">
              <span className="text-xs font-semibold text-white">Topaz Video Setup</span>
              <span className="text-[10px] font-mono text-zinc-400">Setup Wizard</span>
            </div>

            <div className="flex flex-1 min-h-[200px]">
              <div className="w-28 bg-gradient-to-b from-zinc-900 to-black border-r border-zinc-800 p-3 flex flex-col justify-between items-center text-center">
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mt-2">
                  TV
                </div>
                <span className="font-serif text-[11px] font-bold text-white tracking-wide">
                  Topaz Video
                </span>
                <span className="text-[9px] text-zinc-500">Topaz Labs LLC</span>
              </div>

              <div className="flex-1 p-5 flex flex-col justify-between text-left">
                <div>
                  <h4 className="font-serif text-sm font-bold text-white mb-2 leading-snug">
                    Welcome to the Topaz Video Setup Wizard
                  </h4>
                  <p className="text-[11.5px] text-zinc-300 leading-relaxed">
                    The Setup Wizard will install Topaz Video on your computer. Click Next to continue or Cancel to exit the Setup Wizard.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                  <div className="px-3 py-1 rounded border border-zinc-700 text-zinc-500 text-xs">
                    Back
                  </div>
                  <div className="px-3 py-1 rounded bg-white text-black font-semibold text-xs">
                    Next
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 0:16 - 0:24 -> End User License Agreement
    if (currentTime >= 16 && currentTime < 24) {
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-4 text-left flex flex-col justify-between">
            <div className="pb-2 border-b border-zinc-800 mb-2">
              <h5 className="font-sans text-xs font-bold text-white">End User License Agreement</h5>
              <p className="text-[10px] text-zinc-400">Please read the following license agreement carefully.</p>
            </div>

            <div className="h-24 rounded bg-black/80 border border-zinc-800 p-2.5 overflow-y-auto font-mono text-[9.5px] text-zinc-400 leading-relaxed mb-3">
              <p className="font-bold text-zinc-200 mb-1">TOPAZ LABS END USER LICENSE AGREEMENT</p>
              This End User License Agreement (&quot;EULA&quot;) governs your use of Topaz Video software, AI neural models, and associated plugin integrations.
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
              <span className="text-[11px] text-zinc-200">I accept the terms in the License Agreement</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <div className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 text-xs">Back</div>
              <div className="px-3 py-1 rounded bg-white text-black font-semibold text-xs">Next</div>
            </div>
          </div>
        </div>
      );
    }

    // 0:24 - 0:34 -> Destination Folder & Model Directory
    if (currentTime >= 24 && currentTime < 34) {
      const isModelDir = currentTime >= 29;
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-4 text-left flex flex-col justify-between">
            <div className="pb-2 border-b border-zinc-800 mb-3">
              <h5 className="font-sans text-xs font-bold text-white">
                {isModelDir ? 'Model Directory' : 'Destination Folder'}
              </h5>
              <p className="text-[10px] text-zinc-400">
                {isModelDir
                  ? 'Please choose where downloaded AI models will be stored'
                  : 'Click Next to install to default folder or click Change to choose another.'}
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[10.5px] text-zinc-300 block mb-1 font-medium">
                  {isModelDir ? 'Choose Data Directory:' : 'Install Topaz Video to:'}
                </label>
                <div className="p-2 rounded bg-black/80 border border-zinc-700 font-mono text-[10.5px] text-zinc-200 truncate">
                  {isModelDir
                    ? 'C:\\ProgramData\\Topaz Labs LLC\\Topaz Video\\models\\'
                    : 'C:\\Program Files\\Topaz Labs LLC\\Topaz Video\\'}
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 italic">
                {isModelDir
                  ? 'High-speed NVMe storage recommended for AI model checkpoint weights.'
                  : 'Default 64-bit program installation directory.'}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <div className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 text-xs">Back</div>
              <div className="px-3 py-1 rounded bg-white text-black font-semibold text-xs">Next</div>
            </div>
          </div>
        </div>
      );
    }

    // 0:34 - 0:44 -> Custom Setup (Feature Tree)
    if (currentTime >= 34 && currentTime < 44) {
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-4 text-left flex flex-col justify-between">
            <div className="pb-2 border-b border-zinc-800 mb-2">
              <h5 className="font-sans text-xs font-bold text-white">Custom Setup</h5>
              <p className="text-[10px] text-zinc-400">Select the features you want to install.</p>
            </div>

            <div className="p-2.5 rounded bg-black/80 border border-zinc-800 space-y-1.5 font-mono text-[11px] mb-3">
              <div className="flex items-center gap-2 text-white">
                <span className="text-zinc-400">📁</span>
                <span className="font-semibold">Topaz Video (Core Engine)</span>
              </div>
              <div className="ml-5 flex items-center gap-2 text-zinc-300">
                <span className="text-zinc-500">├─ 🧩</span>
                <span>Adobe After Effects Plugin</span>
              </div>
              <div className="ml-5 flex items-center gap-2 text-zinc-300">
                <span className="text-zinc-500">└─ 🧩</span>
                <span>OpenFX Plugins</span>
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

    // 0:44 - 0:55 -> Installing Topaz Video
    if (currentTime >= 44 && currentTime < 55) {
      const elapsed = currentTime - 44;
      const progress = Math.min(100, Math.round((elapsed / 10) * 100));

      let stageText = 'Updating component registration...';
      if (currentTime >= 48 && currentTime < 52) {
        stageText = 'Copying new files...';
      } else if (currentTime >= 52) {
        stageText = 'Removing backup files...';
      }

      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-5 text-left flex flex-col justify-between">
            <div className="pb-2 border-b border-zinc-800 mb-4">
              <h5 className="font-sans text-xs font-bold text-white">Installing Topaz Video</h5>
              <p className="text-[10px] text-zinc-400">Please wait while the Setup Wizard installs Topaz Video.</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between font-mono text-[10.5px] text-zinc-400">
                <span>Status: {stageText}</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <div className="px-3 py-1 rounded border border-zinc-800 text-zinc-600 text-xs">Back</div>
              <div className="px-3 py-1 rounded border border-zinc-800 text-zinc-600 text-xs">Next</div>
            </div>
          </div>
        </div>
      );
    }

    // 0:55 - 1:01 -> Completed the Topaz Video Setup Wizard
    return (
      <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-5 text-left flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-1">
              Completed the Topaz Video Setup Wizard
            </h4>
            <p className="text-[11px] text-zinc-300 mb-4">
              Click the Finish button to exit the Setup Wizard.
            </p>

            <div className="p-3 rounded bg-black/70 border border-zinc-800 space-y-1.5 font-mono text-[11px] text-zinc-300 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Installed to C:\Program Files\Topaz Labs LLC\Topaz Video</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>AI models directory: C:\ProgramData\Topaz Labs LLC\Topaz Video\models</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
              <span className="text-[11px] text-zinc-200">Launch Topaz Video</span>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-800">
            <div className="px-4 py-1.5 rounded bg-white text-black font-semibold text-xs shadow-lg">
              Finish
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render DaVinci Resolve 20 Studio Setup walkthrough simulation
  const renderDaVinciWalkthrough = () => {
    // 0:00 - 0:10 -> Archive & Extraction
    if (currentTime < 10) {
      const extProgress = Math.min(100, Math.max(0, Math.round((currentTime / 9) * 100)));
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] to-[#040406]" />

          {/* Desktop Archive Icon */}
          <div className="absolute top-8 left-12 flex flex-col items-center">
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center shadow-lg">
              <Folder className="w-7 h-7 text-zinc-300" />
            </div>
            <span className="mt-1 text-[11px] font-sans text-white text-center max-w-[150px] drop-shadow leading-tight">
              DaVinci_Resolve_Studio_20_Windows.zip
            </span>
          </div>

          {/* Extracting Modal */}
          <div className="relative z-20 w-full max-w-sm rounded-lg border border-zinc-700 bg-[#141418] shadow-2xl p-4 text-left">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
              <span className="text-xs font-semibold text-white">Extracting Compressed Archive</span>
              <span className="text-[10px] font-mono text-zinc-400">4.32 GB</span>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] text-zinc-300 font-mono truncate">
                Extracting: DaVinci_Resolve_Studio_20_Windows.exe
              </p>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                  <span>Progress</span>
                  <span>{extProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-200"
                    style={{ width: `${extProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 0:10 - 0:22 -> Blackmagic Design Installer Components Checklist
    if (currentTime >= 10 && currentTime < 22) {
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-4 text-left flex flex-col justify-between">
            <div className="pb-2 border-b border-zinc-800 mb-3 flex items-center justify-between">
              <div>
                <h5 className="font-sans text-xs font-bold text-white">Blackmagic Design Setup</h5>
                <p className="text-[10px] text-zinc-400">Select components to install with DaVinci Resolve Studio 20</p>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 rounded">v20.0</span>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] bg-black/70 p-3 rounded border border-zinc-800 mb-4">
              <div className="flex items-center gap-2 text-white">
                <span className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                <span className="font-semibold">DaVinci Resolve 20.0</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                <span>Blackmagic RAW Common Components</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                <span>DaVinci Control Panels Support</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                <span>Fairlight Audio Accelerator Utility</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="w-3.5 h-3.5 rounded border border-zinc-700 flex items-center justify-center text-[9px]"></span>
                <span>PostgreSQL 15 Project Server (Optional)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <div className="px-3 py-1 rounded border border-zinc-700 text-zinc-400 text-xs">Cancel</div>
              <div className="px-4 py-1 rounded bg-white text-black font-semibold text-xs shadow-lg">
                Install
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 0:22 - 0:34 -> Blackmagic Setup Wizard & Destination
    if (currentTime >= 22 && currentTime < 34) {
      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-4 text-left flex flex-col justify-between">
            <div className="pb-2 border-b border-zinc-800 mb-3">
              <h5 className="font-sans text-xs font-bold text-white">DaVinci Resolve Setup Wizard</h5>
              <p className="text-[10px] text-zinc-400">Destination folder and license agreement confirmation.</p>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[10.5px] text-zinc-300 block mb-1">Destination Directory:</label>
                <div className="p-2 rounded bg-black/80 border border-zinc-700 font-mono text-[10.5px] text-zinc-200 truncate">
                  C:\Program Files\Blackmagic Design\DaVinci Resolve\
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="w-3.5 h-3.5 rounded bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                <span className="text-[11px] text-zinc-200">I accept the terms in the License Agreement</span>
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

    // 0:34 - 0:52 -> Installing Components & Neural Engine
    if (currentTime >= 34 && currentTime < 52) {
      const elapsed = currentTime - 34;
      const progress = Math.min(100, Math.round((elapsed / 17) * 100));

      let stage = 'Installing Microsoft Visual C++ 2015-2022 Redistributable...';
      if (currentTime >= 40 && currentTime < 46) {
        stage = 'Extracting Fairlight Audio Engine & Sound Libraries...';
      } else if (currentTime >= 46) {
        stage = 'Registering DaVinci Neural Engine AI Models & LUTs...';
      }

      const isDone = progress >= 100;

      return (
        <div className="relative w-full h-full bg-[#08080a] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#16161b] shadow-2xl p-5 text-left flex flex-col justify-between">
            <div className="pb-2 border-b border-zinc-800 mb-4">
              <h5 className="font-sans text-xs font-bold text-white">
                {isDone ? 'Setup Completed' : 'Installing DaVinci Resolve Studio'}
              </h5>
              <p className="text-[10px] text-zinc-400">
                {isDone
                  ? 'DaVinci Resolve Studio 20 has been installed.'
                  : 'Please wait while setup copies files and configures components.'}
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between font-mono text-[10.5px] text-zinc-400">
                <span className="truncate max-w-[280px]">{stage}</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-zinc-800">
              {isDone ? (
                <div className="px-4 py-1.5 rounded bg-white text-black font-semibold text-xs shadow-lg">
                  Finish
                </div>
              ) : (
                <div className="px-3 py-1 rounded border border-zinc-800 text-zinc-600 text-xs">
                  Installing...
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 0:52 - 1:04 -> Splash Screen & GPU Acceleration Check
    if (currentTime >= 52 && currentTime < 64) {
      let checkText = 'Initializing Waveform Monitor...';
      if (currentTime >= 56 && currentTime < 60) {
        checkText = 'Checking GPU Acceleration...';
      } else if (currentTime >= 60) {
        checkText = 'CUDA 12.4 Enabled — RTX 4090 (24GB VRAM)';
      }

      return (
        <div className="relative w-full h-full bg-[#050507] flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-lg border border-zinc-700 bg-[#101014] p-5 shadow-2xl text-left relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold text-white tracking-tight">
                  DaVinci Resolve Studio <span className="font-mono text-sm text-zinc-400">20</span>
                </h4>
                <p className="text-[10px] text-zinc-400 mt-0.5">Blackmagic Design</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-700 via-zinc-400 to-white flex items-center justify-center text-black font-bold text-xs">
                DR
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-800 font-mono text-[10.5px] text-zinc-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse shrink-0" />
              <span className="truncate">{checkText}</span>
            </div>
          </div>
        </div>
      );
    }

    // 1:04 - 1:15 -> DaVinci Resolve Project Manager & Studio Workspace
    return (
      <div className="relative w-full h-full bg-[#101014] flex flex-col justify-between select-none font-sans">
        {/* Top Header */}
        <div className="bg-[#1a1a20] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">DaVinci Resolve Studio</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">Project Manager</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-400">20.0 Release</span>
        </div>

        {/* Project Manager Grid */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h5 className="font-serif text-base font-bold text-white mb-3">Projects</h5>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded border border-white bg-zinc-800 p-2.5 text-left cursor-pointer">
                <div className="h-12 rounded bg-black/60 mb-2 flex items-center justify-center font-mono text-zinc-500 text-[10px]">
                  4K REC.709
                </div>
                <div className="text-[11px] font-semibold text-white truncate">Commercial Cut 4K</div>
                <div className="text-[9.5px] text-zinc-400">Edited today</div>
              </div>
              <div className="rounded border border-zinc-700 bg-zinc-900/80 p-2.5 text-left">
                <div className="h-12 rounded bg-black/60 mb-2 flex items-center justify-center font-mono text-zinc-500 text-[10px]">
                  FUSION COMP
                </div>
                <div className="text-[11px] font-medium text-zinc-300 truncate">Music Video Grade</div>
                <div className="text-[9.5px] text-zinc-500">3 days ago</div>
              </div>
              <div className="rounded border border-dashed border-zinc-700 bg-black/40 p-2.5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-500">
                <span className="text-lg text-white font-light">+</span>
                <span className="text-[10px] text-zinc-400 mt-1">New Project</span>
              </div>
            </div>
          </div>

          {/* Bottom Studio Pages Bar */}
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

        {/* Footer */}
        <div className="bg-[#141418] px-3 py-1 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <CheckCircle2 className="w-3 h-3 text-white" />
            DaVinci Resolve Studio 20 installed &amp; verified (1:15)
          </span>
          <span className="text-white font-semibold">100% OPERATIONAL</span>
        </div>
      </div>
    );
  };

  return (
    <div
      id={tutorial.id}
      ref={containerRef}
      className="scroll-mt-24 mb-10 overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c0e] shadow-2xl transition-all"
    >
      {/* Player Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/90 bg-[#121215] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isPlaying ? 'animate-ping bg-white' : 'bg-zinc-600'
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isPlaying ? 'bg-white' : 'bg-zinc-600'
              }`}
            />
          </span>
          <h4 className="font-sans text-sm font-semibold text-white tracking-tight">
            {tutorial.title}
          </h4>
          <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-wider text-zinc-300 border border-zinc-700 bg-black px-1.5 py-0.5 rounded">
            Recorded Video Walkthrough
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Custom Video Upload / Load Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-900 px-2 py-1 rounded transition-colors"
            title="Load or replace with local video recording file"
          >
            <Upload className="w-3 h-3" />
            <span className="hidden sm:inline">
              {customVideoName ? 'Replace Video' : 'Load Video'}
            </span>
          </button>

          <span className="font-mono text-[10px] uppercase tracking-wider text-white border border-zinc-700 bg-zinc-800 px-2 py-0.5 rounded">
            {tutorial.platform}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded">
            {tutorial.type}
          </span>
          <span className="font-mono text-[10.5px] text-zinc-400 hidden sm:inline-block ml-1">
            1080p HD
          </span>
        </div>
      </div>

      {/* Video Screen Recording Canvas / Viewport */}
      <div className="relative aspect-video w-full bg-[#050507] select-none flex flex-col justify-between overflow-hidden">
        {/* If user loaded a custom video file, play native HTML5 video */}
        {customVideoUrl ? (
          <video
            ref={videoRef}
            src={customVideoUrl}
            className="w-full h-full object-contain bg-black"
            onTimeUpdate={() => {
              if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
            }}
            onEnded={() => setIsPlaying(false)}
            onClick={() => setIsPlaying(!isPlaying)}
            playsInline
          />
        ) : tutorial.id === 'win-adobe-cc' ? (
          /* Render the exact Adobe After Effects 2025 video walkthrough */
          renderAdobeWalkthrough()
        ) : tutorial.id === 'win-topaz-labs' ? (
          /* Render the exact Topaz Video Setup Wizard walkthrough */
          renderTopazWalkthrough()
        ) : tutorial.id === 'win-davinci-resolve-20' ? (
          /* Render the exact DaVinci Resolve 20 Studio Setup walkthrough */
          renderDaVinciWalkthrough()
        ) : tutorial.id === 'win-fl-studio-2025' ? (
          /* Render FL Studio 2025 Windows walkthrough */
          <FLStudioWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-vegas-pro-23' ? (
          /* Render Vegas Pro 23 Windows walkthrough */
          <VegasProWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'mac-adobe-2024-2025' ? (
          /* Render Mac Adobe 2024/2025 Gatekeeper bypass & install walkthrough */
          <MacAdobeWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'mac-ae-2023' || tutorial.id === 'mac-ae-2022' || tutorial.id === 'mac-ae-2021' ? (
          /* Render Mac After Effects terminal quarantine bypass & install walkthrough */
          <MacAfterEffectsWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'mac-davinci-resolve-20' ? (
          /* Render Mac DaVinci Resolve 20 PKG installer walkthrough */
          <MacDaVinciWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'mac-topaz-video-ai' ? (
          /* Render Mac Topaz Video AI Apple Neural Engine walkthrough */
          <MacTopazWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-plugin-red-giant' || tutorial.id === 'mac-plugin-red-giant' ? (
          /* Render Red Giant / Maxon App walkthrough */
          <RedGiantWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-plugin-sapphire-2026' || tutorial.id === 'mac-plugin-sapphire-2026' ? (
          /* Render Boris FX Sapphire 2026 walkthrough */
          <SapphireWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-plugin-continuum-2026' || tutorial.id === 'mac-plugin-continuum-2026' ? (
          /* Render Boris FX Continuum (BCC) 2026 walkthrough */
          <ContinuumWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-plugin-revisionfx' || tutorial.id === 'mac-plugin-revisionfx' ? (
          /* Render RE:Vision Effects (Twixtor & RSMB) walkthrough */
          <REVisionWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-plugin-element-3d' || tutorial.id === 'mac-plugin-element-3d' ? (
          /* Render VideoCopilot Element 3D with 3D viewport walkthrough */
          <Element3DWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-plugin-twitch' || tutorial.id === 'mac-plugin-twitch' ? (
          /* Render Twitch .aex / .plugin manual MediaCore copy walkthrough */
          <TwitchWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : tutorial.id === 'win-plugin-flow' || tutorial.id === 'mac-plugin-flow' || tutorial.id === 'win-plugin-zxp-extensions' ? (
          /* Render Flow & ZXP extensions CEP installer walkthrough */
          <FlowAndZXPWalkthrough tutorial={tutorial} currentTime={currentTime} />
        ) : (
          /* Render Deep Glow 2, FilmConvert, Optical Flares, Bokeh & specialized plugin walkthroughs */
          <SpecializedPluginWalkthrough tutorial={tutorial} currentTime={currentTime} />
        )}

        {/* Center Big Play Button overlay if paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group cursor-pointer"
            aria-label={`Play ${tutorial.title}`}
          >
            <div className="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-transform group-hover:scale-105">
              <Play className="h-7 w-7 fill-current ml-1" />
            </div>
          </button>
        )}
      </div>

      {/* Video Control Bar */}
      <div className="border-t border-zinc-800 bg-[#0f0f13] px-4 py-3 sm:px-5">
        {/* Scrubber slider */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 w-10 text-right tabular-nums">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={customVideoUrl && videoRef.current ? videoRef.current.duration || totalDuration : totalDuration}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek through video"
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
            />
          </div>

          <span className="font-mono text-xs text-zinc-500 w-10 tabular-nums">
            {formatTime(
              customVideoUrl && videoRef.current?.duration
                ? videoRef.current.duration
                : totalDuration
            )}
          </span>
        </div>

        {/* Buttons Controls row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play / Pause button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-black hover:bg-zinc-200 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Restart button */}
            <button
              type="button"
              onClick={() => {
                setCurrentTime(0);
                if (videoRef.current) videoRef.current.currentTime = 0;
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors"
              aria-label="Restart video"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            {/* Mute button */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-zinc-400" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>

            {/* Speed selector */}
            <div className="flex items-center rounded-md border border-zinc-800 bg-[#070709] p-0.5 text-xs font-mono">
              {([1, 1.25, 1.5, 2] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                    playbackSpeed === spd
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Step by Step Checklist Section below the player */}
      <div className="border-t border-zinc-800/80 bg-[#0a0a0c] p-4 sm:p-5">
        <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
          <span>Installation Walkthrough Steps</span>
          <span className="text-[10px] text-zinc-500 font-normal">
            Step {currentStepIndex + 1} of {tutorial.steps.length}
          </span>
        </h5>

        <div className="space-y-2">
          {tutorial.steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 rounded px-3 py-2 text-[12px] transition-colors ${
                currentStepIndex === idx && isPlaying
                  ? 'bg-zinc-800 text-white border border-zinc-700 font-medium'
                  : 'bg-[#121215] text-zinc-400 border border-transparent'
              }`}
            >
              <CheckCircle2
                className={`h-4 w-4 mt-0.5 shrink-0 ${
                  progressRatio >= (idx + 1) / tutorial.steps.length
                    ? 'text-white'
                    : 'text-zinc-600'
                }`}
              />
              <span className="flex-1 leading-relaxed">{step}</span>
              <button
                type="button"
                onClick={() => handleCopy(step, idx)}
                className="text-zinc-500 hover:text-white shrink-0 ml-2"
                title="Copy step"
              >
                {copiedIndex === idx ? (
                  <Check className="h-3.5 w-3.5 text-white" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>

        {tutorial.note && (
          <div className="mt-3 rounded border border-zinc-800 bg-[#121216] p-2.5 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-200">Note: </span>
            {tutorial.note}
          </div>
        )}
      </div>
    </div>
  );
};
