'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function SciFiDrone({ targetPosition }: { targetPosition?: [number, number, number] | null }) {
    const groupRef = useRef<THREE.Group>(null);
    const eyeRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const scannerRef = useRef<THREE.Mesh>(null);

    // Basic materials reused for efficiency
    const materials = useMemo(() => ({
        hull: new THREE.MeshStandardMaterial({
            color: '#08142b', // Deep tech blue 
            metalness: 0.9,
            roughness: 0.2,
            wireframe: false
        }),
        accent: new THREE.MeshStandardMaterial({
            color: '#00d4ff',
            emissive: '#00d4ff',
            emissiveIntensity: 0.5,
            wireframe: true
        }),
        eye: new THREE.MeshBasicMaterial({ color: '#ff1493' }), // Pink scanning eye
        glass: new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            transmission: 0.9,
            opacity: 1,
            metalness: 0,
            roughness: 0,
            ior: 1.5,
            thickness: 0.5
        })
    }), []);

    // Physics constants for lookAt interpolations
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Ensure scanner material is correctly casted
        const scannerMaterial = scannerRef.current?.material as THREE.MeshBasicMaterial | undefined;

        if (targetPosition) {
            // Target is active, calculate look direction.
            // Three Object3D.lookAt points the local -Z axis at the target.
            // Our drone's scanner is aligned along the +Z axis (z=1.5).
            // So we look at the inverse vector to aim +Z at the target.
            const [x, y, z] = targetPosition;
            dummy.position.set(0, 0, 0);

            // Our drone was modelled facing +Z.
            // lookAt points -Z towards the target.
            // Looking at the exact opposite coordinate forces the +Z face to aim at the target.
            dummy.lookAt(new THREE.Vector3(-x, -y, -z));

            targetQuaternion.copy(dummy.quaternion);

            // Smoothly slerp the drone towards the target
            groupRef.current.quaternion.slerp(targetQuaternion, delta * 6);

            // Pulse the scanner beam intensely
            if (scannerMaterial) {
                scannerMaterial.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 30) * 0.15;
            }

            // Spin inner rings faster to indicate scanning
            if (ringRef.current) {
                ringRef.current.rotation.z += delta * 4;
                ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 20) * 0.05); // slight pulsing scale
            }
        } else {
            // Idle state: Slowly hover and scan the room by rotating Y-axis
            dummy.position.set(0, 0, 0);
            dummy.rotation.set(0, state.clock.elapsedTime * 0.4, 0); // Continuous slow spin

            // Add a little bit of idle tilt
            dummy.rotateX(Math.sin(state.clock.elapsedTime * 0.5) * 0.2);

            targetQuaternion.copy(dummy.quaternion);
            groupRef.current.quaternion.slerp(targetQuaternion, delta * 2);

            // Dim the scanner
            if (scannerMaterial) {
                scannerMaterial.opacity = 0.15;
            }

            // Normal ring rotation
            if (ringRef.current) {
                ringRef.current.rotation.z += delta * 1;
                ringRef.current.scale.setScalar(1); // reset scale
            }
        }
    });

    // Drone geometry components
    return (
        <group ref={groupRef} scale={1.5}>
            {/* The Float wrapper gives it that hovering/breathing effect independent of our rotations */}
            <Float
                speed={2} // Animation speed
                rotationIntensity={0} // Let our useFrame handle rotation explicitly
                floatIntensity={1} // Up/down float intensity
                floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within
            >
                {/* Core Body (Octahedron for sci-fi look) */}
                <mesh material={materials.hull}>
                    <octahedronGeometry args={[1, 1]} />
                </mesh>

                {/* Wireframe Shield/Shell */}
                <mesh material={materials.accent} scale={1.1}>
                    <icosahedronGeometry args={[1, 1]} />
                </mesh>

                {/* Rotating Inner Ring */}
                <mesh ref={ringRef} material={materials.accent} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.5, 0.02, 16, 100]} />
                </mesh>

                {/* Central 'Eye' Core */}
                <mesh ref={eyeRef} position={[0, 0, 0.9]} material={materials.eye}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                </mesh>

                {/* Glass Dome over eye */}
                <mesh position={[0, 0, 0.9]} material={materials.glass}>
                    <sphereGeometry args={[0.25, 32, 32]} />
                </mesh>

                {/* Scanner Beam (Cone pushing out from the eye) */}
                <mesh ref={scannerRef} position={[0, 0, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.6, 1.8, 32, 1, true]} />
                    <meshBasicMaterial
                        color="#00d4ff" // Shifted to cyan for the main beam
                        transparent
                        opacity={0.15}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </Float>
        </group>
    );
}
