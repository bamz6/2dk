import React from 'react';
import {
  Monitor,
  BookOpen,
  PlaySquare,
  FileText,
  CloudDownload,
  Puzzle,
  Layers,
  Box,
  ArrowRight,
} from 'lucide-react';
import { CategoryId, Platform, PageId, Category } from '../types';
import { CATEGORIES } from '../data/categories';

interface BrowseGridProps {
  selectedPlatform: Platform;
  onSelectCategory: (id: CategoryId) => void;
  onNavigatePage?: (page: PageId) => void;
  onOpenVerification?: () => void;
}

const AppleLogo: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5 text-zinc-100',
}) => (
  <svg
    viewBox="0 0 170 170"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.63-13.98-5.74-8.89-10.23-18.91-13.48-30.06-3.26-11.14-4.89-21.9-4.89-32.27 0-14.12 3.65-25.75 10.96-34.88 7.3-9.13 16.3-13.79 26.98-13.98 5.43 0 11.2 1.39 17.31 4.17 6.11 2.78 10.02 4.23 11.73 4.35 1.49 0 5.43-1.46 11.83-4.39 6.4-2.93 11.89-4.32 16.48-4.17 12.08.66 21.6 5.16 28.56 13.5-10.76 6.53-16.03 15.54-15.82 27.05.21 9.02 3.65 16.79 10.32 23.32 6.67 6.53 14.57 10.27 23.7 11.22-2.17 6.53-4.89 13.27-8.16 20.22zm-35.03-108.9c0-6.75 2.52-13.23 7.55-19.45 5.04-6.21 11.28-10.03 18.74-11.45.65 2.72.98 5.23.98 7.55 0 6.64-2.6 13.22-7.81 19.74-5.21 6.53-11.59 10.32-19.14 11.38-.21-2.4-.32-4.99-.32-7.77z" />
  </svg>
);

const renderCategoryIcon = (id: CategoryId) => {
  switch (id) {
    case 'windows':
      return <Monitor className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    case 'macos':
      return <AppleLogo className="w-5 h-5 text-zinc-100" />;
    case 'beginners-guide':
      return <BookOpen className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    case 'tutorials':
      return <PlaySquare className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    case 'guides':
      return <FileText className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    case 'new-drops':
      return <CloudDownload className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    case 'extensions-scripts':
      return <Puzzle className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    case 'piracy':
      return <Layers className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    case 'free-assets':
      return <Box className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
    default:
      return <Monitor className="w-5 h-5 text-zinc-100" strokeWidth={1.8} />;
  }
};

interface ChamferCardProps {
  category: Category;
  onClick: () => void;
  onPointerMove?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave?: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

const ChamferCard: React.FC<ChamferCardProps> = ({
  category,
  onClick,
  onPointerMove,
  onPointerLeave,
}) => {
  const cardRef = React.useRef<HTMLButtonElement>(null);
  const [size, setSize] = React.useState({ w: 340, h: 160 });

  React.useLayoutEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ w: rect.width, h: rect.height });
      }
    }
  }, []);

  React.useEffect(() => {
    if (!cardRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setSize({ w: width, h: height });
        }
      }
    });
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const r = 14;
  const cut = 22;
  const inset = 0.5;

  const w = size.w;
  const h = size.h;
  const left = inset;
  const top = inset;
  const right = Math.max(left + r + cut, w - inset);
  const bottom = Math.max(top + r * 2, h - inset);

  const pathData = `
    M ${left} ${top + r}
    A ${r} ${r} 0 0 1 ${left + r} ${top}
    L ${right - cut} ${top}
    L ${right} ${top + cut}
    L ${right} ${bottom - r}
    A ${r} ${r} 0 0 1 ${right - r} ${bottom}
    L ${left + r} ${bottom}
    A ${r} ${r} 0 0 1 ${left} ${bottom - r}
    L ${left} ${top + r}
    Z
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)',
      }}
      className="tilt-card group relative w-full rounded-tl-[14px] rounded-bl-[14px] rounded-br-[14px] p-5 sm:p-6 text-left transition-transform duration-200 focus:outline-none flex flex-col justify-between min-h-[162px]"
    >
      {/* Background SVG with chamfered cut and continuous 1px stroke */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ overflow: 'visible' }}
      >
        <path
          d={pathData}
          className="fill-[#0c0c0e] stroke-[#27272a] group-hover:fill-[#121216] group-hover:stroke-zinc-600 transition-colors duration-200"
          strokeWidth="1"
        />
      </svg>

      {/* Subtle cursor radial lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,50%),rgba(255,255,255,0.05),transparent_60%)]" />

      {/* Card Content Top: Icon + Title & Description */}
      <div className="relative z-10 flex items-start gap-3.5 sm:gap-4">
        {/* Icon Container */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl border border-zinc-800/90 bg-[#141417] flex items-center justify-center text-zinc-100 group-hover:border-zinc-700/80 group-hover:text-white transition-all">
          {renderCategoryIcon(category.id)}
        </div>

        {/* Text Container */}
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-[15px] sm:text-base font-semibold text-white tracking-tight leading-snug group-hover:text-white transition-colors">
            {category.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
            {category.description}
          </p>
        </div>
      </div>

      {/* Card Content Bottom: Resource Count + Arrow */}
      <div className="relative z-10 mt-6 sm:mt-8 flex items-center justify-between">
        <span className="font-mono text-[10.5px] sm:text-[11px] font-medium tracking-wider uppercase text-zinc-500 group-hover:text-zinc-400 transition-colors">
          {category.count || 'RESOURCES'}
        </span>
        <ArrowRight
          className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all duration-200"
          strokeWidth={1.8}
        />
      </div>
    </button>
  );
};

export const BrowseGrid: React.FC<BrowseGridProps> = ({
  onSelectCategory,
  onNavigatePage,
  onOpenVerification,
}) => {
  const handleCardPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = Math.max(
      -2.2,
      Math.min(2.2, ((y - centerY) / centerY) * -2.2)
    );
    const tiltY = Math.max(
      -2.2,
      Math.min(2.2, ((x - centerX) / centerX) * 2.2)
    );
    const glowX = `${((x / rect.width) * 100).toFixed(1)}%`;
    const glowY = `${((y / rect.height) * 100).toFixed(1)}%`;

    e.currentTarget.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--glow-x', glowX);
    e.currentTarget.style.setProperty('--glow-y', glowY);
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty('--tilt-x', '0deg');
    e.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section className="py-8 sm:py-10 bg-black text-white">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        {/* Informational Banner matching reference screenshot in black & white */}
        <div className="mb-8 rounded-md border border-zinc-800 bg-[#0D0D0D] px-4 py-3 sm:px-5 sm:py-3.5 text-xs text-zinc-400 leading-relaxed">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-400 mr-2.5 align-middle" />
          <span>
            Everything here is free. Listed downloads are verified before they go live — but always scan before installing. False positives are normal with repacked software. For concerns read more on our{' '}
          </span>
          <button
            type="button"
            onClick={() => onNavigatePage?.('about')}
            className="font-bold text-white hover:text-zinc-300 underline underline-offset-2 transition-colors"
          >
            About page
          </button>
          <span>.{' '}</span>
          <button
            type="button"
            onClick={onOpenVerification}
            className="text-zinc-500 hover:text-white underline transition-colors"
          >
            Why is this link bold?
          </button>
        </div>

        {/* Section Header */}
        <div className="mb-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            BROWSE
          </span>
        </div>

        {/* 3x3 Grid with Chamfered Tech Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
          {CATEGORIES.map((cat) => (
            <ChamferCard
              key={cat.id}
              category={cat}
              onClick={() => onSelectCategory(cat.id)}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={handleCardPointerLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

