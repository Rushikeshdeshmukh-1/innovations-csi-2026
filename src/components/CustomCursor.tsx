'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const coord = coordRef.current;
    if (!cursor || !coord) return;

    cursor.style.display = 'block';
    coord.style.display = 'block';

    const handleMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const animate = () => {
      const { x, y } = posRef.current;
      cursor.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      coord.style.transform = `translate3d(${x + 22}px, ${y + 22}px, 0)`;
      coord.textContent = `X:${Math.round(x).toString().padStart(4, '0')} Y:${Math.round(y).toString().padStart(4, '0')}`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 190, 11, 0.8))' }}>
          <circle cx="16" cy="16" r="10" fill="none" stroke="rgba(255, 190, 11, 0.6)" strokeWidth="1" />
          <circle cx="16" cy="16" r="4" fill="none" stroke="#FFBE0B" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="1.5" fill="#FFFFFF" />
          <line x1="16" y1="2" x2="16" y2="7" stroke="#FFBE0B" strokeWidth="1" />
          <line x1="16" y1="25" x2="16" y2="30" stroke="#FFBE0B" strokeWidth="1" />
          <line x1="2" y1="16" x2="7" y2="16" stroke="#FFBE0B" strokeWidth="1" />
          <line x1="25" y1="16" x2="30" y2="16" stroke="#FFBE0B" strokeWidth="1" />
        </svg>
      </div>
      <div
        ref={coordRef}
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'rgba(58,134,255,0.5)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
        }}
      />
    </>
  );
}
