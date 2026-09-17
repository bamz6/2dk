import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import {
  FEATURED_GUIDES,
  MORE_GUIDES_GROUPS,
  GuideItem,
} from '../data/guidesData';

interface GuidesPageProps {
  onBack: () => void;
  onNavigatePage?: (page: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  onBack,
  onNavigatePage,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openGuideById = (guideId: string) => {
    if (guideId === 'extract-guide-windows' || guideId === 'extract-guide') {
      if (onNavigatePage) {
        onNavigatePage('extract-guide');
        return;
      }
    }
    if (guideId === 'install-guide-windows' || guideId === 'install-guide') {
      if (onNavigatePage) {
        onNavigatePage('install-guide');
        return;
      }
    }
    if (guideId === 'ae-beginners-guide' || guideId === 'beginners-guide') {
      if (onNavigatePage) {
        onNavigatePage('beginners-guide');
        return;
      }
    }

    const found =
      FEATURED_GUIDES.find((g) => g.id === guideId) ||
      MORE_GUIDES_GROUPS.flatMap((grp) => grp.items).find((g) => g.id === guideId);

    if (found) {
      if (!found.content) {
        if (guideId.includes('maxon-fixes')) {
          const base = FEATURED_GUIDES.find((g) => g.id === 'maxon-fixes');
          if (base) return setSelectedGuide(base);
        }
        if (guideId.includes('maxon-serial')) {
          const base = FEATURED_GUIDES.find((g) => g.id === 'maxon-serial-filler');
          if (base) return setSelectedGuide(base);
        }
        if (guideId.includes('sourcing-anime')) {
          const base = FEATURED_GUIDES.find((g) => g.id === 'sourcing-anime-footage');
          if (base) return setSelectedGuide(base);
        }
      }
      setSelectedGuide(found);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white py-8 sm:py-12">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        {/* Breadcrumb Navigation: Home / Guides */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-zinc-500">
          <button
            type="button"
            onClick={onBack}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Guides</span>
        </nav>

        {/* Main Title & Subtitle in Black and White */}
        <header className="mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-3">
            Guides
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Setup, installation, troubleshooting, and workflow references for editors using Keyframe.
          </p>
        </header>

        {/* Section Divider */}
        <div className="border-b border-zinc-800 my-8 sm:my-10" />

        {/* SECTION 1: Featured guides */}
        <section aria-labelledby="featured-guides-title" className="mb-14 sm:mb-16">
          <h2
            id="featured-guides-title"
            className="font-serif text-2xl sm:text-3xl font-medium text-white mb-6"
          >
            Featured guides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {FEATURED_GUIDES.map((guide) => (
              <article
                key={guide.id}
                className="group flex flex-col justify-between rounded-md border border-zinc-800 bg-[#121212] p-6 sm:p-7 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60"
              >
                <div>
                  {/* Tag Pill: WINDOWS + MAC / WINDOWS / MAC */}
                  <div className="inline-block rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-zinc-300 uppercase mb-4">
                    {guide.platform}
                  </div>

                  {/* Guide Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2.5 leading-snug group-hover:text-zinc-100 transition-colors">
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {guide.description}
                  </p>
                </div>

                {/* Bottom Action: OPEN GUIDE */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openGuideById(guide.id)}
                    className="font-mono text-[11px] font-bold tracking-widest text-zinc-300 hover:text-white uppercase transition-colors flex items-center gap-1.5 focus:outline-none group-hover:text-white"
                  >
                    <span>OPEN GUIDE</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 2: More guides */}
        <section aria-labelledby="more-guides-title" className="mb-16">
          <h2
            id="more-guides-title"
            className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2"
          >
            More guides
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
            These are grouped by where they belong so Windows users do not have to scan Mac-only flow, and Mac users do not have to sort through Windows-only notes.
          </p>

          <div className="space-y-5">
            {/* Windows Group */}
            {MORE_GUIDES_GROUPS.filter((g) => g.badge === 'WIN').map((group) => (
              <div
                key={group.id}
                className="rounded-md border border-zinc-800 bg-[#121212] p-5 sm:p-6"
              >
                {/* Header with high-contrast badge */}
                <div className="flex items-center gap-3 pb-3 mb-2 border-b border-zinc-800">
                  <span className="font-mono text-[10px] font-bold tracking-tight text-black bg-white px-2 py-0.5 rounded">
                    WIN
                  </span>
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                    {group.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="divide-y divide-zinc-800/80">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openGuideById(item.id)}
                      className="w-full text-left py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group -mx-2 px-2 rounded hover:bg-zinc-900/50 transition-colors focus:outline-none"
                    >
                      <div className="max-w-2xl">
                        <h4 className="font-sans text-sm sm:text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="shrink-0 self-start sm:self-center">
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                          {item.platform}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Mac Group */}
            {MORE_GUIDES_GROUPS.filter((g) => g.badge === 'MAC').map((group) => (
              <div
                key={group.id}
                className="rounded-md border border-zinc-800 bg-[#121212] p-5 sm:p-6"
              >
                {/* Header */}
                <div className="flex items-center gap-3 pb-3 mb-2 border-b border-zinc-800">
                  <span className="font-mono text-[10px] font-bold tracking-tight text-black bg-white px-2 py-0.5 rounded">
                    MAC
                  </span>
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                    {group.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="divide-y divide-zinc-800/80">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openGuideById(item.id)}
                      className="w-full text-left py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group -mx-2 px-2 rounded hover:bg-zinc-900/50 transition-colors focus:outline-none"
                    >
                      <div className="max-w-2xl">
                        <h4 className="font-sans text-sm sm:text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="shrink-0 self-start sm:self-center">
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                          {item.platform}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* General After Effects Group */}
            {MORE_GUIDES_GROUPS.filter((g) => g.badge === 'AE').map((group) => (
              <div
                key={group.id}
                className="rounded-md border border-zinc-800 bg-[#121212] p-5 sm:p-6"
              >
                {/* Header */}
                <div className="flex items-center gap-3 pb-3 mb-2 border-b border-zinc-800">
                  <span className="font-mono text-[10px] font-bold tracking-tight text-black bg-white px-2 py-0.5 rounded">
                    AE
                  </span>
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                    {group.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="divide-y divide-zinc-800/80">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openGuideById(item.id)}
                      className="w-full text-left py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group -mx-2 px-2 rounded hover:bg-zinc-900/50 transition-colors focus:outline-none"
                    >
                      <div className="max-w-2xl">
                        <h4 className="font-sans text-sm sm:text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="shrink-0 self-start sm:self-center">
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                          {item.platform}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Visual tutorials Group */}
            <div className="rounded-md border border-zinc-800 bg-[#121212] p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-center gap-3 pb-3 mb-2 border-b border-zinc-800">
                <span className="font-mono text-[10px] font-bold tracking-tight text-black bg-white px-2 py-0.5 rounded">
                  VID
                </span>
                <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                  Visual tutorials
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Screen recordings for installs and plugin setup — watch each step instead of guessing from screenshots alone.
              </p>

              {/* 2x2 Grid Box in pure black and white */}
              <div className="rounded border border-zinc-800 bg-black p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Windows software</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Mac software</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Plugin installs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>More videos rolling out</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onNavigatePage?.('tutorials')}
                className="font-mono text-[11px] font-bold tracking-widest text-zinc-300 hover:text-white uppercase transition-colors flex items-center gap-1.5 focus:outline-none"
              >
                <span>OPEN VISUAL TUTORIALS</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Guide Detail / Reader Modal */}
      {selectedGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedGuide(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-zinc-800 bg-[#121212] p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedGuide(null)}
              className="absolute right-4 top-4 rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header info */}
            <div className="mb-4">
              <span className="inline-block rounded border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-300 mb-3">
                {selectedGuide.platform}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {selectedGuide.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {selectedGuide.description}
              </p>
            </div>

            {/* Guide Content Sections */}
            <div className="space-y-6 pt-4 border-t border-zinc-800">
              {selectedGuide.content ? (
                <>
                  {/* Overview */}
                  {selectedGuide.content.overview && (
                    <div className="rounded border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 leading-relaxed">
                      <p>{selectedGuide.content.overview}</p>
                    </div>
                  )}

                  {/* Requirements if any */}
                  {selectedGuide.content.requirements && selectedGuide.content.requirements.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                        Prerequisites & Checklist
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-400">
                        {selectedGuide.content.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-white font-mono mt-0.5">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-4">
                    <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Step-by-Step Procedure
                    </div>
                    {selectedGuide.content.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="rounded border border-zinc-800 bg-zinc-900/60 p-4 space-y-2"
                      >
                        <h4 className="font-sans text-sm font-bold text-white">
                          {step.title}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">
                          {step.desc}
                        </p>

                        {/* Terminal Command if present */}
                        {step.command && (
                          <div className="mt-3 flex items-center justify-between gap-2 rounded bg-black border border-zinc-800 px-3 py-2 font-mono text-[11px] text-zinc-200">
                            <span className="break-all">{step.command}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(step.command!, `cmd-${idx}`)}
                              className="shrink-0 flex items-center gap-1 text-zinc-300 hover:text-white px-2.5 py-1 rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors"
                              title="Copy Command"
                            >
                              {copiedKey === `cmd-${idx}` ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-400" />
                                  <span className="text-[10px] text-emerald-400">COPIED</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span className="text-[10px]">COPY</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Tip if present */}
                        {step.tip && (
                          <div className="mt-2 text-[11px] text-zinc-300 bg-zinc-900 border-l-2 border-white px-3 py-1.5 rounded-r">
                            <strong className="text-white">Note:</strong> {step.tip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Notes / Special Link */}
                  {selectedGuide.id === 'ae-beginners-guide' && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedGuide(null);
                          onNavigatePage?.('beginners-guide');
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded bg-white px-4 py-2.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>OPEN FULL BEGINNER'S SPEC & WORKSPACE PAGE</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded border border-zinc-800 bg-zinc-950 p-5 text-xs text-zinc-400 leading-relaxed">
                  <p>
                    Full troubleshooting documentation for <strong className="text-white">{selectedGuide.title}</strong> is active. Follow standard Keyframe setup procedures or review the relevant Windows and Mac sections.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
              >
                &larr; BACK TO GUIDES
              </button>

              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                className="rounded border border-zinc-700 bg-white px-4 py-1.5 font-mono text-xs font-bold text-black hover:bg-zinc-200 transition-colors"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
