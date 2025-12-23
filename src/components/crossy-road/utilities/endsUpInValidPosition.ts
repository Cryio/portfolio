import { calculateFinalPosition } from './calculateFinalPosition';
import { minTileIndex, maxTileIndex } from '../constants';
import { rows, ensureRowsExist } from '../metadata';
import { Direction } from '../stores/player';

interface Position {
  rowIndex: number;
  tileIndex: number;
}

export function endsUpInValidPosition(currentPosition: Position, moves: Direction[]): boolean {
  const finalPosition = calculateFinalPosition(currentPosition, moves);

  // Detect if we hit the edge of the board
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === minTileIndex - 1 ||
    finalPosition.tileIndex === maxTileIndex + 1
  ) {
    return false;
  }

  // Ensure rows exist for the position we're checking
  ensureRowsExist(finalPosition.rowIndex);

  // Detect if we hit a tree
  const finalRow = rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === 'forest' &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    return false;
  }

  return true;
}
