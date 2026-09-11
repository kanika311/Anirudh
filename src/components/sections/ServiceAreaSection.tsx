'use client';

import React from 'react';

export function ServiceAreaSection() {
  return (
    <section id="locations">
      <div className="container">
        <div className="section-header center text-center">
          <span className="tag">Service Areas</span>
          <div className="divider"></div>
          <h2 className="section-heading">
            Lucknow &amp; Kanpur — <span className="gradient-text">Dono Shehar Covered</span>
          </h2>
          <p className="section-sub">
            Local market expertise ke saath aapke city mein results deliver karta hoon. Uttar Pradesh ka #1 Digital Marketing Expert.
          </p>
        </div>

        <div className="locations-grid">
          {/* Lucknow Card */}
          <div className="location-card">
            <div className="location-map">
              <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="100" r="80" stroke="#FF6B00" strokeWidth="1" strokeDasharray="8 4" />
                <circle cx="200" cy="100" r="40" stroke="#FF6B00" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="100" r="8" fill="#FF6B00" />
                <line x1="120" y1="100" x2="280" y2="100" stroke="#FF6B00" strokeWidth="0.5" />
                <line x1="200" y1="20" x2="200" y2="180" stroke="#FF6B00" strokeWidth="0.5" />
              </svg>
              <span style={{ position: 'relative', zIndex: 1, fontSize: '2.5rem' }}>🏛️</span>
            </div>
            <div className="location-body">
              <h3>Digital Marketing Expert in Lucknow</h3>
              <div className="city-sub">🏆 #1 SEO Expert | Uttar Pradesh Capital</div>
              <p>
                Lucknow ke real estate, healthcare, education, retail aur restaurant sectors mein deep expertise. Gomti Nagar se Hazratganj tak — aapka business online dominate kare.
              </p>
              <div className="location-areas">
                <span className="area-chip">Gomti Nagar</span>
                <span className="area-chip">Hazratganj</span>
                <span className="area-chip">Alambagh</span>
                <span className="area-chip">Indira Nagar</span>
                <span className="area-chip">Aliganj</span>
                <span className="area-chip">Mahanagar</span>
                <span className="area-chip">Chinhat</span>
              </div>
              <a href="#contact" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                Lucknow SEO Audit — Free
              </a>
            </div>
          </div>

          {/* Kanpur Card */}
          <div className="location-card">
            <div className="location-map">
              <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="100" r="80" stroke="#FFB800" strokeWidth="1" strokeDasharray="8 4" />
                <circle cx="200" cy="100" r="40" stroke="#FFB800" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="100" r="8" fill="#FFB800" />
                <line x1="120" y1="100" x2="280" y2="100" stroke="#FFB800" strokeWidth="0.5" />
                <line x1="200" y1="20" x2="200" y2="180" stroke="#FFB800" strokeWidth="0.5" />
              </svg>
              <span style={{ position: 'relative', zIndex: 1, fontSize: '2.5rem' }}>🏭</span>
            </div>
            <div className="location-body">
              <h3>Digital Marketing Expert in Kanpur</h3>
              <div className="city-sub" style={{ color: 'var(--accent2)' }}>
                🏆 #1 SEO Expert | Industrial Hub of UP
              </div>
              <p>
                Kanpur ke textile, leather, manufacturing, education aur retail businesses ke liye specialized digital marketing. Is industrial city ka #1 digital partner.
              </p>
              <div className="location-areas">
                <span className="area-chip">Civil Lines</span>
                <span className="area-chip">Swaroop Nagar</span>
                <span className="area-chip">Kidwai Nagar</span>
                <span className="area-chip">Kakadeo</span>
                <span className="area-chip">Panki</span>
                <span className="area-chip">Kalyanpur</span>
                <span className="area-chip">Armapur</span>
              </div>
              <a
                href="#contact"
                className="btn btn-outline"
                style={{
                  fontSize: '0.85rem',
                  padding: '10px 20px',
                  borderColor: 'var(--accent2)',
                  color: 'var(--accent2)',
                }}
              >
                Kanpur SEO Audit — Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
