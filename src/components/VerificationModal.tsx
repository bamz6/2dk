import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, FileCode2 } from 'lucide-react';
import { LAST_VERIFIED_DATE } from '../lib/constants';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-md border border-[#1F1F1F] bg-[#0D0D0D] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F1F1F] bg-black px-5 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-white" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              VERIFICATION PROTOCOL // AUDIT STANDARDS
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#71717A] hover:bg-white hover:text-black transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-[#A1A1AA] leading-relaxed font-sans max-h-[75vh] overflow-y-auto">
          <div>
            <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider mb-1">
              How We Audit & Verify Resources
            </h4>
            <p>
              2dk does not re-host executables or operate mirror download farms. Instead, every resource cataloged on this site is manually vetted according to strict anti-malware and source-authenticity rules:
            </p>
          </div>

          <div className="space-y-3 font-mono text-[11px]">
            <div className="rounded border border-[#1F1F1F] bg-black p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle2 className="h-4 w-4 text-white" />
                <span>1. OFFICIAL REPOSITORIES & DEVELOPER DOMAINS ONLY</span>
              </div>
              <p className="text-[#71717A] pl-6 font-sans">
                We link exclusively to the primary author's GitHub releases, source repositories, or authentic domain (e.g. handbrake.fr, obsproject.com, blackmagicdesign.com). Never third-party re-packers, monetized link shorteners, or ad-wrapped installers.
              </p>
            </div>

            <div className="rounded border border-[#1F1F1F] bg-black p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <FileCode2 className="h-4 w-4 text-white" />
                <span>2. SHA-256 HASH & VIRUSTOTAL SCANS</span>
              </div>
              <p className="text-[#71717A] pl-6 font-sans">
                Installers and release binaries are inspected through VirusTotal's 70+ scanner database. Published upstream cryptographic checksums (SHA-256) are checked prior to listing.
              </p>
            </div>

            <div className="rounded border border-[#1F1F1F] bg-black p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <AlertTriangle className="h-4 w-4 text-white" />
                <span>3. ZERO SPONSORED PLACEMENT OR BUNDLEWARE</span>
              </div>
              <p className="text-[#71717A] pl-6 font-sans">
                Tools cannot buy higher ranking or badges. If a utility starts bundling unwanted telemetry or adware, it is stripped from our directory immediately.
              </p>
            </div>
          </div>

          <div className="border-t border-[#1F1F1F] pt-4 font-mono text-[11px] text-[#71717A] flex items-center justify-between">
            <span>LAST MANUAL AUDIT: {LAST_VERIFIED_DATE}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1F1F1F] bg-black px-5 py-3 text-right">
          <button
            onClick={onClose}
            className="rounded bg-white px-4 py-1.5 font-mono text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            ACKNOWLEDGE
          </button>
        </div>
      </div>
    </div>
  );
};
