import React, { useState, useEffect } from 'react';
import { CookieBanner } from './components/CookieBanner';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IndexingPartners } from './components/IndexingPartners';
import { AboutSection } from './components/AboutSection';
import { JournalMetadataSection } from './components/JournalMetadataSection';
import { AuthorGuidelinesSection } from './components/AuthorGuidelinesSection';
import { EditorialBoardSection } from './components/EditorialBoardSection';
import { PoliciesSection } from './components/PoliciesSection';
import { IssnSection } from './components/IssnSection';
import { ArchivesSection } from './components/ArchivesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArticleArchiveView } from './components/ArticleArchiveView';
import { ArticleDetailView } from './components/ArticleDetailView';
import { EditorialSubmissionsModal } from './components/EditorialSubmissionsModal';
import { ARTICLES } from './data/journalData';
import { Article } from './types';

const POLICY_SLUGS = new Set([
  'editorial-guidelines',
  'reviewer-guidelines',
  'plagiarism-guidelines',
  'withdrawal-policy',
  'legal-policy',
  'academic-publication-policy',
]);

function clearUrlHashAndParams(paramsToRemove: string[] = []) {
  try {
    const url = new URL(window.location.href);
    url.hash = '';
    paramsToRemove.forEach((p) => url.searchParams.delete(p));
    window.history.replaceState({}, '', url.pathname + url.search);
  } catch {
    // Ignored if history API restricted
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'archive' | 'article'>('main');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.remove('bg-[#120404]');
    document.body.classList.remove('bg-[#ede4dc]');
    document.body.classList.add('bg-[#ffffff]');
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialHash = window.location.hash ? window.location.hash.slice(1) : '';

    // Always strip any hash (such as #submit-manuscript) from the address bar
    clearUrlHashAndParams();

    const articleParam = params.get('article');
    if (articleParam) {
      const found = ARTICLES.find(
        (a) => a.id === articleParam || String(a.articleNumber) === articleParam
      );
      if (found) {
        setSelectedArticle(found);
        setCurrentView('article');
        return;
      }
    }
    if (params.get('view') === 'archive' || params.get('tab') === 'archive') {
      setCurrentView('archive');
      return;
    }
    if (params.get('modal') === 'submissions' || params.get('view') === 'submissions') {
      setIsSubmissionsModalOpen(true);
    }

    if (initialHash) {
      setTimeout(() => {
        if (initialHash === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (POLICY_SLUGS.has(initialHash)) {
          window.dispatchEvent(new CustomEvent('sgrcr-select-policy', { detail: initialHash }));
          document.getElementById('policies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          document.getElementById(initialHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (currentView === 'main' && pendingScrollTarget) {
      const targetId = pendingScrollTarget;
      setPendingScrollTarget(null);
      setTimeout(() => {
        if (targetId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (POLICY_SLUGS.has(targetId)) {
          window.dispatchEvent(new CustomEvent('sgrcr-select-policy', { detail: targetId }));
          document.getElementById('policies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  }, [currentView, pendingScrollTarget]);

  // Intercept all in-page # anchor links so hashes like #submit-manuscript never pollute the URL bar
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      clearUrlHashAndParams(['article', 'view', 'tab']);

      const sectionId = href.slice(1);
      if (!sectionId || sectionId === 'top') {
        if (currentView !== 'main') {
          setSelectedArticle(null);
          setCurrentView('main');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (currentView !== 'main') {
        setSelectedArticle(null);
        setCurrentView('main');
        setPendingScrollTarget(sectionId);
        return;
      }

      if (POLICY_SLUGS.has(sectionId)) {
        window.dispatchEvent(new CustomEvent('sgrcr-select-policy', { detail: sectionId }));
        document.getElementById('policies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [currentView]);

  const handleOpenArticlePage = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    try {
      const url = new URL(window.location.href);
      url.hash = '';
      url.searchParams.set('article', article.id);
      window.history.pushState({}, '', url.pathname + url.search);
    } catch {
      // Ignored if history API restricted
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromArticle = () => {
    setSelectedArticle(null);
    setCurrentView('main');
    clearUrlHashAndParams(['article']);
  };

  const handleOpenArticleArchive = () => {
    setCurrentView('archive');
    clearUrlHashAndParams(['article']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setSelectedArticle(null);
    setCurrentView('main');
    clearUrlHashAndParams(['article', 'view', 'tab']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#ffffff] text-[#1f0707] min-h-screen transition-colors duration-200 overflow-x-hidden">
      {currentView === 'article' && selectedArticle ? (
        <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
          <TopBar onOpenSubmissionsLog={() => setIsSubmissionsModalOpen(true)} />
          <ArticleDetailView
            article={selectedArticle}
            onBack={handleBackFromArticle}
            onSelectArticle={handleOpenArticlePage}
          />
          <Footer
            onOpenArticleArchive={handleOpenArticleArchive}
            onOpenSubmissionsLog={() => setIsSubmissionsModalOpen(true)}
          />
        </div>
      ) : currentView === 'archive' ? (
        <ArticleArchiveView
          onBackToMain={handleBackToMain}
          onOpenArticlePage={handleOpenArticlePage}
        />
      ) : (
        <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
          <CookieBanner />
          <TopBar onOpenSubmissionsLog={() => setIsSubmissionsModalOpen(true)} />
          <Navbar
            onOpenArticleArchive={handleOpenArticleArchive}
            onOpenSubmissionsLog={() => setIsSubmissionsModalOpen(true)}
          />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            <Hero onOpenArticleArchive={handleOpenArticleArchive} />
            <IndexingPartners />
            <AboutSection />
            <JournalMetadataSection />
            <AuthorGuidelinesSection onOpenSubmissionsLog={() => setIsSubmissionsModalOpen(true)} />
            <EditorialBoardSection />
            <PoliciesSection />
            <IssnSection />
            <ArchivesSection
              onOpenArchives={handleOpenArticleArchive}
              onOpenArticlePage={handleOpenArticlePage}
            />
            <ContactSection />
          </main>
          <Footer
            onOpenArticleArchive={handleOpenArticleArchive}
            onOpenSubmissionsLog={() => setIsSubmissionsModalOpen(true)}
          />

          <EditorialSubmissionsModal
            isOpen={isSubmissionsModalOpen}
            onClose={() => setIsSubmissionsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
