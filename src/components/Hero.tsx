import React from 'react';
import { Archive, PenTool, ExternalLink, Award, Search, FileText, Bell, Sparkles } from 'lucide-react';
import { PUBLICATION_FREQUENCY } from '../data/journalData';
import { navigateToSection } from '../utils/navigation';

interface HeroProps {
  onOpenArticleArchive?: () => void;
  onOpenNotifications?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArticleArchive, onOpenNotifications }) => {
  const handleOpenSeparateArchive = () => {
    if (onOpenArticleArchive) {
      onOpenArticleArchive();
    } else {
      navigateToSection('archives');
    }
  };

  const handleOpenNotifications = () => {
    if (onOpenNotifications) {
      onOpenNotifications();
    } else {
      navigateToSection('notifications');
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

          {/* ESTD & ISSN Badge */}
          <div className="inline-flex flex-col items-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-full p-1.5 bg-[#ffffff] ring-4 ring-[#a13533]/80 shadow-2xl transition-transform hover:scale-105 duration-300">
              <img
                src="/logo.svg"
                alt="SRCAA bird and open book emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase">
              <span className="text-[#ffffff] bg-[#a13533] px-3 py-1 rounded-full border border-[#c97775] font-mono tracking-wider shadow-sm">
                ISSN: 2839-6081
              </span>
              <span className="text-[#c97775]">·</span>
              <span className="text-[#c97775]">
                ESTD: 2024 · Frequency: {PUBLICATION_FREQUENCY}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-[#ffffff] leading-tight tracking-tight drop-shadow-lg">
            SRCAA Global Review of Contemporary Research
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg 2xl:text-xl font-semibold tracking-widest uppercase text-[#c97775]">
            (SGRCR) — ISSN: 2839-6081 — A Peer-Reviewed International Research Journal
          </p>

          {/* Description */}
          <p className="mt-5 text-base sm:text-lg md:text-xl 2xl:text-2xl text-[#ede0de] max-w-3xl 2xl:max-w-4xl mx-auto font-normal leading-relaxed">
            An International Open Access, Double-Blind Peer-Reviewed Journal published {PUBLICATION_FREQUENCY} by Shakti Research Centre and Academia (SRCAA). Publishing original research across Commerce, Management, Economics, Social Sciences, Technology, and Interdisciplinary Fields.
          </p>

          {/* Active Call for Papers Alert Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-[#1f0707]/80 hover:bg-[#1f0707] border border-[#c97775]/50 rounded-full backdrop-blur-md transition-all shadow-md">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>Call for Papers: Volume 7, Issue 2 (Dec 2026)</span>
              <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/90 text-white text-[10px] uppercase font-bold tracking-wider">
                No APC
              </span>
            </span>
            <span className="text-white/40 hidden sm:inline">·</span>
            <button
              type="button"
              onClick={handleOpenNotifications}
              className="text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>View Brochure & Deadlines</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-3xl 2xl:max-w-4xl mx-auto">
            <button
              type="button"
              onClick={handleOpenNotifications}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 2xl:px-8 2xl:py-4 bg-[#781f1d] hover:bg-[#581e1d] text-[#ffffff] font-bold text-sm sm:text-base 2xl:text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border border-[#c97775] cursor-pointer"
            >
              <Bell className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-300" />
              <span>Call for Papers (Vol 7 Iss 2)</span>
            </button>

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
