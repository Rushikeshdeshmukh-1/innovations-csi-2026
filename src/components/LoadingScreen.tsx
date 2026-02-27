'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [done, setDone] = useState(false);
    const [startExit, setStartExit] = useState(false);
    const [scrambledText, setScrambledText] = useState("            ");
    const [progress, setProgress] = useState(0);
    const targetText = "CSI SIES GST";

    // Character sequence for a clean, professional decode effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    useEffect(() => {
        let frame = 0;
        const totalFrames = 60;

        const interval = setInterval(() => {
            frame++;
            setProgress((frame / totalFrames) * 100);

            if (frame >= totalFrames) {
                clearInterval(interval);
                setScrambledText(targetText);

                // Allow user to see the finalized text for a moment before slicing the screen
                setTimeout(() => setStartExit(true), 1200);
                // Wait for the exit animation to finish before unmounting to reveal the website underneath smoothly
                setTimeout(() => setDone(true), 2400);
                return;
            }

            // Progressive decode effect
            let current = "";
            for (let i = 0; i < targetText.length; i++) {
                if (targetText[i] === " " || (frame / totalFrames) > (i / targetText.length)) {
                    current += targetText[i];
                } else {
                    current += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            setScrambledText(current);
        }, 35);

        return () => clearInterval(interval);
    }, []);

    const isFinal = scrambledText === targetText;
    const splitText = scrambledText.split(' ');

    return (
        <AnimatePresence>
            {!done && (
                <div
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
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, height: '50vh',
                            background: '#040b18',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        {/* Subtle scanline overlay for top half */}
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
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        style={{
                            position: 'absolute',
                            bottom: 0, left: 0, right: 0, height: '50vh',
                            background: '#040b18',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        {/* Subtle scanline overlay for bottom half */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(200, 218, 240, 0.015) 2px, rgba(200, 218, 240, 0.015) 4px)',
                                backgroundPosition: '0 -50vh', // Adjust alignment
                            }}
                        />
                    </motion.div>

                    {/* Central Content */}
                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                        animate={{
                            opacity: startExit ? 0 : 1,
                            filter: startExit ? 'blur(20px)' : (isFinal ? 'blur(0px)' : 'blur(0.5px)'),
                            scale: startExit ? 1.05 : 1,
                        }}
                        transition={{
                            duration: startExit ? 0.8 : 0.6,
                            ease: startExit ? [0.76, 0, 0.24, 1] : 'easeOut'
                        }}
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
                            <span style={{
                                color: isFinal ? '#e8f0ff' : 'rgba(232, 240, 255, 0.5)',
                                textShadow: isFinal ? '0 0 30px rgba(232, 240, 255, 0.3)' : 'none',
                                transition: 'color 0.5s ease, text-shadow 0.6s ease'
                            }}>
                                {splitText[0]}
                            </span>
                            <span style={{
                                color: isFinal ? '#c8daf0' : 'rgba(200, 218, 240, 0.4)',
                                transition: 'color 0.5s ease'
                            }}>
                                {splitText.slice(1).join(' ')}
                            </span>
                        </div>

                        {/* Sleek Minimal Progress Wrapper */}
                        <div style={{
                            marginTop: '1.5rem',
                            height: '1px',
                            background: 'rgba(200, 218, 240, 0.1)',
                            width: '280px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: '#e8f0ff',
                                    boxShadow: '0 0 10px rgba(232, 240, 255, 0.8)',
                                    x: '-100%',
                                }}
                                animate={{ x: `${progress - 100}%` }}
                                transition={{ ease: 'linear', duration: 0.05 }}
                            />
                        </div>

                        {/* Status Micro-typography */}
                        <motion.div
                            animate={{ opacity: isFinal ? [0.5, 1, 0.5] : 0.5 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                marginTop: '1rem',
                                fontSize: '0.65rem',
                                letterSpacing: '0.3em',
                                color: isFinal ? '#e8f0ff' : 'rgba(200, 218, 240, 0.4)',
                                fontFamily: 'var(--font-mono, monospace)',
                                textTransform: 'uppercase',
                            }}
                        >
                            {isFinal ? 'SYSTEM READY' : 'DECRYPTING SEQUENCE...'}
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
