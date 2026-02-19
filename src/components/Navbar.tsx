'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '#hero' },
        { name: 'ABOUT', href: '#about' },
        { name: 'TIMELINE', href: '#timeline' },
        { name: 'PROJECTS', href: '#gallery' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: scrolled ? '1rem 2rem' : '1.5rem 3rem',
                    background: scrolled ? 'rgba(4, 11, 24, 0.8)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(0, 212, 255, 0.1)' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                        src="/csi-logo.png"
                        alt="CSI Logo"
                        style={{
                            height: '45px',
                            width: 'auto',
                            filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))'
                        }}
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.8rem',
                                color: 'var(--text-muted, #aaa)',
                                textDecoration: 'none',
                                letterSpacing: '0.1em',
                                position: 'relative',
                                transition: 'color 0.3s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted, #aaa)'}
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Registration Button moved to Navbar */}
                    <a
                        href="#"
                        style={{
                            padding: '8px 20px',
                            background: 'rgba(0, 212, 255, 0.15)',
                            border: '1px solid var(--accent-cyan, #00d4ff)',
                            color: 'var(--accent-cyan, #00d4ff)',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease',
                            marginLeft: '1rem',
                            boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent-cyan, #00d4ff)';
                            e.currentTarget.style.color = '#040b18';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)';
                            e.currentTarget.style.color = 'var(--accent-cyan, #00d4ff)';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.2)';
                        }}
                    >
                        REGISTER NOW
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ cursor: 'pointer', color: 'var(--accent-cyan, #00d4ff)' }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(4, 11, 24, 0.95)',
                            backdropFilter: 'blur(20px)',
                            zIndex: 60,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2rem'
                        }}
                    >
                        <div
                            style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'var(--accent-cyan, #00d4ff)', cursor: 'pointer' }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    fontFamily: 'var(--font-header, sans-serif)',
                                    fontSize: '1.5rem',
                                    color: 'var(--text-bright, #fff)',
                                    textDecoration: 'none',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
