import React, { useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  PenTool,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitManuscript?: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  onSubmitManuscript,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfUrl = '/assets/aistudio/Brocedure__80ae9a16.pdf';
  const fallbackPdfUrl = '/call-for-papers-vol7-iss2.pdf';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f0707]/85 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`bg-[#ffffff] rounded-2xl shadow-2xl flex flex-col w-full border border-gray-200 overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'h-[98vh] max-w-[98vw]' : 'h-[92vh] max-w-5xl'
        }`}
      >
        {/* Header Bar */}
        <div className="bg-[#1f0707] text-[#ffffff] px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-b border-[#421413]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#a13533]/30 border border-[#a13533]/50 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-[#ffffff]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-[#a13533] text-[#ffffff] text-[10px] font-bold uppercase tracking-wider">
                  Official Brochure
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  <Sparkles className="w-2.5 h-2.5" /> No APC
                </span>
                <span className="text-[11px] text-[#c97775] font-semibold hidden md:inline">
                  Vol. 7, Issue 2 (Dec 2026) · ISSN: 2839-6081
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#ffffff] truncate mt-0.5">
                Call for Papers Official Information Brochure — SGRCR
              </h3>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onSubmitManuscript && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSubmitManuscript();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#a13533] hover:bg-[#781f1d] text-[#ffffff] text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Submit Paper</span>
              </button>
            )}

            <a
              href={pdfUrl}
              download="SGRCR-Call-for-Papers-Vol7-Iss2-Brochure.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffffff] hover:bg-gray-100 text-[#1f0707] text-xs font-bold rounded-lg transition-colors shadow-xs"
              title="Download Brochure PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#781f1d]" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#cfb6b3] hover:text-[#ffffff] hover:bg-[#421413] rounded-lg transition-colors"
              title="Open PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-[#cfb6b3] hover:text-[#ffffff] hover:bg-[#421413] rounded-lg transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#cfb6b3] hover:text-[#ffffff] hover:bg-[#421413] rounded-lg transition-colors ml-1 cursor-pointer"
              title="Close brochure viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="bg-[#faf6f3] px-4 sm:px-6 py-2 border-b border-[#ebd9d7] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-[#421413]">
            <span className="font-semibold flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Article Processing Charge Waiver (No APC)
            </span>
            <span className="text-gray-300">|</span>
            <span>Submission Deadline: <strong>03 December 2026</strong></span>
            <span className="text-gray-300">|</span>
            <span>Publication Date: <strong>23 December 2026</strong></span>
          </div>

          <div className="text-[11px] text-[#781f1d] font-semibold">
            Shakti Research Centre and Academia (SRCAA)
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden flex flex-col">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="SGRCR Call for Papers Brochure PDF"
            className="w-full h-full border-0 flex-1 bg-white"
          />

          <div className="bg-[#ffffff] p-2 text-center text-xs text-[#581e1d] border-t border-gray-200 flex flex-wrap items-center justify-between px-4 gap-2">
            <span className="text-gray-500 text-[11px]">
              Document: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 font-mono">Brocedure__80ae9a16.pdf</code>
            </span>
            <div className="flex items-center gap-3">
              <a
                href={fallbackPdfUrl}
                download="SGRCR-Vol7-Iss2-CFP.pdf"
                className="text-[#781f1d] font-semibold hover:underline inline-flex items-center gap-1 text-xs"
              >
                <Download className="w-3 h-3" /> Direct Download Link
              </a>
              <span className="text-gray-300">·</span>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#781f1d] font-bold hover:underline inline-flex items-center gap-1 text-xs"
              >
                Open in Full Window <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
