'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';

interface BlogPreviewProps {
  posts?: BlogPost[];
}

const defaultPosts = [
  {
    icon: '🔍',
    category: 'SEO',
    readTime: '5 min read',
    date: 'Jan 2026',
    title: 'Best SEO Expert in Lucknow',
    slug: 'best-seo-expert-in-lucknow',
    desc: 'Discover complete strategies on how to choose a reliable SEO expert and what guarantees to expect for your business in 2026.',
    bg: '',
  },
  {
    icon: '💰',
    category: 'Marketing',
    readTime: '7 min read',
    date: 'Feb 2026',
    title: 'SEO Cost in Lucknow',
    slug: 'seo-cost-in-lucknow',
    desc: 'A complete breakdown of standard pricing models and actionable tips on optimizing your Digital Marketing ROI locally.',
    bg: 'linear-gradient(145deg,var(--bg3),rgba(255,184,0,0.15))',
  },
  {
    icon: '📍',
    category: 'Local SEO',
    readTime: '6 min read',
    date: 'Mar 2026',
    title: 'How to Rank Business in Lucknow',
    slug: 'how-to-rank-business-in-lucknow',
    desc: 'Mastering Google Business Profiles, robust entity clustering, and localized strategies specifically for physical local businesses.',
    bg: 'linear-gradient(145deg,var(--bg3),rgba(255,51,102,0.1))',
  },
];

export function BlogPreview({ posts }: BlogPreviewProps) {
  const displayPosts =
    posts && posts.length >= 3
      ? posts.slice(0, 3).map((p, idx) => ({
          icon: defaultPosts[idx % defaultPosts.length].icon,
          category: p.category || 'SEO',
          readTime: `${p.readTimeMinutes || 5} min read`,
          date: new Date(p.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          title: p.title,
          slug: p.slug,
          desc: p.excerpt || defaultPosts[idx % defaultPosts.length].desc,
          bg: defaultPosts[idx % defaultPosts.length].bg,
        }))
      : defaultPosts;

  return (
    <section id="blog">
      <div className="container">
        <div className="section-header center text-center">
          <span className="tag">Digital Marketing Blog</span>
          <div className="divider"></div>
          <h2 className="section-heading">
            Actionable Insights, <span className="gradient-text">Real Value</span>
          </h2>
          <p className="section-sub">
            Practical digital marketing intelligence for Lucknow and Kanpur. Master SEO strategies to dominate search globally.
          </p>
        </div>

        <div className="blog-grid">
          {displayPosts.map((post, idx) => (
            <div key={post.slug || idx} className="blog-card">
              <div className="blog-img">
                <div className="blog-img-bg" style={post.bg ? { background: post.bg } : undefined}></div>
                <span style={{ position: 'relative', zIndex: 1, fontSize: '2.5rem' }}>{post.icon}</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">{post.category}</span>
                  <span>{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <Link className="blog-link" href={`/blog/${post.slug}`}>
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-center mt-6" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <Link className="btn btn-outline" href="/blog">
            📚 Explore All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
