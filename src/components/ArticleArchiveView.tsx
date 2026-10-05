import React, { useState, useEffect } from 'react';
import {
  Archive,
  Search,
  FileText,
  Copy,
  Check,
  ArrowLeft,
  Eye,
  Maximize2,
  X,
  Download,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import {
  ARTICLES,
  PUBLICATION_FREQUENCY,
  CURRENT_ISSUE_LABEL,
  OFFICIAL_CONTACT_ADDRESS,
} from '../data/journalData';
import { Article } from '../types';
import { ArticlePdfViewerModal } from './ArticlePdfViewerModal';
import { ArticleDetailView } from './ArticleDetailView';

interface ArticleArchiveViewProps {
  onBackToMain?: () => void;
  onOpenArticlePage?: (article: Article) => void;
}

export const ArticleArchiveView: React.FC<ArticleArchiveViewProps> = ({
  onBackToMain,
  onOpenArticlePage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVolume, setSelectedVolume] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [citationFormat, setCitationFormat] = useState<'apa' | 'bibtex'>('apa');
  const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);
  const [activePdfArticleId, setActivePdfArticleId] = useState<string | null>(null);
  const [selectedArticleForPdf, setSelectedArticleForPdf] = useState<Article | null>(null);
  const [standaloneArticle, setStandaloneArticle] = useState<Article | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleParam = params.get('article');
    if (articleParam) {
      const found = ARTICLES.find(
        (a) => a.id === articleParam || String(a.articleNumber) === articleParam
      );
      if (found) {
        setStandaloneArticle(found);
      }
    }
  }, []);

  const handleSelectArticlePage = (article: Article) => {
    if (onOpenArticlePage) {
      onOpenArticlePage(article);
      return;
    }
    setStandaloneArticle(article);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('article', article.id);
      window.history.pushState({}, '', url.toString());
    } catch {
      // Ignored
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (standaloneArticle) {
    return (
      <ArticleDetailView
        article={standaloneArticle}
        onBack={() => {
          setStandaloneArticle(null);
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete('article');
            window.history.pushState({}, '', url.toString());
          } catch {
            // Ignored
          }
        }}
        onSelectArticle={handleSelectArticlePage}
      />
    );
  }

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.doi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      article.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesVolume =
      selectedVolume === 'all' || `vol-${article.volume}-issue-${article.issue}` === selectedVolume;

    return matchesSearch && matchesCategory && matchesVolume;
  });

  const handleCopyCitation = (article: Article) => {
    let citation = '';
    if (citationFormat === 'apa') {
      citation = `${article.authors.join(', ')} (${article.year}). ${article.title}. SRCAA Global Review of Contemporary Research (SGRCR), Volume ${article.volume}, Issue ${article.issue} (${article.publishedDate}), pp. ${article.pages}. https://doi.org/${article.doi}`;
    } else {
      citation = `@article{sgrcr_${article.year}_${article.articleNumber},
  title={${article.title}},
  author={${article.authors.join(' and ')}},
  journal={SRCAA Global Review of Contemporary Research (SGRCR)},
  volume={${article.volume}},
  number={${article.issue}},
  month={July},
  pages={${article.pages}},
  year={${article.year}},
  doi={${article.doi}}
}`;
    }
    navigator.clipboard.writeText(citation);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#ede4dc] text-[#1f0707] flex flex-col font-sans">
      {/* Dedicated Archive Header */}
      <header className="sticky top-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#cfb6b3] py-3.5 shadow-xs">
        <div className="journal-container flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onBackToMain ? (
              <button
                type="button"
                onClick={onBackToMain}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f2ebe7] hover:bg-[#e9ded8] border border-[#cfb6b3] text-xs font-bold rounded-lg text-[#421413] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Main Website</span>
              </button>
            ) : (
              <a
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f2ebe7] hover:bg-[#e9ded8] border border-[#cfb6b3] text-xs font-bold rounded-lg text-[#421413] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Main Website</span>
              </a>
            )}

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden p-0.5 bg-[#ffffff] ring-1 ring-[#a13533]">
                <img src="/logo.svg" alt="SRCAA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-sm sm:text-base text-[#1f0707] leading-tight">
                  Archives & Publications ({CURRENT_ISSUE_LABEL})
                </h1>
                <p className="text-[10px] text-[#781f1d] uppercase tracking-wider font-semibold">
                  SRCAA Global Review of Contemporary Research · Frequency: {PUBLICATION_FREQUENCY}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#781f1d]">
            <span className="text-[#581e1d]">
              Direct Website PDF Repository · Open Access (CC BY 4.0)
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 journal-container py-8 sm:py-12 2xl:py-16">
        {/* Banner Area */}
        <div className="bg-gradient-to-r from-[#1f0707] to-[#421413] text-[#ffffff] rounded-2xl p-6 sm:p-10 2xl:p-12 shadow-md mb-8">
          <div className="max-w-3xl 2xl:max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a13533]/30 border border-[#a13533]/50 text-[#c97775] text-xs font-bold uppercase tracking-widest">
                <Archive className="w-3.5 h-3.5" />
                {CURRENT_ISSUE_LABEL} · {PUBLICATION_FREQUENCY}
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
              Archives & Publications Repository
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#cfb6b3] leading-relaxed">
              Every published issue and peer-reviewed manuscript is indexed with persistent URIs, article-level DOI assignments, and open-access PDF viewing in compliance with statutory digital archiving standards.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#faf6f3] border border-[#cfb6b3] rounded-2xl p-4 sm:p-6 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#781f1d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, author, keyword, or DOI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#faf6f3] border border-[#cfb6b3] rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#faf6f3] border border-[#cfb6b3] rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden font-medium"
              >
                <option value="all">All Academic Categories</option>
                <option value="Commerce">Commerce & Management</option>
                <option value="Technology">AI & Digital Systems</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            {/* Volume Select */}
            <div className="md:col-span-3">
              <select
                value={selectedVolume}
                onChange={(e) => setSelectedVolume(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#faf6f3] border border-[#cfb6b3] rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden font-medium"
              >
                <option value="all">All Volumes & Issues</option>
                <option value="vol-1-issue-1">Volume 1, Issue 1 (July 2026)</option>
              </select>
            </div>
          </div>

          {/* Active stats & citation style switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#cfb6b3] text-xs">
            <span className="text-[#581e1d] font-semibold">
              Showing <strong className="text-[#1f0707]">{filteredArticles.length}</strong> published article{filteredArticles.length === 1 ? '' : 's'} in <strong>{CURRENT_ISSUE_LABEL}</strong>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[#781f1d] font-bold">Citation format:</span>
              <button
                type="button"
                onClick={() => setCitationFormat('apa')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                  citationFormat === 'apa'
                    ? 'bg-[#1f0707] text-[#ffffff]'
                    : 'bg-[#ffffff] text-[#421413] border border-[#cfb6b3]'
                }`}
              >
                APA 7th Edition
              </button>
              <button
                type="button"
                onClick={() => setCitationFormat('bibtex')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                  citationFormat === 'bibtex'
                    ? 'bg-[#1f0707] text-[#ffffff]'
                    : 'bg-[#ffffff] text-[#421413] border border-[#cfb6b3]'
                }`}
              >
                BibTeX
              </button>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredArticles.map((article) => {
            const isExpanded = expandedAbstractId === article.id;
            const isCopied = copiedId === article.id;

            return (
              <article
                key={article.id}
                className="bg-[#faf6f3] border border-[#cfb6b3] rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Official Journal + Issue Citation Block */}
                <div className="p-3.5 bg-[#ffffff] border border-[#cfb6b3] rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <p className="font-bold text-[#781f1d]">
                      SRCAA Global Review of Contemporary Research (SGRCR)
                    </p>
                    <p className="font-semibold text-[#1f0707]">
                      Volume {article.volume}, Issue {article.issue}, {article.publishedDate} · Pages: {article.pages}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-[#1f0707] text-[#c97775] text-xs font-bold rounded-lg uppercase tracking-wider">
                      Article {article.articleNumber}
                    </span>
                    <span className="px-2.5 py-1 bg-[#e9ded8] text-[#421413] text-xs font-bold rounded-lg">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1f0707] leading-snug hover:text-[#781f1d] transition-colors">
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left hover:underline inline-flex items-baseline gap-2 cursor-pointer"
                  >
                    <span>{article.title}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-[#781f1d] inline" />
                  </a>
                </h3>

                {/* Authors & Affiliations */}
                <div className="space-y-1 text-sm text-[#421413]">
                  <div>
                    <strong className="text-[#781f1d]">Name Of Author: </strong>
                    <span className="font-semibold">{article.authors.join(', ')}</span>
                  </div>
                  {article.correspondingAuthor && (
                    <div className="text-xs">
                      <strong className="text-[#781f1d]">Corresponding Author: </strong>
                      <span className="font-semibold">{article.correspondingAuthor}</span>
                    </div>
                  )}
                  {article.affiliations && article.affiliations.length > 0 && (
                    <div className="text-xs italic text-[#581e1d] space-y-0.5 pt-0.5">
                      {article.affiliations.map((aff, idx) => (
                        <p key={idx}>{aff}</p>
                      ))}
                    </div>
                  )}
                  {article.publishedFullDate && (
                    <div className="text-xs text-[#581e1d] pt-1">
                      <strong className="text-[#781f1d]">Article History: </strong>
                      Received: {article.receivedDate} · Revised: {article.revisedDate} · Accepted: {article.acceptedDate} · Published: {article.publishedFullDate}
                    </div>
                  )}
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs font-bold text-[#781f1d]">Keywords:</span>
                  {article.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-[#ffffff] text-[#421413] rounded-md text-xs border border-[#cfb6b3]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Abstract Section */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setExpandedAbstractId(isExpanded ? null : article.id)}
                    className="text-xs font-bold text-[#781f1d] hover:text-[#1f0707] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{isExpanded ? 'Hide Full Abstract ▲' : 'Read Full Abstract ▼'}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-4 sm:p-5 bg-[#f2ebe7] border border-[#cfb6b3] rounded-xl text-xs sm:text-sm text-[#421413] leading-relaxed animate-in fade-in-50 duration-200 space-y-2">
                      <p className="font-bold text-xs uppercase tracking-wider text-[#781f1d]">
                        Article Abstract:
                      </p>
                      <p className="whitespace-pre-line leading-relaxed">{article.abstract}</p>
                      <div className="pt-2 text-xs text-[#781f1d] flex flex-wrap gap-4 font-semibold">
                        <span>Issue: Volume {article.volume}, Issue {article.issue}, {article.publishedDate}</span>
                        <span>DOI: {article.doi}</span>
                        <span>Direct PDF: {article.pdfUrl}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button Bar: Single View Article Option Opening PDF Directly */}
                <div className="pt-4 border-t border-[#cfb6b3] flex items-center justify-end">
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#781f1d] hover:bg-[#421413] text-[#ffffff] font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
                    title={`View Article PDF: ${article.title}`}
                  >
                    <FileText className="w-4 h-4 text-[#ffffff]" />
                    <span>View Article</span>
                    <ArrowUpRight className="w-4 h-4 text-[#c97775]" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-[#faf6f3] border border-[#cfb6b3] rounded-2xl">
            <Archive className="w-12 h-12 text-[#781f1d] mx-auto mb-3 opacity-50" />
            <h3 className="font-serif font-bold text-xl text-[#1f0707]">No matching articles found</h3>
            <p className="text-sm text-[#581e1d] mt-1">Try clearing search keywords or selecting another category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedVolume('all');
              }}
              className="mt-4 px-4 py-2 bg-[#1f0707] text-[#ffffff] text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* In-App PDF Viewer Modal */}
      <ArticlePdfViewerModal
        article={selectedArticleForPdf}
        isOpen={Boolean(selectedArticleForPdf)}
        onClose={() => setSelectedArticleForPdf(null)}
      />

      {/* Archive Footer with Consistent Contact Address & Frequency */}
      <footer className="bg-[#260d0d] text-[#cfb6b3] py-8 border-t border-[#451a19] text-xs">
        <div className="journal-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-bold text-[#ffffff]">
              SRCAA Global Review of Contemporary Research (SGRCR) — {PUBLICATION_FREQUENCY}
            </p>
            <p>
              Published by <strong>{OFFICIAL_CONTACT_ADDRESS.publisher}</strong> under Creative Commons CC BY 4.0 license.
            </p>
          </div>
          <div className="space-y-1 md:text-right">
            <p className="font-bold text-[#ffffff] flex md:justify-end items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#a13533]" />
              <span>Contact Address:</span>
            </p>
            <p>{OFFICIAL_CONTACT_ADDRESS.fullFormatted}</p>
            <p className="flex flex-wrap md:justify-end items-center gap-3 text-[#c97775]">
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3 h-3" /> {OFFICIAL_CONTACT_ADDRESS.mobileDisplay}
              </span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3 h-3" /> {OFFICIAL_CONTACT_ADDRESS.primaryEmail}
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
