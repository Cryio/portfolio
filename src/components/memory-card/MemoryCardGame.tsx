import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Card {
  id: number;
  image: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCardGame: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [flips, setFlips] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = useCallback(() => {
    const cardImages = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    const shuffled = cardImages.sort(() => Math.random() > 0.5 ? 1 : -1);
    
    const newCards = shuffled.map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(newCards);
    setSelectedCards([]);
    setFlips(0);
    setTimeLeft(120);
    setIsPlaying(false);
    setMatchedPairs(0);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (matchedPairs === 6 && timeLeft > 0) {
      setIsPlaying(false);
    }
  }, [matchedPairs, timeLeft]);

  const handleCardClick = (cardId: number) => {
    if (!isPlaying) {
      setIsPlaying(true);
    }

    const card = cards[cardId];
    if (card.isFlipped || card.isMatched || isChecking || selectedCards.length === 2) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);
    
    const newSelectedCards = [...selectedCards, cardId];
    setSelectedCards(newSelectedCards);
    setFlips(flips + 1);

    if (newSelectedCards.length === 2) {
      setIsChecking(true);
      checkForMatch(newSelectedCards[0], newSelectedCards[1]);
    }
  };

  const checkForMatch = (firstId: number, secondId: number) => {
    setTimeout(() => {
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.image === secondCard.image) {
        const newCards = [...cards];
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
      } else {
        const newCards = [...cards];
        newCards[firstId].isFlipped = false;
        newCards[secondId].isFlipped = false;
        setCards(newCards);
      }

      setSelectedCards([]);
      setIsChecking(false);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background p-4 font-sans"
    >
      <div className="bg-card border-4 border-foreground shadow-lg p-8 max-w-2xl w-full">
        {/* Game Title */}
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-black font-display text-center mb-8 text-foreground"
        >
          MEMORY CARDS
        </motion.h1>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 mb-8 h-[400px] w-[400px] mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => handleCardClick(card.id)}
              className={`card-container relative cursor-pointer h-full w-full transition-all duration-300 ${
                !card.isFlipped && !card.isMatched && isChecking && selectedCards.includes(card.id) 
                  ? 'animate-pulse border-4 border-accent' 
                  : 'border-4 border-foreground hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5'
              } bg-card`}
            >
              <div className={`card-inner ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}>
                {/* Card Front */}
                <div className="card-face card-front bg-card">
                  <div className="text-2xl font-bold text-muted-foreground">?</div>
                </div>
                
                {/* Card Back */}
                <div className={`card-face card-back bg-card ${
                  card.isMatched ? 'bg-accent/20 border-accent' : ''
                }`}>
                  <img 
                    src={`/src/assets/games/memory-cards/img-${card.image}.png`} 
                    alt={`Card ${card.image}`} 
                    className="w-12 h-12 object-contain" 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Game Stats */}
        <div className="flex items-center justify-between bg-secondary border-4 border-foreground p-4 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Time</span>
              <span className="text-xl font-black font-display text-foreground">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Flips</span>
              <span className="text-xl font-black font-display text-foreground">{flips}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pairs</span>
              <span className="text-xl font-black font-display text-foreground">{matchedPairs}/6</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider bg-accent text-accent-foreground border-4 border-foreground shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            Reset Game
          </motion.button>
        </div>
        
        {/* Game Over Messages */}
        {matchedPairs === 6 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center p-6 bg-accent/20 border-4 border-accent"
          >
            <h3 className="text-2xl font-black font-display text-accent-foreground mb-2">YOU WIN!</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Time: {formatTime(120 - timeLeft)} | Flips: {flips}
            </p>
          </motion.div>
        )}
        
        {timeLeft === 0 && matchedPairs < 6 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center p-6 bg-destructive/20 border-4 border-destructive"
          >
            <h3 className="text-2xl font-black font-display text-destructive-foreground mb-2">TIME'S UP!</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Pairs matched: {matchedPairs}/6
            </p>
          </motion.div>
        )}
      </div>
      
      <style>{`
        .card-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.5s;
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: inherit;
        }
        .card-front {
          transform: rotateY(0deg);
        }
        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  );
};

export default MemoryCardGame;