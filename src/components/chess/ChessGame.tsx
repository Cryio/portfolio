import { useEffect, useMemo, useRef, useState } from "react";
import { Chess, Move, Square } from "chess.js";
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
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [status, setStatus] = useState(statusLabel(gameRef.current));
  const [message, setMessage] = useState("Pick a mode to start");
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const squares = useMemo(() => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    return ranks.flatMap((rank) => files.map((file) => `${file}${rank}` as Square));
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
    setCapturedWhite([]);
    setCapturedBlack([]);
    setMoveHistory([]);
    setGameOver(false);
  };

  const startGame = (nextMode: Mode) => {
    resetGame(nextMode);
    setShowMenu(false);
  };

  type MoveInput = Move | { from: Square; to: Square; promotion?: string } | string;

  const makeMove = (move: MoveInput) => {
    const chess = gameRef.current;
    const result = chess.move(move);
    if (!result) return false;

    if (result.captured) {
      const glyph = pieceGlyph[result.captured.toUpperCase()];
      if (result.color === "w") {
        setCapturedWhite((prev) => [...prev, glyph]);
      } else {
        setCapturedBlack((prev) => [...prev, glyph]);
      }
    }

    setFen(chess.fen());
    setStatus(statusLabel(chess));
    setLastMove({ from: result.from, to: result.to });
    setSelected(null);
    setLegalTargets([]);
    setMoveHistory((prev) => [...prev, result.san]);

    if (chess.isGameOver()) {
      setGameOver(true);
      if (chess.isCheckmate()) {
        const winner = chess.turn() === "w" ? "Black" : "White";
        const label = `${winner} wins by checkmate`;
        setMessage(label);
        setStatus(label);
      } else if (chess.isStalemate()) {
        setMessage("Draw by stalemate");
        setStatus("Draw by stalemate");
      } else {
        setMessage("Draw");
        setStatus("Draw");
      }
    } else {
      setMessage(statusLabel(chess));
    }
    return true;
  };

  const handleSquareClick = (square: Square) => {
    if (showMenu || gameOver) return;
    const chess = gameRef.current;
    if (chess.isGameOver()) return;

    // In CPU mode, ignore clicks when it's the CPU's turn (black)
    if (mode === "cpu" && chess.turn() === "b") return;

    const piece = chess.get(square);

    if (selected === square) {
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    // If a piece is selected and we click a legal target, attempt the move
    if (selected && legalTargets.includes(square)) {
      const moveAttempt = chess.move({ from: selected, to: square, promotion: "q" });
      if (moveAttempt) {
        chess.undo();
        makeMove({ from: selected, to: square, promotion: "q" });
      }
      return;
    }

    // Only allow selecting pieces of the side to move
    if (piece && piece.color === chess.turn()) {
      const moves = chess.moves({ square, verbose: true }) as Move[];
      if (moves.length) {
        setSelected(square);
        setLegalTargets(moves.map((m) => m.to as Square));
        return;
      }
    }

    setSelected(null);
    setLegalTargets([]);
  };

  useEffect(() => {
    if (!mode || showMenu || gameOver) return;
    const chess = gameRef.current;
    if (mode !== "cpu") return;
    if (chess.turn() === "b" && !chess.isGameOver()) {
      const legal = chess.moves({ verbose: true });
      if (legal.length === 0) return;
      const move = legal[Math.floor(Math.random() * legal.length)];
      const timer = window.setTimeout(() => {
        makeMove(move);
      }, 600 + Math.random() * 500);
      return () => window.clearTimeout(timer);
    }
  }, [fen, mode, showMenu, gameOver]);

  const pieceIds = useMemo(() => {
    const counts: Record<string, Record<string, number>> = { w: {}, b: {} };
    const ids: Record<string, string> = {};
    squares.forEach((sq) => {
      const piece = gameRef.current.get(sq);
      if (!piece) return;
      const c = counts[piece.color][piece.type] ?? 0;
      counts[piece.color][piece.type] = c + 1;
      ids[sq] = `${piece.color}-${piece.type}-${c + 1}`;
    });
    return ids;
  }, [fen, squares]);

  const renderSquare = (square: Square) => {
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

    const pieceKey = piece ? pieceIds[square] ?? `${piece.color}-${piece.type}-${square}` : `empty-${square}`;
    const isMovedTarget = Boolean(piece && lastMove && lastMove.to === square);

    return (
      <motion.button
        key={square}
        onClick={() => handleSquareClick(square)}
        className="w-full h-full flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: isSelected ? 1.02 : 1.01 }}
        style={{
          background: isInCheck ? dangerSquare : bg,
          border: "1px solid #1f2937",
          fontSize: "clamp(22px, 3.4vw, 40px)",
          lineHeight: 1,
          color: piece?.color === "w" ? "#111827" : "#0f172a",
          textShadow: piece ? "1px 1px rgba(0,0,0,0.2)" : "none",
          imageRendering: "pixelated",
          fontFamily: '"Press Start 2P", "Courier New", monospace',
        }}
      >
        {piece ? (
          <motion.span
            key={pieceKey}
            initial={false}
            animate={
              isMovedTarget
                ? { scale: [1, 1.08, 1], opacity: 1 }
                : { opacity: 1 }
            }
            transition={isMovedTarget ? { duration: 0.35, ease: "easeOut" } : undefined}
            className="inline-block"
          >
            {pieceGlyph[piece.color === "w" ? piece.type.toUpperCase() : piece.type]}
          </motion.span>
        ) : null}
      </motion.button>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-3 py-6 bg-background">
      <div className="flex flex-col gap-3 w-full max-w-4xl">
        <div className="flex items-center justify-between">
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

        <div className="flex flex-wrap justify-between gap-2 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">White captured:</span>
            <motion.div layout className="flex gap-1">
              {capturedWhite.map((p, i) => (
                <motion.span
                  key={`${p}-w-${i}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-1 rounded bg-background/70 border border-foreground/40"
                >
                  {p}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Black captured:</span>
            <motion.div layout className="flex gap-1">
              {capturedBlack.map((p, i) => (
                <motion.span
                  key={`${p}-b-${i}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-1 rounded bg-background/70 border border-foreground/40"
                >
                  {p}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm bg-background/70 border border-foreground/30 rounded-md px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Turn</span>
            <span className="px-2 py-1 rounded-full border border-foreground/40 bg-background/80 font-semibold">
              {gameRef.current.turn() === "w" ? "White" : "Black"}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto max-w-[60%] scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <span className="text-muted-foreground">Moves:</span>
            <div className="flex gap-2 whitespace-nowrap">
              {moveHistory.slice(-8).map((mv, idx) => (
                <motion.span
                  key={`${mv}-${idx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-2 py-1 rounded bg-background border border-foreground/30"
                >
                  {moveHistory.length - 8 + idx + 1}. {mv}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative border-4 border-foreground shadow-lg bg-neutral-900/80 backdrop-blur-sm"
        style={{ width: "clamp(340px, 92vw, 760px)", aspectRatio: "1 / 1" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#0f172a,transparent_40%),radial-gradient(circle_at_80%_0%,#1f2937,transparent_35%),linear-gradient(180deg,#0b1021,#0b1324)]" />
        <div className="absolute inset-0 pointer-events-none grid grid-cols-8 grid-rows-8 text-[10px] sm:text-xs font-mono text-muted-foreground/70">
          {squares.map((sq) => (
            <div key={`coord-${sq}`} className="relative">
              {sq.endsWith("1") && (
                <span className="absolute bottom-1 right-1">{sq[0]}</span>
              )}
              {sq.startsWith("a") && (
                <span className="absolute top-1 left-1">{sq[1]}</span>
              )}
            </div>
          ))}
        </div>
        <div className="relative grid grid-cols-8 grid-rows-8 w-full h-full" style={{ imageRendering: "pixelated" }}>
          {squares.map(renderSquare)}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 text-xs sm:text-sm bg-background/80 backdrop-blur border-t border-foreground">
          <span className="font-semibold">Mode: {mode ?? "--"}</span>
          <span className="text-muted-foreground">{message}</span>
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur flex flex-col items-center justify-center gap-3 text-center px-4">
            <p className="text-xl sm:text-2xl font-display">{message}</p>
            <div className="flex gap-2">
              <button
                onClick={() => resetGame(mode)}
                className="px-4 py-2 border-4 border-foreground bg-accent text-accent-foreground font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 border-4 border-foreground bg-background font-bold uppercase text-xs sm:text-sm tracking-wide hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform"
              >
                Exit
              </button>
            </div>
          </div>
        )}

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
      </motion.div>
    </div>
  );
}
