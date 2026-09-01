'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface DualCtaBandProps {
  settings?: SiteSettings;
  whatsappNumber?: string;
}

export function DualCtaBand({ settings, whatsappNumber }: DualCtaBandProps) {
  const number = whatsappNumber || settings?.whatsappNumber || '+14158903421';
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const name = settings?.consultantName || 'Alex';

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Free 20-Point Audit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-primary-900 via-indigo-950 to-slate-900 text-white border border-primary-800/50 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                Valued at $750 — 100% Free
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {settings?.ctaAuditHeading || 'Claim Your 20-Point Growth & Technical SEO Audit'}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {settings?.ctaAuditSubheading ||
                  'Receive a personalized 15-minute Loom teardown covering crawl bottlenecks, Core Web Vitals, competitor keyword gaps, and conversion leaks.'}
              </p>

              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Delivered to your inbox in 24 business hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Prioritized action checklist with zero sales pressure</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/#audit-form"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition-all gap-2 group"
              >
                <span>Request Free Audit Teardown</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: WhatsApp Instant Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white border border-emerald-800/50 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                <Clock className="w-3.5 h-3.5" />
                Average Response Time &lt; 15 Mins
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Have Urgent Questions? Connect Directly on WhatsApp
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Skip formal email delays. Text {name} directly for immediate feedback on audits, current campaign diagnostics, or retainer availability.
              </p>

              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Direct founder-to-consultant hotline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Audio messages, PDF reviews & strategy voice notes</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <a
                href={`https://wa.me/${cleanNumber}?text=Hi%20${encodeURIComponent(name)},%20I'm%20interested%20in%20scaling%20our%20traffic%20and%20growth.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-600/30 transition-all gap-2 group"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{settings?.whatsappCtaText || 'Start Direct WhatsApp Chat'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
