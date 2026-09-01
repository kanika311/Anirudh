'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { api } from '@/lib/api';
import { SiteSettings, Service } from '@/types';

const leadFormSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  websiteUrl: z.string().min(3, 'Please provide your current website or domain URL'),
  serviceNeeded: z.string().min(2, 'Please select a primary service practice'),
  monthlyBudget: z.string().optional(),
  message: z.string().min(5, 'Please provide a brief description of your goals or current bottlenecks'),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface ContactSectionProps {
  settings: SiteSettings;
  services: Service[];
}

export function ContactSection({ settings, services }: ContactSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      serviceNeeded: 'Technical & Organic SEO Domination',
      monthlyBudget: '$2,500 - $5,000 / mo',
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await api.submitLead({
        ...data,
        source: 'Homepage Lead Form',
      });

      if (res.success) {
        setSubmittedSuccess(true);
        reset();
      } else {
        setErrorMessage(res.message || 'Something went wrong. Please try again or message via WhatsApp.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit form. Please contact directly via email or WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="audit-form" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Trust Badges */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Let's Build Your Pipeline
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Request Your <span className="text-gradient">Free Growth Audit</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-normal">
                Fill out the form with your website and goals. Alex Rivera will personally review your domain and send a bespoke 15-minute video teardown within 24 hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-start gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Email</div>
                  <a
                    href={`mailto:${settings.contactEmail || 'alex@apexconsulting.com'}`}
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-primary-600 transition-colors"
                  >
                    {settings.contactEmail || 'alex@apexconsulting.com'}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-start gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Phone & WhatsApp</div>
                  <a
                    href={`tel:${settings.contactPhone || '+14158903421'}`}
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors"
                  >
                    {settings.contactPhone || '+1 (415) 890-3421'}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-start gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters</div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {settings.address || '500 Howard Street, Suite 400, San Francisco, CA 94105'}
                  </div>
                </div>
              </div>
            </div>

            {/* Response Guarantee Pill */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface/60 border border-slate-200 dark:border-dark-border flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span>Strict 24-Hour turnaround SLA on all audit requests.</span>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xl relative">
              {submittedSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Audit Request Received!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you! {settings.consultantName || 'Alex Rivera'} has received your domain information. Expect your personalized video audit and action plan in your inbox within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Connor"
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-500 font-semibold mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="sarah@company.com"
                        {...register('email')}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 font-semibold mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Website URL */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Website / Domain URL *
                      </label>
                      <input
                        type="text"
                        placeholder="https://company.com"
                        {...register('websiteUrl')}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                      {errors.websiteUrl && (
                        <p className="text-xs text-rose-500 font-semibold mt-1">
                          {errors.websiteUrl.message}
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register('phone')}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Primary Practice / Service */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Primary Focus Area *
                      </label>
                      <select
                        {...register('serviceNeeded')}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      >
                        <option value="Technical & Organic SEO Domination">Technical & Organic SEO Domination</option>
                        <option value="Google & Meta Performance Ads">Google & Meta Performance Ads</option>
                        <option value="Conversion-Focused Web Development">Conversion-Focused Web Development</option>
                        <option value="City-Specific & Local Dominance">City-Specific & Local SEO Dominance</option>
                        <option value="High-Impact Social Media Marketing">Social Media & Founder Branding</option>
                        <option value="Growth Advisory & Fractional CMO">Growth Advisory & Fractional CMO</option>
                      </select>
                    </div>

                    {/* Monthly Growth Budget */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Estimated Monthly Growth Budget
                      </label>
                      <select
                        {...register('monthlyBudget')}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      >
                        <option value="$2,500 - $5,000 / mo">$2,500 - $5,000 / mo</option>
                        <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                        <option value="$10,000 - $25,000+ / mo">$10,000 - $25,000+ / mo</option>
                        <option value="One-Time Website Build / Audit">One-Time Project / Audit</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Growth Goals or Key Challenges *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your current CAC, organic traffic bottlenecks, or what you'd like to scale over the next 90 days..."
                      {...register('message')}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-500 font-semibold mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-8 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 hover:from-primary-700 hover:to-indigo-800 shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/35 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Analyzing & Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Free Audit Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Your data is 100% confidential. No spam, ever.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
