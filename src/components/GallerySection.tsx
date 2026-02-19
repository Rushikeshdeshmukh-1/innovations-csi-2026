'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useLeaderboardStore } from '@/store/leaderboardStore';

const projectColors = [
    '#3A86FF', '#FFBE0B', '#00ff88', '#FF006E',
    '#8338EC', '#FF6B35', '#06D6A0', '#EF476F',
];

export default function GallerySection() {
    const teams = useLeaderboardStore((s) => s.teams);

    return (
        <section
            id="gallery"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '6rem 0',
            }}
        >
            <div style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                    ◈ SECTION 04 — INNOVATION SCHEMATICS
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
                    THE{' '}
                    <span style={{ color: 'var(--accent-gold)' }}>SCHEMATIC</span>{' '}
                    GALLERY
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.08em',
                    }}
                >
                    HOVER TO REVEAL FULL SCHEMATICS | SCROLL →
                </motion.p>
            </div>

            <div className="gallery-scroll" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                {teams.map((team, idx) => (
                    <ProjectCard
                        key={team.id}
                        title={team.projectName}
                        team={team.teamName}
                        category={team.category}
                        imageColor={projectColors[idx % projectColors.length]}
                        index={idx}
                    />
                ))}
            </div>

            <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    opacity: 0.3,
                    marginTop: '0.5rem',
                }}
            >
                ← DRAG TO EXPLORE →
            </motion.div>
        </section>
    );
}
