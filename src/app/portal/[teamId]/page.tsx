'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useLeaderboardStore, Team } from '@/store/leaderboardStore';
import GlitchButton from '@/components/GlitchButton';
import Link from 'next/link';

function RoomMap({ roomNumber }: { roomNumber: string }) {
    const block = roomNumber?.charAt(0) || 'A';
    const room = roomNumber?.slice(2) || '000';

    // Grid positions for blocks
    const blockPositions: Record<string, { x: number; y: number }> = {
        A: { x: 60, y: 50 },
        B: { x: 200, y: 50 },
        C: { x: 130, y: 150 },
    };

    const pos = blockPositions[block] || blockPositions['A'];

    return (
        <div
            style={{
                background: 'rgba(13,26,58,0.5)',
                border: '1px solid rgba(58,134,255,0.2)',
                borderRadius: '8px',
                padding: '1.5rem',
            }}
        >
            <div
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                    marginBottom: '1rem',
                }}
            >
                ◈ DIRECTIONAL COMPASS — FLOOR PLAN
            </div>

            <svg
                viewBox="0 0 340 220"
                width="100%"
                style={{ maxWidth: '500px' }}
            >
                {/* Grid background */}
                <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(58,134,255,0.1)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="340" height="220" fill="url(#smallGrid)" />

                {/* Building outline */}
                <rect x="20" y="20" width="130" height="80" rx="4" fill="rgba(58,134,255,0.05)" stroke="rgba(58,134,255,0.3)" strokeWidth="1" />
                <rect x="160" y="20" width="130" height="80" rx="4" fill="rgba(58,134,255,0.05)" stroke="rgba(58,134,255,0.3)" strokeWidth="1" />
                <rect x="90" y="120" width="130" height="80" rx="4" fill="rgba(58,134,255,0.05)" stroke="rgba(58,134,255,0.3)" strokeWidth="1" />

                {/* Block labels */}
                <text x="85" y="65" textAnchor="middle" fill="rgba(58,134,255,0.5)" fontSize="12" fontFamily="var(--font-mono)">BLOCK A</text>
                <text x="225" y="65" textAnchor="middle" fill="rgba(58,134,255,0.5)" fontSize="12" fontFamily="var(--font-mono)">BLOCK B</text>
                <text x="155" y="165" textAnchor="middle" fill="rgba(58,134,255,0.5)" fontSize="12" fontFamily="var(--font-mono)">BLOCK C</text>

                {/* Corridors */}
                <line x1="150" y1="60" x2="160" y2="60" stroke="rgba(255,190,11,0.3)" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="130" y1="100" x2="130" y2="120" stroke="rgba(255,190,11,0.3)" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="200" y1="100" x2="200" y2="120" stroke="rgba(255,190,11,0.3)" strokeWidth="2" strokeDasharray="4 2" />

                {/* Highlighted room */}
                <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="12"
                    fill="rgba(255,190,11,0.2)"
                    stroke="#FFBE0B"
                    strokeWidth="2"
                    animate={{ r: [12, 16, 12], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    fill="#FFBE0B"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    fontWeight="bold"
                >
                    {room}
                </text>

                {/* Room label below */}
                <text
                    x={pos.x}
                    y={pos.y + 28}
                    textAnchor="middle"
                    fill="#FFBE0B"
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                >
                    ROOM {roomNumber}
                </text>

                {/* Compass */}
                <text x="310" y="210" fill="rgba(58,134,255,0.4)" fontSize="10" fontFamily="var(--font-mono)">N↑</text>
            </svg>
        </div>
    );
}

function TeamNotFound() {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
                zIndex: 5,
            }}
        >
            <div
                style={{
                    fontSize: '6rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-header)',
                    color: 'var(--accent-cyan)',
                    opacity: 0.2,
                    lineHeight: 1,
                    marginBottom: '1rem',
                }}
            >
                404
            </div>
            <div
                style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-header)',
                }}
            >
                TEAM NOT FOUND
            </div>
            <div
                style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                    marginBottom: '2rem',
                }}
            >
                ERROR: SCHEMATIC REFERENCE NOT IN DATABASE
            </div>
            <Link
                href="/"
                style={{ textDecoration: 'none' }}
            >
                <GlitchButton label="RETURN TO HUB" />
            </Link>
        </div>
    );
}

export default function PortalPage() {
    const params = useParams();
    const teamId = params?.teamId as string;
    const getTeamById = useLeaderboardStore((s) => s.getTeamById);
    const [team, setTeam] = useState<Team | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch delay (swap with real DB call later)
        const timer = setTimeout(() => {
            setTeam(getTeamById(teamId));
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [teamId, getTeamById]);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-cyan)',
                    letterSpacing: '0.2em',
                    position: 'relative',
                    zIndex: 5,
                }}
            >
                LOADING TEAM SCHEMATIC...
            </div>
        );
    }

    if (!team) return <TeamNotFound />;

    const statusColors: Record<string, string> = {
        'Under Review': '#3A86FF',
        Pitching: '#FFBE0B',
        Shortlisted: '#00ff88',
        Eliminated: '#ff3b30',
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: '5rem 2rem 3rem',
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 5,
            }}
        >
            {/* Back link */}
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
                    marginBottom: '2rem',
                    transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
                ← RETURN TO MAIN SCHEMATIC
            </Link>

            {/* Team header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="blueprint-panel blueprint-corners"
                style={{ borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}
            >
                <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                    ◈ TEAM PORTAL — {team.id.toUpperCase()}
                </div>

                <h1
                    style={{
                        fontFamily: 'var(--font-header)',
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem',
                    }}
                >
                    {team.projectName}
                </h1>

                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1rem',
                        letterSpacing: '0.1em',
                    }}
                >
                    BY {team.teamName.toUpperCase()}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    {/* Status */}
                    <div
                        style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '4px',
                            background: `${statusColors[team.status]}15`,
                            border: `1px solid ${statusColors[team.status]}40`,
                            color: statusColors[team.status],
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                        }}
                    >
                        ◉ {team.status.toUpperCase()}
                    </div>

                    {/* Category */}
                    <div
                        style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '4px',
                            background: 'rgba(58,134,255,0.08)',
                            border: '1px solid rgba(58,134,255,0.2)',
                            color: 'var(--accent-cyan)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                        }}
                    >
                        {team.category}
                    </div>

                    {/* Score */}
                    <div
                        style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '4px',
                            background: 'rgba(255,190,11,0.08)',
                            border: '1px solid rgba(255,190,11,0.2)',
                            color: 'var(--accent-gold)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                        }}
                    >
                        SCORE: {team.score}
                    </div>
                </div>

                {/* Team leads */}
                <div
                    style={{
                        marginTop: '1.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.1em',
                    }}
                >
                    <span style={{ opacity: 0.5 }}>TEAM LEADS:</span>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{team.leads.join(' | ')}</span>
                </div>

                {team.timeSlot && (
                    <div
                        style={{
                            marginTop: '0.5rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                        }}
                    >
                        <span style={{ opacity: 0.5 }}>TIME SLOT:</span>{' '}
                        <span style={{ color: 'var(--accent-gold)' }}>{team.timeSlot}</span>
                    </div>
                )}
            </motion.div>

            {/* Room Map */}
            {team.roomNumber && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <RoomMap roomNumber={team.roomNumber} />
                </motion.div>
            )}

            {/* Action buttons row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}
            >
                {/* Call organizer */}
                <GlitchButton
                    label="CALL ORGANIZER"
                    variant="gold"
                    onClick={() => {
                        alert('📡 Webhook triggered! An organizer will be with you shortly.\n\n(In production, this sends a POST to Discord/Slack)');
                    }}
                />

                {/* Digital kit links */}
                {team.presentationUrl && (
                    <GlitchButton
                        label="PRESENTATION"
                        href={team.presentationUrl}
                    />
                )}

                {team.certificateUrl && (
                    <GlitchButton
                        label="CERTIFICATE"
                        href={team.certificateUrl}
                    />
                )}
            </motion.div>

            {/* Technical info panel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                    background: 'rgba(13,26,58,0.5)',
                    border: '1px solid rgba(28,37,65,0.5)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    lineHeight: 2,
                }}
            >
                <div style={{ opacity: 0.5, marginBottom: '0.5rem' }}>◈ TECHNICAL METADATA</div>
                <div>TEAM_ID: {team.id}</div>
                <div>POSITION: #{team.position}</div>
                <div>ROOM: {team.roomNumber || 'N/A'}</div>
                <div>SLOT: {team.timeSlot || 'N/A'}</div>
                <div>CATEGORY: {team.category}</div>
                <div style={{ marginTop: '0.5rem', opacity: 0.3 }}>
                    BUILD: 2045.10.27_A | PORTAL_VERSION: 1.0.0
                </div>
            </motion.div>
        </div>
    );
}
