'use client';

import React from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/types';

interface AboutBioSectionProps {
  settings?: SiteSettings;
}

export function AboutBioSection({ settings }: AboutBioSectionProps) {
  const consultantName =
    settings?.consultantName && settings.consultantName !== 'Alex Rivera'
      ? settings.consultantName
      : 'Anirudh Kumar';

  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap">
            <div className="about-photo-frame">
              <div className="about-photo-bg">
                <img
                  src="/anirudh-hero.png"
                  alt={`${consultantName} Portfolio`}
                  className="about-persona-img"
                />
                <div className="about-photo-badge">📍 Lucknow, Uttar Pradesh</div>
              </div>
            </div>
            <div className="about-badge-float">
              <div className="big">5+</div>
              <div className="small">
                Years of Experience
                <br />
                in Digital Marketing
              </div>
            </div>
          </div>

          <div className="about-content">
            <span className="tag">About Me</span>
            <div className="divider"></div>
            <h2 className="section-heading">
              {consultantName} — <span className="gradient-text">Top Freelance SEO Expert</span>
            </h2>
            <p>
              Hi, I am {consultantName}, widely regarded as the Best Digital Marketer in Lucknow.
              With an intensive 5+ years of experience actively accelerating business growth, my goal
              is to maximize your digital performance.
            </p>
            <p>
              As a highly verified SEO expert, Google Ads expert, and Social media specialist, I have
              successfully helped 200+ businesses secure Page 1 dominance. I exclusively focus on
              delivering exponential ROI with a fully transparent, direct-expert approach—no middlemen.
            </p>

            <div className="cert-grid">
              <div className="cert-item">
                <span className="cert-icon">🏆</span>
                <span className="cert-text">Google Analytics Certified</span>
              </div>
              <div className="cert-item">
                <span className="cert-icon">🎯</span>
                <span className="cert-text">Meta Ads Certified</span>
              </div>
              <div className="cert-item">
                <span className="cert-icon">📊</span>
                <span className="cert-text">Google Ads Certified</span>
              </div>
            </div>

            <div className="skill-bars">
              <div className="skill-row">
                <div className="skill-label">
                  <span>SEO &amp; Organic Growth</span>
                  <span>98%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill animate" style={{ transform: 'scaleX(0.98)' }}></div>
                </div>
              </div>
              <div className="skill-row">
                <div className="skill-label">
                  <span>Google &amp; Meta Ads (ROI focus)</span>
                  <span>95%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill animate" style={{ transform: 'scaleX(0.95)' }}></div>
                </div>
              </div>
              <div className="skill-row">
                <div className="skill-label">
                  <span>Social Media Strategy</span>
                  <span>92%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill animate" style={{ transform: 'scaleX(0.92)' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link className="btn btn-outline" href="/about">
                Read My Full Story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
