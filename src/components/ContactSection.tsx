'use client';

import { motion } from 'framer-motion';

const contacts = [
    {
        name: 'Aarav Patel',
        role: 'Event Coordinator',
        email: 'aarav@csi-innovations.org',
        phone: '+91 98765 43210',
    },
    {
        name: 'Priya Sharma',
        role: 'Technical Lead',
        email: 'priya@csi-innovations.org',
        phone: '+91 87654 32109',
    },
];

const socials = [
    { label: 'INSTAGRAM', url: '#', icon: '◎' },
    { label: 'LINKEDIN', url: '#', icon: '◈' },
    { label: 'TWITTER', url: '#', icon: '◉' },
    { label: 'DISCORD', url: '#', icon: '◇' },
];

export default function ContactSection() {
    return (
        <section
            id="contact"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '6rem 2rem',
                maxWidth: '1000px',
                margin: '0 auto',
            }}
        >
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                ◈ SECTION 06 — COMMUNICATION LINK
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
                    marginBottom: '3rem',
                }}
            >
                GET IN{' '}
                <span style={{ color: 'var(--accent-cyan)' }}>TOUCH</span>
            </motion.h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                }}
            >
                {/* Contact cards */}
                {contacts.map((c, i) => (
                    <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="holo-panel"
                        style={{ padding: '1.8rem' }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--font-header)',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginBottom: '0.2rem',
                            }}
                        >
                            {c.name}
                        </div>
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                color: 'var(--accent-cyan)',
                                letterSpacing: '0.15em',
                                marginBottom: '1rem',
                                opacity: 0.7,
                            }}
                        >
                            {c.role.toUpperCase()}
                        </div>

                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 2 }}>
                            <div>
                                ✉{' '}
                                <a
                                    href={`mailto:${c.email}`}
                                    style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
                                >
                                    {c.email}
                                </a>
                            </div>
                            <div>☎ {c.phone}</div>
                        </div>
                    </motion.div>
                ))}

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="holo-panel"
                    style={{ padding: '1.8rem' }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-header)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: '1rem',
                        }}
                    >
                        Connect With Us
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.url}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.1em',
                                    color: 'var(--text-muted)',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(58,134,255,0.15)',
                                    borderRadius: '6px',
                                    background: 'rgba(58,134,255,0.05)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget;
                                    el.style.borderColor = 'rgba(58,134,255,0.4)';
                                    el.style.color = 'var(--accent-cyan)';
                                    el.style.background = 'rgba(58,134,255,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget;
                                    el.style.borderColor = 'rgba(58,134,255,0.15)';
                                    el.style.color = 'var(--text-muted)';
                                    el.style.background = 'rgba(58,134,255,0.05)';
                                }}
                            >
                                {s.icon} {s.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Venue info */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="holo-panel"
                style={{
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-cyan)', letterSpacing: '0.15em', marginBottom: '0.3rem', opacity: 0.7 }}>
                        ◈ VENUE COORDINATES
                    </div>
                    <div style={{ fontFamily: 'var(--font-header)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Engineering Auditorium, Main Campus
                    </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <div>LAT: 19.0760°N</div>
                    <div>LONG: 72.8777°E</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)' }}>
                    MARCH 15-16, 2025
                </div>
            </motion.div>
        </section>
    );
}
