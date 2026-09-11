'use client';

import React from 'react';
import { SiteSettings } from '@/types';

interface ComparisonTableProps {
  settings?: SiteSettings;
}

export function ComparisonTable({ settings }: ComparisonTableProps) {
  const consultantName =
    settings?.consultantName && settings.consultantName !== 'Alex Rivera'
      ? settings.consultantName
      : 'Anirudh Kumar';

  return (
    <section id="why">
      <div className="container">
        <div className="why-grid">
          <div>
            <span className="tag">Why Choose Me</span>
            <div className="divider"></div>
            <h2 className="section-heading">
              Better Than Agencies — <span className="gradient-text">Direct Expert Support</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Hire the Best Digital Marketer in Lucknow and receive immediate expert support. I personally mandate your success.
            </p>

            <div className="why-points">
              <div className="why-point">
                <div className="why-point-icon">🤝</div>
                <div>
                  <div className="why-point-title">Direct Expert Support</div>
                  <div className="why-point-desc">
                    No agency delays. No assigned interns. You receive active consultation directly from a leading Digital Marketing Expert Kanpur &amp; Lucknow.
                  </div>
                </div>
              </div>

              <div className="why-point">
                <div className="why-point-icon">📊</div>
                <div>
                  <div className="why-point-title">No Agency Middleman</div>
                  <div className="why-point-desc">
                    Avoid high markups. I deliver fast execution, instant transparency, and dedicated strategy uniquely aligned to your vertical.
                  </div>
                </div>
              </div>

              <div className="why-point">
                <div className="why-point-icon">💰</div>
                <div>
                  <div className="why-point-title">Transparent Pricing</div>
                  <div className="why-point-desc">
                    Crystal clear quotes on our top SEO services. Complete visibility into what you pay for standard SEO, Google Ads, and Meta marketing.
                  </div>
                </div>
              </div>

              <div className="why-point">
                <div className="why-point-icon">📍</div>
                <div>
                  <div className="why-point-title">Local Market Understanding</div>
                  <div className="why-point-desc">
                    Extensive knowledge targeting both Lucknow and Kanpur. Dominate nearby local searches specifically optimized for your physical audience.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="vs-table">
              <div className="vs-header">
                <div>Feature</div>
                <div className="col-me">✅ {consultantName}</div>
                <div>❌ Typical Agency</div>
              </div>
              <div className="vs-row">
                <span className="label">Personal Expert Attention</span>
                <span className="vs-yes">✅ Always</span>
                <span className="vs-no">❌ Intern assigned</span>
              </div>
              <div className="vs-row">
                <span className="label">Transparent Pricing</span>
                <span className="vs-yes">✅ Clear packages</span>
                <span className="vs-no">❌ Hidden charges</span>
              </div>
              <div className="vs-row">
                <span className="label">Direct Communication</span>
                <span className="vs-yes">✅ WhatsApp 24/7</span>
                <span className="vs-no">❌ Emails only</span>
              </div>
              <div className="vs-row">
                <span className="label">Weekly Reports</span>
                <span className="vs-yes">✅ Detailed PDF</span>
                <span className="vs-no">❌ Monthly (maybe)</span>
              </div>
              <div className="vs-row">
                <span className="label">Local SEO Expertise</span>
                <span className="vs-yes">✅ Lucknow/Kanpur</span>
                <span className="vs-no">❌ Generic strategies</span>
              </div>
              <div className="vs-row">
                <span className="label">Free SEO Audit</span>
                <span className="vs-yes">✅ Hamesha free</span>
                <span className="vs-no">❌ ₹2,000 - ₹5,000</span>
              </div>
              <div className="vs-row">
                <span className="label">No Lock-in Contract</span>
                <span className="vs-yes">✅ Month-to-month</span>
                <span className="vs-no">❌ 6-12 month lock</span>
              </div>
              <div className="vs-row">
                <span className="label">Website Speed (PageSpeed)</span>
                <span className="vs-yes">✅ 95+ Score</span>
                <span className="vs-no">❌ 40-60 score</span>
              </div>
            </div>

            <div
              style={{
                marginTop: '16px',
                padding: '16px 20px',
                background: 'rgba(255,107,0,0.08)',
                border: '1px solid rgba(255,107,0,0.2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                color: 'var(--text2)',
              }}
            >
              💡 <strong style={{ color: 'var(--text)' }}>Pro Tip:</strong> Typical agencies se zyada expensive hain aur results deliver karne mein slow. Ek dedicated expert se seedha kaam karein — better results, faster turnaround.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
