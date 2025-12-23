import { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { tileSize, minTileIndex, maxTileIndex } from '../constants';
import { logPositions } from '../stores/logPositions';

export function useLogAnimation(
  ref: RefObject<THREE.Group>,
  direction: boolean,
  speed: number,
  rowIndex: number,
  logIndex: number,
  length: number
) {
  useFrame((state, delta) => {
    if (!ref.current) return;
    const log = ref.current;

    const logWidth = length * tileSize;
    const beginningOfRow = (minTileIndex - 4) * tileSize;
    const endOfRow = (maxTileIndex + 4) * tileSize;

    if (direction) {
      log.position.x =
        log.position.x > endOfRow
          ? beginningOfRow
          : log.position.x + speed * delta;
    } else {
      log.position.x =
        log.position.x < beginningOfRow
          ? endOfRow
          : log.position.x - speed * delta;
    }

    // Store log position for player riding - store center position and width
    const key = `${rowIndex}-${logIndex}`;
    logPositions.set(key, {
      x: log.position.x,
      width: logWidth,
      speed,
      direction,
      rowIndex,
    });
  });
}
