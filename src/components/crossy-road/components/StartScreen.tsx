import { useState } from 'react';
import { Gamepad2, Trophy, ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { characterSkins, getHighScores, getTopScore, setSelectedSkin, getSelectedSkin } from '../stores/skins';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const highScores = getHighScores();
  const topScore = getTopScore();
  
  const currentSkin = characterSkins[selectedIndex];
  
  const handlePrevSkin = () => {
    setSelectedIndex((prev) => (prev === 0 ? characterSkins.length - 1 : prev - 1));
  };
  
  const handleNextSkin = () => {
    setSelectedIndex((prev) => (prev === characterSkins.length - 1 ? 0 : prev + 1));
  };
  
  const handleStart = () => {
    setSelectedSkin(currentSkin.id);
    onStart();
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-background">
      <div className="max-w-lg w-full mx-4 space-y-6">
        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 border-4 border-foreground bg-accent text-accent-foreground px-8 py-4 shadow-md mb-4">
            <Gamepad2 className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-display uppercase tracking-tight">Crossy Road</h1>
          </div>
          
          {topScore > 0 && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm uppercase">
              <Trophy className="w-4 h-4 text-highlight-3" />
              Best: {topScore}
            </div>
          )}
        </div>

        {/* Character Selection */}
        <div className="border-4 border-foreground bg-card p-6 shadow-md">
          <h2 className="text-sm font-bold uppercase tracking-wide text-center mb-4 text-muted-foreground">
            Choose Your Character
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevSkin}
              className="border-4 border-foreground p-2 shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center min-w-[140px]">
              <div className="text-6xl mb-2">{currentSkin.icon}</div>
              <div className="font-bold uppercase text-sm">{currentSkin.name}</div>
            </div>
            
            <button
              onClick={handleNextSkin}
              className="border-4 border-foreground p-2 shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Skin indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {characterSkins.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-3 h-3 border-2 border-foreground transition-colors ${
                  index === selectedIndex ? 'bg-accent' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={handleStart}
          className="w-full border-4 border-foreground bg-highlight-2 text-foreground px-8 py-5 font-bold text-xl uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6" />
          Play Game
        </button>

        {/* Instructions Toggle */}
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full border-4 border-foreground bg-secondary text-foreground px-6 py-3 font-bold uppercase tracking-wide shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center gap-2"
        >
          <Info className="w-5 h-5" />
          {showInstructions ? 'Hide Instructions' : 'How to Play'}
        </button>

        {/* Instructions Panel */}
        {showInstructions && (
          <div className="border-4 border-foreground bg-card p-6 shadow-md">
            <h3 className="font-bold uppercase text-sm mb-4 text-muted-foreground">Instructions</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-mono text-highlight-4">↑↓←→</span>
                <span>or <span className="font-mono">WASD</span> to move</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🚗</span>
                <span>Avoid cars and trucks on roads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🪵</span>
                <span>Jump on logs to cross rivers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🪙</span>
                <span>Collect coins for +5 bonus points</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🌲</span>
                <span>Don't hit trees - they block your path</span>
              </li>
            </ul>
          </div>
        )}

        {/* High Scores */}
        {highScores.length > 0 && (
          <div className="border-4 border-foreground bg-card p-6 shadow-md">
            <h3 className="font-bold uppercase text-sm mb-4 text-muted-foreground flex items-center gap-2">
              <Trophy className="w-4 h-4 text-highlight-3" />
              High Scores
            </h3>
            <div className="space-y-2">
              {highScores.slice(0, 5).map((score, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between font-mono text-sm border-b border-foreground/10 pb-2 last:border-0"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center border-2 border-foreground text-xs font-bold">
                      {index + 1}
                    </span>
                    <span>{characterSkins.find(s => s.id === score.skin)?.icon || '🐔'}</span>
                  </span>
                  <span className="font-bold text-highlight-3">{score.score}</span>
                  <span className="text-muted-foreground text-xs">{score.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
