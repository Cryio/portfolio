import { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { tileSize, minTileIndex, maxTileIndex } from '../constants';

export function useVehicleAnimation(
  ref: RefObject<THREE.Group>,
  direction: boolean,
  speed: number
) {
  useFrame((state, delta) => {
    if (!ref.current) return;
    const vehicle = ref.current;

    const beginningOfRow = (minTileIndex - 4) * tileSize;
    const endOfRow = (maxTileIndex + 4) * tileSize;

    if (direction) {
      vehicle.position.x =
        vehicle.position.x > endOfRow
          ? beginningOfRow
          : vehicle.position.x + speed * delta;
    } else {
      vehicle.position.x =
        vehicle.position.x < beginningOfRow
          ? endOfRow
          : vehicle.position.x - speed * delta;
    }
  });
}
