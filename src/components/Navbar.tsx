import React, { useState } from 'react';
import {
  Info,
  BookOpen,
  Users,
  ShieldCheck,
  Archive,
  Mail,
  Menu,
  X,
  ExternalLink,
  PenTool,
} from 'lucide-react';
import { navigateToSection } from '../utils/navigation';

interface NavbarProps {
  onOpenArchives?: () => void;
  onOpenArticleArchive?: () => void;
  onOpenSubmissionsLog?: () => void;
  theme?: 'warm' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubmissionsLog,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (sectionId: string) => {
    closeMobileMenu();
    navigateToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-gray-200 backdrop-blur-md shadow-sm transition-colors duration-200">
      <div className="journal-container">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo & Emblem */}
          <button
            type="button"
            onClick={() => handleNavClick('top')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#a13533] rounded-lg p-1 transition-transform text-left cursor-pointer"
            aria-label="SGRCR Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden p-0.5 bg-[#ffffff] ring-2 ring-[#a13533] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src="/logo.svg"
                alt="SRCAA bird and open book emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-[#1f0707] leading-tight">
                SGRCR
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#781f1d] uppercase truncate max-w-[140px] sm:max-w-none">
                SRCAA Global Review
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            <button type="button" onClick={() => handleNavClick('about')} className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
              <Info className="w-3.5 h-3.5 text-[#781f1d]" />
              About
            </button>
            <button type="button" onClick={() => handleNavClick('journal-metadata')} className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
              <BookOpen className="w-3.5 h-3.5 text-[#781f1d]" />
              Scope
            </button>
            <button type="button" onClick={() => handleNavClick('submit-manuscript')} className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
              <PenTool className="w-3.5 h-3.5 text-[#781f1d]" />
              Submit
            </button>
            <button type="button" onClick={() => handleNavClick('editorial-board')} className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
              <Users className="w-3.5 h-3.5 text-[#781f1d]" />
              Editorial Board
            </button>
            <button type="button" onClick={() => handleNavClick('policies')} className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-[#781f1d]" />
              Policies
            </button>
            <button type="button" onClick={() => handleNavClick('archives')} className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
              <Archive className="w-3.5 h-3.5 text-[#781f1d]" />
              Archives
            </button>
            <button type="button" onClick={() => handleNavClick('contact')} className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-[#781f1d]" />
              Contact
            </button>

            <div className="pl-2 border-l border-gray-200 flex items-center">
              <a
                href="https://www.srcaa.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#ffffff] text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 border border-gray-300 text-sm font-bold rounded-full shadow-xs transition-all"
                title="Visit SRCAA Official Website"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#781f1d]" />
                <span>SRCAA Portal</span>
              </a>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-[#1f0707] hover:bg-gray-100 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#a13533]"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden bg-[#ffffff] border-gray-200 border-t px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200 max-w-full overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <button type="button" onClick={() => handleNavClick('about')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100 text-left cursor-pointer">
              <Info className="w-4 h-4 text-[#781f1d]" />
              About the Journal
            </button>
            <button type="button" onClick={() => handleNavClick('journal-metadata')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100 text-left cursor-pointer">
              <BookOpen className="w-4 h-4 text-[#781f1d]" />
              Scope & Domains
            </button>
            <button type="button" onClick={() => handleNavClick('submit-manuscript')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100 text-left cursor-pointer">
              <PenTool className="w-4 h-4 text-[#781f1d]" />
              Submit Manuscript
            </button>
            <button type="button" onClick={() => handleNavClick('editorial-board')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100 text-left cursor-pointer">
              <Users className="w-4 h-4 text-[#781f1d]" />
              Editorial Board
            </button>
            <button type="button" onClick={() => handleNavClick('policies')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100 text-left cursor-pointer">
              <ShieldCheck className="w-4 h-4 text-[#781f1d]" />
              Publication Policies
            </button>
            <button type="button" onClick={() => handleNavClick('archives')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100 text-left cursor-pointer">
              <Archive className="w-4 h-4 text-[#781f1d]" />
              Archives
            </button>
            <button type="button" onClick={() => handleNavClick('contact')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100 text-left cursor-pointer">
              <Mail className="w-4 h-4 text-[#781f1d]" />
              Contact
            </button>
            <a href="https://www.srcaa.co.in/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <ExternalLink className="w-4 h-4 text-[#781f1d]" />
              SRCAA Website
            </a>
          </div>

          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
            {onOpenSubmissionsLog && (
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  onOpenSubmissionsLog();
                }}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-[#781f1d] hover:underline"
              >
                Editorial Submissions Management Log
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
