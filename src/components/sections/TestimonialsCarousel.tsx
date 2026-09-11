'use client';

import React from 'react';
import { Testimonial, SiteSettings } from '@/types';

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  settings?: SiteSettings;
}

const defaultTestimonials = [
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Anirudh ne hamare clinic ki Google ranking completely transform kar di. Pehle page 4 par the, ab page 1 par aate hain. Appointments 3 guna ho gayi. Bilkul genuine aur dedicated person hai."',
    initials: 'DR',
    name: 'Dr. Rahul Mishra',
    role: 'Multi-Specialty Clinic Owner',
    city: '📍 Gomti Nagar, Lucknow',
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Meta Ads ke baare mein mujhe kuch nahi pata tha. Anirudh ne sab samjhaya aur hamare products ki sales 5x ho gayi. ROAS 7x se zyada aa raha hai. Best investment tha hamare business ke liye!"',
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Fashion Brand Founder',
    city: '📍 Kanpur City',
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Hamari coaching ke admissions bohot slow the. Anirudh Kumar ka SEO + Google Ads combination kamaal ka tha. 6 mahine mein hum Lucknow ke top 3 coaching results mein aa gaye. Outstanding results!"',
    initials: 'AV',
    name: 'Amit Verma',
    role: 'Coaching Institute Director',
    city: '📍 Hazratganj, Lucknow',
  },
];

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const displayList =
    testimonials && testimonials.length >= 3
      ? testimonials.slice(0, 3).map((t, idx) => ({
          stars: '⭐⭐⭐⭐⭐',
          text: `"${t.quote}"`,
          initials: t.initials || (t.name ? t.name.substring(0, 2).toUpperCase() : defaultTestimonials[idx].initials),
          name: t.name,
          role: t.role || t.company,
          city: t.location || defaultTestimonials[idx].city,
        }))
      : defaultTestimonials;

  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-header center text-center">
          <span className="tag">Client Reviews</span>
          <div className="divider"></div>
          <h2 className="section-heading">
            Verified Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="section-sub">
            Real clients, real reviews — Lucknow aur Kanpur ke successful businesses jo apni growth ka श्रेय Anirudh Kumar ko dete hain.
          </p>
        </div>

        <div className="testimonials-grid">
          {displayList.map((testi, idx) => (
            <div key={idx} className="testi-card">
              <div className="stars">{testi.stars}</div>
              <p className="testi-text">{testi.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{testi.initials}</div>
                <div>
                  <div className="testi-name">{testi.name}</div>
                  <div className="testi-role">{testi.role}</div>
                  <div className="testi-city">{testi.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-center mt-6"
          style={{
            padding: '20px',
            background: 'rgba(255,107,0,0.05)',
            border: '1px solid rgba(255,107,0,0.15)',
            borderRadius: 'var(--radius)',
            marginTop: '32px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>
            Google Reviews par verified ⭐ 4.9/5 rating — 87+ satisfied clients
          </div>
          <div
            style={{
              fontFamily: 'var(--ff-d)',
              fontSize: '2rem',
              color: 'var(--accent)',
              marginTop: '8px',
            }}
          >
            ⭐⭐⭐⭐⭐ 4.9 / 5.0
          </div>
        </div>
      </div>
    </section>
  );
}
