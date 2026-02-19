'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecurityDrone() {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [destroyed, setDestroyed] = useState(false);
    const [score, setScore] = useState(0);

    // Function to move the drone to a random position
    const moveDrone = useCallback(() => {
        if (destroyed) return;
        const newX = Math.random() * 80 + 10; // Keep within 10-90% width
        const newY = Math.random() * 80 + 10; // Keep within 10-90% height
        setPosition({ x: newX, y: newY });
    }, [destroyed]);

    // Move periodically
    useEffect(() => {
        const interval = setInterval(moveDrone, 2000);
        return () => clearInterval(interval);
    }, [moveDrone]);

    const handleShoot = () => {
        if (destroyed) return;
        setDestroyed(true);
        setScore(s => s + 1);

        // Respawn after delay
        setTimeout(() => {
            setDestroyed(false);
            moveDrone();
        }, 1500);
    };

    return (
        <>
            <AnimatePresence>
                {!destroyed && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                        }}
                        exit={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
                        transition={{
                            left: { duration: 2, ease: "easeInOut" },
                            top: { duration: 2, ease: "easeInOut" },
                            scale: { duration: 0.3 },
                            opacity: { duration: 0.3 }
                        }}
                        onClick={handleShoot}
                        style={{
                            position: 'absolute',
                            zIndex: 50, // Above gear but below UI overlay
                            width: '60px',
                            height: '60px',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            cursor: 'crosshair',
                            pointerEvents: 'auto',
                            transform: 'translate(-50%, -50%)', // Center on coordinate
                        }}
                    >
                        {/* Visual Representation of the Drone */}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            {/* Spinning Outer Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    border: '2px dashed #ff3b30', // Red for hostile/target
                                    borderRadius: '50%',
                                    opacity: 0.8,
                                }}
                            />

                            {/* Inner Core */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    inset: '25%',
                                    background: 'rgba(255, 59, 48, 0.2)',
                                    border: '1px solid #ff3b30',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 15px rgba(255, 59, 48, 0.6)',
                                }}
                            />

                            {/* Center Dot */}
                            <div style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                width: '6px', height: '6px',
                                background: '#ff3b30',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)',
                            }} />

                            {/* Scanning Line - "Target Locked" feel */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: '50%', left: '0', right: '0',
                                    height: '1px',
                                    background: 'rgba(255, 59, 48, 0.8)',
                                    boxShadow: '0 0 8px #ff3b30',
                                }}
                                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Label */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                color: '#ff3b30',
                                whiteSpace: 'nowrap',
                                letterSpacing: '1px',
                                textShadow: '0 0 5px rgba(255,59,48,0.8)'
                            }}>
                                TARGET
                            </div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Explosion Effect (Separate element to persist after button removal) */}
            <AnimatePresence>
                {destroyed && (
                    <motion.div
                        initial={{ opacity: 1, scale: 0.5, left: `${position.x}%`, top: `${position.y}%` }}
                        animate={{ opacity: 0, scale: 2.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'absolute',
                            zIndex: 51,
                            width: '100px',
                            height: '100px',
                            background: 'radial-gradient(circle, rgba(255,59,48,0.8) 0%, transparent 70%)',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            borderRadius: '50%',
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', width: '100%', height: '1px', background: '#ff3b30', transform: 'translate(-50%, -50%) rotate(45deg)'
                        }} />
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', width: '100%', height: '1px', background: '#ff3b30', transform: 'translate(-50%, -50%) rotate(-45deg)'
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Score HUD */}
            {score > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={score} // Re-animate on score change
                    style={{
                        position: 'fixed',
                        top: '80px',
                        right: '30px',
                        fontFamily: 'var(--font-mono)',
                        color: '#ff3b30',
                        fontSize: '14px',
                        zIndex: 40,
                        padding: '5px 10px',
                        border: '1px solid rgba(255,59,48,0.3)',
                        background: 'rgba(4,11,24,0.6)',
                        letterSpacing: '2px',
                    }}
                >
                    TARGETS NEUTRALIZED: {score}
                </motion.div>
            )}
        </>
    );
}
