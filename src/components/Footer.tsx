import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import {
  PUBLICATION_FREQUENCY,
  CURRENT_ISSUE_LABEL,
  OFFICIAL_CONTACT_ADDRESS,
} from '../data/journalData';
import { navigateToSection } from '../utils/navigation';

interface FooterProps {
  onOpenSubmissionsLog?: () => void;
  onOpenArticleArchive?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArticleArchive }) => {
  const scrollToTop = () => {
    navigateToSection('top');
  };

  const handleOpenArticleArchive = () => {
    if (onOpenArticleArchive) {
      onOpenArticleArchive();
    } else {
      navigateToSection('archives');
    }
  };

  return (
    <footer className="bg-[#260d0d] text-[#ede0de] border-t border-[#451a19]">
      {/* Upper Footer Directory */}
      <div className="journal-container py-12 sm:py-16 2xl:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 2xl:gap-12">
          {/* Col 1: Emblem & Publisher */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-[#ffffff] ring-2 ring-[#a13533] shrink-0">
                <img
                  src="/logo.svg"
                  alt="SRCAA bird and open book emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#ffffff] tracking-wide block leading-tight">
                  SRCAA
                </span>
                <span className="text-xs text-[#a13533] tracking-widest uppercase">
                  Global Review
                </span>
              </div>
            </div>

            <p className="text-xs text-[#cfb6b3] leading-relaxed">
              <strong>{OFFICIAL_CONTACT_ADDRESS.publisher}</strong>. Digital academic and research institution established in 2024, accredited under the International Trade Council (ITC) Framework.
            </p>
            <p className="text-xs text-[#c97775] font-semibold">
              Publication Frequency: {PUBLICATION_FREQUENCY}
            </p>
          </div>

          {/* Col 2: Journal Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#ffffff] mb-3 pb-1 border-b border-[#451a19]">
              Journal Sections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button type="button" onClick={() => navigateToSection('about')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  About the Journal
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('journal-metadata')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Journal Information & Scope
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('editorial-board')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Editorial Board & Our Editors
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('author-guidelines')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Author Guidelines & Submission
                </button>
              </li>
              <li>
                <button type="button" onClick={handleOpenArticleArchive} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Archives ({CURRENT_ISSUE_LABEL})
                </button>
              </li>
              <li>
                <a
                  href="https://www.srcaa.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a13533] hover:text-[#ffffff] transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <span>SRCAA Official Website (srcaa.co.in)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Policies */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#ffffff] mb-3 pb-1 border-b border-[#451a19]">
              Statutory Policies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button type="button" onClick={() => navigateToSection('editorial-guidelines')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Policy 1 · Editorial Guidelines
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('reviewer-guidelines')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Policy 2 · Reviewer Guidelines
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('plagiarism-guidelines')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Policy 3 · Plagiarism & AI Guidelines
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('withdrawal-policy')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Policy 5 · Withdrawal & Retraction Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('legal-policy')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Policy 6 · Legal & Licensing (CC BY 4.0)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('academic-publication-policy')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  Policy 7 · Academic & Publication Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateToSection('issn-compliance')} className="hover:text-[#ffffff] transition-colors text-left cursor-pointer">
                  ISSN India Particulars & Frequency
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Address */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#ffffff] mb-3 pb-1 border-b border-[#451a19]">
              Contact Address
            </h4>
            <div className="space-y-2 text-xs text-[#cfb6b3]">
              <div className="text-[11px] leading-relaxed space-y-0.5">
                <strong className="text-[#ffffff] block">{OFFICIAL_CONTACT_ADDRESS.publisher}</strong>
                <span className="block">Address Line 1: {OFFICIAL_CONTACT_ADDRESS.addressLine1}</span>
                <span className="block">City: {OFFICIAL_CONTACT_ADDRESS.city}, Pin Code: {OFFICIAL_CONTACT_ADDRESS.pinCode}</span>
                <span className="block">State: {OFFICIAL_CONTACT_ADDRESS.state}, Country: {OFFICIAL_CONTACT_ADDRESS.country}</span>
              </div>
              <p className="pt-1 border-t border-[#451a19]">
                <strong className="text-[#ffffff] block">Editorial Secretariat Email:</strong>
                <a href={`mailto:${OFFICIAL_CONTACT_ADDRESS.primaryEmail}`} className="text-[#a13533] hover:underline">
                  {OFFICIAL_CONTACT_ADDRESS.primaryEmail}
                </a>
              </p>
              <p>
                <strong className="text-[#ffffff] block">Administrative Email:</strong>
                <a href={`mailto:${OFFICIAL_CONTACT_ADDRESS.adminEmail}`} className="text-[#a13533] hover:underline">
                  {OFFICIAL_CONTACT_ADDRESS.adminEmail}
                </a>
              </p>
              <p>
                <strong className="text-[#ffffff] block">Direct Phone / Mobile:</strong>
                <a href="tel:9148484079" className="text-[#c97775] hover:text-[#ffffff] font-mono font-bold">
                  {OFFICIAL_CONTACT_ADDRESS.mobileDisplay}
                </a>
              </p>

              <div className="pt-2 border-t border-[#451a19]">
                <a
                  href="https://www.srcaa.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1f0707] hover:bg-[#421413] text-[#c97775] hover:text-[#ffffff] border border-[#781f1d] rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#a13533]" />
                  <span>Visit SRCAA (srcaa.co.in)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#451a19] bg-[#1a0707] py-4">
        <div className="journal-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#cfb6b3]">
          <p className="text-center sm:text-left">
            © 2026 SRCAA — {OFFICIAL_CONTACT_ADDRESS.publisher} ({OFFICIAL_CONTACT_ADDRESS.shortFormatted}). All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#c97775] hover:text-[#ffffff] transition-colors p-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
