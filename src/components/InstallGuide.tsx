import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  FolderLock,
  Wrench,
  CheckCircle2,
  ExternalLink,
  Terminal,
} from 'lucide-react';

interface InstallGuideProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

const SECTIONS = [
  { id: 'before-you-install', label: 'Before You Install' },
  { id: 'running-setup', label: 'Running Setup' },
  { id: 'cracks-and-patches', label: 'Cracks & Patches' },
  { id: 'blocking-updates', label: 'Blocking Updates' },
  { id: 'common-errors', label: 'Common Errors' },
];

export const InstallGuide: React.FC<InstallGuideProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [activeSection, setActiveSection] = useState<string>('before-you-install');
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

  const hostsPath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
  const sampleHostsEntries = `127.0.0.1 activation.adobe.com\n127.0.0.1 lmlicenses.wip4.adobe.com\n127.0.0.1 na1r.services.adobe.com`;

  return (
    <main className="min-h-screen bg-black text-white py-8 sm:py-12 selection:bg-white selection:text-black">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Breadcrumbs matching image: Home / Windows / Install Guide */}
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
            onClick={() => onNavigatePage?.('windows')}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Windows
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Install Guide</span>
        </nav>

        {/* Page Header matching image layout */}
        <header className="mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-3">
            Install <span className="italic font-serif">Guide</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed mb-4">
            How to properly install and configure software on Windows.
          </p>

          <div className="inline-flex items-center rounded border border-zinc-800 bg-[#121212] px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
            WINDOWS GUIDE
          </div>
        </header>

        {/* 3-Column / Responsive Layout matching screenshot */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* LEFT SIDEBAR: SECTIONS */}
          <aside className="w-full lg:w-48 shrink-0 lg:sticky lg:top-20 self-start">
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-3 lg:p-2">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 pt-2 pb-2">
                SECTIONS
              </div>
              <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`block w-full text-left whitespace-nowrap rounded px-3 py-2 text-xs transition-colors ${
                        isActive
                          ? 'bg-zinc-800 text-white font-medium shadow-sm'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                      }`}
                    >
                      {sec.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MAIN CONTENT COLUMN */}
          <article className="min-w-0 flex-1 space-y-12">
            {/* SECTION 1: BEFORE YOU INSTALL */}
            <section id="before-you-install" className="scroll-mt-24">
              <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                PREREQUISITES
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                Before You Install
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                Before running any installer or patcher, make sure your system is ready. Skipping these steps is the most common reason installs fail or software won’t launch.
              </p>

              {/* Sub-item 1: Add antivirus exclusions */}
              <div className="space-y-6">
                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Add antivirus exclusions
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    Windows Defender will quarantine or delete modified files or setup scripts during installation. Add both the folder you’re installing from and the destination folder to your exclusion list <span className="italic text-zinc-200">before</span> you begin. See our{' '}
                    <button
                      type="button"
                      onClick={() => onNavigatePage?.('extract-guide')}
                      className="text-white font-semibold underline underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors"
                    >
                      Extract Guide — Exclusions
                    </button>{' '}
                    section for step-by-step instructions.
                  </p>
                </div>

                {/* Sub-item 2: Install Visual C++ Redistributables */}
                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Install Visual C++ Redistributables
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-3">
                    Most Windows applications depend on Visual C++ runtime libraries. If these are missing, you’ll get errors like{' '}
                    <code className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-200">
                      MSVCP110.dll not found
                    </code>{' '}
                    or{' '}
                    <code className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-200">
                      VCRUNTIME140.dll not found
                    </code>{' '}
                    on launch. Install the full package from Microsoft — get{' '}
                    <strong className="text-white font-semibold">both the x86 and x64 versions</strong>. For{' '}
                    <code className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-200">
                      0xc0000142
                    </code>
                    , also check the FAQ: recent After Effects builds can throw that error on CPUs without AVX2.
                  </p>
                  <a
                    href="https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white underline underline-offset-4"
                  >
                    Microsoft Visual C++ Redistributable Official Downloads <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Sub-item 3: Install .NET Framework */}
                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Install .NET Framework
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-2">
                    Some applications require .NET Framework (usually 4.8 or later). Windows 10 and 11 include it by default, but if the installer asks for it or the app fails to start with a .NET error, download the latest version from Microsoft.
                  </p>
                  <a
                    href="https://dotnet.microsoft.com/en-us/download/dotnet-framework"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white underline underline-offset-4"
                  >
                    Microsoft .NET Framework Official Downloads <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Sub-item 4: Disable real-time protection (optional) */}
                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Disable real-time protection (optional)
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-4">
                    If exclusions aren’t enough — some patchers and custom keygens get flagged regardless — you can temporarily disable Defender’s real-time protection during installation. Navigate to <span className="font-mono text-xs text-zinc-200">Settings → Windows Security → Virus & threat protection → Manage settings</span> and toggle off <span className="text-white font-medium">Real-time protection</span>. Turn it back on after you’re done.
                  </p>

                  <div className="rounded-md border border-zinc-800 bg-[#121212] p-4 flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Only disable real-time protection temporarily and only for files you trust. Always re-enable it once the installation is complete.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: RUNNING SETUP */}
            <section id="running-setup" className="scroll-mt-24">
              <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                INSTALLATION
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                Running the Installer
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                After extracting the archive (see our{' '}
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('extract-guide')}
                  className="text-white font-semibold underline underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors"
                >
                  Extract Guide
                </button>{' '}
                if you haven’t), open the extracted folder. What you find inside depends on the release.
              </p>

              <div className="space-y-6">
                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Standard installer (setup.exe / install.exe)
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    Right-click the installer and select <strong className="text-white font-semibold">Run as administrator</strong>. This ensures the installer has permission to write to protected directories like Program Files. Follow the on-screen prompts — choose your install location, select components, and let it finish. Don’t launch the application yet if the release includes a crack or patch.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Pre-cracked / portable application
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    Some releases don’t have an installer at all — the application is already cracked and ready to run. Just move the folder to wherever you want it (e.g. <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">C:\Programs\</code>) and run the .exe directly. You can right-click the executable and select <strong className="text-white font-semibold">Create shortcut</strong> to pin it to your desktop or taskbar.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Check the readme or .nfo file
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    Most releases include a <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">readme.txt</code>, <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">install.txt</code>, or <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">.nfo</code> file with specific instructions. Always read this first — it tells you the install order, which files to copy, and any special steps required for that particular release. When in doubt, follow the readme.
                  </p>
                </div>

                <div className="rounded-md border border-zinc-800 bg-[#121212] p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-zinc-300 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Always run installers and patchers as administrator. Without elevated privileges, they may silently fail to patch system-level files or write to protected directories.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: CRACKS & PATCHES */}
            <section id="cracks-and-patches" className="scroll-mt-24">
              <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                ACTIVATION
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                Applying Cracks & Patches
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                A crack bypasses the software’s licensing check so it runs without a valid license. The method varies by release, but most fall into one of these categories.
              </p>

              <div className="space-y-6">
                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Patcher / crack executable
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-2">
                    The most common method. After installing the software, run the included patcher (usually named <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">Patch.exe</code>, <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">Crack.exe</code>, or similar). Right-click it, select <strong className="text-white font-semibold">Run as administrator</strong>, and point it to the application’s install directory if prompted. The patcher modifies the original executable to bypass license verification.
                  </p>
                  <p className="font-sans text-xs text-zinc-400 italic">
                    Important: Make sure the application is fully closed before patching. Some patchers won’t work if the target process is running.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    File replacement
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    Some releases include pre-patched files (usually DLLs or the main executable) that you copy into the install directory, replacing the originals. Navigate to where the software was installed (e.g. <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">C:\Program Files\AppName\</code>), and paste the cracked files, overwriting when prompted.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Keygen (key generator)
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    A keygen generates a serial or license string that the modified installer or patch expects. Run it, copy the generated key, then enter it in the application’s activation dialog. Some keygens also generate additional data like a registration name or organization — enter exactly what the keygen provides.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Hosts file / firewall block
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    Many cracks include a hosts file modification or firewall rules to block the application from contacting its license server. Without this, the software may re-verify your license online and detect the crack. See the{' '}
                    <button
                      type="button"
                      onClick={() => scrollToSection('blocking-updates')}
                      className="text-white font-semibold underline underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors"
                    >
                      Blocking Updates
                    </button>{' '}
                    section below for details.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: BLOCKING UPDATES */}
            <section id="blocking-updates" className="scroll-mt-24">
              <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                POST-INSTALL
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                Blocking Updates
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                After installing and activating cracked software, you need to prevent it from updating or phoning home. An official update will almost always overwrite the crack and re-enable licensing checks.
              </p>

              <div className="space-y-6">
                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Disable auto-updates in the application
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    Most applications have an auto-update setting in their preferences. Turn it off immediately after your first launch. For Adobe products, also disable the Adobe Update Manager — it runs as a background service and can push updates even if the app itself has updates disabled.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Edit the hosts file
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-3">
                    The hosts file lets you block specific domains at the system level. By pointing license and update servers to 127.0.0.1, the software can’t reach them. The file is located at:
                  </p>

                  <div className="mb-4 flex items-center justify-between rounded-md border border-zinc-800 bg-[#121212] px-3.5 py-2.5">
                    <code className="font-mono text-xs text-zinc-200 break-all select-all">
                      {hostsPath}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopy(hostsPath, 'hosts-path')}
                      className="ml-3 inline-flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 font-mono text-xs text-white hover:bg-zinc-700 transition-colors shrink-0"
                    >
                      {copiedKey === 'hosts-path' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-3">
                    Open it with Notepad as administrator (right-click Notepad → Run as administrator → File → Open). Add lines like:
                  </p>

                  <div className="mb-4 rounded-md border border-zinc-800 bg-[#121212] p-3.5">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-800/80">
                      <span className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase">Example Hosts Blocklist</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(sampleHostsEntries, 'hosts-entries')}
                        className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-white hover:bg-zinc-700 transition-colors"
                      >
                        {copiedKey === 'hosts-entries' ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
                      {sampleHostsEntries}
                    </pre>
                  </div>

                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    The specific domains depend on the software. Most releases include a list of domains to block in the readme or .nfo file — copy them exactly.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">
                    Add firewall rules
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    As an alternative or addition to the hosts file, you can block the application from accessing the internet entirely using Windows Firewall. Navigate to <strong className="text-white font-semibold">Windows Defender Firewall → Advanced settings → Outbound Rules → New Rule</strong>. Select <span className="text-white font-medium">Program</span>, browse to the application’s .exe, and set the action to <strong className="text-white font-semibold">Block the connection</strong>.
                  </p>
                </div>

                <div className="rounded-md border border-zinc-800 bg-[#121212] p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-zinc-300 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    When you want a newer version, don’t update through the app — download the full cracked release from the site instead. Official updates break cracks.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: COMMON ERRORS */}
            <section id="common-errors" className="scroll-mt-24">
              <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                TROUBLESHOOTING
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                Common Errors
              </h2>

              <div className="space-y-4">
                {/* Error Card 1 */}
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white mb-2 flex items-start gap-2">
                    <span className="text-zinc-400 font-mono text-sm mt-0.5">01.</span>
                    <span>Windows Defender blocked the installer or patcher.</span>
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed pl-6">
                    This is expected. Cracked executables trigger heuristic detection because they’ve been modified from the original. Add the folder to Defender’s exclusion list and try again. If the file was already quarantined, you’ll need to re-extract or re-download it after adding the exclusion.
                  </p>
                </div>

                {/* Error Card 2 */}
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white mb-2 flex items-start gap-2">
                    <span className="text-zinc-400 font-mono text-sm mt-0.5">02.</span>
                    <span>“The application was unable to start correctly (0xc0000142).”</span>
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed pl-6">
                    For most apps this means a missing Visual C++ runtime — install both x86 and x64 redistributables and restart your PC. For After Effects 24.1 and newer, the same error can also mean your CPU lacks AVX2 support. In that case, downgrade to After Effects 2023 or lower.
                  </p>
                </div>

                {/* Error Card 3 */}
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white mb-2 flex items-start gap-2">
                    <span className="text-zinc-400 font-mono text-sm mt-0.5">03.</span>
                    <span>Missing DLL errors (MSVCP110.dll, VCRUNTIME140.dll, etc.)</span>
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed pl-6">
                    These are Visual C++ runtime libraries. Download and install the full Visual C++ Redistributable package from Microsoft — get both the x86 and x64 versions. This resolves the vast majority of DLL-related launch errors.
                  </p>
                </div>

                {/* Error Card 4 */}
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white mb-2 flex items-start gap-2">
                    <span className="text-zinc-400 font-mono text-sm mt-0.5">04.</span>
                    <span>“The installer file may be damaged.”</span>
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed pl-6">
                    The archive wasn’t extracted properly, or Defender removed files during extraction. Re-extract with 7-Zip after adding an antivirus exclusion. See our{' '}
                    <button
                      type="button"
                      onClick={() => onNavigatePage?.('extract-guide')}
                      className="text-white font-semibold underline underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors"
                    >
                      Extract Guide
                    </button>{' '}
                    for details.
                  </p>
                </div>

                {/* Error Card 5 */}
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white mb-2 flex items-start gap-2">
                    <span className="text-zinc-400 font-mono text-sm mt-0.5">05.</span>
                    <span>The patcher says it can’t find the target file.</span>
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed pl-6">
                    The software either isn’t installed, or isn’t installed in the default directory the patcher expects. Browse manually to the install location when the patcher prompts for a path. Common locations are <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">C:\Program Files\</code> and <code className="font-mono text-xs text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">C:\Program Files (x86)\</code>.
                  </p>
                </div>

                {/* Error Card 6 */}
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white mb-2 flex items-start gap-2">
                    <span className="text-zinc-400 font-mono text-sm mt-0.5">06.</span>
                    <span>Software launches but shows a trial or license expired message.</span>
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed pl-6">
                    The crack wasn’t applied correctly. Make sure you ran the patcher as administrator with the application fully closed. If the release uses file replacement, verify you copied the cracked files to the right directory. Also check that you’ve blocked the license servers in your hosts file or firewall.
                  </p>
                </div>

                {/* Error Card 7 */}
                <div className="rounded-lg border border-zinc-800 bg-[#121212] p-5">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-white mb-2 flex items-start gap-2">
                    <span className="text-zinc-400 font-mono text-sm mt-0.5">07.</span>
                    <span>DaVinci Resolve Studio won’t start.</span>
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed pl-6">
                    Common causes: outdated GPU drivers, missing Visual C++ runtimes, or a conflict with integrated graphics. Update your GPU drivers to the latest version, install the Visual C++ Redistributables, and make sure Resolve is set to use your dedicated GPU in Windows graphics settings.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* RIGHT SIDEBAR: GUIDES PANEL matching screenshot */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-4">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                GUIDES
              </div>
              <ul className="space-y-2.5">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage?.('extract-guide')}
                    className="group flex items-center gap-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors text-left"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                    <span>Extract Guide</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage?.('guides')}
                    className="group flex items-center gap-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors text-left"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                    <span>Unlicensed Fix</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage?.('faq')}
                    className="group flex items-center gap-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors text-left"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                    <span>Windows FAQ</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* BOTTOM SUB-FOOTER */}
        <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-white transition-colors"
            >
              ← Return Home
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigatePage?.('extract-guide')}
              className="hover:text-white transition-colors"
            >
              Extract Guide
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigatePage?.('guides')}
              className="hover:text-white transition-colors"
            >
              All Guides
            </button>
          </div>
          <div>Keyflame / 2dk Windows Reference</div>
        </footer>
      </div>
    </main>
  );
};
