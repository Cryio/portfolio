import { RefObject, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { state, setGameOver } from '../stores/player';

export function useHitDetection(
  vehicle: RefObject<THREE.Group>,
  rowIndex: number
) {
  const vehicleBoundingBox = useRef(new THREE.Box3());
  const playerBoundingBox = useRef(new THREE.Box3());

  useFrame(() => {
    if (!vehicle.current) return;
    if (!state.ref) return;
    if (state.gameOver) return;

    if (
      rowIndex === state.currentRow ||
      rowIndex === state.currentRow + 1 ||
      rowIndex === state.currentRow - 1
    ) {
      vehicleBoundingBox.current.setFromObject(vehicle.current);
      playerBoundingBox.current.setFromObject(state.ref);

      if (playerBoundingBox.current.intersectsBox(vehicleBoundingBox.current)) {
        setGameOver();
      }
    }
  });
}
