import { ExternalLink, QrCode, Sparkles } from 'lucide-react';

interface RegistrationQRCodeCardProps {
  className?: string;
}

const REGISTRATION_URL = 'https://qrfy.io/BH_NAuejFM';

export default function RegistrationQRCodeCard({ className = '' }: RegistrationQRCodeCardProps) {
  return (
    <div
      className={`glass-card p-6 sm:p-8 border-brand-500/30 bg-gradient-to-b from-brand-500/10 via-purple-500/5 to-transparent relative overflow-hidden text-center transition-all duration-300 hover:border-brand-500/50 flex flex-col justify-between ${className}`}
    >
      {/* Decorative gradient background glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-sm mb-4">
          <Sparkles size={12} className="text-brand-400" />
          <span>Quick Registration</span>
        </div>

        {/* Heading */}
        <h3 className="font-display font-bold text-white text-2xl sm:text-3xl mb-2 flex items-center justify-center gap-2">
          <QrCode size={24} className="text-brand-400" />
          Scan to Register
        </h3>

        {/* Required descriptive text */}
        <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
          Scan the QR code to register and submit your idea for IDEAVYA 2026.
        </p>

        {/* Clickable QR Code */}
        <div className="flex justify-center mb-6">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Scan or click to open IDEAVYA 2026 Registration"
            className="group relative inline-block p-4 sm:p-5 rounded-2xl bg-white shadow-2xl shadow-brand-500/20 border-2 border-brand-400/40 hover:border-brand-400 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-500/40"
          >
            <img
              src="/qr-code.png"
              alt="IDEAVYA 2026 Registration QR Code - Scan to register and submit your idea"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 object-contain rounded-lg aspect-square block mx-auto"
              loading="eager"
            />
            <div className="mt-2.5 text-[11px] font-semibold text-gray-700 flex items-center justify-center gap-1.5 group-hover:text-brand-600 transition-colors">
              <span>Click or Tap to Open</span>
              <ExternalLink size={12} />
            </div>
          </a>
        </div>
      </div>

      <div>
        {/* Register Now Button */}
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="qr-register-now-btn"
          className="btn-primary w-full justify-center text-sm py-3.5 shadow-lg shadow-brand-500/30 font-semibold mb-3 hover:scale-[1.02] active:scale-[0.98]"
        >
          Register Now
          <ExternalLink size={16} />
        </a>

        <p className="text-center text-gray-400 text-xs">
          Opens <span className="text-brand-300 font-medium">qrfy.io</span> in a new tab • Instant mobile camera scan
        </p>
      </div>
    </div>
  );
}
