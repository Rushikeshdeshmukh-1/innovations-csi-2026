'use client';

import { motion } from 'framer-motion';

const prizes = [
    {
        rank: '1ST',
        prize: '₹30,000',
        perks: ['Internship Opportunity', 'Swag Kit', 'Certificate of Excellence'],
        color: '#FFD700', // Gold
        glow: 'rgba(255, 215, 0, 0.4)',
    },
    {
        rank: '2ND',
        prize: '₹15,000',
        perks: ['Swag Kit', 'Certificate of Excellence'],
        color: '#C0C0C0', // Silver
        glow: 'rgba(192, 192, 192, 0.4)',
    },
    {
        rank: '3RD',
        prize: '₹5,000',
        perks: ['Swag Kit', 'Certificate of Excellence'],
        color: '#CD7F32', // Bronze
        glow: 'rgba(205, 127, 50, 0.4)',
    },
];

export default function PrizesSection() {
    return (
        <section id="prizes" style={{ padding: '6rem 2rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}>

            {/* Background Gradient */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{
                        fontFamily: 'var(--font-header, sans-serif)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        color: 'var(--text-bright, #fff)',
                        textShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                        marginBottom: '1rem',
                    }}>
                        PRIZE POOL
                    </h2>
                    <div style={{
                        width: '100px',
                        height: '4px',
                        background: 'var(--accent-cyan, #00d4ff)',
                        margin: '0 auto',
                        borderRadius: '2px',
                        boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                    }} />
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    alignItems: 'end'
                }}>
                    {/* Re-ordering for visual hierarchy: 2nd, 1st, 3rd logic or just map */}
                    {/* Let's swap to display 2nd, 1st, 3rd on large screens if possible, but grid is simpler */}
                    {[prizes[1], prizes[0], prizes[2]].map((item, index) => (
                        <motion.div
                            key={item.rank}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            style={{
                                background: 'rgba(10, 20, 40, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${item.color}`,
                                borderRadius: '20px',
                                padding: '2rem',
                                textAlign: 'center',
                                position: 'relative',
                                transform: item.rank === '1ST' ? 'scale(1.05) translateY(-20px)' : 'none',
                                boxShadow: `0 0 30px ${item.glow}, inset 0 0 20px rgba(0,0,0,0.5)`,
                            }}
                        >
                            <div style={{
                                fontSize: '4rem',
                                fontWeight: 'bold',
                                color: item.color,
                                textShadow: `0 0 20px ${item.glow}`,
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-header, sans-serif)'
                            }}>
                                {item.rank}
                            </div>
                            <div style={{
                                fontSize: '2.5rem',
                                color: '#fff',
                                marginBottom: '1.5rem',
                                fontWeight: 'bold',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}>
                                {item.prize}
                            </div>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                color: 'var(--text-muted, #aaa)',
                                fontSize: '0.9rem',
                                lineHeight: '1.8'
                            }}>
                                {item.perks.map((perk, i) => (
                                    <li key={i} style={{ borderBottom: i < item.perks.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none', padding: '0.5rem 0' }}>
                                        {perk}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
