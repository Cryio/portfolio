import { useState, useCallback, useEffect, useRef } from 'react';
import { Scene } from './components/Scene';
import { PlayerWithSkin } from './components/PlayerWithSkin';
import { Map } from './components/Map';
import { StartScreen } from './components/StartScreen';
import { useEventListeners } from './hooks/useEventListeners';
import { state, resetGame, queueMove } from './stores/player';
import { resetCoins } from './stores/coins';
import { saveHighScore, getSelectedSkin, getTopScore } from './stores/skins';

interface CrossyRoadGameProps {
  onBack?: () => void;
}

export function CrossyRoadGame({ onBack }: CrossyRoadGameProps) {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [hasNewHighScore, setHasNewHighScore] = useState(false);
  const scoreSavedRef = useRef(false);
  
  useEventListeners();

  // Poll game state for updates
  useEffect(() => {
    if (!gameStarted) return;
    
    const interval = setInterval(() => {
      setScore(state.score);
      setCoins(state.coinsCollected);
      setGameOver(state.gameOver);
      setCurrentRow(state.currentRow);
    }, 50);
    
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Save high score when game ends
  useEffect(() => {
    if (gameOver && score > 0 && !scoreSavedRef.current) {
      scoreSavedRef.current = true;
      const previousTop = getTopScore();
      saveHighScore(score, getSelectedSkin().id);
      if (score > previousTop) {
        setHasNewHighScore(true);
      }
    }
  }, [gameOver, score]);

  const handleStart = useCallback(() => {
    resetGame();
    resetCoins();
    setScore(0);
    setCoins(0);
    setGameOver(false);
    setCurrentRow(0);
    setGameStarted(true);
    setHasNewHighScore(false);
    scoreSavedRef.current = false;
  }, []);

  const handleRestart = useCallback(() => {
    resetGame();
    resetCoins();
    setScore(0);
    setCoins(0);
    setGameOver(false);
    setCurrentRow(0);
    setHasNewHighScore(false);
    scoreSavedRef.current = false;
  }, []);

  const handleBackToMenu = useCallback(() => {
    setGameStarted(false);
    setGameOver(false);
    resetGame();
    resetCoins();
    setScore(0);
    setCoins(0);
    setCurrentRow(0);
    setHasNewHighScore(false);
    scoreSavedRef.current = false;
  }, []);

  const handleTouchMove = (direction: 'forward' | 'backward' | 'left' | 'right') => {
    queueMove(direction);
  };

  // Show start screen
  if (!gameStarted) {
    return (
      <div className="relative w-full h-full" style={{ background: 'linear-gradient(180deg, hsl(199 92% 72%) 0%, hsl(200 94% 86%) 50%, hsl(201 96% 94%) 100%)' }}>
        <StartScreen onStart={handleStart} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ background: 'linear-gradient(180deg, hsl(199 92% 72%) 0%, hsl(200 94% 86%) 50%, hsl(201 96% 94%) 100%)' }}>
      {/* Score display - Brutalist style - Responsive */}
      <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-10">
        <div className="border-4 border-foreground bg-background px-4 md:px-8 py-2 md:py-4 shadow-md">
          <div className="text-3xl md:text-5xl font-display text-foreground text-center">
            {score}
          </div>
          {coins > 0 && (
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-1 border-t-2 border-foreground/20 pt-1.5 md:pt-2">
              <span className="text-base md:text-xl">🪙</span>
              <span className="text-sm md:text-lg font-bold font-mono text-highlight-3">{coins}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hint text - Hidden on very small screens */}
      <div className="absolute top-28 md:top-36 left-1/2 -translate-x-1/2 z-10 mt-4 md:mt-6 hidden sm:block">
        <div className="text-foreground/60 text-xs md:text-sm font-mono uppercase tracking-wide">
          Collect coins for +5 points!
        </div>
      </div>

      {/* Controls help - Desktop - Brutalist style */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="border-4 border-foreground bg-background p-4 shadow-md">
          <div className="text-sm font-bold text-foreground mb-3 text-center uppercase tracking-wide">Controls</div>
          <div className="grid grid-cols-3 gap-1">
            <div></div>
            <div className="w-10 h-10 border-2 border-foreground bg-secondary flex items-center justify-center text-xl font-bold text-foreground">↑</div>
            <div></div>
            <div className="w-10 h-10 border-2 border-foreground bg-secondary flex items-center justify-center text-xl font-bold text-foreground">←</div>
            <div className="w-10 h-10 border-2 border-foreground bg-secondary flex items-center justify-center text-xl font-bold text-foreground">↓</div>
            <div className="w-10 h-10 border-2 border-foreground bg-secondary flex items-center justify-center text-xl font-bold text-foreground">→</div>
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center font-mono">or WASD</div>
        </div>
      </div>

      {/* Game Over overlay - Brutalist style - Responsive */}
      {gameOver && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-foreground/80 p-4">
          <div className="border-4 border-foreground bg-background p-6 md:p-10 shadow-xl text-center max-w-sm w-full mx-4">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">💀</div>
            <h2 className="text-2xl md:text-4xl font-display text-foreground mb-2 uppercase">Game Over!</h2>
            
            {hasNewHighScore && (
              <div className="border-4 border-highlight-3 bg-highlight-3/10 px-3 md:px-4 py-1.5 md:py-2 mb-3 md:mb-4">
                <span className="text-highlight-3 font-bold uppercase text-xs md:text-sm">🏆 New High Score!</span>
              </div>
            )}
            
            <p className="text-muted-foreground mb-1 md:mb-2 font-mono uppercase text-xs md:text-sm">Your Score</p>
            <p className="text-4xl md:text-6xl font-display text-highlight-3 mb-3 md:mb-4">{score}</p>
            {coins > 0 && (
              <p className="text-muted-foreground mb-4 md:mb-6 flex items-center justify-center gap-2">
                <span className="text-xl md:text-2xl">🪙</span>
                <span className="text-base md:text-xl font-bold font-mono">{coins} coins collected</span>
              </p>
            )}
            <div className="flex flex-col gap-2 md:gap-3">
              <button
                onClick={handleRestart}
                className="w-full border-4 border-foreground bg-highlight-2 text-foreground px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-xl uppercase tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
              >
                Play Again
              </button>
              <button
                onClick={handleBackToMenu}
                className="w-full border-4 border-foreground bg-secondary text-foreground px-6 md:px-8 py-2.5 md:py-3 font-bold text-sm md:text-base uppercase tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Touch controls for mobile - Larger and better positioned */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 md:hidden">
        <div className="grid grid-cols-3 gap-1.5">
          <div></div>
          <button
            onTouchStart={() => handleTouchMove('forward')}
            className="w-16 h-16 border-4 border-foreground bg-background/90 flex items-center justify-center text-3xl font-bold text-foreground shadow-md active:shadow-none active:translate-y-0.5 transition-all duration-100"
          >
            ↑
          </button>
          <div></div>
          <button
            onTouchStart={() => handleTouchMove('left')}
            className="w-16 h-16 border-4 border-foreground bg-background/90 flex items-center justify-center text-3xl font-bold text-foreground shadow-md active:shadow-none active:translate-x-0.5 transition-all duration-100"
          >
            ←
          </button>
          <button
            onTouchStart={() => handleTouchMove('backward')}
            className="w-16 h-16 border-4 border-foreground bg-background/90 flex items-center justify-center text-3xl font-bold text-foreground shadow-md active:shadow-none active:translate-y-0.5 transition-all duration-100"
          >
            ↓
          </button>
          <button
            onTouchStart={() => handleTouchMove('right')}
            className="w-16 h-16 border-4 border-foreground bg-background/90 flex items-center justify-center text-3xl font-bold text-foreground shadow-md active:shadow-none active:-translate-x-0.5 transition-all duration-100"
          >
            →
          </button>
        </div>
      </div>

      {/* 3D Scene */}
      <Scene>
        <PlayerWithSkin />
        <Map currentRow={currentRow} />
      </Scene>
    </div>
  );
}
