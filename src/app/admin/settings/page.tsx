'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Save,
  Sparkles,
  User,
  Image as ImageIcon,
  Flame,
  FileText,
  ShieldCheck,
  Phone,
  Share2,
  Globe,
  Loader2,
  CheckCircle2,
  Key,
} from 'lucide-react';
import { api } from '@/lib/api';
import { SiteSettings } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'identity' | 'hero' | 'about' | 'why' | 'contact' | 'seo'>('identity');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (e) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);

    try {
      let payload = { ...settings };
      // Auto-sync global meta title if it still had the default name while name was changed
      if (
        payload.consultantName &&
        payload.consultantName !== 'Alex Rivera' &&
        payload.globalSeo?.metaTitle &&
        payload.globalSeo.metaTitle.includes('Alex Rivera')
      ) {
        payload.globalSeo = {
          ...payload.globalSeo,
          metaTitle: payload.globalSeo.metaTitle.replace(/Alex Rivera/g, payload.consultantName),
        };
      }

      const token = localStorage.getItem('admin_token') || '';
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setSettings(json.data);
        }
        toast.success('Site settings and homepage copy updated successfully!');
      } else {
        const json = await res.json().catch(() => ({}));
        toast.error(json.message || 'Failed to save settings');
      }
    } catch (e) {
      toast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
        <p className="text-xs text-slate-400">Loading site configuration...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'identity', label: 'Identity & Photos', icon: User },
    { id: 'hero', label: 'Hero & Counters', icon: Flame },
    { id: 'about', label: 'About & Bio', icon: FileText },
    { id: 'why', label: 'Why Choose & CTAs', icon: ShieldCheck },
    { id: 'contact', label: 'Contact & WhatsApp', icon: Phone },
    { id: 'seo', label: 'SEO & Socials', icon: Globe },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-primary-400" />
            <span>Master Site Settings & Homepage Content</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Change any word, logo, photo, headline, email, phone number, and stats across the entire website.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link
            href="/admin/admins"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-primary-400" />
            <span>Change Password & Admins</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving Changes...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Identity & Photos */}
        {activeTab === 'identity' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-primary-400" />
                <span>Consultant Branding & Identity</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Consultant Full Name *</label>
                  <input
                    type="text"
                    required
                    value={settings.consultantName || ''}
                    onChange={(e) => {
                      const newName = e.target.value;
                      const oldName = settings.consultantName || '';
                      let newMetaTitle = settings.globalSeo?.metaTitle || '';
                      if (!newMetaTitle || (oldName && newMetaTitle.includes(oldName)) || newMetaTitle.includes('Alex Rivera')) {
                        newMetaTitle = `${newName} | ${settings.tagline || 'Growth Consulting'}`;
                      }
                      setSettings({
                        ...settings,
                        consultantName: newName,
                        globalSeo: {
                          ...settings.globalSeo,
                          metaTitle: newMetaTitle,
                        },
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Alex Rivera"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Brand / Business Site Name *</label>
                  <input
                    type="text"
                    required
                    value={settings.siteName || ''}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Alex Rivera | Growth & Technical SEO"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Professional Tagline / Role</label>
                  <input
                    type="text"
                    value={settings.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Senior Growth & Technical SEO Consultant"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Navbar Badge Initials</label>
                  <input
                    type="text"
                    value={settings.consultantInitials || ''}
                    onChange={(e) => setSettings({ ...settings, consultantInitials: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. AR"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Location Badge</label>
                  <input
                    type="text"
                    value={settings.locationBadge || ''}
                    onChange={(e) => setSettings({ ...settings, locationBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. San Francisco & Worldwide"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Experience Badge Text</label>
                <input
                  type="text"
                  value={settings.experienceBadge || ''}
                  onChange={(e) => setSettings({ ...settings, experienceBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. 10+ Years Growth Engineering"
                />
              </div>
            </div>

            {/* Media Uploads */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Photos & Media Upload</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <ImageUpload
                    label="Consultant Photo / Portrait"
                    value={settings.consultantPhoto || ''}
                    onChange={(url) => setSettings({ ...settings, consultantPhoto: url })}
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">Used in Hero and About sections</p>
                </div>
                <div>
                  <ImageUpload
                    label="Website Logo Image"
                    value={settings.logoUrl || ''}
                    onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                    placeholder="https://..."
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">Used in top Navbar and Footer</p>
                </div>
                <div>
                  <ImageUpload
                    label="Browser Tab Logo / Favicon"
                    value={settings.faviconUrl || ''}
                    onChange={(url) => setSettings({ ...settings, faviconUrl: url })}
                    placeholder="https://..."
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">Shown in browser tabs next to page title (falls back to Logo)</p>
                </div>
              </div>
            </div>

            {/* Live Browser Tab Direct Interactive Editor Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Browser Tab Title & Logo (Direct Live Editor)</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Click & edit the title text directly inside the tab below or use the input field.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/60 self-start sm:self-auto">
                  <span>✏️ Click Inside Tab to Type</span>
                </div>
              </div>

              {/* Interactive Browser Mockup */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-inner space-y-4">
                <div className="flex items-center gap-2">
                  {/* Browser Tab Input */}
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800 border-2 border-primary-500/80 text-white shadow-lg flex-1 max-w-xl transition-all focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/30">
                    {settings.faviconUrl || settings.logoUrl ? (
                      <img
                        src={settings.faviconUrl || settings.logoUrl}
                        alt="Favicon"
                        className="w-4 h-4 rounded object-contain flex-shrink-0"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded bg-primary-600 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                        {settings.consultantInitials || 'AR'}
                      </div>
                    )}
                    <input
                      type="text"
                      value={
                        settings.globalSeo?.metaTitle !== undefined
                          ? settings.globalSeo.metaTitle
                          : `${settings.consultantName || 'Alex Rivera'} | ${settings.tagline || 'Growth Consulting'}`
                      }
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          globalSeo: {
                            ...settings.globalSeo,
                            metaTitle: e.target.value,
                          },
                        })
                      }
                      placeholder="Type your custom browser tab title here..."
                      className="bg-transparent text-xs font-bold text-white focus:outline-none w-full placeholder-slate-500"
                    />
                    <span className="text-xs text-slate-400 ml-1 select-none">×</span>
                  </div>
                </div>

                {/* Direct Title Controls */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Active Tab Title:</span>{' '}
                    <span className="text-primary-300 font-mono text-[11px]">
                      {settings.globalSeo?.metaTitle || `${settings.consultantName || 'Alex Rivera'} | ${settings.tagline || 'Growth Consulting'}`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const defaultTitle = `${settings.consultantName || 'Alex Rivera'} | ${settings.tagline || 'Growth & SEO Consultant'}`;
                      setSettings({
                        ...settings,
                        globalSeo: {
                          ...settings.globalSeo,
                          metaTitle: defaultTitle,
                        },
                      });
                      toast.success('Tab title reset to Consultant Name format');
                    }}
                    className="text-[11px] font-bold text-primary-400 hover:text-primary-300 transition-colors underline self-start sm:self-auto"
                  >
                    Reset Title to Default
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Hero & Counters */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Homepage Hero Copy & CTAs</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Availability Eyebrow Chip</label>
                <input
                  type="text"
                  value={settings.heroBadge || ''}
                  onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. Available for Q3/Q4 Advisory & Retainers"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Main Hero Headline *</label>
                <textarea
                  rows={2}
                  required
                  value={settings.heroHeadline || ''}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Scale Organic Search & High-Intent Pipeline by 300%+"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Hero Subheadline / Value Proposition *</label>
                <textarea
                  rows={3}
                  required
                  value={settings.heroSubheadline || ''}
                  onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Battle-tested Technical SEO, Paid Performance, and Conversion Architecture..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={settings.heroPrimaryCtaText || ''}
                    onChange={(e) => setSettings({ ...settings, heroPrimaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Claim Free 20-Point Audit"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Primary CTA Button URL</label>
                  <input
                    type="text"
                    value={settings.heroPrimaryCtaUrl || ''}
                    onChange={(e) => setSettings({ ...settings, heroPrimaryCtaUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="/#audit-form"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Secondary CTA Button Text</label>
                  <input
                    type="text"
                    value={settings.heroSecondaryCtaText || ''}
                    onChange={(e) => setSettings({ ...settings, heroSecondaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Explore Case Studies"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Secondary CTA Button URL</label>
                  <input
                    type="text"
                    value={settings.heroSecondaryCtaUrl || ''}
                    onChange={(e) => setSettings({ ...settings, heroSecondaryCtaUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="/case-studies"
                  />
                </div>
              </div>
            </div>

            {/* Live Numerical Counters */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Live Homepage Trust Counters</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Clients Scaled (#)</label>
                  <input
                    type="number"
                    value={settings.heroCounters?.clientsServed || 160}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        heroCounters: { ...settings.heroCounters, clientsServed: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Years Experience (#)</label>
                  <input
                    type="number"
                    value={settings.heroCounters?.yearsExperience || 10}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        heroCounters: { ...settings.heroCounters, yearsExperience: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">5-Star Reviews (%)</label>
                  <input
                    type="number"
                    value={settings.heroCounters?.fiveStarReviews || 99}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        heroCounters: { ...settings.heroCounters, fiveStarReviews: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Revenue Generated (String)</label>
                  <input
                    type="text"
                    value={settings.heroCounters?.revenueGenerated || '$48M+'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        heroCounters: { ...settings.heroCounters, revenueGenerated: e.target.value },
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. About & Bio */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>About Section Copy & Narrative</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Section Eyebrow Chip</label>
                  <input
                    type="text"
                    value={settings.aboutBadge || ''}
                    onChange={(e) => setSettings({ ...settings, aboutBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="ABOUT THE CONSULTANT"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Main Section Heading</label>
                  <input
                    type="text"
                    value={settings.aboutHeading || ''}
                    onChange={(e) => setSettings({ ...settings, aboutHeading: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="A Direct Senior Partner For Ambitious Scale-Ups"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Bio Paragraph 1</label>
                <textarea
                  rows={3}
                  value={settings.aboutBioParagraph1 || ''}
                  onChange={(e) => setSettings({ ...settings, aboutBioParagraph1: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="I am Alex Rivera, an independent growth engineer..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Bio Paragraph 2</label>
                <textarea
                  rows={3}
                  value={settings.aboutBioParagraph2 || ''}
                  onChange={(e) => setSettings({ ...settings, aboutBioParagraph2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Unlike traditional agencies that pass your account..."
                />
              </div>
            </div>

            {/* Certifications & Skills */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Credentials & Skill Progress Bars</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Certifications & Badges (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(settings.aboutCredentials || []).join(', ')}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aboutCredentials: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Google Premier Partner 2026, Meta Certified Media Buying Expert, HubSpot Inbound Leader"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300">Skill Proficiency Bars</label>
                {(settings.aboutSkills || [
                  { name: 'Technical SEO & Crawl Architecture', percentage: 98 },
                  { name: 'Google & Meta Performance Ad Scaling', percentage: 95 },
                  { name: 'Conversion Rate Optimization (CRO) & UX', percentage: 92 },
                  { name: 'High-Performance Next.js Engineering', percentage: 90 },
                ]).map((skill, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 items-center">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...(settings.aboutSkills || [])];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setSettings({ ...settings, aboutSkills: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                        placeholder="Skill Name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={skill.percentage}
                        onChange={(e) => {
                          const updated = [...(settings.aboutSkills || [])];
                          updated[idx] = { ...updated[idx], percentage: Number(e.target.value) };
                          setSettings({ ...settings, aboutSkills: updated });
                        }}
                        className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs text-center font-bold"
                      />
                      <span className="text-xs text-primary-400 font-bold">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Why Choose & CTAs */}
        {activeTab === 'why' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Why Choose Us Section</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Section Badge</label>
                  <input
                    type="text"
                    value={settings.whyChooseBadge || ''}
                    onChange={(e) => setSettings({ ...settings, whyChooseBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="WHY PARTNER WITH A SENIOR CONSULTANT"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Main Heading</label>
                  <input
                    type="text"
                    value={settings.whyChooseHeading || ''}
                    onChange={(e) => setSettings({ ...settings, whyChooseHeading: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Agencies Sell You The VP, Then Assign You The Intern"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Subheading Description</label>
                <textarea
                  rows={3}
                  value={settings.whyChooseSubheading || ''}
                  onChange={(e) => setSettings({ ...settings, whyChooseSubheading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="When you hire an agency, you pay for expensive overhead..."
                />
              </div>
            </div>

            {/* CTA Band Settings */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Call-to-Action Dual Band Copy</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Free Audit Card Headline</label>
                  <input
                    type="text"
                    value={settings.ctaAuditHeading || ''}
                    onChange={(e) => setSettings({ ...settings, ctaAuditHeading: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Claim Your 20-Point Growth & Technical SEO Audit"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">WhatsApp CTA Button Text</label>
                  <input
                    type="text"
                    value={settings.whatsappCtaText || ''}
                    onChange={(e) => setSettings({ ...settings, whatsappCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Start Direct WhatsApp Chat"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Free Audit Card Subheading</label>
                <textarea
                  rows={2}
                  value={settings.ctaAuditSubheading || ''}
                  onChange={(e) => setSettings({ ...settings, ctaAuditSubheading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Receive a personalized 15-minute Loom teardown covering crawl bottlenecks..."
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. Contact & WhatsApp */}
        {activeTab === 'contact' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Direct Communication & Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Contact Email Address *</label>
                <input
                  type="email"
                  required
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="alex@apexconsulting.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={settings.contactPhone || ''}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="+1 (415) 890-3421"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">WhatsApp Number (with country code)</label>
                <input
                  type="text"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="+14158903421"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Physical Office / Location Address</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="500 Howard Street, Suite 400, San Francisco, CA 94105"
              />
            </div>
          </div>
        )}

        {/* 6. SEO & Socials */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary-400" />
                <span>Social Media Profiles</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={settings.socialLinks?.linkedin || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="https://linkedin.com/in/alexriveragrowth"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Twitter / X Profile URL</label>
                  <input
                    type="url"
                    value={settings.socialLinks?.twitter || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="https://twitter.com/alexriveraseo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={settings.socialLinks?.github || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: { ...settings.socialLinks, github: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="https://github.com/alexrivera"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">YouTube Profile URL</label>
                  <input
                    type="url"
                    value={settings.socialLinks?.youtube || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="https://youtube.com/@alexriveragrowth"
                  />
                </div>
              </div>
            </div>

            {/* Global SEO Metadata */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Global SEO & OpenGraph Social Sharing</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Global Meta Title *</label>
                <input
                  type="text"
                  required
                  value={settings.globalSeo?.metaTitle || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSeo: { ...settings.globalSeo, metaTitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Alex Rivera | Senior SEO & Growth Marketing Consultant"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Global Meta Description *</label>
                <textarea
                  rows={2}
                  required
                  value={settings.globalSeo?.metaDescription || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSeo: { ...settings.globalSeo, metaDescription: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Transform your organic search visibility, reduce CAC..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Target SEO Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(settings.globalSeo?.keywords || []).join(', ')}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSeo: {
                        ...settings.globalSeo,
                        keywords: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="SEO consultant, growth marketing, technical SEO audit, SaaS marketing"
                />
              </div>

              <div>
                <ImageUpload
                  label="Default Social Share OpenGraph Image (for Twitter/LinkedIn/Google cards)"
                  value={settings.globalSeo?.ogImageUrl || ''}
                  onChange={(url) =>
                    setSettings({
                      ...settings,
                      globalSeo: {
                        ...settings.globalSeo,
                        ogImageUrl: url,
                      },
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="py-3.5 px-8 rounded-xl font-bold text-sm text-white bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-600/30 transition-all flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
