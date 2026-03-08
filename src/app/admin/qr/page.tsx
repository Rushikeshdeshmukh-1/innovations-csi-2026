'use client';

import { useEffect, useState } from 'react';

export default function QRGeneratorPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const portalUrl = `${baseUrl}/portal`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(portalUrl)}&bgcolor=FFFFFF&color=000000&margin=20`;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            position: 'relative',
            zIndex: 10,
        }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={qrUrl}
                alt="Team Portal QR"
                width={500}
                height={500}
                style={{ display: 'block' }}
            />
        </div>
    );
}
