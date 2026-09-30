import React from 'react';
import { Info, CheckCircle, Award, FileBadge, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import {
  PUBLICATION_FREQUENCY,
  CURRENT_ISSUE_LABEL,
  OFFICIAL_CONTACT_ADDRESS,
} from '../data/journalData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-28 bg-[#ffffff] border-b border-gray-200">
      <div className="journal-container">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#781f1d] text-xs font-bold uppercase tracking-widest border border-gray-200">
            <Info className="w-3.5 h-3.5" />
            About the Journal
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl text-[#1f0707] mt-3">
            About the Journal — SGRCR
          </h2>
          <p className="mt-2 text-sm sm:text-base 2xl:text-lg text-[#581e1d] max-w-3xl 2xl:max-w-4xl">
            Advancing rigorous, ethical, and multidisciplinary academic enquiry under the institutional auspices of Shakti Research Centre and Academia (SRCAA).
          </p>
        </div>

        {/* Main Panel with Consistent White Theme Styling */}
        <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 2xl:p-12 shadow-xs space-y-6 text-[#421413] text-sm sm:text-base 2xl:text-lg leading-relaxed">
          <p>
            The <strong>SRCAA Global Review of Contemporary Research (SGRCR)</strong> is an open-access, double-blind peer-reviewed, multidisciplinary academic journal published on a <strong>{PUBLICATION_FREQUENCY}</strong> schedule under the aegis of <strong>{OFFICIAL_CONTACT_ADDRESS.publisher}</strong>, a digital academic and research institution established in 2024 and accredited under the <em>International Trade Council (ITC) Conformity Assessment and Recognition Framework</em>. The journal is committed to disseminating high-quality, original research across Commerce, Management, Economics, Social Sciences, Technology, and allied interdisciplinary fields.
          </p>

          <p>
            The journal strictly upholds the principles of the <strong>San Francisco Declaration on Research Assessment (DORA)</strong>, the <strong>Committee on Publication Ethics (COPE)</strong> Code of Conduct, and the editorial and content-selection criteria applied by <strong>Scopus/Elsevier's Content Selection and Advisory Board (CSAB)</strong>, with the long-term objective of qualifying for and sustaining indexation in Scopus and other internationally recognised abstracting and indexing databases.
          </p>

          <p>
            Every published article in SGRCR is assigned an individual entry page and a direct website PDF hosted on our server (<code>/articles/*.pdf</code>), clearly stating the journal title, volume, issue, month, year (<strong>{CURRENT_ISSUE_LABEL}</strong>), article title, and author name(s).
          </p>

          {/* Core Alignment Pillars */}
          <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 bg-[#ffffff] rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 text-[#781f1d] font-bold text-sm mb-1">
                <Award className="w-4 h-4" />
                <span>COPE Code of Conduct</span>
              </div>
              <p className="text-xs text-[#581e1d]">
                Zero tolerance for unethical authorship, plagiarism, or fabricated data, strictly adhering to COPE flowcharts.
              </p>
            </div>

            <div className="p-4 bg-[#ffffff] rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 text-[#781f1d] font-bold text-sm mb-1">
                <FileBadge className="w-4 h-4" />
                <span>DORA Principles</span>
              </div>
              <p className="text-xs text-[#581e1d]">
                Assessing individual research outputs purely on scientific merit, methodology rigor, and societal contribution.
              </p>
            </div>

            <div className="p-4 bg-[#ffffff] rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 text-[#781f1d] font-bold text-sm mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>Scopus CSAB & ISSN Criteria</span>
              </div>
              <p className="text-xs text-[#581e1d]">
                Regular <strong>{PUBLICATION_FREQUENCY}</strong> publication frequency, diverse international editorial board, and direct website PDF hosting.
              </p>
            </div>
          </div>

          {/* Publication Frequency & Contact Address Cards inside About the Journal */}
          <div className="pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="p-5 bg-[#ffffff] rounded-xl border border-gray-200 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#781f1d] font-bold text-sm">
                <Calendar className="w-4 h-4" />
                <span>Publication Frequency & Current Issue</span>
              </div>
              <p className="text-[#1f0707]">
                <strong>Publication Frequency:</strong> {PUBLICATION_FREQUENCY}
              </p>
              <p className="text-[#1f0707]">
                <strong>Current Issue:</strong> {CURRENT_ISSUE_LABEL}
              </p>
              <p className="text-[#581e1d] text-xs">
                Maintains a consistent {PUBLICATION_FREQUENCY} schedule across all volumes in compliance with ISSN National Centre, India guidelines.
              </p>
            </div>

            <div className="p-5 bg-[#ffffff] rounded-xl border border-gray-200 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#781f1d] font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Contact Address</span>
              </div>
              <p className="text-[#1f0707] font-semibold">
                {OFFICIAL_CONTACT_ADDRESS.publisher}
              </p>
              <p className="text-[#421413] text-xs leading-relaxed">
                Address Line 1: {OFFICIAL_CONTACT_ADDRESS.addressLine1}, City: {OFFICIAL_CONTACT_ADDRESS.city}, Pin Code: {OFFICIAL_CONTACT_ADDRESS.pinCode}, State: {OFFICIAL_CONTACT_ADDRESS.state}, Country: {OFFICIAL_CONTACT_ADDRESS.country}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-bold text-[#781f1d]">
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {OFFICIAL_CONTACT_ADDRESS.mobileDisplay}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {OFFICIAL_CONTACT_ADDRESS.primaryEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Policy Metadata Footer */}
          <div className="pt-4 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-semibold text-[#781f1d]">
            <div>
              <span className="text-[#581e1d] block font-normal">Publication Frequency</span>
              <span>{PUBLICATION_FREQUENCY}</span>
            </div>
            <div>
              <span className="text-[#581e1d] block font-normal">Current Issue</span>
              <span>{CURRENT_ISSUE_LABEL}</span>
            </div>
            <div>
              <span className="text-[#581e1d] block font-normal">Print / Online ISSN</span>
              <span>Applied for (ISSN India)</span>
            </div>
            <div>
              <span className="text-[#581e1d] block font-normal">DOI Prefix</span>
              <span>To be assigned (Crossref)</span>
            </div>
            <div>
              <span className="text-[#581e1d] block font-normal">Review Protocol</span>
              <span>Double-Blind Peer Review</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
