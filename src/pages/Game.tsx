import { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bird, Gamepad2, Sparkles, Brain, Grid3X3, Loader2 } from 'lucide-react';
import { resetGame } from '@/components/crossy-road/stores/player';

// Lazy load games for better performance
const CrossyRoadGame = lazy(() => import('@/components/crossy-road/CrossyRoadGame').then(module => ({ default: module.CrossyRoadGame })));
const FlappyBirdGame = lazy(() => import('@/components/flappy-bird/FlappyBirdGame').then(module => ({ default: module.FlappyBirdGame })));
const ChessGame = lazy(() => import('@/components/chess/ChessGame').then(module => ({ default: module.ChessGame })));
const MemoryCardGame = lazy(() => import('@/components/memory-card/MemoryCardGame'));
const TicTacToeGame = lazy(() => import('@/components/tictactoe/TicTacToeGame'));

const GamePage = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<'crossy' | 'flappy' | 'chess' | 'memory' | 'tictactoe'>('crossy');

  useEffect(() => {
    // Prevent scrolling while in game
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
      resetGame();
    };
  }, []);

  useEffect(() => {
    if (activeGame === 'crossy') {
      resetGame();
    }
  }, [activeGame]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 w-screen h-screen bg-background overflow-hidden"
    >
      {/* Back button - Brutalist style */}
      <div className="absolute top-4 left-4 z-50">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 border-4 border-foreground bg-background px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>
      
      {/* Game selector */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <motion.button
          type="button"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          onClick={() => setActiveGame('crossy')}
          className={`inline-flex items-center gap-2 border-4 px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform ${
            activeGame === 'crossy'
              ? 'border-foreground bg-accent text-accent-foreground'
              : 'border-foreground bg-background text-foreground'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          Crossy Road
        </motion.button>
        <motion.button
          type="button"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          onClick={() => setActiveGame('flappy')}
          className={`inline-flex items-center gap-2 border-4 px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform ${
            activeGame === 'flappy'
              ? 'border-foreground bg-accent text-accent-foreground'
              : 'border-foreground bg-background text-foreground'
          }`}
        >
          <Bird className="w-4 h-4" />
          Flappy Bird
        </motion.button>
        <motion.button
          type="button"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.25 }}
          onClick={() => setActiveGame('chess')}
          className={`inline-flex items-center gap-2 border-4 px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform ${
            activeGame === 'chess'
              ? 'border-foreground bg-accent text-accent-foreground'
              : 'border-foreground bg-background text-foreground'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Chess
        </motion.button>
        <motion.button
          type="button"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.25 }}
          onClick={() => setActiveGame('memory')}
          className={`inline-flex items-center gap-2 border-4 px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform ${
            activeGame === 'memory'
              ? 'border-foreground bg-accent text-accent-foreground'
              : 'border-foreground bg-background text-foreground'
          }`}
        >
          <Brain className="w-4 h-4" />
          Memory Cards
        </motion.button>
        <motion.button
          type="button"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.25 }}
          onClick={() => setActiveGame('tictactoe')}
          className={`inline-flex items-center gap-2 border-4 px-4 py-2 font-bold uppercase text-sm tracking-wide shadow-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform ${
            activeGame === 'tictactoe'
              ? 'border-foreground bg-accent text-accent-foreground'
              : 'border-foreground bg-background text-foreground'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          Tic Tac Toe
        </motion.button>
      </div>
      
      <div className="absolute inset-0 pt-16 pb-6 px-3 sm:px-4 overflow-hidden flex items-center justify-center">
        <div className="relative w-full max-w-6xl min-h-[70vh] flex items-center justify-center">
          {activeGame === 'crossy' ? (
            <div
              className="w-full"
              style={{ width: 'min(96vw, 1180px)', height: 'min(82vh, 880px)' }}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              }>
                <CrossyRoadGame onBack={() => navigate('/')} />
              </Suspense>
            </div>
          ) : activeGame === 'flappy' ? (
            <div className="w-full flex items-center justify-center">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              }>
                <FlappyBirdGame onBack={() => navigate('/')} />
              </Suspense>
            </div>
          ) : activeGame === 'chess' ? (
            <div className="w-full flex items-center justify-center">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              }>
                <ChessGame onBack={() => navigate('/')} />
              </Suspense>
            </div>
          ) : activeGame === 'memory' ? (
            <div className="w-full flex items-center justify-center">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              }>
                <MemoryCardGame onBack={() => navigate('/')} />
              </Suspense>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              }>
                <TicTacToeGame onBack={() => navigate('/')} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GamePage;
