import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

/**
 * A simple 3D avatar consisting of a head and a mouth.  The mouth scales
 * vertically to simulate jaw movement when the host is speaking.  Colours
 * correspond to the host’s accent colour.  For more advanced avatars, swap
 * this geometry with your own GLTF/VRM model and hook up proper viseme
 * animation via the lipSyncEngine.
 */
function AvatarMesh({ color = '#00FFC6', isSpeaking = false }) {
  const mouthRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // When speaking, animate the mouth open/close; otherwise keep it mostly closed
    const openness = isSpeaking ? (Math.sin(t * 5) + 1) / 3 + 0.05 : 0.02;
    if (mouthRef.current) {
      mouthRef.current.scale.y = openness;
    }
  });
  return (
    <group position={[0, -0.1, 0]}>
      {/* Head */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 0.45, 0.45]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 0.45, 0.45]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.1, 0.45]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function HostAvatar({ hostId, hostColor, isSpeaking = false, label }) {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div
        className={`rounded-full p-1 transition-all duration-300 ${isSpeaking ? 'ring-4 ring-neon-teal/60' : ''}`}
      >
        <div className="w-40 h-40">{/* Canvas is fixed at 160px high */}
          <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={0.8} />
            <AvatarMesh color={hostColor} isSpeaking={isSpeaking} />
          </Canvas>
        </div>
      </div>
      {label && (
        <div className="text-center mt-1 text-sm font-medium">
          {label}
        </div>
      )}
    </div>
  );
}