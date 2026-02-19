'use client';

import { useEffect, useRef } from 'react';

export default function BlueprintGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const gridSpacing = 40;
        const smallGridSpacing = 10;
        const warpRadius = 200;
        const warpStrength = 12;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouse);

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Draw small grid
            ctx.strokeStyle = 'rgba(28, 37, 65, 0.15)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x < canvas.width; x += smallGridSpacing) {
                if (x % gridSpacing === 0) continue;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += smallGridSpacing) {
                if (y % gridSpacing === 0) continue;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw main grid with warp
            for (let x = 0; x < canvas.width; x += gridSpacing) {
                ctx.beginPath();
                for (let y = 0; y <= canvas.height; y += 2) {
                    const dx = x - mx;
                    const dy = y - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    let offsetX = 0;
                    let glowAlpha = 0.25;

                    if (dist < warpRadius) {
                        const factor = 1 - dist / warpRadius;
                        offsetX = (dx / dist) * factor * warpStrength || 0;
                        glowAlpha = 0.25 + 0.5 * factor;
                    }

                    if (y === 0) {
                        ctx.moveTo(x + offsetX, y);
                    } else {
                        ctx.lineTo(x + offsetX, y);
                    }
                    ctx.strokeStyle = `rgba(58, 134, 255, ${glowAlpha * 0.4})`;
                }
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            for (let y = 0; y < canvas.height; y += gridSpacing) {
                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x += 2) {
                    const dx = x - mx;
                    const dy = y - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    let offsetY = 0;
                    let glowAlpha = 0.25;

                    if (dist < warpRadius) {
                        const factor = 1 - dist / warpRadius;
                        offsetY = (dy / dist) * factor * warpStrength || 0;
                        glowAlpha = 0.25 + 0.5 * factor;
                    }

                    if (x === 0) {
                        ctx.moveTo(x, y + offsetY);
                    } else {
                        ctx.lineTo(x, y + offsetY);
                    }
                    ctx.strokeStyle = `rgba(58, 134, 255, ${glowAlpha * 0.4})`;
                }
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Glow near cursor
            if (mx > 0 && my > 0) {
                const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, warpRadius);
                gradient.addColorStop(0, 'rgba(58, 134, 255, 0.08)');
                gradient.addColorStop(0.5, 'rgba(58, 134, 255, 0.03)');
                gradient.addColorStop(1, 'rgba(58, 134, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(mx - warpRadius, my - warpRadius, warpRadius * 2, warpRadius * 2);
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}
