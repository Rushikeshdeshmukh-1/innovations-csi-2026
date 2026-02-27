import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import GlitchButton from './GlitchButton';
import QuantumPortal from './QuantumPortal'; // Import the new particle system

export default function RegisterSection() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <section
            id="register"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '8rem 2rem 8rem',
                minHeight: '600px', // Ensure the section has a robust height for the vortex
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden' // Keep particles strictly inside this section
            }}
        >
            {/* 3D Portal Spanning the entire background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, rgba(138,43,226,0.05) 0%, transparent 70%)' }}>
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
                    {/* The new wormhole effect needs no external lights since it generates its own point colors */}
                    <QuantumPortal isHovered={isHovered} />
                </Canvas>
            </div>

            {/* Content layered precisely over the portal */}
            <div style={{ zIndex: 10, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                    ◈ SECTION 07 — ENROLLMENT PORTAL
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="holo-text"
                    style={{
                        fontFamily: 'var(--font-header)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '1rem',
                    }}
                >
                    REGISTER <span style={{ color: 'var(--accent-cyan)' }}>NOW</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        color: 'var(--text-primary)',
                        marginBottom: '3rem',
                        letterSpacing: '0.04em',
                        maxWidth: '600px',
                        lineHeight: '1.6',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    }}
                >
                    Secure your team's spot in the innovation sprint.
                    Click below to access the official registration portal.
                </motion.p>


                <div
                    style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ zIndex: 10, position: 'relative' }}
                    >
                        {/*
                       Replacing the form with a single call-to-action button as requested.
                    */}
                        <GlitchButton
                            label="ENTER PORTAL"
                            href="#" // This would link to the actual Google Form or Typeform
                            onClick={() => alert("Redirecting to Registration Portal...")}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
