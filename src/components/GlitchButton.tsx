'use client';

import React from 'react';

interface GlitchButtonProps {
    label: string;
    href?: string;
    variant?: 'cyan' | 'gold';
    onClick?: () => void;
}

export default function GlitchButton({ label, href, variant = 'cyan', onClick }: GlitchButtonProps) {
    const color = variant === 'gold' ? '#FFBE0B' : '#00d4ff';
    const colorDim = variant === 'gold' ? 'rgba(255,190,11,0.15)' : 'rgba(0,212,255,0.15)';

    const style: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.7rem 2rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.18em',
        color: color,
        background: colorDim,
        border: `1px solid ${color}40`,
        borderRadius: '2px',
        textDecoration: 'none',
        cursor: 'none',
        transition: 'all 0.3s ease',
        position: 'relative' as const,
    };

    const handleClick = (e: React.MouseEvent) => {
        // Mechanical click sound
        try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
            setTimeout(() => ctx.close(), 200);
        } catch {
            // Audio may not be available
        }
        onClick?.();
    };

    const handleEnter = (e: React.MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `${color}30`;
        el.style.borderColor = `${color}80`;
        el.style.boxShadow = `0 0 20px ${color}30, inset 0 0 20px ${color}08`;
    };

    const handleLeave = (e: React.MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = colorDim;
        el.style.borderColor = `${color}40`;
        el.style.boxShadow = 'none';
    };

    if (href) {
        return (
            <a
                href={href}
                style={style}
                onClick={handleClick}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                {label} <span style={{ fontSize: '0.85em' }}>↗</span>
            </a>
        );
    }

    return (
        <button
            type="submit"
            style={style}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {label} <span style={{ fontSize: '0.85em' }}>↗</span>
        </button>
    );
}
