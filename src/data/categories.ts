import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'windows',
    title: 'Windows',
    description: 'Software, tools, and plugins for Windows editors.',
    icon: 'monitor',
    count: '142 RESOURCES',
    section: 'SEC.01 // OS',
    tag: 'SYSTEM / CODECS',
    platform: 'windows',
    badge: 'DETECTED',
  },
  {
    id: 'macos',
    title: 'MacOS',
    description: 'Software, tools, and plugins for Mac editors.',
    icon: 'apple',
    count: '118 RESOURCES',
    section: 'SEC.01 // OS',
    tag: 'METAL / NATIVE',
    platform: 'macos',
  },
  {
    id: 'beginners-guide',
    title: "Beginner's Guide",
    description:
      'Start here for setup, plugins, composition settings, and shortcuts.',
    icon: 'book-open',
    count: '12 ARTICLES',
    section: 'SEC.02 // ONBOARD',
    tag: 'FOUNDATION',
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    description:
      'Video walkthroughs for installs, plugins, setup, and common editor fixes.',
    icon: 'play-square',
    count: '46 VIDEOS',
    section: 'SEC.03 // PRACTICE',
    tag: 'TECHNIQUES',
  },
  {
    id: 'guides',
    title: 'Guides',
    description:
      'Written setup, troubleshooting, activation, plugin, and workflow guides.',
    icon: 'file-text',
    count: '34 ARTICLES',
    section: 'SEC.04 // SPEC',
    tag: 'COLOR & STANDARDS',
  },
  {
    id: 'new-drops',
    title: 'New Drops',
    description:
      'Latest software releases and updates, posted live from Discord.',
    icon: 'cloud-download',
    count: '18 UPDATES',
    section: 'SEC.05 // LOG',
    tag: 'COMMUNITY FEED',
  },
  {
    id: 'extensions-scripts',
    title: 'Extensions & Scripts',
    description: 'Extensions and scripts to push your workflow further.',
    icon: 'puzzle',
    count: '91 RESOURCES',
    section: 'SEC.06 // SCRIPT',
    tag: 'AUTOMATION / AE',
  },
  {
    id: 'piracy',
    title: 'Piracy',
    description:
      'Curated index — FMHY, torrents, repackers, streaming, books, safety tools.',
    icon: 'layers',
    count: '120 ENTRIES',
    section: 'SEC.08 // ARCHIVE',
    tag: 'HYGIENE & REPOS',
  },
  {
    id: 'free-assets',
    title: 'Free Assets',
    description:
      'SFX, music, fonts, footage, LUTs, 3D, icons, converters, and more — all free.',
    icon: 'box',
    count: '230+ RESOURCES',
    section: 'SEC.07 // ASSETS',
    tag: 'AUDIO & FOOTAGE',
  },
];
