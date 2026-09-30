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

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'archive' | 'article'>('main');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove('bg-[#120404]');
    document.body.classList.remove('bg-[#ede4dc]');
    document.body.classList.add('bg-[#ffffff]');
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
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
    }
    if (params.get('modal') === 'submissions' || params.get('view') === 'submissions') {
      setIsSubmissionsModalOpen(true);
    }
  }, []);

  const handleOpenArticlePage = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('article', article.id);
      window.history.pushState({}, '', url.toString());
    } catch {
      // Ignored if history API restricted
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromArticle = () => {
    setSelectedArticle(null);
    setCurrentView('main');
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('article');
      window.history.pushState({}, '', url.toString());
    } catch {
      // Ignored
    }
  };

  const handleOpenArticleArchive = () => {
    setCurrentView('archive');
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
          onBackToMain={() => setCurrentView('main')}
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
