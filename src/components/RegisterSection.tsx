'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlitchButton from './GlitchButton';

export default function RegisterSection() {
    const [formData, setFormData] = useState({
        teamName: '',
        projectTitle: '',
        category: '',
        leadName: '',
        leadEmail: '',
        members: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.8rem 1rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-primary)',
        background: 'rgba(0, 212, 255, 0.03)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '8px',
        outline: 'none',
        letterSpacing: '0.03em',
        transition: 'all 0.3s ease',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--accent-cyan)',
        letterSpacing: '0.15em',
        marginBottom: '0.4rem',
        opacity: 0.8,
        textShadow: '0 0 5px rgba(0, 212, 255, 0.3)',
    };

    if (submitted) {
        return (
            <section
                id="register"
                style={{
                    position: 'relative',
                    zIndex: 5,
                    padding: '6rem 2rem',
                    maxWidth: '700px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="holo-hud-card"
                    style={{ padding: '3rem' }}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
                    <h2
                        style={{
                            fontFamily: 'var(--font-header)',
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            color: '#00ff88',
                            marginBottom: '0.5rem',
                        }}
                    >
                        REGISTRATION CONFIRMED
                    </h2>
                    <p
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.8,
                            letterSpacing: '0.05em',
                        }}
                    >
                        Your team <span style={{ color: 'var(--text-primary)' }}>&quot;{formData.teamName}&quot;</span> has been registered.
                        <br />
                        Check your email for the confirmation and QR band details.
                    </p>
                    <div
                        style={{
                            marginTop: '2rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6rem',
                            color: 'var(--text-muted)',
                            opacity: 0.5,
                        }}
                    >
                        REFERENCE: SCH-{Date.now().toString(36).toUpperCase()}
                    </div>
                </motion.div>
            </section>
        );
    }

    return (
        <section
            id="register"
            style={{
                position: 'relative',
                zIndex: 5,
                padding: '6rem 2rem',
                maxWidth: '700px',
                margin: '0 auto',
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
                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                }}
            >
                REGISTER{' '}
                <span style={{ color: 'var(--accent-cyan)' }}>YOUR TEAM</span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    letterSpacing: '0.04em',
                }}
            >
                Secure your slot in the innovation sprint. Fill in the details below.
            </motion.p>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="holo-hud-card"
                style={{ padding: '2rem' }}
            >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>TEAM NAME</label>
                        <input
                            name="teamName"
                            required
                            placeholder="e.g. Circuit Breakers"
                            value={formData.teamName}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(58,134,255,0.1)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>PROJECT TITLE</label>
                        <input
                            name="projectTitle"
                            required
                            placeholder="e.g. NeuroLink AI"
                            value={formData.projectTitle}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(58,134,255,0.1)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>CATEGORY</label>
                        <select
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            style={{ ...inputStyle, appearance: 'none' as const }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.5)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.2)'; }}
                        >
                            <option value="" style={{ background: '#0a1a3a' }}>Select category...</option>
                            <option value="ai" style={{ background: '#0a1a3a' }}>Artificial Intelligence</option>
                            <option value="iot" style={{ background: '#0a1a3a' }}>Internet of Things</option>
                            <option value="blockchain" style={{ background: '#0a1a3a' }}>Blockchain</option>
                            <option value="cybersecurity" style={{ background: '#0a1a3a' }}>Cybersecurity</option>
                            <option value="ar-vr" style={{ background: '#0a1a3a' }}>AR / VR</option>
                            <option value="sustainability" style={{ background: '#0a1a3a' }}>Sustainability</option>
                            <option value="other" style={{ background: '#0a1a3a' }}>Other</option>
                        </select>
                    </div>

                    <div>
                        <label style={labelStyle}>TEAM LEAD NAME</label>
                        <input
                            name="leadName"
                            required
                            placeholder="Full name"
                            value={formData.leadName}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(58,134,255,0.1)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>TEAM LEAD EMAIL</label>
                        <input
                            name="leadEmail"
                            type="email"
                            required
                            placeholder="email@example.com"
                            value={formData.leadEmail}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(58,134,255,0.1)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>TEAM MEMBERS (COMMA SEPARATED)</label>
                        <textarea
                            name="members"
                            required
                            placeholder="Member 1, Member 2, Member 3"
                            value={formData.members}
                            onChange={handleChange}
                            rows={3}
                            style={{ ...inputStyle, resize: 'vertical' as const }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(58,134,255,0.1)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(58,134,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <GlitchButton label="SUBMIT REGISTRATION" variant="gold" />
                </div>
            </motion.form>
        </section>
    );
}
