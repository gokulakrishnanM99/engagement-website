import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function RollingDigit({ value }: { value: number }) {
  return (
    <div className="relative h-12 w-9 md:h-24 md:w-16 overflow-hidden bg-[#2D0B16]/80 backdrop-blur-md rounded-lg md:rounded-xl border border-[#FDF5E6]/10 flex items-center justify-center shadow-lg">
      {/* Glass glare */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#FDF5E6]/10 to-transparent z-10 pointer-events-none" />
      {/* Center line for dialer effect */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-[#FDF5E6]/10 z-10 shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
      
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -40, rotateX: -45, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: 40, rotateX: 45, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="absolute font-sans font-bold text-2xl md:text-6xl text-[#FDF5E6] drop-shadow-[0_0_10px_rgba(253,245,230,0.3)]"
          style={{ transformOrigin: "center center -20px" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function NumberDisplay({ value, label }: { value: number, label: string }) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      <div className="flex gap-0.5 md:gap-2">
        <RollingDigit value={tens} />
        <RollingDigit value={ones} />
      </div>
      <span className="font-sans text-[8px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#FDF5E6]/80 font-semibold drop-shadow-sm">{label}</span>
    </div>
  );
}

export function Countdown() {
  const targetDate = new Date('2026-04-06T16:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft <= 0) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-8"
      >
        <h3 className="font-sans font-black italic text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] to-[#E5C07B] mb-6 uppercase tracking-wider">It's Time!</h3>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative w-48 h-48 mx-auto"
        >
          {/* Animated interlocking rings */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.circle cx="40" cy="50" r="25" fill="none" stroke="#E5C07B" strokeWidth="4" animate={{ cx: [40, 45, 40] }} transition={{ repeat: Infinity, duration: 2 }} />
            <motion.circle cx="60" cy="50" r="25" fill="none" stroke="#E5C07B" strokeWidth="4" animate={{ cx: [60, 55, 60] }} transition={{ repeat: Infinity, duration: 2 }} />
          </svg>
        </motion.div>
      </motion.div>
    );
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-wrap gap-3 md:gap-10 justify-center mt-8 md:mt-12">
      <NumberDisplay value={days} label="Days" />
      <NumberDisplay value={hours} label="Hours" />
      <NumberDisplay value={minutes} label="Mins" />
      <NumberDisplay value={seconds} label="Secs" />
    </div>
  );
}
