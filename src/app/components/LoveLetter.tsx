import { useState, useRef, useCallback, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface PageProps {
  children: React.ReactNode;
  number?: number;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ children }, ref) => {
  return (
    <div ref={ref} className="page bg-gradient-to-br from-[#faf8f3] to-[#f5f1e8] shadow-2xl relative overflow-hidden border-r-2 border-amber-200/30">
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1711107759674-9161698e570d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMHBhcGVyJTIwdGV4dHVyZSUyMHZpbnRhZ2V8ZW58MXx8fHwxNzcxMDYwNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Decorative corner flourishes */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 w-10 h-10 md:w-16 md:h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="text-rose-800">
          <path d="M0,0 Q25,25 0,50 Q25,25 50,0" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-10 h-10 md:w-16 md:h-16 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="text-rose-800">
          <path d="M0,0 Q25,25 0,50 Q25,25 50,0" fill="currentColor" />
        </svg>
      </div>
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-rose-900/5" />
      
      <div className="relative z-10 h-full p-4 sm:p-6 md:p-12 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
});

Page.displayName = 'Page';

// Floating hearts background component
const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 });
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-300/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <Heart className="w-4 h-4 fill-current" />
        </motion.div>
      ))}
    </div>
  );
};

export default function LoveLetter() {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<any>(null);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      try {
        if (bookRef.current && bookRef.current.pageFlip) {
          bookRef.current.pageFlip().flipNext();
        }
      } catch (error) {
        console.log('Auto-flip not available yet');
      }
    }, 800);
  };

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-4 overflow-hidden"
      >
        {/* Ambient floating sparkles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute hidden sm:block"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-rose-300" />
          </motion.div>
        ))}
        
        <div className="text-center max-w-2xl relative z-10 px-4">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Decorative top border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6 sm:mb-8"
            />
            
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgba(225, 29, 72, 0.3)",
                  "0 0 30px rgba(225, 29, 72, 0.5)",
                  "0 0 20px rgba(225, 29, 72, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h1 
                className="text-5xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                To Us
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-1 sm:space-y-2 mb-6 sm:mb-8"
            >
              <p className="text-xl sm:text-2xl text-rose-600 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                For Camillah
              </p>
              <p className="text-base sm:text-lg text-rose-700 mb-1 sm:mb-2">Valentine's Day 2026</p>
              <p className="text-sm sm:text-base text-rose-600 italic">A love letter from Bola</p>
            </motion.div>
            
            {/* Decorative bottom border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6 sm:mb-8"
            />
          </motion.div>
          
          <motion.button
            onClick={handleStart}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(225, 29, 72, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white rounded-full text-lg sm:text-xl shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 overflow-hidden"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-2 justify-center">
              Open Your Letter
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-4 overflow-hidden">
      <FloatingHearts />
      <div className="book-container cursor-pointer">
        <style>{`
          .page {
            background-color: #f5f1e8;
          }
          .stf__parent {
            perspective: 2000px;
          }
          .stf__wrapper {
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.15);
          }
          .stf__item {
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
          }
        `}</style>
        
        <HTMLFlipBook
          width={350}
          height={500}
          size="stretch"
          minWidth={300}
          maxWidth={400}
          minHeight={450}
          maxHeight={600}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="demo-book"
          ref={bookRef}
          useMouseEvents={true}
        >
          {/* Cover */}
          <Page number={0}>
            <div className="flex flex-col items-center justify-center h-full text-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1, type: "spring" }}
                className="relative"
              >
                {/* Decorative circle background */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-rose-200/30 to-pink-200/30 blur-3xl" />
                </motion.div>
                
                <h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-rose-800 via-rose-600 to-pink-600 mb-3 sm:mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                >
                  To Us
                </h1>
                
                <div className="flex items-center gap-2 justify-center mb-4 sm:mb-6">
                  <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-rose-400" />
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500" />
                  <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-rose-400" />
                </div>
                
                <p 
                  className="text-lg sm:text-xl text-rose-700 mb-1 sm:mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Camillah & Bola
                </p>
                <p className="text-rose-600 italic text-xs sm:text-sm mb-6 sm:mb-8">Click to turn the page →</p>
              </motion.div>
            </div>
          </Page>

          {/* Page 1 - The Beginning */}
          <Page number={1}>
            {currentPage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full flex flex-col justify-center"
              >
                {/* Decorative header */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-rose-400 to-transparent mb-6 sm:mb-8"
                />
                
                <div className="space-y-4 sm:space-y-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    I didn't expect something new to feel this comfortable.
                  </motion.p>
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    But somehow…<br />
                    <span className="italic text-rose-700">here we are.</span>
                  </motion.p>
                </div>
                
                {/* Decorative footer */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-l from-rose-400 to-transparent mt-6 sm:mt-8 ml-auto"
                />
              </motion.div>
            )}
          </Page>

          {/* Page 2 - The Spark */}
          <Page number={2}>
            {currentPage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full flex flex-col justify-center"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-rose-400 to-transparent mb-6 sm:mb-8"
                />
                
                <div className="space-y-4 sm:space-y-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    I like how <span className="font-italic text-rose-700">easy</span> this feels.
                  </motion.p>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    I like how I look forward to your messages.
                  </motion.p>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    I like how being around you feels <span className="italic text-rose-700">natural</span>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="text-base sm:text-lg md:text-xl italic mt-6 sm:mt-8 text-rose-700 text-center pt-3 sm:pt-4 border-t border-rose-200/50"
                  >
                    Not forced. Not rushed. Just… right.
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-l from-rose-400 to-transparent mt-6 sm:mt-8 ml-auto"
                />
              </motion.div>
            )}
          </Page>

          {/* Page 3 - The Truth */}
          <Page number={3}>
            {currentPage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full flex flex-col justify-center"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-rose-400 to-transparent mb-6 sm:mb-8"
                />
                
                <div className="space-y-4 sm:space-y-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    We're still at the <span className="italic text-rose-700">beginning</span>.
                  </motion.p>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    And that's my favorite part.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="text-base sm:text-lg md:text-xl leading-relaxed mt-6 sm:mt-8 text-rose-800 pt-3 sm:pt-4 border-t border-rose-200/50"
                  >
                    <p>Because it means there's so much more to discover.</p>
                    <p className="italic mt-3 sm:mt-4 text-rose-700">More laughs.</p>
                    <p className="italic text-rose-700">More memories.</p>
                    <p className="italic text-rose-700">More us.</p>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-l from-rose-400 to-transparent mt-6 sm:mt-8 ml-auto"
                />
              </motion.div>
            )}
          </Page>

          {/* Page 4 - Today */}
          <Page number={4}>
            {currentPage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full flex flex-col justify-center"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-rose-400 to-transparent mb-6 sm:mb-8"
                />
                
                <div className="space-y-4 sm:space-y-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    Today isn't about big promises.
                  </motion.p>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    It's about <span className="italic text-rose-700">intention</span>.
                  </motion.p>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900"
                  >
                    It's about choosing to see where this can go.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="text-base sm:text-lg md:text-xl leading-relaxed mt-6 sm:mt-8 italic text-rose-700 text-center pt-3 sm:pt-4 border-t border-rose-200/50"
                  >
                    And being honest enough to say…<br />
                    <span className="text-lg sm:text-xl md:text-2xl not-italic text-rose-900 mt-2 block">I'm really glad it's you.</span>
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-l from-rose-400 to-transparent mt-6 sm:mt-8 ml-auto"
                />
              </motion.div>
            )}
          </Page>

          {/* Final Page - Soft Close */}
          <Page number={5}>
            {currentPage >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-4 sm:space-y-6 relative"
              >
                {/* Decorative glow background */}
                <motion.div
                  className="absolute inset-0 -z-10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-rose-300/40 to-pink-300/40 blur-3xl" />
                </motion.div>
                
                <motion.p 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-2xl sm:text-3xl md:text-4xl text-rose-900 px-2"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Happy Valentine's Day ❤️
                </motion.p>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                />
                
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="text-2xl sm:text-3xl text-rose-800 italic px-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  This is just page one.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="mt-6 sm:mt-8"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <p className="text-base sm:text-lg text-rose-700 mb-3 sm:mb-4">— Yours always,</p>
                  <p 
                    className="text-3xl sm:text-4xl text-rose-900"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    Bola
                  </p>
                </motion.div>
                
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mt-4 sm:mt-6"
                >
                  <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-rose-500 fill-rose-500" />
                </motion.div>
              </motion.div>
            )}
          </Page>

          {/* Back Cover */}
          <Page number={6}>
            <div className="flex flex-col items-center justify-center h-full text-center relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-4 sm:space-y-6"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6 sm:mb-8"
                />
                
                <p
                  className="text-xl sm:text-2xl text-rose-700 italic px-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The end of this book,<br />
                  but just the beginning of us.
                </p>
                
                <div className="flex items-center gap-2 justify-center mt-6 sm:mt-8">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 fill-rose-500" />
                </div>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-6 sm:mt-8"
                />
              </motion.div>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>
    </div>
  );
}