import { useRef } from 'react';
import * as THREE from 'three';
import { tileSize } from '../constants';
import { useLogAnimation } from '../hooks/useLogAnimation';

interface LogProps {
  rowIndex: number;
  initialTileIndex: number;
  length: number;
  direction: boolean;
  speed: number;
  logIndex: number;
}

export function Log({ rowIndex, initialTileIndex, length, direction, speed, logIndex }: LogProps) {
  const log = useRef<THREE.Group>(null);
  useLogAnimation(log, direction, speed, rowIndex, logIndex, length);

  const logWidth = length * tileSize;
  const logRadius = tileSize * 0.3;

  return (
    <group
      position-x={initialTileIndex * tileSize}
      ref={log}
    >
      {/* Main log body - simple box style matching Crossy Road */}
      <mesh position-z={logRadius + 2}>
        <boxGeometry args={[logWidth - 4, tileSize * 0.7, logRadius * 2]} />
        <meshLambertMaterial color={0x8b4513} />
      </mesh>
      
      {/* Darker bark lines */}
      {Array.from({ length: Math.max(2, Math.floor(length)) }).map((_, i) => (
        <mesh 
          key={i} 
          position={[-logWidth / 2 + tileSize / 2 + i * tileSize, 0, logRadius * 2 + 2.5]}
        >
          <boxGeometry args={[4, tileSize * 0.6, 1]} />
          <meshLambertMaterial color={0x5d3a1a} />
        </mesh>
      ))}
      
      {/* Log ends */}
      <mesh position={[-logWidth / 2 + 2, 0, logRadius + 2]}>
        <boxGeometry args={[4, tileSize * 0.65, logRadius * 1.9]} />
        <meshLambertMaterial color={0xdeb887} />
      </mesh>
      <mesh position={[logWidth / 2 - 2, 0, logRadius + 2]}>
        <boxGeometry args={[4, tileSize * 0.65, logRadius * 1.9]} />
        <meshLambertMaterial color={0xdeb887} />
      </mesh>
    </group>
  );
}
