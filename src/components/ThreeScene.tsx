import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export interface ThreeSceneProps {
  variant?: 'hero' | 'default';
}

interface OrbitalCoreProps {
  reducedMotion: boolean;
  lowPower: boolean;
  isMobile: boolean;
}

const OrbitalWireframeStructure: React.FC<OrbitalCoreProps> = ({
  reducedMotion,
  lowPower,
  isMobile,
}) => {
  const group = useRef<THREE.Group>(null);

  // Configuration for 5-7 elliptical circular wireframe rings
  const ringConfigs = useMemo(() => {
    const count = lowPower ? 4 : 6;
    const pointsPerRing = lowPower ? 16 : 24;
    
    // Radii, tilts, colors and opacities matching 3DFX specification
    const baseConfigs = [
      { rx: 1.85, rz: 1.70, rotX: 1.15, rotZ: 0.12, yOffset: -0.22, color: '#FFFFFF', opacity: 0.45 },
      { rx: 2.25, rz: 2.10, rotX: 0.45, rotZ: -0.35, yOffset: 0.10, color: '#71717A', opacity: 0.35 },
      { rx: 2.65, rz: 2.45, rotX: -0.75, rotZ: 0.50, yOffset: -0.05, color: '#FFFFFF', opacity: 0.30 },
      { rx: 1.45, rz: 1.35, rotX: 0.85, rotZ: -0.65, yOffset: 0.28, color: '#A1A1AA', opacity: 0.40 },
      { rx: 2.95, rz: 2.70, rotX: -0.30, rotZ: 0.25, yOffset: -0.35, color: '#71717A', opacity: 0.25 },
      { rx: 3.25, rz: 3.00, rotX: 1.40, rotZ: -0.18, yOffset: 0.15, color: '#FFFFFF', opacity: 0.22 },
    ];

    return baseConfigs.slice(0, count).map((cfg) => {
      const points: THREE.Vector3[] = [];
      for (let j = 0; j < pointsPerRing; j++) {
        const angle = (j / pointsPerRing) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * cfg.rx, 0, Math.sin(angle) * cfg.rz));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return { ...cfg, geometry };
    });
  }, [lowPower]);

  // Clean up geometries on unmount
  useEffect(() => {
    return () => {
      ringConfigs.forEach((r) => r.geometry.dispose());
    };
  }, [ringConfigs]);

  // Frame animation: ~0.08 rad/s Y-axis rotation with subtle pointer lerp
  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;

    // Slow ambient rotation around Y axis
    group.current.rotation.y += delta * 0.08;

    // Subtle pointer parallax with smooth interpolation
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.12,
      0.04
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.08,
      0.04
    );
  });

  const sceneScale = isMobile ? 0.72 : 1.0;
  const scenePosition: [number, number, number] = isMobile ? [0.6, -0.15, 0] : [2.1, 0, 0];

  return (
    <group ref={group} position={scenePosition} scale={[sceneScale, sceneScale, sceneScale]}>
      {/* Neutral white lighting */}
      <ambientLight intensity={0.25} color="#FFFFFF" />
      <directionalLight position={[4, 5, 4]} intensity={0.7} color="#FFFFFF" />

      <Float
        speed={reducedMotion ? 0 : 0.8}
        rotationIntensity={reducedMotion ? 0 : 0.12}
        floatIntensity={reducedMotion ? 0 : 0.18}
      >
        {/* Low-poly faceted core: dark matte surface + white/gray wireframe */}
        <group>
          <mesh>
            <icosahedronGeometry args={[lowPower ? 0.75 : 0.9, 0]} />
            <meshStandardMaterial
              color="#0D0D0D"
              roughness={0.95}
              metalness={0.05}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.IcosahedronGeometry(lowPower ? 0.75 : 0.9, 0)]} />
            <lineBasicMaterial color="#FFFFFF" transparent opacity={0.32} />
          </lineSegments>
          {!lowPower && (
            <lineSegments>
              <edgesGeometry args={[new THREE.OctahedronGeometry(0.55, 0)]} />
              <lineBasicMaterial color="#71717A" transparent opacity={0.4} />
            </lineSegments>
          )}
        </group>

        {/* 5-7 Elliptical circular wireframe rings */}
        {ringConfigs.map((ring, idx) => (
          <lineLoop
            key={idx}
            geometry={ring.geometry}
            rotation={[ring.rotX, 0, ring.rotZ]}
            position={[0, ring.yOffset, 0]}
          >
            <lineBasicMaterial
              color={ring.color}
              transparent
              opacity={ring.opacity}
              linewidth={1}
            />
          </lineLoop>
        ))}

        {/* Minimal technical orbital nodes */}
        {!lowPower && (
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    1.85, 0, 0,
                    -1.85, 0, 0,
                    0, 0.1, 2.25,
                    0, -0.05, -2.65,
                    1.2, 0.28, 0.8,
                    -1.4, -0.35, -1.0,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <pointsMaterial color="#FFFFFF" size={0.04} transparent opacity={0.45} />
          </points>
        )}

        {/* Subtle monochrome sparkles only on capable devices */}
        {!lowPower && !reducedMotion && (
          <Sparkles
            count={16}
            scale={5.5}
            size={1.2}
            speed={0.25}
            opacity={0.25}
            color="#FFFFFF"
          />
        )}
      </Float>
    </group>
  );
};

export const ThreeScene: React.FC<ThreeSceneProps> = ({ variant: _variant = 'hero' }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    // Media query for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Responsive screen detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Low power detection
    const nav = navigator as any;
    const isLowPowerDevice = Boolean(
      (nav.deviceMemory && nav.deviceMemory <= 4) ||
      (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4)
    );
    setLowPower(isLowPowerDevice);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`w-full h-full pointer-events-none select-none transition-opacity duration-700 ${
        isMobile ? 'opacity-45' : 'opacity-80'
      }`}
    >
      <Canvas
        aria-hidden="true"
        dpr={[1, lowPower ? 1.25 : 1.75]}
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
        <OrbitalWireframeStructure
          reducedMotion={reducedMotion}
          lowPower={lowPower}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
