import { tileSize } from '../constants';

export interface CoinData {
  rowIndex: number;
  tileIndex: number;
  id: string;
}

// Store collected coin IDs
const collectedCoins = new Set<string>();

// Store generated coins
const generatedCoins = new Map<number, CoinData[]>();

// Bonus points for collecting a coin
export const COIN_BONUS = 5;

export function generateCoinsForRow(rowIndex: number): CoinData[] {
  if (generatedCoins.has(rowIndex)) {
    return generatedCoins.get(rowIndex)!;
  }
  
  const coins: CoinData[] = [];
  
  // 30% chance of spawning a coin on any row
  if (Math.random() < 0.3) {
    const tileIndex = Math.floor(Math.random() * 13) - 6; // -6 to 6
    coins.push({
      rowIndex,
      tileIndex,
      id: `coin-${rowIndex}-${tileIndex}`,
    });
  }
  
  generatedCoins.set(rowIndex, coins);
  return coins;
}

export function collectCoin(coinId: string): boolean {
  if (collectedCoins.has(coinId)) {
    return false;
  }
  collectedCoins.add(coinId);
  return true;
}

export function isCoinCollected(coinId: string): boolean {
  return collectedCoins.has(coinId);
}

export function checkCoinCollision(playerX: number, playerRow: number): CoinData | null {
  const coins = generatedCoins.get(playerRow);
  if (!coins) return null;
  
  for (const coin of coins) {
    if (collectedCoins.has(coin.id)) continue;
    
    const coinX = coin.tileIndex * tileSize;
    const distance = Math.abs(playerX - coinX);
    
    if (distance < tileSize * 0.7) {
      return coin;
    }
  }
  
  return null;
}

export function resetCoins() {
  collectedCoins.clear();
  generatedCoins.clear();
}
