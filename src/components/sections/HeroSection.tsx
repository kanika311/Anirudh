'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Star,
  Users,
  ShieldCheck,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface HeroSectionProps {
  settings: SiteSettings;
}

const marqueeRow1 = [
  '⚡ Technical SEO Audits',
  '🎯 Google Search & Meta Performance Ads',
  '📈 Conversion Rate Optimization (CRO)',
  '🚀 Sub-1s Next.js Web Development',
  '💎 Programmatic SEO Architecture',
  '🏆 Multi-Location Local Map Pack Domination',
];

const marqueeRow2 = [
  '🔥 B2B SaaS Pipeline Generation',
  '🛍️ D2C E-Commerce 8x+ ROAS',
  '📊 Real-Time Looker Studio Dashboards',
  '⭐ 99+ Verified 5-Star Reviews',
  '💡 Zero Junior Hand-offs',
  '🤝 Month-to-Month Retainers',
];

export function HeroSection({ settings }: HeroSectionProps) {
  const counters = settings.heroCounters || {
    clientsServed: 160,
    yearsExperience: 10,
    fiveStarReviews: 99,
    revenueGenerated: '$48M+',
  };

  const photo =
    settings.consultantPhoto ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glowing mesh */}
      <div className="hero-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy, CTAs & Counters */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Eyebrow Chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-primary-50 dark:bg-primary-950/60 border border-primary-200/80 dark:border-primary-800/60 text-primary-700 dark:text-primary-300 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{settings.heroBadge || 'Available for Q3/Q4 Advisory & Retainers'}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              {settings.heroHeadline || 'Scale Organic Search & High-Intent Pipeline by 300%+'}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {settings.heroSubheadline ||
                'Battle-tested Technical SEO, Paid Performance, and Conversion Architecture for high-growth B2B, SaaS, and D2C brands. Zero agency fluff — direct senior consultant execution.'}
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href={settings.heroPrimaryCtaUrl || '/#audit-form'}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 hover:from-primary-700 hover:to-indigo-800 shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                {settings.heroPrimaryCtaText || 'Claim Free Growth Audit'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={settings.heroSecondaryCtaUrl || '/case-studies'}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-bold text-slate-800 dark:text-slate-100 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-md hover:shadow-lg transition-all"
              >
                {settings.heroSecondaryCtaText || 'View Case Studies'}
              </Link>
            </motion.div>

            {/* Micro Trust Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>No Lock-In Contracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Direct WhatsApp & Slack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>ROI Guaranteed Strategy</span>
              </div>
            </motion.div>

            {/* Animated Counters Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80 dark:border-slate-800/80"
            >
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/50 border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                  {counters.clientsServed}+
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  Clients Scaled
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/50 border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {counters.revenueGenerated}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  Tracked Revenue
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/50 border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">
                  {counters.fiveStarReviews}%
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  5-Star Ratings
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/50 border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {counters.yearsExperience}+ Yrs
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  Senior Experience
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Portrait with Floating Stat Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[420px]"
            >
              {/* Decorative background aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary-600 to-amber-500 rounded-3xl blur-2xl opacity-30 dark:opacity-40 animate-pulse-glow" />

              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/60 dark:border-slate-700/60 shadow-2xl bg-slate-900">
                <img
                  src={photo}
                  alt={`${settings.consultantName || 'Alex Rivera'} - ${settings.tagline || 'Growth Consultant'}`}
                  className="w-full h-[460px] sm:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 text-white">
                  <div className="font-extrabold text-xl">{settings.consultantName || 'Alex Rivera'}</div>
                  <p className="text-xs text-amber-300 font-medium">{settings.tagline || 'Senior Growth & SEO Consultant'}</p>
                </div>
              </div>

              {/* Floating Stat Card 1: Organic Traffic (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-6 -left-6 sm:-left-8 glass-card rounded-2xl p-3.5 shadow-xl flex items-center gap-3 border border-white/40 dark:border-slate-700/60 animate-float"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Organic Traffic</div>
                  <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">+340% Lift</div>
                </div>
              </motion.div>

              {/* Floating Stat Card 2: Revenue Pipeline (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-6 -right-6 sm:-right-8 glass-card rounded-2xl p-3.5 shadow-xl flex items-center gap-3 border border-white/40 dark:border-slate-700/60 animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{settings.experienceBadge || '10+ Years Growth'}</div>
                  <div className="text-base font-extrabold text-primary-600 dark:text-primary-400">{counters.revenueGenerated} Tracked</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bidirectional Infinite Horizontal Marquee */}
        <div className="mt-20 pt-10 border-t border-slate-200/60 dark:border-slate-800/60 space-y-4">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Battle-Tested Growth Architecture
            </span>
          </div>

          <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[...marqueeRow1, ...marqueeRow1].map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
              {[...marqueeRow2, ...marqueeRow2].map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
