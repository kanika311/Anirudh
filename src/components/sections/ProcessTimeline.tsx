'use client';

import React from 'react';

export function ProcessTimeline() {
  const steps = [
    {
      num: '01',
      title: 'Free Audit & Analysis',
      desc: 'Aapki website, competitors aur current SEO health ka deep analysis. Bilkul free.',
    },
    {
      num: '02',
      title: 'Custom Strategy',
      desc: 'Aapke business goals ke hisaab se personalized digital marketing roadmap taiaar karna.',
    },
    {
      num: '03',
      title: 'Implementation',
      desc: 'SEO, content, ads — sab execute karna with precision. On-time, always.',
    },
    {
      num: '04',
      title: 'Monitor & Optimize',
      desc: 'Data-driven decisions. Jo kaam kare use scale karein, jo nahi kare use fix karein.',
    },
    {
      num: '05',
      title: 'Report & Scale',
      desc: 'Weekly transparent reporting. Results ke saath aage badhte rehte hain — scale up karte hain.',
    },
  ];

  return (
    <section id="process">
      <div className="container">
        <div className="section-header center text-center">
          <span className="tag">My Process</span>
          <div className="divider"></div>
          <h2 className="section-heading">
            How I <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="section-sub">
            A proven 5-step system jo consistently Lucknow &amp; Kanpur ke businesses ke liye results deliver karta hai.
          </p>
        </div>

        <div className="process-steps">
          {steps.map((step) => (
            <div key={step.num} className="process-step">
              <div className="process-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
