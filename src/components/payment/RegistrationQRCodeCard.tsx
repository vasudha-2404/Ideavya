import { ExternalLink, QrCode } from 'lucide-react';

interface RegistrationQRCodeCardProps {
  className?: string;
}

const REGISTRATION_URL = 'https://qrfy.io/BH_NAuejFM';

export default function RegistrationQRCodeCard({ className = '' }: RegistrationQRCodeCardProps) {
  return (
    <div
      className={`glass-card p-6 sm:p-8 relative overflow-hidden text-center transition-all duration-300 border-cyan-500/25 bg-gradient-to-b from-white/[0.07] via-midnight-850/80 to-midnight-950/90 flex flex-col justify-between group hover:border-cyan-400/40 ${className}`}
    >
      {/* Moonlight glow orbs behind the card */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 shadow-sm mb-4">
          <QrCode size={13} className="text-cyan-400" />
          <span>Official Registration Portal</span>
        </div>

        {/* Heading */}
        <h3 className="font-display font-bold text-white text-2xl sm:text-3xl mb-2 flex items-center justify-center gap-2.5">
          Scan to Register
        </h3>

        {/* Descriptive Text */}
        <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
          Scan the QR code to register and submit your idea for IDEAVYA 2026.
        </p>

        {/* Sharp Square QR Code in Frosted Frame */}
        <div className="flex justify-center mb-6">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Scan or click to open IDEAVYA 2026 Registration"
            className="group/qr relative inline-block p-4 sm:p-5 rounded-2xl bg-white shadow-2xl shadow-cyan-500/20 border-2 border-cyan-300/60 hover:border-cyan-300 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
          >
            <img
              src="/qr-code.png"
              alt="IDEAVYA 2026 Registration QR Code - Scan to register and submit your idea"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 object-contain rounded-lg aspect-square block mx-auto"
              loading="eager"
            />
            <div className="mt-2.5 text-[11px] font-semibold text-gray-700 flex items-center justify-center gap-1.5 group-hover/qr:text-indigo-600 transition-colors">
              <span>Click or Tap to Open</span>
              <ExternalLink size={12} />
            </div>
          </a>
        </div>
      </div>

      <div className="relative z-10">
        {/* Register Now Button */}
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="qr-register-now-btn"
          className="btn-primary w-full justify-center text-sm py-3.5 shadow-lg shadow-cyan-500/25 font-semibold mb-3 hover:scale-[1.02] active:scale-[0.98]"
        >
          Register Now
          <ExternalLink size={16} />
        </a>

        <p className="text-center text-gray-400 text-xs">
          Direct link opens in a new tab • Instant camera scan on mobile
        </p>
      </div>
    </div>
  );
}
