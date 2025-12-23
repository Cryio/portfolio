import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { CrossyRoadGame } from '@/components/crossy-road/CrossyRoadGame';
import { resetGame } from '@/components/crossy-road/stores/player';

const GamePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent scrolling while in game
    document.body.style.overflow = 'hidden';
    
    // Reset game state when mounting
    resetGame();
    
    return () => {
      document.body.style.overflow = 'auto';
      resetGame();
    };
  }, []);

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
      
      {/* Game title - Brutalist style */}
      <div className="absolute top-4 right-4 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="inline-flex items-center gap-2 border-4 border-foreground bg-accent text-accent-foreground px-6 py-2 shadow-sm"
        >
          <Gamepad2 className="w-5 h-5" />
          <span className="text-xl font-display uppercase tracking-tight">Crossy Road</span>
        </motion.div>
      </div>
      
      {/* Game canvas */}
      <CrossyRoadGame onBack={() => navigate('/')} />
    </motion.div>
  );
};

export default GamePage;
