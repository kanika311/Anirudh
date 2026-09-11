'use client';

import React from 'react';
import Link from 'next/link';
import { CaseStudy } from '@/types';

interface CaseStudiesShowcaseProps {
  caseStudies?: CaseStudy[];
}

const defaultStudies = [
  {
    icon: 'bi-hospital',
    tag: 'Healthcare | Lucknow',
    title: 'Multi-Specialty Clinic — Gomti Nagar, Lucknow',
    desc: 'Our localized SEO operations significantly boosted organic Google traffic, increasing qualified patient appointments by 3x.',
    chips: ['300% Traffic Growth', 'Page 1 Rankings', '3x Appointments'],
    bars: ['30%', '45%', '40%', '60%', '55%', '75%', '90%', '100%'],
  },
  {
    icon: 'bi-shop',
    tag: 'E-commerce | Kanpur',
    title: 'Fashion Retail Brand — Kanpur City',
    desc: 'Our Meta Ads and hyper-targeted remarketing generated a 5x ROI, scaling their e-commerce sales rapidly across local areas.',
    chips: ['5x Sales Growth', '7.2x ROAS', '₹15L Revenue/Month'],
    bars: ['20%', '35%', '50%', '45%', '65%', '80%', '95%', '100%'],
  },
  {
    icon: 'bi-mortarboard',
    tag: 'Education | Lucknow',
    title: 'Coaching Institute — Hazratganj, Lucknow',
    desc: 'Our powerful Local SEO and optimized Google Ads drastically skyrocketed admissions by securing the top spot for highly competitive keywords.',
    chips: ['200+ Clients Served', '#1 Google Rank', 'Massive ROI'],
    bars: ['25%', '30%', '50%', '55%', '70%', '85%', '90%', '100%'],
  },
];

export function CaseStudiesShowcase({ caseStudies }: CaseStudiesShowcaseProps) {
  const displayList =
    caseStudies && caseStudies.length >= 3
      ? caseStudies.slice(0, 3).map((cs, idx) => ({
          icon: defaultStudies[idx % defaultStudies.length].icon,
          tag: `${cs.clientIndustry || 'Growth'} | ${cs.client}`,
          title: cs.title,
          desc: cs.summary || cs.challenge || defaultStudies[idx].desc,
          chips:
            cs.metrics && cs.metrics.length >= 3
              ? cs.metrics.map((m) => `${m.change} ${m.label}`)
              : defaultStudies[idx % defaultStudies.length].chips,
          bars: defaultStudies[idx % defaultStudies.length].bars,
        }))
      : defaultStudies;

  return (
    <section id="portfolio">
      <div className="container">
        <div className="section-header center text-center">
          <span className="tag">Believable Results</span>
          <div className="divider"></div>
          <h2 className="section-heading">
            Real Growth, <span className="gradient-text">Real Clients</span>
          </h2>
          <p className="section-sub">
            Numbers speak louder than words. See how the premier Freelance SEO Expert Lucknow consistently secures remarkable Google rankings.
          </p>
        </div>

        <div className="portfolio-grid">
          {displayList.map((study, idx) => (
            <div key={idx} className="portfolio-card">
              <div className="portfolio-img">
                <span
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    color: 'var(--accent)',
                    fontSize: '2rem',
                  }}
                >
                  <i className={`bi ${study.icon}`}></i>
                </span>
                <div className="graph-visual">
                  {study.bars.map((height, bIdx) => (
                    <div key={bIdx} className="graph-bar" style={{ height }}></div>
                  ))}
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-tag">{study.tag}</div>
                <h3>{study.title}</h3>
                <p>{study.desc}</p>
                <div className="portfolio-results">
                  {study.chips.map((chip, cIdx) => (
                    <span key={cIdx} className="result-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-center mt-6" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <a href="#contact" className="btn btn-outline">
            📋 Start Your Growth Story Today — Let&apos;s Talk →
          </a>
        </div>
      </div>
    </section>
  );
}
