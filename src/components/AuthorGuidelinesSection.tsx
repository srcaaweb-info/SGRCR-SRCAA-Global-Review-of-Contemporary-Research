import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Send, 
  AlertCircle,
  Link as LinkIcon,
  Copy,
  Check,
  ExternalLink,
  Mail,
  Download,
  X,
  Server,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Inbox
} from 'lucide-react';
import { 
  saveManuscriptSubmission, 
  formatFileSize, 
  downloadTextFile 
} from '../utils/submissionStorage';

interface Props {
  onOpenSubmissionsLog?: () => void;
}

interface SmtpConfigState {
  activeProvider: string;
  providers: {
    titan?: { name: string; host: string; port: number; fromEmail: string; isConfigured: boolean };
    gmail?: { name: string; host: string; port: number; fromEmail: string; isConfigured: boolean };
  };
  recipients: string[];
}

export const AuthorGuidelinesSection: React.FC<Props> = ({ onOpenSubmissionsLog }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [selectedSmtpProvider, setSelectedSmtpProvider] = useState<'gmail' | 'titan'>('gmail');
  const [smtpConfig, setSmtpConfig] = useState<SmtpConfigState | null>(null);

  const [formData, setFormData] = useState({
    authorName: '',
    email: '',
    affiliation: '',
    coAuthors: '',
    articleType: 'Original research article',
    title: '',
    abstract: '',
    keywords: '',
    manuscriptLink: '',
    message: '',
    declaration: false,
  });

  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceId: string;
    timestamp: string;
    provider: string;
    smtpStatus: string;
    message: string;
    editorialInboxes: string[];
    authorName: string;
    email: string;
    affiliation: string;
    coAuthors?: string;
    articleType: string;
    title: string;
    fileName?: string;
    fileSize?: number;
    manuscriptLink?: string;
    messageText?: string;
  } | null>(null);

  // Fetch SMTP status from backend
  useEffect(() => {
    fetch('/api/smtp-config')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setSmtpConfig(data);
          if (data.activeProvider === 'titan') {
            setSelectedSmtpProvider('titan');
          } else {
            setSelectedSmtpProvider('gmail');
          }
        }
      })
      .catch((err) => {
        console.warn('Backend SMTP config check:', err);
      });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setValidationError(null);
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const processFile = (file: File) => {
    if (file.size > 35 * 1024 * 1024) {
      setValidationError('File size exceeds the 35MB limit. Please upload a smaller file or provide a cloud link.');
      return;
    }
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const validExts = ['.pdf', '.doc', '.docx', '.rtf', '.odt'];
    if (!validExts.includes(ext)) {
      setValidationError('Invalid file format. Please upload a PDF or Microsoft Word document (.docx / .pdf).');
      return;
    }
    setSelectedFile(file);
    setValidationError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const generateReceiptText = (receipt: NonNullable<typeof submissionReceipt>) => {
    return `================================================================================
SRCAA GLOBAL REVIEW OF CONTEMPORARY RESEARCH (SGRCR)
OFFICIAL MANUSCRIPT SUBMISSION RECEIPT & DOSSIER
================================================================================
Submission Reference ID: ${receipt.referenceId}
Transmission Timestamp: ${receipt.timestamp}
SMTP Mail Gateway: ${receipt.provider.toUpperCase()} (Port 465 / SSL Secure)
Delivery Status: ${receipt.smtpStatus}

1. AUTHOR & INSTITUTIONAL DETAILS:
--------------------------------------------------------------------------------
- Corresponding Author: ${receipt.authorName}
- Institutional Email: ${receipt.email}
- Institutional Affiliation: ${receipt.affiliation}
${receipt.coAuthors ? `- Co-Authors: ${receipt.coAuthors}\n` : ''}
2. MANUSCRIPT SPECIFICATIONS:
--------------------------------------------------------------------------------
- Manuscript Title: ${receipt.title}
- Article Category: ${receipt.articleType}
- Document File: ${receipt.fileName ? `${receipt.fileName} (${formatFileSize(receipt.fileSize || 0)})` : 'None (Cloud document link provided)'}
- Cloud / Drive Link: ${receipt.manuscriptLink || 'None provided'}

3. EDITORIAL TRANSMISSION DESTINATIONS:
--------------------------------------------------------------------------------
- Editorial Inboxes: ${receipt.editorialInboxes.join(', ')}
- Institutional Publisher: Shakti Research Centre and Academia (SRCAA)

4. ETHICAL & COPE INTEGRITY DECLARATION:
--------------------------------------------------------------------------------
[CONFIRMED] The author certifies that this manuscript is original, is not under
review elsewhere, conforms to the Committee on Publication Ethics (COPE) Code
of Conduct, and complies with DORA scientific evaluation criteria.
================================================================================`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.authorName.trim() || !formData.email.trim() || !formData.affiliation.trim() || !formData.title.trim()) {
      setValidationError('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    if (!selectedFile && !formData.manuscriptLink.trim()) {
      setValidationError('Please either upload a manuscript file (.docx / .pdf) or provide an accessible cloud document link.');
      return;
    }

    if (!formData.declaration) {
      setValidationError('Please accept the publication ethics and originality declaration to proceed.');
      return;
    }

    setFormStatus('submitting');

    try {
      const payload = new FormData();
      payload.append('authorName', formData.authorName.trim());
      payload.append('email', formData.email.trim());
      payload.append('affiliation', formData.affiliation.trim());
      payload.append('coAuthors', formData.coAuthors.trim());
      payload.append('articleType', formData.articleType);
      payload.append('title', formData.title.trim());
      payload.append('abstract', formData.abstract.trim());
      payload.append('keywords', formData.keywords.trim());
      payload.append('manuscriptLink', formData.manuscriptLink.trim());
      payload.append('message', formData.message.trim());
      payload.append('declaration', 'true');
      payload.append('smtpChoice', selectedSmtpProvider);

      if (selectedFile) {
        payload.append('attachment', selectedFile, selectedFile.name);
      }

      const response = await fetch('/api/submit-manuscript', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Server rejected manuscript transmission.');
      }

      // Also persist to local cache for instant in-app editorial log review
      try {
        saveManuscriptSubmission(
          {
            authorName: formData.authorName,
            email: formData.email,
            affiliation: formData.affiliation,
            coAuthors: formData.coAuthors,
            articleType: formData.articleType,
            title: formData.title,
            manuscriptLink: formData.manuscriptLink,
            fileName: selectedFile?.name,
            fileSize: selectedFile?.size,
            hasAttachment: !!selectedFile,
            message: formData.message,
            timestamp: result.timestamp,
            forwardStatus: 'forwarded',
          },
          selectedFile || undefined,
          result.referenceId
        );
      } catch (cacheErr) {
        console.warn('Local log sync note:', cacheErr);
      }

      setSubmissionReceipt({
        referenceId: result.referenceId,
        timestamp: result.timestamp,
        provider: result.provider,
        smtpStatus: result.smtpStatus,
        message: result.message,
        editorialInboxes: result.editorialInboxes || ['abhichannaveerappa@gmail.com', 'srcaacontact@gmail.com', 'admin@srcaa.co.in'],
        authorName: formData.authorName,
        email: formData.email,
        affiliation: formData.affiliation,
        coAuthors: formData.coAuthors,
        articleType: formData.articleType,
        title: formData.title,
        fileName: selectedFile?.name,
        fileSize: selectedFile?.size,
        manuscriptLink: formData.manuscriptLink,
        messageText: formData.message,
      });

      setFormStatus('success');
    } catch (err: any) {
      console.error('Submission failed:', err);
      setValidationError(err.message || 'Transmission failed. Please check your connection or contact the editorial desk directly.');
      setFormStatus('error');
    }
  };

  const handleCopyReceipt = () => {
    if (!submissionReceipt) return;
    const text = generateReceiptText(submissionReceipt);
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDownloadReceiptFile = () => {
    if (!submissionReceipt) return;
    const text = generateReceiptText(submissionReceipt);
    downloadTextFile(text, `${submissionReceipt.referenceId}_Official_Receipt.txt`);
  };

  const handleResetForm = () => {
    setFormStatus('idle');
    setSubmissionReceipt(null);
    setSelectedFile(null);
    setValidationError(null);
    setFormData({
      authorName: '',
      email: '',
      affiliation: '',
      coAuthors: '',
      articleType: 'Original research article',
      title: '',
      abstract: '',
      keywords: '',
      manuscriptLink: '',
      message: '',
      declaration: false,
    });
  };

  return (
    <section id="author-guidelines" className="py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-28 bg-[#ffffff] border-b border-gray-200">
      <div className="journal-container">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#781f1d] text-xs font-bold uppercase tracking-widest border border-gray-200">
            <PenTool className="w-3.5 h-3.5" />
            Submissions & Standards
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl text-[#1f0707] mt-3">
            Author & Submission Guidelines
          </h2>
          <p className="mt-2 text-sm sm:text-base 2xl:text-lg text-[#581e1d] max-w-2xl 2xl:max-w-4xl">
            Rigorous criteria for manuscript preparation, academic formatting, citation rules, ethical declarations, and online transmission to the editorial council.
          </p>
        </div>

        {/* Guidelines Specifications Panel */}
        <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 2xl:p-12 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gray-200">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1f0707] mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#781f1d]" />
                Manuscript Preparation
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#421413] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#781f1d] font-bold">•</span>
                  <span><strong>Language:</strong> English (UK or US spelling, applied consistently throughout).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#781f1d] font-bold">•</span>
                  <span><strong>Research Articles:</strong> 4,000 – 8,000 words including tables and abstract.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#781f1d] font-bold">•</span>
                  <span><strong>Review Papers:</strong> Up to 10,000 words; Short Communications: up to 2,500 words.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#781f1d] font-bold">•</span>
                  <span><strong>Typography:</strong> Times New Roman 12pt, 1.5 line spacing, 1-inch margins on A4 format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#781f1d] font-bold">•</span>
                  <span><strong>Citation Style:</strong> APA 7th Edition mandatory for all in-text citations and references.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#781f1d] font-bold">•</span>
                  <span><strong>Graphics:</strong> All figures and charts must be minimum 300 DPI resolution.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-[#1f0707] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#781f1d]" />
                Manuscript Structure
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-[#421413] leading-relaxed list-decimal list-inside">
                <li><strong>Title Page:</strong> Concise title (&lt;20 words), author affiliations, ORCID iDs, corresponding email.</li>
                <li><strong>Abstract & Keywords:</strong> 200–250 word structured abstract accompanied by 4–6 keywords.</li>
                <li><strong>Introduction & Literature Review:</strong> Problem formulation, context, theoretical framework.</li>
                <li><strong>Research Methodology:</strong> Research design, sample, instrumentation, and statistical tools.</li>
                <li><strong>Results & Discussion:</strong> Data presentation, hypothesis testing, and analytical discussion.</li>
                <li><strong>Conclusion & Implications:</strong> Theoretical contributions, managerial relevance, and limitations.</li>
                <li><strong>Mandatory Declarations:</strong> Conflict of interest, funding, and ethical consent disclosures.</li>
              </ol>
            </div>
          </div>

          {/* Timeline & APC Transparency */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 bg-[#ffffff] rounded-xl border border-gray-200 shadow-xs">
              <Clock className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#1f0707]">Editorial Review Timeline</h4>
                <p className="text-xs text-[#581e1d] mt-1">
                  Preliminary desk screening completed within <strong>3–5 working days</strong>. Double-blind referee review typically completes in <strong>3–4 weeks</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#ffffff] rounded-xl border border-gray-200 shadow-xs">
              <DollarSign className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#1f0707]">Transparent APC Policy</h4>
                <p className="text-xs text-[#581e1d] mt-1">
                  No hidden evaluation fees. SGRCR provides institutional waivers for researchers from lower-middle income economies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Manuscript Submission Card */}
        <div id="submit-manuscript" className="scroll-mt-24 bg-[#ffffff] border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 2xl:p-12 shadow-sm">
          
          {/* Header of Submission Box */}
          <div className="pb-6 border-b border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#781f1d] bg-[#781f1d]/10 px-2.5 py-0.5 rounded-sm">
                    Official Editorial Gateway
                  </span>
                  <span className="text-xs text-[#581e1d] font-medium">· Double-Blind Peer Review · COPE Standards</span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1f0707]">
                  Submit Your Manuscript Online
                </h3>
                <p className="text-xs sm:text-sm text-[#581e1d] mt-1 max-w-3xl">
                  Submit original research or review manuscripts directly to the SGRCR Editorial Secretariat. Submissions undergo initial desk screening and double-blind referee assignment.
                </p>
              </div>

              {/* Verified Editorial Channel Badge */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl text-xs shrink-0 self-start md:self-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-[#1f0707] block">Direct Editorial Channel</span>
                  <span className="text-[11px] text-[#581e1d] font-mono">abhichannaveerappa@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Editorial SMTP Transmission Selector */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/60 p-3.5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#421413]">
                <Server className="w-4 h-4 text-[#781f1d]" />
                <span>Editorial Dispatch Route:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedSmtpProvider('gmail')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-semibold transition-all text-left cursor-pointer ${
                    selectedSmtpProvider === 'gmail'
                      ? 'bg-[#1f0707] text-[#ffffff] border-[#1f0707] shadow-xs'
                      : 'bg-[#ffffff] text-[#421413] border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Mail className={`w-3.5 h-3.5 ${selectedSmtpProvider === 'gmail' ? 'text-[#c97775]' : 'text-[#781f1d]'}`} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span>Gmail SMTP</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        selectedSmtpProvider === 'gmail' ? 'bg-[#781f1d] text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Demo
                      </span>
                    </div>
                    <p className={`text-[10px] font-mono truncate max-w-[180px] ${
                      selectedSmtpProvider === 'gmail' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      abhichannaveerappa@gmail.com
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSmtpProvider('titan')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-semibold transition-all text-left cursor-pointer ${
                    selectedSmtpProvider === 'titan'
                      ? 'bg-[#1f0707] text-[#ffffff] border-[#1f0707] shadow-xs'
                      : 'bg-[#ffffff] text-[#421413] border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Server className={`w-3.5 h-3.5 ${selectedSmtpProvider === 'titan' ? 'text-[#c97775]' : 'text-[#781f1d]'}`} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span>Titan Mail SMTP</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        selectedSmtpProvider === 'titan' ? 'bg-[#781f1d] text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        Institutional
                      </span>
                    </div>
                    <p className={`text-[10px] font-mono truncate max-w-[180px] ${
                      selectedSmtpProvider === 'titan' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      admin@srcaa.co.in
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-amber-900">Submission Notice</p>
                <p className="mt-0.5">{validationError}</p>
              </div>
            </div>
          )}

          {/* SUCCESS RECEIPT STATE */}
          {formStatus === 'success' && submissionReceipt ? (
            <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#fbfdfb] to-[#ffffff] border-2 border-emerald-600 rounded-2xl text-[#1f0707] space-y-6 shadow-md animate-in fade-in duration-300">
              
              {/* Receipt Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-sm">
                      Transmission Confirmed
                    </span>
                    <h4 className="font-serif font-bold text-2xl sm:text-3xl text-[#1f0707] mt-1">
                      Manuscript Submission Dossier Dispatched
                    </h4>
                    <p className="text-xs sm:text-sm text-[#581e1d] mt-1">
                      Your submission dossier and manuscript have been registered with the SGRCR Editorial Secretariat via {submissionReceipt.provider.toUpperCase()} SMTP.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-xs text-[#581e1d] font-semibold">Official Reference ID:</span>
                  <span className="font-mono font-bold text-base sm:text-lg text-[#781f1d] bg-gray-100 px-3 py-1 rounded-md border border-gray-200 mt-0.5">
                    {submissionReceipt.referenceId}
                  </span>
                </div>
              </div>

              {/* Status and Inboxes Summary Banner */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#781f1d]" />
                  <span className="font-bold text-[#421413]">Editorial Inboxes:</span>
                  <span className="text-[#581e1d] font-mono">{submissionReceipt.editorialInboxes.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#421413]">Timestamp:</span>
                  <span className="text-[#581e1d]">{submissionReceipt.timestamp}</span>
                </div>
              </div>

              {/* Dossier Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden text-xs sm:text-sm">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200 bg-gray-50/70">
                      <td className="p-3.5 font-bold text-[#421413] w-1/3">Corresponding Author</td>
                      <td className="p-3.5 text-[#1f0707] font-semibold">{submissionReceipt.authorName}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3.5 font-bold text-[#421413]">Institutional Email</td>
                      <td className="p-3.5 text-[#1f0707]">{submissionReceipt.email}</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50/70">
                      <td className="p-3.5 font-bold text-[#421413]">Affiliation / Institution</td>
                      <td className="p-3.5 text-[#1f0707]">{submissionReceipt.affiliation}</td>
                    </tr>
                    {submissionReceipt.coAuthors && (
                      <tr className="border-b border-gray-200">
                        <td className="p-3.5 font-bold text-[#421413]">Co-Authors</td>
                        <td className="p-3.5 text-[#1f0707]">{submissionReceipt.coAuthors}</td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-200 bg-gray-50/70">
                      <td className="p-3.5 font-bold text-[#421413]">Manuscript Title</td>
                      <td className="p-3.5 text-[#1f0707] font-serif font-bold text-sm sm:text-base">
                        {submissionReceipt.title}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3.5 font-bold text-[#421413]">Article Category</td>
                      <td className="p-3.5 text-[#1f0707]">{submissionReceipt.articleType}</td>
                    </tr>
                    {submissionReceipt.fileName && (
                      <tr className="border-b border-gray-200 bg-gray-50/70">
                        <td className="p-3.5 font-bold text-[#421413]">Attached Document</td>
                        <td className="p-3.5 text-emerald-800 font-medium flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald-700" />
                          <span>{submissionReceipt.fileName}</span>
                          {submissionReceipt.fileSize && (
                            <span className="text-xs text-gray-500">
                              ({formatFileSize(submissionReceipt.fileSize)})
                            </span>
                          )}
                        </td>
                      </tr>
                    )}
                    {submissionReceipt.manuscriptLink && (
                      <tr className="border-b border-gray-200">
                        <td className="p-3.5 font-bold text-[#421413]">Cloud Access Link</td>
                        <td className="p-3.5">
                          <a
                            href={submissionReceipt.manuscriptLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#781f1d] hover:underline inline-flex items-center gap-1 font-medium"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            <span>{submissionReceipt.manuscriptLink}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Next Steps Card */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#781f1d] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#421413]">
                  <p className="font-bold text-[#1f0707]">Next Steps in the Peer Review Process:</p>
                  <p className="mt-1 text-[#581e1d] leading-relaxed">
                    Your paper will now undergo preliminary desk screening by the Section Editor for originality, scope alignment, and plagiarism index check (&lt;10%). The corresponding author will receive editorial updates within <strong>3–5 working days</strong>.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadReceiptFile}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#c97775]" />
                    <span>Download Receipt Dossier (.txt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyReceipt}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] hover:bg-gray-100 border border-gray-300 text-[#421413] font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#781f1d]" />
                        <span>Copy Dossier Text</span>
                      </>
                    )}
                  </button>

                  {onOpenSubmissionsLog && (
                    <button
                      type="button"
                      onClick={onOpenSubmissionsLog}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-300 text-[#1f0707] font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                    >
                      <Inbox className="w-4 h-4 text-[#781f1d]" />
                      <span>Submissions Log</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs sm:text-sm text-[#781f1d] hover:text-[#1f0707] font-bold underline px-3 py-2 cursor-pointer"
                >
                  Submit Another Manuscript
                </button>
              </div>

            </div>
          ) : (
            /* PROFESSIONAL MANUSCRIPT SUBMISSION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SECTION 1: AUTHOR INFORMATION */}
              <div>
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-200">
                  <span className="w-6 h-6 rounded-full bg-[#781f1d] text-white flex items-center justify-center text-xs font-bold">1</span>
                  <h4 className="font-serif font-bold text-base text-[#1f0707]">Corresponding & Co-Author Details</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      Corresponding Author Name *
                    </label>
                    <input
                      type="text"
                      name="authorName"
                      required
                      value={formData.authorName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Anjana Radhakrishnan"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      Institutional Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="author@institution.edu"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      University / Institution Affiliation *
                    </label>
                    <input
                      type="text"
                      name="affiliation"
                      required
                      value={formData.affiliation}
                      onChange={handleInputChange}
                      placeholder="e.g. University of Madras, Chennai"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                    Co-Authors & Affiliations (Optional)
                  </label>
                  <input
                    type="text"
                    name="coAuthors"
                    value={formData.coAuthors}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. R. Sharma (IIT Bombay); Prof. K. Menon (IIM Bangalore)"
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs"
                  />
                  <p className="text-[11px] text-[#581e1d] mt-1">
                    List any collaborating researchers, separating authors and institutions with semicolons.
                  </p>
                </div>
              </div>

              {/* SECTION 2: MANUSCRIPT SPECIFICATIONS */}
              <div className="pt-2">
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-200">
                  <span className="w-6 h-6 rounded-full bg-[#781f1d] text-white flex items-center justify-center text-xs font-bold">2</span>
                  <h4 className="font-serif font-bold text-base text-[#1f0707]">Manuscript Metadata & Category</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      Submission Category *
                    </label>
                    <select
                      name="articleType"
                      value={formData.articleType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs font-medium"
                    >
                      <option value="Original research article">Original Research Article (4,000–8,000 words)</option>
                      <option value="Review article">Review Article (up to 10,000 words)</option>
                      <option value="Case study">Case Study (3,000–5,000 words)</option>
                      <option value="Short communication">Short Communication (&lt;2,500 words)</option>
                      <option value="Conceptual paper">Conceptual Paper</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      Manuscript Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Full academic title of the research paper (concise, under 20 words)"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs font-serif"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      Structured Abstract (Optional)
                    </label>
                    <textarea
                      name="abstract"
                      rows={3}
                      value={formData.abstract}
                      onChange={handleInputChange}
                      placeholder="Brief summary covering: Background, Research Objectives, Methodology, Core Findings, and Academic Implications (200–250 words)..."
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      Keywords (Optional)
                    </label>
                    <textarea
                      name="keywords"
                      rows={3}
                      value={formData.keywords}
                      onChange={handleInputChange}
                      placeholder="e.g. Econometric Modeling, Supply Chain, Machine Learning, Corporate Governance (4–6 terms separated by commas)"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: DOCUMENT UPLOAD & REPOSITORY */}
              <div className="pt-2">
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-200">
                  <span className="w-6 h-6 rounded-full bg-[#781f1d] text-white flex items-center justify-center text-xs font-bold">3</span>
                  <h4 className="font-serif font-bold text-base text-[#1f0707]">Manuscript Document & Cloud Access</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* File Upload Zone */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#421413]">
                        Upload Document (.pdf / .docx / .doc) *
                      </label>
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-[11px] text-red-700 hover:text-red-900 font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
                        isDragging
                          ? 'border-[#781f1d] bg-[#781f1d]/5'
                          : selectedFile
                          ? 'border-emerald-500 bg-emerald-50/40'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50/40'
                      }`}
                    >
                      {selectedFile ? (
                        <div className="flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-[#1f0707] truncate">{selectedFile.name}</p>
                              <p className="text-[11px] text-[#581e1d]">
                                {formatFileSize(selectedFile.size)} · Ready to transmit via SMTP
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                            Attached ✓
                          </span>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-7 h-7 text-[#781f1d] mx-auto mb-2 opacity-80" />
                          <label className="cursor-pointer text-xs font-bold text-[#781f1d] hover:underline block">
                            <span>Browse manuscript file</span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.rtf,.odt"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[11px] text-[#581e1d] mt-1">
                            Accepted: PDF, DOCX, DOC (Up to 35 MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cloud Link Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#421413] mb-1.5">
                      Or Document Cloud Link (Google Drive / OneDrive)
                    </label>
                    <div className="relative">
                      <LinkIcon className="w-4 h-4 text-[#781f1d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="url"
                        name="manuscriptLink"
                        value={formData.manuscriptLink}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/file/d/..."
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs"
                      />
                    </div>
                    <p className="text-[11px] text-[#581e1d] mt-1.5 leading-relaxed">
                      If providing a link, verify that link access permissions are set to "Anyone with the link can view".
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 4: COVER LETTER */}
              <div className="pt-2">
                <div className="flex items-center gap-2 pb-2 mb-4 border-b border-gray-200">
                  <span className="w-6 h-6 rounded-full bg-[#781f1d] text-white flex items-center justify-center text-xs font-bold">4</span>
                  <h4 className="font-serif font-bold text-base text-[#1f0707]">Cover Letter & Editorial Remarks (Optional)</h4>
                </div>

                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Outline the significance of the paper, recommended independent reviewers, or potential conflict of interest disclosures..."
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-gray-300 rounded-xl text-sm text-[#1f0707] focus:ring-2 focus:ring-[#781f1d] focus:outline-hidden transition-all shadow-2xs resize-none"
                />
              </div>

              {/* SECTION 5: ETHICAL DECLARATION */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="declaration"
                    required
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded text-[#781f1d] focus:ring-[#781f1d] border-gray-300 cursor-pointer"
                  />
                  <div className="text-xs text-[#421413] leading-relaxed">
                    <span className="font-bold text-[#1f0707]">
                      Author Originality & Publication Ethics Declaration *
                    </span>
                    <p className="text-[#581e1d] mt-0.5">
                      I declare that this manuscript is original, has not been published previously, is not under consideration elsewhere, that all co-authors have consented to this submission, and that it conforms to the Committee on Publication Ethics (COPE) guidelines and DORA research evaluation standards.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submission Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-[#581e1d]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Routing to <strong>abhichannaveerappa@gmail.com</strong> via {selectedSmtpProvider.toUpperCase()} SMTP Gateway.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#a13533] hover:bg-[#781f1d] text-[#ffffff] font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#ffffff]" />
                      <span>Transmitting Manuscript via SMTP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#ffffff]" />
                      <span>Submit Manuscript to Editorial Secretariat</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
