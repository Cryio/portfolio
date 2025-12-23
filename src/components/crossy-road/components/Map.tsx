import { useMemo, useState, useCallback } from 'react';
import { rows, ensureRowsExist } from '../metadata';
import { Grass } from './Grass';
import { Row } from './Row';
import { Coin } from './Coin';
import { generateCoinsForRow, isCoinCollected, collectCoin } from '../stores/coins';
import { addCoinScore, state } from '../stores/player';

interface MapProps {
  currentRow: number;
}

export function Map({ currentRow }: MapProps) {
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());

  // Show rows around the player
  const visibleRows = useMemo(() => {
    const startRow = Math.max(0, currentRow - 5);
    const endRow = currentRow + 15;
    ensureRowsExist(endRow);
    
    return rows.slice(startRow, endRow).map((rowData, idx) => ({
      rowData,
      rowIndex: startRow + idx + 1, // +1 because row 0 is the starting row
    }));
  }, [currentRow]);

  // Generate coins for visible rows
  const visibleCoins = useMemo(() => {
    const coins: { rowIndex: number; tileIndex: number; id: string }[] = [];
    const startRow = Math.max(1, currentRow - 5);
    const endRow = currentRow + 15;
    
    for (let row = startRow; row <= endRow; row++) {
      const rowCoins = generateCoinsForRow(row);
      coins.push(...rowCoins);
    }
    
    return coins;
  }, [currentRow]);

  const handleCoinCollect = useCallback((coinId: string) => {
    if (collectCoin(coinId)) {
      addCoinScore();
      setCollectedIds(prev => new Set(prev).add(coinId));
    }
  }, []);

  return (
    <>
      {/* Starting row */}
      <Grass rowIndex={0} />
      
      {/* Dynamic rows */}
      {visibleRows.map(({ rowData, rowIndex }) => (
        <Row key={rowIndex} rowIndex={rowIndex} rowData={rowData} />
      ))}
      
      {/* Coins */}
      {visibleCoins.map((coin) => (
        <Coin
          key={coin.id}
          rowIndex={coin.rowIndex}
          tileIndex={coin.tileIndex}
          collected={collectedIds.has(coin.id) || isCoinCollected(coin.id)}
          onCollect={() => handleCoinCollect(coin.id)}
        />
      ))}
    </>
  );
}
