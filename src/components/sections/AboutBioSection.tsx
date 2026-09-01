'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface AboutBioSectionProps {
  settings: SiteSettings;
}

export function AboutBioSection({ settings }: AboutBioSectionProps) {
  const photo =
    settings.consultantPhoto ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';

  const credentials = settings.aboutCredentials || [
    'Google Premier Partner 2026',
    'Meta Certified Media Buying Expert',
    'HubSpot Inbound Marketing Leader',
  ];

  const skills = settings.aboutSkills || [
    { name: 'Technical SEO & Crawl Architecture', percentage: 98 },
    { name: 'Google & Meta Performance Ad Scaling', percentage: 95 },
    { name: 'Conversion Rate Optimization (CRO) & UX', percentage: 92 },
    { name: 'High-Performance Next.js Engineering', percentage: 90 },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50/50 dark:bg-dark-surface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Portrait with Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[400px]">
              {/* Decorative background glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-amber-400 rounded-3xl blur-xl opacity-25" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-border bg-slate-900">
                <img
                  src={photo}
                  alt={`${settings.consultantName || 'Alex Rivera'} - ${settings.tagline || 'Growth Consultant'}`}
                  className="w-full h-[460px] object-cover object-center"
                />
              </div>

              {/* Location Badge (Top Right) */}
              <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-3 shadow-lg flex items-center gap-2 border border-white/60 dark:border-slate-700">
                <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {settings.locationBadge || 'San Francisco & Worldwide'}
                </div>
              </div>

              {/* Years Experience Badge (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-3.5 shadow-lg flex items-center gap-3 border border-white/60 dark:border-slate-700">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">
                    {settings.heroCounters?.yearsExperience || 10}+ Years
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {settings.experienceBadge || 'Growth Engineering'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Animated Skills */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400">
              <Sparkles className="w-3.5 h-3.5" />
              {settings.aboutBadge || 'ABOUT THE CONSULTANT'}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {settings.aboutHeading || 'A Direct Senior Partner For Ambitious Scale-Ups'}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              <p>
                {settings.aboutBioParagraph1 ||
                  `I am ${settings.consultantName || 'Alex Rivera'}, an independent growth engineer and technical SEO consultant. For over a decade, I have operated at the intersection of technical crawl architecture, performance paid advertising, and conversion rate optimization.`}
              </p>
              <p>
                {settings.aboutBioParagraph2 ||
                  'Unlike traditional agencies that pass your account to inexperienced coordinators, I personally architect and execute every growth initiative. My client partners get executive-level speed, absolute financial transparency, and predictable compounding pipeline.'}
              </p>
            </div>

            {/* Certification Chips */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              {credentials.map((cert, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-200 shadow-sm"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>

            {/* Animated Skill Progress Bars */}
            <div className="pt-4 space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    <span>{skill.name}</span>
                    <span className="text-primary-600 dark:text-primary-400">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.15, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-primary-600 to-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Link to Full About Page */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 group"
              >
                <span>Read Full Background, Philosophy & Credentials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
