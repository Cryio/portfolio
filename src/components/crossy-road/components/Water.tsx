import { ReactNode, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { tilesPerRow, tileSize } from '../constants';

interface WaterProps {
  rowIndex: number;
  children?: ReactNode;
}

export function Water({ rowIndex, children }: WaterProps) {
  const ripplesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ripplesRef.current) return;
    // Animate ripples with wave effect
    ripplesRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const offset = Math.sin(state.clock.elapsedTime * 1.5 + i * 0.8) * 1.5;
      mesh.position.z = 3 + offset;
    });
  });

  // Generate stable wave positions
  const wavePositions = useMemo(() => {
    return [-5, -3, -1, 1, 3, 5].map((offset, i) => ({
      x: offset * tileSize * 1.3 + (rowIndex * 11) % 20,
      width: tileSize * (1 + (i % 3) * 0.3),
    }));
  }, [rowIndex]);

  return (
    <group position-y={rowIndex * tileSize}>
      {/* Deep water base */}
      <mesh position-z={-3}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 6]} />
        <meshStandardMaterial color={0x0d47a1} roughness={0.3} />
      </mesh>
      
      {/* Water surface */}
      <mesh position-z={1}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 4]} />
        <meshStandardMaterial color={0x1976d2} roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Top water layer with slight shine */}
      <mesh position-z={3.5}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 1]} />
        <meshStandardMaterial color={0x42a5f5} roughness={0.15} metalness={0.2} />
      </mesh>
      
      {/* Animated wave highlights */}
      <group ref={ripplesRef}>
        {wavePositions.map((wave, i) => (
          <mesh key={i} position={[wave.x, 0, 4]}>
            <boxGeometry args={[wave.width, 3, 1]} />
            <meshStandardMaterial color={0x90caf9} transparent opacity={0.7} roughness={0.1} />
          </mesh>
        ))}
      </group>
      
      {children}
    </group>
  );
}
