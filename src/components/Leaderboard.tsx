'use client';

import { motion } from 'framer-motion';
import { useLeaderboardStore, TeamStatus } from '@/store/leaderboardStore';

function StatusBadge({ status }: { status: TeamStatus }) {
    const classMap: Record<TeamStatus, string> = {
        'Under Review': 'badge-review',
        Pitching: 'badge-pitching',
        Shortlisted: 'badge-shortlisted',
        Eliminated: 'badge-eliminated',
    };

    const iconMap: Record<TeamStatus, string> = {
        'Under Review': '◎',
        Pitching: '◈',
        Shortlisted: '✦',
        Eliminated: '✕',
    };

    return (
        <span
            className={classMap[status]}
            style={{
                padding: '0.25rem 0.7rem',
                borderRadius: '4px',
                fontSize: '0.6rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
            }}
        >
            {iconMap[status]} {status.toUpperCase()}
        </span>
    );
}

export default function Leaderboard() {
    const teams = useLeaderboardStore((s) => s.teams);

    return (
        <section
            id="leaderboard"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '6rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}
        >
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                ◈ SECTION 05 — DATA MATRIX
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
                LIVE{' '}
                <span style={{ color: 'var(--accent-cyan)' }}>LEADERBOARD</span>
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
                    marginBottom: '2rem',
                    letterSpacing: '0.08em',
                }}
            >
                REAL-TIME PROJECT TRACKING | {teams.length} TEAMS |{' '}
                <span style={{ color: '#00ff88' }}>● STREAM ACTIVE</span>
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="holo-panel"
                style={{ overflow: 'hidden' }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                        }}
                    >
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(58,134,255,0.2)', background: 'rgba(58,134,255,0.04)' }}>
                                {['#', 'TEAM', 'PROJECT', 'CATEGORY', 'SCORE', 'STATUS'].map((h) => (
                                    <th
                                        key={h}
                                        style={{
                                            padding: '0.9rem 1rem',
                                            textAlign: 'left',
                                            color: 'var(--accent-cyan)',
                                            fontWeight: 600,
                                            letterSpacing: '0.12em',
                                            fontSize: '0.6rem',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, idx) => (
                                <motion.tr
                                    key={team.id}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.35 + idx * 0.04 }}
                                    style={{
                                        borderBottom: '1px solid rgba(58,134,255,0.06)',
                                        transition: 'background 0.3s',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(58,134,255,0.04)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                                    }}
                                >
                                    <td style={{ padding: '0.8rem 1rem', color: team.position <= 3 ? 'var(--accent-gold)' : 'var(--text-muted)', fontWeight: 700 }}>
                                        {String(team.position).padStart(2, '0')}
                                    </td>
                                    <td style={{ padding: '0.8rem 1rem', color: 'var(--text-primary)' }}>{team.teamName}</td>
                                    <td style={{ padding: '0.8rem 1rem', color: 'var(--text-primary)' }}>{team.projectName}</td>
                                    <td style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)', fontSize: '0.65rem' }}>{team.category}</td>
                                    <td style={{ padding: '0.8rem 1rem' }}>
                                        <span style={{ color: team.score >= 90 ? '#00ff88' : team.score >= 80 ? 'var(--accent-cyan)' : team.score >= 70 ? 'var(--accent-gold)' : '#ff3b30', fontWeight: 700 }}>
                                            {team.score}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.8rem 1rem' }}><StatusBadge status={team.status} /></td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </section>
    );
}
