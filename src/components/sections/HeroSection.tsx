'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/types';

interface HeroSectionProps {
  settings?: SiteSettings;
}

const words = ['BEST SEO EXPERT', 'DIGITAL MARKETER', 'GROWTH CONSULTANT'];

export function HeroSection({ settings }: HeroSectionProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < word.length) {
      timer = setTimeout(() => {
        setCurrentWord(word.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 120);
    } else if (!isDeleting && charIndex === word.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setCurrentWord(word.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 60);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      timer = setTimeout(() => {}, 400);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  const consultantName =
    settings?.consultantName && settings.consultantName !== 'Alex Rivera'
      ? settings.consultantName
      : 'ANIRUDH KUMAR';

  return (
    <>
      <section id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <div className="hero-dot"></div>
                <span className="tag">Lucknow &amp; Kanpur ka #1 Digital Marketing Expert</span>
              </div>

              <h1 className="hero-h1">
                <span className="line1">{consultantName} –</span>
                <span className="line2" id="changing-word" style={{ minHeight: '1.2em', display: 'inline-block' }}>
                  {currentWord}
                  <span className="cursor" style={{ opacity: 0.8 }}>|</span>
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--ff-d)',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    color: 'var(--text)',
                  }}
                >
                  &amp; DIGITAL MARKETING CONSULTANT IN LUCKNOW
                </span>
                <span className="line3">
                  Helping businesses in Lucknow &amp; Kanpur rank on Google, generate leads and grow online.
                  Let&apos;s work together to dominate local search and maximize your revenue.
                </span>
              </h1>

              <div className="hero-btns">
                <a href="#contact" className="btn btn-primary">
                  <i className="bi bi-rocket-takeoff" style={{ marginRight: '8px' }}></i>
                  Claim Free SEO Audit
                </a>
                <a href="#portfolio" className="btn btn-outline">
                  <i className="bi bi-shield-check" style={{ marginRight: '8px' }}></i>
                  See Verified Results
                </a>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-num">200+</div>
                  <div className="stat-label">Clients Served</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">5+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">87</div>
                  <div className="stat-label">★ 5-Star Reviews</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-3d-wrap">
                <div className="orbit-ring">
                  <div className="orbit-dot"></div>
                </div>
                <div className="orbit-ring">
                  <div className="orbit-dot" style={{ background: 'var(--accent2)' }}></div>
                </div>
                <img
                  src="/anirudh-hero.png"
                  alt={consultantName}
                  className="hero-persona-img"
                />
              </div>

              <div className="hero-card-float card1">
                <div className="float-card-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div className="float-card-label">Organic Traffic</div>
                <div className="float-card-value">+340%</div>
              </div>

              <div className="hero-card-float card2">
                <div className="float-card-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <div className="float-card-label">Page 1 Rankings</div>
                <div className="float-card-value">1,200+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-item"><i className="bi bi-search"></i> SEO Expert Lucknow</div>
          <div className="marquee-item"><i className="bi bi-phone"></i> Social Media Marketing</div>
          <div className="marquee-item"><i className="bi bi-bullseye"></i> Meta Ads Specialist</div>
          <div className="marquee-item"><i className="bi bi-globe"></i> Website Development</div>
          <div className="marquee-item"><i className="bi bi-graph-up"></i> Google Ads Expert</div>
          <div className="marquee-item"><i className="bi bi-pencil-square"></i> Content Marketing</div>
          <div className="marquee-item"><i className="bi bi-geo-alt"></i> Local SEO Lucknow</div>
          <div className="marquee-item"><i className="bi bi-rocket-takeoff"></i> Digital Marketing Kanpur</div>
          <div className="marquee-item"><i className="bi bi-lightbulb"></i> Personal Brand Expert</div>
          <div className="marquee-item"><i className="bi bi-bar-chart"></i> Traffic Growth Specialist</div>
          {/* duplicate for seamless loop */}
          <div className="marquee-item"><i className="bi bi-search"></i> SEO Expert Lucknow</div>
          <div className="marquee-item"><i className="bi bi-phone"></i> Social Media Marketing</div>
          <div className="marquee-item"><i className="bi bi-bullseye"></i> Meta Ads Specialist</div>
          <div className="marquee-item"><i className="bi bi-globe"></i> Website Development</div>
          <div className="marquee-item"><i className="bi bi-graph-up"></i> Google Ads Expert</div>
          <div className="marquee-item"><i className="bi bi-pencil-square"></i> Content Marketing</div>
          <div className="marquee-item"><i className="bi bi-geo-alt"></i> Local SEO Lucknow</div>
          <div className="marquee-item"><i className="bi bi-rocket-takeoff"></i> Digital Marketing Kanpur</div>
          <div className="marquee-item"><i className="bi bi-lightbulb"></i> Personal Brand Expert</div>
          <div className="marquee-item"><i className="bi bi-bar-chart"></i> Traffic Growth Specialist</div>
        </div>
      </div>
    </>
  );
}
