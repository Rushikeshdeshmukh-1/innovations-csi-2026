'use client';

import { useLeaderboardStore, TeamStatus } from '@/store/leaderboardStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
    const teams = useLeaderboardStore((s) => s.teams);
    const toggleTeamFood = useLeaderboardStore((s) => s.toggleTeamFood);
    const toggleMemberFood = useLeaderboardStore((s) => s.toggleMemberFood);
    const updateTeamStatus = useLeaderboardStore((s) => s.updateTeamStatus);
    const toggleTeamDeskCheckIn = useLeaderboardStore((s) => s.toggleTeamDeskCheckIn);
    
    const [mounted, setMounted] = useState(false);
    const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setMounted(true);
        if (sessionStorage.getItem('adminAuth') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    if (!mounted) return null;

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 10 }}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="holo-hud-card" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.5rem', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>ADMIN ACCESS</h2>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter passcode to access the command center.</p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (passcode === 'CSIADMIN24') {
                            sessionStorage.setItem('adminAuth', 'true');
                            setIsAuthenticated(true);
                        } else {
                            setErrorMsg('ACCESS DENIED');
                        }
                    }}>
                        <input
                            type="password"
                            value={passcode}
                            onChange={(e) => { setPasscode(e.target.value); setErrorMsg(''); }}
                            placeholder="PASSCODE"
                            style={{
                                width: '100%', padding: '12px', marginBottom: '1rem',
                                background: 'rgba(0,0,0,0.5)', border: errorMsg ? '1px solid #ff3b30' : '1px solid rgba(0,212,255,0.3)',
                                color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)', textAlign: 'center', letterSpacing: '0.2em'
                            }}
                        />
                        {errorMsg && <div style={{ color: '#ff3b30', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>{errorMsg}</div>}
                        <button type="submit" className="cyber-button" style={{ width: '100%', padding: '12px' }}>
                            AUTHENTICATE
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const filteredTeams = teams.filter((t) =>
        t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statusOptions: TeamStatus[] = ['Under Review', 'Pitching', 'Shortlisted', 'Eliminated'];

    const statusColors: Record<string, string> = {
        'Under Review': '#3A86FF',
        Pitching: '#FFBE0B',
        Shortlisted: '#00ff88',
        Eliminated: '#ff3b30',
    };

    const totalMembers = teams.reduce((acc, t) => acc + t.members.length, 0);
    const totalFoodChecked = teams.reduce((acc, t) => acc + t.members.filter((m) => m.foodCheckedIn).length, 0);
    const totalDeskChecked = teams.filter(t => t.deskCheckedIn).length;

    return (
        <div style={{
            minHeight: '100vh',
            padding: '2rem 1.5rem 3rem',
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 5,
        }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <Link
                    href="/"
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        letterSpacing: '0.1em',
                        transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                >
                    ← RETURN TO HUB
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '2.5rem' }}
            >
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    color: 'var(--accent-cyan)',
                    opacity: 0.6,
                    marginBottom: '0.5rem',
                }}>
                    ◈ ADMIN CONTROL PANEL
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.5rem',
                    textShadow: '0 0 20px rgba(0,212,255,0.3)',
                }}>
                    COMMAND CENTER
                </h1>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Link href="/admin/qr" style={{ textDecoration: 'none' }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            padding: '6px 16px',
                            border: '1px solid rgba(0,212,255,0.3)',
                            borderRadius: '4px',
                            color: 'var(--accent-cyan)',
                            transition: 'all 0.3s',
                            display: 'inline-block',
                        }}>
                            🔗 QR GENERATOR
                        </span>
                    </Link>
                </div>
            </motion.div>

            {/* Stats Bar */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
            }}>
                {[
                    { label: 'TOTAL TEAMS', value: teams.length, color: 'var(--accent-cyan)' },
                    { label: 'DESK C/I', value: `${totalDeskChecked}/${teams.length}`, color: totalDeskChecked === teams.length ? '#00ff88' : '#FFBE0B' },
                    { label: 'FOOD RECVD', value: `${totalFoodChecked}/${totalMembers}`, color: totalFoodChecked === totalMembers ? '#00ff88' : 'var(--accent-gold)' },
                    { label: 'SHORTLISTED', value: teams.filter((t) => t.status === 'Shortlisted').length, color: '#00ff88' },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="holo-hud-card"
                        style={{ padding: '1rem', textAlign: 'center' }}
                    >
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.5rem',
                            letterSpacing: '0.15em',
                            color: 'var(--text-muted)',
                            marginBottom: '0.4rem',
                        }}>{stat.label}</div>
                        <div style={{
                            fontFamily: 'var(--font-header)',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: stat.color,
                            textShadow: `0 0 10px ${stat.color}40`,
                        }}>{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Search teams or projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="admin-search-input"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '10px 16px',
                        background: 'rgba(4, 25, 50, 0.8)',
                        border: '1px solid rgba(0,212,255,0.25)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'; }}
                />
            </div>

            {/* Teams List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {filteredTeams.map((team, i) => {
                    const isExpanded = expandedTeam === team.id;
                    const membersChecked = team.members.filter((m) => m.foodCheckedIn).length;

                    return (
                        <motion.div
                            key={team.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="holo-hud-card"
                            style={{
                                padding: 0,
                                overflow: 'hidden',
                                borderColor: isExpanded ? 'rgba(0,212,255,0.4)' : undefined,
                            }}
                        >
                            {/* Team Row */}
                            <div
                                onClick={() => setExpandedTeam(isExpanded ? null : team.id)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1.2fr 1.2fr 1fr auto',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem 1.2rem',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,212,255,0.03)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                                {/* Team Name */}
                                <div>
                                    <div style={{
                                        fontFamily: 'var(--font-header)',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: '#fff',
                                        marginBottom: '0.15rem',
                                    }}>{team.teamName}</div>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.6rem',
                                        color: 'var(--text-muted)',
                                    }}>{team.projectName}</div>
                                </div>

                                {/* Category */}
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-muted)',
                                }}>{team.category}</div>

                                {/* Status */}
                                <div>
                                    <select
                                        value={team.status}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            updateTeamStatus(team.id, e.target.value as TeamStatus);
                                        }}
                                        style={{
                                            background: 'rgba(0,0,0,0.3)',
                                            border: `1px solid ${statusColors[team.status]}50`,
                                            borderRadius: '4px',
                                            color: statusColors[team.status],
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.6rem',
                                            padding: '4px 8px',
                                            outline: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {statusOptions.map((s) => (
                                            <option key={s} value={s} style={{ background: '#0a1628', color: '#fff' }}>
                                                {s.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Desk Check-In */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={team.deskCheckedIn}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleTeamDeskCheckIn(team.id);
                                            }}
                                            style={{ accentColor: 'var(--accent-cyan)', width: '16px', height: '16px', cursor: 'pointer' }}
                                        />
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                                            color: team.deskCheckedIn ? 'var(--accent-cyan)' : 'var(--text-muted)', letterSpacing: '0.05em'
                                        }}>
                                            DESK CHECK-IN
                                        </span>
                                    </label>
                                </div>

                                {/* Food Status */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}>
                                    <label
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={team.foodCheckedIn}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleTeamFood(team.id);
                                            }}
                                            style={{
                                                accentColor: '#00ff88',
                                                width: '16px',
                                                height: '16px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.55rem',
                                            color: team.foodCheckedIn ? '#00ff88' : 'var(--text-muted)',
                                            letterSpacing: '0.05em',
                                        }}>
                                            🍽 {membersChecked}/{team.members.length}
                                        </span>
                                    </label>
                                </div>

                                {/* Expand Arrow */}
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--accent-cyan)',
                                    transition: 'transform 0.3s',
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                }}>
                                    ▾
                                </div>
                            </div>

                            {/* Expanded Members */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{
                                            padding: '0 1.2rem 1.2rem',
                                            borderTop: '1px solid rgba(0,212,255,0.1)',
                                        }}>
                                            <div style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.55rem',
                                                letterSpacing: '0.15em',
                                                color: 'var(--accent-cyan)',
                                                padding: '0.8rem 0 0.5rem',
                                            }}>
                                                TEAM MEMBERS — FOOD CHECK-IN
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                {team.members.map((member) => (
                                                    <div
                                                        key={member.name}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            padding: '0.6rem 0.8rem',
                                                            background: 'rgba(255,255,255,0.02)',
                                                            borderRadius: '6px',
                                                            border: '1px solid rgba(255,255,255,0.04)',
                                                        }}
                                                    >
                                                        <div style={{
                                                            fontFamily: 'var(--font-mono)',
                                                            fontSize: '0.75rem',
                                                            color: 'var(--text-primary)',
                                                        }}>
                                                            {member.name}
                                                        </div>
                                                        <label style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            cursor: 'pointer',
                                                        }}>
                                                            <span style={{
                                                                fontFamily: 'var(--font-mono)',
                                                                fontSize: '0.6rem',
                                                                color: member.foodCheckedIn ? '#00ff88' : '#ff3b30',
                                                                fontWeight: 600,
                                                            }}>
                                                                {member.foodCheckedIn ? '✓ DONE' : '✗ PENDING'}
                                                            </span>
                                                            <input
                                                                type="checkbox"
                                                                checked={member.foodCheckedIn}
                                                                onChange={() => toggleMemberFood(team.id, member.name)}
                                                                style={{
                                                                    accentColor: '#00ff88',
                                                                    width: '16px',
                                                                    height: '16px',
                                                                    cursor: 'pointer',
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Extra Info */}
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr 1fr',
                                                gap: '0.5rem',
                                                marginTop: '1rem',
                                            }}>
                                                <div style={{
                                                    background: 'rgba(255,255,255,0.03)',
                                                    padding: '0.6rem',
                                                    borderRadius: '4px',
                                                    textAlign: 'center',
                                                }}>
                                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>ROOM</div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-header)' }}>{team.roomNumber || 'TBA'}</div>
                                                </div>
                                                <div style={{
                                                    background: 'rgba(255,255,255,0.03)',
                                                    padding: '0.6rem',
                                                    borderRadius: '4px',
                                                    textAlign: 'center',
                                                }}>
                                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>SCORE</div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-header)' }}>{team.score}</div>
                                                </div>
                                                <div style={{
                                                    background: 'rgba(255,255,255,0.03)',
                                                    padding: '0.6rem',
                                                    borderRadius: '4px',
                                                    textAlign: 'center',
                                                }}>
                                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>TIME</div>
                                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-bright)', fontFamily: 'var(--font-mono)' }}>{team.timeSlot || 'TBA'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
