'use client';

import React from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/types';

interface WhyChooseUsProps {
  settings?: SiteSettings;
}

export function WhyChooseUs({ settings }: WhyChooseUsProps) {
  const consultantName =
    settings?.consultantName && settings.consultantName !== 'Alex Rivera'
      ? settings.consultantName
      : 'Anirudh';

  return (
    <section id="why" className="page-section" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
      <div className="container">
        <div className="service-contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="tag">The {consultantName} Advantage</span>
            <h2 className="section-heading mt-4">
              Why Businesses <span className="gradient-text">Trust Us?</span>
            </h2>
            <p className="mb-6" style={{ color: 'var(--text2)', marginBottom: '24px' }}>
              We don&apos;t just provide services; we build growth partnerships. Our focus is 100% on your Return on Investment (ROI).
            </p>
            <ul style={{ color: 'var(--text2)', lineHeight: 2.2, marginBottom: '30px', listStyle: 'none', paddingLeft: 0 }}>
              <li>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Transparent Reporting &amp; Daily Updates
              </li>
              <li>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Deep Local Market Expertise (UP)
              </li>
              <li>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                100% White-Hat Ethical Strategies
              </li>
              <li>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Custom Built Strategy for Every Niche
              </li>
            </ul>
            <Link className="btn btn-outline" href="/why-choose-us">
              Learn More About Us
            </Link>
          </div>

          <div>
            <div
              style={{
                background: 'var(--card)',
                padding: '40px',
                borderRadius: '30px',
                border: '1px solid var(--border2)',
                textAlign: 'center',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--accent)' }}>
                <i className="bi bi-building"></i>
              </div>
              <h3 style={{ fontFamily: 'var(--ff-d)', fontSize: '3.5rem', lineHeight: 1 }}>200+</h3>
              <p style={{ color: 'var(--text2)', marginTop: '8px' }}>
                Businesses Scaled in Lucknow &amp; Kanpur
              </p>
              <hr style={{ margin: '24px 0', borderColor: 'var(--border2)' }} />
              <div style={{ fontSize: '1.5rem', color: 'var(--accent2)' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize: '0.85rem', marginTop: '6px', color: 'var(--text2)' }}>
                4.9/5 Average Client Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
