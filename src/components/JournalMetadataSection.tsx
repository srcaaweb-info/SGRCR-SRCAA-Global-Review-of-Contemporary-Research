import React from 'react';
import {
  BookOpen,
  LockOpen,
  ShieldCheck,
  Layers3,
  Briefcase,
  Users,
  Cpu,
  Scale,
  Calendar,
  MapPin,
} from 'lucide-react';
import {
  RESEARCH_DOMAINS,
  PUBLICATION_FREQUENCY,
  CURRENT_ISSUE_LABEL,
  OFFICIAL_CONTACT_ADDRESS,
} from '../data/journalData';

export const JournalMetadataSection: React.FC = () => {
  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#781f1d]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#781f1d]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#781f1d]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#781f1d]" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-[#781f1d]" />;
      case 'Layers':
      default:
        return <Layers3 className="w-5 h-5 text-[#781f1d]" />;
    }
  };

  return (
    <section id="journal-metadata" className="py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-28 bg-[#ffffff] border-b border-gray-200">
      <div className="journal-container">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#781f1d] text-xs font-bold uppercase tracking-widest border border-gray-200">
            <BookOpen className="w-3.5 h-3.5" />
            Journal Information & Scope
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl text-[#1f0707] mt-3">
            Journal Information & Research Domains
          </h2>
          <p className="mt-2 text-sm sm:text-base 2xl:text-lg text-[#581e1d] max-w-2xl 2xl:max-w-4xl">
            Published on a <strong>{PUBLICATION_FREQUENCY}</strong> schedule by <strong>{OFFICIAL_CONTACT_ADDRESS.publisher}</strong>, SGRCR publishes empirical, conceptual, and review articles across interconnected disciplines.
          </p>
        </div>

        {/* Journal Information Summary Bar (Frequency & Contact Address) */}
        <div className="mb-8 p-5 sm:p-6 bg-gray-50 border border-gray-200 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1f0707] block">Publication Frequency</span>
              <span className="text-[#781f1d] font-semibold">{PUBLICATION_FREQUENCY}</span>
              <span className="text-xs text-[#581e1d] block mt-0.5">Current Issue: {CURRENT_ISSUE_LABEL}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1f0707] block">Publisher & Access Format</span>
              <span className="text-[#421413] font-semibold">{OFFICIAL_CONTACT_ADDRESS.publisher}</span>
              <span className="text-xs text-[#581e1d] block mt-0.5">Open Access (CC BY 4.0) · Direct Website PDFs</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1f0707] block">Contact Address</span>
              <span className="text-xs text-[#421413] block leading-relaxed">
                Address Line 1: {OFFICIAL_CONTACT_ADDRESS.addressLine1}, City: {OFFICIAL_CONTACT_ADDRESS.city}, Pin Code: {OFFICIAL_CONTACT_ADDRESS.pinCode}, State: {OFFICIAL_CONTACT_ADDRESS.state}, Country: {OFFICIAL_CONTACT_ADDRESS.country} ({OFFICIAL_CONTACT_ADDRESS.mobileDisplay})
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Structural Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8 mb-10">
          <article className="bg-[#ffffff] border border-gray-200 rounded-xl p-5 sm:p-6 2xl:p-8 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-[#781f1d] mb-4">
              <LockOpen className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg 2xl:text-xl text-[#1f0707] mb-1">
              Open Access & Direct PDFs
            </h3>
            <p className="text-xs sm:text-sm 2xl:text-base text-[#581e1d] leading-relaxed">
              Immediate, unrestricted global access to all peer-reviewed articles with dedicated article entries and direct website PDF downloads under Creative Commons CC BY 4.0.
            </p>
          </article>

          <article className="bg-[#ffffff] border border-gray-200 rounded-xl p-5 sm:p-6 2xl:p-8 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-[#781f1d] mb-4">
              <ShieldCheck className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg 2xl:text-xl text-[#1f0707] mb-1">
              Double-Blind Peer Review
            </h3>
            <p className="text-xs sm:text-sm 2xl:text-base text-[#581e1d] leading-relaxed">
              Rigorous, blinded assessment by at least two independent subject-matter referees across every {PUBLICATION_FREQUENCY} issue, ensuring impartial merit and methodological soundness.
            </p>
          </article>

          <article className="bg-[#ffffff] border border-gray-200 rounded-xl p-5 sm:p-6 2xl:p-8 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-[#781f1d] mb-4">
              <Layers3 className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg 2xl:text-xl text-[#1f0707] mb-1">
              Multidisciplinary Breadth
            </h3>
            <p className="text-xs sm:text-sm 2xl:text-base text-[#581e1d] leading-relaxed">
              Bridging commerce, management, applied analytics, social sciences, and jurisprudence to encourage interdisciplinary inquiry on complex global challenges.
            </p>
          </article>
        </div>

        {/* 6 Research Domains Grid */}
        <div className="mt-8">
          <h3 className="font-serif font-bold text-xl sm:text-2xl 2xl:text-3xl text-[#1f0707] mb-6">
            Covered Academic Disciplines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8">
            {RESEARCH_DOMAINS.map((domain) => (
              <div
                key={domain.id}
                className="bg-[#ffffff] border border-gray-200 rounded-xl p-5 sm:p-6 2xl:p-8 transition-all hover:border-[#781f1d] hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                    {getDomainIcon(domain.icon)}
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg 2xl:text-xl text-[#1f0707] mb-2 group-hover:text-[#781f1d] transition-colors">
                    {domain.title}
                  </h4>
                  <p className="text-xs sm:text-sm 2xl:text-base text-[#581e1d] leading-relaxed mb-4">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <span className="text-[11px] 2xl:text-xs font-bold text-[#781f1d] block mb-1.5">
                    Key Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-50 text-[#421413] text-[10px] 2xl:text-xs font-medium rounded-sm border border-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
