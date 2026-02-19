'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
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

    // 3D Tilt Logic - MOVED TO TOP to fix Hook Error
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-300, 300], [15, -15]);
    const rotateY = useTransform(x, [-300, 300], [-15, 15]);

    // Smooth spring physics for rotation
    const springConfig = { damping: 20, stiffness: 100 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX - width / 2;
        const yPct = mouseY - height / 2;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

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
                perspective: '1200px', // Detailed perspective for 3D
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

            {/* ID Card Wrapper for Tilt Event */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const rect = e.currentTarget.getBoundingClientRect();
                    const width = rect.width;
                    const height = rect.height;
                    const mouseX = touch.clientX - rect.left;
                    const mouseY = touch.clientY - rect.top;
                    const xPct = mouseX - width / 2;
                    const yPct = mouseY - height / 2;
                    x.set(xPct);
                    y.set(yPct);
                }}
                onTouchEnd={handleMouseLeave}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    margin: '0 auto',
                    position: 'relative',
                    aspectRatio: '3/5',
                    transformStyle: 'preserve-3d', // Enable 3D children
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                }}
            >
                {/* The Card Itself */}
                <div
                    className="holo-hud-card"
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '0',
                        overflow: 'hidden',
                        background: 'rgba(4, 25, 50, 0.85)',
                        boxShadow: '0 0 50px rgba(0, 212, 255, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        // Backface hidden? kept visible for glass effect
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)', // GPU
                    }}
                >
                    {/* Header Status Bar (Parallax Z=20) */}
                    <div
                        style={{
                            padding: '1rem',
                            background: 'linear-gradient(90deg, rgba(0,212,255,0.1), transparent)',
                            borderBottom: '1px solid rgba(0,212,255,0.3)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transform: 'translateZ(20px)',
                        }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-cyan)' }}>
                            ID: {team.id.toUpperCase()}
                        </div>
                        <div style={{
                            width: '8px', height: '8px',
                            background: team.status === 'Shortlisted' ? '#00ff88' : team.status === 'Eliminated' ? '#ff3b30' : 'var(--accent-gold)',
                            borderRadius: '50%',
                            boxShadow: `0 0 10px ${team.status === 'Shortlisted' ? '#00ff88' : 'var(--accent-gold)'}`
                        }} />
                    </div>

                    {/* Main Content (Parallax Z=40) */}
                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', transform: 'translateZ(40px)' }}>

                        {/* Holographic Avatar Placeholder */}
                        <div style={{
                            width: '100px', height: '100px', margin: '0 auto 1.5rem',
                            borderRadius: '50%',
                            border: '2px dashed var(--accent-cyan)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2rem',
                            color: 'var(--accent-cyan)',
                            background: 'rgba(0,212,255,0.05)',
                            boxShadow: '0 0 20px rgba(0,212,255,0.2)',
                            transform: 'translateZ(20px)', // Extra pop
                        }}>
                            {team.teamName.charAt(0)}
                        </div>

                        <h1 style={{
                            fontFamily: 'var(--font-header)', fontSize: '2rem', fontWeight: 700, color: '#fff',
                            marginBottom: '0.5rem', textShadow: '0 0 10px rgba(255,255,255,0.3)'
                        }}>
                            {team.projectName}
                        </h1>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '2rem', letterSpacing: '0.1em' }}>
                            {team.teamName.toUpperCase()}
                        </div>

                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', transform: 'translateZ(10px)' }}>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>ROOM</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{team.roomNumber || 'TBA'}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', transform: 'translateZ(10px)' }}>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>SCORE</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{team.score}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>STATUS:</span>
                            <span style={{ fontSize: '0.7rem', color: statusColors[team.status], fontWeight: 700, letterSpacing: '0.1em' }}>{team.status.toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Footer Actions (Parallax Z=30) */}
                    <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(0,212,255,0.15)', background: 'rgba(0,0,0,0.2)', transform: 'translateZ(30px)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            {team.presentationUrl && (
                                <GlitchButton label="SLIDES" href={team.presentationUrl} />
                            )}
                            <GlitchButton label="CONTACT" onClick={() => alert('Organizer Signal Sent!')} variant="gold" />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
                            AUTHORIZED ACCESS ONLY • SECURE CONNECTION
                        </div>
                    </div>

                    {/* Scanning Line Animation (Z=5) */}
                    <motion.div
                        style={{
                            position: 'absolute', left: 0, right: 0, height: '2px', background: 'rgba(0,212,255,0.5)',
                            boxShadow: '0 0 15px rgba(0,212,255,0.8)',
                            zIndex: 10,
                            transform: 'translateZ(5px)'
                        }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </motion.div>

            {/* Map Below Card */}
            {team.roomNumber && (
                <div style={{ marginTop: '3rem', maxWidth: '450px', margin: '3rem auto 0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>LOCATION DATA</div>
                    <RoomMap roomNumber={team.roomNumber} />
                </div>
            )}
        </div>
    );
}
