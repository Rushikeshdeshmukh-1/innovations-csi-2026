'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import AboutSection from '@/components/AboutSection';
import TimelineSection from '@/components/TimelineSection';
import PrizesSection from '@/components/PrizesSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import RegisterSection from '@/components/RegisterSection';
import Footer from '@/components/Footer';

const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      {/* Space background image */}
      <div className="space-bg" />
      {/* Subtle grid overlay */}
      <div className="holo-grid" />

      <Navbar />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <PrizesSection />
        <GallerySection />
        <RegisterSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
