'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              href="/"
              className="nav-logo"
              style={{
                fontSize: '2rem',
                marginBottom: '20px',
                color: 'var(--text2)',
                transition: 'color var(--transition)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img
                src="/anirudh-hero.png"
                alt="Anirudh Kumar"
                className="nav-portrait"
                style={{ width: '60px', height: '60px' }}
              />
              ANIRUDH KUMAR
            </Link>
            <p>
              Lucknow &amp; Kanpur ka trusted Digital Marketing Expert. SEO, Social Media,
              Ads, Website — everything you need to grow your business online.
            </p>
            <div className="footer-social mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="Twitter"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/seo-lucknow">SEO Services Lucknow</Link>
              </li>
              <li>
                <Link href="/smm-lucknow">Social Media Marketing</Link>
              </li>
              <li>
                <Link href="/ads-lucknow">Google &amp; Meta Ads</Link>
              </li>
              <li>
                <Link href="/web-dev-lucknow">Website Development</Link>
              </li>
              <li>
                <Link href="/marketing-kanpur">Digital Marketing Kanpur</Link>
              </li>
              <li>
                <Link href="/seo-consultant">SEO Consultant</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Results</h4>
            <ul>
              <li>
                <Link href="/testimonials">Client Reviews</Link>
              </li>
              <li>
                <Link href="/case-studies">Case Studies</Link>
              </li>
              <li>
                <Link href="/blog">Latest Articles</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">My Story</Link>
              </li>
              <li>
                <Link href="/why-choose-us">Why Choose Us</Link>
              </li>
              <li>
                <Link href="/contact">Free SEO Audit</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Anirudh Kumar | Professional Digital Marketer</span>
          <span>Made with ❤️ in Lucknow, UP 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}
