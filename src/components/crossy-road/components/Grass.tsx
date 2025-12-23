import { ReactNode, useMemo } from 'react';
import { tilesPerRow, tileSize } from '../constants';

interface GrassProps {
  rowIndex: number;
  children?: ReactNode;
}

export function Grass({ rowIndex, children }: GrassProps) {
  // Alternate grass colors for visual variety
  const isLight = rowIndex % 2 === 0;
  const grassColor = isLight ? 0x7ec850 : 0x6ab04c;
  const darkerGrass = isLight ? 0x5a9c3a : 0x4a8c2a;
  
  // Generate grass details only once per row
  const grassDetails = useMemo(() => {
    const details = [];
    for (let i = 0; i < 12; i++) {
      const xPos = (i - 6) * tileSize * 1.4 + (rowIndex * 7) % 15;
      const yPos = ((rowIndex * 13 + i * 17) % 20) - 10;
      details.push({ x: xPos, y: yPos, size: 2 + (i % 3) });
    }
    return details;
  }, [rowIndex]);
  
  return (
    <group position-y={rowIndex * tileSize}>
      {/* Main grass block */}
      <mesh receiveShadow position-z={0}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 6]} />
        <meshStandardMaterial color={grassColor} roughness={0.9} />
      </mesh>
      
      {/* Top grass surface highlight */}
      <mesh position-z={3.5}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 1]} />
        <meshStandardMaterial color={isLight ? 0x8bd85a : 0x7cc84c} roughness={0.8} />
      </mesh>
      
      {/* Grass blade decorations */}
      {grassDetails.map((detail, i) => (
        <mesh 
          key={i} 
          position={[detail.x, detail.y, 4.5]}
        >
          <boxGeometry args={[detail.size, detail.size, 3]} />
          <meshStandardMaterial color={darkerGrass} roughness={0.9} />
        </mesh>
      ))}
      
      {children}
    </group>
  );
}
