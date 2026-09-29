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

interface NavbarProps {
  onOpenArchives?: () => void;
  onOpenArticleArchive?: () => void;
  onOpenSubmissionsLog?: () => void;
  theme?: 'warm' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenArchives,
  onOpenArticleArchive,
  onOpenSubmissionsLog,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleArchivesClick = (e: React.MouseEvent) => {
    try {
      window.open('/archive.html', '_blank', 'noopener,noreferrer');
    } catch {
      // Ignored if window.open is restricted in iframe
    }
    if (onOpenArchives) onOpenArchives();
    if (onOpenArticleArchive) onOpenArticleArchive();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-gray-200 backdrop-blur-md shadow-sm transition-colors duration-200">
      <div className="journal-container">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo & Emblem */}
          <a
            href="#top"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#a13533] rounded-lg p-1 transition-transform"
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            <a href="#about" className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#781f1d]" />
              About
            </a>
            <a href="#journal-metadata" className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#781f1d]" />
              Scope
            </a>
            <a href="#submit-manuscript" className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-[#781f1d]" />
              Submit
            </a>
            <a href="#editorial-board" className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#781f1d]" />
              Editorial Board
            </a>
            <a href="#policies" className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#781f1d]" />
              Policies
            </a>
            <a href="#archives" className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5">
              <Archive className="w-3.5 h-3.5 text-[#781f1d]" />
              Archives
            </a>
            <a href="#contact" className="px-3 py-1.5 text-sm font-semibold text-[#1f0707] hover:text-[#781f1d] hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#781f1d]" />
              Contact
            </a>

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
            <a href="#about" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <Info className="w-4 h-4 text-[#781f1d]" />
              About the Journal
            </a>
            <a href="#journal-metadata" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <BookOpen className="w-4 h-4 text-[#781f1d]" />
              Scope & Domains
            </a>
            <a href="#submit-manuscript" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <PenTool className="w-4 h-4 text-[#781f1d]" />
              Submit Manuscript
            </a>
            <a href="#editorial-board" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <Users className="w-4 h-4 text-[#781f1d]" />
              Editorial Board
            </a>
            <a href="#policies" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <ShieldCheck className="w-4 h-4 text-[#781f1d]" />
              Publication Policies
            </a>
            <a href="#archives" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <Archive className="w-4 h-4 text-[#781f1d]" />
              Archives
            </a>
            <a href="#contact" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#1f0707] hover:bg-gray-100">
              <Mail className="w-4 h-4 text-[#781f1d]" />
              Contact
            </a>
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
