'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [done, setDone] = useState(false);
    const [startExit, setStartExit] = useState(false);
    const targetText = "CSI SIES GST";

    // Character sequence for a clean, professional decode effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // ---- Direct DOM Refs (bypass React rendering for zero-stutter animation) ----
    const word1Ref = useRef<HTMLSpanElement>(null);
    const word2Ref = useRef<HTMLSpanElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    const generateScramble = useCallback((lockedCount: number) => {
        let current = "";
        let revealed = 0;
        for (let i = 0; i < targetText.length; i++) {
            if (targetText[i] === " ") {
                current += " ";
            } else if (revealed < lockedCount) {
                current += targetText[i];
                revealed++;
            } else {
                current += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        return current;
    }, []);

    useEffect(() => {
        const nonSpaceCount = targetText.replace(/ /g, '').length; // 10
        const msPerChar = 250; // Each char locks every 250ms → 10 × 250 = 2500ms total (synced with CSS bar)

        let lockedSoFar = 0;

        // Fast scramble ticker: cycles random chars at 50ms for smooth visual
        const scrambleTicker = setInterval(() => {
            const scrambled = generateScramble(lockedSoFar);
            const parts = scrambled.split(' ');
            if (word1Ref.current) word1Ref.current.textContent = parts[0];
            if (word2Ref.current) word2Ref.current.textContent = parts.slice(1).join(' ');
        }, 50);

        // Lock ticker: locks exactly one character every 250ms (equal time each)
        const lockTicker = setInterval(() => {
            lockedSoFar++;

            if (lockedSoFar >= nonSpaceCount) {
                clearInterval(lockTicker);
                clearInterval(scrambleTicker);

                // Final reveal
                const parts = targetText.split(' ');
                if (word1Ref.current) {
                    word1Ref.current.textContent = parts[0];
                    word1Ref.current.style.color = '#e8f0ff';
                    word1Ref.current.style.textShadow = '0 0 30px rgba(232, 240, 255, 0.3)';
                }
                if (word2Ref.current) {
                    word2Ref.current.textContent = parts.slice(1).join(' ');
                    word2Ref.current.style.color = '#c8daf0';
                }
                if (statusRef.current) {
                    statusRef.current.textContent = 'SYSTEM READY';
                    statusRef.current.style.color = '#e8f0ff';
                }

                setTimeout(() => setStartExit(true), 600);
                setTimeout(() => setDone(true), 1400);
            }
        }, msPerChar);

        return () => {
            clearInterval(scrambleTicker);
            clearInterval(lockTicker);
        };
    }, [generateScramble]);

    return (
        <>
            <AnimatePresence>
                {!done && (
                    <div
                        key="loading-screen"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 10000,
                            pointerEvents: startExit ? 'none' : 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-header, "Space Grotesk", sans-serif)',
                        }}
                    >
                        {/* Top Cinematic Shutter */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: startExit ? '-100%' : 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, height: '50vh',
                                background: '#040b18',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(200, 218, 240, 0.015) 2px, rgba(200, 218, 240, 0.015) 4px)',
                                }}
                            />
                        </motion.div>

                        {/* Bottom Cinematic Shutter */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: startExit ? '100%' : 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            style={{
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0, height: '50vh',
                                background: '#040b18',
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(200, 218, 240, 0.015) 2px, rgba(200, 218, 240, 0.015) 4px)',
                                    backgroundPosition: '0 -50vh',
                                }}
                            />
                        </motion.div>

                        {/* Central Content */}
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{
                                opacity: startExit ? 0 : 1,
                                filter: startExit ? 'blur(15px)' : 'blur(0px)',
                                scale: startExit ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{
                                fontSize: 'clamp(3rem, 8vw, 6rem)',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                display: 'flex',
                                gap: 'clamp(0.5rem, 2vw, 1.5rem)',
                                textTransform: 'uppercase',
                            }}>
                                <span
                                    ref={word1Ref}
                                    style={{
                                        color: 'rgba(232, 240, 255, 0.5)',
                                        textShadow: 'none',
                                        transition: 'color 0.3s ease, text-shadow 0.3s ease',
                                    }}
                                >
                                    XK7
                                </span>
                                <span
                                    ref={word2Ref}
                                    style={{
                                        color: 'rgba(200, 218, 240, 0.4)',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    QR3V BN8
                                </span>
                            </div>

                            {/* Sleek Minimal Progress Bar — Pure CSS animation, runs on GPU compositor thread */}
                            <div style={{
                                marginTop: '1.5rem',
                                height: '1px',
                                background: 'rgba(200, 218, 240, 0.1)',
                                width: '280px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <div
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        background: '#e8f0ff',
                                        boxShadow: '0 0 10px rgba(232, 240, 255, 0.8)',
                                        animation: 'loading-progress 2.5s linear forwards',
                                    }}
                                />
                            </div>

                            {/* Status Micro-typography */}
                            <div
                                ref={statusRef}
                                style={{
                                    marginTop: '1rem',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.3em',
                                    color: 'rgba(200, 218, 240, 0.4)',
                                    fontFamily: 'var(--font-mono, monospace)',
                                    textTransform: 'uppercase',
                                    animation: 'pulse-opacity 2s infinite',
                                }}
                            >
                                DECRYPTING SEQUENCE...
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <style>{`
            @keyframes pulse-opacity {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
            @keyframes loading-progress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(0%); }
            }
        `}</style>
        </>
    );
}
