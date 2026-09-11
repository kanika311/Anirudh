'use client';

import React from 'react';
import Link from 'next/link';

export function ResultsMetrics() {
  return (
    <section id="results" className="page-section" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="tag">Proof of Growth</span>
          <h2 className="section-heading mt-4">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="section-sub mx-auto">
            Actual results from real businesses in Lucknow and Kanpur.
          </p>
        </div>

        <div
          className="case-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginTop: '50px',
          }}
        >
          {/* CASE 1 */}
          <article className="case-card">
            <div className="case-img">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <div className="case-content">
              <div className="case-meta">
                <span>SEO</span> <span>•</span> <span>4 Months</span>
              </div>
              <h3>Ranking a Luxury Real Estate Brand in Gomti Nagar</h3>
              <div className="case-results-grid">
                <div>
                  <div className="res-val">+320%</div>
                  <div className="res-label">Traffic</div>
                </div>
                <div>
                  <div className="res-val">150+</div>
                  <div className="res-label">Leads</div>
                </div>
              </div>
              <Link className="read-more-link mt-4" href="/case-studies" style={{ display: 'inline-block' }}>
                Full Case Study →
              </Link>
            </div>
          </article>

          {/* CASE 2 */}
          <article className="case-card">
            <div className="case-img">
              <i className="bi bi-facebook"></i>
            </div>
            <div className="case-content">
              <div className="case-meta">
                <span>Meta Ads</span> <span>•</span> <span>6 Months</span>
              </div>
              <h3>Scaling an E-commerce Brand from Kanpur</h3>
              <div className="case-results-grid">
                <div>
                  <div className="res-val">4.5x</div>
                  <div className="res-label">ROAS</div>
                </div>
                <div>
                  <div className="res-val">-40%</div>
                  <div className="res-label">CPA</div>
                </div>
              </div>
              <Link className="read-more-link mt-4" href="/case-studies" style={{ display: 'inline-block' }}>
                Full Case Study →
              </Link>
            </div>
          </article>
        </div>

        <div className="text-center mt-8" style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link className="btn btn-outline" href="/case-studies">
            View All Success Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
