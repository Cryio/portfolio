import { tileSize } from '../constants';

interface TreeProps {
  tileIndex: number;
  height: number;
}

export function Tree({ tileIndex, height }: TreeProps) {
  const crownColor = Math.random() > 0.5 ? 0x228b22 : 0x2e8b57;
  
  return (
    <group position-x={tileIndex * tileSize}>
      {/* Tree crown - main part */}
      <mesh position-z={height / 2 + 22} castShadow>
        <boxGeometry args={[28, 28, height]} />
        <meshLambertMaterial color={crownColor} />
      </mesh>
      
      {/* Tree crown - top layer */}
      <mesh position-z={height + 18} castShadow>
        <boxGeometry args={[20, 20, height * 0.5]} />
        <meshLambertMaterial color={0x1e7b1e} />
      </mesh>
      
      {/* Crown detail blocks */}
      <mesh position={[-12, 0, height / 2 + 20]} castShadow>
        <boxGeometry args={[8, 22, height * 0.7]} />
        <meshLambertMaterial color={0x1a6b1a} />
      </mesh>
      <mesh position={[12, 0, height / 2 + 20]} castShadow>
        <boxGeometry args={[8, 22, height * 0.7]} />
        <meshLambertMaterial color={0x1a6b1a} />
      </mesh>
      
      {/* Trunk */}
      <mesh position-z={10} castShadow>
        <boxGeometry args={[12, 12, 20]} />
        <meshLambertMaterial color={0x8b4513} />
      </mesh>
      
      {/* Trunk detail */}
      <mesh position={[0, 7, 10]}>
        <boxGeometry args={[10, 2, 18]} />
        <meshLambertMaterial color={0x654321} />
      </mesh>
    </group>
  );
}
