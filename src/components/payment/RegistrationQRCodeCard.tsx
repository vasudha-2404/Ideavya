import { ExternalLink, QrCode } from 'lucide-react';

interface RegistrationQRCodeCardProps {
  className?: string;
}

const REGISTRATION_URL = 'https://qrfy.io/BH_NAuejFM';

export default function RegistrationQRCodeCard({ className = '' }: RegistrationQRCodeCardProps) {
  return (
    <div
      className={`glass-card p-6 sm:p-8 relative overflow-hidden text-center transition-all duration-300 border-blue-400/30 bg-gradient-to-b from-white/[0.08] via-midnight-850/80 to-midnight-950/95 flex flex-col justify-between group hover:border-blue-300/60 shadow-xl shadow-blue-950/40 ${className}`}
    >
      {/* Blue & White ambient glow orbs behind the card */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Subtle blue & white pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600/15 text-blue-200 border border-blue-400/40 shadow-sm mb-4">
          <QrCode size={13} className="text-blue-300" />
          <span>Official Registration Portal</span>
        </div>

        {/* Heading */}
        <h3 className="font-display font-bold text-white text-2xl sm:text-3xl mb-2 flex items-center justify-center gap-2.5">
          Scan to Register
        </h3>

        {/* Descriptive Text */}
        <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
          Scan the QR code to register and submit your idea for IDEAVYA 2026.
        </p>

        {/* Sharp Square QR Code in White Frame with Blue Glow */}
        <div className="flex justify-center mb-6">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Scan or click to open IDEAVYA 2026 Registration"
            className="group/qr relative inline-block p-4 sm:p-5 rounded-2xl bg-white shadow-2xl shadow-blue-600/30 border-2 border-blue-200 hover:border-blue-400 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          >
            <img
              src="/qr-code.png"
              alt="IDEAVYA 2026 Registration QR Code - Scan to register and submit your idea"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 object-contain rounded-lg aspect-square block mx-auto"
              loading="eager"
            />
            <div className="mt-2.5 text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1.5 group-hover/qr:text-blue-600 transition-colors">
              <span>Click or Tap to Open</span>
              <ExternalLink size={12} />
            </div>
          </a>
        </div>
      </div>

      <div className="relative z-10">
        {/* Register Now Button in Royal Blue & White */}
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="qr-register-now-btn"
          className="btn-primary w-full justify-center text-sm py-3.5 shadow-lg shadow-blue-600/30 font-semibold mb-3 hover:scale-[1.02] active:scale-[0.98]"
        >
          Register Now
          <ExternalLink size={16} />
        </a>

        <p className="text-center text-slate-400 text-xs">
          Direct link opens in a new tab • Instant camera scan on mobile
        </p>
      </div>
    </div>
  );
}
