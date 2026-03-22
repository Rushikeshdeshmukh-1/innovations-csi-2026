'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useLeaderboardStore, Team } from '@/store/leaderboardStore';
import GlitchButton from '@/components/GlitchButton';
import Link from 'next/link';

/* ─── Venue Map ─── */
function VenueMap({ venue, category }: { venue: string; category: string }) {
    const isSoftware = category === 'SOFTWARE';
    const venues = isSoftware
        ? ['GST AUDI', 'IEM']
        : ['LAB-5', 'LAB-6', 'LAB-7'];

    const venuePositions: Record<string, { x: number; y: number; w: number; h: number }> = {
        'GST AUDI': { x: 30, y: 30, w: 120, h: 70 },
        'IEM': { x: 180, y: 30, w: 120, h: 70 },
        'LAB-5': { x: 20, y: 30, w: 90, h: 70 },
        'LAB-6': { x: 125, y: 30, w: 90, h: 70 },
        'LAB-7': { x: 230, y: 30, w: 90, h: 70 },
    };

    const accentColor = isSoftware ? '#00d4ff' : '#ff6b35';

    return (
        <div
            style={{
                background: 'rgba(13,26,58,0.5)',
                border: `1px solid rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.2)`,
                borderRadius: '8px',
                padding: '1.2rem',
            }}
        >
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                marginBottom: '0.8rem',
            }}>
                ◈ VENUE MAP — {isSoftware ? 'SOFTWARE' : 'HARDWARE'}
            </div>

            <svg viewBox={`0 0 ${isSoftware ? 340 : 340} 130`} width="100%" style={{ maxWidth: '500px' }}>
                {/* Grid background */}
                <defs>
                    <pattern id="venueGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke={`rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.08)`} strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="340" height="130" fill="url(#venueGrid)" />

                {venues.map((v) => {
                    const pos = venuePositions[v];
                    const isActive = v === venue;
                    return (
                        <g key={v}>
                            <rect
                                x={pos.x}
                                y={pos.y}
                                width={pos.w}
                                height={pos.h}
                                rx="4"
                                fill={isActive ? `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.15)` : `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.03)`}
                                stroke={isActive ? accentColor : `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.2)`}
                                strokeWidth={isActive ? 2 : 1}
                            />
                            <text
                                x={pos.x + pos.w / 2}
                                y={pos.y + pos.h / 2 + 4}
                                textAnchor="middle"
                                fill={isActive ? accentColor : `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.4)`}
                                fontSize="10"
                                fontFamily="var(--font-mono)"
                                fontWeight={isActive ? 'bold' : 'normal'}
                            >
                                {v}
                            </text>
                            {isActive && (
                                <motion.rect
                                    x={pos.x}
                                    y={pos.y}
                                    width={pos.w}
                                    height={pos.h}
                                    rx="4"
                                    fill="none"
                                    stroke={accentColor}
                                    strokeWidth={2}
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                        </g>
                    );
                })}

                {/* Label */}
                <text x="170" y="120" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="var(--font-mono)">
                    YOUR VENUE IS HIGHLIGHTED
                </text>
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
            <div style={{
                fontSize: '6rem',
                fontWeight: 700,
                fontFamily: 'var(--font-header)',
                color: 'var(--accent-cyan)',
                opacity: 0.2,
                lineHeight: 1,
                marginBottom: '1rem',
            }}>
                404
            </div>
            <div style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-header)',
            }}>
                TEAM NOT FOUND
            </div>
            <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                marginBottom: '2rem',
            }}>
                ERROR: SCHEMATIC REFERENCE NOT IN DATABASE
            </div>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <GlitchButton label="RETURN TO HUB" href="/" />
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

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-300, 300], [8, -8]);
    const rotateY = useTransform(x, [-300, 300], [-8, 8]);

    const springConfig = { damping: 25, stiffness: 120 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - rect.left - rect.width / 2;
        const mouseY = event.clientY - rect.top - rect.height / 2;
        x.set(mouseX);
        y.set(mouseY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTeam(getTeamById(teamId));
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [teamId, getTeamById]);

    if (loading) {
        return (
            <div style={{
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
            }}>
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

    const categoryColor = team.category === 'HARDWARE' ? '#ff6b35' : '#00d4ff';
    const categoryIcon = team.category === 'HARDWARE' ? '⚙' : '💻';

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: 'clamp(3rem, 8vw, 5rem) clamp(0.75rem, 3vw, 2rem) 3rem',
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 5,
                perspective: '1200px',
            }}
        >
            {/* Back link */}
            <Link
                href="/portal"
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
                ← BACK TO TEAM LOOKUP
            </Link>

            {/* 3D Card Wrapper */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const rect = e.currentTarget.getBoundingClientRect();
                    x.set(touch.clientX - rect.left - rect.width / 2);
                    y.set(touch.clientY - rect.top - rect.height / 2);
                }}
                onTouchEnd={handleMouseLeave}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    margin: '0 auto',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                }}
            >
                {/* The Card */}
                <div
                    className="holo-hud-card"
                    style={{
                        width: '100%',
                        padding: '0',
                        overflow: 'hidden',
                        background: 'rgba(4, 25, 50, 0.85)',
                        boxShadow: `0 0 50px rgba(${team.category === 'HARDWARE' ? '255,107,53' : '0,212,255'},0.15), 0 25px 50px rgba(0,0,0,0.4)`,
                        display: 'flex',
                        flexDirection: 'column',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                    }}
                >
                    {/* Header Status Bar */}
                    <div style={{
                        padding: 'clamp(0.8rem, 2vw, 1rem)',
                        background: `linear-gradient(90deg, rgba(${team.category === 'HARDWARE' ? '255,107,53' : '0,212,255'},0.1), transparent)`,
                        borderBottom: `1px solid rgba(${team.category === 'HARDWARE' ? '255,107,53' : '0,212,255'},0.3)`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transform: 'translateZ(20px)',
                    }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: categoryColor, letterSpacing: '0.1em' }}>
                            ID: {team.id.toUpperCase()}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{
                                width: '8px', height: '8px',
                                background: statusColors[team.status] || '#3A86FF',
                                borderRadius: '50%',
                                boxShadow: `0 0 10px ${statusColors[team.status] || '#3A86FF'}`,
                            }} />
                            <span style={{
                                fontSize: '0.55rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)',
                                color: statusColors[team.status] || '#3A86FF',
                                letterSpacing: '0.1em',
                            }}>
                                {team.status.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{
                        padding: 'clamp(1.2rem, 4vw, 2rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transform: 'translateZ(40px)',
                    }}>
                        {/* Avatar */}
                        <div style={{
                            width: 'clamp(70px, 15vw, 100px)',
                            height: 'clamp(70px, 15vw, 100px)',
                            margin: '0 auto 1.2rem',
                            borderRadius: '50%',
                            border: `2px dashed ${categoryColor}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            color: categoryColor,
                            background: `rgba(${team.category === 'HARDWARE' ? '255,107,53' : '0,212,255'},0.05)`,
                            boxShadow: `0 0 20px rgba(${team.category === 'HARDWARE' ? '255,107,53' : '0,212,255'},0.2)`,
                            transform: 'translateZ(20px)',
                        }}>
                            {team.teamName.charAt(0)}
                        </div>

                        {/* Team Name */}
                        <h1 style={{
                            fontFamily: 'var(--font-header)',
                            fontSize: 'clamp(1.3rem, 5vw, 2rem)',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '0.3rem',
                            textShadow: '0 0 10px rgba(255,255,255,0.3)',
                            wordBreak: 'break-word',
                        }}>
                            {team.teamName}
                        </h1>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: categoryColor,
                            marginBottom: '1.5rem',
                            letterSpacing: '0.1em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                        }}>
                            <span>{categoryIcon}</span>
                            <span>{team.category}</span>
                        </div>

                        {/* Stats Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                            gap: '0.6rem',
                            width: '100%',
                            marginBottom: '1.5rem',
                        }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.7rem', borderRadius: '8px', transform: 'translateZ(10px)' }}>
                                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>VENUE</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', wordBreak: 'break-word' }}>{team.roomNumber || 'TBA'}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.7rem', borderRadius: '8px', transform: 'translateZ(10px)' }}>
                                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>MEMBERS</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{team.members.length}</div>
                            </div>
                        </div>

                        {/* Status */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STATUS:</span>
                            <span style={{ fontSize: '0.65rem', color: statusColors[team.status], fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>{team.status.toUpperCase()}</span>
                        </div>

                        {/* Members List */}
                        <div style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(0,212,255,0.15)',
                            borderRadius: '8px',
                            padding: '0.8rem',
                            marginBottom: '1rem',
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.5rem',
                                letterSpacing: '0.15em',
                                color: 'var(--text-muted)',
                                marginBottom: '0.5rem',
                                textAlign: 'left',
                            }}>
                                👥 TEAM MEMBERS
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {team.members.map((member, idx) => (
                                    <div key={member.name} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.3rem 0.5rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '4px',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.6rem',
                                            color: 'var(--text-primary)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            flex: 1,
                                            minWidth: 0,
                                        }}>
                                            {member.name}
                                        </span>
                                        {idx === 0 && (
                                            <span style={{
                                                fontSize: '0.45rem',
                                                fontWeight: 700,
                                                fontFamily: 'var(--font-mono)',
                                                color: 'var(--accent-gold)',
                                                letterSpacing: '0.1em',
                                                flexShrink: 0,
                                                marginLeft: '0.5rem',
                                            }}>LEAD</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Food Check-in Status */}
                        <div style={{
                            width: '100%',
                            background: team.foodCheckedIn ? 'rgba(0,255,136,0.08)' : 'rgba(255,59,48,0.08)',
                            border: `1px solid ${team.foodCheckedIn ? 'rgba(0,255,136,0.3)' : 'rgba(255,59,48,0.3)'}`,
                            borderRadius: '8px',
                            padding: '0.8rem',
                        }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem',
                            }}>
                                <span style={{ fontSize: '0.8rem' }}>🍽</span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em',
                                    color: team.foodCheckedIn ? '#00ff88' : '#ff3b30',
                                }}>
                                    {team.foodCheckedIn ? 'ALL CHECKED IN' : 'FOOD PENDING'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                {team.members.map((member) => (
                                    <div key={member.name} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-primary)',
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
                                        }}>{member.name}</span>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
                                            color: member.foodCheckedIn ? '#00ff88' : '#ff3b30',
                                            flexShrink: 0, marginLeft: '0.5rem',
                                        }}>
                                            {member.foodCheckedIn ? '✓' : '✗'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div style={{
                        padding: 'clamp(1rem, 3vw, 1.5rem)',
                        borderTop: '1px solid rgba(0,212,255,0.15)',
                        background: 'rgba(0,0,0,0.2)',
                        transform: 'translateZ(30px)',
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {team.presentationUrl && (
                                <GlitchButton label="SLIDES" href={team.presentationUrl} />
                            )}
                            <GlitchButton label="BACK TO PORTAL" href="/portal" variant="gold" />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '0.8rem', fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
                            AUTHORIZED ACCESS ONLY • SECURE CONNECTION
                        </div>
                    </div>

                    {/* Scanning Line Animation */}
                    <motion.div
                        style={{
                            position: 'absolute', left: 0, right: 0, height: '2px',
                            background: `rgba(${team.category === 'HARDWARE' ? '255,107,53' : '0,212,255'},0.5)`,
                            boxShadow: `0 0 15px rgba(${team.category === 'HARDWARE' ? '255,107,53' : '0,212,255'},0.8)`,
                            zIndex: 10,
                            transform: 'translateZ(5px)',
                        }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </motion.div>

            {/* Venue Map Below Card */}
            {team.roomNumber && (
                <div style={{ marginTop: '2rem', maxWidth: '480px', margin: '2rem auto 0' }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '0.8rem',
                        fontSize: '0.7rem',
                        opacity: 0.7,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.1em',
                    }}>
                        VENUE LOCATION
                    </div>
                    <VenueMap venue={team.roomNumber} category={team.category} />
                </div>
            )}
        </div>
    );
}
