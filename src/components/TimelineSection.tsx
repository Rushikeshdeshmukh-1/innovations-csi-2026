'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const timelineEvents = [
    {
        date: 'MAR 01',
        time: '09:00',
        title: 'Registration Opens',
        description: 'Portal goes live. Teams register and submit project abstracts.',
        status: 'completed',
    },
    {
        date: 'MAR 10',
        time: '18:00',
        title: 'Registration Deadline',
        description: 'Final call for team registration. Late submissions not accepted.',
        status: 'completed',
    },
    {
        date: 'MAR 15',
        time: '10:00',
        title: 'Opening Ceremony',
        description: 'Keynote address, rules briefing, and mentor assignments.',
        status: 'active',
    },
    {
        date: 'MAR 15',
        time: '11:00',
        title: 'Build Phase Begins',
        description: '24 hours to transform your idea into a working prototype.',
        status: 'upcoming',
    },
    {
        date: 'MAR 16',
        time: '11:00',
        title: 'Submission Deadline',
        description: 'All projects must be submitted. Code freeze enforced.',
        status: 'upcoming',
    },
    {
        date: 'MAR 16',
        time: '14:00',
        title: 'Pitch Round',
        description: 'Shortlisted teams present to judges. 10 min pitch + 5 min Q&A.',
        status: 'upcoming',
    },
    {
        date: 'MAR 16',
        time: '17:00',
        title: 'Awards Ceremony',
        description: 'Winners announced. Prizes, certificates, and closing keynote.',
        status: 'upcoming',
    },
];

function getStatusColor(status: string) {
    switch (status) {
        case 'completed': return '#00ff88';
        case 'active': return '#FFBE0B';
        default: return 'var(--accent-cyan)';
    }
}

export default function TimelineSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const activeIndex = timelineEvents.findIndex(e => e.status === 'upcoming');
    const totalEvents = timelineEvents.length;
    // Calculate progress as percentage. If all are done (activeIndex = -1), 100%. 
    const progressPercent = activeIndex === -1 ? 100 : (activeIndex / (totalEvents - 1)) * 100;

    return (
        <section
            id="timeline"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: isMobile ? '4rem 1rem' : '6rem 2rem',
                maxWidth: '900px',
                margin: '0 auto',
            }}
        >
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                ◈ SECTION 02 — EXECUTION TIMELINE
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
                EVENT{' '}
                <span style={{ color: 'var(--accent-gold)' }}>TIMELINE</span>
            </motion.h2>

            {/* Timeline */}
            <div style={{ position: 'relative' }}>
                {/* Vertical line baseline */}
                <div
                    style={{
                        position: 'absolute',
                        left: isMobile ? '20px' : '120px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'rgba(58,134,255,0.1)',
                    }}
                />

                {/* Active Progress Line */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${progressPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        left: isMobile ? '20px' : '120px',
                        top: 0,
                        width: '2px',
                        background: 'linear-gradient(180deg, var(--accent-cyan), #00ff88)',
                        boxShadow: '0 0 10px rgba(0,212,255,0.5)',
                        zIndex: 0,
                    }}
                />

                {timelineEvents.map((event, i) => {
                    const color = getStatusColor(event.status);
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            style={{
                                display: 'flex',
                                gap: isMobile ? '1rem' : '2rem',
                                marginBottom: '2rem',
                                alignItems: 'flex-start',
                                flexDirection: isMobile ? 'column' : 'row',
                                position: 'relative',
                                paddingLeft: isMobile ? '40px' : '0',
                            }}
                        >
                            {/* Date column for Desktop */}
                            {!isMobile && (
                                <div
                                    style={{
                                        width: '100px',
                                        textAlign: 'right',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.7rem',
                                        flexShrink: 0,
                                        paddingTop: '0.3rem',
                                    }}
                                >
                                    <div style={{ color, fontWeight: 700 }}>{event.date}</div>
                                    <div style={{ color: 'var(--text-muted)', opacity: 0.6, fontSize: '0.6rem' }}>
                                        {event.time}
                                    </div>
                                </div>
                            )}

                            {/* Dot */}
                            <div
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: event.status === 'active' ? color : 'transparent',
                                    border: `2px solid ${color}`,
                                    flexShrink: 0,
                                    position: 'absolute',
                                    left: isMobile ? '15px' : '115px',
                                    top: isMobile ? '6px' : '6px',
                                    boxShadow: event.status === 'active' ? `0 0 12px ${color}` : 'none',
                                    zIndex: 1,
                                }}
                            />

                            {/* Content */}
                            <div
                                className="holo-hud-card"
                                style={{
                                    flex: 1,
                                    borderLeft: `2px solid ${color}40`,
                                    width: '100%',
                                }}
                            >
                                {/* Date and Time for Mobile inserted into the card */}
                                {isMobile && (
                                    <div
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.65rem',
                                            marginBottom: '0.5rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div style={{ color, fontWeight: 700 }}>{event.date}</div>
                                        <div style={{ color: 'var(--text-muted)', opacity: 0.8 }}>{event.time}</div>
                                    </div>
                                )}

                                <h3
                                    style={{
                                        fontFamily: 'var(--font-header)',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        marginBottom: '0.3rem',
                                    }}
                                >
                                    {event.title}
                                    {event.status === 'active' && (
                                        <span
                                            style={{
                                                marginLeft: '0.75rem',
                                                fontSize: '0.55rem',
                                                fontFamily: 'var(--font-mono)',
                                                color: 'var(--accent-gold)',
                                                letterSpacing: '0.1em',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            ● LIVE
                                        </span>
                                    )}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.68rem',
                                        color: 'var(--text-muted)',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {event.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
