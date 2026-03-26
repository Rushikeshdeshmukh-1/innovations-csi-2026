'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useLeaderboardStore, Team } from '@/store/leaderboardStore';
import Link from 'next/link';

/* ─── Styled Select Dropdown ─── */
function HoloSelect({
    label,
    value,
    onChange,
    options,
    placeholder,
    id,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    id: string;
}) {
    return (
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '14px 18px',
                    background: 'rgba(4, 25, 50, 0.8)',
                    border: '1px solid rgba(0,212,255,0.3)',
                    borderRadius: '8px',
                    color: value ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%2300d4ff' stroke-width='1.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '40px',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <option value="" style={{ background: '#041932', color: 'rgba(255,255,255,0.4)' }}>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option
                        key={opt.value}
                        value={opt.value}
                        style={{ background: '#041932', color: '#fff' }}
                    >
                        {opt.label}
                    </option>
                ))}
            </select>
            <div
                style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '12px',
                    background: 'var(--bg-deep)',
                    padding: '0 6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    color: 'var(--accent-cyan)',
                    letterSpacing: '0.15em',
                    pointerEvents: 'none',
                }}
            >
                {label}
            </div>
        </div>
    );
}

/* ─── Venue Map (inline) ─── */
function VenueMap({ venue, category, panel }: { venue: string; category: string; panel?: string }) {
    const isSoftware = category === 'SOFTWARE';
    let venues: string[] = [];
    if (panel === '1') venues = ['GST AUDI'];
    else if (panel === '2') venues = ['LAB-5', 'LAB-6', 'LAB-7'];
    else if (panel === '3') venues = ['IEM CONFERENCE ROOM'];
    else venues = venue && venue !== 'ONLINE' ? [venue] : [];

    const venuePositions: Record<string, { x: number; y: number; w: number; h: number }> = {
        'GST AUDI': { x: 110, y: 20, w: 120, h: 55 },
        'IEM CONFERENCE ROOM': { x: 90, y: 20, w: 160, h: 55 },
        'LAB-5': { x: 20, y: 20, w: 90, h: 55 },
        'LAB-6': { x: 125, y: 20, w: 90, h: 55 },
        'LAB-7': { x: 230, y: 20, w: 90, h: 55 },
    };
    const accentColor = isSoftware ? '#00d4ff' : '#ff6b35';

    return (
        <svg viewBox={`0 0 340 95`} width="100%" style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
            <defs>
                <pattern id="venueGridInline" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke={`rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.06)`} strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="340" height="95" fill="url(#venueGridInline)" />
            {venues.map((v) => {
                const pos = venuePositions[v];
                const isActive = v === venue;
                return (
                    <g key={v}>
                        <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx="4"
                            fill={isActive ? `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.15)` : `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.03)`}
                            stroke={isActive ? accentColor : `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.2)`}
                            strokeWidth={isActive ? 2 : 1}
                        />
                        <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 4} textAnchor="middle"
                            fill={isActive ? accentColor : `rgba(${isSoftware ? '0,212,255' : '255,107,53'},0.4)`}
                            fontSize="9" fontFamily="var(--font-mono)" fontWeight={isActive ? 'bold' : 'normal'}
                        >{v}</text>
                        {isActive && (
                            <motion.rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx="4"
                                fill="none" stroke={accentColor} strokeWidth={2}
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                    </g>
                );
            })}
            <text x="170" y="88" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="var(--font-mono)">
                YOUR VENUE IS HIGHLIGHTED
            </text>
        </svg>
    );
}

/* ─── Full 3D Interactive Team Card ─── */
function FullTeamCard({ team }: { team: Team }) {
    const statusColors: Record<string, string> = {
        'Under Review': '#3A86FF',
        Pitching: '#FFBE0B',
        Shortlisted: '#00ff88',
        Eliminated: '#ff3b30',
    };

    const categoryColor = team.category === 'HARDWARE' ? '#ff6b35' : '#00d4ff';
    const categoryIcon = team.category === 'HARDWARE' ? '⚙' : '💻';
    const rgbAccent = team.category === 'HARDWARE' ? '255,107,53' : '0,212,255';

    // 3D tilt with cursor drag
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-300, 300], [12, -12]);
    const rotateY = useTransform(x, [-300, 300], [-12, 12]);
    const glareX = useTransform(x, [-300, 300], [0, 100]);
    const glareY = useTransform(y, [-300, 300], [0, 100]);

    const springConfig = { damping: 20, stiffness: 80, mass: 0.8 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    const springGlareX = useSpring(glareX, springConfig);
    const springGlareY = useSpring(glareY, springConfig);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
        const touch = event.touches[0];
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(touch.clientX - rect.left - rect.width / 2);
        y.set(touch.clientY - rect.top - rect.height / 2);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div style={{ perspective: '1200px', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleLeave}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleLeave}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                style={{
                    width: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    cursor: 'grab',
                }}
                whileTap={{ cursor: 'grabbing' }}
            >
                {/* Holographic glare overlay */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '12px',
                        pointerEvents: 'none',
                        zIndex: 20,
                        background: `radial-gradient(circle at ${springGlareX}% ${springGlareY}%, rgba(${rgbAccent},0.12) 0%, transparent 60%)`,
                        transform: 'translateZ(60px)',
                    }}
                />

                {/* The Card */}
                <div
                    className="holo-hud-card"
                    style={{
                        width: '100%',
                        padding: '0',
                        overflow: 'hidden',
                        background: 'rgba(4, 25, 50, 0.85)',
                        boxShadow: `0 0 50px rgba(${rgbAccent},0.15), 0 25px 60px rgba(0,0,0,0.5)`,
                        display: 'flex',
                        flexDirection: 'column',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: 'clamp(0.7rem, 2vw, 1rem)',
                        background: `linear-gradient(90deg, rgba(${rgbAccent},0.1), transparent)`,
                        borderBottom: `1px solid rgba(${rgbAccent},0.3)`,
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
                                fontSize: '0.55rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                                color: statusColors[team.status] || '#3A86FF', letterSpacing: '0.1em',
                            }}>
                                {team.status.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{
                        padding: 'clamp(1rem, 3vw, 1.5rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transform: 'translateZ(40px)',
                    }}>
                        {/* Avatar */}
                        <div style={{
                            width: 'clamp(60px, 12vw, 80px)',
                            height: 'clamp(60px, 12vw, 80px)',
                            margin: '0 auto 1rem',
                            borderRadius: '50%',
                            border: `2px dashed ${categoryColor}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                            color: categoryColor,
                            background: `rgba(${rgbAccent},0.05)`,
                            boxShadow: `0 0 25px rgba(${rgbAccent},0.25)`,
                            transform: 'translateZ(25px)',
                        }}>
                            {team.teamName.charAt(0)}
                        </div>

                        {/* Team Name */}
                        <h2 style={{
                            fontFamily: 'var(--font-header)',
                            fontSize: 'clamp(1.2rem, 5vw, 1.8rem)',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '0.2rem',
                            textShadow: '0 0 10px rgba(255,255,255,0.25)',
                            wordBreak: 'break-word',
                            transform: 'translateZ(30px)',
                        }}>
                            {team.teamName}
                        </h2>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: categoryColor,
                            marginBottom: '1.2rem',
                            letterSpacing: '0.1em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            transform: 'translateZ(25px)',
                        }}>
                            <span>{categoryIcon}</span>
                            <span>{team.category}</span>
                        </div>

                        {/* Stats Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                            gap: '0.5rem',
                            width: '100%',
                            marginBottom: '1rem',
                            transform: 'translateZ(15px)',
                        }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: '0.15rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>VENUE</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', wordBreak: 'break-word' }}>{team.roomNumber || 'TBA'}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: '0.15rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>PANEL</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{team.panel || 'TBA'}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: '0.15rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>CATEGORY</div>
                                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: categoryColor }}>{team.category}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: '0.15rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>MEMBERS</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{team.members.length}</div>
                            </div>
                        </div>

                        {/* Members List */}
                        <div style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.03)',
                            border: `1px solid rgba(${rgbAccent},0.15)`,
                            borderRadius: '8px',
                            padding: '0.7rem',
                            marginBottom: '0.8rem',
                            transform: 'translateZ(10px)',
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
                                color: 'var(--text-muted)', marginBottom: '0.4rem', textAlign: 'left',
                            }}>
                                👥 TEAM MEMBERS
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                {team.members.map((member, idx) => (
                                    <div key={member.name} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-primary)',
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
                                        }}>
                                            {member.name}
                                        </span>
                                        {idx === 0 && (
                                            <span style={{
                                                fontSize: '0.45rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                                                color: 'var(--accent-gold)', letterSpacing: '0.1em', flexShrink: 0, marginLeft: '0.5rem',
                                            }}>LEAD</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Food Check-in */}
                        <div style={{
                            width: '100%',
                            background: team.foodCheckedIn ? 'rgba(0,255,136,0.08)' : 'rgba(255,59,48,0.08)',
                            border: `1px solid ${team.foodCheckedIn ? 'rgba(0,255,136,0.3)' : 'rgba(255,59,48,0.3)'}`,
                            borderRadius: '8px',
                            padding: '0.7rem',
                            marginBottom: '0.8rem',
                            transform: 'translateZ(10px)',
                        }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem',
                            }}>
                                <span style={{ fontSize: '0.75rem' }}>🍽</span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em',
                                    color: team.foodCheckedIn ? '#00ff88' : '#ff3b30',
                                }}>
                                    {team.foodCheckedIn ? 'ALL CHECKED IN' : 'FOOD PENDING'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                                {team.members.map((member) => (
                                    <div key={member.name} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '0.2rem 0.4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-primary)',
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
                                        }}>{member.name}</span>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
                                            color: member.foodCheckedIn ? '#00ff88' : '#ff3b30', flexShrink: 0, marginLeft: '0.4rem',
                                        }}>
                                            {member.foodCheckedIn ? '✓ DONE' : '✗ PENDING'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Venue Map */}
                        {team.roomNumber && (
                            <div style={{
                                width: '100%',
                                background: 'rgba(13,26,58,0.4)',
                                border: `1px solid rgba(${rgbAccent},0.15)`,
                                borderRadius: '8px',
                                padding: '0.6rem',
                                transform: 'translateZ(5px)',
                            }}>
                                <div style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
                                    color: 'var(--text-muted)', marginBottom: '0.4rem',
                                }}>
                                    📍 VENUE LOCATION
                                </div>
                                <VenueMap venue={team.roomNumber} category={team.category} panel={team.panel} />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: 'clamp(0.8rem, 2vw, 1rem)',
                        borderTop: `1px solid rgba(${rgbAccent},0.15)`,
                        background: 'rgba(0,0,0,0.2)',
                        transform: 'translateZ(30px)',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '0.4rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                            DRAG TO EXPLORE • AUTHORIZED ACCESS ONLY
                        </div>
                    </div>

                    {/* Scanning Line */}
                    <motion.div
                        style={{
                            position: 'absolute', left: 0, right: 0, height: '2px',
                            background: `rgba(${rgbAccent},0.4)`,
                            boxShadow: `0 0 15px rgba(${rgbAccent},0.7)`,
                            zIndex: 10,
                            transform: 'translateZ(5px)',
                        }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </motion.div>
        </div>
    );
}

export default function PortalSearchPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTeamName, setSelectedTeamName] = useState('');
    const [searchedTeam, setSearchedTeam] = useState<Team | null>(null);
    const [searched, setSearched] = useState(false);
    const teams = useLeaderboardStore((s) => s.teams);

    const categories = useMemo(() => {
        const cats = [...new Set(teams.map((t) => t.category))];
        return cats.sort().map((c) => ({ value: c, label: c }));
    }, [teams]);

    const filteredTeams = useMemo(() => {
        if (!selectedCategory) return [];
        return teams
            .filter((t) => t.category === selectedCategory)
            .sort((a, b) => a.teamName.localeCompare(b.teamName))
            .map((t) => ({ value: t.teamName, label: t.teamName }));
    }, [teams, selectedCategory]);

    const handleTeamSelect = (teamName: string) => {
        setSelectedTeamName(teamName);
        if (teamName) {
            const found = teams.find((t) => t.teamName === teamName);
            setSearchedTeam(found || null);
            setSearched(true);
        } else {
            setSearched(false);
            setSearchedTeam(null);
        }
    };

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setSelectedTeamName('');
        setSearchedTeam(null);
        setSearched(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            padding: '4rem 1rem 3rem',
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
                style={{ textAlign: 'center', marginBottom: '2.5rem' }}
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
                    fontSize: 'clamp(1.5rem, 6vw, 2rem)',
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
                    Select your category and team to access your schematic
                </p>
            </motion.div>

            {/* Dropdown Selectors */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '2.5rem',
                    maxWidth: '500px',
                    margin: '0 auto 2.5rem',
                }}
            >
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <HoloSelect
                        id="category-select"
                        label="CATEGORY"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        options={categories}
                        placeholder="Select category..."
                    />
                    <HoloSelect
                        id="team-select"
                        label="TEAM NAME"
                        value={selectedTeamName}
                        onChange={handleTeamSelect}
                        options={filteredTeams}
                        placeholder={selectedCategory ? 'Select team...' : 'Select category first'}
                    />
                </div>

                <AnimatePresence>
                    {selectedCategory && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.6rem',
                                color: 'var(--text-muted)',
                                letterSpacing: '0.1em',
                                textAlign: 'center',
                                padding: '0.5rem',
                                background: 'rgba(0,212,255,0.05)',
                                borderRadius: '6px',
                                border: '1px solid rgba(0,212,255,0.1)',
                            }}
                        >
                            {filteredTeams.length} TEAMS IN {selectedCategory} •
                            VENUE: {selectedCategory === 'SOFTWARE' ? 'GST AUDI / IEM' : 'LAB-5, LAB-6, LAB-7'}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Results */}
            <AnimatePresence mode="wait">
                {searched && !searchedTeam && (
                    <motion.div
                        key="not-found"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ textAlign: 'center', padding: '3rem 1rem', maxWidth: '500px', margin: '0 auto' }}
                    >
                        <div style={{ fontSize: '3rem', fontFamily: 'var(--font-header)', color: 'var(--accent-cyan)', opacity: 0.2, marginBottom: '1rem' }}>∅</div>
                        <div style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>TEAM NOT FOUND</div>
                    </motion.div>
                )}

                {searched && searchedTeam && (
                    <motion.div
                        key={searchedTeam.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FullTeamCard team={searchedTeam} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
