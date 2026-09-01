'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  ArrowRight,
  Navigation,
  Globe2,
} from 'lucide-react';

const cityHubs = [
  {
    city: 'San Francisco Bay Area',
    state: 'California, US',
    headline: 'Silicon Valley Headquarters & Tech Corridor',
    neighborhoods: ['SoMa', 'Financial District', 'Palo Alto', 'Mountain View', 'Berkeley', 'San Jose'],
    auditText: 'Claim San Francisco Local Audit',
  },
  {
    city: 'New York City Metro',
    state: 'New York, US',
    headline: 'Manhattan & Brooklyn Scale-Up Hubs',
    neighborhoods: ['Manhattan / Flatiron', 'DUMBO Tech Triangle', 'Midtown', 'SoHo', 'Long Island City'],
    auditText: 'Claim New York Market Audit',
  },
  {
    city: 'Austin & Texas Corridor',
    state: 'Texas, US',
    headline: 'Silicon Hills Tech & High-Growth Enterprise',
    neighborhoods: ['Downtown Austin', 'The Domain', 'East Austin', 'South Congress', 'Dallas Uptown'],
    auditText: 'Claim Austin Local Audit',
  },
  {
    city: 'London & European Hubs',
    state: 'United Kingdom / Remote',
    headline: 'International Tech & Financial Centers',
    neighborhoods: ['Shoreditch', 'City of London', 'King’s Cross', 'Soho', 'Canary Wharf'],
    auditText: 'Claim London Market Audit',
  },
];

export function ServiceAreaSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-dark-surface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400">
            <Globe2 className="w-3.5 h-3.5" />
            Regional & Local Presence
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Targeted Geographic & <span className="text-gradient">Local Market Dominance</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Whether you are a multi-location clinic, high-ticket regional service firm, or national brand targeting key metropolitan hubs, we engineer localized search domination.
          </p>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cityHubs.map((hub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{hub.state}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                  {hub.city}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {hub.headline}
                </p>

                {/* Neighborhood chips */}
                <div className="space-y-1.5 mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Territories:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.neighborhoods.map((nh, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                      >
                        {nh}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all group/btn"
              >
                <span>{hub.auditText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
