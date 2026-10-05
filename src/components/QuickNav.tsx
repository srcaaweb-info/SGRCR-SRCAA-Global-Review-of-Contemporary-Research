import React from 'react';
import { PenTool, Users, ShieldCheck, Archive } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';

interface QuickNavProps {
  onOpenArticleArchive?: () => void;
}

export const QuickNav: React.FC<QuickNavProps> = ({ onOpenArticleArchive }) => {
  const handleOpenArchives = () => {
    if (onOpenArticleArchive) {
      onOpenArticleArchive();
    } else {
      navigateToSection('archives');
    }
  };

  return (
    <section className="bg-[#ffffff] border-b border-gray-200 py-3.5 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Journal Quick Navigation" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          
          <button
            type="button"
            onClick={() => navigateToSection('author-guidelines')}
            className="flex items-center justify-center gap-2 p-2.5 sm:p-3 bg-[#ffffff] hover:bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-[#1f0707] transition-colors shadow-2xs text-center cursor-pointer"
          >
            <PenTool className="w-4 h-4 text-[#781f1d] shrink-0" />
            <span>Author Guidelines</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToSection('editorial-board')}
            className="flex items-center justify-center gap-2 p-2.5 sm:p-3 bg-[#ffffff] hover:bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-[#1f0707] transition-colors shadow-2xs text-center cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#781f1d] shrink-0" />
            <span>Editorial Board</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToSection('policies')}
            className="flex items-center justify-center gap-2 p-2.5 sm:p-3 bg-[#ffffff] hover:bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-[#1f0707] transition-colors shadow-2xs text-center cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#781f1d] shrink-0" />
            <span>Publication Policies</span>
          </button>

          <button
            type="button"
            onClick={handleOpenArchives}
            className="flex items-center justify-center gap-2 p-2.5 sm:p-3 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] border border-[#1f0707] rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-2xs group text-center cursor-pointer"
            title="View Archives & Publications"
          >
            <Archive className="w-4 h-4 text-[#a13533] shrink-0" />
            <span className="truncate">Archives & Publications</span>
          </button>

        </nav>
      </div>
    </section>
  );
};
