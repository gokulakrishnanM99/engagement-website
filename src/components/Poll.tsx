import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWeddingImages } from '../hooks/useWeddingImages';
import { db, handleFirestoreError, OperationType, ensureAuth } from '../firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';

export function Poll() {
  const [brideVotes, setBrideVotes] = useState(0);
  const [groomVotes, setGroomVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteSide, setVoteSide] = useState<'bride' | 'groom' | null>(null);
  const [showPlusOne, setShowPlusOne] = useState<'bride' | 'groom' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { images } = useWeddingImages();

  const brideImg = images.brideUrl;
  const groomImg = images.groomUrl;

  useEffect(() => {
    const pollDocRef = doc(db, 'polls', 'engagement');
    
    // Check if user has already voted in this browser
    const localVoted = localStorage.getItem('hasVoted_engagement');
    if (localVoted === 'true') {
      setHasVoted(true);
      setVoteSide(localStorage.getItem('voteSide_engagement') as any);
    }

    // Real-time listener for global votes
    const unsubscribe = onSnapshot(pollDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setBrideVotes(data.brideVotes || 0);
        setGroomVotes(data.groomVotes || 0);
      } else {
        // Initialize document if it doesn't exist
        // Note: This might fail if rules are strict, but we handle it
        console.log("Initializing poll document...");
      }
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'polls/engagement');
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (side: 'bride' | 'groom') => {
    if (hasVoted) return;
    
    try {
      const pollDocRef = doc(db, 'polls', 'engagement');
      
      // Check if doc exists first, if not create it (first vote ever)
      const snap = await getDoc(pollDocRef);
      if (!snap.exists()) {
        await setDoc(pollDocRef, {
          brideVotes: side === 'bride' ? 1 : 0,
          groomVotes: side === 'groom' ? 1 : 0
        });
      } else {
        await updateDoc(pollDocRef, {
          [side === 'bride' ? 'brideVotes' : 'groomVotes']: increment(1)
        });
      }

      setHasVoted(true);
      setVoteSide(side);
      setShowPlusOne(side);
      
      setTimeout(() => {
        setShowPlusOne(null);
      }, 1500);
      
      localStorage.setItem('hasVoted_engagement', 'true');
      localStorage.setItem('voteSide_engagement', side);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'polls/engagement');
    }
  };

  const total = brideVotes + groomVotes;
  const bridePercent = total === 0 ? 50 : Math.round((brideVotes / total) * 100);
  const groomPercent = 100 - bridePercent;

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto h-64 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#E5C07B] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1A060D]/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-[#E5C07B]/20 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
      
      <div className="text-center mb-12 relative z-10">
        <h3 className="font-sans font-black italic text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] via-[#FDF5E6] to-[#00A3FF] uppercase tracking-widest">
          Choose Your Side
        </h3>
      </div>
      
      <div className="flex flex-row justify-between items-center gap-2 md:gap-8 mb-12 relative z-10">
        {/* Bride Side */}
        <div className="flex flex-col items-center gap-3 md:gap-6 w-1/3">
          <button 
            onClick={() => handleVote('bride')}
            disabled={hasVoted}
            className={`relative group transition-all duration-300 ${hasVoted && voteSide !== 'bride' ? 'opacity-40 grayscale scale-90' : 'hover:scale-110'}`}
          >
            <motion.div 
              className={`w-16 h-16 md:w-32 md:h-32 rounded-xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-[#FF0055]/40 to-[#2D0B16] flex items-center justify-center border-2 md:border-4 ${voteSide === 'bride' ? 'border-[#FF0055] shadow-[0_0_20px_rgba(255,0,85,0.6)]' : 'border-[#FF0055]/40 group-hover:border-[#FF0055] group-hover:shadow-[0_0_20px_rgba(255,0,85,0.3)]'} transition-all duration-300 transform rotate-3 group-hover:rotate-0`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={brideImg} alt="Bride" className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" referrerPolicy="no-referrer" />
            </motion.div>
            <AnimatePresence>
              {showPlusOne === 'bride' && (
                <motion.div 
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -40, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#FF0055] font-black italic text-xl md:text-3xl whitespace-nowrap"
                >
                  +1
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <div className="text-center">
            <p className="font-sans font-black italic text-[10px] md:text-2xl text-[#FF0055] uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,0,85,0.4)]">Team Pooja</p>
            <p className="font-mono text-[10px] md:text-xl text-[#FDF5E6] mt-1 font-bold drop-shadow-sm">{brideVotes.toLocaleString()} PTS</p>
          </div>
        </div>

        {/* VS Badge */}
        <div className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-[#1A060D] border-2 md:border-4 border-[#E5C07B] flex items-center justify-center shadow-[0_0_15px_rgba(229,192,123,0.4)] z-20 shrink-0">
          <span className="font-sans font-black italic text-sm md:text-3xl text-[#E5C07B]">VS</span>
        </div>

        {/* Groom Side */}
        <div className="flex flex-col items-center gap-3 md:gap-6 w-1/3">
          <button 
            onClick={() => handleVote('groom')}
            disabled={hasVoted}
            className={`relative group transition-all duration-300 ${hasVoted && voteSide !== 'groom' ? 'opacity-40 grayscale scale-90' : 'hover:scale-110'}`}
          >
            <motion.div 
              className={`w-16 h-16 md:w-32 md:h-32 rounded-xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-[#00A3FF]/40 to-[#2D0B16] flex items-center justify-center border-2 md:border-4 ${voteSide === 'groom' ? 'border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.6)]' : 'border-[#00A3FF]/40 group-hover:border-[#00A3FF] group-hover:shadow-[0_0_20px_rgba(0,163,255,0.3)]'} transition-all duration-300 transform -rotate-3 group-hover:rotate-0`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={groomImg} alt="Groom" className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" referrerPolicy="no-referrer" />
            </motion.div>
            <AnimatePresence>
              {showPlusOne === 'groom' && (
                <motion.div 
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -40, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#00A3FF] font-black italic text-xl md:text-3xl whitespace-nowrap"
                >
                  +1
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <div className="text-center">
            <p className="font-sans font-black italic text-[10px] md:text-2xl text-[#00A3FF] uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,163,255,0.4)]">Team Thiru</p>
            <p className="font-mono text-[10px] md:text-xl text-[#FDF5E6] mt-1 font-bold drop-shadow-sm">{groomVotes.toLocaleString()} PTS</p>
          </div>
        </div>
      </div>

      {/* Health Bar Style Progress */}
      <div className="w-full h-8 bg-[#2D0B16]/80 rounded-full p-1 border border-[#FDF5E6]/10 relative z-10 shadow-inner overflow-hidden flex transform skew-x-[-15deg]">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#C90044] to-[#FF0055] relative"
          initial={{ width: '50%' }}
          animate={{ width: `${bridePercent}%` }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
        </motion.div>
        <motion.div 
          className="h-full bg-gradient-to-l from-[#0077B3] to-[#00A3FF] relative"
          initial={{ width: '50%' }}
          animate={{ width: `${groomPercent}%` }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
        </motion.div>
      </div>
      
      {hasVoted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="text-center mt-8"
        >
          <p className="font-sans font-bold text-[#E5C07B] uppercase tracking-widest text-lg">
            Response Locked In!
          </p>
          <p className="text-[#FDF5E6]/60 mt-2 font-mono text-sm">See you at the engagement.</p>
        </motion.div>
      )}
    </div>
  );
}
