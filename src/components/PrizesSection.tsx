'use client';

import { motion } from 'framer-motion';

const prizes = [
    {
        rank: 'PRIZE POOL',
        prize: '₹25,000',
        perks: ['Cash Prize Pool', 'Participation Certificate for all'],
        color: '#00d4ff', // Cyan
        glow: 'rgba(0, 212, 255, 0.4)',
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
                        REWARDS & PRIZES
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2rem'
                }}>
                    {prizes.map((item, index) => (
                        <motion.div
                            key={item.rank}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                background: 'rgba(10, 20, 40, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${item.color}`,
                                borderRadius: '20px',
                                padding: '3rem 4rem',
                                textAlign: 'center',
                                position: 'relative',
                                boxShadow: `0 0 30px ${item.glow}, inset 0 0 20px rgba(0,0,0,0.5)`,
                                maxWidth: '600px',
                                width: '100%',
                            }}
                        >
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: item.color,
                                textShadow: `0 0 20px ${item.glow}`,
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-header, sans-serif)'
                            }}>
                                {item.rank}
                            </div>
                            <div style={{
                                fontSize: '4rem',
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
                                color: '#fff', // Made perks text much brighter
                                fontSize: '1.2rem',
                                lineHeight: '2'
                            }}>
                                {item.perks.map((perk, i) => (
                                    <li key={i} style={{ borderBottom: i < item.perks.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none', padding: '0.8rem 0' }}>
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
