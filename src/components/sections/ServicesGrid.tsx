'use client';

import React from 'react';
import Link from 'next/link';
import { Service } from '@/types';

interface ServicesGridProps {
  services?: Service[];
}

const defaultServices = [
  {
    title: 'SEO Services Lucknow',
    slug: 'seo-lucknow',
    desc: 'Dominating Google rankings with high-intent keywords and local authority building.',
    image: '/service-seo.png',
    cta: 'Explore SEO →',
  },
  {
    title: 'Social Media Marketing',
    slug: 'smm-lucknow',
    desc: 'Viral content and community management that turns followers into loyal customers.',
    image: '/service-smm.png',
    cta: 'Explore SMM →',
  },
  {
    title: 'Google & Meta Ads',
    slug: 'ads-lucknow',
    desc: 'High-ROI performance marketing that delivers instant leads and scalable sales.',
    image: '/service-ads.png',
    cta: 'Explore Ads →',
  },
  {
    title: 'Website Development',
    slug: 'web-dev-lucknow',
    desc: 'Blazing fast, SEO-ready websites designed for high conversion and speed.',
    image: '/service-web.png',
    cta: 'Explore Web →',
  },
  {
    title: 'Marketing Kanpur',
    slug: 'marketing-kanpur',
    desc: 'Specialized digital growth for the industrial and service hub of Kanpur city.',
    image: '/service-kanpur.png',
    cta: 'Explore Kanpur →',
  },
  {
    title: 'SEO Consulting',
    slug: 'seo-consultant',
    desc: 'Strategic high-level audits and training for established brands and teams.',
    image: '/service-consulting.png',
    cta: 'Explore Consulting →',
  },
];

export function ServicesGrid({ services }: ServicesGridProps) {
  const displayServices =
    services && services.length >= 4
      ? services.map((s, idx) => ({
          title: s.title,
          slug: s.slug,
          desc: s.shortDescription || s.fullDescription || defaultServices[idx % defaultServices.length].desc,
          image: defaultServices[idx % defaultServices.length].image,
          cta: `Explore ${s.title.split(' ')[0]} →`,
        }))
      : defaultServices;

  return (
    <section id="services">
      <div className="container">
        <div className="section-header text-center">
          <span className="tag">How We Grow Brands</span>
          <h2 className="section-heading mt-4">
            Professional <span className="gradient-text">Digital Solutions</span>
          </h2>
          <p className="section-sub mx-auto">
            Proven strategies to scale your business in the Lucknow &amp; Kanpur market.
          </p>
        </div>

        <div className="services-grid">
          {displayServices.map((service, index) => (
            <Link
              key={service.slug || index}
              className="service-card"
              href={`/${service.slug}`}
            >
              <div className="service-img-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card-img"
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="mt-4" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                {service.cta}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
