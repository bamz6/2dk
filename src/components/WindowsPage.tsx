import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  ArrowLeft,
  ShieldCheck,
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  X,
  FileArchive,
  Wrench,
  AlertTriangle,
  Info,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

interface WindowsPageProps {
  onBack: () => void;
  onNavigatePage: (page: string) => void;
  onOpenSearch: () => void;
}

interface ReleaseItem {
  id: string;
  name: string;
  version: string;
  size: string;
  date?: string;
  badge?: string;
  description: string;
  downloadUrl: string;
  tags: string[];
}

interface SoftwareEntry {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  releases: ReleaseItem[];
}

interface SectionCategory {
  id: string;
  name: string;
  subtitle: string;
  apps: SoftwareEntry[];
}

// Curated data for Windows Page matching Keyflame structure
const WINDOWS_SECTIONS: SectionCategory[] = [
  {
    id: 'adobe',
    name: 'Adobe',
    subtitle: 'Adobe Apps',
    apps: [
      {
        id: 'after-effects',
        title: 'After Effects',
        subtitle: 'Motion graphics, visual effects & compositing platform',
        count: 5,
        releases: [
          {
            id: 'ae-2025',
            name: 'After Effects 2025 (v25.1)',
            version: '25.1.0',
            size: '3.24 GB',
            badge: 'LATEST',
            description: 'Native OpenColorIO support, multi-threaded rotoscope, enhanced 3D model importer.',
            downloadUrl: 'https://www.adobe.com/products/aftereffects.html',
            tags: ['AE 2025', 'NATIVE 3D', 'PRE-ACTIVATED'],
          },
          {
            id: 'ae-2024',
            name: 'After Effects 2024 (v24.6.2)',
            version: '24.6.2',
            size: '3.12 GB',
            badge: 'RECOMMENDED',
            description: 'Most stable workhorse release. Universal compatibility with all Sapphire, Continuum, and Trapcode plugins.',
            downloadUrl: 'https://www.adobe.com/products/aftereffects.html',
            tags: ['AE 2024', 'STABLE', 'RECOMMENDED'],
          },
          {
            id: 'ae-2023',
            name: 'After Effects 2023 (v23.6)',
            version: '23.6.0',
            size: '2.95 GB',
            description: 'Proven multi-frame rendering engine with minimal background overhead. Ideal for mid-spec editing rigs.',
            downloadUrl: 'https://www.adobe.com/products/aftereffects.html',
            tags: ['AE 2023', 'MFR', 'LEGACY'],
          },
          {
            id: 'ae-2022',
            name: 'After Effects 2022 (v22.6)',
            version: '22.6.0',
            size: '2.80 GB',
            description: 'First release with multi-frame rendering enabled by default. Low RAM memory footprint.',
            downloadUrl: 'https://www.adobe.com/products/aftereffects.html',
            tags: ['AE 2022', 'LIGHTWEIGHT'],
          },
          {
            id: 'ae-2020',
            name: 'After Effects 2020 (v17.5.1)',
            version: '17.5.1',
            size: '2.38 GB',
            description: 'Classic single-frame rendering architecture. 100% backward compatible with legacy 32-bit plugins.',
            downloadUrl: 'https://www.adobe.com/products/aftereffects.html',
            tags: ['AE 2020', 'CLASSIC', 'ARCHIVE'],
          },
        ],
      },
      {
        id: 'premiere-pro',
        title: 'Premiere Pro',
        subtitle: 'Timeline NLE video editing standard',
        count: 3,
        releases: [
          {
            id: 'pr-2025',
            name: 'Premiere Pro 2025 (v25.0)',
            version: '25.0.0',
            size: '11.4 GB',
            badge: 'LATEST',
            description: 'Enhanced text-based editing, native AI audio clarity enhancer, revamped modern properties panel.',
            downloadUrl: 'https://www.adobe.com/products/premiere.html',
            tags: ['PR 2025', 'TEXT EDITING', 'AI AUDIO'],
          },
          {
            id: 'pr-2024',
            name: 'Premiere Pro 2024 (v24.6.1)',
            version: '24.6.1',
            size: '10.8 GB',
            badge: 'RECOMMENDED',
            description: 'Rock solid timeline performance for long-form multicam timelines and ProRes proxy workflows.',
            downloadUrl: 'https://www.adobe.com/products/premiere.html',
            tags: ['PR 2024', 'LONG-FORM', 'STABLE'],
          },
          {
            id: 'pr-2023',
            name: 'Premiere Pro 2023 (v23.6)',
            version: '23.6.0',
            size: '9.5 GB',
            description: 'Proven build with Lumetri Color GPU optimizations and native Apple Silicon / NVENC parity.',
            downloadUrl: 'https://www.adobe.com/products/premiere.html',
            tags: ['PR 2023', 'LUMETRI'],
          },
        ],
      },
      {
        id: 'photoshop',
        title: 'Photoshop',
        subtitle: 'Raster graphics, thumbnails & digital painting',
        count: 2,
        releases: [
          {
            id: 'ps-2025',
            name: 'Photoshop 2025 (v26.0)',
            version: '26.0.0',
            size: '4.15 GB',
            badge: 'LATEST',
            description: 'Generative workspace, distraction removal tool, advanced HDR color profile pipeline.',
            downloadUrl: 'https://www.adobe.com/products/photoshop.html',
            tags: ['PS 2025', 'HDR', 'GEN EXPAND'],
          },
          {
            id: 'ps-2024',
            name: 'Photoshop 2024 (v25.12)',
            version: '25.12.0',
            size: '3.88 GB',
            badge: 'RECOMMENDED',
            description: 'Tested offline workhorse for YouTube thumbnail composition, poster art, and texture maps.',
            downloadUrl: 'https://www.adobe.com/products/photoshop.html',
            tags: ['PS 2024', 'THUMBNAILS', 'STABLE'],
          },
        ],
      },
      {
        id: 'media-encoder',
        title: 'Media Encoder',
        subtitle: 'Batch rendering queue & format converter',
        count: 2,
        releases: [
          {
            id: 'me-2025',
            name: 'Media Encoder 2025 (v25.0)',
            version: '25.0.0',
            size: '1.45 GB',
            description: 'Concurrent GPU queue rendering, AV1 hardware acceleration, ProRes 4444 XQ direct exports.',
            downloadUrl: 'https://www.adobe.com/products/media-encoder.html',
            tags: ['ME 2025', 'GPU QUEUE', 'AV1'],
          },
          {
            id: 'me-2024',
            name: 'Media Encoder 2024 (v24.6)',
            version: '24.6.0',
            size: '1.38 GB',
            badge: 'RECOMMENDED',
            description: 'Stable batch rendering daemon for Premiere Pro timelines and After Effects dynamic links.',
            downloadUrl: 'https://www.adobe.com/products/media-encoder.html',
            tags: ['ME 2024', 'BATCH', 'STABLE'],
          },
        ],
      },
      {
        id: 'illustrator',
        title: 'Illustrator',
        subtitle: 'Precision vector graphics for motion design',
        count: 2,
        releases: [
          {
            id: 'ai-2025',
            name: 'Illustrator 2025 (v29.0)',
            version: '29.0.0',
            size: '2.10 GB',
            description: 'Generative shape fill, mockups tool, seamless Overlord vector export to After Effects.',
            downloadUrl: 'https://www.adobe.com/products/illustrator.html',
            tags: ['AI 2025', 'VECTOR', 'OVERLORD'],
          },
          {
            id: 'ai-2024',
            name: 'Illustrator 2024 (v28.6)',
            version: '28.6.0',
            size: '1.98 GB',
            badge: 'RECOMMENDED',
            description: 'High performance vector engine for complex typography, logo animation assets, and HUD vectors.',
            downloadUrl: 'https://www.adobe.com/products/illustrator.html',
            tags: ['AI 2024', 'STABLE'],
          },
        ],
      },
      {
        id: 'audition',
        title: 'Audition',
        subtitle: 'Spectral audio repair & multitrack sound mixing',
        count: 1,
        releases: [
          {
            id: 'au-2024',
            name: 'Audition 2024 (v24.4)',
            version: '24.4.0',
            size: '620 MB',
            badge: 'RECOMMENDED',
            description: 'Dedicated spectral frequency editing, de-clicker, room echo attenuation, and podcast mastering.',
            downloadUrl: 'https://www.adobe.com/products/audition.html',
            tags: ['AU 2024', 'SPECTRAL', 'DE-NOISE'],
          },
        ],
      },
    ],
  },
  {
    id: 'video',
    name: 'Video',
    subtitle: 'Video Editors & Encoders',
    apps: [
      {
        id: 'davinci-resolve',
        title: 'DaVinci Resolve Studio',
        subtitle: 'Industry-standard color grading, Fairlight audio & Fusion VFX',
        count: 2,
        releases: [
          {
            id: 'dvr-19',
            name: 'DaVinci Resolve Studio 19.1',
            version: '19.1.0',
            size: '5.10 GB',
            badge: 'LATEST',
            description: 'Ultra-fast node-based color pipeline, IntelliTrack AI tracking, music remixer, and UltraStudio 4K.',
            downloadUrl: 'https://www.blackmagicdesign.com/products/davinciresolve',
            tags: ['RESOLVE 19', 'STUDIO', 'COLOR', 'FUSION'],
          },
          {
            id: 'dvr-18',
            name: 'DaVinci Resolve Studio 18.6.6',
            version: '18.6.6',
            size: '4.85 GB',
            badge: 'RECOMMENDED',
            description: 'Ultra-stable production build used by broadcast studios and indie filmmakers worldwide.',
            downloadUrl: 'https://www.blackmagicdesign.com/products/davinciresolve',
            tags: ['RESOLVE 18', 'ROCK SOLID'],
          },
        ],
      },
      {
        id: 'handbrake',
        title: 'HandBrake',
        subtitle: 'Open-source multi-threaded batch video transcoder',
        count: 1,
        releases: [
          {
            id: 'hb-latest',
            name: 'HandBrake 1.9.1',
            version: '1.9.1',
            size: '26 MB',
            badge: 'FREE & OPEN SOURCE',
            description: 'AV1, HEVC, H.264 GPU batch converter with pristine RF quality targets and web presets.',
            downloadUrl: 'https://handbrake.fr',
            tags: ['OPEN SOURCE', 'AV1', 'BATCH'],
          },
        ],
      },
      {
        id: 'shutter-encoder',
        title: 'Shutter Encoder',
        subtitle: 'Professional FFmpeg GUI for editing codecs and ProRes rewrites',
        count: 1,
        releases: [
          {
            id: 'se-latest',
            name: 'Shutter Encoder 18.4',
            version: '18.4.0',
            size: '88 MB',
            badge: 'FREE TOOL',
            description: 'Convert camera footage to Apple ProRes 422, Avid DNxHD, burn timecode, conform framerates.',
            downloadUrl: 'https://www.shutterencoder.com',
            tags: ['PRORES', 'DNXHD', 'TIMECODE'],
          },
        ],
      },
      {
        id: 'lossless-cut',
        title: 'LosslessCut',
        subtitle: 'Instant stream cutting tool without re-encoding quality loss',
        count: 1,
        releases: [
          {
            id: 'lc-latest',
            name: 'LosslessCut 3.64.0',
            version: '3.64.0',
            size: '115 MB',
            badge: 'FREE TOOL',
            description: 'Slices and re-orders video keyframes in milliseconds. Preserves original bitrates and multi-track audio.',
            downloadUrl: 'https://github.com/mifi/lossless-cut',
            tags: ['LOSSLESS', 'ZERO LOSS', 'FAST CUT'],
          },
        ],
      },
    ],
  },
  {
    id: 'creative',
    name: 'Creative',
    subtitle: '3D, Animation & AI Video Tools',
    apps: [
      {
        id: 'blender',
        title: 'Blender',
        subtitle: 'Free and open-source complete 3D animation creation suite',
        count: 1,
        releases: [
          {
            id: 'blender-latest',
            name: 'Blender 4.3 LTS',
            version: '4.3.0',
            size: '340 MB',
            badge: 'FREE & OPEN SOURCE',
            description: 'Cycles GPU path tracer, EEVEE-Next realtime engine, Geometry Nodes procedural modeling.',
            downloadUrl: 'https://www.blender.org',
            tags: ['3D', 'CYCLES', 'EEVEE', 'VFX'],
          },
        ],
      },
      {
        id: 'cinema-4d',
        title: 'Maxon Cinema 4D',
        subtitle: 'Professional 3D motion graphics & simulation software',
        count: 1,
        releases: [
          {
            id: 'c4d-2025',
            name: 'Cinema 4D 2025.1',
            version: '2025.1.0',
            size: '2.85 GB',
            badge: 'LATEST',
            description: 'MoGraph Cloner system, unified simulation engine for cloth/soft bodies, Pyro GPU smoke/fire.',
            downloadUrl: 'https://www.maxon.net/cinema-4d',
            tags: ['MOGRAPH', 'REDSHIFT', 'SIMULATION'],
          },
        ],
      },
      {
        id: 'topaz-video-ai',
        title: 'Topaz Video AI',
        subtitle: 'Neural video upscaling, de-interlacing & slow-motion generator',
        count: 1,
        releases: [
          {
            id: 'topaz-latest',
            name: 'Topaz Video AI 5.4.1',
            version: '5.4.1',
            size: '640 MB',
            badge: 'AI POWERED',
            description: 'Iris face enhancement, Proteus 4K/8K upscale model, Chronos 120fps motion interpolation.',
            downloadUrl: 'https://www.topazlabs.com/topaz-video-ai',
            tags: ['AI UPSCALE', '4K/8K', 'SLOW MOTION'],
          },
        ],
      },
      {
        id: 'substance-painter',
        title: 'Adobe Substance 3D Painter',
        subtitle: 'Industry-standard 3D PBR texturing and smart material painting',
        count: 1,
        releases: [
          {
            id: 'substance-latest',
            name: 'Substance 3D Painter 10.1',
            version: '10.1.0',
            size: '2.40 GB',
            description: 'Real-time raytracing viewport, smart masks, 8K UDIM export for Maya, Blender, and Unreal.',
            downloadUrl: 'https://www.adobe.com/products/substance3d-painter.html',
            tags: ['PBR', 'TEXTURING', '3D ASSETS'],
          },
        ],
      },
    ],
  },
  {
    id: 'audio',
    name: 'Audio',
    subtitle: 'DAWs, Sound Restoration & Synth Suites',
    apps: [
      {
        id: 'izotope-rx',
        title: 'iZotope RX Advanced',
        subtitle: 'Standard for dialogue clean-up, de-noise & audio restoration',
        count: 1,
        releases: [
          {
            id: 'rx-11',
            name: 'iZotope RX 11 Advanced',
            version: '11.1.0',
            size: '680 MB',
            badge: 'ESSENTIAL',
            description: 'Machine-learning dialogue isolate, de-reverb, spectral repair, guitar de-noise, loudness control.',
            downloadUrl: 'https://www.izotope.com/products/rx.html',
            tags: ['DE-NOISE', 'SPECTRAL', 'DIALOGUE'],
          },
        ],
      },
      {
        id: 'fl-studio',
        title: 'FL Studio All Plugins Edition',
        subtitle: 'Fast pattern-based music production DAW & beatmaking host',
        count: 1,
        releases: [
          {
            id: 'fl-24',
            name: 'FL Studio 24.1.2',
            version: '24.1.2',
            size: '1.15 GB',
            description: 'Native stem separation, audio clips pitch shifter, Fruity Parametric EQ 3, Sytrus & Harmor.',
            downloadUrl: 'https://www.image-line.com',
            tags: ['DAW', 'STEM SEPARATION', 'BEATS'],
          },
        ],
      },
      {
        id: 'audacity',
        title: 'Audacity (Telemetry-Free)',
        subtitle: 'Free, multi-track audio recorder and sample editor',
        count: 1,
        releases: [
          {
            id: 'audacity-latest',
            name: 'Audacity 3.7.1 (Clean Build)',
            version: '3.7.1',
            size: '35 MB',
            badge: 'FREE & OPEN SOURCE',
            description: 'Telemetry-free open source build. Fast WAV/MP3 clipping, noise reduction, and VST3 host.',
            downloadUrl: 'https://www.audacityteam.org',
            tags: ['CLEAN', 'FREE', 'NOISE GATE'],
          },
        ],
      },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    subtitle: 'System Utilities & Asset Handlers',
    apps: [
      {
        id: 'seven-zip',
        title: '7-Zip Extra Archiver',
        subtitle: 'High compression archive manager required for 3DFX downloads',
        count: 1,
        releases: [
          {
            id: 'sevenzip-latest',
            name: '7-Zip 24.08 (x64)',
            version: '24.08',
            size: '1.6 MB',
            badge: 'MANDATORY',
            description: 'Unpacks password-protected .7z, RAR, and TAR archives without header corruption.',
            downloadUrl: 'https://www.7-zip.org',
            tags: ['ARCHIVER', '7Z', 'FREE'],
          },
        ],
      },
      {
        id: 'everything-search',
        title: 'Everything Search Engine',
        subtitle: 'Instantaneous filename search across all internal and external drives',
        count: 1,
        releases: [
          {
            id: 'everything-latest',
            name: 'Voidtools Everything 1.4.1',
            version: '1.4.1',
            size: '2.1 MB',
            badge: 'WORKFLOW',
            description: 'Indexes 10 million files in 1 second. Finds footage, project files, and sound clips instantly.',
            downloadUrl: 'https://www.voidtools.com',
            tags: ['INDEX', 'SPEED', 'SEARCH'],
          },
        ],
      },
      {
        id: 'bulk-rename',
        title: 'Bulk Rename Utility',
        subtitle: 'Batch file renaming utility for video clip ingestion and camera cards',
        count: 1,
        releases: [
          {
            id: 'bru-latest',
            name: 'Bulk Rename Utility 4.0.0',
            version: '4.0.0',
            size: '12 MB',
            description: 'Add dates, timecodes, shoot identifiers, and sequential numbering to thousands of files in seconds.',
            downloadUrl: 'https://www.bulkrenameutility.co.uk',
            tags: ['BATCH', 'INGEST', 'RENAME'],
          },
        ],
      },
      {
        id: 'ddu-cleaner',
        title: 'Display Driver Uninstaller (DDU)',
        subtitle: 'Completely purges corrupted GPU drivers to fix video editor crashes',
        count: 1,
        releases: [
          {
            id: 'ddu-latest',
            name: 'Wagnardsoft DDU 18.0.8.2',
            version: '18.0.8.2',
            size: '1.4 MB',
            badge: 'FIX CRASHES',
            description: 'Purges NVIDIA, AMD, and Intel display drivers in Safe Mode to resolve black screen crashes.',
            downloadUrl: 'https://www.wagnardsoft.com',
            tags: ['GPU FIX', 'CRASH RESOLVE', 'NVIDIA'],
          },
        ],
      },
    ],
  },
  {
    id: 'ae-plugins',
    name: 'AE Plugins',
    subtitle: 'Visual Effects, Particles & Shaders for After Effects',
    apps: [
      {
        id: 'boris-sapphire',
        title: 'Boris FX Sapphire',
        subtitle: 'Legendary visual effects suite: S_Glow, S_Shake, S_LensFlare, S_Zap',
        count: 2,
        releases: [
          {
            id: 'sapphire-2025',
            name: 'Boris FX Sapphire 2025.0',
            version: '2025.0.0',
            size: '640 MB',
            badge: 'LATEST',
            description: 'Over 270 photorealistic visual effects and transitions, GPU accelerated with CUDA/Metal support.',
            downloadUrl: 'https://borisfx.com/products/sapphire/',
            tags: ['GLOW', 'SHAKE', 'LENS FLARE', 'TRANSITIONS'],
          },
          {
            id: 'sapphire-2024',
            name: 'Boris FX Sapphire 2024.5',
            version: '2024.5.1',
            size: '610 MB',
            badge: 'RECOMMENDED',
            description: 'Universal compatibility across AE 2023, 2024, and Premiere Pro timelines.',
            downloadUrl: 'https://borisfx.com/products/sapphire/',
            tags: ['STABLE', 'AE 2024'],
          },
        ],
      },
      {
        id: 'red-giant-trapcode',
        title: 'Red Giant Trapcode Suite',
        subtitle: '3D particle systems, organic forms & geometric VFX inside AE',
        count: 1,
        releases: [
          {
            id: 'trapcode-2025',
            name: 'Trapcode Suite 2025.1',
            version: '2025.1.0',
            size: '890 MB',
            badge: 'LATEST',
            description: 'Includes Particular 3D, Form, Mir, Shine, Tao, Lux, Starglow, Sound Keys, and Horizon.',
            downloadUrl: 'https://www.maxon.net/red-giant/trapcode-suite',
            tags: ['PARTICULAR', 'FORM', 'SHINE', 'SOUND KEYS'],
          },
        ],
      },
      {
        id: 'element-3d',
        title: 'Video Copilot Element 3D',
        subtitle: 'Real-time 3D object and particle rendering engine inside After Effects',
        count: 1,
        releases: [
          {
            id: 'e3d-v2',
            name: 'Video Copilot Element 3D v2.2.3',
            version: '2.2.3',
            size: '290 MB',
            badge: 'ESSENTIAL',
            description: 'Imports 3D OBJ & C4D models directly into AE. Physical shader engine with ambient occlusion.',
            downloadUrl: 'https://www.videocopilot.net/products/element2/',
            tags: ['3D ENGINE', 'OBJ IMPORT', 'PHYSICAL SHADER'],
          },
        ],
      },
      {
        id: 'optical-flares',
        title: 'Video Copilot Optical Flares',
        subtitle: 'Custom anamorphic and cinematic lens flares with luminance tracking',
        count: 1,
        releases: [
          {
            id: 'of-latest',
            name: 'Optical Flares v1.3.8 (x64)',
            version: '1.3.8',
            size: '85 MB',
            badge: 'CLASSIC',
            description: 'Custom flare designer, 3D lens flare positioning, dynamic triggering, and chromatic aberration.',
            downloadUrl: 'https://www.videocopilot.net/products/opticalflares/',
            tags: ['LENS FLARES', 'ANAMORPHIC', 'LIGHTING'],
          },
        ],
      },
      {
        id: 'deep-glow',
        title: 'Plugin Everything Deep Glow',
        subtitle: 'Physically accurate inverse square glow falloff with chromatic dispersion',
        count: 1,
        releases: [
          {
            id: 'deepglow-latest',
            name: 'Deep Glow v1.5.8',
            version: '1.5.8',
            size: '18 MB',
            badge: 'BEST GLOW',
            description: 'Replaces native AE glow. Features accurate optical falloff, chromatic tint, and threshold controls.',
            downloadUrl: 'https://aescripts.com/deep-glow/',
            tags: ['INVERSE SQUARE', 'CHROMATIC', 'NEON'],
          },
        ],
      },
    ],
  },
  {
    id: 'ofx',
    name: 'OFX',
    subtitle: 'OpenFX Plugins for DaVinci Resolve & Premiere Pro',
    apps: [
      {
        id: 'magic-bullet-looks',
        title: 'Red Giant Magic Bullet Looks OFX',
        subtitle: 'Cinematic color finishing tool with over 200 film-grade look presets',
        count: 1,
        releases: [
          {
            id: 'mbl-2025',
            name: 'Magic Bullet Looks 2025 (OFX)',
            version: '2025.1.0',
            size: '420 MB',
            badge: 'COLOR',
            description: 'Anamorphic lens emulation, 35mm film grain, halation, diffusion, and intuitive Colorista tools.',
            downloadUrl: 'https://www.maxon.net/red-giant/magic-bullet-suite',
            tags: ['OFX', 'LOOKS', 'FILM GRAIN', 'HALATION'],
          },
        ],
      },
      {
        id: 'filmconvert-nitrate',
        title: 'FilmConvert Nitrate OFX',
        subtitle: 'Exact analog film stock profiles with authentic 6K grain response',
        count: 1,
        releases: [
          {
            id: 'fcn-latest',
            name: 'FilmConvert Nitrate v3.45 (OFX)',
            version: '3.45.0',
            size: '140 MB',
            badge: 'ANALOG EMULATION',
            description: 'Matches digital camera sensors to authentic Kodak and Fujifilm color curves and organic grain.',
            downloadUrl: 'https://www.filmconvert.com/nitrate',
            tags: ['KODAK', 'FUJI', 'GRAIN', 'RESOLVE'],
          },
        ],
      },
      {
        id: 'dehancer-pro',
        title: 'Dehancer Pro OFX',
        subtitle: 'Analog film emulation, bloom, halation, gate weave and film breath',
        count: 1,
        releases: [
          {
            id: 'dehancer-latest',
            name: 'Dehancer Pro v7.2 (OFX)',
            version: '7.2.1',
            size: '220 MB',
            badge: 'POPULAR',
            description: 'True optical halation, film bloom, custom printer color profiles, and vintage 16mm/35mm effects.',
            downloadUrl: 'https://www.dehancer.com',
            tags: ['BLOOM', 'HALATION', 'PRINT PROFILES'],
          },
        ],
      },
    ],
  },
];

type GuideModalType = 'extract' | 'install' | 'unlicensed' | 'version' | null;

export const WindowsPage: React.FC<WindowsPageProps> = ({
  onBack,
  onNavigatePage,
  onOpenSearch,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('adobe');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedApps, setExpandedApps] = useState<Record<string, boolean>>({
    'after-effects': true, // expanded by default as in the screenshot
  });
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const [activeGuideModal, setActiveGuideModal] = useState<GuideModalType>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Toggle app accordion expansion
  const toggleApp = (appId: string) => {
    setExpandedApps((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  // Scroll to section when left nav item is clicked
  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const elem = document.getElementById(`sec-${sectionId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Copy password helper
  const handleCopyPassword = () => {
    navigator.clipboard.writeText('flame');
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  // Copy download link
  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  // Calculate totals
  const totalItems = useMemo(() => {
    let sum = 0;
    WINDOWS_SECTIONS.forEach((s) => {
      s.apps.forEach((a) => {
        sum += a.releases.length;
      });
    });
    return sum;
  }, []);

  const totalCategories = WINDOWS_SECTIONS.length;

  // Filter sections and apps based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return WINDOWS_SECTIONS;
    const q = searchQuery.toLowerCase();

    return WINDOWS_SECTIONS.map((sec) => {
      const matchingApps = sec.apps
        .map((app) => {
          const appMatches =
            app.title.toLowerCase().includes(q) ||
            app.subtitle.toLowerCase().includes(q);

          const matchingReleases = app.releases.filter(
            (rel) =>
              rel.name.toLowerCase().includes(q) ||
              rel.description.toLowerCase().includes(q) ||
              rel.tags.some((t) => t.toLowerCase().includes(q))
          );

          if (appMatches) {
            return app;
          }
          if (matchingReleases.length > 0) {
            return {
              ...app,
              releases: matchingReleases,
            };
          }
          return null;
        })
        .filter(Boolean) as SoftwareEntry[];

      return {
        ...sec,
        apps: matchingApps,
      };
    }).filter((sec) => sec.apps.length > 0);
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 bg-black text-white selection:bg-white selection:text-black">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[#71717A]">
        <button
          onClick={onBack}
          className="text-[#A1A1AA] hover:text-white transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-white font-semibold">Windows</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="mb-8">
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Windows
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#A1A1AA]">
          Verified software and plugins for Windows editors.
        </p>
      </div>

      {/* 3-Column Layout: Left (Sections Nav), Center (Search, Notices, Accordions), Right (Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: SECTIONS SIDEBAR */}
        <aside className="lg:col-span-2 hidden lg:block sticky top-20">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#71717A] mb-3">
            SECTIONS
          </div>
          <nav className="flex flex-col space-y-1">
            {WINDOWS_SECTIONS.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left px-3 py-2 rounded-md font-mono text-xs transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#181818] text-white font-bold border-l-2 border-white'
                      : 'text-[#A1A1AA] hover:bg-[#0D0D0D] hover:text-white border-l-2 border-transparent'
                  }`}
                >
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Horizontal Section Tabs */}
        <div className="lg:hidden col-span-1 flex overflow-x-auto gap-2 pb-2 border-b border-[#1F1F1F]">
          {WINDOWS_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded font-mono text-xs ${
                activeSectionId === sec.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#0D0D0D] border border-[#1F1F1F] text-[#A1A1AA]'
              }`}
            >
              {sec.name}
            </button>
          ))}
        </div>

        {/* CENTER COLUMN: SEARCH, NOTICES & SOFTWARE ACCORDIONS */}
        <main className="lg:col-span-7 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search software, plugins..."
              className="w-full rounded-md border border-[#1F1F1F] bg-[#0D0D0D] py-2.5 pl-10 pr-24 font-mono text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-white transition-colors"
            />
            <button
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.focus();
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded border border-[#1F1F1F] bg-[#141414] px-1.5 py-0.5 font-mono text-[10px] text-[#71717A] hover:text-white transition-colors"
            >
              <span>Ctrl/⌘</span>
              <span>K</span>
            </button>
          </div>

          {/* NOTICE 1: Extract Guide Card */}
          <div className="rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 text-xs text-[#A1A1AA] leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              <div className="space-y-2">
                <p>
                  Always extract downloads with{' '}
                  <strong className="text-white font-bold underline underline-offset-2">
                    7-Zip
                  </strong>{' '}
                  — Windows' built-in extractor is unreliable for
                  password-protected .7z files on any Windows version.
                </p>
                <p>
                  Having trouble? See our{' '}
                  <button
                    onClick={() => setActiveGuideModal('extract')}
                    className="text-white font-semibold underline underline-offset-4 hover:text-zinc-300"
                  >
                    extract guide
                  </button>
                  .
                </p>
                <p className="pt-1 text-[#71717A]">
                  Every download is a password-protected .7z archive. The password
                  is always{' '}
                  <button
                    onClick={handleCopyPassword}
                    className="inline-flex items-center gap-1.5 rounded border border-[#27272A] bg-black px-2 py-0.5 font-mono font-bold text-white hover:border-white transition-colors"
                    title="Click to copy password"
                  >
                    <span>flame</span>
                    {copiedPassword ? (
                      <Check className="h-3 w-3 text-white" />
                    ) : (
                      <Copy className="h-3 w-3 text-[#71717A]" />
                    )}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* NOTICE 2: Compatibility Card */}
          <div className="rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 text-xs leading-relaxed">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#1F1F1F] pb-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#71717A]">
                COMPATIBILITY
              </span>
              <span className="font-medium text-white">
                Match the host app before you install.
              </span>
            </div>

            <ul className="space-y-2 text-[#A1A1AA]">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-[#71717A] shrink-0" />
                <span>
                  For After Effects plugins, keep the plugin release close to
                  your AE major version. Newer plugin installers often expect AE
                  2024+.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-[#71717A] shrink-0" />
                <span>
                  Keep your old AE version installed until projects open,
                  effects load, and presets/scripts are confirmed in the new
                  version.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-[#71717A] shrink-0" />
                <span>
                  If a project depends on older plugins, check{' '}
                  <button
                    onClick={() => setActiveGuideModal('version')}
                    className="text-white font-medium underline underline-offset-4 hover:text-zinc-300"
                  >
                    Archives
                  </button>{' '}
                  and the{' '}
                  <button
                    onClick={() => setActiveGuideModal('version')}
                    className="text-white font-medium underline underline-offset-4 hover:text-zinc-300"
                  >
                    AE version guide
                  </button>{' '}
                  before upgrading.
                </span>
              </li>
            </ul>
          </div>

          {/* SECTIONS & SOFTWARE ACCORDIONS */}
          {filteredSections.length === 0 ? (
            <div className="rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-12 text-center font-mono text-xs text-[#71717A]">
              NO SOFTWARE OR PLUGINS FOUND MATCHING "{searchQuery.toUpperCase()}".
              <div className="mt-3">
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-white underline underline-offset-4 hover:text-zinc-300"
                >
                  CLEAR SEARCH
                </button>
              </div>
            </div>
          ) : (
            filteredSections.map((sec) => (
              <section
                key={sec.id}
                id={`sec-${sec.id}`}
                className="pt-4 scroll-mt-24 space-y-3"
              >
                {/* Section Header */}
                <div className="border-b border-[#1F1F1F] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717A] block">
                    {sec.name.toUpperCase()}
                  </span>
                  <h2 className="font-sans text-2xl font-bold text-white">
                    {sec.subtitle}
                  </h2>
                </div>

                {/* Software entries list */}
                <div className="space-y-2">
                  {sec.apps.map((app) => {
                    const isExpanded = !!expandedApps[app.id] || !!searchQuery;
                    return (
                      <div
                        key={app.id}
                        className="rounded-md border border-[#1F1F1F] bg-[#0D0D0D] overflow-hidden transition-colors hover:border-[#27272A]"
                      >
                        {/* Accordion Header */}
                        <button
                          type="button"
                          onClick={() => toggleApp(app.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-[#121212] transition-colors focus:outline-none"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-sans text-base font-bold text-white">
                                {app.title}
                              </h3>
                              <span className="font-mono text-[11px] text-[#71717A]">
                                {app.releases.length}{' '}
                                {app.releases.length === 1 ? 'release' : 'releases'}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-[#A1A1AA]">
                              {app.subtitle}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[#71717A] bg-black border border-[#1F1F1F] px-2 py-0.5 rounded">
                              {app.releases.length}
                            </span>
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-[#A1A1AA]" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-[#71717A]" />
                            )}
                          </div>
                        </button>

                        {/* Expanded Releases Table / Cards */}
                        {isExpanded && (
                          <div className="border-t border-[#1F1F1F] bg-black p-3 space-y-2">
                            {app.releases.map((rel) => (
                              <div
                                key={rel.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded border border-[#1A1A1A] bg-[#0A0A0A] p-3 hover:border-[#2A2A2A] transition-colors"
                              >
                                <div className="space-y-1 max-w-lg">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-sans text-sm font-semibold text-white">
                                      {rel.name}
                                    </span>
                                    {rel.badge && (
                                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white text-black font-bold">
                                        {rel.badge}
                                      </span>
                                    )}
                                    <span className="font-mono text-[10px] text-[#71717A] border border-[#1F1F1F] px-1 rounded">
                                      {rel.size}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                                    {rel.description}
                                  </p>
                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {rel.tags.map((t) => (
                                      <span
                                        key={t}
                                        className="font-mono text-[9px] text-[#71717A] bg-black border border-[#1F1F1F] px-1 rounded"
                                      >
                                        #{t}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Download & Action Buttons */}
                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopyLink(rel.downloadUrl, rel.id)
                                    }
                                    className="p-1.5 rounded border border-[#1F1F1F] text-[#71717A] hover:bg-white hover:text-black transition-colors"
                                    title="Copy Direct Link"
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
                                    className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                    <span>DOWNLOAD</span>
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
        </main>

        {/* RIGHT COLUMN: WINDOWS STATS CARD & GUIDES CARD */}
        <aside className="lg:col-span-3 space-y-5 sticky top-20">
          {/* Windows Platform Card */}
          <div className="rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5">
            <div className="flex items-center gap-2 border-b border-[#1F1F1F] pb-3 mb-4">
              {/* Windows 4-square vector logo */}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-white shrink-0"
                aria-hidden="true"
              >
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4h-13.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" />
              </svg>
              <span className="font-mono text-xs font-bold tracking-wider text-white">
                WINDOWS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-2xl font-black text-white">
                  {totalItems}
                </div>
                <div className="font-mono text-[10px] uppercase text-[#71717A] tracking-wider">
                  ITEMS
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-black text-white">
                  {totalCategories}
                </div>
                <div className="font-mono text-[10px] uppercase text-[#71717A] tracking-wider">
                  CATEGORIES
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[10px] font-mono text-[#71717A]">
              <span>SPEC // WIN_64</span>
              <span className="text-white font-semibold">STANDALONE</span>
            </div>
          </div>

          {/* Guides Card */}
          <div className="rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A] border-b border-[#1F1F1F] pb-2 mb-3">
              GUIDES
            </div>

            <nav className="flex flex-col space-y-2.5 font-mono text-xs">
              <button
                onClick={() => setActiveGuideModal('extract')}
                className="group flex items-center gap-2 text-left text-[#A1A1AA] hover:text-white transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
                <span className="group-hover:underline underline-offset-2">
                  Extract Guide
                </span>
              </button>

              <button
                onClick={() => setActiveGuideModal('install')}
                className="group flex items-center gap-2 text-left text-[#A1A1AA] hover:text-white transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
                <span className="group-hover:underline underline-offset-2">
                  Install Guide
                </span>
              </button>

              <button
                onClick={() => setActiveGuideModal('unlicensed')}
                className="group flex items-center gap-2 text-left text-[#A1A1AA] hover:text-white transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
                <span className="group-hover:underline underline-offset-2">
                  Unlicensed Fix
                </span>
              </button>

              <button
                onClick={() => setActiveGuideModal('version')}
                className="group flex items-center gap-2 text-left text-[#A1A1AA] hover:text-white transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
                <span className="group-hover:underline underline-offset-2">
                  AE Version Guide
                </span>
              </button>
            </nav>
          </div>
        </aside>
      </div>

      {/* GUIDES MODALS */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl rounded-lg border border-[#1F1F1F] bg-[#0D0D0D] p-6 shadow-2xl">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveGuideModal(null)}
              className="absolute right-4 top-4 rounded p-1 text-[#71717A] hover:bg-white hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* EXTRACT GUIDE MODAL */}
            {activeGuideModal === 'extract' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
                  <FileArchive className="h-4 w-4 text-white" />
                  <span>GUIDE // 01</span>
                </div>
                <h3 className="font-sans text-xl font-bold text-white">
                  7-Zip Extraction Walkthrough
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Windows built-in ZIP extractor fails to process password-protected
                  LZMA2 compressed archives, creating empty or corrupt folders.
                </p>

                <div className="space-y-3 font-mono text-xs text-[#D4D4D8] bg-black p-4 rounded border border-[#1F1F1F]">
                  <div className="flex gap-2">
                    <span className="text-white font-bold">1.</span>
                    <span>Download and install the official 64-bit 7-Zip from 7-zip.org.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">2.</span>
                    <span>Right-click the downloaded <code>.7z</code> file &rarr; 7-Zip &rarr; Extract to...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white font-bold">3.</span>
                    <span>When prompted for password, enter:</span>
                  </div>
                  <div className="ml-5 flex items-center gap-2">
                    <span className="bg-[#181818] text-white px-3 py-1 rounded border border-[#27272A] font-bold">
                      flame
                    </span>
                    <button
                      onClick={handleCopyPassword}
                      className="px-2 py-1 bg-white text-black font-semibold rounded text-[10px] hover:bg-zinc-200"
                    >
                      {copiedPassword ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveGuideModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200"
                  >
                    GOT IT
                  </button>
                </div>
              </div>
            )}

            {/* INSTALL GUIDE MODAL */}
            {activeGuideModal === 'install' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
                  <Wrench className="h-4 w-4 text-white" />
                  <span>GUIDE // 02</span>
                </div>
                <h3 className="font-sans text-xl font-bold text-white">
                  Clean Installation Protocol
                </h3>
                <div className="space-y-2.5 text-xs text-[#A1A1AA] leading-relaxed">
                  <div className="rounded border border-[#1F1F1F] bg-black p-3 space-y-1">
                    <div className="font-mono text-white font-bold">1. Antivirus False Positives</div>
                    <p>Pre-activated setups use modified DLL injectors. Add your extraction folder to Windows Defender exclusions before unzipping.</p>
                  </div>
                  <div className="rounded border border-[#1F1F1F] bg-black p-3 space-y-1">
                    <div className="font-mono text-white font-bold">2. Run Setup as Administrator</div>
                    <p>Right-click <code>Set-up.exe</code> and select <em>Run as administrator</em> to allow registration of host background daemons.</p>
                  </div>
                  <div className="rounded border border-[#1F1F1F] bg-black p-3 space-y-1">
                    <div className="font-mono text-white font-bold">3. Close Creative Cloud Sync</div>
                    <p>Ensure Adobe Creative Cloud Desktop and AGS processes are fully ended in Task Manager before installing.</p>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveGuideModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}

            {/* UNLICENSED FIX MODAL */}
            {activeGuideModal === 'unlicensed' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
                  <AlertTriangle className="h-4 w-4 text-white" />
                  <span>GUIDE // 03</span>
                </div>
                <h3 className="font-sans text-xl font-bold text-white">
                  "Unlicensed App Has Been Disabled" Fix
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  If Adobe displays a 10-day countdown banner or disables your timeline,
                  their background telemetry service (AGS) has phoned home.
                </p>

                <div className="space-y-3 font-mono text-xs bg-black p-3 rounded border border-[#1F1F1F]">
                  <div>
                    <span className="text-white font-bold block mb-1">Step 1: Disable Adobe Genuine Service</span>
                    <span className="text-[#71717A]">Press Win+R &rarr; services.msc &rarr; Find "Adobe Genuine Software Integrity Service" &rarr; Stop & Disable.</span>
                  </div>
                  <div>
                    <span className="text-white font-bold block mb-1">Step 2: Windows Firewall Outbound Rule</span>
                    <span className="text-[#71717A]">Open Windows Defender Firewall &rarr; Outbound Rules &rarr; New Rule &rarr; Block Program <code>AfterFX.exe</code> and <code>Adobe Premiere Pro.exe</code>.</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveGuideModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200"
                  >
                    DONE
                  </button>
                </div>
              </div>
            )}

            {/* AE VERSION GUIDE MODAL */}
            {activeGuideModal === 'version' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
                  <Terminal className="h-4 w-4 text-white" />
                  <span>GUIDE // 04</span>
                </div>
                <h3 className="font-sans text-xl font-bold text-white">
                  AE Version Recommendation Matrix
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="rounded border border-white bg-[#141414] p-3 text-white">
                    <div className="font-bold flex items-center justify-between">
                      <span>After Effects 2024 (v24.6.2)</span>
                      <span className="bg-white text-black px-1.5 py-0.5 rounded text-[10px]">TOP CHOICE</span>
                    </div>
                    <p className="font-sans text-xs text-[#A1A1AA] mt-1">
                      Highest plugin stability across Boris FX Sapphire, Red Giant Particular, Deep Glow, and Flow. No crashing memory leaks.
                    </p>
                  </div>
                  <div className="rounded border border-[#1F1F1F] bg-black p-3 text-[#A1A1AA]">
                    <div className="text-white font-bold">After Effects 2025 (v25.1)</div>
                    <p className="font-sans text-xs text-[#71717A] mt-1">
                      Great for native 3D imports and AI rotoscope, but certain legacy C++ scripts need community updates.
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveGuideModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200"
                  >
                    CLOSE
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
