import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bird, Gamepad2 } from 'lucide-react';
import { CrossyRoadGame } from '@/components/crossy-road/CrossyRoadGame';
import { FlappyBirdGame } from '@/components/flappy-bird/FlappyBirdGame';
import { resetGame } from '@/components/crossy-road/stores/player';

const GamePage = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<'crossy' | 'flappy'>('crossy');

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
    } else {
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
      </div>
      
      {/* Game canvas */}
      {activeGame === 'crossy' ? (
        <CrossyRoadGame onBack={() => navigate('/')} />
      ) : (
        <FlappyBirdGame onBack={() => navigate('/')} />
      )}
    </motion.div>
  );
};

export default GamePage;
