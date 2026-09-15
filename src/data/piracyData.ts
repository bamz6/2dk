export interface PiracyResource {
  id: string;
  name: string;
  description: string;
  tags: string[];
  url: string;
}

export interface PiracyGroup {
  id: string;
  title: string;
  description?: string;
  items: PiracyResource[];
}

export interface PiracyCategory {
  id: string;
  label: string;
  name: string;
  description: string;
  groups: PiracyGroup[];
}

export const PIRACY_CATEGORIES: PiracyCategory[] = [
  // 1. FMHY
  {
    id: 'fmhy',
    label: 'FMHY',
    name: 'Free Media Heck Yeah',
    description: 'FMHY is the megawiki — one of the largest community-maintained indexes of free-media resources. A solid starting point before you branch out.',
    groups: [
      {
        id: 'main-wiki',
        title: 'Main Wiki',
        items: [
          {
            id: 'fmhy-net',
            name: 'fmhy.net',
            description: 'The main wiki front page. Browse every category from here.',
            tags: ['wiki', 'index'],
            url: 'https://fmhy.net/',
          },
          {
            id: 'beginners-guide',
            name: 'Beginners Guide',
            description: 'How to get into piracy without screwing yourself over. Read this first.',
            tags: ['guide'],
            url: 'https://fmhy.net/beginners-guide',
          },
          {
            id: 'unsafe-sites-list',
            name: 'Unsafe Sites List',
            description: 'Sites and tools known to host malware, scams, or stale links. Cross-check anything new against this.',
            tags: ['safety'],
            url: 'https://fmhy.net/unsafe',
          },
          {
            id: 'adblock-vpn-guide',
            name: 'Adblock / VPN Guide',
            description: 'Protect yourself before you do anything else — adblocker setup, VPN comparisons, browser hardening.',
            tags: ['safety', 'guide'],
            url: 'https://fmhy.net/adblockvpnguide',
          },
        ],
      },
      {
        id: 'topic-specific-guides',
        title: 'Topic-Specific Guides',
        items: [
          {
            id: 'torrenting-guide',
            name: 'Torrenting Guide',
            description: 'Full primer on torrenting — clients, trackers, public vs private, ratios, seedboxes.',
            tags: ['torrents'],
            url: 'https://fmhy.net/torrenting',
          },
          {
            id: 'video-piracy-guide',
            name: 'Video Piracy Guide',
            description: 'Movies, TV, anime, sports — streaming sites, downloaders, Stremio, IPTV, debrid services.',
            tags: ['video'],
            url: 'https://fmhy.net/video',
          },
          {
            id: 'audio-piracy-guide',
            name: 'Audio Piracy Guide',
            description: 'Music streaming/downloading, lossless rippers, Soulseek, podcasts.',
            tags: ['audio'],
            url: 'https://fmhy.net/audio',
          },
          {
            id: 'gaming-piracy-guide',
            name: 'Gaming Piracy Guide',
            description: 'Game repackers, ROM sites, retro emulation, Denuvo cracks.',
            tags: ['games'],
            url: 'https://fmhy.net/gamingpiracyguide',
          },
          {
            id: 'reading-piracy-guide',
            name: 'Reading Piracy Guide',
            description: 'Books, comics, manga, magazines, audiobooks.',
            tags: ['books'],
            url: 'https://fmhy.net/readingpiracyguide',
          },
          {
            id: 'edu-piracy-guide',
            name: 'EDU Piracy Guide',
            description: 'Courses, textbooks, MOOC rips, academic papers, language learning.',
            tags: ['education'],
            url: 'https://fmhy.net/educational',
          },
          {
            id: 'android-piracy-guide',
            name: 'Android Piracy Guide',
            description: 'Modded APKs, mod menu repos, jailbreaking, sideloading.',
            tags: ['android'],
            url: 'https://fmhy.net/androidpiracyguide',
          },
          {
            id: 'storage-guide',
            name: 'Storage Guide',
            description: 'File hosts ranked by reliability and limits. Useful for picking where to grab packs from.',
            tags: ['hosts'],
            url: 'https://fmhy.net/storage',
          },
        ],
      },
    ],
  },

  // 2. Torrents
  {
    id: 'torrents',
    label: 'Torrents',
    name: 'Torrenting',
    description: 'BitTorrent clients and the public trackers worth using.',
    groups: [
      {
        id: 'clients',
        title: 'Clients',
        items: [
          {
            id: 'qbittorrent',
            name: 'qBittorrent',
            description: 'The standard. Open source, no ads, cross-platform, actively maintained. Use this one.',
            tags: ['client', 'open-source'],
            url: 'https://www.qbittorrent.org/',
          },
          {
            id: 'transmission',
            name: 'Transmission',
            description: 'Lightweight cross-platform client. Native MacOS feel, headless on Linux servers.',
            tags: ['client', 'lightweight'],
            url: 'https://transmissionbt.com/',
          },
          {
            id: 'deluge',
            name: 'Deluge',
            description: 'Plugin-friendly client with a web UI. Good for seedboxes and self-hosted setups.',
            tags: ['client', 'plugins'],
            url: 'https://deluge-torrent.org/',
          },
          {
            id: 'tixati',
            name: 'Tixati',
            description: 'Windows-focused client with detailed bandwidth control and stats.',
            tags: ['client', 'windows'],
            url: 'https://tixati.com/',
          },
        ],
      },
      {
        id: 'public-trackers',
        title: 'Public Trackers',
        description: 'No registration needed. Quality varies — verify uploaders and check comments.',
        items: [
          {
            id: '1337x',
            name: '1337x',
            description: 'General-purpose tracker with organised categories. Stick to well-known uploaders and read comments before downloading.',
            tags: ['general'],
            url: 'https://1337x.to/',
          },
          {
            id: 'nyaa-si',
            name: 'Nyaa.si',
            description: 'Anime, manga, and JAV tracker. One of the main public indexes for Japanese media.',
            tags: ['anime'],
            url: 'https://nyaa.si/',
          },
          {
            id: 'rutracker',
            name: 'RuTracker',
            description: 'Russian forum tracker — massive archives of software, films, and music. Registration required.',
            tags: ['software', 'films'],
            url: 'https://rutracker.org/forum/index.php',
          },
          {
            id: 'knaben',
            name: 'Knaben',
            description: 'Meta-search across many trackers in one place. Also see knaben.info for proxy mirrors.',
            tags: ['meta-search'],
            url: 'https://knaben.org/',
          },
          {
            id: 'the-pirate-bay',
            name: 'The Pirate Bay',
            description: 'The classic. Mirrors at thepiratebay.org and various proxy lists.',
            tags: ['general'],
            url: 'https://thepiratebay.org/index.html',
          },
          {
            id: 'solid-torrents',
            name: 'Solid Torrents',
            description: 'Clean tracker meta-search with no ads.',
            tags: ['meta-search'],
            url: 'https://bitsearch.eu/',
          },
        ],
      },
      {
        id: 'private-trackers',
        title: 'Private Trackers',
        description: "Registration required. Invite-only or open-signup windows vary — check each tracker's rules.",
        items: [
          {
            id: 'torrentleech',
            name: 'TorrentLeech',
            description: 'Long-running general private tracker — movies, TV, games, music, and more. Invite-only; watch for open signups on their homepage.',
            tags: ['general', 'private'],
            url: 'https://www.torrentleech.org/',
          },
          {
            id: 'alpharatio',
            name: 'AlphaRatio',
            description: 'General private tracker with a reputation as a solid entry point. Ratio-based; read their rules before leeching.',
            tags: ['general', 'private'],
            url: 'https://alpharatio.cc/login.php',
          },
          {
            id: 'ncore',
            name: 'nCore',
            description: 'Hungarian general private tracker with a large catalog. Registration required; related to the Milkie team.',
            tags: ['general', 'private'],
            url: 'https://ncore.pro/login.php',
          },
          {
            id: 'bakabt',
            name: 'BakaBT',
            description: 'Anime private tracker focused on quality over quantity. Strict ratio and content rules.',
            tags: ['anime', 'private'],
            url: 'https://bakabt.me/',
          },
          {
            id: 'anthelion',
            name: 'Anthelion',
            description: 'Movie-focused private tracker. Invite-only with occasional open signups.',
            tags: ['movies', 'private'],
            url: 'https://anthelion.me/login.php',
          },
          {
            id: 'broadcasthe',
            name: 'Broadcasthe',
            description: 'Scene HD tracker for movies and TV. Registration required.',
            tags: ['movies', 'tv', 'private'],
            url: 'https://broadcasthe.net/',
          },
          {
            id: 'milkie-cc',
            name: 'Milkie.cc',
            description: 'Ratioless private Hungarian tracker for movies, TV, and general releases. Run by the nCore team.',
            tags: ['movies', 'tv', 'private'],
            url: 'https://milkie.cc/auth/signin',
          },
        ],
      },
      {
        id: 'tracker-lists',
        title: 'Tracker Lists',
        description: 'Add these to qBittorrent to boost peer discovery and download speeds on public torrents.',
        items: [
          {
            id: 'ngosang-trackerslist',
            name: 'ngosang/trackerslist',
            description: 'Daily-updated list of working public BitTorrent trackers. The community standard.',
            tags: ['trackers'],
            url: 'https://github.com/ngosang/trackerslist',
          },
          {
            id: 'newtrackon',
            name: 'newTrackon',
            description: "Live monitor of public trackers' uptime and stability — only suggests stable ones.",
            tags: ['trackers'],
            url: 'https://newtrackon.com/',
          },
        ],
      },
    ],
  },

  // 3. Software
  {
    id: 'software',
    label: 'Software',
    name: 'Software & Games',
    description: "Cracked apps, repacked games, and ROM sources. Always verify against FMHY's unsafe sites list before downloading.",
    groups: [
      {
        id: 'game-repackers',
        title: 'Game Repackers',
        items: [
          {
            id: 'fitgirl-repacks',
            name: 'FitGirl Repacks',
            description: "Widely used compressed PC game repacks. Smaller than originals — read each release's install notes.",
            tags: ['repack', 'pc'],
            url: 'https://fitgirl-repacks.site/',
          },
          {
            id: 'dodi-repacks',
            name: 'DODI Repacks',
            description: "Popular FitGirl alternative for compressed PC game repacks. Check each release's install notes.",
            tags: ['repack', 'pc'],
            url: 'https://dodi-repacks.site/',
          },
          {
            id: 'steamrip',
            name: 'SteamRIP',
            description: 'Pre-installed Steam games as direct downloads. No torrents needed.',
            tags: ['pc', 'direct'],
            url: 'https://steamrip.com/',
          },
          {
            id: 'online-fix',
            name: 'Online-Fix',
            description: 'Cracks for online-only games (multiplayer fixes, P2P bypasses).',
            tags: ['multiplayer'],
            url: 'https://online-fix.me/',
          },
          {
            id: 'gog-games',
            name: 'GOG-Games',
            description: 'GOG releases (DRM-free PC games) for free download.',
            tags: ['drm-free'],
            url: 'https://gog-games.to/',
          },
        ],
      },
      {
        id: 'software-sites',
        title: 'Software Sites',
        items: [
          {
            id: 'appdb-to',
            name: 'AppDB.to',
            description: "Searchable index of cracked software. Cross-check uploads against FMHY's unsafe sites list.",
            tags: ['cracks'],
            url: 'https://appdb.to/',
          },
          {
            id: 'monkrus',
            name: 'Monkrus',
            description: 'Pre-cracked Adobe CC installers for Windows. Domain rotates — confirm the current URL on FMHY before downloading.',
            tags: ['windows', 'adobe'],
            url: 'https://w14.monkrus.ws/',
          },
          {
            id: 'codec-kyiv-ua',
            name: 'Codec.kyiv.ua',
            description: 'Adobe plug-ins, codecs, and Creative Cloud-related download index. Not affiliated with Monkrus repacks.',
            tags: ['windows', 'adobe'],
            url: 'https://codec.kyiv.ua/',
          },
        ],
      },
      {
        id: 'macos',
        title: 'MacOS',
        items: [
          {
            id: 'macked-app',
            name: 'macked.app',
            description: 'Mac apps cracked and ready to install. Updated regularly.',
            tags: ['mac'],
            url: 'https://macked.app/',
          },
          {
            id: 'appstorrent',
            name: 'Appstorrent',
            description: 'Russian torrent index focused on MacOS apps. Large catalogue, active uploads.',
            tags: ['mac', 'torrents'],
            url: 'https://appstorrent.ru/',
          },
          {
            id: 'macserialjunkie',
            name: 'MacSerialJunkie',
            description: 'Forum for Mac app serials, patches, and activation workarounds.',
            tags: ['mac', 'forum'],
            url: 'https://macserialjunkie.com/',
          },
          {
            id: 'macbb',
            name: 'MacBB',
            description: 'Long-running Mac piracy forum with releases, requests, and community support.',
            tags: ['mac', 'forum'],
            url: 'https://macbb.org/',
          },
        ],
      },
      {
        id: 'retro-roms',
        title: 'Retro & ROMs',
        items: [
          {
            id: 'r-roms-megathread',
            name: 'r/Roms Megathread',
            description: "The community-curated ROM site list. Use the linked Vimm's, Myrient, NoPayStation, etc.",
            tags: ['roms'],
            url: 'https://r-roms.github.io/',
          },
          {
            id: 'vimms-lair',
            name: "Vimm's Lair",
            description: 'Long-standing ROM archive. Famous for clean dumps and good organisation.',
            tags: ['roms'],
            url: 'https://vimm.net/',
          },
          {
            id: 'myrient',
            name: 'Myrient',
            description: 'Massive No-Intro-style ROM mirror. Up-to-date sets of every console.',
            tags: ['roms'],
            url: 'https://myrient.erista.me/',
          },
          {
            id: 'retroarch',
            name: 'RetroArch',
            description: 'The all-in-one emulator frontend. Run any console on any platform.',
            tags: ['emulator'],
            url: 'https://www.retroarch.com/',
          },
        ],
      },
    ],
  },

  // 4. Video
  {
    id: 'video',
    label: 'Video',
    name: 'Streaming & Video',
    description: 'Movies, TV, anime — both in-browser streaming and Stremio addons. Streaming sites change domains often; check FMHY if a link breaks.',
    groups: [
      {
        id: 'stremio-recommended',
        title: 'Stremio (recommended)',
        description: 'Stremio + community addons can centralize a lot of streaming in one app. Availability still depends on the addons and sources you choose.',
        items: [
          {
            id: 'stremio',
            name: 'Stremio',
            description: 'The app. Install it and add community addons — most major content becomes streamable in one click.',
            tags: ['app'],
            url: 'https://www.stremio.com/',
          },
          {
            id: 'torrentio',
            name: 'Torrentio',
            description: 'The killer Stremio addon — pulls from public trackers in real time. Pair with a Real-Debrid subscription for instant high-quality streams.',
            tags: ['addon'],
            url: 'https://torrentio.strem.fun/',
          },
          {
            id: 'real-debrid',
            name: 'Real-Debrid',
            description: 'Cloud downloader/cache that turns torrents into instant streams. ~€3/month, unlocks Stremio\'s full potential.',
            tags: ['debrid', 'paid'],
            url: 'https://real-debrid.com/',
          },
        ],
      },
      {
        id: 'streaming-sites',
        title: 'Streaming Sites',
        description: 'These move and rebrand frequently — if a link breaks, look up the current domain on FMHY.',
        items: [
          {
            id: 'cineby',
            name: 'Cineby',
            description: 'Movies, TV, and anime streaming. Confirm the current domain on FMHY if this link stops working.',
            tags: ['movies', 'tv', 'anime'],
            url: 'https://www.cineby.at/',
          },
          {
            id: 'hexa',
            name: 'Hexa',
            description: 'Movies, TV, and anime streaming with auto-next. Domains change — check FMHY for the current URL.',
            tags: ['movies', 'tv', 'anime'],
            url: 'https://hexa.watch/',
          },
          {
            id: 'miruro',
            name: 'Miruro',
            description: 'Anime-focused streaming site listed on FMHY. Confirm the current URL if this link breaks.',
            tags: ['anime'],
            url: 'https://www.miruro.com/',
          },
          {
            id: 'animepahe',
            name: 'animepahe',
            description: 'Anime streaming with sub and dub. May block some regions or automated requests.',
            tags: ['anime'],
            url: 'https://animepahe.pw/',
          },
        ],
      },
      {
        id: 'direct-downloaders',
        title: 'Direct Downloaders',
        items: [
          {
            id: 'cobalt-tools',
            name: 'Cobalt.tools',
            description: 'Clean, ad-free media downloader from YouTube, TikTok, Twitter, IG, and more.',
            tags: ['downloader'],
            url: 'https://cobalt.tools/',
          },
          {
            id: 'yt-dlp',
            name: 'yt-dlp',
            description: 'The gold-standard CLI downloader. Supports 1000+ sites, actively updated.',
            tags: ['cli'],
            url: 'https://github.com/yt-dlp/yt-dlp',
          },
        ],
      },
    ],
  },

  // 5. Books
  {
    id: 'books',
    label: 'Books',
    name: 'Books & Academic',
    description: "Books, papers, and courses. Anna's Archive is a common starting point for shadow-library searches.",
    groups: [
      {
        id: 'books-reading',
        title: 'Books & Reading',
        items: [
          {
            id: 'annas-archive',
            name: "Anna's Archive",
            description: 'Shadow-library meta-search that aggregates Z-Library, Library Genesis, and Sci-Hub mirrors. Check FMHY for current mirror guidance.',
            tags: ['books', 'papers'],
            url: 'https://annas-archive.org/',
          },
          {
            id: 'library-genesis',
            name: 'Library Genesis',
            description: 'Decades-old shadow library. Books, magazines, comics, fiction.',
            tags: ['books'],
            url: 'https://libgen.is/',
          },
          {
            id: 'z-library',
            name: 'Z-Library',
            description: 'Massive ebook archive. Use the personal-domain mirror after sign-up.',
            tags: ['books'],
            url: 'https://z-library.se/',
          },
          {
            id: 'oceanofpdf',
            name: 'OceanofPDF',
            description: 'Direct PDF/ePub downloads of popular fiction.',
            tags: ['fiction'],
            url: 'https://oceanofpdf.com/',
          },
        ],
      },
      {
        id: 'academic-papers',
        title: 'Academic Papers',
        items: [
          {
            id: 'sci-hub',
            name: 'Sci-Hub',
            description: 'Free access to research papers. Bypasses paywalls. Multiple mirrors — sci-hub.se, sci-hub.ru, sci-hub.st.',
            tags: ['research'],
            url: 'https://sci-hub.se/',
          },
        ],
      },
      {
        id: 'courses-learning',
        title: 'Courses & Learning',
        items: [
          {
            id: 'freecoursesonline',
            name: 'FreeCoursesOnline',
            description: 'Indexed course rips — Udemy, Coursera, Pluralsight, MasterClass.',
            tags: ['courses'],
            url: 'https://freecoursesonline.me/',
          },
          {
            id: 'desirecourse',
            name: 'DesireCourse',
            description: 'Course torrents and direct downloads, regularly updated.',
            tags: ['courses'],
            url: 'https://desirecourse.net/',
          },
        ],
      },
    ],
  },

  // 6. Audio
  {
    id: 'audio',
    label: 'Audio',
    name: 'Audio & Music',
    description: 'Music piracy is largely covered by the streaming-rip tools on the Free Assets page (Lucida, Squid, etc.). The classics live here.',
    groups: [
      {
        id: 'p2p-communities',
        title: 'P2P & Communities',
        items: [
          {
            id: 'soulseek',
            name: 'Soulseek',
            description: "Decades-old P2P music sharing network. Anything you can't find anywhere else, you'll find here.",
            tags: ['p2p', 'music'],
            url: 'https://www.slsknet.org/',
          },
          {
            id: 'nicotine-plus',
            name: 'Nicotine+',
            description: 'Modern Soulseek client — actively maintained, way better UI than the original.',
            tags: ['client'],
            url: 'https://nicotine-plus.org/',
          },
        ],
      },
      {
        id: 'production-plugins',
        title: 'Production & Plugins',
        items: [
          {
            id: 'audioz',
            name: 'AudioZ',
            description: 'VST/AU/AAX plugins, sample packs, and DAW installers. The main hub for audio-production piracy.',
            tags: ['plugins', 'daw'],
            url: 'https://audioz.download/',
          },
        ],
      },
    ],
  },

  // 7. Safety
  {
    id: 'safety',
    label: 'Safety',
    name: 'Tools & Safety',
    description: 'Adblockers, VPNs, and utilities. Set these up before you start anything.',
    groups: [
      {
        id: 'adblockers',
        title: 'Adblockers',
        items: [
          {
            id: 'ublock-origin',
            name: 'uBlock Origin',
            description: 'Open-source, lightweight adblocker. The community default for most browsers.',
            tags: ['adblock', 'essential'],
            url: 'https://ublockorigin.com/',
          },
          {
            id: 'sponsorblock',
            name: 'Sponsorblock',
            description: 'Skips sponsor segments in YouTube videos automatically. Pair with uBlock.',
            tags: ['youtube'],
            url: 'https://sponsor.ajay.app/',
          },
        ],
      },
      {
        id: 'vpns',
        title: 'VPNs',
        description: 'Use a VPN that keeps no logs and accepts cash/crypto. Order from most-recommended to acceptable.',
        items: [
          {
            id: 'mullvad',
            name: 'Mullvad',
            description: 'No-logs, no email required, flat €5/month, accepts cash. Often recommended for privacy-focused torrenting.',
            tags: ['recommended', 'no-logs'],
            url: 'https://mullvad.net/',
          },
          {
            id: 'proton-vpn',
            name: 'Proton VPN',
            description: 'Swiss-based, audited, free tier available. Strong privacy track record.',
            tags: ['audited'],
            url: 'https://protonvpn.com/',
          },
          {
            id: 'airvpn',
            name: 'AirVPN',
            description: 'Run by privacy activists. Port forwarding supported (great for seeding).',
            tags: ['seeding'],
            url: 'https://airvpn.org/',
          },
          {
            id: 'ivpn',
            name: 'IVPN',
            description: 'Audited, no-logs, optional anonymous account creation.',
            tags: ['audited'],
            url: 'https://www.ivpn.net/',
          },
        ],
      },
      {
        id: 'browsers',
        title: 'Browsers',
        items: [
          {
            id: 'brave',
            name: 'Brave',
            description: 'Chromium-based with built-in adblock and tracker blocking. Tor mode included.',
            tags: ['adblock'],
            url: 'https://brave.com/',
          },
          {
            id: 'helium',
            name: 'Helium',
            description: 'Privacy-focused Chromium fork with Google services removed. Ships with built-in ad blocking.',
            tags: ['privacy', 'lightweight'],
            url: 'https://github.com/imputnet/helium',
          },
          {
            id: 'thorium',
            name: 'Thorium',
            description: 'Fast Chromium fork with privacy patches and wide codec support. Solid daily driver if you want Chrome without the Google.',
            tags: ['privacy', 'chromium'],
            url: 'https://thorium.rocks/',
          },
          {
            id: 'firefox',
            name: 'Firefox',
            description: 'Last major non-Chromium browser. Pair with uBlock Origin.',
            tags: ['open-source'],
            url: 'https://www.mozilla.org/firefox/',
          },
          {
            id: 'librewolf',
            name: 'LibreWolf',
            description: 'Firefox fork with telemetry removed and uBlock Origin built in. Privacy-first defaults out of the box.',
            tags: ['privacy', 'open-source'],
            url: 'https://librewolf.net/',
          },
          {
            id: 'tor-browser',
            name: 'Tor Browser',
            description: 'For when you need stronger anonymity than a VPN alone. Slower, and sites or networks can still block Tor exit nodes.',
            tags: ['anonymous'],
            url: 'https://www.torproject.org/',
          },
        ],
      },
      {
        id: 'utilities',
        title: 'Utilities',
        items: [
          {
            id: 'handbrake',
            name: 'HandBrake',
            description: 'Widely used open-source video transcoder for re-encoding rips into smaller or more compatible formats.',
            tags: ['transcode'],
            url: 'https://handbrake.fr/',
          },
          {
            id: 'makemkv',
            name: 'MakeMKV',
            description: 'Rip Blu-rays and DVDs to MKV. Free during beta (which has been going for years).',
            tags: ['ripping'],
            url: 'https://www.makemkv.com/',
          },
          {
            id: '7-zip',
            name: '7-Zip',
            description: "Extracts every weird archive format. Essential for repackers' multi-part downloads.",
            tags: ['archive', 'essential'],
            url: 'https://www.7-zip.org/',
          },
          {
            id: 'virustotal',
            name: 'VirusTotal',
            description: 'Scan any file or URL with 70+ antivirus engines before opening it. Always check unknown installers.',
            tags: ['safety'],
            url: 'https://www.virustotal.com/',
          },
        ],
      },
    ],
  },

  // 8. Community
  {
    id: 'community',
    label: 'Community',
    name: 'Communities',
    description: "Where to ask questions, find new sources, and stay current on what's working.",
    groups: [
      {
        id: 'forums-subreddits',
        title: 'Forums & Subreddits',
        items: [
          {
            id: 'r-piracy',
            name: 'r/Piracy',
            description: 'The main subreddit. Sticky has the megathread, daily questions, takedown news.',
            tags: ['reddit'],
            url: 'https://www.reddit.com/r/Piracy/',
          },
          {
            id: 'r-piracy-megathread',
            name: "r/Piracy Megathread",
            description: 'Community-curated piracy resource list from r/Piracy. Overlaps with FMHY but maintained separately.',
            tags: ['megathread'],
            url: 'https://rentry.co/megathread',
          },
          {
            id: 'r-crackwatch',
            name: 'r/CrackWatch',
            description: 'Updates on which games have been cracked and which Denuvo titles are still holding out.',
            tags: ['games'],
            url: 'https://www.reddit.com/r/CrackWatch/',
          },
          {
            id: 'r-stremio',
            name: 'r/Stremio',
            description: 'Stremio addon discussion, new community addons, troubleshooting.',
            tags: ['stremio'],
            url: 'https://www.reddit.com/r/Stremio/',
          },
        ],
      },
      {
        id: 'news-status',
        title: 'News & Status',
        items: [
          {
            id: 'torrentfreak',
            name: 'TorrentFreak',
            description: 'News site covering takedowns, lawsuits, and the legal piracy landscape.',
            tags: ['news'],
            url: 'https://torrentfreak.com/',
          },
          {
            id: 'privacy-guides',
            name: 'Privacy Guides',
            description: 'Independent privacy/security recommendations. Cross-reference your VPN/browser choices here.',
            tags: ['privacy'],
            url: 'https://www.privacyguides.org/',
          },
        ],
      },
    ],
  },
];
