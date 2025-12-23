import { useRef } from 'react';
import * as THREE from 'three';
import { tileSize } from '../constants';
import { useVehicleAnimation } from '../hooks/useVehicleAnimation';
import { useHitDetection } from '../hooks/useHitDetection';

interface CarProps {
  rowIndex: number;
  initialTileIndex: number;
  direction: boolean;
  speed: number;
  color: number;
}

export function Car({ rowIndex, initialTileIndex, direction, speed, color }: CarProps) {
  const car = useRef<THREE.Group>(null);
  useVehicleAnimation(car, direction, speed);
  useHitDetection(car, rowIndex);

  // Generate a complementary darker shade for details
  const darkerColor = color - 0x202020;

  return (
    <group
      position-x={initialTileIndex * tileSize}
      rotation-z={direction ? 0 : Math.PI}
      ref={car}
    >
      {/* Main body */}
      <mesh position={[0, 0, 12]} castShadow>
        <boxGeometry args={[60, 32, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      
      {/* Hood */}
      <mesh position={[22, 0, 10]} castShadow>
        <boxGeometry args={[16, 30, 10]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      
      {/* Cabin/Windows */}
      <mesh position={[-4, 0, 26]} castShadow>
        <boxGeometry args={[36, 26, 14]} />
        <meshStandardMaterial color={0x87ceeb} roughness={0.1} metalness={0.5} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[-4, 0, 34]} castShadow>
        <boxGeometry args={[32, 28, 4]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      
      {/* Front bumper */}
      <mesh position={[32, 0, 6]} castShadow>
        <boxGeometry args={[6, 34, 8]} />
        <meshStandardMaterial color={0x333333} roughness={0.7} />
      </mesh>
      
      {/* Rear bumper */}
      <mesh position={[-32, 0, 6]} castShadow>
        <boxGeometry args={[6, 34, 8]} />
        <meshStandardMaterial color={0x333333} roughness={0.7} />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[32, 10, 10]}>
        <boxGeometry args={[4, 6, 6]} />
        <meshStandardMaterial color={0xfffacd} emissive={0xffff88} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[32, -10, 10]}>
        <boxGeometry args={[4, 6, 6]} />
        <meshStandardMaterial color={0xfffacd} emissive={0xffff88} emissiveIntensity={0.3} />
      </mesh>
      
      {/* Taillights */}
      <mesh position={[-32, 10, 10]}>
        <boxGeometry args={[4, 6, 6]} />
        <meshStandardMaterial color={0xff0000} emissive={0xff0000} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-32, -10, 10]}>
        <boxGeometry args={[4, 6, 6]} />
        <meshStandardMaterial color={0xff0000} emissive={0xff0000} emissiveIntensity={0.4} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-18, 17, 6]} castShadow>
        <boxGeometry args={[14, 6, 14]} />
        <meshStandardMaterial color={0x1a1a1a} roughness={0.9} />
      </mesh>
      <mesh position={[-18, -17, 6]} castShadow>
        <boxGeometry args={[14, 6, 14]} />
        <meshStandardMaterial color={0x1a1a1a} roughness={0.9} />
      </mesh>
      <mesh position={[18, 17, 6]} castShadow>
        <boxGeometry args={[14, 6, 14]} />
        <meshStandardMaterial color={0x1a1a1a} roughness={0.9} />
      </mesh>
      <mesh position={[18, -17, 6]} castShadow>
        <boxGeometry args={[14, 6, 14]} />
        <meshStandardMaterial color={0x1a1a1a} roughness={0.9} />
      </mesh>
      
      {/* Wheel hubcaps */}
      <mesh position={[-18, 20, 6]}>
        <boxGeometry args={[8, 2, 8]} />
        <meshStandardMaterial color={0xc0c0c0} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-18, -20, 6]}>
        <boxGeometry args={[8, 2, 8]} />
        <meshStandardMaterial color={0xc0c0c0} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[18, 20, 6]}>
        <boxGeometry args={[8, 2, 8]} />
        <meshStandardMaterial color={0xc0c0c0} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[18, -20, 6]}>
        <boxGeometry args={[8, 2, 8]} />
        <meshStandardMaterial color={0xc0c0c0} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
