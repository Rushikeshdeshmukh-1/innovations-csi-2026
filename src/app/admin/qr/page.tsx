'use client';

import { useLeaderboardStore } from '@/store/leaderboardStore';
import { useEffect, useState } from 'react';
import GlitchButton from '@/components/GlitchButton';

export default function QRGeneratorPage() {
    const teams = useLeaderboardStore((s) => s.teams);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    return (
        <div style={{ minHeight: '100vh', padding: '2rem', background: '#fff', color: '#000', cursor: 'default' }}>
            <div className="no-print" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '2rem', marginBottom: '1rem' }}>
                    TEAM ACCESS CARDS GENERATOR
                </h1>
                <p style={{ fontFamily: 'var(--font-mono)', marginBottom: '2rem' }}>
                    Print this page (Ctrl+P) to generate physical access cards for all teams.
                    <br />
                    Ensure "Background graphics" is enabled in print settings.
                </p>
                <div onClick={() => window.print()}>
                    <GlitchButton label="PRINT CARDS" href="#" />
                </div>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem',
                }}
            >
                {teams.map((team) => {
                    const portalUrl = `${baseUrl}/portal/${team.id}`;
                    // Using a reliable public QR code API
                    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(portalUrl)}&bgcolor=FFFFFF&color=000000&margin=10`;

                    return (
                        <div
                            key={team.id}
                            style={{
                                border: '2px solid #000',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                position: 'relative',
                                pageBreakInside: 'avoid',
                                background: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                height: '550px',
                                justifyContent: 'space-between'
                            }}
                        >
                            {/* Header */}
                            <div style={{ width: '100%', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <div style={{ fontFamily: 'var(--font-header)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                                    INNOVATIONS CSI
                                </div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                                    OFFICIAL ACCESS PASS
                                </div>
                            </div>

                            {/* Team Details */}
                            <div>
                                <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.5rem' }}>
                                    {team.teamName.toUpperCase()}
                                </h2>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#666' }}>
                                    {team.projectName}
                                </div>
                            </div>

                            {/* QR Code */}
                            <div style={{ border: '4px solid #000', padding: '0.5rem', borderRadius: '8px' }}>
                                <img
                                    src={qrUrl}
                                    alt={`QR for ${team.teamName}`}
                                    width={200}
                                    height={200}
                                    style={{ display: 'block' }}
                                />
                            </div>

                            {/* Footer Info */}
                            <div style={{ width: '100%', textAlign: 'left', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', borderBottom: '1px solid #ddd', paddingBottom: '0.2rem', marginBottom: '0.2rem' }}>
                                    <span>ID:</span>
                                    <span style={{ fontWeight: 700 }}>{team.id}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', borderBottom: '1px solid #ddd', paddingBottom: '0.2rem', marginBottom: '0.2rem' }}>
                                    <span>ROOM:</span>
                                    <span style={{ fontWeight: 700 }}>{team.roomNumber || 'TBA'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                                    <span>CATEGORY:</span>
                                    <span style={{ fontWeight: 700 }}>{team.category}</span>
                                </div>
                            </div>

                            {/* Bottom Strip */}
                            <div style={{
                                width: 'calc(100% + 3rem)',
                                margin: '0 -1.5rem -1.5rem -1.5rem',
                                background: '#000',
                                color: '#fff',
                                padding: '0.5rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.2em',
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                                marginTop: '1rem'
                            }}>
                                AUTHORIZED PERSONNEL ONLY
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: #fff !important;
                        color: #000 !important;
                    }
                }
            `}</style>
        </div>
    );
}
