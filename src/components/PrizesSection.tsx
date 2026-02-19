'use client';

import { motion } from 'framer-motion';

const prizes = [
    {
        rank: '1ST',
        title: 'Grand Champion',
        amount: '₹50,000',
        color: '#FFBE0B',
        perks: ['Trophy & Certificate', 'Internship Opportunity', 'Mentorship Access', 'Event Feature Spotlight'],
    },
    {
        rank: '2ND',
        title: 'Runner Up',
        amount: '₹30,000',
        color: '#C0C0C0',
        perks: ['Trophy & Certificate', 'Course Vouchers', 'LinkedIn Endorsement'],
    },
    {
        rank: '3RD',
        title: 'Second Runner Up',
        amount: '₹15,000',
        color: '#CD7F32',
        perks: ['Trophy & Certificate', 'Tech Swag Kit', 'Course Vouchers'],
    },
];

const specialPrizes = [
    { title: 'Best AI/ML Project', amount: '₹10,000', icon: '🧠' },
    { title: 'Best UI/UX Design', amount: '₹10,000', icon: '🎨' },
    { title: 'People\'s Choice', amount: '₹5,000', icon: '🗳️' },
    { title: 'Best First-Year Team', amount: '₹5,000', icon: '🌱' },
];

export default function PrizesSection() {
    return (
        <section
            id="prizes"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '6rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}
        >
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                ◈ SECTION 03 — REWARD MATRIX
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
                PRIZES &{' '}
                <span style={{ color: 'var(--accent-gold)' }}>REWARDS</span>
            </motion.h2>

            {/* Main prizes */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem',
                }}
            >
                {prizes.map((prize, i) => (
                    <motion.div
                        key={prize.rank}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.6 }}
                        className="holo-hud-card"
                        style={{
                            textAlign: 'center',
                            borderTop: `2px solid ${prize.color}80`,
                            transition: 'all 0.4s ease',
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.borderTopColor = `${prize.color}`;
                            el.style.boxShadow = `0 0 40px ${prize.color}15, 0 -4px 20px ${prize.color}10`;
                            el.style.transform = 'translateY(-6px)';
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.borderTopColor = `${prize.color}80`;
                            el.style.boxShadow = 'inset 0 0 20px rgba(0, 212, 255, 0.05)';
                            el.style.transform = 'translateY(0)';
                        }}
                    >
                        {/* Rank badge */}
                        <div
                            style={{
                                display: 'inline-block',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                padding: '0.3rem 1rem',
                                borderRadius: '20px',
                                background: `${prize.color}15`,
                                border: `1px solid ${prize.color}30`,
                                color: prize.color,
                                marginBottom: '1rem',
                            }}
                        >
                            {prize.rank} PLACE
                        </div>

                        <h3
                            style={{
                                fontFamily: 'var(--font-header)',
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {prize.title}
                        </h3>

                        <div
                            style={{
                                fontFamily: 'var(--font-header)',
                                fontSize: '2.5rem',
                                fontWeight: 700,
                                color: prize.color,
                                marginBottom: '1.5rem',
                                textShadow: `0 0 30px ${prize.color}40`,
                            }}
                        >
                            {prize.amount}
                        </div>

                        <div style={{ borderTop: '1px solid rgba(58,134,255,0.1)', paddingTop: '1rem' }}>
                            {prize.perks.map((perk) => (
                                <div
                                    key={perk}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.68rem',
                                        color: 'var(--text-muted)',
                                        padding: '0.3rem 0',
                                        letterSpacing: '0.03em',
                                    }}
                                >
                                    ◈ {perk}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Special prizes */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--accent-cyan)',
                        letterSpacing: '0.15em',
                        marginBottom: '1.5rem',
                        opacity: 0.7,
                    }}
                >
                    ◈ SPECIAL CATEGORY AWARDS
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1rem',
                    }}
                >
                    {specialPrizes.map((sp, i) => (
                        <motion.div
                            key={sp.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.08 }}
                            className="holo-panel"
                            style={{
                                padding: '1.2rem 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'border-color 0.3s',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(58,134,255,0.3)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(58,134,255,0.15)'; }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{sp.icon}</span>
                            <div>
                                <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {sp.title}
                                </div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                                    {sp.amount}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
