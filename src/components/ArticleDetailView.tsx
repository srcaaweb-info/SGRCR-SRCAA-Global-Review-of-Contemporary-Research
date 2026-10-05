import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Copy,
  Check,
  BookOpen,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
} from 'lucide-react';
import { Article } from '../types';
import {
  ARTICLES,
  PUBLICATION_FREQUENCY,
  CURRENT_ISSUE_LABEL,
  OFFICIAL_CONTACT_ADDRESS,
} from '../data/journalData';

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onSelectArticle,
}) => {
  const [copiedCitation, setCopiedCitation] = useState<'apa' | 'bibtex' | null>(null);
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState(true);

  const currentIndex = ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  const apaCitation = `${article.authors.join(', ')} (${article.year}). ${article.title}. SRCAA Global Review of Contemporary Research (SGRCR), Volume ${article.volume}, Issue ${article.issue} (${article.publishedDate}), pp. ${article.pages}. https://doi.org/${article.doi}`;

  const bibtexCitation = `@article{sgrcr_${article.year}_${article.articleNumber},
  title={${article.title}},
  author={${article.authors.join(' and ')}},
  journal={SRCAA Global Review of Contemporary Research (SGRCR)},
  volume={${article.volume}},
  number={${article.issue}},
  month={July},
  year={${article.year}},
  pages={${article.pages}},
  doi={${article.doi}}
}`;

  const handleCopy = (format: 'apa' | 'bibtex') => {
    navigator.clipboard.writeText(format === 'apa' ? apaCitation : bibtexCitation);
    setCopiedCitation(format);
    setTimeout(() => setCopiedCitation(null), 2500);
  };

  return (
    <div className="bg-[#ffffff] text-[#1f0707] min-h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-[#1f0707] text-[#ffffff] border-b border-[#421413] py-3.5 sticky top-0 z-40">
        <div className="journal-container flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#421413] hover:bg-[#781f1d] text-[#ffffff] text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Issue ({CURRENT_ISSUE_LABEL})</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#c97775] font-bold">
              Article {article.articleNumber} of {ARTICLES.length}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                disabled={!prevArticle}
                onClick={() => prevArticle && onSelectArticle(prevArticle)}
                className="p-1.5 rounded bg-[#421413] hover:bg-[#781f1d] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title={prevArticle ? `Previous: ${prevArticle.title}` : 'First Article'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={!nextArticle}
                onClick={() => nextArticle && onSelectArticle(nextArticle)}
                className="p-1.5 rounded bg-[#421413] hover:bg-[#781f1d] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title={nextArticle ? `Next: ${nextArticle.title}` : 'Last Article'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Article Page Container */}
      <div className="journal-container py-8 sm:py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Official Journal & Issue Header Block */}
          <div className="bg-gray-50 border-2 border-[#781f1d]/30 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="pb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-serif font-bold text-base sm:text-lg text-[#781f1d]">
                  SRCAA Global Review of Contemporary Research (SGRCR)
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#1f0707] mt-0.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#781f1d]" />
                    Volume {article.volume}, Issue {article.issue}, {article.publishedDate}
                  </span>
                  <span>·</span>
                  <span>Pages: {article.pages}</span>
                  <span>·</span>
                  <span>Frequency: {PUBLICATION_FREQUENCY}</span>
                </p>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 bg-[#1f0707] text-[#c97775] text-xs font-bold uppercase tracking-wider rounded-lg">
                Article {article.articleNumber} · {article.category}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#1f0707] leading-snug">
              {article.title}
            </h1>

            {/* Author Name(s), Affiliations & Article History */}
            <div className="pt-1 space-y-2">
              <p className="text-sm sm:text-base font-bold text-[#781f1d]">
                Name Of Author: <span className="text-[#1f0707]">{article.authors.join(', ')}</span>
              </p>
              {article.correspondingAuthor && (
                <p className="text-xs sm:text-sm font-bold text-[#781f1d]">
                  Corresponding Author: <span className="text-[#1f0707]">{article.correspondingAuthor}</span>
                </p>
              )}
              {article.affiliations && article.affiliations.length > 0 && (
                <div className="text-xs sm:text-sm italic text-[#421413] space-y-0.5">
                  <p className="not-italic font-bold text-[#781f1d]">Affiliation:</p>
                  {article.affiliations.map((aff, idx) => (
                    <p key={idx}>{aff}</p>
                  ))}
                </div>
              )}
              {article.publishedFullDate && (
                <p className="text-xs text-[#581e1d]">
                  <strong>Article History:</strong> Received: {article.receivedDate} · Revised: {article.revisedDate} · Accepted: {article.acceptedDate} · Published: {article.publishedFullDate}
                </p>
              )}
              <p className="text-xs text-[#581e1d] mt-1">
                Published in <strong>SRCAA Global Review of Contemporary Research (SGRCR)</strong> — Volume {article.volume} Issue {article.issue} ({article.publishedDate}) (pp. {article.pages}) · DOI: <span className="font-mono font-semibold">{article.doi}</span>
              </p>
            </div>

            {/* Direct Website PDF Action Bar */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={article.pdfUrl}
                  download={article.pdfFileName}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a13533] hover:bg-[#781f1d] text-[#ffffff] font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Article PDF ({article.pdfFileName})</span>
                </a>

                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#c97775]" />
                  <span>Open Direct Website PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowEmbeddedPdf(!showEmbeddedPdf)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#1f0707] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#781f1d]" />
                  <span>{showEmbeddedPdf ? 'Hide Inline PDF Reader' : 'Show Inline PDF Reader'}</span>
                </button>
              </div>

              <span className="text-xs font-mono text-[#581e1d] bg-[#ffffff] px-2.5 py-1 rounded border border-gray-200">
                Direct Server Path: {article.pdfUrl}
              </span>
            </div>
          </div>

          {/* Direct Website PDF Reader */}
          {showEmbeddedPdf && (
            <div className="rounded-2xl border border-gray-300 bg-white overflow-hidden shadow-sm">
              <div className="bg-[#1f0707] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c97775]" />
                  <span className="font-bold">
                    Official Website PDF — {article.pdfFileName} (Volume {article.volume}, Issue {article.issue}, {article.publishedDate})
                  </span>
                </div>
                <a
                  href={article.pdfUrl}
                  download={article.pdfFileName}
                  className="inline-flex items-center gap-1 text-[#c97775] hover:text-white font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
              <div className="w-full h-[650px] bg-gray-100">
                <iframe
                  src={`${article.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={`Full Text PDF: ${article.title}`}
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            </div>
          )}

          {/* Abstract & Keywords */}
          <div className="bg-[#ffffff] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h2 className="font-serif font-bold text-xl text-[#1f0707] mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#781f1d]" />
                <span>Abstract</span>
              </h2>
              <p className="text-sm sm:text-base text-[#421413] whitespace-pre-line leading-relaxed">
                {article.abstract}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#781f1d] mb-2">
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs font-semibold text-[#421413]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Full Text Sections */}
          {article.sections && article.sections.length > 0 && (
            <div className="bg-[#ffffff] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="font-serif font-bold text-xl text-[#1f0707] pb-3 border-b border-gray-200">
                Article Full-Text Summary & Key Sections
              </h2>
              <div className="space-y-5">
                {article.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#781f1d]">
                      {sec.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#421413] leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Cite Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif font-bold text-lg text-[#1f0707]">
                How to Cite This Article
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy('apa')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] text-xs font-bold rounded-lg cursor-pointer"
                >
                  {copiedCitation === 'apa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCitation === 'apa' ? 'Copied APA!' : 'Copy APA 7th'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy('bibtex')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#1f0707] text-xs font-bold rounded-lg cursor-pointer"
                >
                  {copiedCitation === 'bibtex' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCitation === 'bibtex' ? 'Copied BibTeX!' : 'Copy BibTeX'}</span>
                </button>
              </div>
            </div>
            <p className="p-4 bg-[#ffffff] border border-gray-200 rounded-xl text-xs sm:text-sm text-[#421413] font-serif leading-relaxed">
              {apaCitation}
            </p>
          </div>

          {/* Journal Publication Info & Contact Address */}
          <div className="bg-[#ffffff] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#421413]">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1f0707] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#781f1d]" />
                <span>Journal & Issue Particulars</span>
              </h3>
              <p><strong>Journal:</strong> {OFFICIAL_CONTACT_ADDRESS.journalName}</p>
              <p><strong>Issue:</strong> Volume {article.volume}, Issue {article.issue}, {article.publishedDate}</p>
              <p><strong>Publication Frequency:</strong> {PUBLICATION_FREQUENCY}</p>
              <p><strong>Publisher:</strong> {OFFICIAL_CONTACT_ADDRESS.publisher}</p>
              <p><strong>License:</strong> Open Access (CC BY 4.0 International)</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1f0707] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#781f1d]" />
                <span>Contact Address</span>
              </h3>
              <p><strong>Publisher:</strong> {OFFICIAL_CONTACT_ADDRESS.publisher}</p>
              <p><strong>Address Line 1:</strong> {OFFICIAL_CONTACT_ADDRESS.addressLine1}</p>
              <p><strong>City & Pin Code:</strong> {OFFICIAL_CONTACT_ADDRESS.city} – {OFFICIAL_CONTACT_ADDRESS.pinCode}</p>
              <p><strong>State & Country:</strong> {OFFICIAL_CONTACT_ADDRESS.state}, {OFFICIAL_CONTACT_ADDRESS.country}</p>
              <p className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-1 font-bold text-[#781f1d]">
                  <Phone className="w-3.5 h-3.5" />
                  {OFFICIAL_CONTACT_ADDRESS.mobileDisplay}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#781f1d]">
                  <Mail className="w-3.5 h-3.5" />
                  {OFFICIAL_CONTACT_ADDRESS.primaryEmail}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
