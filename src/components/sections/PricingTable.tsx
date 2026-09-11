'use client';

import React from 'react';
import Link from 'next/link';
import { PricingPlan } from '@/types';

interface PricingTableProps {
  plans?: PricingPlan[];
}

export function PricingTable({ plans }: PricingTableProps) {
  return (
    <section id="pricing">
      <div className="container">
        <div className="section-header center text-center">
          <span className="tag">Transparent Pricing</span>
          <div className="divider"></div>
          <h2 className="section-heading">
            Simple, Clear <span className="gradient-text">Packages</span>
          </h2>
          <p className="section-sub">
            Koi hidden charges nahi. Jo package choose karo, wahi milega. Sabhi packages mein free SEO audit included hai.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Starter */}
          <div className="pricing-card">
            <div className="pricing-name">Starter</div>
            <div className="pricing-price">
              ₹8,000<span>/month</span>
            </div>
            <p className="pricing-desc">
              Chhote businesses aur startups ke liye. Digital presence banana shuru karein.
            </p>
            <div className="pricing-features">
              <div className="pf">
                <div className="pf-check">✓</div>On-Page SEO (10 pages)
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Google Business Profile Setup
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>2 Blog Posts/Month
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Monthly Report
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>WhatsApp Support
              </div>
              <div className="pf pf-x">
                <div className="pf-check">✗</div>Meta/Google Ads
              </div>
              <div className="pf pf-x">
                <div className="pf-check">✗</div>Social Media Management
              </div>
            </div>
            <a href="#contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Get Started
            </a>
          </div>

          {/* Professional - Popular */}
          <div className="pricing-card popular">
            <div className="popular-badge">🔥 Most Popular</div>
            <div className="pricing-name">Professional</div>
            <div className="pricing-price">
              ₹18,000<span>/month</span>
            </div>
            <p className="pricing-desc">
              Growing businesses ke liye. Full digital marketing + ads management.
            </p>
            <div className="pricing-features">
              <div className="pf">
                <div className="pf-check">✓</div>Complete SEO (20+ pages)
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Social Media (2 platforms)
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Meta Ads Management
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>4 Blog Posts/Month
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Weekly Reporting
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Google Ads Setup
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Priority WhatsApp Support
              </div>
            </div>
            <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Get Started
            </a>
          </div>

          {/* Enterprise */}
          <div className="pricing-card">
            <div className="pricing-name">Enterprise</div>
            <div className="pricing-price">
              ₹35,000<span>/month</span>
            </div>
            <p className="pricing-desc">
              Established brands ke liye. Full-scale digital marketing dominance.
            </p>
            <div className="pricing-features">
              <div className="pf">
                <div className="pf-check">✓</div>Everything in Professional
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Full Social Media (4 platforms)
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Meta + Google Ads Both
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>8 Blog Posts + Content Strategy
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>YouTube SEO &amp; Management
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Website Development Included
              </div>
              <div className="pf">
                <div className="pf-check">✓</div>Dedicated Account Manager (Me!)
              </div>
            </div>
            <a href="#contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <p className="text-center mt-4" style={{ color: 'var(--text2)', fontSize: '0.85rem', textAlign: 'center', marginTop: '24px' }}>
          Custom requirements hain?{' '}
          <a href="#contact" style={{ color: 'var(--accent)', fontWeight: 700 }}>
            Contact karein
          </a>{' '}
          — aapke liye custom package bana deta hoon.
        </p>
      </div>
    </section>
  );
}
