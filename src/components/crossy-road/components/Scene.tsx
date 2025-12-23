import { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneProps {
  children: ReactNode;
}

export function Scene({ children }: SceneProps) {
  return (
    <Canvas
      orthographic={true}
      shadows
      camera={{
        up: [0, 0, 1],
        position: [250, -200, 350],
        zoom: 1.4,
        near: -1000,
        far: 2000,
      }}
      gl={{ 
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      }}
      dpr={[1, 2]}
    >
      {/* Ambient light for soft overall illumination */}
      <ambientLight intensity={0.6} />
      
      {/* Main directional light (sun) with shadows */}
      <directionalLight 
        position={[-100, -100, 250]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={800}
        shadow-camera-left={-300}
        shadow-camera-right={300}
        shadow-camera-top={300}
        shadow-camera-bottom={-300}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight 
        position={[150, 150, 100]} 
        intensity={0.4}
      />
      
      {/* Rim light for edge definition */}
      <directionalLight 
        position={[0, 200, 50]} 
        intensity={0.3}
      />
      
      {/* Hemisphere light for sky/ground ambient */}
      <hemisphereLight args={[0x87ceeb, 0x90EE90, 0.5]} />
      
      {/* Soft fog for depth perception */}
      <fog attach="fog" args={[0x87ceeb, 600, 1400]} />
      
      {children}
    </Canvas>
  );
}
