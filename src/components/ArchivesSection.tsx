import React, { useState } from 'react';
import {
  Archive,
  ExternalLink,
  FileText,
  Copy,
  Check,
  Layers,
  BookOpen,
  Calendar,
  Sparkles,
  Eye,
  Maximize2,
  X,
  Download,
  ArrowUpRight,
} from 'lucide-react';
import {
  ARTICLES,
  PUBLICATION_FREQUENCY,
  CURRENT_ISSUE_LABEL,
} from '../data/journalData';
import { Article } from '../types';
import { ArticlePdfViewerModal } from './ArticlePdfViewerModal';

interface ArchivesSectionProps {
  onOpenArchives?: () => void;
  onOpenArticlePage?: (article: Article) => void;
}

export const ArchivesSection: React.FC<ArchivesSectionProps> = ({
  onOpenArchives,
  onOpenArticlePage,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);
  const [activePdfArticleId, setActivePdfArticleId] = useState<string | null>(null);
  const [selectedArticleForPdf, setSelectedArticleForPdf] = useState<Article | null>(null);

  const handleCopyCitation = (article: Article) => {
    const citation = `${article.authors.join(', ')} (${article.year}). ${article.title}. SRCAA Global Review of Contemporary Research (SGRCR), Volume ${article.volume}, Issue ${article.issue} (${article.publishedDate}), pp. ${article.pages}. https://doi.org/${article.doi}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenSeparateTab = (e: React.MouseEvent) => {
    if (onOpenArchives) {
      e.preventDefault();
      onOpenArchives();
    }
  };

  return (
    <section id="archives" className="py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-28 bg-[#ffffff] border-b border-gray-200">
      <div className="journal-container">
        {/* Section Heading & Separate Tab Notice */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#781f1d] text-xs font-bold uppercase tracking-widest border border-gray-200">
                <Archive className="w-3.5 h-3.5" />
                Permanent Digital Repository
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#1f0707] text-xs font-bold border border-gray-200">
                Frequency: {PUBLICATION_FREQUENCY}
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl text-[#1f0707] mt-1">
              Archives & Current Issue
            </h2>
            <p className="mt-2 text-sm sm:text-base 2xl:text-lg text-[#581e1d] max-w-2xl 2xl:max-w-4xl">
              Every published issue and peer-reviewed manuscript is indexed with persistent URIs, article-level DOI assignments, and open-access PDF viewing in compliance with statutory digital archiving standards.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="/archive.html"
              onClick={handleOpenSeparateTab}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-[#781f1d]"
              title="Open full Archives & Publications repository"
            >
              <Archive className="w-4 h-4 text-[#a13533]" />
              <span>Full Archive & Search</span>
              <span className="inline-flex items-center gap-1 bg-[#a13533] text-[#ffffff] text-xs font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Browse All <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          </div>
        </div>

        {/* Highlight Card for Volume 1 · Issue 1, September 2026 */}
        <div className="bg-gray-50/70 border-2 border-[#a13533]/40 rounded-2xl p-5 sm:p-8 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1f0707] text-[#a13533] flex items-center justify-center shadow-xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#781f1d]">
                  Current Inaugural Issue · {PUBLICATION_FREQUENCY}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1f0707]">
                  {CURRENT_ISSUE_LABEL}
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#581e1d]">
              <span className="inline-flex items-center gap-1.5 bg-[#ffffff] px-3 py-1.5 rounded-md border border-gray-200">
                <Calendar className="w-3.5 h-3.5 text-[#781f1d]" />
                Published Issue: {CURRENT_ISSUE_LABEL}
              </span>
            </div>
          </div>

          {/* Articles List */}
          <div className="mt-6 space-y-6">
            {ARTICLES.map((article) => {
              const isExpanded = expandedAbstractId === article.id;
              const isCopied = copiedId === article.id;

              return (
                <article
                  key={article.id}
                  id={article.id}
                  className="bg-[#ffffff] border border-gray-200 rounded-xl p-5 sm:p-6 transition-all hover:border-[#781f1d] hover:shadow-md shadow-2xs"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Main Article Details */}
                    <div className="flex-1 space-y-2.5">
                      {/* Explicit Journal + Volume/Issue/Month/Year Header */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-0.5">
                        <p className="font-bold text-[#781f1d]">
                          SRCAA Global Review of Contemporary Research (SGRCR)
                        </p>
                        <p className="font-semibold text-[#1f0707]">
                          Volume {article.volume} Issue {article.issue} ({article.publishedDate}) · Pages: {article.pages}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="px-2.5 py-0.5 bg-[#1f0707] text-[#c97775] text-[11px] font-bold uppercase tracking-wider rounded-md">
                          Article {article.articleNumber}
                        </span>
                        <span className="px-2.5 py-0.5 bg-gray-100 text-[#421413] text-[11px] font-semibold rounded-md border border-gray-200">
                          {article.category}
                        </span>
                        {article.publishedFullDate && (
                          <span className="px-2.5 py-0.5 bg-gray-50 text-[#581e1d] text-[11px] font-medium rounded-md border border-gray-200">
                            Received: {article.receivedDate} · Accepted: {article.acceptedDate} · Published: {article.publishedFullDate}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1f0707] leading-snug hover:text-[#781f1d] transition-colors">
                        <a
                          href={article.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-left hover:underline inline-flex items-start gap-1.5 cursor-pointer"
                        >
                          <span>{article.title}</span>
                          <ArrowUpRight className="w-4 h-4 shrink-0 text-[#781f1d] mt-1 inline" />
                        </a>
                      </h4>

                      <div className="space-y-1 text-xs sm:text-sm text-[#581e1d]">
                        <p className="font-semibold">
                          <span className="text-[#781f1d] font-bold">Name Of Author:</span> {article.authors.join(', ')}
                        </p>
                        {article.correspondingAuthor && (
                          <p className="text-xs">
                            <span className="text-[#781f1d] font-bold">Corresponding Author:</span> {article.correspondingAuthor}
                          </p>
                        )}
                        {article.affiliations && article.affiliations.length > 0 && (
                          <div className="text-xs italic text-[#421413] space-y-0.5 pt-0.5">
                            {article.affiliations.map((aff, idx) => (
                              <p key={idx}>{aff}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-[#781f1d]">Keywords:</span>
                        {article.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gray-50 text-[#421413] rounded-sm text-[11px] border border-gray-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {/* Abstract Accordion */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setExpandedAbstractId(isExpanded ? null : article.id)}
                          className="text-xs font-bold text-[#781f1d] hover:text-[#1f0707] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{isExpanded ? 'Hide Abstract ▲' : 'Read Abstract ▼'}</span>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-[#421413] leading-relaxed animate-in fade-in-50 duration-200">
                            <p className="font-bold text-xs uppercase tracking-wider text-[#781f1d] mb-1">
                              Abstract:
                            </p>
                            <p className="whitespace-pre-line leading-relaxed">{article.abstract}</p>
                            <div className="mt-2 pt-2 border-t border-gray-200 flex flex-wrap gap-3 text-[11px] text-[#781f1d]">
                              <span><strong>Issue:</strong> Volume {article.volume}, Issue {article.issue}, {article.publishedDate}</span>
                              <span><strong>DOI Identifier:</strong> {article.doi}</span>
                              <span><strong>Peer Review:</strong> Double-Blind Reviewed</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button Column: Single View Article Option Opening PDF Directly */}
                    <div className="flex items-center shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                      <a
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#781f1d] hover:bg-[#421413] text-[#ffffff] font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
                        title={`View Article PDF: ${article.title}`}
                      >
                        <FileText className="w-4 h-4 text-[#ffffff]" />
                        <span>View Article</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#c97775]" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Separate Tab Banner within the archive box */}
          <div className="mt-8 p-4 sm:p-5 bg-gradient-to-r from-[#1f0707] to-[#421413] text-[#ffffff] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <Sparkles className="w-6 h-6 text-[#a13533] shrink-0 hidden sm:block" />
              <div>
                <p className="font-serif font-bold text-base text-[#ffffff]">
                  Need full search, category filtering & exportable BibTeX citations?
                </p>
                <p className="text-xs text-[#cfb6b3] mt-0.5">
                  Explore the dedicated Archives & Publications repository for article-level entries, direct website PDFs, and citation tools.
                </p>
              </div>
            </div>
            <a
              href="/archive.html"
              onClick={handleOpenSeparateTab}
              className="shrink-0 px-5 py-2.5 bg-[#a13533] hover:bg-[#c97775] text-[#ffffff] font-bold text-xs sm:text-sm rounded-lg shadow-xs flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span>Open Archives & Publications</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Future Volume Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#581e1d]">
          <div className="p-4 bg-[#ffffff] border border-gray-200 rounded-xl flex items-start gap-3 shadow-xs">
            <Layers className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1f0707] block mb-1">Volume 1 · Issue 2 (Call for Papers Open — {PUBLICATION_FREQUENCY})</strong>
              <p>Manuscript submissions for the next issue under our {PUBLICATION_FREQUENCY} publication schedule are actively being accepted for double-blind peer review.</p>
              <a href="#author-guidelines" className="text-[#781f1d] font-bold hover:underline mt-2 inline-block">
                View submission criteria →
              </a>
            </div>
          </div>
          <div className="p-4 bg-[#ffffff] border border-gray-200 rounded-xl flex items-start gap-3 shadow-xs">
            <Archive className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1f0707] block mb-1">Statutory Digital Archiving & Indexing</strong>
              <p>Every published issue and peer-reviewed manuscript is indexed with persistent URIs, article-level DOI assignments, and open-access PDF viewing in compliance with statutory digital archiving standards.</p>
              <a href="#issn-compliance" className="text-[#781f1d] font-bold hover:underline mt-2 inline-block">
                Read ISSN India compliance details →
              </a>
            </div>
          </div>
        </div>

        {/* Modal for In-Page PDF Reader */}
        <ArticlePdfViewerModal
          article={selectedArticleForPdf}
          isOpen={Boolean(selectedArticleForPdf)}
          onClose={() => setSelectedArticleForPdf(null)}
        />
      </div>
    </section>
  );
};
