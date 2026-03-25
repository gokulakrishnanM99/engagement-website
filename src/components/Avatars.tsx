import { motion } from 'motion/react';

export function BrideAvatar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="35" r="16" />
      <path d="M 25 85 C 25 60 75 60 75 85" />
      <circle cx="50" cy="27" r="2" fill="currentColor" />
      <path d="M 40 85 C 40 70 60 70 60 85" strokeDasharray="2 4" />
      <path d="M 34 35 C 34 20 66 20 66 35" />
    </svg>
  );
}

export function GroomAvatar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="35" r="16" />
      <path d="M 25 85 C 25 60 75 60 75 85" />
      <path d="M 40 33 L 46 33 M 54 33 L 60 33" />
      <path d="M 50 63 L 42 85 L 58 85 Z" />
    </svg>
  );
}
