'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/types';

interface DualCtaBandProps {
  settings?: SiteSettings;
  whatsappNumber?: string;
}

export function DualCtaBand({ settings, whatsappNumber }: DualCtaBandProps) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      setScrollPercent(percent);
      setShowBtt(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const degree = (scrollPercent / 100) * 360;
  const waNumber = whatsappNumber || settings?.whatsappNumber || '918604625862';
  const cleanNumber = waNumber.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Scroll Progress Bar at Top */}
      <div
        className="scroll-progress"
        style={{
          width: `${scrollPercent}%`,
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: 'var(--accent)',
          zIndex: 99999,
          transition: 'width 0.1s ease-out',
        }}
      />

      {/* Floating WhatsApp Widget */}
      <a
        href={`https://wa.me/${cleanNumber}?text=Hello%20Anirudh%2C%20I%20want%20to%20talk%20with%20you.`}
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp Me"
      >
        <div className="wa-label">Chat on WhatsApp</div>
        <div className="wa-bubble">
          <i className="bi bi-whatsapp"></i>
        </div>
      </a>

      {/* Back To Top Button with Circular Progress */}
      <button
        type="button"
        className={`btt ${showBtt ? 'visible' : ''}`}
        id="btt"
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          background: `conic-gradient(#ff6b00 ${degree}deg, rgba(255,255,255,0.08) ${degree}deg)`,
        }}
      >
        <span id="scrollPercent">{scrollPercent}%</span>
      </button>
    </>
  );
}
