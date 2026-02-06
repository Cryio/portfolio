import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Bot, Users, RotateCcw } from 'lucide-react';

interface Box {
  value: string;
  isWinning: boolean;
}

type GameMode = 'pvp' | 'cpu';
type Difficulty = 'easy' | 'medium' | 'hard';

const TicTacToeGame: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [boxes, setBoxes] = useState<Box[]>(Array(9).fill({ value: '', isWinning: false }));
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<string>('');
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [showSettings, setShowSettings] = useState(false);

  const winConditions = useMemo(() => [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ], []);

  const checkWin = (currentBoxes: Box[]) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (currentBoxes[a].value && 
          currentBoxes[a].value === currentBoxes[b].value && 
          currentBoxes[a].value === currentBoxes[c].value) {
        return {
          winner: currentBoxes[a].value,
          winningBoxes: condition
        };
      }
    }
    return null;
  };

  const checkDraw = (currentBoxes: Box[]) => {
    return currentBoxes.every(box => box.value !== '');
  };

  // Minimax algorithm for AI
  const minimax = (currentBoxes: Box[], depth: number, isMaximizing: boolean, alpha: number, beta: number): number => {
    const result = checkWin(currentBoxes);
    
    if (result) {
      return result.winner === 'O' ? 10 - depth : depth - 10;
    }
    
    if (checkDraw(currentBoxes)) {
      return 0;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currentBoxes[i].value) {
          const newBoxes = [...currentBoxes];
          newBoxes[i] = { ...newBoxes[i], value: 'O' };
          const eval_ = minimax(newBoxes, depth + 1, false, alpha, beta);
          maxEval = Math.max(maxEval, eval_);
          alpha = Math.max(alpha, eval_);
          if (beta <= alpha) break;
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currentBoxes[i].value) {
          const newBoxes = [...currentBoxes];
          newBoxes[i] = { ...newBoxes[i], value: 'X' };
          const eval_ = minimax(newBoxes, depth + 1, true, alpha, beta);
          minEval = Math.min(minEval, eval_);
          beta = Math.min(beta, eval_);
          if (beta <= alpha) break;
        }
      }
      return minEval;
    }
  };

  const getBestMove = useCallback((currentBoxes: Box[], diff: Difficulty): number => {
    const availableMoves = currentBoxes
      .map((box, index) => box.value === '' ? index : null)
      .filter(index => index !== null) as number[];

    if (availableMoves.length === 0) return -1;

    // Easy mode: Random moves
    if (diff === 'easy') {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Medium mode: Sometimes random, sometimes smart
    if (diff === 'medium' && Math.random() < 0.3) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Hard mode: Always use minimax
    let bestMove = -1;
    let bestValue = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (!currentBoxes[i].value) {
        const newBoxes = [...currentBoxes];
        newBoxes[i] = { ...newBoxes[i], value: 'O' };
        const moveValue = minimax(newBoxes, 0, false, -Infinity, Infinity);
        
        if (moveValue > bestValue) {
          bestValue = moveValue;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }, []);

  const makeCPUMove = useCallback(() => {
    if (gameMode === 'cpu' && currentTurn === 'O' && !isGameOver) {
      const moveIndex = getBestMove(boxes, difficulty);
      
      if (moveIndex !== -1) {
        setTimeout(() => {
          const newBoxes = [...boxes];
          newBoxes[moveIndex] = { ...newBoxes[moveIndex], value: 'O' };
          
          const winResult = checkWin(newBoxes);
          if (winResult) {
            const finalBoxes = newBoxes.map((box, idx) => ({
              ...box,
              isWinning: winResult.winningBoxes.includes(idx)
            }));
            setBoxes(finalBoxes);
            setWinner(winResult.winner);
            setIsGameOver(true);
          } else {
            setBoxes(newBoxes);
            if (checkDraw(newBoxes)) {
              setWinner('Draw');
              setIsGameOver(true);
            } else {
              setCurrentTurn('X');
            }
          }
        }, 500); // Small delay for better UX
      }
    }
  }, [gameMode, currentTurn, isGameOver, boxes, difficulty, getBestMove]);

  useEffect(() => {
    makeCPUMove();
  }, [makeCPUMove]);

  const handleBoxClick = (index: number) => {
    if (boxes[index].value || isGameOver) return;
    
    // In CPU mode, only allow player (X) to click
    if (gameMode === 'cpu' && currentTurn === 'O') return;

    const newBoxes = [...boxes];
    newBoxes[index] = { ...newBoxes[index], value: currentTurn };
    
    // Check for win immediately after the move
    const winResult = checkWin(newBoxes);
    if (winResult) {
      // Highlight winning boxes
      const finalBoxes = newBoxes.map((box, idx) => ({
        ...box,
        isWinning: winResult.winningBoxes.includes(idx)
      }));
      setBoxes(finalBoxes);
      setWinner(winResult.winner);
      setIsGameOver(true);
    } else {
      setBoxes(newBoxes);
      // Check for draw
      if (checkDraw(newBoxes)) {
        setWinner('Draw');
        setIsGameOver(true);
      } else {
        // Switch turns only if no win or draw
        setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    setBoxes(Array(9).fill({ value: '', isWinning: false }));
    setCurrentTurn('X');
    setIsGameOver(false);
    setWinner('');
  };

  const changeGameMode = (newMode: GameMode, newDifficulty?: Difficulty) => {
    setGameMode(newMode);
    if (newDifficulty) {
      setDifficulty(newDifficulty);
    }
    resetGame();
    setShowSettings(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background p-4 font-sans"
    >
      <div className="bg-card border-4 border-foreground shadow-lg p-8 max-w-lg w-full">
        {/* Game Title and Settings */}
        <div className="relative mb-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-black font-display text-center text-foreground"
          >
            TIC TAC TOE
          </motion.h1>
          
          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="absolute -right-2 top-0 p-2 border-2 border-foreground bg-background hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Game Mode Settings */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 border-2 border-foreground bg-muted/20"
          >
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Game Mode</span>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => changeGameMode('pvp')}
                    className={`px-3 py-2 border-2 font-bold text-sm uppercase tracking-wide transition-all ${
                      gameMode === 'pvp'
                        ? 'border-foreground bg-accent text-accent-foreground'
                        : 'border-foreground bg-background text-foreground hover:bg-muted'
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-1" />
                    PVP
                  </button>
                  <button
                    onClick={() => changeGameMode('cpu', difficulty)}
                    className={`px-3 py-2 border-2 font-bold text-sm uppercase tracking-wide transition-all ${
                      gameMode === 'cpu'
                        ? 'border-foreground bg-accent text-accent-foreground'
                        : 'border-foreground bg-background text-foreground hover:bg-muted'
                    }`}
                  >
                    <Bot className="w-4 h-4 inline mr-1" />
                    CPU
                  </button>
                </div>
              </div>
              
              {gameMode === 'cpu' && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Difficulty</span>
                  <div className="flex gap-2 mt-2">
                    {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                      <button
                        key={diff}
                        onClick={() => changeGameMode('cpu', diff)}
                        className={`px-3 py-1 border-2 font-bold text-sm uppercase tracking-wide transition-all ${
                          difficulty === diff
                            ? 'border-foreground bg-accent text-accent-foreground'
                            : 'border-foreground bg-background text-foreground hover:bg-muted'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Turn Indicator */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {gameMode === 'cpu' ? 'Your Turn' : 'Current Turn'}
            </span>
          </div>
          <div className="flex justify-center gap-4">
            <motion.div
              animate={{ 
                scale: currentTurn === 'X' && !isGameOver ? 1.1 : 1,
                backgroundColor: currentTurn === 'X' && !isGameOver ? 'hsl(var(--accent))' : 'hsl(var(--card))'
              }}
              className="w-20 h-20 border-4 border-foreground flex items-center justify-center transition-all duration-300"
            >
              <span className="text-3xl font-black font-display">
                {gameMode === 'cpu' ? 'You' : 'X'}
              </span>
            </motion.div>
            <motion.div
              animate={{ 
                scale: currentTurn === 'O' && !isGameOver ? 1.1 : 1,
                backgroundColor: currentTurn === 'O' && !isGameOver ? 'hsl(var(--accent))' : 'hsl(var(--card))'
              }}
              className="w-20 h-20 border-4 border-foreground flex items-center justify-center transition-all duration-300"
            >
              <span className="text-3xl font-black font-display">
                {gameMode === 'cpu' ? 'CPU' : 'O'}
              </span>
            </motion.div>
          </div>
          {gameMode === 'cpu' && (
            <div className="text-center mt-2">
              <span className="text-xs text-muted-foreground">
                Mode: {gameMode === 'cpu' ? `${difficulty}` : 'Player vs Player'}
              </span>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-8 aspect-square max-w-md mx-auto w-full">
          {boxes.map((box, index) => (
            <motion.button
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              whileHover={{ scale: box.value ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBoxClick(index)}
              disabled={isGameOver || box.value !== ''}
              className={`relative border-4 border-foreground bg-card flex items-center justify-center text-5xl font-black font-display aspect-square ${
                box.isWinning 
                  ? 'bg-accent/30 border-accent text-accent-foreground shadow-lg' 
                  : 'hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5'
              } ${
                box.value ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{ minHeight: '120px' }}
            >
              <motion.span 
                className="text-6xl leading-none"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {box.value}
              </motion.span>
            </motion.button>
          ))}
        </div>

        {/* Game Status */}
        <div className="text-center mb-6">
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 border-4 ${
                winner === 'Draw' 
                  ? 'bg-muted/20 border-muted-foreground' 
                  : 'bg-accent/20 border-accent'
              }`}
            >
              <h2 className="text-2xl font-black font-display mb-2">
                {winner === 'Draw' ? 'DRAW!' : `${winner} WINS!`}
              </h2>
            </motion.div>
          )}
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-8 py-3 text-sm font-bold uppercase tracking-wider bg-accent text-accent-foreground border-4 border-foreground shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            {isGameOver ? 'Play Again' : 'Reset Game'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TicTacToeGame;