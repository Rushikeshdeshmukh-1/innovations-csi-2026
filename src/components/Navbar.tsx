'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
    { label: 'OVERVIEW', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'TIMELINE', href: '#timeline' },
    { label: 'PRIZES', href: '#prizes' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'REGISTER', href: '#register' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 2rem',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                transition: 'all 0.3s ease',
                background: scrolled ? 'rgba(4, 11, 24, 0.95)' : 'rgba(4, 11, 24, 0.2)',
                borderBottom: scrolled ? '1px solid rgba(0, 212, 255, 0.15)' : '1px solid transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
            }}
        >
            {/* Logo on the left */}
            <a href="#hero" style={{ display: 'flex', alignItems: 'center', opacity: scrolled ? 1 : 0.8, transition: 'opacity 0.3s' }}>
                <img src="/csi-logo.png" alt="CSI Logo" style={{ height: '32px', width: 'auto' }} />
            </a>

            {/* Navigation Links */}
            <div style={{ display: 'flex', gap: '0.3rem' }}>
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        style={{
                            padding: '0.4rem 0.9rem',
                            color: 'var(--text-muted)',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            border: '1px solid transparent',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.color = 'var(--accent-cyan)';
                            el.style.borderColor = 'rgba(0,212,255,0.2)';
                            el.style.background = 'rgba(0,212,255,0.05)';
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.color = 'var(--text-muted)';
                            el.style.borderColor = 'transparent';
                            el.style.background = 'transparent';
                        }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </motion.nav>
    );
}
