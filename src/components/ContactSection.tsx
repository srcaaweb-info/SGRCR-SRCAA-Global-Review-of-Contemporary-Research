import React, { useState } from 'react';
import {
  Mail,
  Building2,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  Clock,
  ShieldCheck,
  FileText,
  Send,
  Phone,
} from 'lucide-react';
import {
  OFFICIAL_CONTACT_ADDRESS,
  PUBLICATION_FREQUENCY,
} from '../data/journalData';

const CONTACT_EMAILS = [
  {
    id: 'editorial',
    title: 'Primary Editorial & Manuscript Inquiries',
    email: OFFICIAL_CONTACT_ADDRESS.primaryEmail,
    description:
      'For manuscript submissions, peer review follow-ups, author guidelines questions, revision tracking, and general editorial inquiries.',
    badge: 'Editorial Desk',
    primary: true,
  },
  {
    id: 'admin',
    title: 'Administrative & Institutional Secretariat',
    email: OFFICIAL_CONTACT_ADDRESS.adminEmail,
    description:
      'For institutional affiliations, publisher partnerships, licensing, accreditation, copyright verification, and administrative communications.',
    badge: 'Administration',
    primary: false,
  },
];

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2500);
  };

  const handleCopyAddress = () => {
    const fullAddress = `${OFFICIAL_CONTACT_ADDRESS.fullFormatted} | Phone: ${OFFICIAL_CONTACT_ADDRESS.mobileDisplay} | Email: ${OFFICIAL_CONTACT_ADDRESS.primaryEmail}`;
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false);
    }, 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 2xl:py-28 bg-[#ffffff] border-t border-gray-200">
      <div className="journal-container">
        {/* Section Header */}
        <div className="max-w-3xl 2xl:max-w-4xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#781f1d] bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Contact Us & Contact Address
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl 2xl:text-5xl text-[#1f0707] mt-3 mb-4">
            Contact Address & Editorial Secretariat
          </h2>
          <p className="text-[#581e1d] text-base sm:text-lg 2xl:text-xl leading-relaxed">
            Official institutional and editorial office Contact Address for the{' '}
            <strong>SRCAA Global Review of Contemporary Research (SGRCR)</strong> ({PUBLICATION_FREQUENCY}), published by{' '}
            <strong>{OFFICIAL_CONTACT_ADDRESS.publisher}</strong>.
          </p>
        </div>

        {/* Prominent Dedicated "Contact Address" Block (As in ISSN Application) */}
        <div className="mb-12 p-6 sm:p-8 bg-gray-50 border-2 border-[#781f1d]/30 rounded-2xl shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#781f1d] bg-[#ffffff] px-3 py-1 rounded-full border border-gray-200">
                <MapPin className="w-3.5 h-3.5" />
                <span>Official ISSN Application Contact Address</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1f0707]">
                Contact Address
              </h3>
              <div className="text-sm sm:text-base text-[#421413] space-y-1 pt-1">
                <p><strong>Publisher / Institution:</strong> {OFFICIAL_CONTACT_ADDRESS.publisher}</p>
                <p><strong>Address Line 1:</strong> {OFFICIAL_CONTACT_ADDRESS.addressLine1}</p>
                <p><strong>City:</strong> {OFFICIAL_CONTACT_ADDRESS.city}</p>
                <p><strong>Pin Code:</strong> {OFFICIAL_CONTACT_ADDRESS.pinCode}</p>
                <p><strong>State:</strong> {OFFICIAL_CONTACT_ADDRESS.state}</p>
                <p><strong>Country:</strong> {OFFICIAL_CONTACT_ADDRESS.country}</p>
                <p className="pt-1">
                  <strong>Phone / Mobile:</strong>{' '}
                  <a href="tel:9148484079" className="text-[#781f1d] font-bold hover:underline">
                    {OFFICIAL_CONTACT_ADDRESS.mobileDisplay}
                  </a>
                  {' · '}
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${OFFICIAL_CONTACT_ADDRESS.primaryEmail}`} className="text-[#781f1d] font-bold hover:underline">
                    {OFFICIAL_CONTACT_ADDRESS.primaryEmail}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-5 py-2.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] text-xs sm:text-sm font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#c97775]" />}
                <span>{copiedAddress ? 'Contact Address Copied!' : 'Copy Full Contact Address'}</span>
              </button>
              <a
                href="tel:9148484079"
                className="px-5 py-2.5 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#1f0707] text-xs sm:text-sm font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#781f1d]" />
                <span>Call Secretariat ({OFFICIAL_CONTACT_ADDRESS.mobileDisplay})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-10 mb-12">
          {CONTACT_EMAILS.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-7 sm:p-9 border transition-all shadow-xs flex flex-col justify-between ${
                item.primary
                  ? 'bg-[#ffffff] border-[#781f1d]/40 ring-1 ring-[#781f1d]/20'
                  : 'bg-[#ffffff] border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-[#421413] border border-gray-200">
                    {item.badge}
                  </span>
                  <Mail className="w-5 h-5 text-[#781f1d]" />
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1f0707] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[#581e1d] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Email Display Box */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-[#781f1d] shrink-0" />
                    <a
                      href={`mailto:${item.email}`}
                      className="font-mono font-bold text-sm sm:text-base text-[#1f0707] hover:text-[#781f1d] hover:underline truncate"
                      title={`Send email to ${item.email}`}
                    >
                      {item.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.email)}
                    className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-[#421413] transition-colors inline-flex items-center gap-1.5 cursor-pointer border border-gray-200"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail === item.email ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#781f1d]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                <a
                  href={`mailto:${item.email}?subject=Inquiry%20to%20SGRCR%20Secretariat`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=Inquiry%20to%20SGRCR%20Secretariat`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#ffffff] hover:bg-gray-50 border border-gray-200 text-[#421413] font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-2xs"
                >
                  <span>Open in Gmail</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#781f1d]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Secretariat & Guidelines Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Address Card */}
          <div className="bg-[#ffffff] border border-[#781f1d]/30 rounded-2xl p-6 shadow-xs flex flex-col justify-between ring-1 ring-[#781f1d]/10">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#781f1d]/10 flex items-center justify-center text-[#781f1d] mb-4 border border-[#781f1d]/20">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1f0707] mb-1">
                Contact Address
              </h4>
              <p className="text-xs text-[#781f1d] font-bold">
                {OFFICIAL_CONTACT_ADDRESS.publisher}
              </p>
              <div className="mt-2 text-xs text-[#581e1d] space-y-1 font-sans">
                <p><strong>Address Line 1:</strong> {OFFICIAL_CONTACT_ADDRESS.addressLine1}</p>
                <p><strong>City:</strong> {OFFICIAL_CONTACT_ADDRESS.city}</p>
                <p><strong>Pin Code:</strong> {OFFICIAL_CONTACT_ADDRESS.pinCode}</p>
                <p><strong>State:</strong> {OFFICIAL_CONTACT_ADDRESS.state}, {OFFICIAL_CONTACT_ADDRESS.country}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#421413] block mb-1">Direct Contact:</span>
                <a
                  href="tel:9148484079"
                  className="font-mono font-bold text-sm text-[#781f1d] hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#781f1d]" />
                  <span>{OFFICIAL_CONTACT_ADDRESS.mobileDisplay}</span>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
              <a
                href="tel:9148484079"
                className="flex-1 text-center px-3 py-1.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] text-xs font-bold rounded-lg transition-colors"
              >
                Call
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#421413] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-gray-200"
                title="Copy Address"
              >
                {copiedAddress ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Institution Affiliation */}
          <div className="bg-[#ffffff] border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#781f1d] mb-4 border border-gray-200">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1f0707] mb-1">
                Publishing Institution
              </h4>
              <p className="text-xs text-[#421413] font-semibold">
                {OFFICIAL_CONTACT_ADDRESS.publisher}
              </p>
              <p className="text-xs text-[#581e1d] mt-1.5 leading-relaxed">
                Academic research institution operating on a <strong>{PUBLICATION_FREQUENCY}</strong> publication schedule under international academic standards.
              </p>
            </div>
            <a
              href="https://www.srcaa.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#781f1d] hover:underline mt-4 pt-3 border-t border-gray-100"
            >
              <span>Visit Official SRCAA Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Submissions & Peer Review Help */}
          <div className="bg-[#ffffff] border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#781f1d] mb-4 border border-gray-200">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1f0707] mb-1">
                Manuscript Submissions
              </h4>
              <p className="text-xs text-[#421413] font-semibold">
                Double-Blind Peer Review ({PUBLICATION_FREQUENCY})
              </p>
              <p className="text-xs text-[#581e1d] mt-1.5 leading-relaxed">
                Authors may submit papers via our online portal or email manuscripts in Word/PDF format to <a href={`mailto:${OFFICIAL_CONTACT_ADDRESS.primaryEmail}`} className="text-[#781f1d] font-bold hover:underline">{OFFICIAL_CONTACT_ADDRESS.primaryEmail}</a>.
              </p>
            </div>
            <a
              href="#submit-manuscript"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#781f1d] hover:underline mt-4 pt-3 border-t border-gray-100"
            >
              <span>Submit Manuscript Online</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
