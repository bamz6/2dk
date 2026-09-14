import React from 'react';
import { ArrowLeft, ExternalLink, ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
import { RESOURCES } from '../data/resources';

interface PiracyProps {
  onBack: () => void;
}

export const Piracy: React.FC<PiracyProps> = ({ onBack }) => {
  const piracyResources = RESOURCES.filter((r) => r.category === 'piracy');

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 bg-black text-white">
      {/* Back button & Section Tag */}
      <div className="mb-6 flex items-center justify-between font-mono text-xs text-[#71717A]">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-1.5 text-[#A1A1AA] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>INDEX // BROWSE</span>
        </button>
        <span className="tracking-wider">SEC.08 // REPO</span>
      </div>

      {/* Header */}
      <div className="border-b border-[#1F1F1F] pb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Community Repos & Digital Hygiene
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#A1A1AA]">
          Vetted community megathreads, open security tools, and operational security guidelines for navigating digital software archives safely.
        </p>
      </div>

      {/* Critical Security Rules Box */}
      <div className="my-8 rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-6 font-mono text-xs">
        <div className="flex items-center gap-2 text-white font-bold mb-4">
          <ShieldAlert className="h-4 w-4 text-white" />
          <span>MANDATORY DIGITAL HYGIENE DIRECTIVES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#A1A1AA] font-sans text-xs">
          <div className="border border-[#1F1F1F] bg-black p-4 rounded space-y-1">
            <span className="font-mono text-white font-bold text-xs block">01 // AD & POPUP INTERCEPTION</span>
            <p className="text-[#A1A1AA]">
              Never browse software portals without <strong>uBlock Origin</strong>. Over 90% of malware infections occur by clicking deceptive secondary "DOWNLOAD NOW" ad buttons designed to impersonate real links.
            </p>
          </div>

          <div className="border border-[#1F1F1F] bg-black p-4 rounded space-y-1">
            <span className="font-mono text-white font-bold text-xs block">02 // CHECKSUM & VIRUSTOTAL SCAN</span>
            <p className="text-[#A1A1AA]">
              Upload suspicious files or download URLs to <strong>VirusTotal</strong> before execution. Cross-reference published SHA-256 hashes against the community thread's stated release checksum.
            </p>
          </div>

          <div className="border border-[#1F1F1F] bg-black p-4 rounded space-y-1">
            <span className="font-mono text-white font-bold text-xs block">03 // DNS FILTERING & SANDBOXING</span>
            <p className="text-[#A1A1AA]">
              Configure your network to use privacy-respecting malware-blocking resolvers such as <strong>Quad9 (9.9.9.9)</strong>. Test unknown software in Windows Sandbox or a dedicated virtual machine.
            </p>
          </div>
        </div>
      </div>

      {/* Curated Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {piracyResources.map((res) => (
          <div
            key={res.id}
            className="group flex flex-col justify-between rounded-md border border-[#1F1F1F] bg-[#0D0D0D] p-5 transition-all hover:border-zinc-400"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-[#71717A] tracking-wider block mb-1">
                    {res.section}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-white group-hover:text-zinc-100">
                    {res.name}
                  </h3>
                </div>
                <span className="font-mono text-[9px] text-[#A1A1AA] border border-[#1F1F1F] px-1.5 py-0.5 rounded bg-black">
                  COMMUNITY
                </span>
              </div>

              <p className="mt-3 text-xs text-[#A1A1AA] leading-relaxed">
                {res.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {res.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-[#71717A] bg-black border border-[#1F1F1F] px-1.5 py-0.5 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-[#1F1F1F] pt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-[10px] text-[#71717A] flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-zinc-400" />
                COMMUNITY VETTED
              </span>

              <a
                href={res.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-1 font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                <span>VISIT REPOSITORY</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
