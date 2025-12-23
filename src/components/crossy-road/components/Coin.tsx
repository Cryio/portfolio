import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { tileSize } from '../constants';

interface CoinProps {
  rowIndex: number;
  tileIndex: number;
  onCollect: () => void;
  collected: boolean;
}

export function Coin({ rowIndex, tileIndex, onCollect, collected }: CoinProps) {
  const coinRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!coinRef.current || collected) return;
    
    // Spin animation
    coinRef.current.rotation.y += 0.05;
    
    // Bobbing animation
    coinRef.current.position.z = 20 + Math.sin(state.clock.elapsedTime * 3 + rowIndex) * 3;
    
    // Glow pulse
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      glowRef.current.scale.set(scale, scale, 1);
    }
  });

  if (collected) return null;

  return (
    <group
      ref={coinRef}
      position={[tileIndex * tileSize, rowIndex * tileSize, 20]}
    >
      {/* Glow effect */}
      <mesh ref={glowRef} position-z={-1}>
        <circleGeometry args={[12, 16]} />
        <meshBasicMaterial color={0xffeb3b} transparent opacity={0.3} />
      </mesh>
      
      {/* Main coin body */}
      <mesh rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[8, 8, 3, 16]} />
        <meshStandardMaterial 
          color={0xffd700} 
          metalness={0.8} 
          roughness={0.2}
          emissive={0xffa000}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Inner circle detail */}
      <mesh position-z={1.6} rotation-x={0}>
        <circleGeometry args={[5, 16]} />
        <meshStandardMaterial 
          color={0xffb300} 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      <mesh position-z={-1.6} rotation-x={Math.PI}>
        <circleGeometry args={[5, 16]} />
        <meshStandardMaterial 
          color={0xffb300} 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Star in center */}
      <mesh position-z={1.7}>
        <circleGeometry args={[3, 5]} />
        <meshStandardMaterial color={0xfff59d} />
      </mesh>
    </group>
  );
}
