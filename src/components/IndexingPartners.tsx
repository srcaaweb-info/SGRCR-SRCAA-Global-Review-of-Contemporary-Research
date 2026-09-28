import React from 'react';
import { Search, Database, Globe2, BookOpen, FileText, ShieldCheck } from 'lucide-react';

const PARTNERS = [
  { name: 'Google Scholar', icon: Search },
  { name: 'Crossref DOI', icon: FileText },
  { name: 'COPE', icon: ShieldCheck },
  { name: 'DORA', icon: BookOpen },
  { name: 'ISSN India', icon: Database },
  { name: 'Scopus CSAB', icon: Globe2 },
];

export const IndexingPartners: React.FC = () => {
  return (
    <section className="bg-[#ffffff] border-b border-gray-200 py-8 sm:py-10 2xl:py-12">
      <div className="journal-container">
        <h3 className="text-center text-xs sm:text-sm 2xl:text-base font-bold uppercase tracking-widest text-[#781f1d] mb-6 2xl:mb-8">
          Indexing & Compliance Partners
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 2xl:gap-8">
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 2xl:p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#781f1d] hover:shadow-md transition-all group"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-9 2xl:h-9 text-[#781f1d] group-hover:text-[#a13533] transition-colors" />
                <span className="text-[10px] sm:text-xs 2xl:text-sm font-bold text-[#421413] text-center leading-tight">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
