import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneContentProps {
  reducedMotion: boolean;
}

const MonochromaticOrbitalCore: React.FC<SceneContentProps> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerPolyRef = useRef<THREE.Group>(null);

  // Mouse parallax interpolation targets
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.25;
      mouseRef.current.targetY = ny * 0.25;
    };

    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY * 0.0012;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      // Static elegant pose
      groupRef.current.rotation.x = 0.25;
      groupRef.current.rotation.y = 0.45;
      return;
    }

    // Smooth lerp for mouse parallax
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
    scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;

    // Ambient continuous rotations
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.12;
      outerRingRef.current.rotation.x = 1.1 + mouseRef.current.y * 0.2;
      outerRingRef.current.rotation.y = mouseRef.current.x * 0.2;
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.z -= delta * 0.16;
      midRingRef.current.rotation.x = 0.5 - mouseRef.current.y * 0.15;
      midRingRef.current.rotation.y = 0.8 + mouseRef.current.x * 0.15;
    }

    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.y += delta * 0.2;
      innerPolyRef.current.rotation.x += delta * 0.1;
    }

    // Subtly apply overall tilt and vertical scroll parallax
    groupRef.current.position.y = -scrollRef.current.y * 0.8;
    groupRef.current.rotation.y = mouseRef.current.x * 0.4;
    groupRef.current.rotation.x = -mouseRef.current.y * 0.3;
  });

  return (
    <group ref={groupRef} position={[1.8, -0.1, 0]}>
      {/* Neutral white directional & ambient lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[4, 5, 4]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={0.2} color="#ffffff" />

      {/* Central geometric low-poly faceted form */}
      <group ref={innerPolyRef}>
        {/* Dark matte core surface */}
        <mesh>
          <icosahedronGeometry args={[1.05, 0]} />
          <meshStandardMaterial
            color="#0D0D0D"
            roughness={0.9}
            metalness={0.1}
            polygonOffset
            polygonOffsetFactor={1}
            polygonOffsetUnits={1}
          />
        </mesh>
        {/* Crisp white wireframe overlay */}
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1.05, 0)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.35} />
        </lineSegments>

        {/* Secondary nested octahedron */}
        <lineSegments>
          <edgesGeometry args={[new THREE.OctahedronGeometry(0.68, 0)]} />
          <lineBasicMaterial color="#71717A" transparent opacity={0.45} />
        </lineSegments>
      </group>

      {/* Outer thin orbital ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>

      {/* Mid orbital ring */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[1.65, 0.006, 16, 80]} />
        <meshBasicMaterial color="#A1A1AA" transparent opacity={0.2} />
      </mesh>

      {/* Subtle dotted orbital markers (3 vertices around perimeter) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                2.1, 0, 0,
                -2.1, 0, 0,
                0, 2.1, 0,
                0, -2.1, 0,
                1.48, 1.48, 0,
                -1.48, -1.48, 0
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.035} transparent opacity={0.4} />
      </points>
    </group>
  );
};

export const ThreeScene: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Screen size detection for mobile positioning
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40 sm:opacity-55 transition-opacity duration-700"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        aria-hidden="true"
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [0, 0, isMobile ? 6.8 : 5.8],
          fov: 45,
          near: 0.1,
          far: 50,
        }}
        className="w-full h-full pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
        <MonochromaticOrbitalCore reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
