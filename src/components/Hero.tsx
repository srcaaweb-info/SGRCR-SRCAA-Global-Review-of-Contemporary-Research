import React from 'react';
import { Archive, PenTool, ExternalLink, Award, Search, FileText } from 'lucide-react';
import { PUBLICATION_FREQUENCY } from '../data/journalData';
import { navigateToSection } from '../utils/navigation';

interface HeroProps {
  onOpenArticleArchive?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArticleArchive }) => {
  const handleOpenSeparateArchive = () => {
    if (onOpenArticleArchive) {
      onOpenArticleArchive();
    } else {
      navigateToSection('archives');
    }
  };

  return (
    <section id="top" className="relative overflow-hidden text-[#ffffff]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/6549913/pexels-photo-6549913.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="University library with students researching"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1f0707]/90 via-[#260d0d]/85 to-[#421413]/80" />
        <div className="absolute inset-0 hero-grid opacity-30" />
      </div>

      {/* Content */}
      <div className="relative journal-container py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto text-center">

          {/* ESTD Badge */}
          <div className="inline-flex flex-col items-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-full p-1.5 bg-[#ffffff] ring-4 ring-[#a13533]/80 shadow-2xl transition-transform hover:scale-105 duration-300">
              <img
                src="/logo.svg"
                alt="SRCAA bird and open book emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-3 text-[#c97775] text-xs sm:text-sm 2xl:text-base font-bold tracking-widest uppercase">
              ESTD Year: 2024 · Frequency: {PUBLICATION_FREQUENCY}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-[#ffffff] leading-tight tracking-tight drop-shadow-lg">
            SRCAA Global Review of Contemporary Research
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg 2xl:text-xl font-semibold tracking-widest uppercase text-[#c97775]">
            (SGRCR) — A Peer-Reviewed International Research Journal
          </p>

          {/* Description */}
          <p className="mt-5 text-base sm:text-lg md:text-xl 2xl:text-2xl text-[#ede0de] max-w-3xl 2xl:max-w-4xl mx-auto font-normal leading-relaxed">
            An International Open Access, Double-Blind Peer-Reviewed Journal published {PUBLICATION_FREQUENCY} by Shakti Research Centre and Academia (SRCAA). Publishing original research across Commerce, Management, Economics, Social Sciences, Technology, and Interdisciplinary Fields.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl 2xl:max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => navigateToSection('submit-manuscript')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 2xl:px-8 2xl:py-4 bg-[#a13533] hover:bg-[#781f1d] text-[#ffffff] font-bold text-sm sm:text-base 2xl:text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border border-[#c97775] cursor-pointer"
            >
              <PenTool className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#ffffff]" />
              <span>Submit Paper</span>
              <ExternalLink className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            </button>

            <button
              type="button"
              onClick={handleOpenSeparateArchive}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 2xl:px-8 2xl:py-4 bg-[#ffffff] hover:bg-gray-100 text-[#1f0707] font-bold text-sm sm:text-base 2xl:text-lg rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Archive className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#781f1d]" />
              <span>Current Issue & Archives</span>
              <ExternalLink className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-[#781f1d]" />
            </button>
          </div>

          {/* Feature Badges */}
          <div className="mt-12 pt-8 border-t border-[#cfb6b3]/20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 2xl:gap-8 text-left max-w-4xl 2xl:max-w-5xl mx-auto">
            <div className="flex items-start gap-2.5 bg-white/5 p-3 2xl:p-4 rounded-lg border border-white/10 backdrop-blur-sm">
              <Award className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#a13533] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm 2xl:text-base font-bold text-[#ffffff]">Open Access</p>
                <p className="text-[11px] 2xl:text-xs text-[#cfb6b3]">CC BY 4.0 International</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-white/5 p-3 2xl:p-4 rounded-lg border border-white/10 backdrop-blur-sm">
              <Search className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#a13533] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm 2xl:text-base font-bold text-[#ffffff]">Double-Blind</p>
                <p className="text-[11px] 2xl:text-xs text-[#cfb6b3]">2+ Independent Referees</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-white/5 p-3 2xl:p-4 rounded-lg border border-white/10 backdrop-blur-sm">
              <FileText className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#a13533] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm 2xl:text-base font-bold text-[#ffffff]">Quarterly</p>
                <p className="text-[11px] 2xl:text-xs text-[#cfb6b3]">per Year</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-white/5 p-3 2xl:p-4 rounded-lg border border-white/10 backdrop-blur-sm">
              <Award className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#a13533] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm 2xl:text-base font-bold text-[#ffffff]">COPE & DORA</p>
                <p className="text-[11px] 2xl:text-xs text-[#cfb6b3]">Scopus CSAB Criteria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
