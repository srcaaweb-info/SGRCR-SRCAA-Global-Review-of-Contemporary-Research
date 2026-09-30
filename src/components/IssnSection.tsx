import React from 'react';
import { BadgeCheck, Calendar, Globe, Building2, MapPin, Phone, Mail } from 'lucide-react';
import {
  JOURNAL_PARTICULARS,
  PUBLICATION_FREQUENCY,
  CURRENT_ISSUE_LABEL,
  OFFICIAL_CONTACT_ADDRESS,
} from '../data/journalData';

export const IssnSection: React.FC = () => {
  return (
    <section id="issn-compliance" className="py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-28 bg-[#ffffff] border-b border-gray-200">
      <div className="journal-container">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#781f1d] text-xs font-bold uppercase tracking-widest border border-gray-200">
            <BadgeCheck className="w-3.5 h-3.5" />
            National & International Registry
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl text-[#1f0707] mt-3">
            ISSN India Compliance & Journal Particulars
          </h2>
          <p className="mt-2 text-sm sm:text-base 2xl:text-lg text-[#581e1d] max-w-2xl 2xl:max-w-4xl">
            Official registration credentials, statutory particulars, Contact Address, and fixed <strong>{PUBLICATION_FREQUENCY}</strong> publication schedule aligned with the ISSN National Centre of India and ISO 3297 international standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 2xl:gap-10">
          {/* Particulars Table (2 Cols on Large) */}
          <div className="lg:col-span-2 bg-[#ffffff] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#1f0707] mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#781f1d]" />
              Official Journal Particulars (ISSN Application)
            </h3>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="policy-table">
                <tbody>
                  {JOURNAL_PARTICULARS.map((item, index) => (
                    <tr key={index}>
                      <td className="w-2/5 font-bold text-[#1f0707] bg-gray-50/80 sm:bg-transparent">
                        {item.label}
                      </td>
                      <td className="w-3/5 text-[#421413]">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs italic text-[#581e1d]">
              * Print ISSN, Online e-ISSN, and Crossref DOI prefix numbers are assigned and published in accordance with statutory guidelines from the National Institute of Science Communication and Policy Research (NIScPR / CSIR), New Delhi.
            </p>
          </div>

          {/* Publication Frequency Schedule & Contact Address */}
          <div className="space-y-6">
            <div className="bg-[#ffffff] border border-gray-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#1f0707] mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#781f1d]" />
                Publication Frequency
              </h3>
              <p className="text-xs text-[#581e1d] leading-relaxed mb-4">
                SGRCR maintains a strict <strong>{PUBLICATION_FREQUENCY}</strong> schedule to meet ISSN India regularity covenants and global indexation timelines.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-gray-50/80 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center font-bold text-[#1f0707]">
                    <span>Volume 1 · Issue 1</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">Published</span>
                  </div>
                  <p className="text-[#581e1d] mt-1">Inaugural Issue · {CURRENT_ISSUE_LABEL}</p>
                </div>

                <div className="p-3 bg-gray-50/80 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center font-bold text-[#1f0707]">
                    <span>Volume 1 · Issue 2</span>
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm">Call for Papers</span>
                  </div>
                  <p className="text-[#581e1d] mt-1">Quarterly (3 Issues per Year) · January 2027</p>
                </div>

                <div className="p-3 bg-gray-50/80 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center font-bold text-[#1f0707]">
                    <span>Volume 1 · Issue 3</span>
                    <span className="text-[#581e1d] bg-gray-100 px-2 py-0.5 rounded-sm">Upcoming</span>
                  </div>
                  <p className="text-[#581e1d] mt-1">Quarterly (3 Issues per Year) · May 2027</p>
                </div>
              </div>
            </div>

            {/* Clearly Labelled Contact Address Card */}
            <div className="bg-[#ffffff] border border-gray-200 rounded-2xl p-6 shadow-xs">
              <h4 className="font-serif font-bold text-base text-[#1f0707] mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#781f1d]" />
                Contact Address
              </h4>
              <div className="space-y-1 text-xs text-[#581e1d]">
                <p><strong>Publisher:</strong> {OFFICIAL_CONTACT_ADDRESS.publisher}</p>
                <p><strong>Address Line 1:</strong> {OFFICIAL_CONTACT_ADDRESS.addressLine1}</p>
                <p><strong>City:</strong> {OFFICIAL_CONTACT_ADDRESS.city}</p>
                <p><strong>Pin Code:</strong> {OFFICIAL_CONTACT_ADDRESS.pinCode}</p>
                <p><strong>State:</strong> {OFFICIAL_CONTACT_ADDRESS.state}</p>
                <p><strong>Country:</strong> {OFFICIAL_CONTACT_ADDRESS.country}</p>
                <p className="pt-1.5 font-bold text-[#781f1d] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <a href="tel:9148484079" className="hover:underline">{OFFICIAL_CONTACT_ADDRESS.mobileDisplay}</a>
                </p>
                <p className="font-bold text-[#781f1d] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <a href={`mailto:${OFFICIAL_CONTACT_ADDRESS.primaryEmail}`} className="hover:underline">
                    {OFFICIAL_CONTACT_ADDRESS.primaryEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
