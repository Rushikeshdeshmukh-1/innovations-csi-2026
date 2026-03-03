'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
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
                padding: scrolled ? '0.5rem 0' : '1.5rem 0',
                background: 'transparent',
                backdropFilter: 'none',
                borderBottom: 'none',
                transition: 'all 0.3s ease',
            }}
        >
            {/* 
              Outer Container:
              On desktop (md:flex-row) -> Space between logo and links
              On mobile (flex-col)     -> Logo top centered, scrollable links below
            */}
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8">

                {/* Logo Container - Hidden on Mobile */}
                <div className="hidden md:flex md:items-center md:mb-0">
                    <img
                        src="/csi-logo.png"
                        alt="CSI Logo"
                        className="logo-img"
                        style={{
                            height: '40px',
                            width: 'auto',
                            filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))'
                        }}
                    />
                </div>

                {/* Desktop + Mobile Navigation Container */}
                <div
                    className="w-full md:w-auto overflow-x-auto hide-scrollbar"
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        paddingBottom: '0.5rem', // Slight padding for mobile scroll visual
                    }}
                >
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', justifyContent: 'center', width: 'max-content', margin: '0 auto' }}>
                        {navLinks.map((link) => (
                            <a
                                className="interactive"
                                key={link.name}
                                href={link.href}
                                style={{
                                    fontFamily: 'var(--font-mono, monospace)',
                                    fontSize: '0.75rem',
                                    color: 'var(--text-bright, #fff)',
                                    textDecoration: 'none',
                                    letterSpacing: '0.1em',
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap', // Prevent wrapping on mobile
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#00d4ff';
                                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-bright, #fff)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Register Button - Right aligned Desktop */}
                <div className="hidden md:flex md:items-center">
                    <a
                        href="#register"
                        style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.8rem',
                            color: '#00d4ff',
                            textDecoration: 'none',
                            letterSpacing: '0.1em',
                            padding: '0.5rem 1.2rem',
                            borderRadius: '4px',
                            border: '1px solid currentColor',
                            backgroundColor: 'rgba(0, 212, 255, 0.1)',
                            fontWeight: 700,
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.3)';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        REGISTER NOW
                    </a>
                </div>

            </div>
        </motion.nav>
    );
}
