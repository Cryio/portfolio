import { RefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { state, setGameOver } from '../stores/player';

export function useHitDetection(
  vehicle: RefObject<THREE.Group>,
  rowIndex: number
) {
  useFrame(() => {
    if (!vehicle.current) return;
    if (!state.ref) return;
    if (state.gameOver) return;

    // Only check if player is in nearby rows
    if (
      rowIndex === state.currentRow ||
      rowIndex === state.currentRow + 1 ||
      rowIndex === state.currentRow - 1
    ) {
      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(vehicle.current);

      const playerBoundingBox = new THREE.Box3();
      playerBoundingBox.setFromObject(state.ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        setGameOver();
      }
    }
  });
}
