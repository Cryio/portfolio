import { RefObject, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { state, stepCompleted, checkLogPosition, isInWater, setGameOver, addCoinScore } from '../stores/player';
import { checkCoinCollision, collectCoin } from '../stores/coins';
import { tileSize, minTileIndex, maxTileIndex } from '../constants';

export function usePlayerAnimation(ref: RefObject<THREE.Group>) {
  const moveClock = useRef(new THREE.Clock(false));
  const currentPositionX = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (state.gameOver) return;
    
    const player = ref.current;

    // Check for coin collection
    const coin = checkCoinCollision(player.position.x, state.currentRow);
    if (coin && collectCoin(coin.id)) {
      addCoinScore();
    }

    // Handle log riding when not moving
    if (state.movesQueue.length === 0) {
      const isOnLog = checkLogPosition(player.position.x, state.currentRow);
      
      // Check if in water (river row) but not on log
      if (isInWater(state.currentRow) && !isOnLog) {
        setGameOver();
        return;
      }
      
      // Move with log
      if (state.onLog) {
        const movement = state.logSpeed * delta * (state.logDirection ? 1 : -1);
        player.position.x += movement;
        currentPositionX.current = player.position.x;
        
        // Update current tile to match actual position
        state.currentTile = Math.round(player.position.x / tileSize);
        
        // Check if player went off screen
        if (player.position.x < (minTileIndex - 2) * tileSize || 
            player.position.x > (maxTileIndex + 2) * tileSize) {
          setGameOver();
          return;
        }
      } else {
        // When not on log, sync position reference
        currentPositionX.current = player.position.x;
      }
      
      return;
    }

    if (!moveClock.current.running) {
      moveClock.current.start();
      // Capture current actual position as starting point
      currentPositionX.current = player.position.x;
    }

    const stepTime = 0.12;
    const progress = Math.min(1, moveClock.current.getElapsedTime() / stepTime);

    setPosition(player, progress, currentPositionX.current);

    if (progress >= 1) {
      // Update current tile based on actual position
      state.currentTile = Math.round(player.position.x / tileSize);
      currentPositionX.current = player.position.x;
      stepCompleted();
      moveClock.current.stop();
    }
  });
}

function setPosition(player: THREE.Group, progress: number, startX: number) {
  const startY = state.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  const currentMove = state.movesQueue[0];
  if (currentMove === 'left') endX -= tileSize;
  if (currentMove === 'right') endX += tileSize;
  if (currentMove === 'forward') endY += tileSize;
  if (currentMove === 'backward') endY -= tileSize;

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  
  // Jump animation - raise the entire player group
  player.position.z = Math.sin(progress * Math.PI) * 12;
}
