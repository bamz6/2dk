import React, { useState, useEffect, useCallback } from 'react';
import { PageId, Platform, CategoryId } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Disclaimer } from './components/Disclaimer';
import { BrowseGrid } from './components/BrowseGrid';
import { SearchModal } from './components/SearchModal';
import { VerificationModal } from './components/VerificationModal';
import { Footer } from './components/Footer';
import { CategoryPage } from './components/CategoryPage';
import { BeginnersGuide } from './components/BeginnersGuide';
import { FreeAssets } from './components/FreeAssets';
import { Piracy } from './components/Piracy';
import { ExtensionsScripts } from './components/ExtensionsScripts';
import { NewDrops } from './components/NewDrops';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { WindowsPage } from './components/WindowsPage';
import { MacOSPage } from './components/MacOSPage';
import { GuidesPage } from './components/GuidesPage';
import { VisualTutorials } from './components/VisualTutorials';
import { ExtractGuide } from './components/ExtractGuide';
import { InstallGuide } from './components/InstallGuide';
import { UnlicensedFixGuide } from './components/UnlicensedFixGuide';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('windows');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  // Parse page from URL hash (e.g. #/beginners-guide or #/windows)
  const getPageFromHash = (): PageId => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return 'home';

    const validPages: PageId[] = [
      'windows',
      'macos',
      'beginners-guide',
      'extract-guide',
      'install-guide',
      'unlicensed-fix',
      'tutorials',
      'guides',
      'new-drops',
      'extensions-scripts',
      'free-assets',
      'piracy',
      'about',
      'faq',
    ];

    if (validPages.includes(hash as PageId)) {
      return hash as PageId;
    }
    return 'home';
  };

  // Sync state with URL hash on load and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      if (page === 'windows') {
        setSelectedPlatform('windows');
      } else if (page === 'macos') {
        setSelectedPlatform('macos');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when navigating
  const navigateTo = useCallback((page: PageId) => {
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `#/${page}`;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-detect OS on first load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const p = (
        (window.navigator as any).userAgentData?.platform ||
        window.navigator.platform ||
        window.navigator.userAgent ||
        ''
      ).toLowerCase();
      if (p.includes('mac') || p.includes('iphone') || p.includes('ipad')) {
        setSelectedPlatform('macos');
      } else {
        setSelectedPlatform('windows');
      }
    }
  }, []);

  // Global keyboard shortcut: Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero
              selectedPlatform={selectedPlatform}
              onSelectPlatform={handleSelectPlatform}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
            <BrowseGrid
              selectedPlatform={selectedPlatform}
              onSelectCategory={(catId) => navigateTo(catId)}
              onNavigatePage={(page) => navigateTo(page as PageId)}
              onOpenVerification={() => setIsVerificationOpen(true)}
            />
          </>
        );

      case 'windows':
        return (
          <WindowsPage
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );

      case 'macos':
        return (
          <MacOSPage
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );

      case 'tutorials':
        return (
          <VisualTutorials
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'guides':
        return (
          <GuidesPage
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'beginners-guide':
        return (
          <BeginnersGuide
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'extract-guide':
        return (
          <ExtractGuide
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'install-guide':
        return (
          <InstallGuide
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'unlicensed-fix':
        return (
          <UnlicensedFixGuide
            onBack={() => navigateTo('guides')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'free-assets':
        return (
          <FreeAssets
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'piracy':
        return (
          <Piracy
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'extensions-scripts':
        return (
          <ExtensionsScripts
            onBack={() => navigateTo('home')}
            onNavigatePage={(page) => navigateTo(page as PageId)}
          />
        );

      case 'new-drops':
        return <NewDrops onBack={() => navigateTo('home')} />;

      case 'about':
        return <About onBack={() => navigateTo('home')} />;

      case 'faq':
        return <FAQ onBack={() => navigateTo('home')} />;

      default:
        return (
          <BrowseGrid
            selectedPlatform={selectedPlatform}
            onSelectCategory={(catId) => navigateTo(catId)}
            onNavigatePage={(page) => navigateTo(page as PageId)}
            onOpenVerification={() => setIsVerificationOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main key={currentPage} className="page-depth min-h-[calc(100vh-14rem)]">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenVerification={() => setIsVerificationOpen(true)}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateCategory={(catId) => {
          setIsSearchOpen(false);
          navigateTo(catId);
        }}
      />

      {/* Verification Standards Modal */}
      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />
    </div>
  );
}
