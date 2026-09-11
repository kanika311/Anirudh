'use client';

import React, { useState } from 'react';
import { FAQ } from '@/types';

interface FaqAccordionProps {
  faqs?: FAQ[];
}

const defaultFaqs = [
  {
    q: 'What is SEO cost in Lucknow?',
    a: 'My standard SEO pricing is strictly transparent and customized exclusively based on your competitive vertical. An exact proposal is provided directly after our extensive free SEO audit.',
  },
  {
    q: 'How long SEO takes?',
    a: 'Aggressive Local Google dominance prominently shows high growth within 3-6 months. We solely employ sustainable White-Hat SEO techniques ensuring unshakeable, long-lasting ROI.',
  },
  {
    q: 'Do you work in Kanpur?',
    a: 'Yes. While I am prominently located in Lucknow, my Digital Marketing capabilities routinely rank local Kanpur businesses #1 on Google Maps.',
  },
  {
    q: 'Can you rank my business?',
    a: 'Absolutely. Our localized technical auditing, vast backlink networks, and proprietary keyword research routinely propel businesses entirely beyond their competitors organically.',
  },
  {
    q: 'Free SEO audit mein kya milta hai?',
    a: 'Free SEO audit mein aapko milega: Current website health score, Top 10 technical issues, Keyword opportunity analysis, Competitor analysis (top 3), Local SEO assessment, aur Custom action plan. Completely free — koi strings attached nahi.',
  },
  {
    q: 'Reporting kitni often milti hai?',
    a: 'Professional aur Enterprise packages mein weekly detailed PDF reports milti hain — traffic, rankings, leads, ad spend, ROI — sab clearly mentioned. Starter package mein monthly report milti hai. Anytime WhatsApp par update maang sakte hain.',
  },
  {
    q: 'Kya aap website bhi banate hain?',
    a: 'Haan! Main Custom HTML/CSS, WordPress, Landing Pages aur E-commerce websites banata hoon. Mere websites ka Google PageSpeed score 95+ hota hai — blazing fast, mobile-first, aur fully SEO-optimized.',
  },
  {
    q: 'Agency hire karein ya aapko? Fark kya hai?',
    a: 'Jab aap mujhe hire karte hain, toh seedha ek senior expert ke saath kaam karte hain — koi intern, koi account manager chain nahi. Main personally aapke campaigns manage karta hoon. Agencies se cheaper bhi hoon aur faster results bhi deliver karta hoon. Plus — transparent pricing aur no lock-in.',
  },
];

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayList =
    faqs && faqs.length >= 4
      ? faqs.map((f) => ({ q: f.question, a: f.answer }))
      : defaultFaqs;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="container">
        <div className="faq-grid">
          <div>
            <span className="tag">Frequently Asked Questions</span>
            <div className="divider"></div>
            <h2 className="section-heading">
              Aapke <span className="gradient-text">Sawaal,<br />Mere Jawab</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: '32px' }}>
              Koi bhi doubt ho toh seedha WhatsApp karein — main personally jawab deta hoon.
            </p>

            <div className="faq-list">
              {displayList.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`faq-item ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleFaq(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="faq-q">
                      {faq.q} <div className="faq-icon">{isOpen ? '−' : '+'}</div>
                    </div>
                    {isOpen && <div className="faq-a" style={{ display: 'block' }}>{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="faq-sidebar">
            <div className="faq-sidebar-card">
              <h3>🚀 Need a Free SEO Audit?</h3>
              <p>
                Schedule a complete technical health check instantly. I personally review your architecture and send over a robust, actionable blueprint.
              </p>
              <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Request Free Audit
              </a>
            </div>

            <div
              className="faq-sidebar-card"
              style={{
                marginTop: '20px',
                background: 'rgba(37,211,102,0.05)',
                borderColor: 'rgba(37,211,102,0.2)',
              }}
            >
              <h3>💬 WhatsApp Par Baat Karein</h3>
              <p>
                Seedha WhatsApp karein — main 10 mins mein reply karta hoon. Aapke sawaal ka jawab abhi milega.
              </p>
              <a
                href="https://wa.me/919999999999?text=Hi%20Anirudh!%20I%20need%20digital%20marketing%20help%20for%20my%20business."
                className="btn btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
