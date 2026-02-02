import { useRef } from 'react';
import * as THREE from 'three';
import { tileSize } from '../constants';
import { useVehicleAnimation } from '../hooks/useVehicleAnimation';
import { useHitDetection } from '../hooks/useHitDetection';

interface TruckProps {
  rowIndex: number;
  initialTileIndex: number;
  direction: boolean;
  speed: number;
  color: number;
}

export function Truck({ rowIndex, initialTileIndex, direction, speed, color }: TruckProps) {
  const truck = useRef<THREE.Group>(null);
  useVehicleAnimation(truck, direction, speed);
  useHitDetection(truck, rowIndex);

  return (
    <group
      position-x={initialTileIndex * tileSize}
      rotation-z={direction ? Math.PI : 0}
      ref={truck}
    >
      {/* Cargo container */}
      <mesh position={[12, 0, 28]} castShadow>
        <boxGeometry args={[75, 36, 45]} />
        <meshLambertMaterial color={color} />
      </mesh>
      
      {/* Cargo container details */}
      <mesh position={[12, 19, 28]}>
        <boxGeometry args={[73, 2, 43]} />
        <meshLambertMaterial color={0x333333} />
      </mesh>
      <mesh position={[12, -19, 28]}>
        <boxGeometry args={[73, 2, 43]} />
        <meshLambertMaterial color={0x333333} />
      </mesh>
      
      {/* Cabin */}
      <mesh position={[-38, 0, 22]} castShadow>
        <boxGeometry args={[28, 34, 34]} />
        <meshLambertMaterial color={0x2ecc71} />
      </mesh>
      
      {/* Cabin roof */}
      <mesh position={[-38, 0, 42]} castShadow>
        <boxGeometry args={[26, 32, 6]} />
        <meshLambertMaterial color={0x27ae60} />
      </mesh>
      
      {/* Windshield */}
      <mesh position={[-25, 0, 28]}>
        <boxGeometry args={[4, 28, 20]} />
        <meshLambertMaterial color={0x87ceeb} />
      </mesh>
      
      {/* Front grille */}
      <mesh position={[-53, 0, 18]} castShadow>
        <boxGeometry args={[4, 30, 24]} />
        <meshLambertMaterial color={0x333333} />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[-54, 12, 18]}>
        <boxGeometry args={[3, 8, 8]} />
        <meshLambertMaterial color={0xfffacd} />
      </mesh>
      <mesh position={[-54, -12, 18]}>
        <boxGeometry args={[3, 8, 8]} />
        <meshLambertMaterial color={0xfffacd} />
      </mesh>
      
      {/* Wheels - front */}
      <mesh position={[-40, 18, 8]} castShadow>
        <boxGeometry args={[16, 8, 16]} />
        <meshLambertMaterial color={0x1a1a1a} />
      </mesh>
      <mesh position={[-40, -18, 8]} castShadow>
        <boxGeometry args={[16, 8, 16]} />
        <meshLambertMaterial color={0x1a1a1a} />
      </mesh>
      
      {/* Wheels - back (dual) */}
      <mesh position={[30, 18, 8]} castShadow>
        <boxGeometry args={[20, 10, 16]} />
        <meshLambertMaterial color={0x1a1a1a} />
      </mesh>
      <mesh position={[30, -18, 8]} castShadow>
        <boxGeometry args={[20, 10, 16]} />
        <meshLambertMaterial color={0x1a1a1a} />
      </mesh>
      
      {/* Mud flaps */}
      <mesh position={[42, 16, 12]}>
        <boxGeometry args={[4, 2, 20]} />
        <meshLambertMaterial color={0x1a1a1a} />
      </mesh>
      <mesh position={[42, -16, 12]}>
        <boxGeometry args={[4, 2, 20]} />
        <meshLambertMaterial color={0x1a1a1a} />
      </mesh>
    </group>
  );
}
