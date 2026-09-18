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
import { DISCORD_INVITE_URL } from '../lib/constants';

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
  host?: string;
  showDescription?: boolean;
}

interface SoftwareEntry {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  note?: string;
  releases: ReleaseItem[];
}

interface SectionCategory {
  id: string;
  name: string;
  subtitle: string;
  category?: string;
  description?: string;
  alertNotice?: string;
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
        count: 7,
        releases: [
          {
            id: 'ae-2026-v26-3',
            name: 'After Effects 2026 v26.3',
            version: '26.3',
            size: '3.42 GB',
            host: 'bzzhr.to',
            description: 'Latest After Effects v26.3 release with enhanced 3D workflow and rotoscope optimizations.',
            downloadUrl: 'https://bzzhr.to/fqlgpkm4t15a',
            tags: ['AE 2026', 'v26.3', 'LATEST'],
          },
          {
            id: 'ae-2026',
            name: 'After Effects 2026',
            version: '26.0',
            size: '3.38 GB',
            host: 'bzzhr.to',
            description: 'After Effects 2026 base release with native 3D imports and timeline acceleration.',
            downloadUrl: 'https://bzzhr.to/uuiu8aol7zpz',
            tags: ['AE 2026'],
          },
          {
            id: 'ae-2025-6',
            name: 'After Effects 2025.6',
            version: '25.6',
            size: '3.25 GB',
            host: 'bzzhr.to',
            description: 'Point release featuring multi-frame caching improvements and OpenColorIO updates.',
            downloadUrl: 'https://bzzhr.to/20s3e37me47a',
            tags: ['AE 2025.6'],
          },
          {
            id: 'ae-2024-4',
            name: 'After Effects 2024.4',
            version: '24.4',
            size: '3.12 GB',
            host: 'bzzhr.to',
            badge: 'RECOMMENDED',
            description: 'Most stable workhorse release. Universal compatibility with Sapphire, Continuum, and Trapcode.',
            downloadUrl: 'https://bzzhr.to/iptvfjz21gbu',
            tags: ['AE 2024.4', 'STABLE'],
          },
          {
            id: 'ae-2023',
            name: 'After Effects 2023',
            version: '23.6',
            size: '2.95 GB',
            host: 'bzzhr.to',
            description: 'Proven multi-frame rendering release for production setups and legacy project migration.',
            downloadUrl: 'https://bzzhr.to/x06gw1phzxw6',
            tags: ['AE 2023', 'MFR'],
          },
          {
            id: 'ae-2021',
            name: 'After Effects 2021',
            version: '21.0',
            size: '2.60 GB',
            host: 'bzzhr.to',
            description: 'Lightweight architecture with low RAM overhead, reliable for older Windows systems.',
            downloadUrl: 'https://bzzhr.to/52qjr9v4mfo1',
            tags: ['AE 2021', 'LIGHTWEIGHT'],
          },
          {
            id: 'ae-2020-v17-7',
            name: 'After Effects 2020 (v17.7)',
            version: '17.7',
            size: '2.38 GB',
            host: 'bzzhr.to',
            description: 'Classic single-frame rendering architecture. 100% backward compatible with legacy 32-bit plugins.',
            downloadUrl: 'https://bzzhr.to/q2f31xkc3d6s',
            tags: ['AE 2020', 'CLASSIC'],
          },
        ],
      },
      {
        id: 'premiere-pro',
        title: 'Premiere Pro',
        subtitle: 'Timeline NLE video editing standard',
        count: 6,
        releases: [
          {
            id: 'pr-2026-v26-3-2',
            name: 'Premiere Pro 2026 v26.3.2',
            version: '26.3.2',
            size: '11.8 GB',
            host: 'bzzhr.to',
            description: 'Latest Premiere Pro release with GPU timeline enhancements and multi-track audio cleanup.',
            downloadUrl: 'https://bzzhr.to/v68zho57qfh1',
            tags: ['PR 2026', 'v26.3.2', 'LATEST'],
          },
          {
            id: 'pr-2026',
            name: 'Premiere Pro 2026',
            version: '26.0.0',
            size: '11.4 GB',
            host: 'bzzhr.to',
            description: 'Premiere Pro 2026 base build with advanced color management and native neural filters.',
            downloadUrl: 'https://bzzhr.to/czgq15hqk56s',
            tags: ['PR 2026'],
          },
          {
            id: 'pr-2025-5',
            name: 'Premiere Pro 2025.5',
            version: '25.5.0',
            size: '11.2 GB',
            host: 'bzzhr.to',
            description: 'Point release with enhanced text-based editing, native AI speech clarity, and properties panel.',
            downloadUrl: 'https://bzzhr.to/a9l6uqtmht30',
            tags: ['PR 2025.5'],
          },
          {
            id: 'pr-2024',
            name: 'Premiere Pro 2024',
            version: '24.6.1',
            size: '10.8 GB',
            host: 'bzzhr.to',
            badge: 'RECOMMENDED',
            description: 'Rock-solid timeline stability for long-form multicam timelines and ProRes proxy workflows.',
            downloadUrl: 'https://bzzhr.to/03mweir8qock',
            tags: ['PR 2024', 'STABLE'],
          },
          {
            id: 'speech-to-text-2026',
            name: 'Speech to Text 2026',
            version: '2026',
            size: '7.1 GB',
            host: 'bzzhr.to',
            description: 'Offline speech recognition language packs for automated subtitle and caption generation.',
            downloadUrl: 'https://bzzhr.to/juiwlnb07ayk',
            tags: ['CAPTIONS', 'OFFLINE STT'],
          },
          {
            id: 'speech-to-text-2025',
            name: 'Speech to Text 2025',
            version: '2025',
            size: '6.8 GB',
            host: 'bzzhr.to',
            description: 'Offline speech-to-text language models compatible with Premiere Pro 2025 timeline transcription.',
            downloadUrl: 'https://bzzhr.to/6f1j0p8iujgx',
            tags: ['CAPTIONS', 'OFFLINE STT'],
          },
        ],
      },
      {
        id: 'media-encoder',
        title: 'Media Encoder',
        subtitle: 'Batch rendering queue & format converter',
        count: 7,
        releases: [
          {
            id: 'me-2026-v26-3-2',
            name: 'Media Encoder 2026 v26.3.2',
            version: '26.3.2',
            size: '1.55 GB',
            host: 'bzzhr.to',
            description: 'Latest Media Encoder release with enhanced multi-GPU export pipeline and AV1 hardware support.',
            downloadUrl: 'https://bzzhr.to/h67lgzp09vb1',
            tags: ['ME 2026', 'v26.3.2', 'LATEST'],
          },
          {
            id: 'me-2026',
            name: 'Media Encoder 2026',
            version: '26.0.0',
            size: '1.50 GB',
            host: 'bzzhr.to',
            description: 'Media Encoder 2026 base build with updated ProRes 4444 and HEVC codecs.',
            downloadUrl: 'https://bzzhr.to/3pkudyhilc1j',
            tags: ['ME 2026'],
          },
          {
            id: 'me-2025-6',
            name: 'Media Encoder 2025.6',
            version: '25.6.0',
            size: '1.45 GB',
            host: 'bzzhr.to',
            description: 'Point release with high-efficiency background queue rendering and color profile conversions.',
            downloadUrl: 'https://bzzhr.to/ksm9fih746x1',
            tags: ['ME 2025.6'],
          },
          {
            id: 'me-2024',
            name: 'Media Encoder 2024',
            version: '24.6.0',
            size: '1.38 GB',
            host: 'bzzhr.to',
            badge: 'RECOMMENDED',
            description: 'Stable batch rendering daemon for Premiere Pro timelines and After Effects dynamic links.',
            downloadUrl: 'https://bzzhr.to/crbx8in1fc2o',
            tags: ['ME 2024', 'STABLE'],
          },
          {
            id: 'me-2023',
            name: 'Media Encoder 2023',
            version: '23.6.0',
            size: '1.25 GB',
            host: 'bzzhr.to',
            description: 'Proven rendering engine with lightweight background daemon footprint.',
            downloadUrl: 'https://bzzhr.to/tri52an6t776',
            tags: ['ME 2023'],
          },
          {
            id: 'me-2021',
            name: 'Media Encoder 2021',
            version: '21.0.0',
            size: '1.10 GB',
            host: 'bzzhr.to',
            description: 'Classic release with minimal RAM overhead, reliable for older Windows workstations.',
            downloadUrl: 'https://bzzhr.to/2rc8k4w6ceer',
            tags: ['ME 2021'],
          },
          {
            id: 'me-2020',
            name: 'Media Encoder 2020',
            version: '20.0.0',
            size: '980 MB',
            host: 'bzzhr.to',
            description: 'Classic Media Encoder build with legacy codec support and low memory footprint.',
            downloadUrl: 'https://bzzhr.to/1utlttzeudap',
            tags: ['ME 2020'],
          },
        ],
      },
      {
        id: 'photoshop',
        title: 'Photoshop',
        subtitle: 'Raster graphics, thumbnails & digital painting',
        count: 4,
        releases: [
          {
            id: 'ps-2026-v27-0',
            name: 'Photoshop 2026 (v27.0)',
            version: '27.0.0',
            size: '4.45 GB',
            host: 'bzzhr.to',
            description: 'Photoshop 2026 v27.0 base release with neural filters, distraction removal, and generative canvas.',
            downloadUrl: 'https://bzzhr.to/aiij69viodlj',
            tags: ['PS 2026', 'v27.0'],
          },
          {
            id: 'ps-2025-v26-11',
            name: 'Photoshop 2025 (v26.11)',
            version: '26.11.0',
            size: '4.20 GB',
            host: 'bzzhr.to',
            description: 'Photoshop 2025 v26.11 release with advanced HDR color profiles and high-efficiency layer rendering.',
            downloadUrl: 'https://bzzhr.to/lgkxhiseo1af',
            tags: ['PS 2025', 'v26.11'],
          },
          {
            id: 'ps-2024',
            name: 'Photoshop 2024',
            version: '25.12.0',
            size: '3.88 GB',
            host: 'bzzhr.to',
            badge: 'RECOMMENDED',
            description: 'Tested offline workhorse for YouTube thumbnail composition, poster art, and texture maps.',
            downloadUrl: 'https://bzzhr.to/6bgkk54t858z',
            tags: ['PS 2024', 'STABLE'],
          },
          {
            id: 'ps-2026-v27-9-1',
            name: 'Photoshop 2026 v27.9.1',
            version: '27.9.1',
            size: '4.52 GB',
            host: 'bzzhr.to',
            badge: 'LATEST',
            description: 'Latest Photoshop 2026 v27.9.1 build with performance optimizations and improved selection tools.',
            downloadUrl: 'https://bzzhr.to/mpnlkavt7bg5',
            tags: ['PS 2026', 'v27.9.1', 'LATEST'],
          },
        ],
      },
      {
        id: 'substance-3d',
        title: 'Substance 3D',
        subtitle: 'PBR texturing, material design & 3D sculpting',
        count: 3,
        releases: [
          {
            id: 'substance-designer-15-1-2',
            name: 'Substance 3D Designer 15.1.2',
            version: '15.1.2',
            size: '850 MB',
            host: 'bzzhr.to',
            description: 'Industry-standard parametric material authoring and procedural PBR texture node pipeline.',
            downloadUrl: 'https://bzzhr.to/vowxcba31zlh',
            tags: ['SUBSTANCE', 'DESIGNER', 'PBR'],
          },
          {
            id: 'substance-painter-11-1-2',
            name: 'Substance 3D Painter 11.1.2',
            version: '11.1.2',
            size: '2.45 GB',
            host: 'bzzhr.to',
            description: 'Real-time 3D painting suite with smart materials, physical brush dynamics, and 8K UDIM export.',
            downloadUrl: 'https://bzzhr.to/4f1bbq8igcty',
            tags: ['SUBSTANCE', 'PAINTER', '3D TEXTURING'],
          },
          {
            id: 'substance-modeler-1-22-6',
            name: 'Substance 3D Modeler 1.22.6',
            version: '1.22.6',
            size: '1.10 GB',
            host: 'bzzhr.to',
            description: 'Intuitive multi-device 3D sculpting and asset modeling with digital clay gestures.',
            downloadUrl: 'https://bzzhr.to/9wd22sn79dps',
            tags: ['SUBSTANCE', 'MODELER', 'SCULPTING'],
          },
        ],
      },
      {
        id: 'other-adobe',
        title: 'Other Adobe',
        subtitle: 'Vector, audio, layout & document authoring tools',
        count: 8,
        releases: [
          {
            id: 'adobe-animate-2024-0-12',
            name: 'Adobe Animate 2024.0.12',
            version: '2024.0.12',
            size: '2.45 GB',
            host: 'bzzhr.to',
            description: '2D vector animation suite for web, games, HTML5 Canvas, and dynamic digital banners.',
            downloadUrl: 'https://bzzhr.to/0qu3sqy3fuly',
            tags: ['ANIMATE', '2D', 'HTML5'],
          },
          {
            id: 'audition-2025-3',
            name: 'Audition 2025.3',
            version: '2025.3',
            size: '720 MB',
            host: 'bzzhr.to',
            description: 'Dedicated spectral frequency audio cleanup, de-noising, podcast mastering, and multitrack editing.',
            downloadUrl: 'https://bzzhr.to/dgsdz7m6ss70',
            tags: ['AUDITION', 'SPECTRAL', 'AUDIO'],
          },
          {
            id: 'illustrator-2026',
            name: 'Illustrator 2026',
            version: '2026',
            size: '2.25 GB',
            host: 'bzzhr.to',
            description: 'Vector graphics and typography design platform with GPU acceleration and Overlord bridge.',
            downloadUrl: 'https://bzzhr.to/2xtftf0wlpmg',
            tags: ['ILLUSTRATOR', 'VECTOR'],
          },
          {
            id: 'incopy-2026',
            name: 'InCopy 2026',
            version: '2026',
            size: '980 MB',
            host: 'bzzhr.to',
            description: 'Collaborative word processing and editorial integration with InDesign publication teams.',
            downloadUrl: 'https://bzzhr.to/tw6vul0bnvc0',
            tags: ['INCOPY', 'EDITORIAL'],
          },
          {
            id: 'indesign-2026',
            name: 'InDesign 2026',
            version: '2026',
            size: '1.60 GB',
            host: 'bzzhr.to',
            description: 'Page layout and desktop publishing standard for magazines, brochures, digital books, and PDFs.',
            downloadUrl: 'https://bzzhr.to/e1bbgqmtnedu',
            tags: ['INDESIGN', 'LAYOUT', 'PUBLISHING'],
          },
          {
            id: 'lightroom-classic-2026-v15-1-1',
            name: 'Lightroom Classic 2026 v15.1.1',
            version: '15.1.1',
            size: '1.85 GB',
            host: 'bzzhr.to',
            description: 'Desktop RAW photo development, lens corrections, and library organization for photographers.',
            downloadUrl: 'https://bzzhr.to/r82un320t3uj',
            tags: ['LIGHTROOM', 'RAW', 'PHOTO'],
          },
          {
            id: 'illustrator-2026-v30-7',
            name: 'Illustrator 2026 v30.7',
            version: '30.7',
            size: '2.30 GB',
            host: 'bzzhr.to',
            description: 'Point release with enhanced vector smoothing, mockups generator, and SVG export reliability.',
            downloadUrl: 'https://bzzhr.to/2xtftf0wlpmg',
            tags: ['ILLUSTRATOR', 'v30.7'],
          },
          {
            id: 'lightroom-classic-2026-v15-5',
            name: 'Lightroom Classic 2026 v15.5',
            version: '15.5',
            size: '1.92 GB',
            host: 'bzzhr.to',
            badge: 'LATEST',
            description: 'Latest Lightroom Classic v15.5 build with GPU catalog indexing and AI denoise enhancements.',
            downloadUrl: 'https://bzzhr.to/ty7g7bqxtxv7',
            tags: ['LIGHTROOM', 'v15.5', 'LATEST'],
          },
        ],
      },
    ],
  },
  {
    id: 'video',
    name: 'Video',
    subtitle: 'Video Editing',
    apps: [
      {
        id: 'davinci-resolve',
        title: 'DaVinci Resolve',
        subtitle: 'Industry-standard color grading, Fairlight audio & Fusion VFX',
        count: 2,
        releases: [
          {
            id: 'dvr-studio-v21-0-4',
            name: 'DaVinci Resolve Studio v21.0.4',
            version: '21.0.4',
            size: '5.20 GB',
            host: 'bzzhr.to',
            badge: 'LATEST',
            description: 'Studio edition featuring neural engine AI tools, magic mask, voice isolation, and multi-GPU acceleration.',
            downloadUrl: 'https://bzzhr.to/egvfmhstz12z',
            tags: ['RESOLVE 21', 'STUDIO', 'COLOR', 'FUSION'],
          },
          {
            id: 'dvr-patcher',
            name: 'Davinci Resolve Patcher',
            version: '21.x',
            size: '45 MB',
            host: 'bzzhr.to',
            description: 'Standalone utility patcher for unlocking full Studio features and OFX hardware acceleration.',
            downloadUrl: 'https://bzzhr.to/ios8bboxysnu',
            tags: ['RESOLVE', 'PATCHER', 'UTILITY'],
          },
        ],
      },
      {
        id: 'vegas-pro',
        title: 'Vegas Pro',
        subtitle: 'High-speed timeline editing and creative audio-visual sequencing',
        count: 4,
        releases: [
          {
            id: 'magix-vegas-v23',
            name: 'MAGIX VEGAS Pro v23.0.0.278 Incl Emulator-R2R',
            version: '23.0.0.278',
            size: '680 MB',
            host: 'bzzhr.to',
            description: 'MAGIX VEGAS Pro 23 release including emulator by team R2R with AI speech clarity and timeline fixes.',
            downloadUrl: 'https://bzzhr.to/hah37wkai3ed',
            tags: ['VEGAS 23', 'R2R', 'EMULATOR'],
          },
          {
            id: 'magix-vegas-deep-learning-r2r',
            name: 'MAGIX VEGAS Pro Deep Learning Model.v23.1.0.1-R2R',
            version: '23.1.0.1',
            size: '1.45 GB',
            host: 'bzzhr.to',
            description: 'Deep learning neural models for VEGAS Pro 23 AI smart mask, style transfer, and vocal isolation.',
            downloadUrl: 'https://bzzhr.to/e1znx52jptiu',
            tags: ['DEEP LEARNING', 'AI MODELS', 'R2R'],
          },
          {
            id: 'borisfx-vegas-2026',
            name: 'BorisFX VEGAS Pro 2026.0.3',
            version: '2026.0.3',
            size: '420 MB',
            host: 'bzzhr.to',
            description: 'BorisFX visual effects, mocha tracking, and lens flare integration customized for VEGAS timelines.',
            downloadUrl: 'https://bzzhr.to/7huv9q7eb4gz',
            tags: ['BORIS FX', 'MOCHA', 'EFFECTS'],
          },
          {
            id: 'vegas-pro-deep-learning-standalone',
            name: 'Vegas Pro Deep Learning Model 23.1.0.1',
            version: '23.1.0.1',
            size: '1.40 GB',
            host: 'Pending mirror',
            description: 'Standalone installer package for Vegas Pro deep learning weights and neural models.',
            downloadUrl: 'https://bzzhr.to/e1znx52jptiu',
            tags: ['DEEP LEARNING', 'PENDING MIRROR'],
          },
        ],
      },
      {
        id: 'capcut',
        title: 'CapCut',
        subtitle: 'Fast social media video editor with auto-captions and viral transitions',
        count: 1,
        releases: [
          {
            id: 'capcut-4-3-0-1694',
            name: 'CapCut 4.3.0.1694',
            version: '4.3.0.1694',
            size: '650 MB',
            host: 'bzzhr.to',
            description: 'Desktop edition with automatic subtitle transcription, optical flow slow-motion, and pro transitions.',
            downloadUrl: 'https://bzzhr.to/uz488j7o4dhl',
            tags: ['CAPCUT', 'AUTO-CAPTIONS'],
          },
        ],
      },
      {
        id: 'avid-media-composer',
        title: 'Avid Media Composer',
        subtitle: 'Hollywood feature film & broadcast standard non-linear editorial suite',
        count: 1,
        releases: [
          {
            id: 'avid-mc-25-12-1',
            name: 'Avid Media Composer 25.12.1',
            version: '25.12.1',
            size: '3.85 GB',
            host: 'bzzhr.to',
            description: 'Industry-standard shared storage workflows, PhraseFind AI phonetic index, and Symphony color grading.',
            downloadUrl: 'https://bzzhr.to/v9ejystvvwhr',
            tags: ['AVID', 'BROADCAST', 'v25.12.1'],
          },
        ],
      },
    ],
  },
  {
    id: 'creative',
    name: 'Creative',
    subtitle: 'Creative & 3D',
    apps: [
      {
        id: 'cinema-4d',
        title: 'Cinema 4D',
        subtitle: 'Professional 3D motion graphics, VFX & procedural simulation',
        count: 1,
        releases: [
          {
            id: 'c4d-2026-0',
            name: 'Cinema 4D 2026.0',
            version: '2026.0',
            size: '2.95 GB',
            host: 'bzzhr.to',
            description: 'Next-gen Cinema 4D with GPU Pyro simulation, Redshift integration, and MoGraph cloner toolset.',
            downloadUrl: 'https://bzzhr.to/nwwgel5kyy60',
            tags: ['C4D 2026', 'MOGRAPH', 'REDSHIFT'],
          },
        ],
      },
      {
        id: 'blender',
        title: 'Blender',
        subtitle: 'Free and open-source complete 3D animation creation suite',
        count: 1,
        releases: [
          {
            id: 'blender-official',
            name: 'Blender',
            version: '4.x',
            size: '345 MB',
            host: 'blender.org',
            badge: 'FREE & OPEN SOURCE',
            description: 'Cycles GPU path tracer, EEVEE realtime engine, and Geometry Nodes procedural modeling pipeline.',
            downloadUrl: 'https://www.blender.org/download/',
            tags: ['OPEN SOURCE', 'CYCLES', 'EEVEE'],
          },
        ],
      },
      {
        id: 'touchdesigner',
        title: 'TouchDesigner',
        subtitle: 'Node-based visual development platform for real-time interactive multimedia',
        count: 1,
        releases: [
          {
            id: 'touchdesigner-pro-2023-12230',
            name: 'TouchDesigner Pro 2023.12230',
            version: '2023.12230',
            size: '1.20 GB',
            host: 'bzzhr.to',
            description: 'Real-time interactive multimedia engine, generative visuals, Python scripting, and live projection mapping.',
            downloadUrl: 'https://bzzhr.to/mddxz9q64926',
            tags: ['TOUCHDESIGNER', 'PRO', 'REALTIME'],
          },
        ],
      },
      {
        id: 'marvelous-designer',
        title: 'Marvelous Designer',
        subtitle: 'Dynamic 3D cloth simulation and virtual fashion garment design suite',
        count: 1,
        releases: [
          {
            id: 'marvelous-designer-ent-2025-2-81',
            name: 'Marvelous Designer Enterprise 2025.2.81',
            version: '2025.2.81',
            size: '1.85 GB',
            host: 'bzzhr.to',
            description: 'Realistic 3D fabric physics, pattern making, avatar fitting, and high-fidelity cloth animation.',
            downloadUrl: 'https://bzzhr.to/vyil11dtottj',
            tags: ['MARVELOUS', 'CLOTH', 'ENTERPRISE'],
          },
        ],
      },
      {
        id: 'clip-studio-paint',
        title: 'Clip Studio Paint',
        subtitle: 'Digital illustration, manga drawing, comic art & 2D frame animation',
        count: 1,
        releases: [
          {
            id: 'clip-studio-paint-ex-5-0-4',
            name: 'Clip Studio Paint EX 5.0.4',
            version: '5.0.4',
            size: '480 MB',
            host: 'bzzhr.to',
            description: 'Flagship digital drawing software with vector line art, multi-page manga tools, and cel animation.',
            downloadUrl: 'https://bzzhr.to/bofi9gbx17tk',
            tags: ['CLIP STUDIO', 'EX', 'ILLUSTRATION'],
          },
        ],
      },
    ],
  },
  {
    id: 'audio',
    name: 'Audio',
    subtitle: 'Audio & Music',
    apps: [
      {
        id: 'fl-studio',
        title: 'FL Studio',
        subtitle: 'Digital audio workstation & virtual synthesizer suite',
        count: 3,
        releases: [
          {
            id: 'fl-studio-v25-1-6',
            name: 'FL Studio v25.1.6 Build 4997 Rev1',
            version: '25.1.6',
            size: '1.25 GB',
            host: 'bzzhr.to',
            description: 'Pattern-based music production DAW with native stem separation and audio clips pitch shifter.',
            downloadUrl: 'https://bzzhr.to/x249ym1o30c8',
            tags: ['FL STUDIO', 'DAW', 'BEATMAKING'],
          },
          {
            id: 'xfer-serum-v2-0-20',
            name: 'Xfer Records Serum v2.0.20',
            version: '2.0.20',
            size: '180 MB',
            host: 'bzzhr.to',
            description: 'Advanced wavetable synthesizer with real-time wavetable editing, ultra-clean oscillators, and built-in effects.',
            downloadUrl: 'https://bzzhr.to/j6cda2nfndcx',
            tags: ['XFER', 'SERUM', 'WAVETABLE', 'SYNTH'],
          },
          {
            id: 'fl-studio-producer-v26-1-4-5589',
            name: 'FL Studio Producer Edition v26.1.4.5589',
            version: '26.1.4.5589',
            size: '1.30 GB',
            host: 'bzzhr.to',
            description: 'FL Studio Producer Edition with full audio recording, playlist automation, and Edison audio editor.',
            downloadUrl: 'https://bzzhr.to/xjhcvznkt4lc',
            tags: ['FL STUDIO', 'PRODUCER', 'v26.1.4'],
          },
        ],
      },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    subtitle: 'AI & Utilities',
    apps: [
      {
        id: 'topaz-labs',
        title: 'Topaz Labs',
        subtitle: '',
        count: 2,
        note: 'Universal activators — patches the latest installed version automatically.',
        releases: [
          {
            id: 'topaz-video-v1-7-0',
            name: 'Topaz Video v1.7.0',
            version: '1.7.0',
            size: '',
            host: 'bzzhr.to',
            description: 'AI video enhancement and neural upscaling utility.',
            downloadUrl: 'https://bzzhr.to/qel2ta4zwck2',
            tags: ['TOPAZ', 'VIDEO', 'AI'],
          },
          {
            id: 'topaz-gigapixel-pro-v1-3-4',
            name: 'Topaz Gigapixel Pro v1.3.4',
            version: '1.3.4',
            size: '',
            host: 'bzzhr.to',
            description: 'Deep learning photo and texture enlargement up to 600% resolution.',
            downloadUrl: 'https://bzzhr.to/xsfwm7c1pffi',
            tags: ['TOPAZ', 'GIGAPIXEL', 'AI IMAGE'],
          },
        ],
      },
      {
        id: 'other-tools',
        title: 'Other Tools',
        subtitle: '',
        count: 3,
        releases: [
          {
            id: 'flowframes',
            name: 'Flowframes',
            version: '1.40.0',
            size: '',
            host: 'nmkd.itch.io',
            showDescription: true,
            description:
              'Official free Windows builds on itch.io. Newer early-access builds may be paid; no native macOS build is advertised.',
            downloadUrl: 'https://nmkd.itch.io/flowframes',
            tags: ['FLOWFRAMES', 'INTERPOLATION', 'RIFE'],
          },
          {
            id: 'handbrake',
            name: 'HandBrake',
            version: '1.9.1',
            size: '',
            host: 'handbrake.fr',
            description: 'Open-source multi-threaded batch video transcoder for AV1, HEVC, and H.264.',
            downloadUrl: 'https://handbrake.fr/downloads.php',
            tags: ['HANDBRAKE', 'TRANSCODER', 'OPEN SOURCE'],
          },
          {
            id: 'cinedream-v1-1-8',
            name: 'CineDream v1.1.8',
            version: '1.1.8',
            size: '',
            host: 'bzzhr.to',
            description: 'Cinematic color profile emulation and grading utilities for creators.',
            downloadUrl: 'https://bzzhr.to/ks9logvr3jjf',
            tags: ['CINEDREAM', 'COLOR', 'LUT'],
          },
        ],
      },
    ],
  },
  {
    id: 'vfx-suites',
    name: 'VFX Suites',
    subtitle: 'VFX Suites',
    category: 'AE Plugins',
    description: "All plugins target After Effects. Some also support Premiere Pro — check the developer's site for compatibility.",
    apps: [
      {
        id: 'borisfx',
        title: 'BorisFX',
        subtitle: '',
        count: 7,
        releases: [
          {
            id: 'borisfx-continuum-ae-2026-5',
            name: 'BorisFX Continuum AE 2026.5 v19.5.6',
            version: '2026.5',
            size: '',
            host: 'bzzhr.to',
            description: 'Comprehensive VFX, titling, and motion graphics plugin package for After Effects.',
            downloadUrl: 'https://bzzhr.to/8dh55mzfiwa2',
            tags: ['CONTINUUM', 'AE 2026.5', 'BORISFX'],
          },
          {
            id: 'borisfx-continuum-ae-v19-0-1',
            name: 'BorisFX Continuum AE v19.0.1',
            version: '19.0.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Continuum 2026 Adobe visual effects suite release v19.0.1.',
            downloadUrl: 'https://bzzhr.to/r3nsuhz2b7r8',
            tags: ['CONTINUUM', 'v19.0.1', 'BORISFX'],
          },
          {
            id: 'borisfx-sapphire-ae-2026-52',
            name: 'BorisFX Sapphire AE 2026.52',
            version: '2026.52',
            size: '',
            host: 'bzzhr.to',
            description: 'Sapphire legendary visual effects suite for After Effects with modern GPU acceleration.',
            downloadUrl: 'https://bzzhr.to/abwjnnxgbty4',
            tags: ['SAPPHIRE', 'AE 2026.52', 'BORISFX'],
          },
          {
            id: 'borisfx-sapphire-ae-2026-0',
            name: 'BorisFX Sapphire AE 2026.0',
            version: '2026.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Sapphire AE release 2026.0 with advanced glows, lens flares, and optical effects.',
            downloadUrl: 'https://bzzhr.to/iimft8js66zd',
            tags: ['SAPPHIRE', '2026.0', 'BORISFX'],
          },
          {
            id: 'borisfx-mocha-pro-2026-0-1',
            name: 'BorisFX Mocha Pro 2026.0.1',
            version: '2026.0.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Planar tracking, rotoscoping, object removal, and camera stabilization plugin.',
            downloadUrl: 'https://bzzhr.to/m2qt7265suh1',
            tags: ['MOCHA PRO', 'PLANAR TRACK', '2026.0.1'],
          },
          {
            id: 'borisfx-silhouette-2025-5-1',
            name: 'BorisFX Silhouette 2025.5.1',
            version: '2025.5.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Academy Award-winning non-destructive paint and advanced rotoscoping suite.',
            downloadUrl: 'https://bzzhr.to/g5a8uz5ez4mg',
            tags: ['SILHOUETTE', 'PAINT', 'ROTO', '2025.5.1'],
          },
          {
            id: 'borisfx-silhouette-2026-0-4',
            name: 'BorisFX Silhouette 2026.0.4',
            version: '2026.0.4',
            size: '',
            host: 'bzzhr.to',
            description: 'Latest Silhouette release 2026.0.4 with enhanced multi-frame tracking and paint.',
            downloadUrl: 'https://bzzhr.to/p5kil1w38kng',
            tags: ['SILHOUETTE', 'PAINT', 'ROTO', '2026.0.4'],
          },
        ],
      },
      {
        id: 'maxon',
        title: 'Maxon',
        subtitle: '',
        count: 3,
        note: 'Magic Bullet Suite, Trapcode Suite, VFX Suite, and Universe.',
        releases: [
          {
            id: 'redgiant-v2026-5-1',
            name: 'RedGiant v2026.5.1',
            version: '2026.5.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Red Giant complete suite update v2026.5.1 including Trapcode, Magic Bullet, and Universe.',
            downloadUrl: 'https://bzzhr.to/yuvsitffa8dy',
            tags: ['RED GIANT', 'v2026.5.1', 'MAXON'],
          },
          {
            id: 'redgiant-v2026-3-0',
            name: 'RedGiant v2026.3.0',
            version: '2026.3.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Red Giant visual effects and motion graphics suite release v2026.3.0.',
            downloadUrl: 'https://bzzhr.to/q9ci22l810ow',
            tags: ['RED GIANT', 'v2026.3.0', 'MAXON'],
          },
          {
            id: 'red-giant-keying-suite-11-1-9',
            name: 'Red Giant Keying Suite 11.1.9',
            version: '11.1.9',
            size: '',
            host: 'bzzhr.to',
            description: 'Complete keying solution for chroma key, spill removal, and matte cleanup inside After Effects.',
            downloadUrl: 'https://bzzhr.to/8wwo7x53n0l0',
            tags: ['KEYING SUITE', 'PRIMATTE', '11.1.9'],
          },
        ],
      },
      {
        id: 'revisionfx',
        title: 'RE:VisionFX',
        subtitle: '',
        count: 3,
        releases: [
          {
            id: 'twixtor-8-1-0',
            name: 'Twixtor 8.1.0',
            version: '8.1.0',
            size: '',
            host: 'bzzhr.to',
            description: '',
            downloadUrl: 'https://bzzhr.to/vmakbv83h7ge',
            tags: ['TWIXTOR', 'v8.1.0', 'SLOW MOTION'],
          },
          {
            id: 'revisionfx-bundle-25-08',
            name: 'RE:VisionFX Bundle 25.08',
            version: '25.08',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Full collection — RSMB 6.4.4, Twixtor 8.0.7 + Pro, and all other RE:VisionFX plugins.',
            downloadUrl: 'https://bzzhr.to/3dm93cpzc767',
            tags: ['RE:VISIONFX', 'BUNDLE 25.08', 'RSMB', 'TWIXTOR'],
          },
          {
            id: 'revisionfx-bundle-23-08',
            name: 'REVisionFX Bundle 23.08',
            version: '23.08',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Older build with RSMB 6.4.1 and Twixtor 7.5.5. Useful for matching legacy project versions.',
            downloadUrl: 'https://bzzhr.to/0gu4fp9g9ur7',
            tags: ['REVISIONFX', 'BUNDLE 23.08', 'LEGACY'],
          },
        ],
      },
    ],
  },
  {
    id: 'design-motion',
    name: 'Design & Motion',
    subtitle: 'Design & Motion',
    category: 'AE Plugins',
    apps: [
      {
        id: 'video-copilot',
        title: 'Video Copilot',
        subtitle: '',
        count: 8,
        releases: [
          {
            id: 'element-3d-2-2-3',
            name: 'Element 3D 2.2.3',
            version: '2.2.3',
            size: '',
            host: 'bzzhr.to',
            description: 'High-performance 3D object based particle rendering engine for After Effects.',
            downloadUrl: 'https://bzzhr.to/uf4ynrdgmczj',
            tags: ['ELEMENT 3D', 'v2.2.3', 'VIDEO COPILOT'],
          },
          {
            id: 'optical-flares-1-3-8',
            name: 'Optical Flares 1.3.8',
            version: '1.3.8',
            size: '',
            host: 'bzzhr.to',
            description: 'Custom lens flare studio with 3D tracking, chromatic aberration, and textures.',
            downloadUrl: 'https://bzzhr.to/f2jtjx18x0us',
            tags: ['OPTICAL FLARES', 'v1.3.8', 'VIDEO COPILOT'],
          },
          {
            id: 'heatdistortion',
            name: 'HeatDistortion',
            version: '1.0.32',
            size: '',
            host: 'bzzhr.to',
            description: 'Realistic heat haze, mirage waves, and turbulence distortion plugin.',
            downloadUrl: 'https://bzzhr.to/xtlayck4gcv1',
            tags: ['HEAT DISTORTION', 'VIDEO COPILOT'],
          },
          {
            id: 'pro-shaders-1',
            name: 'Pro Shaders 1',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Material pack for Element 3D: metals, glass, concrete, stone, and plastics.',
            downloadUrl: 'https://bzzhr.to/lhgfn43fmk8l',
            tags: ['PRO SHADERS', 'MATERIALS', 'E3D'],
          },
          {
            id: 'pro-shaders-2',
            name: 'Pro Shaders 2',
            version: '2.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Physical shader presets for Element 3D with 2K tileable textures and normal maps.',
            downloadUrl: 'https://bzzhr.to/57ywle6q0fh0',
            tags: ['PRO SHADERS 2', 'PHYSICAL SHADERS', 'E3D'],
          },
          {
            id: 'saber',
            name: 'Saber',
            version: '1.0.40',
            size: '',
            host: 'videocopilot.net',
            description: 'Free energy, laser, and light beam generator with dynamic glow falloff.',
            downloadUrl: 'https://www.videocopilot.net/tutorials/saber_plug-in/',
            tags: ['SABER', 'FREE', 'ENERGY GLOW'],
          },
          {
            id: 'twitch',
            name: 'Twitch',
            version: '1.2',
            size: '',
            host: 'bzzhr.to',
            description: 'Synchronized visual chaos operator: blur, color, light, scale, and time jumps.',
            downloadUrl: 'https://bzzhr.to/aan5j1zw2u5f',
            tags: ['TWITCH', 'GLITCH', 'CHAOS'],
          },
          {
            id: 'vc-color-vibrance',
            name: 'VC Color Vibrance',
            version: '1.0',
            size: '',
            host: 'videocopilot.net',
            description: 'Free colorization and alpha channel enhancement tool for stock footage and elements.',
            downloadUrl: 'https://www.videocopilot.net/tutorials/color_vibrance_plug-in/',
            tags: ['COLOR VIBRANCE', 'FREE', 'ALPHA'],
          },
        ],
      },
      {
        id: 'plugin-everything',
        title: 'Plugin Everything',
        subtitle: '',
        count: 11,
        releases: [
          {
            id: 'autofill-2-0-2',
            name: 'AutoFill 2.0.2',
            version: '2.0.2',
            size: '',
            host: 'bzzhr.to',
            description: 'Intelligent procedural growth and reveal animation generator for vector art, text, and masks.',
            downloadUrl: 'https://bzzhr.to/pmuo60w5h1le',
            tags: ['AUTOFILL', 'REVEAL', 'GROWTH'],
          },
          {
            id: 'cartoon-moblur-1-6-3',
            name: 'Cartoon Moblur 1.6.3',
            version: '1.6.3',
            size: '',
            host: 'bzzhr.to',
            description: 'Custom stylized cartoon motion blur with trail curves and smears.',
            downloadUrl: 'https://bzzhr.to/2j88mrqnz7rz',
            tags: ['CARTOON', 'MOBLUR', 'SMEAR'],
          },
          {
            id: 'deep-glow-2-1-1-0',
            name: 'Deep Glow 2 — 1.1.0',
            version: '1.1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Physically accurate inverse square falloff with high dynamic range dispersion.',
            downloadUrl: 'https://bzzhr.to/cluiylctua2t',
            tags: ['DEEP GLOW 2', 'v1.1.0', 'HDR'],
          },
          {
            id: 'deep-glow-1-6-6',
            name: 'Deep Glow 1.6.6',
            version: '1.6.6',
            size: '',
            host: 'bzzhr.to',
            description: 'Reliable v1 branch of the inverse square glow tool for classic AE workflows.',
            downloadUrl: 'https://bzzhr.to/fh8s78qclgun',
            tags: ['DEEP GLOW 1', 'v1.6.6', 'LEGACY'],
          },
          {
            id: 'discotext-1-2-6',
            name: 'DiscoText 1.2.6',
            version: '1.2.6',
            size: '',
            host: 'bzzhr.to',
            description: 'Direct trim paths and animated strokes along live text outlines.',
            downloadUrl: 'https://bzzhr.to/w6gdji3999g5',
            tags: ['DISCOTEXT', 'TRIM PATHS', 'TYPOGRAPHY'],
          },
          {
            id: 'displacer-pro-1-5-0',
            name: 'Displacer Pro 1.5.0',
            version: '1.5.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Advanced GPU displacement map plugin with chromatic aberration and rotation.',
            downloadUrl: 'https://bzzhr.to/w23lu66nzjr8',
            tags: ['DISPLACER PRO', 'DISPLACEMENT', 'GPU'],
          },
          {
            id: 'extrude',
            name: 'Extrude',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Fast 2.5D layer extrusion and depth shading engine inside After Effects.',
            downloadUrl: 'https://bzzhr.to/vc8ge1uo68cl',
            tags: ['EXTRUDE', 'DEPTH', '3D'],
          },
          {
            id: 'shadow-studio-3-1-0-7',
            name: 'Shadow Studio 3 — 1.0.7',
            version: '1.0.7',
            size: '',
            host: 'bzzhr.to',
            description: 'Raytraced soft shadows, inner shadows, raycasted directional illumination, and 3D diffuse.',
            downloadUrl: 'https://bzzhr.to/2kb6qqi80hrg',
            tags: ['SHADOW STUDIO 3', 'RAYTRACE', 'DIFFUSE'],
          },
          {
            id: 'textbox-2-1-2',
            name: 'TextBox 2 — 1.2',
            version: '1.2',
            size: '',
            host: 'bzzhr.to',
            description: 'Auto-adjusting background shapes, padding, borders, and highlights around live text.',
            downloadUrl: 'https://bzzhr.to/oe0pivlm1ur0',
            tags: ['TEXTBOX 2', 'AUTO RESIZE', 'TITLING'],
          },
          {
            id: 'textdelay-1-7-5',
            name: 'TextDelay 1.7.5',
            version: '1.7.5',
            size: '',
            host: 'bzzhr.to',
            description: 'Precise staggered character, word, and line delay typography animator.',
            downloadUrl: 'https://bzzhr.to/95trcv4719zn',
            tags: ['TEXTDELAY', 'STAGGER', 'TYPOGRAPHY'],
          },
          {
            id: 'quick-chromatic-aberration-3',
            name: 'Quick Chromatic Aberration 3',
            version: '3.0',
            size: '',
            host: 'plugineverything.gumroad.com',
            description: 'Free, fast, and optical chromatic aberration and lens dispersion effect.',
            downloadUrl: 'https://plugineverything.gumroad.com/l/qca3',
            tags: ['QCA3', 'CHROMATIC', 'FREE'],
          },
        ],
      },
      {
        id: 'bao',
        title: 'BAO',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'bao-plugins-bundle-2025-5',
            name: 'BAO Plugins Bundle 2025.5',
            version: '2025.5',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Boa v1.6.0, Bones v1.5.10, Distortion Selector v2.4, Dynamic Comp v2.7, Joint v1.0.4, Layer Sculptor v1.2.3, Mask 3D Warper v1.6.2, Mask Avenger v2.7.5, Mask Brush v1.9.18, Perspective Changer v1.2.',
            downloadUrl: 'https://bzzhr.to/lf373vptfi11',
            tags: ['BAO', 'BUNDLE 2025.5', 'BOA', 'BONES'],
          },
        ],
      },
      {
        id: 'mettle',
        title: 'Mettle',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'mettle-plugins-bundle-2024-2',
            name: 'Mettle Plugins Bundle 2024.2',
            version: '2024.2',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Flux v1.16, FreeForm Pro 2024, Mantra v2.25, ShapeShifter 2024.',
            downloadUrl: 'https://bzzhr.to/gxa5d71pqj0g',
            tags: ['METTLE', 'FREEFORM PRO', 'FLUX', 'MANTRA'],
          },
        ],
      },
      {
        id: 'crossphere',
        title: 'Crossphere',
        subtitle: '',
        count: 2,
        releases: [
          {
            id: 'crossphere-plugins-bundle',
            name: 'Crossphere Plugins Bundle',
            version: '1.4.0',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Bokeh v1.4.0, Fractal Noise 3D v1.5.4, PixelBlend Accelerator v1.2.3, Power Cylinder v1.1.6, Power Droste v1.0.0, Power Hyperboloid v1.0.2, Power Sphere v1.1.9.',
            downloadUrl: 'https://bzzhr.to/s0r0uahskbkw',
            tags: ['CROSSPHERE', 'BUNDLE', 'POWER SPHERE'],
          },
          {
            id: 'bokeh-1-4-1',
            name: 'Bokeh 1.4.1',
            version: '1.4.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Standalone update over bundle version.',
            downloadUrl: 'https://bzzhr.to/fisthibn34p4',
            tags: ['BOKEH', 'v1.4.1', 'DEPTH OF FIELD'],
          },
        ],
      },
      {
        id: 'productioncrate',
        title: 'ProductionCrate',
        subtitle: '',
        count: 3,
        releases: [
          {
            id: 'productioncrate-laforge-suite-1-4-8-1',
            name: 'ProductionCrate LaForge Suite 1.4.8.1',
            version: '1.4.8.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: '25+ ProductionCrate plugins.',
            downloadUrl: 'https://bzzhr.to/nzyak5410twt',
            tags: ['PRODUCTIONCRATE', 'LAFORGE', 'SUITE 1.4.8.1'],
          },
          {
            id: 'crates-godrays-lightwrap',
            name: 'Crates Godrays & Lightwrap',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Volumetric godrays, light shafts, and realistic edge lightwrap blend.',
            downloadUrl: 'https://bzzhr.to/ya9wn53vdkfe',
            tags: ['GODRAYS', 'LIGHTWRAP', 'PRODUCTIONCRATE'],
          },
          {
            id: 'laforge-suite-1-4-8-1-mirror',
            name: 'LaForge Suite 1.4.8.1',
            version: '1.4.8.1',
            size: '',
            host: 'buzzheavier.com',
            showDescription: true,
            description: '25+ ProductionCrate plugins.',
            downloadUrl: 'https://buzzheavier.com/nzyak5410twt',
            tags: ['LAFORGE', 'BUZZHEAVIER', 'MIRROR'],
          },
        ],
      },
      {
        id: 'elementsupply-co',
        title: 'ElementSupply Co',
        subtitle: '',
        count: 2,
        releases: [
          {
            id: 'glitchify',
            name: 'Glitchify',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Procedural analog digital glitch, RGB split, scanlines, and sync corruption.',
            downloadUrl: 'https://bzzhr.to/k914jr2gbo0d',
            tags: ['GLITCHIFY', 'GLITCH', 'ELEMENTSUPPLY'],
          },
          {
            id: 'polytrace',
            name: 'Polytrace',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'High-speed polygon vector tracer and mesh generation engine.',
            downloadUrl: 'https://bzzhr.to/kqreoaxxgfgv',
            tags: ['POLYTRACE', 'VECTOR', 'MESH'],
          },
        ],
      },
    ],
  },
  {
    id: 'effects-creative',
    name: 'Effects & Creative',
    subtitle: 'Effects & Creative',
    category: 'AE Plugins',
    apps: [
      {
        id: 'zaebects',
        title: 'Zaebects',
        subtitle: '',
        count: 4,
        releases: [
          {
            id: 'jpeg-glitch-1-0-4',
            name: 'JPEG Glitch 1.0.4',
            version: '1.0.4',
            size: '',
            host: 'bzzhr.to',
            description: 'Simulates genuine JPEG compression artifacts, byte corruption, and quantization glitches.',
            downloadUrl: 'https://bzzhr.to/jpff6vzepm62',
            tags: ['JPEG GLITCH', 'ARTIFACTS', 'COMPRESSION'],
          },
          {
            id: 'modulation-2-1',
            name: 'Modulation 2.1',
            version: '2.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Analog video synth waveform modulation and CRT scanline displacement.',
            downloadUrl: 'https://bzzhr.to/dlmp8wpte0mx',
            tags: ['MODULATION', 'CRT', 'WAVEFORM'],
          },
          {
            id: 'physarum-v1-3',
            name: 'Physarum v1.3',
            version: '1.3',
            size: '',
            host: 'bzzhr.to',
            description: 'Organic slime mold network simulation and branching particle growth.',
            downloadUrl: 'https://bzzhr.to/jzt5y7rdaxtq',
            tags: ['PHYSARUM', 'SLIME MOLD', 'ORGANIC'],
          },
          {
            id: 'signal-1-2-3',
            name: 'Signal 1.2.3',
            version: '1.2.3',
            size: '',
            host: 'bzzhr.to',
            description: 'Authentic analog video signal degradation, VHS color bleeding, and tape dropouts.',
            downloadUrl: 'https://bzzhr.to/j4g86p8sgovs',
            tags: ['SIGNAL', 'VHS', 'ANALOG GLITCH'],
          },
        ],
      },
      {
        id: 'pixel-sorter-studio',
        title: 'Pixel Sorter Studio',
        subtitle: '',
        count: 2,
        releases: [
          {
            id: 'pixel-sorter-studio-bundle',
            name: 'Pixel Sorter Studio Bundle',
            version: '3.1.0',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Pixel Sorter 3.1.0 & 2.2, PixelGalactic 1.0.2, MotionMosh 1.2.2, MotionExtractor 1.0.0, MadPainter 1.1.0, HydroChrome 1.1.1, Glasswork 1.1.2, BallPoint 1.2.0.',
            downloadUrl: 'https://bzzhr.to/1w6ifna98w2y',
            tags: ['PIXEL SORTER', 'BUNDLE', 'MOTIONMOSH'],
          },
          {
            id: 'ballpoint-1-2-1',
            name: 'BallPoint 1.2.1',
            version: '1.2.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Crash fix — use this over the bundle version.',
            downloadUrl: 'https://bzzhr.to/3ujfpf4p8dp6',
            tags: ['BALLPOINT', 'CRASH FIX', 'v1.2.1'],
          },
        ],
      },
      {
        id: 'rowbyte',
        title: 'Rowbyte',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'rowbyte-plugins-bundle-2025-8',
            name: 'Rowbyte Plugins Bundle 2025.8',
            version: '2025.8',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Stipple 1.0.3, Plexus 3.2.9, Fast Bokeh 2.1.3, Buena Depth Cue 2.5.8, Aura 1.2.6, TVDistortion bundle — Data Glitch, Bad TV, TVPixel, Dot Pixels, Separate RGB.',
            downloadUrl: 'https://bzzhr.to/r1r84xolak13',
            tags: ['ROWBYTE', 'PLEXUS', 'FAST BOKEH', 'DATA GLITCH'],
          },
        ],
      },
      {
        id: 'satori',
        title: 'Satori',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'satori-bundle-250912-1',
            name: 'Satori Bundle 250912.1',
            version: '250912.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'Pixel Melt 1.0.1, Block Swap 1.5.1, Curve Tracer 1.1.0, Geometric Filter 1.2.0, Pixelocybe 1.3.0, Pixel Stretch 1.6.0, Recursive Mosaic 1.3.0, Split Blur 1.5.0, Time Bend 1.0.1.',
            downloadUrl: 'https://bzzhr.to/xvv12pxrony9',
            tags: ['SATORI', 'SPLIT BLUR', 'PIXEL MELT', 'BLOCK SWAP'],
          },
        ],
      },
      {
        id: 'irrealix',
        title: 'Irrealix',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'irrealix-bundle-260215',
            name: 'irrealix Bundle 260215',
            version: '260215',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'DustTransition, FreeGradient, Gaussian Splatting, LoopFlow, MosaicArt, Nebulosity, Potok, RekaGrid, Stretch, Volna.',
            downloadUrl: 'https://bzzhr.to/ik12gnyewoy3',
            tags: ['IRREALIX', 'VOLNA', 'LOOPFLOW', 'POTOK'],
          },
        ],
      },
      {
        id: 'andrewyang',
        title: 'AndrewYang',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'andrewyang-bundle-260215',
            name: 'AndrewYang Bundle 260215',
            version: '260215',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'YY_Ramp, YY_HexTex, YY_MagicKey, YY_ShockRing, YY_Voronoi.',
            downloadUrl: 'https://bzzhr.to/soknsu2lag9g',
            tags: ['ANDREWYANG', 'YY_RAMP', 'YY_VORONOI'],
          },
        ],
      },
      {
        id: 'bgra-entertainment',
        title: 'BGRA Entertainment',
        subtitle: '',
        count: 2,
        releases: [
          {
            id: 'l3tt3rm4pp3r2-v2-8',
            name: 'L3tt3rM4pp3r2 v2.8',
            version: '2.8',
            size: '',
            host: 'bzzhr.to',
            description: 'ASCII, text character matrix, and binary typography mapping generator.',
            downloadUrl: 'https://bzzhr.to/m7w5kvu1w6f4',
            tags: ['L3TT3RM4PP3R2', 'ASCII', 'TYPOGRAPHY'],
          },
          {
            id: 'retro-dither-1-10',
            name: 'Retro Dither 1.10',
            version: '1.10',
            size: '',
            host: 'bzzhr.to',
            description: 'Retro game console and vintage 1-bit to 8-bit color dithering emulation.',
            downloadUrl: 'https://bzzhr.to/m7w5kvu1w6f4',
            tags: ['RETRO DITHER', '8-BIT', 'DITHER'],
          },
        ],
      },
      {
        id: 'dragoy',
        title: 'Dragoy',
        subtitle: '',
        count: 2,
        releases: [
          {
            id: 'bevelizer-1-0-1',
            name: 'Bevelizer 1.0.1',
            version: '1.0.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Procedural custom 3D edge bevels, metallic chisels, and specular highlights.',
            downloadUrl: 'https://bzzhr.to/qf0z3t4mt01b',
            tags: ['BEVELIZER', 'BEVEL', '3D EDGES'],
          },
          {
            id: 'tracery-1-1',
            name: 'Tracery 1.1',
            version: '1.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Dynamic path tracing, connected vertex lines, and spline web generation.',
            downloadUrl: 'https://bzzhr.to/qf0z3t4mt01b',
            tags: ['TRACERY', 'v1.1', 'PATH TRACER'],
          },
        ],
      },
      {
        id: 'blace-plugins',
        title: 'Blace Plugins',
        subtitle: '',
        count: 3,
        releases: [
          {
            id: 'depth-scanner-v2-2-4-42',
            name: 'Depth Scanner v2 — 2.4.42',
            version: '2.4.42',
            size: '',
            host: 'bzzhr.to',
            description: 'AI-driven depth estimation from single monocular images and live action footage.',
            downloadUrl: 'https://bzzhr.to/jh67a0p73vuv',
            tags: ['DEPTH SCANNER', 'AI DEPTH', 'v2.4.42'],
          },
          {
            id: 'i-ate-mushrooms-6-24',
            name: 'I Ate Mushrooms 6.24',
            version: '6.24',
            size: '',
            host: 'bzzhr.to',
            description: 'Neural psychedelic dream generator, latent hallucinations, and morphing synthesis.',
            downloadUrl: 'https://bzzhr.to/dgbn4vde8hwu',
            tags: ['I ATE MUSHROOMS', 'NEURAL', 'DREAM'],
          },
          {
            id: 'mask-prompter-3-3-0-3',
            name: 'Mask Prompter 3 — 3.0.3',
            version: '3.0.3',
            size: '',
            host: 'bzzhr.to',
            description: 'AI point-and-box prompting segmentation and roto matte extraction.',
            downloadUrl: 'https://bzzhr.to/diaepi4qjea5',
            tags: ['MASK PROMPTER', 'AI ROTO', 'SAM'],
          },
        ],
      },
    ],
  },
  {
    id: 'color-enhancement',
    name: 'Color & Enhancement',
    subtitle: 'Color & Enhancement',
    category: 'AE Plugins',
    apps: [
      {
        id: 'filmconvert',
        title: 'FilmConvert',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'filmconvert-bundle',
            name: 'FilmConvert Bundle',
            version: '2025',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Nitrate, Cinematch, Hazy, and Halation.',
            downloadUrl: 'https://bzzhr.to/hn20ju0q0weh',
            tags: ['FILMCONVERT', 'NITRATE', 'CINEMATCH', 'HALATION'],
          },
        ],
      },
      {
        id: 'autokroma',
        title: 'AutoKroma',
        subtitle: '',
        count: 3,
        releases: [
          {
            id: 'autokroma-bundle-2025-7',
            name: 'Autokroma bundle 2025.7',
            version: '2025.7',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'AfterCodecs 1.20.0, BRAW Studio 3.3.8, PlumePack 2.4.6, Influx Premium 1.5.7.',
            downloadUrl: 'https://bzzhr.to/98sdyofbrlwz',
            tags: ['AUTOKROMA', 'AFTERCODECS', 'BRAW', 'INFLUX'],
          },
          {
            id: 'aftercodecs-1-12-1',
            name: 'AfterCodecs 1.12.1',
            version: '1.12.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: '2026 compatible.',
            downloadUrl: 'https://bzzhr.to/n2yvs4fe4qnt',
            tags: ['AFTERCODECS', 'PRORES', 'H264'],
          },
          {
            id: 'influx-1-6-1',
            name: 'Influx 1.6.1',
            version: '1.6.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: '2026 compatible.',
            downloadUrl: 'https://bzzhr.to/iv0q772fdmmk',
            tags: ['INFLUX', 'MKV', 'IMPORTER'],
          },
        ],
      },
      {
        id: 'baski',
        title: 'BASKI',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'baski-suite',
            name: 'BASKI Suite',
            version: '2025',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'AI Relight 1.1, AI Color Match Pro 1.3.4, AI Depth of Field 1.1, Diffusae 2.0.2, Quick Matte 1.0.2, Concept Buddy 1.0.9, Vision 1.0.1.',
            downloadUrl: 'https://bzzhr.to/pihtmo0kovz2',
            tags: ['BASKI', 'AI RELIGHT', 'DIFFUSAE', 'VISION'],
          },
        ],
      },
      {
        id: 'vimager',
        title: 'Vimager',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'vimager-bundle-1-6-60209',
            name: 'Vimager Bundle 1.6.60209',
            version: '1.6.60209',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'SpeedX, ScaleUp, StyleX, ContrastUp, ClearPlus, ColorX, DeepClear, FacePro.',
            downloadUrl: 'https://bzzhr.to/in7tiwdo0wev',
            tags: ['VIMAGER', 'SPEEDX', 'SCALEUP', 'CONTRASTUP'],
          },
        ],
      },
      {
        id: 'frischluft',
        title: 'Frischluft',
        subtitle: '',
        count: 1,
        releases: [
          {
            id: 'frischluft-bundle',
            name: 'Frischluft',
            version: '2025',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description:
              'FL Glow, Flair, Lenscare, Depth of Field, Amiga Rules, Box Blur, Glas Sphere, Mosaic Plane, Highlight, Radical Blur, Volumetrics, Out of Focus.',
            downloadUrl: 'https://bzzhr.to/1wxd5akbxflz',
            tags: ['FRISCHLUFT', 'FL GLOW', 'LENSCARE', 'DEPTH OF FIELD'],
          },
        ],
      },
    ],
  },
  {
    id: 'other-ae-plugins',
    name: 'Other AE Plugins',
    subtitle: 'Other AE Plugins',
    category: 'AE Plugins',
    apps: [
      {
        id: 'unsorted-ae-plugins',
        title: 'Unsorted',
        subtitle: '',
        count: 27,
        releases: [
          {
            id: 'bendio-1-0-1',
            name: 'Bendio 1.0.1',
            version: '1.0.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Bend any layer with custom curvature handles and pin deformation.',
            downloadUrl: 'https://bzzhr.to/x0aww4l2k67y',
            tags: ['BENDIO', 'BEND', 'DEFORM'],
          },
          {
            id: 'color-llama-1-1-0',
            name: 'Color Llama 1.1.0',
            version: '1.1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Intelligent color palettes, harmonic ramps, and automated grading sweeps.',
            downloadUrl: 'https://bzzhr.to/jbepolvsr0ka',
            tags: ['COLOR LLAMA', 'PALETTE', 'COLOR'],
          },
          {
            id: 'colour-scheme-generator',
            name: 'Colour Scheme Generator',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Procedural chromatic harmony, triadic generation, and swatch export.',
            downloadUrl: 'https://bzzhr.to/f19yigae6p1u',
            tags: ['COLOUR SCHEME', 'SWATCH', 'GENERATOR'],
          },
          {
            id: 'composite-brush-1-6-7',
            name: 'Composite Brush 1.6.7',
            version: '1.6.7',
            size: '',
            host: 'bzzhr.to',
            description: 'Precision color selection and interactive multi-point screen keying.',
            downloadUrl: 'https://bzzhr.to/sd2z1ycqr28e',
            tags: ['COMPOSITE BRUSH', 'KEYING', 'SELECTION'],
          },
          {
            id: 'cycorefx-bundle-1-3-2',
            name: 'CycoreFX Bundle 1.3.2',
            version: '1.3.2',
            size: '',
            host: 'bzzhr.to',
            description: 'Classic CC plugin enhancement collection with extended parameter precision.',
            downloadUrl: 'https://bzzhr.to/gj2qezka89ke',
            tags: ['CYCOREFX', 'CC PLUGINS', 'BUNDLE'],
          },
          {
            id: 'dehancerpro-7-3-4',
            name: 'DehancerPro 7.3.4',
            version: '7.3.4',
            size: '',
            host: 'bzzhr.to',
            description: 'Photochemical film emulation, true negative profiles, and bloom halation.',
            downloadUrl: 'https://bzzhr.to/iaez1g8culc6',
            tags: ['DEHANCERPRO', 'FILM EMULATION', 'GRAIN'],
          },
          {
            id: 'despill-maestro-1-0-0',
            name: 'Despill Maestro 1.0.0',
            version: '1.0.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Advanced green/blue spill suppressor with natural luminance preservation.',
            downloadUrl: 'https://bzzhr.to/uwa34hgfy41x',
            tags: ['DESPILL', 'KEYING', 'GREEN SCREEN'],
          },
          {
            id: 'digieffects-suite-v3-0-ce',
            name: 'DigiEffects Suite v3.0.CE',
            version: 'v3.0.CE',
            size: '',
            host: 'bzzhr.to',
            description: 'Damage, Delirium, Delerium, and vintage distortion legacy plugins suite.',
            downloadUrl: 'https://bzzhr.to/xjaqfe5bxtek',
            tags: ['DIGIEFFECTS', 'DAMAGE', 'DELIRIUM'],
          },
          {
            id: 'diopter-1-0-5',
            name: 'Diopter 1.0.5',
            version: '1.0.5',
            size: '',
            host: 'bzzhr.to',
            description: 'Split-diopter lens simulator creating simultaneous foreground and background focus.',
            downloadUrl: 'https://bzzhr.to/6pxuzd2npvys',
            tags: ['DIOPTER', 'SPLIT DIOPTER', 'FOCUS'],
          },
          {
            id: 'dust-transition-1-1-0',
            name: 'Dust Transition 1.1.0',
            version: '1.1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Disintegration, particle dusting, and organic particulate wipe transitions.',
            downloadUrl: 'https://bzzhr.to/5luisrk6z6gt',
            tags: ['DUST TRANSITION', 'PARTICLES', 'WIPE'],
          },
          {
            id: 'fluidmap',
            name: 'FluidMap',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'GPU fluid dynamics, smoke flow mapping, and liquid velocity fields.',
            downloadUrl: 'https://bzzhr.to/dhfht30lkgvv',
            tags: ['FLUIDMAP', 'FLUID', 'VELOCITY'],
          },
          {
            id: 'furikake-1-0-5',
            name: 'Furikake 1.0.5',
            version: '1.0.5',
            size: '',
            host: 'bzzhr.to',
            description: 'Generative noise seasoning, organic dot specks, and texture disperser.',
            downloadUrl: 'https://bzzhr.to/1qz50997agjn',
            tags: ['FURIKAKE', 'TEXTURE', 'SPECKS'],
          },
          {
            id: 'hitfilm-plugins',
            name: 'HitFilm Plugins',
            version: '2025',
            size: '',
            host: 'bzzhr.to',
            description: 'Visual effects suite including lens flares, muzzle flashes, and procedural distortions.',
            downloadUrl: 'https://bzzhr.to/qe8fswkpr9vs',
            tags: ['HITFILM', 'VFX', 'SUITE'],
          },
          {
            id: 'ignitepro-2021-1',
            name: 'IgnitePro 2021.1',
            version: '2021.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Adobe & OFX',
            downloadUrl: 'https://bzzhr.to/mom6iufvjil9',
            tags: ['IGNITEPRO', 'ADOBE & OFX', 'HITFILM'],
          },
          {
            id: 'lockdown-2-8-7',
            name: 'Lockdown 2.8.7',
            version: '2.8.7',
            size: '',
            host: 'bzzhr.to',
            description: 'Track warped and deforming non-rigid surfaces directly inside After Effects.',
            downloadUrl: 'https://bzzhr.to/i7891asevvol',
            tags: ['LOCKDOWN', 'WARP TRACK', 'SURFACE TRACK'],
          },
          {
            id: 'memleak-1-1-1',
            name: 'Memleak 1.1.1',
            version: '1.1.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Memory buffer glitching, RAM corruption emulation, and raw databent artifacts.',
            downloadUrl: 'https://bzzhr.to/pb1ev78oz31h',
            tags: ['MEMLEAK', 'BUFFER GLITCH', 'DATABENT'],
          },
          {
            id: 'neat-video-pro',
            name: 'Neat Video Pro',
            version: '5.6',
            size: '',
            host: 'bzzhr.to',
            description: 'Industry standard video noise and digital grain reduction filter plugin.',
            downloadUrl: 'https://bzzhr.to/i774rp5l8osa',
            tags: ['NEAT VIDEO', 'DENOISE', 'PRO'],
          },
          {
            id: 'newton-4-0',
            name: 'Newton 4.0',
            version: '4.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Full 2D rigid-body physics engine for 2D layers inside After Effects.',
            downloadUrl: 'https://bzzhr.to/ws97sibvtbjm',
            tags: ['NEWTON', '2D PHYSICS', 'GRAVITY'],
          },
          {
            id: 'olm-plugins',
            name: 'OLM Plugins',
            version: '2025',
            size: '',
            host: 'olm.co.jp',
            description: 'OLM Smoother, Blur, and color correction tools designed for anime compositing.',
            downloadUrl: 'https://www.olm.co.jp/rd/categories/opentools',
            tags: ['OLM', 'ANIME', 'SMOOTHER'],
          },
          {
            id: 'omino-suite',
            name: 'Omino Suite',
            version: '2025',
            size: '',
            host: 'omino.com',
            showDescription: true,
            description: "Official legacy Windows release. Check the developer's compatibility notes for modern After Effects versions.",
            downloadUrl: 'https://omino.com/store/',
            tags: ['OMINO', 'KALEIDOSCOPE', 'LEGACY'],
          },
          {
            id: 'pathblurfx',
            name: 'PathBlurFX',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Motion blur driven strictly along custom vector bezier mask paths.',
            downloadUrl: 'https://bzzhr.to/ypxe2mjpztf8',
            tags: ['PATHBLUR', 'BEZIER BLUR', 'MASK BLUR'],
          },
          {
            id: 'pixdither',
            name: 'PixDither',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Pixel-accurate Bayer matrix and error-diffusion retro dithering processor.',
            downloadUrl: 'https://bzzhr.to/cq4udjt22yq3',
            tags: ['PIXDITHER', 'DITHER', 'RETRO'],
          },
          {
            id: 'pixel-extender-1-0',
            name: 'Pixel Extender 1.0',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Edge pixel repeating, smear extension, and boundary padding.',
            downloadUrl: 'https://bzzhr.to/cq4udjt22yq3',
            tags: ['PIXEL EXTENDER', 'EDGE SMEAR'],
          },
          {
            id: 'superluminal-stardust-1-6-0c',
            name: 'Superluminal Stardust 1.6.0c',
            version: '1.6.0c',
            size: '',
            host: 'bzzhr.to',
            description: 'Modular 3D node-based particle system, volume renderer, and physics simulation.',
            downloadUrl: 'https://bzzhr.to/ivm3f5kzhmvw',
            tags: ['STARDUST', 'SUPERLUMINAL', '3D PARTICLES'],
          },
          {
            id: 'thesaucecode-1-1-1',
            name: 'TheSauceCode 1.1.1',
            version: '1.1.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Dynamic procedural sauce displacement, gooey viscosity, and fluid shading.',
            downloadUrl: 'https://bzzhr.to/2htjalm4da9p',
            tags: ['THESAUCECODE', 'GOO', 'VISCOSITY'],
          },
          {
            id: 'varifont-2-0-1',
            name: 'VariFont 2.0.1',
            version: '2.0.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Direct variable font axis animation (weight, width, slant) in After Effects.',
            downloadUrl: 'https://bzzhr.to/rsysc4th60m1',
            tags: ['VARIFONT', 'VARIABLE FONTS', 'TYPOGRAPHY'],
          },
          {
            id: 'xcloner-1-2-1',
            name: 'xCloner 1.2.1',
            version: '1.2.1',
            size: '',
            host: 'bzzhr.to',
            description: 'High-speed GPU layer cloner, linear arrays, and radial matrix distribution.',
            downloadUrl: 'https://bzzhr.to/ekfuqyhlhjwz',
            tags: ['XCLONER', 'CLONER', 'ARRAY'],
          },
        ],
      },
    ],
  },
  {
    id: 'ofx',
    name: 'OFX Suites',
    subtitle: 'OFX Suites',
    category: 'OFX',
    description:
      'OFX builds for DaVinci Resolve. Some additionally support Vegas Pro where the developer officially provides it.',
    alertNotice:
      'Not compatible with After Effects or Premiere Pro — scroll up for Adobe-format builds.',
    apps: [
      {
        id: 'borisfx-ofx',
        title: 'BorisFX',
        subtitle: '',
        count: 5,
        releases: [
          {
            id: 'borisfx-continuum-ofx-2026-v19-0-0',
            name: 'BorisFX Continuum – OFX 2026 v19.0.0',
            version: '2026 v19.0.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Comprehensive visual effects suite for DaVinci Resolve and OFX hosts.',
            downloadUrl: 'https://bzzhr.to/mdmh82n5psg1',
            tags: ['BORISFX', 'CONTINUUM', 'OFX 2026'],
          },
          {
            id: 'sapphire-ofx-2026',
            name: 'Sapphire – OFX 2026',
            version: '2026',
            size: '',
            host: 'bzzhr.to',
            description: 'Legendary lighting, glow, lens flare, and transition suite for OFX.',
            downloadUrl: 'https://bzzhr.to/wh0a9vltfhcq',
            tags: ['SAPPHIRE', 'OFX 2026', 'BORISFX'],
          },
          {
            id: 'mocha-pro-ofx-2026-0',
            name: 'Mocha Pro – OFX 2026.0',
            version: '2026.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Academy Award-winning planar tracking, rotoscoping, and object removal.',
            downloadUrl: 'https://bzzhr.to/rqsw0fxgqvye',
            tags: ['MOCHA PRO', 'PLANAR TRACKING', 'OFX'],
          },
          {
            id: 'borisfx-continuum-ofx-2026-5-v19-5-6',
            name: 'BorisFX Continuum – OFX 2026.5 v19.5.6',
            version: '2026.5 v19.5.6',
            size: '',
            host: 'bzzhr.to',
            description: 'Continuum 2026.5 point update with enhanced GPU particle performance.',
            downloadUrl: 'https://bzzhr.to/r52a3p5o8vpv',
            tags: ['CONTINUUM', 'OFX 2026.5', 'BORISFX'],
          },
          {
            id: 'borisfx-sapphire-ofx-2026-52',
            name: 'BorisFX Sapphire – OFX 2026.52',
            version: '2026.52',
            size: '',
            host: 'bzzhr.to',
            description: 'Sapphire 2026.52 maintenance release with improved Resolve timeline rendering.',
            downloadUrl: 'https://bzzhr.to/oa8z8yole2zq',
            tags: ['SAPPHIRE', 'OFX 2026.52', 'BORISFX'],
          },
        ],
      },
      {
        id: 'maxon-ofx',
        title: 'Maxon',
        subtitle: 'Magic Bullet Suite, Trapcode Suite, VFX Suite, and Universe.',
        count: 1,
        releases: [
          {
            id: 'red-giant-v2026-3-0',
            name: 'Red Giant v2026.3.0',
            version: 'v2026.3.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Magic Bullet Suite, Trapcode Suite, VFX Suite, and Universe OFX editions.',
            downloadUrl: 'https://bzzhr.to/6ft56rdmce2r',
            tags: ['RED GIANT', 'MAXON', 'OFX 2026'],
          },
        ],
      },
      {
        id: 'revisionfx-ofx',
        title: 'RE:Vision FX',
        subtitle: '',
        count: 3,
        releases: [
          {
            id: 'twixtor-v8-1-0-ofx',
            name: 'Twixtor v8.1.0 – OFX',
            version: 'v8.1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Intelligent optical flow retiming and super slow-motion for OFX hosts.',
            downloadUrl: 'https://bzzhr.to/1fkbh443iyoe',
            tags: ['TWIXTOR', 'OFX', 'v8.1.0'],
          },
          {
            id: 'revisionfx-rsmb-6-6-0-ofx',
            name: 'RE:VisionFX RSMB 6.6.0 – OFX',
            version: '6.6.0',
            size: '',
            host: 'bzzhr.to',
            description: 'ReelSmart Motion Blur tracking and applying realistic motion blur.',
            downloadUrl: 'https://bzzhr.to/g7ga9fypbtkh',
            tags: ['RSMB', 'REELSMART', 'OFX', '6.6.0'],
          },
          {
            id: 'revisionfx-effections-ofx-v25-08',
            name: 'RE:VisionFX Effections.OFX.v25.08',
            version: 'v25.08',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Complete RE:VisionFX collection.',
            downloadUrl: 'https://bzzhr.to/t0nnbpuyx1ab',
            tags: ['RE:VISIONFX', 'EFFECTIONS', 'v25.08'],
          },
        ],
      },
    ],
  },
  {
    id: 'other-ofx',
    name: 'Other OFX',
    subtitle: 'Other OFX',
    category: 'OFX',
    apps: [
      {
        id: 'filmconvert-ofx',
        title: 'FilmConvert',
        subtitle: '',
        count: 2,
        releases: [
          {
            id: 'filmconvert-bundle-ofx',
            name: 'FilmConvert Bundle',
            version: '2025',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Nitrate, Cinematch, Hazy, and Halation.',
            downloadUrl: 'https://bzzhr.to/2zm9as61uzd4',
            tags: ['FILMCONVERT', 'OFX', 'NITRATE', 'CINEMATCH'],
          },
          {
            id: 'filmconvert-ofx-v2-20-ce-vegas',
            name: 'FilmConvert OFX v2.20.CE VEGAS',
            version: 'v2.20.CE',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Discontinued. Only version with official Vegas Pro support.',
            downloadUrl: 'https://bzzhr.to/ntutswlbtstq',
            tags: ['FILMCONVERT', 'VEGAS', 'v2.20.CE'],
          },
        ],
      },
      {
        id: 'unsorted-ofx',
        title: 'Unsorted',
        subtitle: '',
        count: 8,
        releases: [
          {
            id: 'bullettime-1-1-14',
            name: 'BulletTime1.1.14',
            version: '1.1.14',
            size: '',
            host: 'bzzhr.to',
            description: 'Bullet time matrix freeze-motion multi-camera array reconstruction.',
            downloadUrl: 'https://bzzhr.to/1u9qpse1qwnv',
            tags: ['BULLETTIME', 'FREEZE MOTION', 'OFX'],
          },
          {
            id: 'dehancer-pro-7-3-1',
            name: 'Dehancer Pro 7.3.1',
            version: '7.3.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Photochemical film emulation, true negative profiles, and bloom halation.',
            downloadUrl: 'https://bzzhr.to/5e8kn94hghlz',
            tags: ['DEHANCER', 'FILM EMULATION', 'RESOLVE'],
          },
          {
            id: 'dust-transition-for-davinci-resolve',
            name: 'Dust Transition for DaVinci Resolve',
            version: '2025',
            size: '',
            host: 'aescripts.com',
            showDescription: true,
            description: 'Official publisher download/trial page. This is a paid product, not freeware.',
            downloadUrl: 'https://aescripts.com/dust-transition-for-davinci-resolve/',
            tags: ['DUST TRANSITION', 'DAVINCI RESOLVE', 'AESCRIPTS'],
          },
          {
            id: 'ignitepro-2021-1-ofx',
            name: 'IgnitePro 2021.1',
            version: '2021.1',
            size: '',
            host: 'bzzhr.to',
            showDescription: true,
            description: 'Adobe & OFX',
            downloadUrl: 'https://bzzhr.to/hyjaxrfp110i',
            tags: ['IGNITEPRO', 'ADOBE & OFX', 'RESOLVE'],
          },
          {
            id: 'dehancer-pro-7-4-0',
            name: 'Dehancer Pro 7.4.0',
            version: '7.4.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Latest optical film modeling, target print profiles, and halation v7.4.',
            downloadUrl: 'https://bzzhr.to/h5vs43ax4g43',
            tags: ['DEHANCER PRO', 'OFX 7.4.0', 'FILM'],
          },
          {
            id: 'dust-transition-1-1-1',
            name: 'Dust Transition 1.1.1',
            version: '1.1.1',
            size: '',
            host: 'bzzhr.to',
            description: 'Organic particle dusting and disintegration wipe transitions for Resolve.',
            downloadUrl: 'https://bzzhr.to/269hepicp2vu',
            tags: ['DUST TRANSITION', 'WIPE', 'PARTICLES'],
          },
          {
            id: 'genesis-ofx',
            name: 'Genesis',
            version: '1.0',
            size: '',
            host: 'bzzhr.to',
            description: 'Procedural universe, stars, nebulas, and cosmic particle generation.',
            downloadUrl: 'https://bzzhr.to/sezf9pul3sjp',
            tags: ['GENESIS', 'STARS', 'NEBULA'],
          },
          {
            id: 'bullet-time-1-1',
            name: 'Bullet Time 1.1',
            version: '1.1',
            size: '',
            host: 'bzzhr.to',
            description: 'BulletTime 1.1.14 - OFX Win standalone release.',
            downloadUrl: 'https://bzzhr.to/1u9qpse1qwnv',
            tags: ['BULLET TIME', 'OFX WIN', 'v1.1'],
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
  const [expandedApps, setExpandedApps] = useState<Record<string, boolean>>({});
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const [showPasswordToast, setShowPasswordToast] = useState(false);
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
            app.subtitle.toLowerCase().includes(q) ||
            sec.name.toLowerCase().includes(q) ||
            (sec.category && sec.category.toLowerCase().includes(q));

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
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12">
        {/* Breadcrumb Navigation: Home / Windows */}
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-zinc-500">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-300 font-medium">Windows</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-5xl sm:text-6xl font-normal tracking-tight text-white">
            Windows
          </h1>
          <p className="mt-2.5 max-w-3xl text-sm sm:text-base text-zinc-400 leading-relaxed">
            Verified software and plugins for Windows editors.
          </p>
        </div>

        {/* 3-Column Layout: Left (Sections Nav), Center (Search, Notices, Accordions), Right (Cards) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* LEFT COLUMN: SECTIONS SIDEBAR */}
          <aside className="w-full lg:w-48 xl:w-52 shrink-0 space-y-2 lg:sticky lg:top-8">
            <div className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-3 px-3">
              SECTIONS
            </div>
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              {WINDOWS_SECTIONS.map((sec, idx) => {
                const isActive = activeSectionId === sec.id && !searchQuery;
                const count = sec.apps.reduce((acc, a) => acc + a.releases.length, 0);
                const prevSec = idx > 0 ? WINDOWS_SECTIONS[idx - 1] : null;
                const showCategoryHeader =
                  sec.category &&
                  sec.category !== prevSec?.category;

                return (
                  <React.Fragment key={sec.id}>
                    {showCategoryHeader && (
                      <div className="hidden lg:block pt-3 pb-1 px-3 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-t border-zinc-900/80 mt-1.5">
                        {sec.category}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`group shrink-0 flex items-center justify-between rounded px-3 py-2 text-left text-xs transition-colors ${
                        isActive
                          ? 'border-l-2 border-white bg-zinc-900 font-medium text-white shadow-sm'
                          : 'border-l-2 border-transparent text-zinc-400 hover:bg-[#141414] hover:text-white'
                      }`}
                    >
                      <span className="truncate">{sec.name}</span>
                      {count > 0 && (
                        <span
                          className={`font-mono text-[10px] ml-2 shrink-0 ${
                            isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  </React.Fragment>
                );
              })}
            </nav>
          </aside>

          {/* CENTER COLUMN: SEARCH, NOTICES & SOFTWARE ACCORDIONS */}
          <main className="flex-1 min-w-0 space-y-6 w-full">
            {/* Search Bar with Ctrl/⌘ K */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search software, plugins..."
                className="w-full rounded-md border border-zinc-800 bg-[#0D0D0D] py-2.5 pl-10 pr-24 text-sm text-white placeholder-zinc-500 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
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
                <div className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  <span>Ctrl/⌘</span>
                  <span>K</span>
                </div>
              </div>
            </div>

            {/* NOTICE 1: Extract Guide Card */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-5 text-xs leading-relaxed text-zinc-300 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                <div className="space-y-2">
                  <p>
                    Always extract downloads with{' '}
                    <strong className="text-white font-semibold underline underline-offset-2">
                      7-Zip
                    </strong>{' '}
                    — Windows&apos; built-in extractor is unreliable for password-protected .7z files on any Windows version.
                  </p>
                  <p className="text-zinc-400">
                    Having trouble? See our{' '}
                    <button
                      type="button"
                      onClick={() => setActiveGuideModal('extract')}
                      className="font-semibold text-white underline underline-offset-2 hover:text-zinc-300 transition-colors"
                    >
                      extract guide
                    </button>
                    .
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-zinc-400">
                    <span>Every download is a password-protected .7z archive. The password is in our</span>
                    <a
                      href={DISCORD_INVITE_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-black px-2.5 py-0.5 font-mono text-xs font-bold text-white hover:border-white transition-colors"
                      title="Click to find password on Discord"
                    >
                      <svg className="h-3 w-3 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span>Discord</span>
                      <ExternalLink className="h-3 w-3 text-zinc-400" />
                    </a>
                    <span className="text-zinc-600">or default</span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-black px-2 py-0.5 font-mono font-bold text-white hover:border-white transition-colors"
                      title="Click to copy password"
                    >
                      <span>flame</span>
                      {copiedPassword ? (
                        <Check className="h-3 w-3 text-white" />
                      ) : (
                        <Copy className="h-3 w-3 text-zinc-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTICE 2: Compatibility Card */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-5 text-xs leading-relaxed text-zinc-300 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-800 pb-3 mb-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 font-semibold">
                  COMPATIBILITY
                </span>
                <span className="font-medium text-white">
                  Match the host app before you install.
                </span>
              </div>

              <ul className="space-y-2 text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-500 shrink-0" />
                  <span>
                    For After Effects plugins, keep the plugin release close to your AE major version. Newer plugin installers often expect AE 2024+.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-500 shrink-0" />
                  <span>
                    Keep your old AE version installed until projects open, effects load, and presets/scripts are confirmed in the new version.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-500 shrink-0" />
                  <span>
                    If a project depends on older plugins, check{' '}
                    <button
                      type="button"
                      onClick={() => setActiveGuideModal('version')}
                      className="text-white font-semibold underline underline-offset-2 hover:text-zinc-300 transition-colors"
                    >
                      Archives
                    </button>{' '}
                    and the{' '}
                    <button
                      type="button"
                      onClick={() => setActiveGuideModal('version')}
                      className="text-white font-semibold underline underline-offset-2 hover:text-zinc-300 transition-colors"
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
              <div className="rounded-md border border-dashed border-zinc-800 bg-[#0D0D0D]/50 p-12 text-center">
                <Search className="mx-auto h-8 w-8 text-zinc-600" />
                <h3 className="mt-3 font-serif text-base font-semibold text-white">
                  No matching software found
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  No software or plugins matched &quot;{searchQuery}&quot;.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white hover:border-zinc-600 transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            ) : (
              filteredSections.map((sec) => (
                <section
                  key={sec.id}
                  id={`sec-${sec.id}`}
                  className="pt-4 scroll-mt-24 space-y-4"
                >
                  {/* Section Header */}
                  <div className="border-b border-zinc-800 pb-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block">
                      {sec.category ? sec.category : sec.name}
                    </span>
                    <h2 className="mt-0.5 font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
                      {sec.subtitle || sec.name}
                    </h2>
                    {sec.description && (
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                        {sec.description}
                      </p>
                    )}
                    {sec.alertNotice && (
                      <div className="mt-3 flex items-start gap-2 rounded border border-rose-500/20 bg-rose-950/10 px-3 py-2 text-xs text-rose-300">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        <span>{sec.alertNotice}</span>
                      </div>
                    )}
                  </div>

                  {/* Software entries list */}
                  <div className="space-y-2.5">
                    {sec.apps.map((app) => {
                      const isExpanded = !!expandedApps[app.id];
                      return (
                        <div
                          key={app.id}
                          className="rounded-md border border-zinc-800 bg-[#0D0D0D] overflow-hidden transition-all duration-150 hover:border-zinc-700 shadow-sm"
                        >
                          {/* Accordion Header */}
                          <button
                            type="button"
                            onClick={() => toggleApp(app.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#121212] transition-colors focus:outline-none"
                          >
                            <div>
                              <div className="flex items-center gap-2.5">
                                <h3 className="font-serif text-base font-normal text-white">
                                  {app.title}
                                </h3>
                                {app.subtitle ? (
                                  <span className="font-mono text-[11px] text-zinc-500">
                                    {app.releases.length}{' '}
                                    {app.releases.length === 1 ? 'release' : 'releases'}
                                  </span>
                                ) : null}
                              </div>
                              {app.subtitle ? (
                                <p className="mt-0.5 text-xs text-zinc-400">
                                  {app.subtitle}
                                </p>
                              ) : null}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                                {app.count ?? app.releases.length}
                              </span>
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-zinc-300" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-zinc-500" />
                              )}
                            </div>
                          </button>

                          {/* Expanded Releases Table / Cards */}
                          {isExpanded && (
                            <div className="border-t border-zinc-800 bg-black/40 divide-y divide-zinc-800/70">
                              {app.note && (
                                <div className="px-4 py-3 text-xs italic text-zinc-400 bg-zinc-950/40">
                                  {app.note}
                                </div>
                              )}
                              {app.releases.map((rel) => {
                                const hostBadgeText = rel.host
                                  ? (rel.host.toLowerCase().includes('pending') || rel.host.toLowerCase().startsWith('host:')
                                      ? rel.host
                                      : `Host: ${rel.host}`)
                                  : (rel.downloadUrl.includes('://')
                                      ? `Host: ${new URL(rel.downloadUrl).hostname}`
                                      : 'Host: bzzhr.to');

                                return (
                                  <div
                                    key={rel.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-4 hover:bg-zinc-900/30 transition-colors"
                                  >
                                    <div className="space-y-1.5 min-w-0 max-w-lg">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-sans text-sm font-semibold text-white">
                                          {rel.name}
                                        </span>
                                        {rel.badge && (
                                          <span className="rounded border border-zinc-700 bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[10px] text-zinc-200 font-medium">
                                            {rel.badge}
                                          </span>
                                        )}
                                      </div>

                                      {rel.showDescription && rel.description && (
                                        <p className="text-xs text-zinc-400 leading-relaxed">
                                          {rel.description}
                                        </p>
                                      )}

                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center rounded border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                                          {hostBadgeText}
                                        </span>
                                        {rel.size && (
                                          <span className="font-mono text-[11px] text-zinc-500">
                                            {rel.size}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Download & Action Buttons */}
                                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center pt-1 sm:pt-0">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleCopyLink(rel.downloadUrl, rel.id)
                                        }
                                        className="p-1.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
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
                                        onClick={() => setShowPasswordToast(true)}
                                        className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 font-sans text-xs font-semibold text-white hover:border-white hover:bg-white hover:text-black transition-colors"
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
              ))
            )}

            {/* Still looking? Discord Request Banner */}
            <div className="mt-8 rounded-md border border-zinc-800 bg-[#0D0D0D] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                  Still looking?
                </h3>
                <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                  Can't find what you need? Drop a request in our Discord. We can't promise we'll fill every request, but we'll take a look when we get around to it.
                </p>
              </div>
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded border border-rose-500/30 bg-rose-950/20 px-4 py-2 text-xs font-medium text-rose-300 hover:border-rose-400 hover:bg-rose-900/30 hover:text-white transition-colors shrink-0"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span>Request on Discord</span>
              </a>
            </div>
          </main>

          {/* RIGHT COLUMN: WINDOWS STATS CARD & GUIDES CARD */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4 lg:sticky lg:top-8">
            {/* Windows Platform Card */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-4">
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
                  <div className="font-mono text-2xl font-bold text-white">
                    {totalItems}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
                    ITEMS
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-white">
                    {totalCategories}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
                    CATEGORIES
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>SPEC // WIN_64</span>
                <span className="text-white font-semibold">STANDALONE</span>
              </div>
            </div>

            {/* Guides Card */}
            <div className="rounded-md border border-zinc-800 bg-[#0D0D0D] p-5 shadow-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border-b border-zinc-800 pb-2 mb-3">
                GUIDES
              </div>

              <nav className="flex flex-col space-y-2.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveGuideModal('extract')}
                  className="group flex items-center gap-2 text-left text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
                  <span className="group-hover:underline underline-offset-2">
                    Extract Guide
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveGuideModal('install')}
                  className="group flex items-center gap-2 text-left text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
                  <span className="group-hover:underline underline-offset-2">
                    Install Guide
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveGuideModal('unlicensed')}
                  className="group flex items-center gap-2 text-left text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-125" />
                  <span className="group-hover:underline underline-offset-2">
                    Unlicensed Fix
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveGuideModal('version')}
                  className="group flex items-center gap-2 text-left text-zinc-400 hover:text-white transition-colors"
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
          <div className="relative w-full max-w-xl rounded-lg border border-zinc-800 bg-[#0D0D0D] p-6 shadow-2xl">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setActiveGuideModal(null)}
              className="absolute right-4 top-4 rounded p-1 text-zinc-400 hover:bg-white hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* EXTRACT GUIDE MODAL */}
            {activeGuideModal === 'extract' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <FileArchive className="h-4 w-4 text-white" />
                  <span>GUIDE // 01</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-white">
                  7-Zip Extraction Walkthrough
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Windows built-in ZIP extractor fails to process password-protected
                  LZMA2 compressed archives, creating empty or corrupt folders.
                </p>

                <div className="space-y-3 font-mono text-xs text-zinc-300 bg-black p-4 rounded border border-zinc-800">
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
                    <span className="bg-zinc-900 text-white px-3 py-1 rounded border border-zinc-700 font-bold">
                      flame
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="px-2 py-1 bg-white text-black font-semibold rounded text-[10px] hover:bg-zinc-200 transition-colors"
                    >
                      {copiedPassword ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    GOT IT
                  </button>
                </div>
              </div>
            )}

            {/* INSTALL GUIDE MODAL */}
            {activeGuideModal === 'install' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <Wrench className="h-4 w-4 text-white" />
                  <span>GUIDE // 02</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-white">
                  Clean Installation Protocol
                </h3>
                <div className="space-y-2.5 text-xs text-zinc-400 leading-relaxed">
                  <div className="rounded border border-zinc-800 bg-black p-3 space-y-1">
                    <div className="font-mono text-white font-bold">1. Antivirus False Positives</div>
                    <p>Pre-activated setups use modified DLL injectors. Add your extraction folder to Windows Defender exclusions before unzipping.</p>
                  </div>
                  <div className="rounded border border-zinc-800 bg-black p-3 space-y-1">
                    <div className="font-mono text-white font-bold">2. Run Setup as Administrator</div>
                    <p>Right-click <code>Set-up.exe</code> and select <em>Run as administrator</em> to allow registration of host background daemons.</p>
                  </div>
                  <div className="rounded border border-zinc-800 bg-black p-3 space-y-1">
                    <div className="font-mono text-white font-bold">3. Close Creative Cloud Sync</div>
                    <p>Ensure Adobe Creative Cloud Desktop and AGS processes are fully ended in Task Manager before installing.</p>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}

            {/* UNLICENSED FIX MODAL */}
            {activeGuideModal === 'unlicensed' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <AlertTriangle className="h-4 w-4 text-white" />
                  <span>GUIDE // 03</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-white">
                  &quot;Unlicensed App Has Been Disabled&quot; Fix
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  If Adobe displays a 10-day countdown banner or disables your timeline,
                  their background telemetry service (AGS) has phoned home.
                </p>

                <div className="space-y-3 font-mono text-xs bg-black p-3 rounded border border-zinc-800">
                  <div>
                    <span className="text-white font-bold block mb-1">Step 1: Disable Adobe Genuine Service</span>
                    <span className="text-zinc-500">Press Win+R &rarr; services.msc &rarr; Find &quot;Adobe Genuine Software Integrity Service&quot; &rarr; Stop & Disable.</span>
                  </div>
                  <div>
                    <span className="text-white font-bold block mb-1">Step 2: Windows Firewall Outbound Rule</span>
                    <span className="text-zinc-500">Open Windows Defender Firewall &rarr; Outbound Rules &rarr; New Rule &rarr; Block Program <code>AfterFX.exe</code> and <code>Adobe Premiere Pro.exe</code>.</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal(null)}
                    className="rounded bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                  >
                    DONE
                  </button>
                </div>
              </div>
            )}

            {/* AE VERSION GUIDE MODAL */}
            {activeGuideModal === 'version' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <Terminal className="h-4 w-4 text-white" />
                  <span>GUIDE // 04</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-white">
                  AE Version Recommendation Matrix
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="rounded border border-white bg-zinc-900 p-3 text-white">
                    <div className="font-bold flex items-center justify-between">
                      <span>After Effects 2024 (v24.6.2)</span>
                      <span className="bg-white text-black px-1.5 py-0.5 rounded text-[10px]">TOP CHOICE</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 mt-1">
                      Highest plugin stability across Boris FX Sapphire, Red Giant Particular, Deep Glow, and Flow. No crashing memory leaks.
                    </p>
                  </div>
                  <div className="rounded border border-zinc-800 bg-black p-3 text-zinc-400">
                    <div className="text-white font-bold">After Effects 2025 (v25.1)</div>
                    <p className="font-sans text-xs text-zinc-500 mt-1">
                      Great for native 3D imports and AI rotoscope, but certain legacy C++ scripts need community updates.
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveGuideModal(null)}
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
      {/* Toast Notification when downloading */}
      {showPasswordToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md rounded-lg border border-zinc-700 bg-zinc-950 p-4 shadow-2xl backdrop-blur flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-white shrink-0">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-sans text-sm font-semibold text-white">
              Archive Password Notice
            </h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              All downloads are password-protected .7z archives. Join our Discord to find the password and request support.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                <span>Find Password on Discord</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                type="button"
                onClick={() => setShowPasswordToast(false)}
                className="rounded border border-zinc-800 px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswordToast(false)}
            className="text-zinc-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      </div>
    </div>
  );
};
