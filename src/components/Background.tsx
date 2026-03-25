import { motion } from 'motion/react';

export function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep Burgundy Base */}
      <div className="absolute inset-0 bg-[#2D0B16]" />
      
      {/* Mandala Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z' fill='%23E5C07B'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }} />

      {/* Large Mandala Center (Subtle) */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] opacity-[0.015]"
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E5C07B]">
          <path d="M50 0 A50 50 0 0 1 100 50 A50 50 0 0 1 50 100 A50 50 0 0 1 0 50 A50 50 0 0 1 50 0 M50 10 A40 40 0 0 0 10 50 A40 40 0 0 0 50 90 A40 40 0 0 0 90 50 A40 40 0 0 0 50 10" />
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="49" y="0" width="2" height="100" transform={`rotate(${i * 15} 50 50)`} />
          ))}
        </svg>
      </motion.div>

      <FloatingShapes />
      
      <ZhaElement className="absolute top-[15%] md:top-[20%] right-[10%] md:right-[15%] text-[#E5C07B] opacity-30" delay={0} />
      <EcgHeartElement className="absolute bottom-[10%] md:bottom-[20%] left-[5%] md:left-[10%] w-32 h-32 md:w-48 md:h-48 text-[#FF0055] opacity-40" delay={5} />
      <QuantumElement className="absolute top-[75%] md:top-[60%] right-[5%] md:right-[20%] w-24 h-24 md:w-32 md:h-32 text-[#00A3FF] opacity-40" delay={2} />
    </div>
  );
}

function FloatingShapes() {
  const shapes = [
    { type: 'star', top: '10%', left: '15%', size: 16, delay: 0 },
    { type: 'heart', top: '25%', left: '80%', size: 20, delay: 2 },
    { type: 'star', top: '60%', left: '10%', size: 14, delay: 1 },
    { type: 'heart', top: '75%', left: '85%', size: 18, delay: 3 },
    { type: 'star', top: '40%', left: '50%', size: 12, delay: 4 },
    { type: 'heart', top: '85%', left: '40%', size: 24, delay: 2.5 },
    { type: 'star', top: '15%', left: '60%', size: 16, delay: 1.5 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {shapes.map((s, i) => (
        <motion.div key={i} className="absolute text-[#E5C07B]"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: s.delay }}
        >
          {s.type === 'star' ? (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ZhaElement({ className, delay }: { className: string, delay: number }) {
  return (
    <motion.div className={className}
      animate={{ rotate: [0, 5, -5, 0], y: [0, -15, 15, 0] }}
      transition={{ rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }, y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay } }}
    >
      <span className="font-tamil text-8xl md:text-9xl font-bold drop-shadow-sm">ழ</span>
    </motion.div>
  );
}

function EcgHeartElement({ className, delay }: { className: string, delay: number }) {
  return (
    <motion.svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className={className}
      animate={{ scale: [1, 1.1, 1], y: [0, 15, -15, 0] }}
      transition={{ scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay } }}
    >
      <path d="M 50 35 C 50 35 40 15 25 25 C 10 35 25 65 50 85 C 75 65 90 35 75 25 C 60 15 50 35 50 35 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      <path d="M 10 55 L 30 55 L 40 25 L 50 85 L 60 55 L 90 55" strokeLinejoin="round" strokeLinecap="round" />
    </motion.svg>
  );
}

function QuantumElement({ className, delay }: { className: string, delay: number }) {
  return (
    <motion.svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}
      animate={{ rotate: [0, -360] }}
      transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
    >
      <g transform="translate(50,50) rotate(30)">
        <ellipse cx="0" cy="0" rx="40" ry="15" />
        <circle r="4" fill="currentColor">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 40 0 A 40 15 0 1 1 -40 0 A 40 15 0 1 1 40 0" />
        </circle>
      </g>
      <g transform="translate(50,50) rotate(90)">
        <ellipse cx="0" cy="0" rx="40" ry="15" />
        <circle r="4" fill="currentColor">
          <animateMotion dur="4s" repeatCount="indefinite" path="M 40 0 A 40 15 0 1 1 -40 0 A 40 15 0 1 1 40 0" />
        </circle>
      </g>
      <g transform="translate(50,50) rotate(150)">
        <ellipse cx="0" cy="0" rx="40" ry="15" />
        <circle r="4" fill="currentColor">
          <animateMotion dur="5s" repeatCount="indefinite" path="M 40 0 A 40 15 0 1 1 -40 0 A 40 15 0 1 1 40 0" />
        </circle>
      </g>
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </motion.svg>
  );
}
