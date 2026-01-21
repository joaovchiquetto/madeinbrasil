
import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimerBox = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className={`flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 rounded-2xl bg-white shadow-2xl border-b-[6px] ${color} transition-all hover:-translate-y-1`}>
      <span className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-800 leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] sm:text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
      <TimerBox value={timeLeft.days} label="Dias" color="border-green-500" />
      <TimerBox value={timeLeft.hours} label="Horas" color="border-yellow-400" />
      <TimerBox value={timeLeft.minutes} label="Minutos" color="border-blue-600" />
      <TimerBox value={timeLeft.seconds} label="Segundos" color="border-green-300" />
    </div>
  );
};
