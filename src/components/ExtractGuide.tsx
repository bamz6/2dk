import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  FolderLock,
  FileArchive,
  Terminal,
} from 'lucide-react';

interface ExtractGuideProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

const SECTIONS = [
  { id: 'why-extract', label: 'Why Extract' },
  { id: 'tools', label: 'Tools' },
  { id: 'how-to', label: 'How To' },
  { id: 'exclusions', label: 'Exclusions' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

export const ExtractGuide: React.FC<ExtractGuideProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [activeSection, setActiveSection] = useState<string>('why-extract');
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

  return (
    <main className="min-h-screen bg-black text-white py-8 sm:py-12 selection:bg-white selection:text-black">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Breadcrumbs matching image: Home / Windows / Extract Guide */}
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
          <span className="text-white font-semibold">Extract Guide</span>
        </nav>

        {/* Page Header matching image layout */}
        <header className="mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-3">
            Extract <span className="italic font-serif">Guide</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed mb-4">
            How to properly extract downloads — and why it matters.
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
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
                      }`}
                    >
                      {sec.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MAIN COLUMN: GUIDE ARTICLE CONTENT */}
          <div className="flex-1 w-full min-w-0 max-w-2xl xl:max-w-3xl space-y-14">
            {/* ========================================================================= */}
            {/* 1. WHY EXTRACT */}
            {/* ========================================================================= */}
            <section id="why-extract" className="scroll-mt-24 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                BACKGROUND
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Why Downloads Are Archived
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                <p>
                  Every Keyflame download is a password-protected{' '}
                  <code className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-xs text-white">
                    .7z
                  </code>{' '}
                  archive. We do not distribute raw installers,{' '}
                  <code className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-xs text-white">
                    .zip
                  </code>{' '}
                  files, or{' '}
                  <code className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-xs text-white">
                    .rar
                  </code>{' '}
                  releases. The archive bundles the installer, patch or crack, readme, and other files into one package, compressed so the upload is easier to host and download.
                </p>
                <p>
                  The password is what helps mirrors last longer. Automated abuse systems can still match uploads by filename or file hash, but many can only inspect an archive's contents after it is unpacked. A password stops scanners from opening the archive and matching installer signatures or filenames inside on sight. Links still get removed eventually — but unprotected uploads tend to disappear much faster.
                </p>
                <p>
                  In short: the{' '}
                  <code className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-xs text-white">
                    .7z
                  </code>{' '}
                  archive is normal packaging, not an extra hurdle for its own sake. Every release is password-protected, compression saves bandwidth, bundling keeps the release together, and the password is a practical layer that helps the file stay up long enough for you to download it.
                </p>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 2. TOOLS */}
            {/* ========================================================================= */}
            <section id="tools" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  TOOLS
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  What to Use
                </h2>
              </div>

              <div className="space-y-4">
                {/* 7-Zip */}
                <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-sans text-base font-bold text-white">
                      7-Zip — Recommended
                    </h3>
                    <span className="font-mono text-[10px] font-bold text-black bg-white px-2 py-0.5 rounded">
                      DEFAULT
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Keyflame downloads are .7z archives only. 7-Zip is free, open-source, handles them natively, integrates into the Windows right-click menu, and is what you should use for every extraction here. Install it before downloading anything.
                  </p>
                  <div className="pt-1">
                    <a
                      href="https://www.7-zip.org"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-white underline underline-offset-2 transition-colors"
                    >
                      <span>Download official 7-Zip</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* WinRAR */}
                <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-sans text-base font-bold text-white">
                      WinRAR — Alternative
                    </h3>
                    <span className="font-mono text-[10px] font-semibold text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded">
                      ALTERNATIVE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    WinRAR can also open .7z files if you already use it. It's technically paid software, but the trial never actually expires — it just shows a nag screen. For Keyflame downloads, 7-Zip is still the recommended default.
                  </p>
                </div>

                {/* Warning on Built-in extractor */}
                <div className="rounded border border-zinc-700 bg-zinc-950 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
                    <AlertTriangle className="h-4 w-4 text-white shrink-0" />
                    <span>Avoid Windows Built-in Unzipper</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Do not use the built-in Windows extractor for Keyflame downloads. Even on Windows 11, native .7z support is less reliable for password-protected archives and is known to corrupt files during extraction. If you've ever seen “the installer file may be damaged” — this is almost always why.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 3. HOW TO */}
            {/* ========================================================================= */}
            <section id="how-to" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  HOW TO
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Extracting Step by Step
                </h2>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black bg-white px-2 py-0.5 rounded">
                      01
                    </span>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                      Add an exclusion first
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Before you extract anything, add the destination folder to your antivirus exclusion list. Windows Defender scans files as they're written to disk — it will quarantine or delete cracked executables mid-extraction, leaving you with an incomplete install. See the Exclusions section below.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black bg-white px-2 py-0.5 rounded">
                      02
                    </span>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                      Right-click the archive
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Locate the downloaded archive file. Right-click it and look for the 7-Zip option in the context menu (or WinRAR if that's what you use).
                  </p>
                </div>

                {/* Step 3 */}
                <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black bg-white px-2 py-0.5 rounded">
                      03
                    </span>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                      Select “Extract to [folder name]”
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Choose 7-Zip → Extract to “[folder name]”. This creates a new folder next to the archive with all its contents. Don't use “Extract Here” unless you want files scattered in your current directory.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black bg-white px-2 py-0.5 rounded">
                      04
                    </span>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                      Enter the password
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    7-Zip will always ask for a password before extracting a Keyflame download. Every release uses the same password:
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-black px-3 py-1.5 font-mono text-sm font-bold text-white">
                      <span>flame</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('flame', 'pwd-flame')}
                      className="flex items-center gap-1.5 rounded bg-white px-3 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                    >
                      {copiedKey === 'pwd-flame' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-black" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-black" />
                          <span>COPY PASSWORD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black bg-white px-2 py-0.5 rounded">
                      05
                    </span>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                      Run the installer or application
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Once extracted, open the new folder. You'll typically find a setup executable (setup.exe, install.exe), a pre-cracked application folder, or a readme.txt / .nfo file with specific instructions. Follow whatever the release includes.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 4. EXCLUSIONS */}
            {/* ========================================================================= */}
            <section id="exclusions" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  ANTIVIRUS
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Adding Exclusions
                </h2>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                  <p>
                    Antivirus software — especially Windows Defender — will flag, quarantine, or outright delete cracked files. This happens because cracks modify original executables, which triggers heuristic detection regardless of whether the file is actually harmful.
                  </p>
                  <p>
                    To prevent this, add your extraction and installation folders to the exclusion list before you extract or install. This tells Defender to skip scanning those directories entirely.
                  </p>
                </div>
              </div>

              {/* Windows Defender Path */}
              <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-3">
                <h3 className="font-sans text-base font-bold text-white">
                  Windows Defender
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Navigate to:
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded border border-zinc-800 bg-black px-4 py-3 font-mono text-xs text-zinc-200">
                  <span className="break-all">
                    Settings → Windows Security → Virus & threat protection → Manage settings → Exclusions → Add an exclusion
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        'Settings → Windows Security → Virus & threat protection → Manage settings → Exclusions → Add an exclusion',
                        'defender-path'
                      )
                    }
                    className="shrink-0 self-end sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    {copiedKey === 'defender-path' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-white" />
                        <span className="text-[11px] font-bold text-white">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                  Select <strong>Folder</strong>, then choose the directory where you'll be extracting or installing. You can add multiple exclusions — one for your download extraction folder and one for the final install location.
                </p>
              </div>

              {/* Third Party Antivirus */}
              <div className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2">
                <h3 className="font-sans text-base font-bold text-white">
                  Third-party antivirus
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  If you use Malwarebytes, Norton, or any other AV, the process is similar — look for an exclusions, allowlist, or exceptions section in the settings. Add the same folders there. Some AV tools also let you exclude specific file types or processes.
                </p>
              </div>

              {/* Warning note */}
              <div className="rounded border border-zinc-700 bg-zinc-950 p-4">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <strong className="text-white">Always add exclusions before extracting.</strong> If Defender quarantines a file during extraction, re-downloading and extracting again is the only fix — you can't reliably restore quarantined files.
                </p>
              </div>
            </section>

            <div className="border-b border-zinc-800" />

            {/* ========================================================================= */}
            {/* 5. TROUBLESHOOTING */}
            {/* ========================================================================= */}
            <section id="troubleshooting" className="scroll-mt-24 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                  TROUBLESHOOTING
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Common Issues
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: '“The installer file may be damaged.”',
                    desc: 'Almost always caused by extracting with the built-in Windows tool or by Defender quarantining files during extraction. Re-extract with 7-Zip after adding an antivirus exclusion for the destination folder.',
                  },
                  {
                    title: 'The archive says it\'s corrupted.',
                    desc: 'The download was likely interrupted or incomplete. Re-download the file — if the problem persists, try a different browser or use a download manager like IDM to prevent partial transfers.',
                  },
                  {
                    title: 'Wrong password.',
                    desc: 'Double-check you\'re copying the password exactly — watch for trailing spaces, mixed-up characters (lowercase L vs. 1, O vs. 0), or formatting issues from the source page. Passwords are case-sensitive.',
                  },
                  {
                    title: 'Extraction is extremely slow.',
                    desc: 'Large archives with high compression can take time, especially on HDDs. If you\'re extracting to the same drive you\'re reading from, the bottleneck is disk I/O. Extracting to an SSD will be significantly faster.',
                  },
                  {
                    title: '“Cannot create output file” or path-related errors.',
                    desc: 'The file path is too long or contains characters Windows can\'t handle. Extract to a short path like C:\\Downloads\\ instead of a deeply nested folder. Avoid special characters in folder names.',
                  },
                  {
                    title: 'Files are missing after extraction.',
                    desc: 'Your antivirus likely removed them. Check your AV quarantine, restore the files, add an exclusion for the folder, then re-extract. This is the single most common issue people run into.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded border border-zinc-800 bg-[#121212] p-5 space-y-2"
                  >
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Sub-footer matching prompt */}
            <footer className="pt-10 pb-6 border-t border-zinc-800 text-center space-y-4">
              <div className="text-zinc-500 font-mono text-xs flex items-center justify-center gap-2">
                <span>·</span>
                <span>Made with &lt;3</span>
                <span>·</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-zinc-400">
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  Status
                </button>
                <a
                  href="#tor"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors"
                >
                  Tor mirror
                </a>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  Credits
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage?.('faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </div>

              <div className="space-y-1 font-mono text-[11px] text-zinc-500">
                <p>© 2026, Est. April 2026.</p>
                <p>We don't host any downloads</p>
              </div>
            </footer>
          </div>

          {/* RIGHT SIDEBAR: GUIDES CARD matching Image 1 & Image 2 */}
          <aside className="w-full lg:w-56 shrink-0 lg:sticky lg:top-20 self-start">
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-5 shadow-sm space-y-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 pb-2 border-b border-zinc-800">
                GUIDES
              </div>
              <ul className="space-y-2.5 font-sans text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage?.('install-guide')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-left"
                  >
                    <span className="text-white font-bold leading-none">•</span>
                    <span>Install Guide</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage?.('guides')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-left"
                  >
                    <span className="text-white font-bold leading-none">•</span>
                    <span>Unlicensed Fix</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage?.('faq')}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-left"
                  >
                    <span className="text-white font-bold leading-none">•</span>
                    <span>Windows FAQ</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
