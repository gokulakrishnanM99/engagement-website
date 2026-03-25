import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { Background } from './components/Background';
import { Countdown } from './components/Countdown';
import { Poll } from './components/Poll';
import { MapPin, Calendar, Clock, Heart, Atom } from 'lucide-react';
import { useWeddingImages } from './hooks/useWeddingImages';

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { images } = useWeddingImages();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const brideImg = images.brideUrl;
  const groomImg = images.groomUrl;

  return (
    <div ref={containerRef} className="relative min-h-screen w-full selection:bg-[#E5C07B] selection:text-[#2D0B16]">
      <Background />

      <main className="relative z-10 flex flex-col items-center w-full">

        {/* Hero Section */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center">
            <FadeIn delay={0.1}>
              <div className="w-16 h-16 mb-8 mx-auto flex items-center justify-center">
                <Heart className="w-full h-full text-[#E5C07B] fill-[#E5C07B]/20 drop-shadow-[0_0_15px_rgba(229,192,123,0.5)]" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-tamil text-[#E5C07B] text-sm md:text-base tracking-widest mb-4 uppercase drop-shadow-[0_0_10px_rgba(229,192,123,0.3)]">
                நிச்சயதார்த்த அழைப்பிதழ்
              </p>
              <p className="font-serif text-[#FDF5E6] text-xl md:text-2xl mb-8 italic drop-shadow-md">
                Together with their families
              </p>
            </FadeIn>

            <FadeIn delay={0.5} className="flex flex-col items-center">
              <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl text-[#FDF5E6] leading-none mb-4 drop-shadow-lg uppercase tracking-widest">
                DR. POOJA PRASAD
              </h1>
              <span className="font-serif font-bold text-4xl md:text-6xl text-[#E5C07B] italic my-2 drop-shadow-md">
                &
              </span>
              <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl text-[#FDF5E6] leading-none mt-4 drop-shadow-lg uppercase tracking-widest">
                THIRUMALAI
              </h1>

              <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-[#E5C07B] uppercase mt-4 mb-2">
                Are getting engaged
              </p>

              <p className="font-serif text-[#FDF5E6] text-lg md:text-3xl mt-8 italic max-w-5xl mx-auto drop-shadow-md leading-relaxed px-6">
                "From Quantum States to Heartbeats — a perfect entanglement begins, join us as we celebrate our engagement"
              </p>
            </FadeIn>

            <FadeIn delay={1} className="mt-12">
              <motion.div
                className="w-px h-24 bg-gradient-to-b from-[#E5C07B] to-transparent mx-auto mt-8 opacity-50"
                animate={{ height: ["0px", "96px"] }}
                transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
              />
            </FadeIn>
          </motion.div>
        </section>

        {/* Event Details & Countdown Section */}
        <section className="w-full py-32 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <FadeIn>
              <div className="bg-[#1A060D]/80 backdrop-blur-2xl border border-[#E5C07B]/20 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0055] via-[#E5C07B] to-[#00A3FF]" />

                <h2 className="font-serif text-4xl md:text-6xl mb-16 text-center text-[#FDF5E6] drop-shadow-md">The Engagement</h2>

                <div className="grid grid-cols-3 gap-2 md:gap-8 mb-12 md:mb-20">
                  <div className="flex flex-col items-center group">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#E5C07B]/30 to-transparent border border-[#E5C07B]/50 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(229,192,123,0.2)]">
                      <Calendar className="w-5 h-5 md:w-8 md:h-8 text-[#E5C07B]" />
                    </div>
                    <h3 className="font-serif text-sm md:text-2xl mb-1 text-[#FDF5E6]">Date</h3>
                    <p className="font-sans text-[10px] md:text-lg text-[#FDF5E6]/90">06 April 2026</p>
                  </div>

                  <div className="flex flex-col items-center group">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FF0055]/30 to-transparent border border-[#FF0055]/50 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,0,85,0.2)]">
                      <Clock className="w-5 h-5 md:w-8 md:h-8 text-[#FF0055]" />
                    </div>
                    <h3 className="font-serif text-sm md:text-2xl mb-1 text-[#FDF5E6]">Time</h3>
                    <p className="font-sans text-[10px] md:text-lg text-[#FDF5E6]/90 text-center">4.00 PM - 6.00 PM</p>
                  </div>

                  <div className="flex flex-col items-center group">
                    <a
                      href="https://maps.app.goo.gl/BAytEsapDcsy2g7K8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#00A3FF]/30 to-transparent border border-[#00A3FF]/50 flex items-center justify-center mb-3 md:mb-6 hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,163,255,0.2)] cursor-pointer"
                    >
                      <MapPin className="w-5 h-5 md:w-8 md:h-8 text-[#00A3FF]" />
                    </a>
                    <h3 className="font-serif text-sm md:text-2xl mb-1 text-[#FDF5E6]">Location</h3>
                    <p className="font-sans text-[10px] md:text-lg text-[#FDF5E6]/90">JD Mahal</p>
                    <p className="font-sans text-[7px] md:text-sm text-[#FDF5E6]/60 text-center">Kovilambakkam, Chennai</p>
                    <a
                      href="https://maps.app.goo.gl/BAytEsapDcsy2g7K8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 md:mt-6 inline-flex items-center gap-1 px-3 py-1 md:px-6 md:py-2 bg-[#FDF5E6]/10 border border-[#00A3FF]/50 text-[#00A3FF] hover:bg-[#00A3FF] hover:text-[#2D0B16] transition-all duration-300 rounded-full font-sans text-[8px] md:text-xs tracking-widest uppercase shadow-[0_0_10px_rgba(0,163,255,0.2)]"
                    >
                      Map
                    </a>
                  </div>
                </div>

                <Countdown />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* The Couple Section */}
        <section className="w-full max-w-6xl mx-auto px-6 py-16 md:py-32 flex flex-col gap-16 md:gap-32">
          {/* Bride */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            <FadeIn className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 bg-[#FF0055]/20 rounded-full filter blur-xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="w-32 h-32 md:w-60 md:h-60 rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-[#FF0055]/40 shadow-[0_0_20px_rgba(255,0,85,0.2)] relative z-10"
                  animate={{ y: [0, -10, 0], rotate: [3, 5, 3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={brideImg} alt="Pooja" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
                <motion.div
                  className="absolute top-4 right-4 md:top-10 md:right-10 text-[#FF0055] z-20 drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 md:w-8 md:h-8 fill-current" />
                </motion.div>
              </div>
            </FadeIn>
            <FadeIn className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="font-serif text-2xl md:text-5xl mb-2 md:mb-4 text-[#FDF5E6] drop-shadow-md">Pooja Prasad M</h2>
              <p className="font-sans text-sm md:text-lg text-[#FF0055] mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(255,0,85,0.4)]">MD (Anaesthesia) at AIIMS</p>
              <p className="font-sans text-[10px] md:text-sm text-[#FDF5E6]/70 uppercase tracking-wider">MBBS</p>
              <p className="mt-4 md:mt-6 font-serif text-sm md:text-lg text-[#FDF5E6]/90 leading-relaxed max-w-md mx-auto md:mx-0">
                Among countless heartbeats, she found the one worth caring for—forever.
              </p>
            </FadeIn>
          </div>

          {/* Groom */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-24">
            <FadeIn className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 bg-[#00A3FF]/20 rounded-full filter blur-xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="w-32 h-32 md:w-60 md:h-60 rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-[#00A3FF]/40 shadow-[0_0_20px_rgba(0,163,255,0.2)] relative z-10"
                  animate={{ y: [0, -10, 0], rotate: [-3, -5, -3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={groomImg} alt="Thirumalai" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
                <motion.div
                  className="absolute top-4 left-4 md:top-10 md:left-10 text-[#00A3FF] z-20 drop-shadow-[0_0_10px_rgba(0,163,255,0.8)]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Atom className="w-5 h-5 md:w-8 md:h-8" />
                </motion.div>
              </div>
            </FadeIn>
            <FadeIn className="w-full md:w-1/2 text-center md:text-right">
              <h2 className="font-serif text-2xl md:text-5xl mb-2 md:mb-4 text-[#FDF5E6] drop-shadow-md">Thirumalai M</h2>
              <p className="font-sans text-sm md:text-lg text-[#00A3FF] mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(0,163,255,0.4)]">Quantum Engineer at QpiAI</p>
              <p className="font-sans text-[10px] md:text-sm text-[#FDF5E6]/70 uppercase tracking-wider">MTech at IIT Jodhpur</p>
              <p className="mt-4 md:mt-6 font-serif text-sm md:text-lg text-[#FDF5E6]/90 leading-relaxed max-w-md mx-auto md:mx-0 md:ml-auto">
                One highly unstable qubit found its perfectly entangled pair, collapsing into certainty
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Poll Section */}
        <section className="w-full py-24 px-6 relative z-20">
          <FadeIn>
            <Poll />
          </FadeIn>
        </section>

        {/* Footer */}
        <section className="w-full py-24 text-center px-6 relative overflow-hidden">
          <FadeIn>
            <p className="font-tamil text-[#E5C07B] text-lg md:text-xl mb-6 drop-shadow-[0_0_10px_rgba(229,192,123,0.3)]">
              தங்கள் நல்வரவை விரும்பும்
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#FDF5E6] italic drop-shadow-md">
              Family & Friends
            </p>
            <div className="mt-12 w-12 h-12 mx-auto">
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E5C07B"
                strokeWidth="1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="drop-shadow-[0_0_10px_rgba(229,192,123,0.5)]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E5C07B" fillOpacity="0.2" />
              </motion.svg>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
