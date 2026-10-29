import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventCountdown() {
  // Target: November 10, 2026, 09:00:00 IST
  const targetDate = new Date('2026-11-10T09:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className="flex items-center justify-center gap-2 mb-3 text-xs uppercase tracking-widest text-cyan-300 font-bold">
        <Clock size={13} className="text-cyan-400" />
        <span>Grand Finale Countdown</span>
      </div>
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="glass-card p-3 sm:p-4 border-cyan-400/25 bg-gradient-to-b from-white/[0.08] via-midnight-850/60 to-midnight-950/80 shadow-lg shadow-cyan-950/50 relative overflow-hidden group hover:border-cyan-300/40"
          >
            <div className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-indigo-200 drop-shadow-[0_2px_10px_rgba(34,211,238,0.3)]">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-cyan-300/80 mt-1 tracking-widest uppercase">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
