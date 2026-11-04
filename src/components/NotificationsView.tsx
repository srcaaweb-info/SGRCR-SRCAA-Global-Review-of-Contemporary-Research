import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Globe2,
  Users,
  Copy,
  Check,
  PenTool,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Share2,
  AlertTriangle,
  Award,
  Layers,
  Search,
} from 'lucide-react';
import { BrochureModal } from './BrochureModal';

interface NotificationsViewProps {
  onBackToMain: () => void;
  onOpenSubmissionsModal: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  onBackToMain,
  onOpenSubmissionsModal,
}) => {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isInlineViewerExpanded, setIsInlineViewerExpanded] = useState(false);
  const [copiedCFP, setCopiedCFP] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'cfp' | 'editorial' | 'indexing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const brochurePdfPath = '/assets/aistudio/Brocedure__80ae9a16.pdf';
  const friendlyBrochureDownload = '/call-for-papers-vol7-iss2.pdf';

  const handleCopyCFPText = () => {
    const text = `================================================================================
SRCAA GLOBAL REVIEW OF CONTEMPORARY RESEARCH (SGRCR)
ISSN: 2839-6081 (Online) · A Multidisciplinary International Journal
CALL FOR PAPERS — VOLUME 7, ISSUE 2 (DECEMBER 2026)
★ SPECIAL PRIVILEGE: NO APC FOR THIS ISSUE (100% WAIVED) ★
================================================================================

SRCAA Global Review of Contemporary Research (SGRCR) invites original and high-quality research papers, review articles, case studies and short communications from researchers, academicians, professionals and research scholars across the globe.

IMPORTANT DATES:
• Submission Open: 01 October 2026
• Last Date for Submission: 03 December 2026
• Review Process: 04–20 December 2026
• Publication Date: 23 December 2026

SCOPE AND THEMES (Including but not limited to):
1. Commerce and Management
2. Economics and Finance
3. Education
4. Social Sciences
5. Humanities
6. Science and Technology
7. Business and Industry Studies
8. Sustainable Development
9. Digital Transformation
10. Innovation and Entrepreneurship
11. Public Policy and Governance
12. Interdisciplinary Research

KEY FEATURES:
✔ Peer-Reviewed International Journal
✔ Open Access (CC BY 4.0)
✔ Multidisciplinary Coverage & Global Perspective
✔ DOI Provided for All Published Articles
✔ Indexed in IIFS, Zenodo, Google Scholar, CiteFactor, Zotero, Scilit

SUBMISSION & CONTACT:
Online Submission: https://sgrcr.srcaa.co.in/
Email: srcaacontact@gmail.com
Publisher: Shakti Research Centre and Academia (SRCAA), Bengaluru, Karnataka, India
================================================================================`;

    navigator.clipboard.writeText(text);
    setCopiedCFP(true);
    setTimeout(() => setCopiedCFP(false), 2500);
  };

  const themes = [
    'Commerce and Management',
    'Economics and Finance',
    'Education',
    'Social Sciences',
    'Humanities',
    'Science and Technology',
    'Business and Industry Studies',
    'Sustainable Development',
    'Digital Transformation',
    'Innovation and Entrepreneurship',
    'Public Policy and Governance',
    'Interdisciplinary Research',
  ];

  const secondaryNotifications = [
    {
      id: 'archive-vol1-iss1',
      category: 'indexing' as const,
      badge: 'Landmark Publication',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      date: 'Published July 2026',
      title: 'Volume 1, Issue 1 Inaugural Issue Successfully Archived with Crossref DOIs',
      description:
        'All 7 peer-reviewed inaugural articles are officially deposited, open-access indexed, and discoverable with individual DOIs and full-text PDF downloads.',
      highlights: ['7 Full-Text Articles Deposited', 'Open Access under CC BY 4.0', 'Full Editorial Audit Completed'],
    },
    {
      id: 'editorial-reviewer-call',
      category: 'editorial' as const,
      badge: 'Academic Invitation',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      date: 'Ongoing 2026',
      title: 'Call for International Peer Reviewers & Subject Matter Specialists',
      description:
        'SRCAA invites doctorate holders, associate professors, and senior researchers to join the SGRCR Reviewer Pool in Management, Social Sciences, STEM, and Interdisciplinary Domains.',
      highlights: ['Double-blind Review Certification', 'COPE Ethics Adherence', 'Editorial Board Consideration'],
    },
    {
      id: 'indexing-expansion',
      category: 'indexing' as const,
      badge: 'Discovery Update',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      date: 'Active 2026',
      title: 'Indexing & Discovery Platforms Integration',
      description:
        'SGRCR articles are continuously submitted and verified through international bibliographic indexes including IIFS, Zenodo, Google Scholar, CiteFactor, Zotero, and Scilit.',
      highlights: ['Crossref DOI Deposited', 'Zotero Bibliographic Metadata', 'Zenodo Open Repository'],
    },
  ];

  const filteredSecondary = secondaryNotifications.filter((n) => {
    if (activeFilter === 'cfp') return false;
    if (activeFilter !== 'all' && n.category !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf6f3] text-[#1f0707] flex flex-col">
      {/* Top Breadcrumb & Control Bar */}
      <div className="bg-[#1f0707] text-[#ffffff] border-b border-[#421413] py-4 px-4 sm:px-6">
        <div className="journal-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToMain}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#421413] hover:bg-[#781f1d] text-[#ffffff] text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal Home</span>
            </button>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-xs text-[#cfb6b3]">
              <span className="hidden sm:inline">Home</span>
              <span className="hidden sm:inline">/</span>
              <span className="text-[#ffffff] font-bold">Notifications & Announcements</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/80 text-red-200 border border-red-500/40 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping mr-1" />
              1 Active Call for Papers
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 journal-container py-8 sm:py-12">
        {/* Header Title Banner */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbeeed] border border-[#f2cfcd] text-[#781f1d] text-xs font-bold uppercase tracking-wider mb-3">
            <Bell className="w-3.5 h-3.5" /> Official Gazette & Circulars
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-[#1f0707] tracking-tight">
            Journal Notifications & Call for Papers
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#581e1d] max-w-3xl leading-relaxed">
            Stay up to date with official circulars, special issue calls for papers, manuscript submission deadlines, and editorial updates for <strong>SRCAA Global Review of Contemporary Research (SGRCR)</strong> — ISSN: 2839-6081.
          </p>

          {/* Filter & Search Bar */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#1f0707] text-[#ffffff] shadow-xs'
                    : 'bg-[#ffffff] text-[#581e1d] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Announcements
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('cfp')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'cfp'
                    ? 'bg-[#a13533] text-[#ffffff] shadow-xs'
                    : 'bg-[#ffffff] text-[#781f1d] hover:bg-red-50 border border-red-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Call for Papers (Active)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('editorial')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'editorial'
                    ? 'bg-[#1f0707] text-[#ffffff] shadow-xs'
                    : 'bg-[#ffffff] text-[#581e1d] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Editorial Updates
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('indexing')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'indexing'
                    ? 'bg-[#1f0707] text-[#ffffff] shadow-xs'
                    : 'bg-[#ffffff] text-[#581e1d] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Indexing & Archives
              </button>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#a13533]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRIMARY FEATURED NOTIFICATION: CALL FOR PAPERS (VOL 7 ISS 2 - DEC 2026) */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'cfp') && (
          <section
            id="call-for-papers-vol7-iss2"
            className="mb-12 bg-[#ffffff] border-2 border-[#781f1d] rounded-2xl shadow-xl overflow-hidden transition-all relative"
          >
            {/* Top Red Urgency Strip */}
            <div className="bg-gradient-to-r from-[#1f0707] via-[#781f1d] to-[#a13533] text-[#ffffff] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-white text-[#781f1d] font-bold text-xs uppercase tracking-wider shadow-xs">
                  Official Notification
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/30 border border-white/20 text-white font-mono text-xs font-bold">
                  Volume 7 | Issue 2 | December 2026
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500 text-white font-bold text-xs shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" /> NO APC FOR THIS ISSUE
                </span>
              </div>
              <div className="text-xs text-white/90 font-semibold flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Last Date for Submission: <strong>03 December 2026</strong></span>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
              {/* Header Title Section */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-gray-200 pb-8">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#781f1d]">
                    <FileText className="w-4 h-4" />
                    <span>Call for Papers · A Multidisciplinary International Journal</span>
                  </div>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1f0707] leading-tight">
                    SRCAA Global Review of Contemporary Research (SGRCR)
                  </h2>
                  <p className="text-sm font-semibold text-[#581e1d] flex flex-wrap items-center gap-2">
                    <span className="bg-[#faf6f3] px-2.5 py-1 rounded border border-[#e5d8d6] font-mono text-[#781f1d]">
                      ISSN: 2839-6081 (Online)
                    </span>
                    <span>·</span>
                    <span>Research Ideas Impact the World</span>
                    <span>·</span>
                    <span className="text-[#a13533] font-bold">Published by Shakti Research Centre and Academia (SRCAA)</span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2">
                    SRCAA Global Review of Contemporary Research (SGRCR) cordially invites original, unpublished and high-quality research papers, review articles, case studies and short communications from researchers, academicians, professionals and research scholars across the globe for <strong>Volume 7, Issue 2 (December 2026)</strong>.
                  </p>
                </div>

                {/* NO APC Highlight Box */}
                <div className="lg:w-80 shrink-0 bg-gradient-to-br from-[#fbeeed] via-[#f7e4e2] to-[#edd0cd] border-2 border-[#a13533] p-5 rounded-xl shadow-md text-center space-y-2">
                  <span className="inline-block px-3 py-1 bg-[#781f1d] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                    Special Author Privilege
                  </span>
                  <div className="font-serif font-bold text-2xl text-[#1f0707]">
                    NO APC
                  </div>
                  <div className="text-xs font-bold text-[#781f1d] uppercase tracking-wide">
                    For This Issue
                  </div>
                  <p className="text-xs text-[#421413] leading-relaxed pt-1">
                    Authors can publish their accepted work <strong>without any Article Processing Charges (APC)</strong> for Volume 7, Issue 2 (December 2026).
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onOpenSubmissionsModal}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#a13533] hover:bg-[#781f1d] text-white text-xs font-bold rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Submit Paper for Vol 7 Iss 2</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTION TOOLBAR & BROCHURE ACCESS HUB */}
              <div className="bg-[#faf6f3] border border-[#cfb6b3] rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#a13533] text-white flex items-center justify-center shadow-md shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#1f0707] flex items-center gap-2">
                        Official Call for Papers Brochure Document
                        <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Verified PDF
                        </span>
                      </h3>
                      <p className="text-xs text-[#581e1d]">
                        Filename: <code className="font-mono font-semibold">Brocedure__80ae9a16.pdf</code> · High-resolution official circular containing full dates, themes, and editorial governance.
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBrochureModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#c97775]" />
                      <span>Open Brochure Modal</span>
                    </button>

                    <a
                      href={brochurePdfPath}
                      download="SGRCR-Call-for-Papers-Vol7-Iss2-Brochure.pdf"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#a13533] hover:bg-[#781f1d] text-[#ffffff] text-xs font-bold rounded-lg shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsInlineViewerExpanded(!isInlineViewerExpanded)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#1f0707] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      {isInlineViewerExpanded ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5 text-[#781f1d]" />
                          <span>Hide Inline Preview</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5 text-[#781f1d]" />
                          <span>Preview Brochure Below</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyCFPText}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#1f0707] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      title="Copy Call for Papers notification text for academic dissemination"
                    >
                      {copiedCFP ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#781f1d]" />}
                      <span>{copiedCFP ? 'CFP Copied!' : 'Copy Notice'}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Document Preview (Collapsible) */}
                {isInlineViewerExpanded && (
                  <div className="pt-4 border-t border-[#cfb6b3] space-y-2 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between text-xs text-[#581e1d] font-semibold">
                      <span>Live Embedded Document Preview:</span>
                      <a
                        href={brochurePdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#781f1d] hover:underline inline-flex items-center gap-1"
                      >
                        Open Full Window <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="w-full h-[650px] bg-white rounded-xl border border-gray-300 overflow-hidden shadow-inner">
                      <iframe
                        src={`${brochurePdfPath}#toolbar=1&navpanes=0&scrollbar=1`}
                        title="Call for Papers Brochure"
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* IMPORTANT DATES GRID */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-[#781f1d]" />
                  <h3 className="font-serif font-bold text-lg text-[#1f0707] uppercase tracking-wide">
                    Important Dates & Timeline
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Step 1 */}
                  <div className="bg-[#faf6f3] border border-gray-200 rounded-xl p-4 relative overflow-hidden">
                    <div className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Step 1 · Submissions
                    </div>
                    <div className="mt-1 font-bold text-sm text-[#1f0707]">Submission Open</div>
                    <div className="mt-2 text-xl font-serif font-bold text-[#781f1d]">01 October 2026</div>
                    <div className="mt-1 text-xs text-emerald-700 font-semibold">Active & Accepting</div>
                  </div>

                  {/* Step 2 - Highlighted */}
                  <div className="bg-[#fbeeed] border-2 border-[#a13533] rounded-xl p-4 relative overflow-hidden shadow-sm">
                    <div className="text-[10px] font-bold text-[#a13533] uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#a13533]" /> Step 2 · Hard Deadline
                    </div>
                    <div className="mt-1 font-bold text-sm text-[#1f0707]">Last Date for Submission</div>
                    <div className="mt-2 text-xl font-serif font-bold text-[#a13533]">03 December 2026</div>
                    <div className="mt-1 text-xs text-[#781f1d] font-bold">Desk Review on Rolling Basis</div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-[#faf6f3] border border-gray-200 rounded-xl p-4 relative overflow-hidden">
                    <div className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600" /> Step 3 · Double-Blind
                    </div>
                    <div className="mt-1 font-bold text-sm text-[#1f0707]">Review Process</div>
                    <div className="mt-2 text-xl font-serif font-bold text-[#781f1d]">04–20 December 2026</div>
                    <div className="mt-1 text-xs text-gray-600">2+ Independent Referees</div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-[#faf6f3] border border-gray-200 rounded-xl p-4 relative overflow-hidden">
                    <div className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3 text-purple-600" /> Step 4 · Release
                    </div>
                    <div className="mt-1 font-bold text-sm text-[#1f0707]">Publication Date</div>
                    <div className="mt-2 text-xl font-serif font-bold text-[#781f1d]">23 December 2026</div>
                    <div className="mt-1 text-xs text-purple-700 font-semibold">Online Open Access & DOIs</div>
                  </div>
                </div>
              </div>

              {/* SCOPE & THEMES + KEY FEATURES DUAL COLUMN */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Themes List (2 Cols on lg) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#781f1d]" />
                    <h3 className="font-serif font-bold text-lg text-[#1f0707] uppercase tracking-wide">
                      Scope and Themes (Multidisciplinary)
                    </h3>
                  </div>
                  <p className="text-xs text-[#581e1d]">
                    SGRCR invites submissions across all contemporary theoretical, empirical, applied, and policy domains including but not limited to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {themes.map((theme, idx) => (
                      <div
                        key={theme}
                        className="flex items-center gap-2.5 p-3 bg-[#faf6f3] border border-gray-200 rounded-lg hover:border-[#a13533] transition-colors"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#1f0707] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#1f0707]">{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features & Indexing Box */}
                <div className="space-y-6">
                  <div className="bg-[#faf6f3] border border-[#cfb6b3] rounded-xl p-5 space-y-3">
                    <h4 className="font-serif font-bold text-base text-[#1f0707] flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#781f1d]" />
                      Key Features
                    </h4>
                    <ul className="space-y-2 text-xs text-[#421413]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Peer-Reviewed:</strong> Rigorous double-blind referee review</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Open Access:</strong> Creative Commons CC BY 4.0</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Multidisciplinary:</strong> Global cross-field coverage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Global Reach:</strong> International advisor & author pool</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Crossref DOI:</strong> Permanent digital object identifier</span>
                      </li>
                    </ul>
                  </div>

                  {/* Submission Checklist */}
                  <div className="bg-[#faf6f3] border border-[#cfb6b3] rounded-xl p-5 space-y-3">
                    <h4 className="font-serif font-bold text-base text-[#1f0707] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#781f1d]" />
                      Submission Checklist
                    </h4>
                    <ul className="space-y-2 text-xs text-[#421413]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#a13533] font-bold">✓</span>
                        <span>Original and unpublished work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#a13533] font-bold">✓</span>
                        <span>Follow standard journal manuscript format (.docx / .pdf)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#a13533] font-bold">✓</span>
                        <span>APA 7th edition referencing style</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#a13533] font-bold">✓</span>
                        <span>Submit through online system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#a13533] font-bold">✓</span>
                        <span>Mandatory plagiarism screening conducted</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* EDITORIAL TEAM FOR THIS ISSUE */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[#781f1d]" />
                  <h3 className="font-serif font-bold text-lg text-[#1f0707] uppercase tracking-wide">
                    Editorial Leadership & Advisory Team
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#faf6f3] rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider block">Chairperson</span>
                    <h5 className="font-serif font-bold text-base text-[#1f0707] mt-1">Sudhakaran T</h5>
                    <p className="text-xs text-[#581e1d] mt-1 leading-relaxed">
                      Chief Administrator, SRCAA · Official Reviewer Pool Member - Taylor & Francis Group · Member - CMAOI Association · Annual Member - Research Council of India (RCI)
                    </p>
                  </div>

                  <div className="p-4 bg-[#faf6f3] rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider block">Chief Editor</span>
                    <h5 className="font-serif font-bold text-base text-[#1f0707] mt-1">Dr. Anjana Radhakrishnan</h5>
                    <p className="text-xs text-[#581e1d] mt-1 leading-relaxed">
                      Associate Professor, Seshadripuram First Grade College, Karnataka, India
                    </p>
                  </div>

                  <div className="p-4 bg-[#faf6f3] rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider block">Chief Reviewer</span>
                    <h5 className="font-serif font-bold text-base text-[#1f0707] mt-1">Dr. S. M. Anas Iqbal</h5>
                    <p className="text-xs text-[#581e1d] mt-1 leading-relaxed">
                      Director, Business Management, Vishisht School of Management, Madhya Pradesh, India
                    </p>
                  </div>

                  <div className="p-4 bg-[#faf6f3] rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider block">International Advisor & Section Chief Reviewer</span>
                    <h5 className="font-serif font-bold text-base text-[#1f0707] mt-1">Dr. Kavikumar Jacob</h5>
                    <p className="text-xs text-[#581e1d] mt-1 leading-relaxed">
                      Associate Professor of Mathematics, Department of Mathematics and Statistics, Universiti Tun Hussein Onn Malaysia, Johor, Malaysia
                    </p>
                  </div>

                  <div className="p-4 bg-[#faf6f3] rounded-xl border border-gray-200 md:col-span-2 lg:col-span-2">
                    <span className="text-[10px] font-bold text-[#781f1d] uppercase tracking-wider block">Editorial Board Member</span>
                    <h5 className="font-serif font-bold text-base text-[#1f0707] mt-1">Dr. Girisha M. C.</h5>
                    <p className="text-xs text-[#581e1d] mt-1 leading-relaxed">
                      Associate Professor & Chairman, Department of Commerce, Mandya University, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              {/* INDEXING DISCOVERY PLATFORMS STRIP */}
              <div className="bg-[#1f0707] text-white p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <div className="text-xs text-[#c97775] font-bold uppercase tracking-wider">
                    Indexing & Discovery Platforms
                  </div>
                  <div className="text-sm font-semibold text-white/90">
                    Discoverable through leading academic repositories:
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
                  {['IIFS Impact Factor', 'Zenodo Repository', 'Google Scholar', 'CiteFactor', 'Zotero', 'Scilit'].map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded bg-[#421413] border border-[#781f1d] text-[#f6ece9]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* BOTTOM CALL TO ACTION */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Published by: <strong>Shakti Research Centre and Academia (SRCAA)</strong> · Bengaluru, Karnataka, India
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsBrochureModalOpen(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#1f0707] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#781f1d]" />
                    <span>View Brochure PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenSubmissionsModal}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#a13533] hover:bg-[#781f1d] text-[#ffffff] font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Submit Manuscript Now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* OTHER RECENT ACADEMIC NOTIFICATIONS & CIRCULARS */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-serif font-bold text-xl text-[#1f0707] flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#781f1d]" />
              Archived Announcements & Editorial Notices
            </h3>
            <span className="text-xs text-gray-500">
              {filteredSecondary.length} notices shown
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredSecondary.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#cfb6b3] transition-all shadow-2xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs font-semibold text-gray-500">{item.date}</span>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-lg text-[#1f0707] leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#581e1d] bg-[#faf6f3] px-2 py-0.5 rounded border border-[#ebd9d7]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Brochure PDF Modal */}
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        onSubmitManuscript={onOpenSubmissionsModal}
      />
    </div>
  );
};
