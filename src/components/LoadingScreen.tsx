'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statusMessages = [
    'INITIALIZING CORE SYSTEMS...',
    'LOADING BLUEPRINT DATABASE...',
    'CONNECTING NEURAL MESH...',
    'CALIBRATING HOLOGRAPHIC DISPLAY...',
    'SYSTEM READY.',
];

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setDone(true), 400);
                    return 100;
                }
                return p + 2;
            });
        }, 40);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const idx = Math.min(Math.floor(progress / 22), statusMessages.length - 1);
        setMsgIdx(idx);
    }, [progress]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 10000,
                        background: '#040b18',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                    }}
                >
                    {/* Scan line effect */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.02) 2px, rgba(0,212,255,0.02) 4px)',
                            pointerEvents: 'none',
                        }}
                    />

                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            fontSize: '0.55rem',
                            letterSpacing: '0.4em',
                            color: '#00d4ff',
                            marginBottom: '2rem',
                            opacity: 0.6,
                        }}
                    >
                        ◈ PROJECT: SCHEMATIC ◈
                    </motion.div>

                    {/* Progress bar */}
                    <div style={{ width: '280px', marginBottom: '1.5rem' }}>
                        <div style={{
                            height: '2px',
                            background: 'rgba(0,212,255,0.1)',
                            borderRadius: '1px',
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                                    borderRadius: '1px',
                                    boxShadow: '0 0 10px rgba(0,212,255,0.6)',
                                }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: 'linear', duration: 0.05 }}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '0.5rem',
                            fontSize: '0.5rem',
                            letterSpacing: '0.15em',
                        }}>
                            <span style={{ color: '#4a6a90' }}>{statusMessages[msgIdx]}</span>
                            <span style={{ color: '#00d4ff' }}>{progress}%</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
