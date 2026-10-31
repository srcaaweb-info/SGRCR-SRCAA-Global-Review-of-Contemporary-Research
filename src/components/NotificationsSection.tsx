import React, { useState } from 'react';
import { Bell, Megaphone, Calendar, Download, Eye, EyeOff, PenTool, ExternalLink } from 'lucide-react';
import { PUBLICATION_FREQUENCY } from '../data/journalData';
import { navigateToSection } from '../utils/navigation';

const CALL_FOR_PAPERS_PDF = '/articles/Brocedure_.pdf';

export const NotificationsSection: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section id="notifications" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#ffffff] border-b border-gray-200">
      <div className="journal-container">
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#781f1d] text-xs font-bold uppercase tracking-widest border border-gray-200">
            <Bell className="w-3.5 h-3.5" />
            Notifications
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl text-[#1f0707] mt-3">
            Journal Notifications
          </h2>
          <p className="mt-2 text-sm sm:text-base 2xl:text-lg text-[#581e1d] max-w-2xl 2xl:max-w-4xl">
            Latest announcements from the SGRCR editorial office, published {PUBLICATION_FREQUENCY.toLowerCase()}.
          </p>
        </div>

        <article className="bg-gray-50/70 border-2 border-[#a13533]/40 rounded-2xl p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#1f0707] text-[#a13533] flex items-center justify-center shrink-0 shadow-xs">
                <Megaphone className="w-6 h-6" />
              </div>
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider rounded-md border border-emerald-300">
                    Open for Submissions
                  </span>
                  <span className="px-2.5 py-0.5 bg-gray-100 text-[#421413] text-[11px] font-semibold rounded-md border border-gray-200">
                    Volume 7 · Issue 2
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1f0707] leading-snug">
                  Call for Papers
                </h3>
                <p className="text-sm text-[#421413] leading-relaxed max-w-3xl">
                  SGRCR invites original and high-quality research papers, review articles, case studies and short communications from researchers, academicians and professionals across the globe. No Article Processing Charges apply for this issue.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold text-[#581e1d] pt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#781f1d]" />
                    Submission open: 01 Oct 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#781f1d]" />
                    Last date: 03 Dec 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#781f1d]" />
                    Publication: 23 Dec 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigateToSection('submit-manuscript')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a13533] hover:bg-[#781f1d] text-[#ffffff] font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Submit Your Paper</span>
            </button>
            <button
              type="button"
              onClick={() => setShowPreview((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#1f0707] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              {showPreview ? <EyeOff className="w-4 h-4 text-[#781f1d]" /> : <Eye className="w-4 h-4 text-[#781f1d]" />}
              <span>{showPreview ? 'Hide Call for Papers' : 'View Call for Papers'}</span>
            </button>
            <a
              href={CALL_FOR_PAPERS_PDF}
              download="Call-for-Papers-SGRCR-Vol7-Issue2.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-[#c97775]" />
              <span>Download PDF</span>
            </a>
            <a
              href={CALL_FOR_PAPERS_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#781f1d] hover:underline ml-auto"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {showPreview && (
            <div className="mt-6 rounded-xl border border-gray-300 bg-white overflow-hidden">
              <iframe
                src={`${CALL_FOR_PAPERS_PDF}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Call for Papers - SGRCR Volume 7 Issue 2"
                className="w-full h-[720px] border-0 bg-white"
              />
            </div>
          )}
        </article>
      </div>
    </section>
  );
};
