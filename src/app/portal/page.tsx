'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeaderboardStore, Team } from '@/store/leaderboardStore';
import GlitchButton from '@/components/GlitchButton';
import Link from 'next/link';

function TeamCard({ team }: { team: Team }) {
    const statusColors: Record<string, string> = {
        'Under Review': '#3A86FF',
        Pitching: '#FFBE0B',
        Shortlisted: '#00ff88',
        Eliminated: '#ff3b30',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
        >
            {/* Main Info Card */}
            <div
                className="holo-hud-card"
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    background: 'rgba(4, 25, 50, 0.85)',
                    boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)',
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(0,212,255,0.2)',
                    paddingBottom: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-cyan)', letterSpacing: '0.15em' }}>
                        ID: {team.id.toUpperCase()}
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                        <div style={{
                            width: '8px', height: '8px',
                            background: statusColors[team.status] || '#3A86FF',
                            borderRadius: '50%',
                            boxShadow: `0 0 10px ${statusColors[team.status] || '#3A86FF'}`,
                        }} />
                        <span style={{
                            fontSize: '0.6rem',
                            color: statusColors[team.status],
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                        }}>
                            {team.status.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Avatar */}
                <div style={{
                    width: '80px', height: '80px', margin: '0 auto 1.5rem',
                    borderRadius: '50%',
                    border: '2px dashed var(--accent-cyan)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.8rem',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0,212,255,0.05)',
                    boxShadow: '0 0 20px rgba(0,212,255,0.2)',
                }}>
                    {team.teamName.charAt(0)}
                </div>

                {/* Names */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-header)',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '0.3rem',
                        textShadow: '0 0 10px rgba(255,255,255,0.2)',
                    }}>
                        {team.projectName}
                    </h2>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent-cyan)',
                        letterSpacing: '0.1em',
                    }}>
                        {team.teamName.toUpperCase()}
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>ROOM</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{team.roomNumber || 'TBA'}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>SCORE</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{team.score}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>CATEGORY</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-bright)' }}>{team.category}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>TIME SLOT</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-bright)' }}>{team.timeSlot || 'TBA'}</div>
                    </div>
                </div>

                {/* Food Check-in Status */}
                <div style={{
                    background: team.foodCheckedIn ? 'rgba(0,255,136,0.08)' : 'rgba(255,59,48,0.08)',
                    border: `1px solid ${team.foodCheckedIn ? 'rgba(0,255,136,0.3)' : 'rgba(255,59,48,0.3)'}`,
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        color: 'var(--text-muted)',
                        marginBottom: '0.8rem',
                    }}>
                        🍽 FOOD CHECK-IN STATUS
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.8rem',
                    }}>
                        <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: team.foodCheckedIn ? '#00ff88' : '#ff3b30',
                            boxShadow: `0 0 8px ${team.foodCheckedIn ? '#00ff88' : '#ff3b30'}`,
                        }} />
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: team.foodCheckedIn ? '#00ff88' : '#ff3b30',
                        }}>
                            {team.foodCheckedIn ? 'ALL CHECKED IN' : 'PENDING'}
                        </span>
                    </div>

                    {/* Individual Members */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {team.members.map((member) => (
                            <div key={member.name} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.4rem 0.6rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '4px',
                            }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-primary)',
                                }}>
                                    {member.name}
                                </span>
                                <span style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-mono)',
                                    color: member.foodCheckedIn ? '#00ff88' : '#ff3b30',
                                }}>
                                    {member.foodCheckedIn ? '✓ DONE' : '✗ PENDING'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    display: 'flex', gap: '0.5rem', justifyContent: 'center',
                    borderTop: '1px solid rgba(0,212,255,0.15)',
                    paddingTop: '1rem',
                }}>
                    {team.presentationUrl && (
                        <GlitchButton label="SLIDES" href={team.presentationUrl} />
                    )}
                    <GlitchButton label="VIEW FULL CARD" href={`/portal/${team.id}`} variant="gold" />
                </div>
            </div>
        </motion.div>
    );
}

export default function PortalSearchPage() {
    const [query, setQuery] = useState('');
    const [searchedTeam, setSearchedTeam] = useState<Team | null>(null);
    const [searched, setSearched] = useState(false);
    const teams = useLeaderboardStore((s) => s.teams);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const lower = query.toLowerCase().trim();
        const found = teams.find((t) => t.teamName.toLowerCase() === lower);
        setSearchedTeam(found || null);
        setSearched(true);
    };

    return (
        <div style={{
            minHeight: '100vh',
            padding: '4rem 1.5rem 3rem',
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 5,
        }}>
            {/* Back Link */}
            <Link
                href="/"
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '3rem',
                    transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
                ← RETURN TO MAIN SCHEMATIC
            </Link>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                    color: 'var(--accent-cyan)',
                    opacity: 0.6,
                    marginBottom: '0.8rem',
                }}>
                    ◈ INNOVATIONS CSI — TEAM PORTAL
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.5rem',
                    textShadow: '0 0 20px rgba(0,212,255,0.3)',
                }}>
                    TEAM LOOKUP
                </h1>
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                }}>
                    Enter your team name to access your team schematic
                </p>
            </motion.div>

            {/* Search Form */}
            <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                    display: 'flex',
                    gap: '0.8rem',
                    marginBottom: '2.5rem',
                    maxWidth: '500px',
                    margin: '0 auto 2.5rem',
                }}
            >
                <div style={{ flex: 1, position: 'relative' }}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter team name..."
                        id="team-search-input"
                        style={{
                            width: '100%',
                            padding: '14px 18px',
                            background: 'rgba(4, 25, 50, 0.8)',
                            border: '1px solid rgba(0,212,255,0.3)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            outline: 'none',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            letterSpacing: '0.05em',
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '12px',
                        background: 'var(--bg-deep)',
                        padding: '0 6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.5rem',
                        color: 'var(--accent-cyan)',
                        letterSpacing: '0.15em',
                    }}>
                        TEAM NAME
                    </div>
                </div>
                <button
                    type="submit"
                    id="team-search-button"
                    style={{
                        padding: '14px 28px',
                        background: 'rgba(0,212,255,0.1)',
                        border: '1px solid var(--accent-cyan)',
                        borderRadius: '8px',
                        color: 'var(--accent-cyan)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,212,255,0.2)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    SEARCH
                </button>
            </motion.form>

            {/* Results */}
            <AnimatePresence mode="wait">
                {searched && !searchedTeam && (
                    <motion.div
                        key="not-found"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            textAlign: 'center',
                            padding: '3rem',
                            maxWidth: '500px',
                            margin: '0 auto',
                        }}
                    >
                        <div style={{
                            fontSize: '3rem',
                            fontFamily: 'var(--font-header)',
                            color: 'var(--accent-cyan)',
                            opacity: 0.2,
                            marginBottom: '1rem',
                        }}>
                            ∅
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-header)',
                            fontSize: '1.2rem',
                            color: 'var(--text-primary)',
                            marginBottom: '0.5rem',
                        }}>
                            TEAM NOT FOUND
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                            marginBottom: '1rem',
                        }}>
                            No team found matching &quot;{query}&quot;. Please check the spelling and try again.
                        </div>

                        {/* Suggestions */}
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.05em',
                            marginTop: '1.5rem',
                        }}>
                            <div style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)', letterSpacing: '0.15em' }}>AVAILABLE TEAMS:</div>
                            {teams.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => { setQuery(t.teamName); }}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s',
                                        color: 'var(--text-muted)',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                                >
                                    {t.teamName}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {searched && searchedTeam && (
                    <motion.div
                        key="found"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <TeamCard team={searchedTeam} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
