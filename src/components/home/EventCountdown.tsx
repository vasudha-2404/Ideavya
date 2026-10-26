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
      <div className="flex items-center justify-center gap-2 mb-3 text-xs uppercase tracking-widest text-cyan-400 font-bold">
        <Clock size={14} className="animate-spin-slow" />
        Countdown to Innovation Marathon
      </div>
      <div className="grid grid-cols-4 gap-3 md:gap-4 text-center">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="glass-card p-3 md:p-4 border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
          >
            <div className="font-display text-2xl md:text-4xl font-black text-white font-mono tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs font-semibold text-gray-400 mt-1 tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
