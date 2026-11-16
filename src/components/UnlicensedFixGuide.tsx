import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  FolderLock,
  Terminal,
  ShieldCheck,
  Ban,
  Flame,
  Globe,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface UnlicensedFixGuideProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

const SECTIONS = [
  { id: 'why-it-happens', label: 'Why It Happens' },
  { id: 'disable-ags', label: '1. Disable AGS' },
  { id: 'firewall-blocking', label: '2. Firewall Block' },
  { id: 'hosts-file', label: '3. Hosts Blocklist' },
  { id: 'prevent-updates', label: '4. Prevent Updates' },
  { id: 'repatch-genp', label: '5. Re-Apply Patch' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

export const UnlicensedFixGuide: React.FC<UnlicensedFixGuideProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [activeSection, setActiveSection] = useState<string>('why-it-happens');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
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

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const HOSTS_ENTRIES = `# Adobe Genuine & Telemetry Blocklist
0.0.0.0 genuine.adobe.com
0.0.0.0 prod.adobegenuine.com
0.0.0.0 agsupdate.adobe.com
0.0.0.0 cc-api-data.adobe.io
0.0.0.0 ic.adobe.io
0.0.0.0 lcs-cpc.adobe.io
0.0.0.0 lcs-robt.adobe.io
0.0.0.0 1hzopx6ugi.adobe.io
0.0.0.0 p13n.adobe.io
0.0.0.0 telemetry.adobe.io
0.0.0.0 adobedev.outsystemsenterprise.com
0.0.0.0 trials.adobe.com
0.0.0.0 oobe.adobe.com
0.0.0.0 3dns-2.adobe.com
0.0.0.0 3dns-3.adobe.com
0.0.0.0 adobe-dns.adobe.com
0.0.0.0 adobe-dns-2.adobe.com
0.0.0.0 adobe-dns-3.adobe.com`;

  const POWERSHELL_FIREWALL_BLOCK = `# Run in PowerShell as Administrator to block Adobe apps from internet checks:
New-NetFirewallRule -DisplayName "Block Adobe After Effects Outbound" -Direction Outbound -Program "C:\\Program Files\\Adobe\\Adobe After Effects 2025\\Support Files\\AfterFX.exe" -Action Block
New-NetFirewallRule -DisplayName "Block Adobe Premiere Pro Outbound" -Direction Outbound -Program "C:\\Program Files\\Adobe\\Adobe Premiere Pro 2025\\Adobe Premiere Pro.exe" -Action Block
New-NetFirewallRule -DisplayName "Block Adobe Photoshop Outbound" -Direction Outbound -Program "C:\\Program Files\\Adobe\\Adobe Photoshop 2025\\Photoshop.exe" -Action Block
New-NetFirewallRule -DisplayName "Block Adobe Media Encoder Outbound" -Direction Outbound -Program "C:\\Program Files\\Adobe\\Adobe Media Encoder 2025\\Adobe Media Encoder.exe" -Action Block
New-NetFirewallRule -DisplayName "Block Adobe Illustrator Outbound" -Direction Outbound -Program "C:\\Program Files\\Adobe\\Adobe Illustrator 2025\\Support Files\\Contents\\Windows\\Illustrator.exe" -Action Block`;

  const POWERSHELL_AGS_REMOVE = `# Stop and disable Adobe Genuine Software Integrity Service
Stop-Service -Name "AGSService" -Force -ErrorAction SilentlyContinue
Set-Service -Name "AGSService" -StartupType Disabled -ErrorAction SilentlyContinue

# Terminate running AGS telemetry processes
Get-Process -Name "AdobeGCClient", "AGSService" -ErrorAction SilentlyContinue | Stop-Process -Force

# Rename/Remove Adobe Genuine folders to prevent respawn
$agsPath = "\${env:ProgramFiles(x86)}\\Common Files\\Adobe\\AdobeGCClient"
if (Test-Path $agsPath) {
    Rename-Item -Path $agsPath -NewName "AdobeGCClient_Disabled" -Force -ErrorAction SilentlyContinue
}`;

  return (
    <main className="min-h-screen bg-black text-white py-8 sm:py-12 selection:bg-white selection:text-black">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Breadcrumbs: Home / Guides / Unlicensed Fix (Windows) */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-zinc-500">
          <button
            type="button"
            onClick={onBack}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigatePage?.('guides')}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Guides
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Unlicensed Fix (Windows)</span>
        </nav>

        {/* Page Header */}
        <header className="mb-8">
          <div className="inline-flex items-center rounded border border-zinc-800 bg-[#121212] px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-zinc-300 uppercase mb-3">
            WINDOWS GUIDE • SYSTEM HARDENING
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-3">
            Unlicensed <span className="italic font-serif">Fix</span> (Windows)
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Stop the persistent &ldquo;This unlicensed Adobe app will be disabled soon&rdquo; banner, remove Adobe Genuine Service, and lock down telemetry permanently.
          </p>
        </header>

        {/* Sticky Sub-navigation */}
        <div className="sticky top-0 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 bg-black/90 backdrop-blur-md border-b border-zinc-800 py-3 mb-10 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeSection === sec.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Body Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* SECTION 1: Why It Happens */}
            <section id="why-it-happens" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-zinc-300" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Why Does the Unlicensed Popup Appear?
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                If you see a floating overlay with a 10-day countdown warning stating &ldquo;This unlicensed app will be disabled soon&rdquo;, your installed Adobe program (After Effects, Premiere Pro, Photoshop, or Illustrator) triggered an online validation check.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-4 space-y-2">
                  <div className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-zinc-300" />
                    <span>1. AGS Daemon</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Adobe installs <span className="font-mono text-zinc-300">AGSService.exe</span> silently in the background to scan your drives for modified DLLs and patch signatures.
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-4 space-y-2">
                  <div className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                    <Globe className="w-4 h-4 text-zinc-300" />
                    <span>2. Cloud Ping</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    On launch, the app contacts <span className="font-mono text-zinc-300">genuine.adobe.com</span> to verify your Adobe ID subscription status.
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-4 space-y-2">
                  <div className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-zinc-300" />
                    <span>3. CC Auto-Update</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    The Creative Cloud desktop client automatically installs updates, overwriting patched executables with stock unactivated files.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: Method 1 - Disable AGS */}
            <section id="disable-ags" className="scroll-mt-24 space-y-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Ban className="w-5 h-5 text-zinc-300" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Step 1: Disable &amp; Terminate Adobe Genuine Service (AGS)
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The most direct trigger for the popup is the background service <strong className="text-zinc-200">Adobe Genuine Software Integrity Service</strong>. Disabling this service stops background drive scans.
              </p>

              {/* GUI Instructions */}
              <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-3">
                <h3 className="font-sans text-sm font-bold text-white flex items-center gap-2">
                  <span>Option A: Windows Services Manager (GUI)</span>
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <li>
                    Press <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-white">Win + R</kbd>, type <code className="font-mono text-white">services.msc</code>, and hit Enter.
                  </li>
                  <li>
                    Scroll down and find <strong className="text-white">Adobe Genuine Software Integrity Service</strong>.
                  </li>
                  <li>
                    Right-click the entry and choose <strong className="text-white">Properties</strong>.
                  </li>
                  <li>
                    Under <strong className="text-white">Startup type</strong>, select <span className="font-mono text-white font-semibold">Disabled</span>.
                  </li>
                  <li>
                    Under Service status, click <strong className="text-white">Stop</strong>, then click <strong className="text-white">Apply</strong> and <strong className="text-white">OK</strong>.
                  </li>
                </ol>
              </div>

              {/* One-Click PowerShell Script */}
              <div className="rounded-lg border border-zinc-800 bg-[#0e0e11] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-sm font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-400" />
                    <span>Option B: Instant PowerShell Command (Admin)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleCopy(POWERSHELL_AGS_REMOVE, 'ags-powershell')}
                    className="flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    {copiedKey === 'ags-powershell' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY SCRIPT</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Right-click the Start Menu icon &rarr; select <strong className="text-white">Terminal (Admin)</strong> or <strong className="text-white">PowerShell (Admin)</strong> &rarr; paste and run:
                </p>
                <div className="relative rounded bg-black p-3.5 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                  <pre>{POWERSHELL_AGS_REMOVE}</pre>
                </div>
              </div>
            </section>

            {/* SECTION 3: Method 2 - Firewall Block */}
            <section id="firewall-blocking" className="scroll-mt-24 space-y-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-zinc-300" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Step 2: Block Outbound Network Access in Windows Firewall (Recommended)
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                This is the <strong className="text-zinc-200">single most reliable fix</strong>. If AfterFX.exe or Premiere Pro.exe cannot connect to Adobe&apos;s license verification servers, the app stays in permanent offline working mode and cannot show the countdown popup.
              </p>

              {/* GUI Steps */}
              <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-3">
                <h3 className="font-sans text-sm font-bold text-white">
                  Manual Steps (Windows Defender Firewall with Advanced Security)
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <li>
                    Press <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-white">Win + S</kbd>, search for <strong className="text-white">Windows Defender Firewall with Advanced Security</strong>, and open it.
                  </li>
                  <li>
                    In the left sidebar, click <strong className="text-white">Outbound Rules</strong>.
                  </li>
                  <li>
                    In the right Actions panel, click <strong className="text-white">New Rule...</strong>
                  </li>
                  <li>
                    Rule Type: Select <strong className="text-white">Program</strong> &rarr; click Next.
                  </li>
                  <li>
                    Program Path: Choose <strong className="text-white">This program path</strong> and browse to your application executable:
                    <ul className="mt-2 space-y-1 pl-4 list-disc text-zinc-400 font-mono text-[11px]">
                      <li>After Effects: <code className="text-zinc-300">C:\Program Files\Adobe\Adobe After Effects 2025\Support Files\AfterFX.exe</code></li>
                      <li>Premiere Pro: <code className="text-zinc-300">C:\Program Files\Adobe\Adobe Premiere Pro 2025\Adobe Premiere Pro.exe</code></li>
                      <li>Photoshop: <code className="text-zinc-300">C:\Program Files\Adobe\Adobe Photoshop 2025\Photoshop.exe</code></li>
                    </ul>
                  </li>
                  <li>
                    Action: Select <strong className="text-white">Block the connection</strong> &rarr; click Next.
                  </li>
                  <li>
                    Profile: Ensure all three are checked (<strong className="text-white">Domain, Private, Public</strong>) &rarr; click Next.
                  </li>
                  <li>
                    Name: Give it a clear name (e.g. <code className="text-white font-mono">Block Adobe After Effects</code>) &rarr; click <strong className="text-white">Finish</strong>.
                  </li>
                </ol>
              </div>

              {/* Automated PowerShell Command */}
              <div className="rounded-lg border border-zinc-800 bg-[#0e0e11] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-sm font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-400" />
                    <span>Instant PowerShell 1-Click Outbound Firewall Rules</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleCopy(POWERSHELL_FIREWALL_BLOCK, 'firewall-powershell')}
                    className="flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    {copiedKey === 'firewall-powershell' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY COMMANDS</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Run PowerShell as Administrator and paste the following commands to instantly create firewall blocks for all 2025 Adobe editing apps:
                </p>
                <div className="relative rounded bg-black p-3.5 border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                  <pre>{POWERSHELL_FIREWALL_BLOCK}</pre>
                </div>
              </div>
            </section>

            {/* SECTION 4: Method 3 - Hosts File Blocking */}
            <section id="hosts-file" className="scroll-mt-24 space-y-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-zinc-300" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Step 3: Block Telemetry &amp; Licensing in the Windows Hosts File
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Adding redirect lines in Windows <code className="text-white font-mono">hosts</code> routes all Adobe verification calls directly back to <code className="text-white font-mono">0.0.0.0</code> (your local machine), silently neutralizing them before they leave your computer.
              </p>

              <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-sans text-sm font-bold text-white">
                      Hosts File Blocklist Entries
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      File location: C:\Windows\System32\drivers\etc\hosts
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(HOSTS_ENTRIES, 'hosts-entries')}
                    className="flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    {copiedKey === 'hosts-entries' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY BLOCKLIST</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded bg-black p-3.5 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre>{HOSTS_ENTRIES}</pre>
                </div>

                <div className="rounded border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400 leading-relaxed space-y-1">
                  <span className="font-bold text-white">How to edit the hosts file safely:</span>
                  <p>
                    Open Notepad as Administrator (<kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 font-mono text-[10px]">Win + S</kbd> &rarr; Notepad &rarr; Right click &ldquo;Run as administrator&rdquo;). Press <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 font-mono text-[10px]">Ctrl + O</kbd>, navigate to <code className="text-zinc-200">C:\Windows\System32\drivers\etc\</code>, select &ldquo;All Files (*.*)&rdquo; in the bottom-right dropdown, open <code className="text-zinc-200">hosts</code>, paste the list at the bottom, and press <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 font-mono text-[10px]">Ctrl + S</kbd>.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: Method 4 - Prevent Updates */}
            <section id="prevent-updates" className="scroll-mt-24 space-y-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-zinc-300" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Step 4: Turn Off Auto-Updates in Creative Cloud Desktop
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                If you keep the Creative Cloud Desktop application installed, it will silently patch executables during overnight update cycles. Turning off automatic updates prevents Adobe from wiping out your activated binaries.
              </p>

              <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-3">
                <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <li>Open <strong className="text-white">Creative Cloud Desktop</strong>.</li>
                  <li>Click your account avatar in the top-right &rarr; select <strong className="text-white">Preferences</strong> (or press <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 font-mono text-[10px]">Ctrl + ,</kbd>).</li>
                  <li>Click the <strong className="text-white">Apps</strong> tab on the left.</li>
                  <li>Find the <strong className="text-white">Auto-update</strong> toggle switch and switch it to <span className="font-mono text-red-400 font-semibold">OFF</span>.</li>
                  <li>Click <strong className="text-white">Done</strong> in the bottom right.</li>
                </ol>
              </div>
            </section>

            {/* SECTION 6: Method 5 - Re-apply GenP */}
            <section id="repatch-genp" className="scroll-mt-24 space-y-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-zinc-300" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Step 5: Re-Apply GenP Patch (If Already Overwritten)
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                If the warning banner is already showing when you open After Effects or Premiere Pro, the app has already had its activation library overwritten. You must re-apply the patch tool.
              </p>

              <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-3">
                <ol className="list-decimal list-inside space-y-2.5 text-xs text-zinc-300 leading-relaxed">
                  <li>
                    Close all running Adobe applications and end tasks in Task Manager (<code className="font-mono text-zinc-300">AfterFX.exe</code>, <code className="font-mono text-zinc-300">Adobe Premiere Pro.exe</code>).
                  </li>
                  <li>
                    Launch <strong className="text-white">Adobe-GenP-3.4.x.exe</strong> (or current release) as Administrator.
                  </li>
                  <li>
                    Click <strong className="text-white">Search</strong> (the magnifying glass icon) and allow GenP to scan your installed Adobe program directories.
                  </li>
                  <li>
                    Review the scanned results list and uncheck any items you do not want touched (e.g. Acrobat or CC itself if desired).
                  </li>
                  <li>
                    Click <strong className="text-white">Patch</strong> (the pill icon). Wait until the status bar displays <span className="font-mono text-emerald-400 font-semibold">&ldquo;Medicine applied!&rdquo;</span>.
                  </li>
                  <li>
                    Re-open After Effects or Premiere Pro. The unlicensed countdown popup will be gone.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 7: Troubleshooting */}
            <section id="troubleshooting" className="scroll-mt-24 space-y-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-zinc-300" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Troubleshooting &amp; Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <h3 className="font-sans text-sm font-bold text-white">
                    Will blocking the firewall break my third-party plugins (Boris FX, Maxon, Sapphire)?
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <strong className="text-white">No.</strong> Third-party plugins execute locally inside the After Effects process and communicate directly with your GPU via CUDA, Metal, or DirectX. They do not require Adobe cloud servers to operate.
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <h3 className="font-sans text-sm font-bold text-white">
                    The popup still appears after blocking the firewall. What do I do?
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Adobe caches the countdown state locally on your drive. Open File Explorer, paste <code className="font-mono text-zinc-300">%LOCALAPPDATA%\Adobe\</code> into the address bar, and look for an <code className="font-mono text-white">OOBE</code> or <code className="font-mono text-white">AdobeGCClient</code> folder. Delete or rename these folders, re-run GenP, and restart your computer.
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <h3 className="font-sans text-sm font-bold text-white">
                    Can I use Adobe Fonts or Creative Cloud Libraries with firewall rules active?
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Cloud-hosted assets require an active connection to Adobe servers. If you need Adobe Fonts, you can sync your fonts first via Creative Cloud, install them locally to Windows (<code className="font-mono text-zinc-300">C:\Windows\Fonts</code>), and then re-enable firewall blocking on AfterFX.exe.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Summary Card */}
            <div className="rounded-xl border border-zinc-800 bg-[#121215] p-5 space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-zinc-400" />
                <span>Executive Checklist</span>
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Stop &amp; disable <code className="font-mono text-[11px] text-zinc-200">AGSService</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Add outbound firewall blocks to <code className="font-mono text-[11px] text-zinc-200">AfterFX.exe</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Add <code className="font-mono text-[11px] text-zinc-200">0.0.0.0</code> redirects in hosts file</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Toggle off CC Desktop Auto-Updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">✓</span>
                  <span>Re-apply GenP if binaries were overwritten</span>
                </li>
              </ul>
            </div>

            {/* Related Guides Navigation */}
            <div className="rounded-xl border border-zinc-800 bg-[#121215] p-5 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Related References
              </h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('install-guide')}
                  className="w-full text-left rounded border border-zinc-800 bg-black p-3 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors group flex items-center justify-between"
                >
                  <div>
                    <span className="font-sans text-xs font-bold text-white group-hover:text-zinc-200">
                      Windows Install Guide
                    </span>
                    <p className="text-[11px] text-zinc-500">Installation protocols &amp; prerequisites</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigatePage?.('extract-guide')}
                  className="w-full text-left rounded border border-zinc-800 bg-black p-3 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors group flex items-center justify-between"
                >
                  <div>
                    <span className="font-sans text-xs font-bold text-white group-hover:text-zinc-200">
                      Archive Extraction Guide
                    </span>
                    <p className="text-[11px] text-zinc-500">Proper 7-Zip decompression rules</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigatePage?.('tutorials')}
                  className="w-full text-left rounded border border-zinc-800 bg-black p-3 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors group flex items-center justify-between"
                >
                  <div>
                    <span className="font-sans text-xs font-bold text-white group-hover:text-zinc-200">
                      Visual Video Tutorials
                    </span>
                    <p className="text-[11px] text-zinc-500">30 recorded video walkthroughs</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>RETURN TO GUIDES</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
