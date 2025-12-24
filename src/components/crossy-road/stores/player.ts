import * as THREE from 'three';
import { endsUpInValidPosition } from '../utilities/endsUpInValidPosition';
import { rows, ensureRowsExist } from '../metadata';
import { tileSize, minTileIndex, maxTileIndex } from '../constants';
import { logPositions, clearLogPositions } from './logPositions';

export type Direction = 'forward' | 'backward' | 'left' | 'right';

export const state = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [] as Direction[],
  ref: null as THREE.Group | null,
  score: 0,
  maxRow: 0,
  gameOver: false,
  onLog: false,
  logSpeed: 0,
  logDirection: false,
  coinsCollected: 0,
};

export function queueMove(direction: Direction) {
  if (state.gameOver) return;
  
  const isValidMove = endsUpInValidPosition(
    { rowIndex: state.currentRow, tileIndex: state.currentTile },
    [...state.movesQueue, direction]
  );

  if (!isValidMove) return;

  state.movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = state.movesQueue.shift();

  if (direction === 'forward') state.currentRow += 1;
  if (direction === 'backward') state.currentRow -= 1;
  if (direction === 'left') state.currentTile -= 1;
  if (direction === 'right') state.currentTile += 1;
  
  // Update score
  if (state.currentRow > state.maxRow) {
    state.maxRow = state.currentRow;
    state.score = state.currentRow + (state.coinsCollected * 5);
  }
}

export function addCoinScore() {
  state.coinsCollected += 1;
  state.score += 5;
}

export function setRef(ref: THREE.Group) {
  state.ref = ref;
}

export function setGameOver() {
  state.gameOver = true;
}

export function resetGame() {
  state.currentRow = 0;
  state.currentTile = 0;
  state.movesQueue = [];
  // Don't reset ref - player component is still mounted
  state.score = 0;
  state.maxRow = 0;
  state.gameOver = false;
  state.onLog = false;
  state.logSpeed = 0;
  state.logDirection = false;
  state.coinsCollected = 0;
  clearLogPositions();
}

// Check if player is on a log and update state
export function checkLogPosition(playerX: number, playerRow: number): boolean {
  ensureRowsExist(playerRow);
  
  if (playerRow <= 0) return false;
  
  const row = rows[playerRow - 1];
  if (!row || row.type !== 'river') {
    state.onLog = false;
    return false;
  }
  
  // Check if player is on any log in this row
  let isOnLog = false;
  
  row.logs.forEach((log, index) => {
    const key = `${playerRow}-${index}`;
    const logPos = logPositions.get(key);
    
    if (logPos) {
      // Use the stored width from log animation
      const halfWidth = (logPos.width || log.length * tileSize) / 2;
      const logLeft = logPos.x - halfWidth;
      const logRight = logPos.x + halfWidth;
      
      // More generous hit detection for log riding
      if (playerX >= logLeft - 10 && playerX <= logRight + 10) {
        isOnLog = true;
        state.onLog = true;
        state.logSpeed = logPos.speed;
        state.logDirection = logPos.direction;
      }
    }
  });
  
  if (!isOnLog) {
    state.onLog = false;
  }
  
  return isOnLog;
}

// Check if player fell in water
export function isInWater(playerRow: number): boolean {
  ensureRowsExist(playerRow);
  
  if (playerRow <= 0) return false;
  
  const row = rows[playerRow - 1];
  return row?.type === 'river';
}
