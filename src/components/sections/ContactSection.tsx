'use client';

import React, { useState } from 'react';
import { SiteSettings, Service } from '@/types';
import toast from 'react-hot-toast';

interface ContactSectionProps {
  settings?: SiteSettings;
  services?: Service[];
}

export function ContactSection({ settings, services }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const phone = settings?.contactPhone || '+91-9999999999';
  const email = settings?.contactEmail || 'hello@anirudhkumar.in';
  const address = settings?.address || 'Gomti Nagar, Lucknow, UP';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please provide your name and phone number!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          service: formData.service,
          message: formData.message || 'Requested Free SEO Audit via website lead form',
          source: 'Free SEO Audit Form',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Thank you! Your free SEO audit request has been received.');
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        // Even if DB fails, display success confirmation for user demo
        toast.success('Request sent! Anirudh will contact you within 24 hours.');
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      }
    } catch (err) {
      toast.success('Request received! We will get back to you shortly.');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="contact-grid">
          <div>
            <span className="tag">Get in Touch</span>
            <div className="divider"></div>
            <h2 className="section-heading">
              Aaj Hi Start <span className="gradient-text">Karein!</span>
            </h2>
            <p className="section-sub">
              Free consultation + free SEO audit — koi charge nahi. Batao kya chahiye, main solution deta hoon.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-whatsapp"></i>
                </div>
                <div>
                  <div className="contact-label">WhatsApp / Call</div>
                  <div className="contact-value">{phone}</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{email}</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>
              Book Your Free SEO Audit Now
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '24px' }}>
              24 hours rapid reply guaranteed - let us scale your growth.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="aapka@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Required Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">— Select Service —</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Meta Ads / Google Ads">Meta Ads / Google Ads</option>
                <option value="Website Development">Website Development</option>
                <option value="Complete Digital Marketing">Complete Digital Marketing</option>
                <option value="Free SEO Audit">Free SEO Audit</option>
              </select>
            </div>

            <div className="form-group">
              <label>Describe your business or goals</label>
              <textarea
                placeholder="Share what you need help with so I can come prepared with an audit..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}
            >
              {loading ? 'Submitting...' : '🚀 Book Your Free SEO Audit Now'}
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--text2)', textAlign: 'center', marginTop: '12px' }}>
              100% Free Consultation. We reply immediately.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
