'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchButton from './GlitchButton';
import SecurityDrone from './SecurityDrone';

/* ============ WIREFRAME GEAR — CLEAN LINES ONLY ============ */
function GearWireframe() {
    const groupRef = useRef<THREE.Group>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    const gearShape = useMemo(() => {
        const shape = new THREE.Shape();
        const teeth = 18;
        const innerR = 2.0;
        const outerR = 2.5;

        for (let i = 0; i < teeth; i++) {
            const a0 = (i / teeth) * Math.PI * 2;
            const a1 = a0 + (0.25 / teeth) * Math.PI * 2;
            const a2 = a0 + (0.5 / teeth) * Math.PI * 2;
            const a3 = a0 + (0.75 / teeth) * Math.PI * 2;
            const a4 = ((i + 1) / teeth) * Math.PI * 2;

            const pts: [number, number][] = [
                [Math.cos(a0) * innerR, Math.sin(a0) * innerR],
                [Math.cos(a1) * outerR, Math.sin(a1) * outerR],
                [Math.cos(a2) * (outerR + 0.08), Math.sin(a2) * (outerR + 0.08)],
                [Math.cos(a3) * outerR, Math.sin(a3) * outerR],
                [Math.cos(a4) * innerR, Math.sin(a4) * innerR],
            ];

            if (i === 0) shape.moveTo(pts[0][0], pts[0][1]);
            pts.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
        }
        shape.closePath();

        const hole = new THREE.Path();
        hole.absellipse(0, 0, 0.8, 0.8, 0, Math.PI * 2, true, 0);
        shape.holes.push(hole);

        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const lh = new THREE.Path();
            lh.absellipse(Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0.18, 0.18, 0, Math.PI * 2, true, 0);
            shape.holes.push(lh);
        }

        return shape;
    }, []);

    const particlePositions = useMemo(() => {
        const positions = new Float32Array(120 * 3);
        for (let i = 0; i < 120; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 4;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = (r * Math.cos(phi)) * 0.5;
        }
        return positions;
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) groupRef.current.rotation.z += 0.002;
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z -= 0.004;
            ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.06;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z += 0.003;
            ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.04;
        }
        if (ring3Ref.current) ring3Ref.current.rotation.z -= 0.001;
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.rotation.x += 0.0003;
        }
    });

    const extrudeSettings = {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.03,
        bevelSegments: 2,
    };

    return (
        <group>
            {/* Main gear — wireframe lines only, no fill */}
            <group ref={groupRef}>
                <mesh>
                    <extrudeGeometry args={[gearShape, extrudeSettings]} />
                    <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.5} />
                </mesh>

                {/* Solid edge outlines for crisp blueprint lines */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.ExtrudeGeometry(gearShape, extrudeSettings)]} />
                    <lineBasicMaterial color="#00d4ff" transparent opacity={0.3} />
                </lineSegments>

                {/* Inner detail rings */}
                {[0.95, 1.15, 1.65].map((r, i) => (
                    <mesh key={r} position={[0, 0, 0.2]}>
                        <torusGeometry args={[r, 0.012, 6, 64]} />
                        <meshBasicMaterial color="#00d4ff" transparent opacity={0.4 - i * 0.08} />
                    </mesh>
                ))}

                {/* Cross-spokes */}
                {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i / 6) * Math.PI * 2;
                    return (
                        <mesh key={i} position={[0, 0, 0.2]} rotation={[0, 0, angle]}>
                            <boxGeometry args={[0.02, 1.2, 0.02]} />
                            <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
                        </mesh>
                    );
                })}
            </group>

            {/* Orbiting ring 1 — gold */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[3.3, 0.02, 16, 100]} />
                <meshBasicMaterial color="#FFBE0B" transparent opacity={0.45} />
            </mesh>

            {/* Orbiting ring 2 — cyan */}
            <mesh ref={ring2Ref}>
                <torusGeometry args={[3.8, 0.015, 16, 100]} />
                <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
            </mesh>

            {/* Outer faint ring */}
            <mesh ref={ring3Ref}>
                <torusGeometry args={[4.3, 0.008, 8, 120]} />
                <meshBasicMaterial color="#00d4ff" transparent opacity={0.12} />
            </mesh>

            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * Math.PI * 2;
                const isMajor = i % 5 === 0;
                const r1 = 3.0;
                const r2 = isMajor ? 3.6 : 3.2;
                return (
                    <line key={i}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                args={[new Float32Array([
                                    Math.cos(angle) * r1, Math.sin(angle) * r1, 0,
                                    Math.cos(angle) * r2, Math.sin(angle) * r2, 0,
                                ]), 3]}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#00d4ff" transparent opacity={isMajor ? 0.4 : 0.12} />
                    </line>
                );
            })}

            {/* Floating particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
                </bufferGeometry>
                <pointsMaterial color="#00d4ff" size={0.04} transparent opacity={0.4} sizeAttenuation />
            </points>

            <ambientLight intensity={0.08} color="#0a1530" />
        </group>
    );
}

/* ============ HUD PANEL ============ */
function HudPanel({ children, style, delay = 0 }: { children: React.ReactNode; style: React.CSSProperties; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scaleX: 0.05, height: 2 }}
            animate={{ opacity: 1, scaleX: 1, height: 'auto' }}
            transition={{
                opacity: { delay: delay + 2.8, duration: 0.1 },
                scaleX: { delay: delay + 2.8, duration: 0.2, ease: 'easeOut' },
                height: { delay: delay + 3.0, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
            }}
            whileHover={{
                x: [0, -2, 2, -1, 1, 0],
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(0, 212, 255, 0.1)'
            }}
            className="holo-panel"
            style={{
                padding: '0.7rem 0.9rem',
                fontSize: '0.58rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                lineHeight: 1.8,
                overflow: 'hidden',
                ...style,
            }}
        >
            <motion.div
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: delay + 3.4, duration: 0.4 }}
            >
                <motion.div
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ delay: delay + 3.4, duration: 0.6, ease: 'linear' }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function HeroSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                // Background handled globally in layout/globals.css
            }}
        >
            {/* 3D Canvas — CSS filter gives lines a subtle radiant glow */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.5)) drop-shadow(0 0 20px rgba(0,212,255,0.15))',
            }}>
                <Canvas
                    camera={{ position: [0, 0, 9], fov: 42 }}
                    gl={{ alpha: true, antialias: true }}
                    style={{ background: 'transparent' }}
                >
                    {/* Gear scale reduced to 0.80 as requested */}
                    <group scale={0.80}>
                        <GearWireframe />
                    </group>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                        maxPolarAngle={Math.PI / 1.7}
                        minPolarAngle={Math.PI / 2.3}
                    />
                </Canvas>
            </div>

            {/* Interactive Sci-Fi Target Overlay */}
            <SecurityDrone />

            {/* Center overlay */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* CSI Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.8 }}
                    style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}
                >
                    {/* Using standard img tag for simplicity in this file setup, next/image would require configuration for external domains if any */}
                    <img src="/csi-logo.png" alt="CSI Logo" style={{ width: isMobile ? '130px' : '180px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} // Increased to 1 for full visibility
                    transition={{ delay: 2.8, duration: 1 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: isMobile ? '0.75rem' : '0.85rem',
                        letterSpacing: isMobile ? '0.15em' : '0.35em',
                        color: 'var(--text-bright, #fff)', // Changed to bright white
                        marginBottom: '0.8rem',
                        textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(0,212,255,0.6)', // Stronger shadow + cyan glow
                        fontWeight: 700,
                    }}
                >
                    ◈ CSI SIES GST PRESENTS ◈
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1, ease: 'easeOut' }}
                    className="holo-text"
                    style={{
                        fontFamily: 'var(--font-header)',
                        fontSize: isMobile ? '3.5rem' : 'clamp(3rem, 10vw, 7rem)',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: 'var(--text-bright)',
                        lineHeight: 1.1,
                        marginBottom: '1rem',
                        textShadow: '0 4px 8px rgba(0,0,0,0.9)', // Added/Enhanced for visibility
                    }}
                >
                    INNOVATIONS
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} // Increased opacity for visibility
                    transition={{ delay: 3.4, duration: 0.8 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: isMobile ? '0.8rem' : '0.85rem',
                        letterSpacing: isMobile ? '0.1em' : '0.18em',
                        color: 'var(--text-bright, #fff)', // Bright white
                        marginBottom: '2.5rem',
                        padding: '0 1rem',
                        lineHeight: 1.8,
                        textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(0, 212, 255, 0.7)', // Strong drop shadow and glow
                        fontWeight: 700, // Bold
                    }}
                >
                    SYSTEM STATUS:{' '}
                    <span style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0,255,136,0.6)' }}>OPTIMAL</span>
                    {isMobile ? <br /> : ' | '}
                    DATA STREAM:{' '}
                    <span style={{ color: 'var(--accent-gold)', textShadow: '0 0 8px rgba(255,190,11,0.6)' }}>ACTIVE</span>
                    {isMobile ? <br /> : ' | '}
                    INNOVATIONS 2026
                </motion.div>

                {/* Buttons Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8, duration: 0.8 }}
                    style={{
                        pointerEvents: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        marginTop: isMobile ? '3.5rem' : '2rem',
                        transform: isMobile ? 'scale(0.85)' : 'scale(1)',
                    }}
                >
                    {/* Launch Simulation Button */}
                    <GlitchButton label="LAUNCH SIMULATION" href="#about" />
                </motion.div>
            </div>

            {/* HUD PANELS - HIDDEN ON MOBILE */}
            {!isMobile && (
                <>
                    {/* LEFT HUD panels */}
                    <HudPanel delay={0.5} style={{ position: 'absolute', left: '1.5rem', top: '18%', width: '150px', zIndex: 3 }}>
                        <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.3rem', fontSize: '0.52rem', textShadow: '0 1px 2px black' }}>◎ REGISTRATIONS</div>
                        <div>STATUS: <span style={{ color: '#00ff88', textShadow: '0 1px 2px black' }}>OPEN</span></div>
                        <div style={{ marginTop: '0.4rem', display: 'flex', gap: '2px' }}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} style={{ width: '11px', height: '3px', background: i < 6 ? 'var(--accent-cyan)' : 'rgba(0,212,255,0.12)', borderRadius: '1px' }} />
                            ))}
                        </div>
                    </HudPanel>

                    <HudPanel delay={0.8} style={{ position: 'absolute', left: '1.5rem', top: '42%', width: '150px', zIndex: 3 }}>
                        <div style={{ color: 'var(--accent-gold)', marginBottom: '0.3rem', fontSize: '0.52rem', textShadow: '0 1px 2px black' }}>◈ DEADLINE</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-bright)', textShadow: '0 1px 2px black' }}>MAR 15</div>
                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textShadow: '0 1px 2px black' }}>23:59 IST</div>
                        <svg width="120" height="25" viewBox="0 0 120 25" style={{ opacity: 0.7, marginTop: '5px' }}>
                            <polyline points="0,18 10,13 20,20 30,6 40,16 50,10 60,22 70,8 80,18 90,3 100,13 110,8 120,16" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.3" />
                        </svg>
                    </HudPanel>

                    <HudPanel delay={1.1} style={{ position: 'absolute', left: '1.5rem', bottom: '22%', width: '150px', zIndex: 3 }}>
                        <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.3rem', fontSize: '0.52rem', textShadow: '0 1px 2px black' }}>◎ CATEGORIES</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.52rem', textShadow: '0 1px 2px black' }}>
                            <span>SOFTWARE</span>
                            <span>HARDWARE</span>
                        </div>
                    </HudPanel>

                    {/* RIGHT HUD panels */}
                    <HudPanel delay={0.6} style={{ position: 'absolute', right: '1.5rem', top: '18%', width: '150px', zIndex: 3 }}>
                        <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.3rem', fontSize: '0.52rem', textShadow: '0 1px 2px black' }}>◎ TEAM INFO</div>
                        <div>SIZE: <span style={{ color: 'var(--text-primary)', textShadow: '0 1px 2px black' }}>3-4 Members</span></div>
                        <div>MODE: <span style={{ color: 'var(--text-primary)', textShadow: '0 1px 2px black' }}>Offline</span></div>
                        <div>ELIGIBILITY: <span style={{ color: '#00ff88', textShadow: '0 1px 2px black' }}>Undergrads</span></div>
                    </HudPanel>

                    <HudPanel delay={0.9} style={{ position: 'absolute', right: '1.5rem', top: '45%', width: '150px', zIndex: 3 }}>
                        <div style={{ color: 'var(--accent-gold)', marginBottom: '0.3rem', fontSize: '0.52rem', textShadow: '0 1px 2px black' }}>◈ PRIZE POOL</div>
                        <div style={{ fontSize: '0.9rem', color: '#00ff88', fontWeight: 'bold', textShadow: '0 1px 2px black' }}>₹25,000</div>
                        <svg width="120" height="25" viewBox="0 0 120 25" style={{ opacity: 0.7, marginTop: '5px' }}>
                            <polyline points="0,13 12,18 24,8 36,15 48,5 60,20 72,10 84,14 96,4 108,12 120,9" fill="none" stroke="var(--accent-gold)" strokeWidth="1" />
                        </svg>
                    </HudPanel>

                    <HudPanel delay={1.2} style={{ position: 'absolute', right: '1.5rem', bottom: '22%', width: '150px', zIndex: 3 }}>
                        <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.3rem', fontSize: '0.52rem', textShadow: '0 1px 2px black' }}>◎ ROUNDS</div>
                        {['Round 1 (Online)', 'Round 2 (Offline)'].map((label, i) => (
                            <div key={label} style={{ marginBottom: '0.3rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', marginBottom: '2px', textShadow: '0 1px 2px black' }}>
                                    <span>{label}</span>
                                    <span style={{ color: 'var(--text-primary)' }}>Pending</span>
                                </div>
                                <div style={{ height: '2px', background: 'rgba(0,212,255,0.1)', borderRadius: '1px' }}>
                                    <div style={{ height: '100%', width: `${[100, 0][i]}%`, background: i === 0 ? 'var(--accent-cyan)' : 'var(--accent-gold)', borderRadius: '1px' }} />
                                </div>
                            </div>
                        ))}
                    </HudPanel>
                </>
            )}

            {/* Bottom gradient fade */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: 'linear-gradient(transparent, rgba(4,11,24,0.95))',
                    zIndex: 4,
                    pointerEvents: 'none',
                }}
            />
        </section>
    );
}
