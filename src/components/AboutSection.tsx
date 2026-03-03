'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import SciFiDrone from './SciFiDrone';

const features = [
    {
        title: 'Round 1: Online Submission',
        description: 'Submission accepted till 15th March. Must strictly follow the template. The PPT/Submit button visible after registration fee is paid. Top 40 teams will be shortlisted.',
    },
    {
        title: 'Round 2: Offline Presentation',
        description: 'Live project explanation and demonstration of prototype/model at SIES GST. Concludes with a Question & Answer session with the expert judging panel.',
    },
    {
        title: 'Tracks: Software & Hardware',
        description: 'Software teams present a working demo. Hardware teams present an actual working model. Winners will be selected on an overall basis across both tracks.',
    },
    {
        title: 'Rules & Guidelines',
        description: 'Team size of 3-4 members. The project submitted in Round 1 must be the same project presented in Round 2. Any change leads to disqualification.',
    },
];

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

    const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const targetPosition: [number, number, number] | null = useMemo(() => {
        if (!mousePos || isMobile) return null; // Idle on mobile or before mouse moves

        // Get normalized mouse position (-1 to 1) based on screen space.
        // Screen X goes left(0) to right(W). If we want Drone to look LEFT, we need negative X.
        // Therefore, we must invert the mouse X coordinate scaling: Left = -1, Right = 1.
        // But since the drone itself is looking from the RIGHT, its perspective is mirrored!
        // So we actively inverse `nx` to flip its horizontal tracking coordinate plane so it aims left when the mouse is left.
        const nx = -((mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1000)) * 2 - 1);
        const ny = -(mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 800)) * 2 + 1;

        // Multiply by a scalar so the drone "looks" further out into the scene based on mouse percent.
        // It's physically mounted on the right, so it mostly looks left and up/down.
        // Set Z firmly negative so it always aims "outward" towards the screen!
        return [nx * 15, ny * 10, -10];
    }, [mousePos, isMobile]);

    return (
        <section
            id="about"
            ref={containerRef}
            onMouseMove={(e) => {
                // Track mouse continuously over the section
                setMousePos({ x: e.clientX, y: e.clientY });
            }}
            onMouseLeave={() => {
                // Drop tracking if they leave the section entirely
                setMousePos(null);
            }}
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '8rem 2rem 4rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}
        >
            {/* Parallax Background Glowing Orb & 3D Drone */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: isMobile ? '2%' : '10%',
                    right: isMobile ? '0%' : '-20%',
                    left: isMobile ? '0%' : 'auto',
                    width: isMobile ? '100%' : '600px',
                    height: isMobile ? '400px' : '600px',
                    y: bgY,
                    zIndex: -1,
                    opacity: isMobile ? 0.3 : 1, // Make it very subtle on mobile so it doesn't block text legibility
                }}
            >
                {/* A faint glowing backdrop for the drone */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

                {/* Interactive 3D Drone */}
                {/* Fixed zIndex to 0 to prevent it from blocking pointer events on the cards */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.2))' }}>
                    <Canvas camera={{ position: [0, 0, 8], fov: 40 }} gl={{ alpha: true }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff1493" />

                        <SciFiDrone targetPosition={targetPosition} />
                    </Canvas>
                </div>
            </motion.div>

            <motion.div style={{ y: contentY }}>
                <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                    ◈ SECTION 01 — MISSION BRIEF
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="holo-text"
                    style={{
                        fontFamily: 'var(--font-header)',
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem',
                    }}
                >
                    ABOUT THE{' '}
                    <span style={{ color: 'var(--accent-cyan)' }}>INITIATIVE</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.8,
                        maxWidth: '700px',
                        marginBottom: '3rem',
                        letterSpacing: '0.02em',
                    }}
                >
                    Innovations 2026 is a National Level Project Presentation Competition. Open to undergraduate students from Engineering and Diploma programmes across India. Inter-college and inter-specialisation team members are allowed. This is a one-day offline competition where top teams present their working prototypes face-to-face. No accommodation will be provided.
                </motion.p>

                {/* Feature cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                            className="holo-hud-card"
                            style={{
                                transition: 'all 0.4s ease',
                                cursor: 'crosshair', // Keep standard sci-fi styling
                                position: 'relative',
                                zIndex: 20,
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'scale(1.02)';
                                el.style.background = 'rgba(4, 30, 60, 0.9)';
                                el.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 10px rgba(255, 20, 147, 0.2)';
                                el.style.borderColor = 'rgba(255, 20, 147, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'scale(1)';
                                el.style.background = 'rgba(4, 18, 50, 0.75)';
                                el.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.05), inset 0 0 30px rgba(0, 212, 255, 0.05)';
                                el.style.borderColor = 'rgba(0, 212, 255, 0.15)';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>0{i + 1}</div>
                            </div>

                            <div className="hud-line" />

                            <h3
                                style={{
                                    fontFamily: 'var(--font-header)',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    color: 'var(--accent-cyan)',
                                    marginBottom: '0.5rem',
                                    marginTop: '0.8rem',
                                    textShadow: '0 0 5px rgba(0,212,255,0.5)',
                                }}
                            >
                                {f.title}
                            </h3>
                            <p
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.6,
                                }}
                            >
                                {f.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
