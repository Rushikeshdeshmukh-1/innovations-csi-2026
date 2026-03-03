'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const timelineEvents = [
    {
        date: 'MAR 15',
        time: '23:59',
        title: 'Registration Deadline',
        description: 'Last date to register for the competition.',
        timestamp: new Date('2026-03-15T23:59:00+05:30').getTime(),
    },
    {
        date: 'MAR 15',
        time: '23:59',
        title: 'Round 1 Submission',
        description: 'Online PPT submission deadline. Must follow the prescribed template.',
        timestamp: new Date('2026-03-15T23:59:00+05:30').getTime(),
    },
    {
        date: 'MAR 27',
        time: '08:00',
        title: 'Final Offline Round',
        description: 'Live project presentation and working prototype demonstration at SIES GST.',
        timestamp: new Date('2026-03-27T08:00:00+05:30').getTime(),
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
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Update time every minute
        const timer = setInterval(() => setCurrentTime(Date.now()), 60000);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearInterval(timer);
        };
    }, []);

    const startTime = new Date('2026-03-01T00:00:00+05:30').getTime(); // Assume event campaign started March 1st
    const endTime = timelineEvents[timelineEvents.length - 1].timestamp;

    // Calculate progress smoothly between start and end date
    const progressPercent = Math.max(0, Math.min(100, ((currentTime - startTime) / (endTime - startTime)) * 100));

    // Determine status map
    const processedEvents = timelineEvents.map((event, index) => {
        const isCompleted = currentTime >= event.timestamp;
        const nextEventTime = timelineEvents[index + 1]?.timestamp || Infinity;
        const isActive = currentTime >= event.timestamp && currentTime < nextEventTime;

        // If not completed and not active, but is the *first* uncompleted item (and we haven't reached its time), 
        // let's mark it as active so it glows if it's the next immediate deadline.
        return {
            ...event,
            status: isCompleted ? 'completed' : (currentTime < event.timestamp && (index === 0 || currentTime >= timelineEvents[index - 1].timestamp) ? 'active' : 'upcoming')
        };
    });

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

                {processedEvents.map((event, i) => {
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
