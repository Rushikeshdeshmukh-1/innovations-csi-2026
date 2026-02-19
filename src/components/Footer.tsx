'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer
            style={{
                position: 'relative',
                zIndex: 5,
                borderTop: '1px solid rgba(58,134,255,0.1)',
                padding: '3rem 2rem',
                marginTop: '2rem',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '2rem',
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div style={{ fontFamily: 'var(--font-header)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                        PROJECT: SCHEMATIC
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                        CSI INNOVATIONS HUB | COMPUTER SOCIETY OF INDIA
                    </div>
                </motion.div>

                <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                    {['ABOUT', 'TIMELINE', 'PRIZES', 'CONTACT', 'REGISTER'].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', opacity: 0.5, letterSpacing: '0.1em', textAlign: 'right' }}>
                    <div>BUILD: 2045.10.27_A</div>
                    <div>© 2025 CSI INNOVATIONS</div>
                    <div style={{ marginTop: '0.2rem' }}><span style={{ color: '#00ff88' }}>●</span> ALL SYSTEMS NOMINAL</div>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(58,134,255,0.15), transparent)' }} />
            <div style={{ textAlign: 'center', marginTop: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', opacity: 0.25, letterSpacing: '0.2em' }}>
                ◈ DESIGNED WITH PRECISION ◈ ENGINEERED FOR INNOVATION ◈
            </div>
        </footer>
    );
}
