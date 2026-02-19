'use client';

import { motion } from 'framer-motion';

const features = [
    {
        icon: '⚡',
        title: 'Innovation Sprint',
        description: 'A 24-hour marathon where teams prototype cutting-edge solutions across AI, IoT, Blockchain, and Cybersecurity domains.',
    },
    {
        icon: '🔬',
        title: 'Expert Mentorship',
        description: 'Get guided by industry professionals from top tech companies. One-on-one sessions to refine your approach and strategy.',
    },
    {
        icon: '🏗️',
        title: 'Build & Pitch',
        description: 'Transform ideas into working prototypes. Present your innovation to a panel of judges and compete for top honors.',
    },
    {
        icon: '🌐',
        title: 'Networking Hub',
        description: 'Connect with 500+ innovators, engineers, and tech leaders. Build relationships that last beyond the event.',
    },
];

export default function AboutSection() {
    return (
        <section
            id="about"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '8rem 2rem 4rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}
        >
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
                Project: Schematic is CSI&apos;s flagship innovation competition — a blueprint
                for the future of technology. Teams design, build, and present groundbreaking
                projects that push the boundaries of what&apos;s possible. This is where ideas
                become reality.
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
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = 'translateY(-4px)';
                            el.style.background = 'rgba(4, 18, 50, 0.85)';
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = 'translateY(0)';
                            el.style.background = 'rgba(4, 18, 50, 0.75)';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>{f.icon}</div>
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
        </section>
    );
}
