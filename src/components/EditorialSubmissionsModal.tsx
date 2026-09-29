import React, { useState, useEffect } from 'react';
import { 
  X, 
  Inbox, 
  FileText, 
  MessageSquare, 
  Mail, 
  ExternalLink, 
  Download, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  Eye,
  Key,
  Globe2,
  FolderOpen
} from 'lucide-react';
import { 
  getManuscriptSubmissions, 
  getEditorialInquiries, 
  getManuscriptFile,
  downloadBlob,
  formatFileSize,
  StoredManuscript, 
  StoredInquiry 
} from '../utils/submissionStorage';
import { ARTICLES } from '../data/journalData';
import { Article } from '../types';
import { ArticlePdfViewerModal } from './ArticlePdfViewerModal';

const RECIPIENT_GMAIL = 'srcaacontact@gmail.com';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'manuscripts' | 'inquiries' | 'server-pdfs' | 'smtp-status';
}

interface SmtpServerConfig {
  status: string;
  activeProvider: string;
  providers: {
    titan?: { name: string; host: string; port: number; fromEmail: string; isConfigured: boolean };
    gmail?: { name: string; host: string; port: number; fromEmail: string; isConfigured: boolean };
  };
  recipients: string[];
  totalRecordedSubmissions: number;
}

export const EditorialSubmissionsModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'manuscripts' 
}) => {
  const [activeTab, setActiveTab] = useState<'manuscripts' | 'inquiries' | 'server-pdfs' | 'smtp-status'>(defaultTab);
  const [manuscripts, setManuscripts] = useState<StoredManuscript[]>([]);
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedArticleForPdf, setSelectedArticleForPdf] = useState<Article | null>(null);
  const [smtpServerData, setSmtpServerData] = useState<SmtpServerConfig | null>(null);
  const [isLoadingSmtp, setIsLoadingSmtp] = useState(false);
  const [testResult, setTestResult] = useState<{ loading: boolean; message: string | null; success?: boolean }>({ loading: false, message: null });

  const fetchSmtpStatus = () => {
    setIsLoadingSmtp(true);
    fetch('/api/smtp-config')
      .then((res) => res.json())
      .then((data) => {
        setSmtpServerData(data);
        setIsLoadingSmtp(false);
      })
      .catch((err) => {
        console.warn('Error fetching SMTP config:', err);
        setIsLoadingSmtp(false);
      });
  };

  const handleTestSmtp = async (provider: 'gmail' | 'titan') => {
    setTestResult({ loading: true, message: null });
    try {
      const res = await fetch('/api/test-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, recipient: 'abhichannaveerappa@gmail.com' }),
      });
      const data = await res.json();
      setTestResult({
        loading: false,
        message: data.message || data.error,
        success: data.success,
      });
    } catch (err: any) {
      setTestResult({
        loading: false,
        message: err.message || 'Failed to ping test endpoint',
        success: false,
      });
    }
  };

  const reloadData = () => {
    setManuscripts(getManuscriptSubmissions());
    setInquiries(getEditorialInquiries());
    fetchSmtpStatus();
  };

  useEffect(() => {
    if (isOpen) {
      reloadData();
      if (defaultTab) {
        setActiveTab(defaultTab);
      }
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    const handleUpdate = () => reloadData();
    window.addEventListener('sgrcr-storage-update', handleUpdate);
    return () => window.removeEventListener('sgrcr-storage-update', handleUpdate);
  }, []);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    const rows = [
      ['Type', 'ID', 'Name', 'Email', 'Subject/Title', 'Category/Affiliation', 'Details', 'Timestamp'],
      ...manuscripts.map((m) => [
        'Manuscript',
        m.id,
        m.authorName,
        m.email,
        m.title,
        `${m.articleType} | ${m.affiliation}`,
        m.message || '',
        m.timestamp,
      ]),
      ...inquiries.map((i) => ['Inquiry', i.id, i.name, i.email, i.subject, '', i.message, i.timestamp]),
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((e) => e.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SGRCR_Submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#ffffff] border-2 border-[#781f1d]/40 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#1f0707] text-[#ffffff] flex items-center justify-between border-b border-[#421413]">
          <div className="flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-[#a13533]" />
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg">
                Editorial Secretariat & Submissions Management
              </h3>
              <p className="text-[11px] text-[#cfb6b3]">
                Official Gateway: <strong className="text-[#c97775]">Titan & Gmail SMTP Mail Services</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#cfb6b3] hover:text-[#ffffff] hover:bg-[#421413] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-[#f2ebe7] border-b border-[#cfb6b3] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('manuscripts')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'manuscripts' 
                  ? 'bg-[#781f1d] text-[#ffffff]' 
                  : 'text-[#421413] hover:bg-[#e5d7d5]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Manuscripts ({manuscripts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inquiries' 
                  ? 'bg-[#781f1d] text-[#ffffff]' 
                  : 'text-[#421413] hover:bg-[#e5d7d5]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries ({inquiries.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('server-pdfs')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'server-pdfs' 
                  ? 'bg-[#781f1d] text-[#ffffff]' 
                  : 'text-[#421413] hover:bg-[#e5d7d5]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Published Papers (8)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('smtp-status')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'smtp-status' 
                  ? 'bg-[#781f1d] text-[#ffffff]' 
                  : 'text-[#421413] hover:bg-[#e5d7d5]'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Titan & Gmail SMTP Status</span>
              {smtpServerData && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    smtpServerData.providers?.titan?.isConfigured || smtpServerData.providers?.gmail?.isConfigured
                      ? 'bg-emerald-500'
                      : 'bg-amber-500'
                  }`}
                />
              )}
            </button>
          </div>

          {(manuscripts.length > 0 || inquiries.length > 0) && (
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffffff] hover:bg-[#e9ded8] border border-[#cfb6b3] text-[#421413] rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#781f1d]" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* TAB 1: MANUSCRIPTS */}
          {activeTab === 'manuscripts' && (
            <div>
              {manuscripts.length === 0 ? (
                <div className="py-12 text-center text-[#581e1d]">
                  <FileText className="w-12 h-12 text-[#cfb6b3] mx-auto mb-3" />
                  <p className="font-semibold text-sm">No manuscripts recorded yet</p>
                  <p className="text-xs text-[#781f1d] mt-1">
                    When authors submit manuscripts, their submission dossier and document are logged here and transmitted via SMTP.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {manuscripts.map((m) => (
                    <div 
                      key={m.id}
                      className="p-4 bg-[#ffffff] border border-[#cfb6b3] rounded-xl shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#cfb6b3]/60 pb-2.5">
                        <div>
                          <span className="text-[10px] font-mono font-bold bg-[#e9ded8] text-[#781f1d] px-2 py-0.5 rounded-sm">
                            {m.id}
                          </span>
                          <h4 className="font-serif font-bold text-[#1f0707] text-base mt-1">
                            {m.title}
                          </h4>
                          <p className="text-xs text-[#581e1d]">
                            By <strong>{m.authorName}</strong> ({m.email}) • {m.affiliation}
                          </p>
                          {m.coAuthors && (
                            <p className="text-[11px] text-[#421413] mt-0.5">
                              <strong>Co-Authors:</strong> {m.coAuthors}
                            </p>
                          )}
                        </div>
                        <span className="text-[11px] text-[#781f1d] self-start sm:self-auto shrink-0 font-medium">
                          {m.timestamp}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#421413]">
                        <div>
                          <strong className="text-[#781f1d]">Category:</strong> {m.articleType}
                        </div>
                        {(m.manuscriptLink || m.fileName) && (
                          <div>
                            <strong className="text-[#781f1d]">Document:</strong>{' '}
                            <span>{m.fileName || 'Cloud Document'}</span>
                            {m.fileSize && (
                              <span className="text-[10px] text-[#781f1d] ml-1">
                                ({formatFileSize(m.fileSize)})
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {m.message && (
                        <div className="p-2.5 bg-[#faf6f3] rounded-lg border border-[#cfb6b3]/40 text-xs text-[#421413]">
                          <strong className="text-[#781f1d] block mb-0.5">Author Remarks:</strong>
                          <p className="whitespace-pre-wrap">{m.message}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#cfb6b3]/40 text-xs">
                        <div className="flex items-center gap-2">
                          {m.hasAttachment && (
                            <button
                              type="button"
                              onClick={async () => {
                                const fileRecord = await getManuscriptFile(m.id);
                                if (fileRecord?.blob) {
                                  downloadBlob(fileRecord.blob, fileRecord.name || m.fileName || `${m.id}_manuscript.pdf`);
                                }
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ffffff] hover:bg-[#e9ded8] border border-[#cfb6b3] text-[#421413] rounded-md font-semibold cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Download File</span>
                            </button>
                          )}
                          {m.manuscriptLink && (
                            <a
                              href={m.manuscriptLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#781f1d] hover:underline font-semibold"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Open Cloud Link</span>
                            </a>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyText(`Ref: ${m.id} | ${m.title} by ${m.authorName} (${m.email})`, m.id)}
                          className="text-xs text-[#781f1d] hover:underline font-semibold cursor-pointer"
                        >
                          {copiedId === m.id ? 'Copied ✓' : 'Copy Reference'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div>
              {inquiries.length === 0 ? (
                <div className="py-12 text-center text-[#581e1d]">
                  <MessageSquare className="w-12 h-12 text-[#cfb6b3] mx-auto mb-3" />
                  <p className="font-semibold text-sm">No editorial inquiries recorded yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 bg-[#ffffff] border border-[#cfb6b3] rounded-xl shadow-xs space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#cfb6b3]/60 pb-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold bg-[#e9ded8] text-[#781f1d] px-2 py-0.5 rounded-sm">
                            {inq.id}
                          </span>
                          <h4 className="font-serif font-bold text-[#1f0707] text-base mt-1">
                            {inq.subject}
                          </h4>
                          <p className="text-xs text-[#581e1d]">
                            From: <strong>{inq.name}</strong> (<a href={`mailto:${inq.email}`} className="text-[#781f1d] hover:underline">{inq.email}</a>)
                          </p>
                        </div>
                        <span className="text-[11px] text-[#781f1d] self-start sm:self-auto shrink-0 font-medium">
                          {inq.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-[#421413] bg-[#faf6f3] p-2.5 rounded-lg border border-[#cfb6b3]/40 whitespace-pre-wrap">
                        {inq.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PUBLISHED PAPERS */}
          {activeTab === 'server-pdfs' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#faf6f3] border border-[#cfb6b3] rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-[#421413]">Volume 1, Issue 1 (2026) Official Published Articles</span>
                </div>
                <span className="text-[11px] text-[#781f1d] font-semibold">8 Peer-Reviewed Articles</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ARTICLES.map((art) => (
                  <div
                    key={art.id}
                    className="p-3.5 bg-[#ffffff] border border-gray-200 rounded-xl flex flex-col justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#781f1d] bg-gray-100 px-2 py-0.5 rounded-sm">
                          Article {art.articleNumber}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">pp. {art.pages}</span>
                      </div>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#1f0707] line-clamp-2">
                        {art.title}
                      </h5>
                      <p className="text-[11px] text-[#581e1d] mt-1 truncate">
                        {art.authors.join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSelectedArticleForPdf(art)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#781f1d] hover:underline cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview PDF</span>
                      </button>
                      <a
                        href={art.pdfUrl}
                        download={`${art.id}.pdf`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SMTP GATEWAY STATUS & CONFIGURATION */}
          {activeTab === 'smtp-status' && (
            <div className="space-y-5 text-sm text-[#421413]">
              
              {/* Status Header */}
              <div className="p-4 sm:p-5 bg-[#ffffff] border border-[#cfb6b3] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#781f1d] bg-[#781f1d]/10 px-2.5 py-0.5 rounded-sm">
                      Backend Server SMTP Gateway
                    </span>
                    <span className="text-xs text-gray-500">· Express API at /api/submit-manuscript</span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#1f0707]">
                    Titan Mail & Google Gmail SMTP Integration
                  </h4>
                  <p className="text-xs text-[#581e1d] mt-0.5">
                    Direct automated dispatch of manuscript submissions and dossiers with attached document files.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchSmtpStatus}
                  disabled={isLoadingSmtp}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-[#1f0707] text-xs font-bold rounded-lg transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSmtp ? 'animate-spin' : ''}`} />
                  <span>Refresh Status</span>
                </button>
              </div>

              {/* Two Column Gateway Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Titan SMTP Gateway */}
                <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1f0707]">
                      <Server className="w-4 h-4 text-[#781f1d]" />
                      <span>Titan Mail SMTP (Institutional)</span>
                    </div>
                    {smtpServerData?.providers?.titan?.isConfigured ? (
                      <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                        Configured ✓
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                        Ready in .env
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#581e1d] bg-[#ffffff] p-3 rounded-lg border border-gray-200 font-mono">
                    <p><strong>Host:</strong> {smtpServerData?.providers?.titan?.host || 'smtp.titan.email'}</p>
                    <p><strong>Port:</strong> {smtpServerData?.providers?.titan?.port || 465} (SSL / TLS)</p>
                    <p><strong>Sender:</strong> {smtpServerData?.providers?.titan?.fromEmail || 'admin@srcaa.co.in'}</p>
                    <p><strong>Domain:</strong> @srcaa.co.in</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-[#581e1d] leading-relaxed">
                      Custom domain mailbox (<code>admin@srcaa.co.in</code>).
                    </p>
                    <button
                      type="button"
                      onClick={() => handleTestSmtp('titan')}
                      disabled={testResult.loading}
                      className="px-2.5 py-1 text-xs font-bold text-[#781f1d] hover:bg-gray-200 rounded-md border border-gray-300 transition-colors cursor-pointer shrink-0"
                    >
                      Test Titan Ping
                    </button>
                  </div>
                </div>

                {/* 2. Gmail SMTP Gateway */}
                <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1f0707]">
                      <Mail className="w-4 h-4 text-[#781f1d]" />
                      <span>Google Gmail SMTP Service</span>
                    </div>
                    {smtpServerData?.providers?.gmail?.isConfigured ? (
                      <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                        Configured ✓
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                        Ready
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#581e1d] bg-[#ffffff] p-3 rounded-lg border border-gray-200 font-mono">
                    <p><strong>Host:</strong> {smtpServerData?.providers?.gmail?.host || 'smtp.gmail.com'}</p>
                    <p><strong>Port:</strong> {smtpServerData?.providers?.gmail?.port || 465} (SSL / TLS)</p>
                    <p><strong>Sender:</strong> {smtpServerData?.providers?.gmail?.fromEmail || 'abhichannaveerappa@gmail.com'}</p>
                    <p><strong>Target:</strong> Editorial Inboxes (Active)</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-[#581e1d] leading-relaxed">
                      Configured active mail relay for submission notifications.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleTestSmtp('gmail')}
                      disabled={testResult.loading}
                      className="px-2.5 py-1 text-xs font-bold text-[#781f1d] hover:bg-gray-200 rounded-md border border-gray-300 transition-colors cursor-pointer shrink-0"
                    >
                      Test Gmail Ping
                    </button>
                  </div>
                </div>

              </div>

              {/* Test Result Feedback Box */}
              {testResult.message && (
                <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  testResult.success 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">SMTP Diagnostic Response:</span>
                    <span>{testResult.message}</span>
                  </div>
                </div>
              )}

              {/* Editorial Destination Inboxes */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-[#1f0707] block">
                  Configured Editorial Destination Inboxes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(smtpServerData?.recipients || ['srcaacontact@gmail.com', 'srcaaweb@gmail.com', 'admin@srcaa.co.in']).map((recip) => (
                    <span
                      key={recip}
                      className="px-2.5 py-1 bg-[#ffffff] border border-gray-300 rounded-md font-mono text-[#781f1d] font-bold"
                    >
                      {recip}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to configure variables safely */}
              <div className="p-4 sm:p-5 bg-[#ffffff] border border-gray-200 rounded-xl space-y-2 text-xs">
                <h5 className="font-bold text-[#1f0707] text-sm flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-[#781f1d]" />
                  <span>Environment Variables Guide (.env.example)</span>
                </h5>
                <p className="text-[#581e1d] leading-relaxed">
                  Both SMTP services run on the Express backend (`server.ts`). You can switch between Titan and Gmail by setting <code>SMTP_PROVIDER=titan</code> or <code>SMTP_PROVIDER=gmail</code> in your environment, and supplying your corresponding credentials.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f2ebe7] border-t border-[#cfb6b3] flex items-center justify-between text-xs text-[#581e1d]">
          <span>
            Editorial Inboxes: <strong className="text-[#1f0707]">{RECIPIENT_GMAIL} · admin@srcaa.co.in</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1f0707] hover:bg-[#421413] text-[#ffffff] font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* Modal for PDF Preview within Submissions Dashboard */}
        <ArticlePdfViewerModal
          article={selectedArticleForPdf}
          isOpen={Boolean(selectedArticleForPdf)}
          onClose={() => setSelectedArticleForPdf(null)}
        />

      </div>
    </div>
  );
};
