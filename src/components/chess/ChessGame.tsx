import { useEffect, useMemo, useRef, useState } from "react";
import { Chess, Move } from "chess.js";
import { motion } from "framer-motion";

interface ChessGameProps {
  onBack: () => void;
}

type Mode = "cpu" | "pvp";

const lightSquare = "#f2d7b6";
const darkSquare = "#b58863";
const highlightSquare = "#fbbf24";
const dangerSquare = "#f87171";

const pieceGlyph: Record<string, string> = {
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
};

function statusLabel(chess: Chess) {
  if (chess.isCheckmate()) return "Checkmate";
  if (chess.isStalemate()) return "Stalemate";
  if (chess.isDraw()) return "Draw";
  if (chess.isCheck()) return "Check";
  return chess.turn() === "w" ? "White to move" : "Black to move";
}

export function ChessGame({ onBack }: ChessGameProps) {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [mode, setMode] = useState<Mode | null>(null);
  const [showMenu, setShowMenu] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [legalTargets, setLegalTargets] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [status, setStatus] = useState(statusLabel(gameRef.current));
  const [message, setMessage] = useState("Pick a mode to start");

  const squares = useMemo(() => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    return ranks.flatMap((rank) => files.map((file) => `${file}${rank}`));
  }, []);

  const resetGame = (nextMode: Mode | null) => {
    gameRef.current = new Chess();
    setMode(nextMode);
    setShowMenu(nextMode === null);
    setSelected(null);
    setLegalTargets([]);
    setLastMove(null);
    setFen(gameRef.current.fen());
    setStatus(statusLabel(gameRef.current));
    setMessage(nextMode ? "Game on" : "Pick a mode to start");
  };

  const startGame = (nextMode: Mode) => {
    resetGame(nextMode);
    setShowMenu(false);
  };

  const makeMove = (move: Move | string) => {
    const chess = gameRef.current;
    const result = chess.move(move as Move, { sloppy: true });
    if (!result) return false;
    setFen(chess.fen());
    setStatus(statusLabel(chess));
    setLastMove({ from: result.from, to: result.to });
    setSelected(null);
    setLegalTargets([]);

    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        const winner = chess.turn() === "w" ? "Black" : "White";
        setMessage(`${winner} wins by checkmate`);
      } else if (chess.isStalemate()) {
        setMessage("Draw by stalemate");
      } else {
        setMessage("Draw");
      }
    } else {
      setMessage(statusLabel(chess));
    }
    return true;
  };

  const handleSquareClick = (square: string) => {
    if (showMenu) return;
    const chess = gameRef.current;
    if (chess.isGameOver()) return;

    if (selected === square) {
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    if (selected) {
      const moveAttempt = chess.move({ from: selected, to: square, promotion: "q" });
      if (moveAttempt) {
        chess.undo();
        makeMove({ from: selected, to: square, promotion: "q" });
        return;
      }
    }

    const moves = chess.moves({ square, verbose: true });
    if (moves.length) {
      setSelected(square);
      setLegalTargets(moves.map((m) => m.to));
    } else {
      setSelected(null);
      setLegalTargets([]);
    }
  };

  useEffect(() => {
    if (!mode || showMenu) return;
    const chess = gameRef.current;
    if (mode !== "cpu") return;
    if (chess.turn() === "b" && !chess.isGameOver()) {
      const legal = chess.moves({ verbose: true });
      if (legal.length === 0) return;
      const move = legal[Math.floor(Math.random() * legal.length)];
      const timer = window.setTimeout(() => {
        makeMove(move);
      }, 300 + Math.random() * 400);
      return () => window.clearTimeout(timer);
    }
  }, [fen, mode, showMenu]);

  const renderSquare = (square: string) => {
    const chess = gameRef.current;
    const piece = chess.get(square);
    const isLight = (square.charCodeAt(0) + parseInt(square[1], 10)) % 2 === 0;
    const isSelected = selected === square;
    const isLegal = legalTargets.includes(square);
    const isLast = lastMove && (lastMove.from === square || lastMove.to === square);

    const bg = isSelected
      ? highlightSquare
      : isLegal
      ? "#fde68a"
      : isLast
      ? "#60a5fa"
      : isLight
      ? lightSquare
      : darkSquare;

    const isInCheck = chess.isCheck() && piece?.type === "k" && piece.color === chess.turn();

    return (
      <button
        key={square}
        onClick={() => handleSquareClick(square)}
        className="w-full h-full flex items-center justify-center"
        style={{
          background: isInCheck ? dangerSquare : bg,
          border: "1px solid #1f2937",
          fontSize: "clamp(18px, 2.6vw, 28px)",
          lineHeight: 1,
          color: piece?.color === "w" ? "#111827" : "#0f172a",
          textShadow: piece ? "1px 1px rgba(0,0,0,0.2)" : "none",
          imageRendering: "pixelated",
          fontFamily: '"Press Start 2P", "Courier New", monospace',
        }}
      >
        {piece ? pieceGlyph[piece.color === "w" ? piece.type.toUpperCase() : piece.type] : ""}
      </button>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-3 py-6 bg-background">
      <div className="flex items-center justify-between w-full max-w-4xl">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="border-4 border-foreground bg-background px-3 py-2 font-bold uppercase text-xs tracking-wide"
        >
          Exit
        </motion.button>
        <div className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground">{status}</div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => resetGame(mode)}
          className="border-4 border-foreground bg-accent text-accent-foreground px-3 py-2 font-bold uppercase text-xs tracking-wide"
        >
          Reset
        </motion.button>
      </div>

      <div className="relative border-4 border-foreground shadow-lg bg-neutral-900/80 backdrop-blur-sm" style={{ width: "clamp(320px, 92vw, 720px)", aspectRatio: "1 / 1" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#0f172a,transparent_40%),radial-gradient(circle_at_80%_0%,#1f2937,transparent_35%),linear-gradient(180deg,#0b1021,#0b1324)]" />
        <div className="relative grid grid-cols-8 grid-rows-8 w-full h-full" style={{ imageRendering: "pixelated" }}>
          {squares.map(renderSquare)}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 text-xs sm:text-sm bg-background/80 backdrop-blur border-t border-foreground">
          <span className="font-semibold">Mode: {mode ?? "--"}</span>
          <span className="text-muted-foreground">{message}</span>
        </div>

        {showMenu && (
          <div className="absolute inset-0 bg-background/85 backdrop-blur flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm uppercase tracking-widest">Pixel Chess</p>
              <p className="text-2xl sm:text-3xl font-display">Choose a mode</p>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Play against a friend locally or a quick CPU that makes random legal moves. Tap or click squares to move.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => startGame("cpu")}
                className="px-5 py-2 border-4 border-foreground bg-accent text-accent-foreground font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform"
              >
                Vs CPU
              </button>
              <button
                onClick={() => startGame("pvp")}
                className="px-5 py-2 border-4 border-foreground bg-background font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform"
              >
                Player 1 vs Player 2
              </button>
              <button
                onClick={onBack}
                className="px-5 py-2 border-4 border-foreground bg-background font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
