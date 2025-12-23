import { ReactNode } from 'react';
import { tilesPerRow, tileSize } from '../constants';

interface RoadProps {
  rowIndex: number;
  children?: ReactNode;
}

export function Road({ rowIndex, children }: RoadProps) {
  return (
    <group position-y={rowIndex * tileSize}>
      {/* Road base/foundation */}
      <mesh receiveShadow position-z={-1}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 4]} />
        <meshStandardMaterial color={0x2a2a2a} roughness={0.95} />
      </mesh>
      
      {/* Road surface */}
      <mesh receiveShadow position-z={1.5}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize - 4, 3]} />
        <meshStandardMaterial color={0x4a4a4a} roughness={0.85} />
      </mesh>
      
      {/* Road markings - dashed center line */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[(i - 4) * tileSize * 2, 0, 3.5]}>
          <boxGeometry args={[tileSize * 0.6, 4, 0.5]} />
          <meshStandardMaterial color={0xf4d03f} roughness={0.6} emissive={0xf4d03f} emissiveIntensity={0.1} />
        </mesh>
      ))}
      
      {/* Road edges - curbs */}
      <mesh position={[0, tileSize / 2 - 1, 2]}>
        <boxGeometry args={[tilesPerRow * tileSize, 4, 4]} />
        <meshStandardMaterial color={0x666666} roughness={0.8} />
      </mesh>
      <mesh position={[0, -tileSize / 2 + 1, 2]}>
        <boxGeometry args={[tilesPerRow * tileSize, 4, 4]} />
        <meshStandardMaterial color={0x666666} roughness={0.8} />
      </mesh>
      
      {children}
    </group>
  );
}
