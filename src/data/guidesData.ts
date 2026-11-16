export interface GuideItem {
  id: string;
  title: string;
  platform: 'WINDOWS + MAC' | 'WINDOWS' | 'MAC';
  description: string;
  badgeTag?: string;
  category?: 'featured' | 'windows' | 'mac' | 'general' | 'tutorials';
  content?: {
    overview: string;
    requirements?: string[];
    steps: {
      title: string;
      desc: string;
      command?: string;
      codeSnippet?: string;
      tip?: string;
    }[];
    notes?: string[];
  };
}

export interface GuideGroup {
  id: string;
  badge: 'WIN' | 'MAC' | 'AE' | 'VID';
  title: string;
  description?: string;
  items: GuideItem[];
}

export const FEATURED_GUIDES: GuideItem[] = [
  {
    id: 'ae-beginners-guide',
    title: "After Effects Beginner's Guide",
    platform: 'WINDOWS + MAC',
    description: 'A practical first-read for editors setting up After Effects, choosing plugins, and building clean projects.',
    category: 'featured',
    content: {
      overview: 'Everything you need to set up After Effects properly for modern editing, avoiding timeline lag, choosing compatible versions, and organizing your motion design workspace.',
      requirements: [
        '16 GB RAM minimum (32 GB recommended for complex motion design)',
        'Dedicated NVMe SSD for AE Disk Cache (minimum 80–120 GB allocated)',
        'Recommended host: After Effects 2023 for legacy Intel/Rosetta plugins, or 2024/2025 for pure native performance',
      ],
      steps: [
        {
          title: '1. Select the Optimal AE Host Version',
          desc: 'If using macOS on Apple Silicon with older Intel-only plugins, install AE 2023 (v23.6.5) so you can run under Rosetta 2. For Windows users, AE 2024 or 2025 provides modern Multi-Frame Rendering (MFR).',
        },
        {
          title: '2. Composition Standards for Social & AMV',
          desc: 'For YouTube/AMV: 1920x1080 at 60.000 FPS (or 23.976 FPS if matching cinematic anime). For TikTok/Shorts: 1080x1920 at 60.000 FPS. Never mix mismatched framerates on precomps.',
        },
        {
          title: '3. Essential Plugin Priority',
          desc: 'Start with Sapphire (BCC / S_EdgeRays / S_Glow), Deep Glow, RSMB (ReelSmart Motion Blur), and BCC (Continuum). Master easing with Flow or graph curves before relying purely on presets.',
        },
        {
          title: '4. Memory & Cache Configuration',
          desc: 'Open Edit > Preferences > Media & Disk Cache. Enable Disk Cache on your fastest drive, set it to 100 GB+, and purge all memory & disk cache weekly.',
        },
      ],
      notes: [
        'You can also open our comprehensive interactive Beginner’s Guide module from the main navigation menu.',
      ],
    },
  },
  {
    id: 'extract-guide-windows',
    title: 'Extract Guide (Windows)',
    platform: 'WINDOWS',
    description: 'How to extract archives properly, avoid broken files, and set antivirus exclusions before installing.',
    category: 'featured',
    content: {
      overview: 'Windows extraction guide for zip, rar, and 7z packages. Most installation errors occur due to incomplete downloads, Windows Defender heuristic quarantines, or using default File Explorer unzippers.',
      requirements: [
        '7-Zip 24.x or WinRAR 7.x installed (Never use built-in Windows Zip extractor for repacks)',
        'Windows Defender exclusions configured on download & install directories',
      ],
      steps: [
        {
          title: '1. Use 7-Zip as Default',
          desc: 'Right-click the archive > 7-Zip > Extract to "[Folder Name]". Do not open the zip directly and double-click Set-up from inside the compressed preview.',
        },
        {
          title: '2. Exclude Extraction Folder from Defender',
          desc: 'Open Windows Security > Virus & threat protection > Manage settings > Exclusions > Add or remove exclusions > Add folder > select your working software extraction folder.',
          tip: 'Cracks and injectors use DLL injection hooks that generic AI heuristic models flag as false positives.',
        },
        {
          title: '3. Multi-Part Archives (.part1.rar / .z01)',
          desc: 'Ensure all parts (.part1.rar, .part2.rar, etc.) are downloaded into the exact same folder and have identical names. Only right-click part 1 and choose extract.',
        },
      ],
    },
  },
  {
    id: 'install-guide-windows',
    title: 'Install Guide (Windows)',
    platform: 'WINDOWS',
    description: 'How to install releases, understand setup folders, apply cracks or patches, and avoid common install mistakes.',
    category: 'featured',
    content: {
      overview: 'Step-by-step instructions for installing standalone applications, Adobe pre-activated suites, and AE plugin bundles on Windows 10/11.',
      requirements: [
        'Administrative privileges on Windows',
        'Close Adobe Creative Cloud desktop app and AGS background services before installing',
      ],
      steps: [
        {
          title: '1. Terminate Existing Adobe Background Daemons',
          desc: 'Press Ctrl+Shift+Esc to open Task Manager. End tasks for Creative Cloud, Adobe CEF Helper, and CoreSync.',
        },
        {
          title: '2. Run Set-up.exe as Administrator',
          desc: 'Right-click Set-up.exe (or autoplay.exe in ISO mounts) and click "Run as administrator". Choose your desired install location and language.',
        },
        {
          title: '3. Applying Patches or Crack Files (if applicable)',
          desc: 'If the release includes a "Crack", "Fix", or "Patch" folder: copy the modified .exe or .dll file directly into the target program directory (e.g. C:\\Program Files\\Adobe\\Adobe After Effects [Year]\\Support Files). Overwrite when prompted.',
        },
        {
          title: '4. Plugin Verification',
          desc: 'Common plugins belong in C:\\Program Files\\Adobe\\Common\\Plug-ins\\7.0\\MediaCore. Open After Effects and check the Effects menu to confirm detection.',
        },
      ],
    },
  },
  {
    id: 'unlicensed-fix-windows',
    title: 'Unlicensed Fix (Windows)',
    platform: 'WINDOWS',
    description: 'Fix Adobe unlicensed popups, firewall checks, overwritten cracks, and update-related activation issues.',
    category: 'featured',
    content: {
      overview: 'Stop the persistent "This unlicensed Adobe app will be disabled soon" popup banner on Windows by terminating Adobe Genuine Service (AGS), adding outbound firewall block rules, and redirecting telemetry domains in your hosts file.',
      requirements: [
        'Administrator privileges on Windows 10 or Windows 11',
        'Windows Defender Firewall with Advanced Security or PowerShell',
        'GenP 3.4.x or original pre-activated setup installer (if files were overwritten)',
      ],
      steps: [
        {
          title: '1. Terminate & Disable Adobe Genuine Service (AGS)',
          desc: 'Press Win + R, type services.msc, and press Enter. Locate "Adobe Genuine Software Integrity Service", right-click > Properties > Startup type: Disabled. Click Stop, then Apply. Alternatively, run the PowerShell command below as Administrator.',
          command: 'sc stop "AGSService" && sc config "AGSService" start= disabled',
          tip: 'Rename or delete C:\\Program Files (x86)\\Common Files\\Adobe\\AdobeGCClient to prevent AGS from respawning.',
        },
        {
          title: '2. Add Outbound Firewall Block to Application Executables',
          desc: 'Open Windows Defender Firewall with Advanced Security > Outbound Rules > New Rule > Program > Block the connection on Domain, Private, and Public for AfterFX.exe, Adobe Premiere Pro.exe, and Photoshop.exe.',
          command: 'New-NetFirewallRule -DisplayName "Block Adobe After Effects Outbound" -Direction Outbound -Program "C:\\Program Files\\Adobe\\Adobe After Effects 2025\\Support Files\\AfterFX.exe" -Action Block',
          tip: 'Blocking the executable from outbound traffic permanently stops license validation without affecting offline rendering or third-party GPU plugins.',
        },
        {
          title: '3. Add Licensing Blocklist to Hosts File',
          desc: 'Open Notepad as Administrator, open C:\\Windows\\System32\\drivers\\etc\\hosts, and append 0.0.0.0 genuine.adobe.com and 0.0.0.0 cc-api-data.adobe.io to silently sinkhole Adobe telemetry requests.',
          command: '0.0.0.0 genuine.adobe.com\n0.0.0.0 prod.adobegenuine.com\n0.0.0.0 cc-api-data.adobe.io\n0.0.0.0 ic.adobe.io',
        },
        {
          title: '4. Disable Creative Cloud Auto-Updates',
          desc: 'Open Creative Cloud Desktop > Preferences (Ctrl + ,) > Apps > Toggle OFF "Auto-update". This prevents Adobe from silently replacing your patched binaries with unactivated ones during background updates.',
        },
        {
          title: '5. Re-apply GenP or Pre-activated Patch',
          desc: 'If the warning banner is already active, close all Adobe programs, launch GenP as Administrator, click Search (magnifying glass), and click Patch (pill icon). Once status shows "Medicine applied!", re-launch the application.',
          tip: 'Clear cached warning states by deleting %LOCALAPPDATA%\\Adobe\\OOBE and %LOCALAPPDATA%\\Adobe\\AdobeGCClient.',
        },
      ],
    },
  },
  {
    id: 'extract-guide-mac',
    title: 'Extract Guide (Mac)',
    platform: 'MAC',
    description: 'How to extract Mac archives, DMGs, split files, app bundles, and plugin folders without breaking the install.',
    category: 'featured',
    content: {
      overview: 'Extracting Mac packages properly prevents permission loss, broken symlinks, and false "file damaged" notifications on macOS Ventura, Sonoma, and Sequoia.',
      requirements: [
        'Keka (recommended free macOS archive extractor) or The Unarchiver',
        'Avoid macOS Archive Utility for large multi-part RAR files',
      ],
      steps: [
        {
          title: '1. Install Keka',
          desc: 'Download Keka from our Mac utilities or official site. Set it as the default utility for .7z, .rar, and .zip files.',
        },
        {
          title: '2. Mounting DMGs and PKGs',
          desc: 'Double click .dmg disk images to mount them. If an archive fails with an error like "no mountable filesystems", the download was corrupted or interrupted. Re-download or check the file hash.',
        },
        {
          title: '3. Moving Apps to /Applications',
          desc: 'Never run applications directly from inside a mounted .dmg disk image. Always drag the application icon into your /Applications directory before launching.',
        },
      ],
    },
  },
  {
    id: 'install-guide-mac',
    title: 'Install Guide (Mac)',
    platform: 'MAC',
    description: 'How to install Mac apps, Adobe releases, plugins, extensions, and packages from Keyframe downloads.',
    category: 'featured',
    content: {
      overview: 'Proper installation workflows for Mac editors, including Apple Silicon notarization bypass, terminal install scripts, and MediaCore plugin directories.',
      steps: [
        {
          title: '1. Handling macOS Gatekeeper Prompts',
          desc: 'When opening a newly installed app, macOS may warn that the developer cannot be verified. Go to System Settings > Privacy & Security > scroll down to Security > click "Open Anyway".',
        },
        {
          title: '2. Running Package Installers (PKG)',
          desc: 'Double-click the .pkg installer. Follow standard prompts. If installation fails at the validation step, right-click the PKG > Open to elevate permissions.',
        },
        {
          title: '3. Placing Plugins in MediaCore',
          desc: 'For manual plugin installs, place .plugin files inside: /Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore/. You will need your Mac administrator password.',
        },
      ],
    },
  },
  {
    id: 'unlicensed-fix-mac',
    title: 'Unlicensed Fix (Mac)',
    platform: 'MAC',
    description: 'How to stop the "This unlicensed Adobe app will be disabled" popup on MacOS.',
    category: 'featured',
    content: {
      overview: 'Eliminate the Adobe unlicensed popups on macOS caused by Adobe Genuine Service and background telemetry daemons.',
      steps: [
        {
          title: '1. Remove Adobe Genuine Service Daemon',
          desc: 'Open Terminal and execute the removal command to delete the AGS background monitor and launch agent.',
          command: 'sudo rm -rf "/Library/Application Support/Adobe/Adobe Desktop Service" "/Library/Application Support/Adobe/AdobeGCClient" ~/Library/LaunchAgents/com.adobe.GC.*',
        },
        {
          title: '2. Install a Network Firewall (LuLu by Objective-See)',
          desc: 'Install LuLu (open-source free Mac firewall). When After Effects or AGS attempts outbound communication to adobe.com genuine check endpoints, click Block.',
        },
        {
          title: '3. Host File Redirects',
          desc: 'Add the known Adobe validation domains to your /etc/hosts file redirected to 0.0.0.0 (e.g., 0.0.0.0 genuine.adobe.com, 0.0.0.0 cc-api-data.adobe.io).',
        },
      ],
    },
  },
  {
    id: 'maxon-fixes',
    title: 'Maxon (Red Giant) Fixes',
    platform: 'WINDOWS + MAC',
    description: 'Troubleshoot missing, unlicensed, and activation errors for Red Giant, Universe, and Trapcode plugins in After Effects.',
    category: 'featured',
    content: {
      overview: 'Fix red X watermarks, license errors, missing UI windows, and crash issues with Red Giant Universe, Trapcode Particular/Form, and Magic Bullet Looks in After Effects.',
      steps: [
        {
          title: '1. Resolve Red X Watermark',
          desc: 'A red X watermark means the plugin is running in trial mode. Open Maxon App. Log out, then log in using a free MyMaxon account, or use the offline license activator/Serial Filler tool.',
        },
        {
          title: '2. Clear Trapcode / GPU Cache',
          desc: 'If Trapcode Particular renders black frames or fails to emit particles, purge your cache in AE: Edit > Purge > All Memory & Disk Cache. Check that GPU Acceleration is enabled under Project Settings > Video Rendering and Effects.',
        },
        {
          title: '3. Red Giant Service Connection Error',
          desc: 'If Maxon App says "Cannot connect to background service", open Windows Services (or Mac Activity Monitor), look for "Red Giant Service", and restart it.',
        },
      ],
    },
  },
  {
    id: 'maxon-serial-filler',
    title: 'Maxon Serial Filler Method',
    platform: 'WINDOWS + MAC',
    description: 'License Red Giant, Universe, and Trapcode plugins using Maxon App 2024.5.0 and the Serial Filler tool.',
    category: 'featured',
    content: {
      overview: 'The proven offline licensing method for Red Giant Suite, Trapcode Suite, Magic Bullet Suite, and Universe using Maxon App 2024.5.0 and the automated Serial Filler script.',
      requirements: [
        'Maxon App v2024.5.0 (Do not update to 2025+ or cloud sync will reject legacy serials)',
        'Serial Filler utility executable / script',
      ],
      steps: [
        {
          title: '1. Install Maxon App 2024.5.0',
          desc: 'Install Maxon App 2024.5.0. Ensure auto-updates are disabled in the app preferences.',
        },
        {
          title: '2. Close Maxon App and Run Serial Filler',
          desc: 'Launch the Serial Filler tool with administrator / root privileges. It will automatically populate the local license database with valid lifetime serial numbers for Trapcode, Magic Bullet, Universe, and VFX.',
        },
        {
          title: '3. Launch AE and Verify Watermark Removal',
          desc: 'Create a solid layer in After Effects, add S_Glow or Particular, and confirm the red X watermark has vanished.',
        },
      ],
    },
  },
  {
    id: 'sourcing-anime-footage',
    title: 'Sourcing Anime Footage',
    platform: 'WINDOWS + MAC',
    description: 'Where to find anime for AMV and edit work — torrents, direct downloads, creditless OP/ED, clip libraries, and scenepacks.',
    category: 'featured',
    content: {
      overview: 'Comprehensive guide for video editors on acquiring clean, high-bitrate, creditless, uncompressed anime footage without subtitles or compression artifacts.',
      steps: [
        {
          title: '1. Torrents & Raw Blu-Ray Releases (Nyaa)',
          desc: 'The gold standard for AMV editing is raw BDMV or high-bitrate x264/x265 releases from Nyaa. Look for uploaders like Beatrice-Raws, ReinForce, or VCB-Studio. Avoid low-bitrate web-rips from streaming sites.',
        },
        {
          title: '2. Creditless Openings & Endings (NC OP/ED)',
          desc: 'Check AnimeThemes.moe for instant, direct-download creditless webm and mp4 openings and endings without karaoke text or credits.',
        },
        {
          title: '3. Scenepack Compilations',
          desc: 'For quick character edits, curated scenepacks on Mega or Google Drive provide 1080p clips organized by character or fight sequence. Always check if color correction was pre-applied before using in serious grading.',
        },
        {
          title: '4. Transcoding MKV/HEVC for After Effects',
          desc: 'After Effects often stutters or drops frames with 10-bit HEVC/x265 MKV containers. Use HandBrake, Shutter Encoder, or FFmpeg to transcode clips into Apple ProRes 422 or DNxHR for buttery smooth timeline scrubbing.',
          command: 'ffmpeg -i input.mkv -c:v prores_ks -profile:v 2 -c:a pcm_s16le output.mov',
        },
      ],
    },
  },
];

export const MORE_GUIDES_GROUPS: GuideGroup[] = [
  {
    id: 'group-windows',
    badge: 'WIN',
    title: 'Windows',
    items: [
      {
        id: 'genp-adobe-activation',
        title: 'GenP Adobe Activation',
        platform: 'WINDOWS',
        description: 'Install and patch Adobe Creative Cloud apps on Windows using GenP — Creative Cloud setup, patching workflow, and troubleshooting.',
        content: {
          overview: 'GenP is the open-source community patcher for Adobe Creative Cloud applications on Windows 10 & 11.',
          steps: [
            {
              title: '1. Install Creative Cloud & Desired Apps',
              desc: 'Install the official Adobe Creative Cloud app. Download your trial applications (After Effects, Premiere Pro, Photoshop, Media Encoder). Do NOT click "Start Free Trial" with credit card.',
            },
            {
              title: '2. Run Adobe-GenP.exe as Admin',
              desc: 'Extract GenP into an excluded folder. Run Adobe-GenP.exe as Administrator. Click "Search" to locate all installed Adobe apps. Click "Patch" to apply the offline license fix.',
            },
            {
              title: '3. Block AGS Telemetry',
              desc: 'Disable Adobe Genuine Service in services.msc to maintain permanent activation.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'group-mac',
    badge: 'MAC',
    title: 'Mac',
    items: [
      {
        id: 'macked-adobe-activation',
        title: 'MacKed Adobe Activation',
        platform: 'MAC',
        description: 'Install and activate Adobe Creative Cloud apps on MacOS using MacKed — offline and online workflows, permissions, and troubleshooting.',
        content: {
          overview: 'Complete guide for installing pre-activated Adobe software releases packaged for macOS Ventura, Sonoma, and Sequoia.',
          steps: [
            {
              title: '1. Mount DMG and Install Adobe App',
              desc: 'Open the DMG package. Run the install script or double-click the installer package. Provide system permissions when prompted.',
            },
            {
              title: '2. Run the Included Terminal Patch',
              desc: 'Most MacKed builds include a terminal patcher script. Open Terminal, drag and drop the script, press Enter, and enter your user password.',
            },
            {
              title: '3. Code Sign Verification',
              desc: 'If the app bounces in the dock and quits, re-sign the bundle locally using: sudo codesign --force --deep --sign - /Applications/Adobe\\ After\\ Effects\\ [Year]/Adobe\\ After\\ Effects\\ [Year].app',
            },
          ],
        },
      },
      {
        id: 'rosetta-m1-guide',
        title: 'Rosetta (M1+) Guide',
        platform: 'MAC',
        description: 'Run Intel-only After Effects plugins on Apple Silicon Macs using Rosetta 2.',
        content: {
          overview: 'How to run legacy Intel-compiled After Effects plugins and scripts on Apple Silicon M1, M2, M3, and M4 Macs.',
          steps: [
            {
              title: '1. Install Rosetta 2 via Terminal',
              desc: 'Run the Apple command line installer to enable the x86-64 to ARM64 translation environment.',
              command: 'softwareupdate --install-rosetta --agree-to-license',
            },
            {
              title: '2. AE 2023 vs AE 2024 Rosetta Limitation',
              desc: 'Starting in After Effects 2024, Adobe removed the "Open using Rosetta" option from Get Info. If you depend on Intel-only plugins that never received an Apple Silicon update, install After Effects 2023 (v23.6.5). Right-click the AE 2023 icon > Get Info > check "Open using Rosetta".',
            },
          ],
        },
      },
      {
        id: 'gatekeeper-quarantine-fixes',
        title: 'Gatekeeper & Quarantine Fixes',
        platform: 'MAC',
        description: 'Why MacOS blocks some apps, how to use normal approvals, and when terminal quarantine commands are appropriate.',
        content: {
          overview: 'Fix "App is damaged and cannot be opened" or "Apple cannot check it for malicious software" on macOS.',
          steps: [
            {
              title: '1. Standard Approval in System Settings',
              desc: 'Go to Apple menu > System Settings > Privacy & Security. Under the Security section, look for "[App Name] was blocked" and click "Open Anyway".',
            },
            {
              title: '2. Remove Quarantine Extended Attribute',
              desc: 'If the app continues to claim it is corrupted or damaged, remove the quarantine flag that macOS applies to web downloads via Terminal:',
              command: 'sudo xattr -rd com.apple.quarantine "/Applications/AppName.app"',
            },
            {
              title: '3. MediaCore Plugins Quarantine Removal',
              desc: 'If After Effects refuses to load plugins in MediaCore, strip the quarantine flag from the entire plugins directory:',
              command: 'sudo xattr -rd com.apple.quarantine "/Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore"',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'group-general',
    badge: 'AE',
    title: 'General After Effects',
    items: [
      {
        id: 'changing-ae-version',
        title: 'Changing After Effects Version',
        platform: 'WINDOWS + MAC',
        description: 'Move between AE yearly versions without losing presets, plugins, scripts, or project compatibility.',
        content: {
          overview: 'Safely upgrade or downgrade between After Effects versions (e.g. 2022, 2023, 2024, 2025) without breaking your workspace.',
          steps: [
            {
              title: '1. Keeping Multiple Versions Simultaneously',
              desc: 'Adobe allows multiple major versions installed side-by-side (e.g. AE 2023 and AE 2024). When installing a new version, uncheck "Remove old versions".',
            },
            {
              title: '2. Preserving User Presets',
              desc: 'Copy your "User Presets" directory before switching versions. Path: Documents/Adobe/After Effects [Old Version]/User Presets > copy into Documents/Adobe/After Effects [New Version]/User Presets.',
            },
            {
              title: '3. Saving Projects for Older Versions',
              desc: 'In newer AE: File > Save As > Save a Copy As 24.x (or Previous Version) so older AE installs can open the project without error.',
            },
          ],
        },
      },
      {
        id: 'ae-installation-paths',
        title: 'After Effects Installation Paths',
        platform: 'WINDOWS + MAC',
        description: 'A clean reference for presets, plugins, extensions, scripts, and user folders on both operating systems.',
        content: {
          overview: 'Master reference list of filesystem directory paths for Windows and macOS.',
          steps: [
            {
              title: 'Windows Paths',
              desc: '• MediaCore Plugins: C:\\Program Files\\Adobe\\Common\\Plug-ins\\7.0\\MediaCore\n• User Presets: C:\\Users\\[User]\\Documents\\Adobe\\After Effects [Version]\\User Presets\n• Scripts: C:\\Program Files\\Adobe\\Adobe After Effects [Version]\\Support Files\\Scripts\n• ScriptUI Panels: C:\\Program Files\\Adobe\\Adobe After Effects [Version]\\Support Files\\Scripts\\ScriptUI Panels\n• CEP Extensions: C:\\Program Files (x86)\\Common Files\\Adobe\\CEP\\extensions',
            },
            {
              title: 'macOS Paths',
              desc: '• MediaCore Plugins: /Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore/\n• User Presets: ~/Documents/Adobe/After Effects [Version]/User Presets/\n• Scripts: /Applications/Adobe After Effects [Version]/Scripts/\n• ScriptUI Panels: /Applications/Adobe After Effects [Version]/Scripts/ScriptUI Panels/\n• CEP Extensions: /Library/Application Support/Adobe/CEP/extensions/',
            },
          ],
        },
      },
      {
        id: 'maxon-fixes-item',
        title: 'Maxon (Red Giant) Fixes',
        platform: 'WINDOWS + MAC',
        description: 'Troubleshoot missing, unlicensed, and activation errors for Red Giant, Universe, and Trapcode plugins in After Effects.',
      },
      {
        id: 'maxon-serial-filler-item',
        title: 'Maxon Serial Filler Method',
        platform: 'WINDOWS + MAC',
        description: 'License Red Giant, Universe, and Trapcode plugins using Maxon App 2024.5.0 and the Serial Filler tool.',
      },
      {
        id: 'plugin-install-locations',
        title: 'Plugin Install Locations',
        platform: 'WINDOWS + MAC',
        description: 'Where common AE plugins install and how to verify After Effects is reading them.',
        content: {
          overview: 'Understanding where BorisFX, Maxon, Video Copilot, and independent plugins install.',
          steps: [
            {
              title: '1. The Shared MediaCore Folder',
              desc: '90% of modern video plugins (.aex on Windows, .plugin on Mac) install into the shared MediaCore folder so both After Effects and Premiere Pro can read them without duplicate files.',
            },
            {
              title: '2. Dedicated Host Plug-ins Folder',
              desc: 'Some older plugins install into Support Files/Plug-ins inside the AE install folder. If a plugin does not load in MediaCore, check if the installer dropped it into the host-specific Plug-ins directory.',
            },
          ],
        },
      },
      {
        id: 'topaz-export-workflow',
        title: 'Topaz Export Workflow',
        platform: 'WINDOWS + MAC',
        description: 'A practical path from AE export to Topaz upscale and final compression.',
        content: {
          overview: 'How to export from After Effects into Topaz Video AI for AI upscaling and motion de-blurring without generational quality loss.',
          steps: [
            {
              title: '1. Export Lossless Master from AE Render Queue',
              desc: 'Never export an MP4 or H.264 into Topaz. Use AE Render Queue > Format: QuickTime > Video Codec: Apple ProRes 422 HQ (or GoPro CineForm RGB 12-bit).',
            },
            {
              title: '2. Topaz Video AI Settings',
              desc: 'Import the ProRes .mov file. Model: Proteus (Manual) for fine-grain tuning, or Iris for anime / face enhancement. Keep grain low (1–2) to avoid noisy render artifacts.',
            },
            {
              title: '3. Final HandBrake Pass',
              desc: 'Compress the Topaz ProRes output using HandBrake (CRF 18, x264/x265, veryslow preset) for clean web sharing.',
            },
          ],
        },
      },
      {
        id: 'plugin-starter-guide',
        title: 'Plugin Starter Guide',
        platform: 'WINDOWS + MAC',
        description: 'Which plugin suites matter first and which ones can wait.',
        content: {
          overview: 'Recommended tier list for editors starting out so you do not overload After Effects with hundreds of unused effects.',
          steps: [
            {
              title: 'Tier 1: Essential (Install First)',
              desc: '• Sapphire (S_Glow, S_EdgeRays, S_Shake, S_Distort)\n• Deep Glow (Significantly faster & cleaner falloff than default AE glow)\n• RSMB (ReelSmart Motion Blur)\n• BCC / Continuum (BCC Lens Blur, BCC Prism)',
            },
            {
              title: 'Tier 2: Intermediate (Workflow & VFX)',
              desc: '• Red Giant Trapcode Particular (Particle emitters)\n• Magic Bullet Looks (Color grading & film simulation)\n• Flow (Speed curve easing editor)\n• Overlord (Vector sync between AI & AE)',
            },
          ],
        },
      },
      {
        id: 'preset-organization',
        title: 'Preset Organization',
        platform: 'WINDOWS + MAC',
        description: 'How to organize shakes, transitions, colorings, text effects, and utility presets.',
        content: {
          overview: 'Clean up your Effects & Presets panel so you can find shakes, CCs, and transitions instantly.',
          steps: [
            {
              title: '1. Numerical Folder Prefixes',
              desc: 'In your User Presets directory, use prefix numbers so folders stay pinned at the top:\n01_SHAKES\n02_TRANSITIONS\n03_COLORING (CC)\n04_TEXT EFFECTS\n05_UTILITIES',
            },
            {
              title: '2. Refreshing Without Restarting AE',
              desc: 'Right-click inside the Effects & Presets panel and click "Refresh" to load newly added .ffx preset files immediately.',
            },
          ],
        },
      },
      {
        id: 'render-settings',
        title: 'Render Settings',
        platform: 'WINDOWS + MAC',
        description: 'Practical render, master export, HandBrake compression, and social delivery settings.',
        content: {
          overview: 'The definitive two-pass workflow: master export in AE Render Queue, followed by HandBrake compression.',
          steps: [
            {
              title: '1. Master Export (After Effects)',
              desc: 'Composition > Add to Render Queue. Format: QuickTime. Codec: Apple ProRes 422 HQ (or Animation / CineForm). Render out the lossless master.',
            },
            {
              title: '2. HandBrake Compression',
              desc: 'Dimensions: 1920x1080 (or match source). Framerate: 60 FPS (Constant Framerate). Video Codec: H.264 (x264) or H.265. Constant Quality: RF 18. Encoder Preset: Slow or VerySlow.',
            },
          ],
        },
      },
      {
        id: 'sourcing-anime-footage-item',
        title: 'Sourcing Anime Footage',
        platform: 'WINDOWS + MAC',
        description: 'Where to find anime for AMV and edit work — torrents, direct downloads, creditless OP/ED, clip libraries, and scenepacks.',
      },
      {
        id: 'missing-effects-fix',
        title: 'Missing Effects Fix',
        platform: 'WINDOWS + MAC',
        description: 'How to diagnose projects that open with missing plugins or disabled effects.',
        content: {
          overview: 'Resolve project warnings: "This project contains 1 reference to a missing effect".',
          steps: [
            {
              title: '1. Find Which Layer Has the Missing Effect',
              desc: 'In the timeline search bar, type "Missing". After Effects will highlight every layer containing an unresolved effect.',
            },
            {
              title: '2. Identify the Plugin Name',
              desc: 'The Effect Controls panel will show the missing effect name in parentheses (e.g. "(S_Glow)" or "(Deep Glow)").',
            },
            {
              title: '3. Reinstall or Replace',
              desc: 'Install the corresponding plugin package and restart AE, or substitute with an equivalent native effect.',
            },
          ],
        },
      },
    ],
  },
];
