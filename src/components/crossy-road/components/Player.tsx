import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayerAnimation } from '../hooks/usePlayerAnimation';
import { setRef } from '../stores/player';

export function Player() {
  const player = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);

  usePlayerAnimation(player);

  useEffect(() => {
    if (!player.current) return;

    // Attach the camera to the player
    player.current.add(camera);

    // Set the player reference in the store
    setRef(player.current);
  }, [camera]);

  return (
    <group ref={player}>
      <group position-z={15}>
        {/* Main body */}
        <mesh position={[0, 0, 12]} castShadow>
          <boxGeometry args={[18, 18, 22]} />
          <meshLambertMaterial color={0xffffff} />
        </mesh>
        
        {/* Wings */}
        <mesh position={[-11, 0, 10]} castShadow>
          <boxGeometry args={[6, 14, 12]} />
          <meshLambertMaterial color={0xf5f5f5} />
        </mesh>
        <mesh position={[11, 0, 10]} castShadow>
          <boxGeometry args={[6, 14, 12]} />
          <meshLambertMaterial color={0xf5f5f5} />
        </mesh>
        
        {/* Beak */}
        <mesh position={[0, 12, 14]} castShadow>
          <boxGeometry args={[8, 8, 6]} />
          <meshLambertMaterial color={0xff8c00} />
        </mesh>
        
        {/* Comb */}
        <mesh position={[0, 0, 25]} castShadow>
          <boxGeometry args={[6, 6, 8]} />
          <meshLambertMaterial color={0xdc143c} />
        </mesh>
        <mesh position={[-4, 0, 23]} castShadow>
          <boxGeometry args={[4, 4, 5]} />
          <meshLambertMaterial color={0xdc143c} />
        </mesh>
        <mesh position={[4, 0, 23]} castShadow>
          <boxGeometry args={[4, 4, 5]} />
          <meshLambertMaterial color={0xdc143c} />
        </mesh>
        
        {/* Wattle */}
        <mesh position={[0, 10, 8]} castShadow>
          <boxGeometry args={[4, 4, 6]} />
          <meshLambertMaterial color={0xdc143c} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-5, 10, 18]}>
          <boxGeometry args={[4, 3, 5]} />
          <meshLambertMaterial color={0x000000} />
        </mesh>
        <mesh position={[5, 10, 18]}>
          <boxGeometry args={[4, 3, 5]} />
          <meshLambertMaterial color={0x000000} />
        </mesh>
        
        {/* Eye highlights */}
        <mesh position={[-4, 11, 19]}>
          <boxGeometry args={[2, 1, 2]} />
          <meshLambertMaterial color={0xffffff} />
        </mesh>
        <mesh position={[6, 11, 19]}>
          <boxGeometry args={[2, 1, 2]} />
          <meshLambertMaterial color={0xffffff} />
        </mesh>
        
        {/* Feet */}
        <mesh position={[-5, 8, 0]}>
          <boxGeometry args={[4, 10, 3]} />
          <meshLambertMaterial color={0xff8c00} />
        </mesh>
        <mesh position={[5, 8, 0]}>
          <boxGeometry args={[4, 10, 3]} />
          <meshLambertMaterial color={0xff8c00} />
        </mesh>
      </group>
    </group>
  );
}
