'use client';

import { useState } from 'react';

interface GlitchButtonProps {
    label: string;
    href: string;
    onClick?: () => void;
}

export default function GlitchButton({ label, href, onClick }: GlitchButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <style jsx global>{`
                @keyframes glitchLineAnim {
                    0% { opacity: 0; top: 10%; }
                    50% { opacity: 1; top: 80%; }
                    100% { opacity: 0; top: 10%; }
                }
                @keyframes glitchLineAnim2 {
                    0% { opacity: 0; bottom: 10%; }
                    50% { opacity: 1; bottom: 80%; }
                    100% { opacity: 0; bottom: 10%; }
                }

                .glitch-btn-container {
                     position: relative;
                     display: inline-block;
                }

                .glitch-btn {
                    position: relative;
                    padding: 14px 40px;
                    background: rgba(0, 26, 43, 0.6);
                    border: 2px solid #00d4ff;
                    color: #00d4ff;
                    font-family: 'Courier New', monospace; /* Fallback */
                    font-family: var(--font-mono, monospace);
                    font-size: 1rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    cursor: pointer;
                    overflow: hidden;
                    text-transform: uppercase;
                    outline: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
                    text-decoration: none;
                    display: inline-block;
                    backdrop-filter: blur(4px);
                }

                .glitch-btn:hover {
                    background: rgba(0, 212, 255, 0.1);
                    color: #fff;
                    box-shadow: 0 0 25px rgba(0, 212, 255, 0.6), inset 0 0 10px rgba(0, 212, 255, 0.4);
                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
                }

                .glitch-line-1, .glitch-line-2 {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: #00d4ff;
                    opacity: 0;
                    pointer-events: none;
                }

                .glitch-btn:hover .glitch-line-1 {
                    animation: glitchLineAnim 1.5s infinite linear;
                }

                .glitch-btn:hover .glitch-line-2 {
                    animation: glitchLineAnim2 2s infinite linear reverse;
                }

                .btn-bg-slide {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
                    transition: left 0.4s ease;
                    z-index: 1;
                }

                .glitch-btn:hover .btn-bg-slide {
                    left: 100%;
                    transition: left 0.6s ease;
                }
            `}</style>

            <a
                href={href}
                onClick={onClick}
                className="glitch-btn-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ textDecoration: 'none' }}
            >
                <button className="glitch-btn">
                    <span style={{ position: 'relative', zIndex: 2 }}>{label}</span>
                    <div className="btn-bg-slide" />
                    <div className="glitch-line-1" />
                    <div className="glitch-line-2" />
                </button>
            </a>
        </>
    );
}
