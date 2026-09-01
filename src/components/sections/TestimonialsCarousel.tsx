'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Testimonial, SiteSettings } from '@/types';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  settings?: SiteSettings;
}

export function TestimonialsCarousel({ testimonials, settings }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const name = settings?.consultantName || 'Alex Rivera';

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-50/50 dark:bg-dark-surface/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Leaders at <span className="text-gradient">Fast-Growing Companies</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Hear directly from founders, VPs of Growth, and CMOs who have partnered with {name}.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border p-8 sm:p-12 shadow-xl">
            {/* Top Row: Stars + Metric Highlight */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  5.0 Verified Review
                </span>
              </div>

              {current.metricHighlight && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {current.metricHighlight}
                </div>
              )}
            </div>

            {/* Quote Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg sm:text-2xl text-slate-800 dark:text-slate-100 font-medium leading-relaxed italic">
                  "{current.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {current.avatar ? (
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary-500/30">
                      <Image
                        src={current.avatar}
                        alt={current.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white font-extrabold text-xl flex items-center justify-center">
                      {current.initials || 'CL'}
                    </div>
                  )}

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {current.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {current.role}, <span className="font-semibold text-slate-700 dark:text-slate-300">{current.company}</span> • {current.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-400">
                {currentIndex + 1} / {testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
