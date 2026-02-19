'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    team: string;
    category: string;
    imageColor: string;
    index: number;
}

export default function ProjectCard({ title, team, category, imageColor, index }: ProjectCardProps) {
    return (
        <motion.div
            className="gallery-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            style={{
                width: '320px',
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(58,134,255,0.2)',
                background: 'rgba(13,26,58,0.6)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.border = '1px solid rgba(58,134,255,0.5)';
                el.style.boxShadow = '0 0 30px rgba(58,134,255,0.15), 0 20px 60px rgba(0,0,0,0.3)';
                el.style.transform = 'translateY(-8px) scale(1.02)';
                // Reveal color
                const img = el.querySelector('.card-visual') as HTMLElement;
                if (img) {
                    img.style.filter = 'grayscale(0) brightness(1)';
                    img.style.opacity = '1';
                }
                const overlay = el.querySelector('.sketch-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.border = '1px solid rgba(58,134,255,0.2)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0) scale(1)';
                const img = el.querySelector('.card-visual') as HTMLElement;
                if (img) {
                    img.style.filter = 'grayscale(1) brightness(0.6)';
                    img.style.opacity = '0.8';
                }
                const overlay = el.querySelector('.sketch-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
            }}
        >
            {/* Visual area */}
            <div
                style={{
                    position: 'relative',
                    height: '200px',
                    overflow: 'hidden',
                }}
            >
                {/* Colored background visual */}
                <div
                    className="card-visual"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, ${imageColor}22, ${imageColor}44, ${imageColor}11)`,
                        filter: 'grayscale(1) brightness(0.6)',
                        opacity: 0.8,
                        transition: 'all 0.5s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Circuit pattern */}
                    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M20 80 L60 80 L70 40 L90 120 L110 60 L130 100 L150 80 L180 80"
                            stroke={imageColor} strokeWidth="2" fill="none" />
                        <circle cx="60" cy="80" r="4" fill={imageColor} />
                        <circle cx="90" cy="120" r="4" fill={imageColor} />
                        <circle cx="130" cy="100" r="4" fill={imageColor} />
                        <circle cx="180" cy="80" r="4" fill={imageColor} />
                        <path d="M40 30 L40 60 L80 60" stroke={imageColor} strokeWidth="1" opacity="0.5" />
                        <path d="M160 30 L160 50 L120 50" stroke={imageColor} strokeWidth="1" opacity="0.5" />
                        <path d="M40 130 L70 130 L70 100" stroke={imageColor} strokeWidth="1" opacity="0.5" />
                        <path d="M160 130 L140 130 L140 110" stroke={imageColor} strokeWidth="1" opacity="0.5" />
                        <rect x="35" y="25" width="10" height="10" stroke={imageColor} strokeWidth="1" fill="none" opacity="0.4" />
                        <rect x="155" y="25" width="10" height="10" stroke={imageColor} strokeWidth="1" fill="none" opacity="0.4" />
                    </svg>
                </div>

                {/* Sketch grid overlay */}
                <div
                    className="sketch-overlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(58,134,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(58,134,255,0.08) 1px, transparent 1px)',
                        backgroundSize: '15px 15px',
                        transition: 'opacity 0.5s ease',
                    }}
                />

                {/* Category chip */}
                <div
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        padding: '0.25rem 0.6rem',
                        background: 'rgba(11,19,43,0.8)',
                        border: '1px solid rgba(58,134,255,0.3)',
                        borderRadius: '3px',
                        color: 'var(--accent-cyan)',
                    }}
                >
                    {category}
                </div>
            </div>

            {/* Info area */}
            <div style={{ padding: '1.2rem' }}>
                <div
                    style={{
                        fontFamily: 'var(--font-header)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '0.3rem',
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.1em',
                    }}
                >
                    TEAM: {team}
                </div>

                {/* Bottom decorative line */}
                <div
                    style={{
                        marginTop: '1rem',
                        height: '1px',
                        background: 'linear-gradient(90deg, var(--accent-cyan), transparent)',
                        opacity: 0.3,
                    }}
                />
                <div
                    style={{
                        marginTop: '0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.55rem',
                        color: 'var(--text-muted)',
                        opacity: 0.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>REF: SCH-{String(index + 1).padStart(3, '0')}</span>
                    <span>◎ BLUEPRINT</span>
                </div>
            </div>
        </motion.div>
    );
}
