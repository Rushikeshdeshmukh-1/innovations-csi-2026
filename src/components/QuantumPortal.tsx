'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, Icosahedron, Octahedron, Dodecahedron, MeshTransmissionMaterial, Sparkles, Billboard } from '@react-three/drei';
import * as THREE from 'three';

export default function QuantumPortal({ isHovered }: { isHovered: boolean }) {
    const entanglementGroup = useRef<THREE.Group>(null);
    const shape1 = useRef<THREE.Mesh>(null);
    const shape2 = useRef<THREE.Mesh>(null);
    const shape3 = useRef<THREE.Mesh>(null);
    const innerLight = useRef<THREE.PointLight>(null);
    const coreGlow = useRef<THREE.Mesh>(null);

    // Smooth interpolators
    const speed = useRef(1);
    const intensity = useRef(1);

    useFrame((state, delta) => {
        const targetSpeed = isHovered ? 4 : 1;
        const targetIntensity = isHovered ? 3 : 1; // Limit intensity for the shader

        speed.current = THREE.MathUtils.lerp(speed.current, targetSpeed, delta * 3);
        intensity.current = THREE.MathUtils.lerp(intensity.current, targetIntensity, delta * 4);

        if (entanglementGroup.current) {
            // Elegant, slow gravitational drift
            entanglementGroup.current.rotation.y = state.clock.elapsedTime * 0.15;
            entanglementGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

            // Pulse the bounds mildly
            const scale = 1 + (intensity.current - 1) * 0.04;
            entanglementGroup.current.scale.setScalar(scale);
        }

        // Throbbing custom shader dot
        if (coreGlow.current && coreGlow.current.material) {
            const material = coreGlow.current.material as THREE.ShaderMaterial;
            material.uniforms.uIntensity.value = intensity.current;
            material.uniforms.uTime.value = state.clock.elapsedTime;
        }

        // Each crystalline structure rotates independently to fracture the light
        if (shape1.current) {
            shape1.current.rotation.x += delta * 0.4 * speed.current;
            shape1.current.rotation.y += delta * 0.5 * speed.current;
        }
        if (shape2.current) {
            shape2.current.rotation.y -= delta * 0.3 * speed.current;
            shape2.current.rotation.z -= delta * 0.6 * speed.current;
        }
        if (shape3.current) {
            shape3.current.rotation.x -= delta * 0.2 * speed.current;
            shape3.current.rotation.z += delta * 0.4 * speed.current;
        }

        // Modulate inner light intensity
        if (innerLight.current) {
            innerLight.current.intensity = intensity.current * 3;
        }
    });

    // Custom Shader for a perfectly soft glowing radial dot (AAA Singularity)
    const glowDotShader = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color('#00ffff') },
                uIntensity: { value: 1.0 },
                uTime: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColor;
                uniform float uIntensity;
                uniform float uTime;
                varying vec2 vUv;
                void main() {
                    // Center the UV coordinates (-0.5 to 0.5)
                    vec2 centerUv = vUv - vec2(0.5);
                    float dist = length(centerUv);
                    
                    // Create a very sharp hot center and a soft, wide falloff
                    float core = exp(-dist * 20.0);       // Dense white-hot center
                    float halo = exp(-dist * 4.0);       // Soft colored spread
                    
                    // Throb the halo slightly
                    float throb = 1.0 + sin(uTime * 8.0) * 0.1;
                    
                    vec3 finalColor = mix(uColor * halo * uIntensity * throb, vec3(1.0, 1.0, 1.0), core);
                    
                    // Soft fade out to edge
                    float alpha = smoothstep(0.5, 0.0, dist);
                    
                    gl_FragColor = vec4(finalColor, alpha * (core + halo) * 1.5);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false // Punch straight through all glass layers
        });
    }, []);

    return (
        <group>
            {/* Bright environment block to define sharp glassy edges */}
            <Environment preset="city" />

            {/* Strong rim lights and general ambient to kill the "opaque/dark" look */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 10, -5]} intensity={4} color="#ffffff" />
            <directionalLight position={[-5, -10, 5]} intensity={3} color="#00d4ff" />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                <group ref={entanglementGroup} scale={1.8}>

                    {/* The Pure Shader Glow Dot Singularity */}
                    {/* RenderOrder 1 guarantees it draws ON TOP of the transmission glass passes */}
                    <Billboard renderOrder={1}>
                        <mesh ref={coreGlow} material={glowDotShader}>
                            {/* Smaller plane to significantly reduce the size of the glowing dot */}
                            <planeGeometry args={[0.7, 0.7]} />
                        </mesh>
                    </Billboard>

                    <pointLight ref={innerLight} color="#00ffff" distance={6} decay={1.5} />

                    {/* AAA Glass Level 1: Inner Octahedron (Hyper-Clear Crystal) */}
                    <Octahedron ref={shape1} args={[0.9]}>
                        <MeshTransmissionMaterial
                            backside
                            samples={4}
                            thickness={0.2} /* Reduced thickness so it's less dense/opaque */
                            chromaticAberration={0.05}
                            ior={1.2} /* Lower IOR means less severe bending, more clarity */
                            color="#ffffff"
                            roughness={0} /* Zero roughness = perfectly clear glass */
                            transmission={1} /* Full transmission */
                            clearcoat={1}
                        />
                    </Octahedron>

                    {/* AAA Glass Level 2: Middle Icosahedron (Sharp Blue Reflective Shell) */}
                    <Icosahedron ref={shape2} args={[1.4]}>
                        <MeshTransmissionMaterial
                            backside
                            samples={4}
                            thickness={0.1}
                            chromaticAberration={0.02}
                            ior={1.1}
                            color="#b3f0ff"
                            roughness={0}
                            transmission={0.98}
                            clearcoat={1}
                        />
                    </Icosahedron>

                    {/* AAA Wireframe Cage Level 3: Outer Dodecahedron (Structural Cage) */}
                    <Dodecahedron ref={shape3} args={[1.9]}>
                        <meshPhysicalMaterial
                            color="#00ffff"
                            metalness={0.9}
                            roughness={0.1}
                            wireframe={true}
                            transparent={true}
                            opacity={isHovered ? 0.9 : 0.5}
                            emissive="#00bfff" /* Add a slight glow so the wireframe is very visible */
                            emissiveIntensity={isHovered ? 2 : 0.5}
                        />
                    </Dodecahedron>

                    {/* Highly visible energy particles trapped inside the glass */}
                    <Sparkles count={80} scale={2.5} size={2} speed={1.5} opacity={isHovered ? 0.9 : 0.4} color="#00ffff" />

                    {/* Grand ambient halo */}
                    <Sphere args={[2.6, 32, 32]}>
                        <meshBasicMaterial
                            color="#0088cc"
                            transparent
                            opacity={isHovered ? 0.06 : 0.02}
                            blending={THREE.AdditiveBlending}
                            side={THREE.BackSide}
                        />
                    </Sphere>

                </group>
            </Float>
        </group>
    );
}
