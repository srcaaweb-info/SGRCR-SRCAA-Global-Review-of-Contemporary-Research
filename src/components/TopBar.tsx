import React from 'react';
import { BadgeCheck, ExternalLink, Mail, Phone } from 'lucide-react';
import { navigateToSection } from '../utils/navigation';

interface TopBarProps {
  onOpenSubmissionsLog?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSubmissionsLog }) => {
  return (
    <div className="bg-[#1f0707] text-[#ede0de] text-xs border-b border-[#451514]">
      <div className="journal-container">
        <div className="flex items-center justify-between h-9">
          {/* Left: ISSN & Compliance Badges */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <BadgeCheck className="w-3.5 h-3.5 text-[#a13533]" />
              <span className="hidden sm:inline">ISSN: Applied For (ISSN National Centre, India)</span>
              <span className="sm:hidden">ISSN: Applied For</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 font-semibold">
              <BadgeCheck className="w-3.5 h-3.5 text-[#a13533]" />
              A Peer-Reviewed International Research Journal
            </span>
          </div>

          {/* Right: Phone, Portal & Contact Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:9148484079"
              className="inline-flex items-center gap-1 text-[#c97775] hover:text-[#ffffff] transition-colors font-semibold"
              title="Editorial Secretariat Mobile"
            >
              <Phone className="w-3 h-3 text-[#a13533]" />
              <span>M: 9148484079</span>
            </a>
            <button
              type="button"
              onClick={() => navigateToSection('contact')}
              className="inline-flex items-center gap-1 text-[#c97775] hover:text-[#ffffff] transition-colors font-semibold cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">Editorial Office</span>
              <span className="sm:hidden">Contact</span>
            </button>
            {onOpenSubmissionsLog && (
              <button
                type="button"
                onClick={onOpenSubmissionsLog}
                className="inline-flex items-center gap-1 text-[#c97775] hover:text-[#ffffff] transition-colors font-semibold"
              >
                <span>Submission Portal</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            )}
            <a
              href="https://www.srcaa.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#c97775] hover:text-[#ffffff] transition-colors font-semibold"
            >
              <span className="hidden sm:inline">SRCAA Portal</span>
              <span className="sm:hidden">SRCAA</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
