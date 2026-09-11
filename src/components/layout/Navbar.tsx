'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setResultsOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  // Don't show public navbar in /admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <img
              src="/anirudh-hero.png"
              alt="Anirudh Kumar"
              className="nav-portrait"
            />
            ANIRUDH KUMAR
          </Link>

          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li
              className="nav-item-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link href="/services">
                Services{' '}
                <i
                  className="bi bi-chevron-down"
                  style={{ fontSize: '0.7rem', marginLeft: '4px' }}
                ></i>
              </Link>
              <div className={`dropdown-menu ${servicesOpen ? 'show' : ''}`}>
                <Link href="/seo-lucknow">SEO Services Lucknow</Link>
                <Link href="/smm-lucknow">Social Media Marketing</Link>
                <Link href="/ads-lucknow">Google &amp; Meta Ads</Link>
                <Link href="/web-dev-lucknow">Website Development</Link>
                <Link href="/marketing-kanpur">Digital Marketing Kanpur</Link>
                <Link href="/seo-consultant">SEO Consultant</Link>
              </div>
            </li>

            <li
              className="nav-item-dropdown"
              onMouseEnter={() => setResultsOpen(true)}
              onMouseLeave={() => setResultsOpen(false)}
            >
              <Link href="/results">
                Results{' '}
                <i
                  className="bi bi-chevron-down"
                  style={{ fontSize: '0.7rem', marginLeft: '4px' }}
                ></i>
              </Link>
              <div className={`dropdown-menu ${resultsOpen ? 'show' : ''}`}>
                <Link href="/testimonials">Client Reviews</Link>
                <Link href="/case-studies">Case Studies</Link>
              </div>
            </li>

            <li
              className="nav-item-dropdown"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <Link href="/about">
                About{' '}
                <i
                  className="bi bi-chevron-down"
                  style={{ fontSize: '0.7rem', marginLeft: '4px' }}
                ></i>
              </Link>
              <div className={`dropdown-menu ${aboutOpen ? 'show' : ''}`}>
                <Link href="/about">My Story</Link>
                <Link href="/why-choose-us">Why Choose Us</Link>
              </div>
            </li>

            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>

          <div className="nav-actions">
            {mounted && (
              <button
                type="button"
                className="theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Dark/Light Mode"
              >
                {theme === 'dark' ? (
                  <i className="bi bi-brightness-high-fill"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill"></i>
                )}
              </button>
            )}

            <Link href="/contact" className="nav-cta">
              Free SEO Audit
            </Link>

            <div
              className="hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            color: 'var(--text)',
            fontSize: '1.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          Home
        </Link>
        <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
          Services
        </Link>
        <Link href="/results" onClick={() => setMobileMenuOpen(false)}>
          Results
        </Link>
        <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
          About
        </Link>
        <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
          Blog
        </Link>
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
          Contact
        </Link>
        <Link
          href="/contact"
          className="btn btn-primary"
          onClick={() => setMobileMenuOpen(false)}
          style={{ marginTop: '16px' }}
        >
          Free SEO Audit
        </Link>
      </div>
    </>
  );
}
