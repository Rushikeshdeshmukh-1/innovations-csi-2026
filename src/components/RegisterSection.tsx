'use client';

import { motion } from 'framer-motion';
import GlitchButton from './GlitchButton';

export default function RegisterSection() {
    return (
        <section
            id="register"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '6rem 2rem',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
                ◈ SECTION 07 — ENROLLMENT PORTAL
            </div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="holo-text"
                style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                }}
            >
                REGISTER <span style={{ color: 'var(--accent-cyan)' }}>NOW</span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    marginBottom: '3rem',
                    letterSpacing: '0.04em',
                    maxWidth: '600px',
                    lineHeight: '1.6',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
            >
                Secure your team's spot in the innovation sprint.
                Click below to access the official registration portal.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                {/* 
                   Replacing the form with a single call-to-action button as requested.
                   "remove registration form just keep registration button there"
                */}
                <GlitchButton
                    label="OPEN REGISTRATION FORM"
                    href="#" // This would link to the actual Google Form or Typeform
                    onClick={() => alert("Redirecting to Registration Portal...")}
                />
            </motion.div>

        </section>
    );
}
