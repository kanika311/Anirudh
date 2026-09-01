'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { PricingPlan } from '@/types';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    badge: 'Most Popular',
    priceMonthly: 4500,
    priceQuarterly: 12000,
    description: 'Comprehensive technical SEO, monthly sprint execution, and full conversion rate architecture.',
    features: 'Full Technical SEO Audit\nCore Web Vitals Optimization\nMonthly Content Strategy\nWeekly Pipeline Reporting\nDedicated Slack Channel',
    popular: false,
    ctaText: 'Apply for Retainer',
    ctaUrl: '/contact',
    order: 0,
  });

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await api.getPricingPlans();
      setPlans(data || []);
    } catch (e) {
      toast.error('Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const openCreateModal = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      badge: 'Best for scale-ups',
      priceMonthly: 5000,
      priceQuarterly: 13500,
      description: 'End-to-end consulting, technical audits, and performance marketing execution.',
      features: 'Comprehensive Technical Audit\nBi-weekly Sprint Reviews\nCustom Schema Architecture\nDedicated Slack Hotline',
      popular: false,
      ctaText: 'Book Strategy Call',
      ctaUrl: '/contact',
      order: plans.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      badge: plan.badge || '',
      priceMonthly: plan.priceMonthly,
      priceQuarterly: plan.priceQuarterly || Math.round(plan.priceMonthly * 2.7),
      description: plan.description,
      features: Array.isArray(plan.features) ? plan.features.join('\n') : '',
      popular: !!plan.popular,
      ctaText: plan.ctaText || 'Get Started',
      ctaUrl: plan.ctaUrl || '/contact',
      order: plan.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Plan Name is required');
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('admin_token') || '';

    const payload = {
      name: formData.name,
      badge: formData.badge,
      priceMonthly: Number(formData.priceMonthly) || 0,
      priceQuarterly: Number(formData.priceQuarterly) || 0,
      description: formData.description,
      features: formData.features.split('\n').map((f) => f.trim()).filter(Boolean),
      popular: formData.popular,
      ctaText: formData.ctaText,
      ctaUrl: formData.ctaUrl,
      order: Number(formData.order) || 0,
    };

    try {
      if (editingPlan && editingPlan._id) {
        const res = await api.adminUpdatePricing(token, editingPlan._id, payload);
        if (res.success) {
          toast.success('Pricing tier updated successfully!');
          setModalOpen(false);
          fetchPlans();
        } else {
          toast.error(res.message || 'Failed to update pricing plan');
        }
      } else {
        const res = await api.adminCreatePricing(token, payload);
        if (res.success) {
          toast.success('Pricing tier added!');
          setModalOpen(false);
          fetchPlans();
        } else {
          toast.error(res.message || 'Failed to add pricing plan');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (plan: PricingPlan) => {
    if (!plan._id) return;
    if (!window.confirm(`Are you sure you want to delete pricing plan "${plan.name}"?`)) return;

    const token = localStorage.getItem('admin_token') || '';

    try {
      const res = await api.adminDeletePricing(token, plan._id);
      if (res.success) {
        toast.success('Pricing plan deleted successfully');
        setPlans((prev) => prev.filter((p) => p._id !== plan._id));
      } else {
        toast.error(res.message || 'Failed to delete plan');
      }
    } catch (e: any) {
      toast.error(e.message || 'Error deleting plan');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Consulting Retainer Tiers
          </h1>
          <p className="text-xs text-slate-400">
            Configure monthly & quarterly pricing, inclusions, and popular badges.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Pricing Plan</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading pricing tiers...</div>
      ) : plans.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400 bg-slate-900/50 rounded-3xl border border-slate-800">
          No pricing plans found. Click "Add Pricing Plan" to create your first retainer tier!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`p-6 rounded-3xl bg-slate-900 border space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all group ${
                plan.popular ? 'border-primary-500 shadow-xl' : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-primary-600 text-white">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-white mb-2">
                  {formatCurrency(plan.priceMonthly)}{' '}
                  <span className="text-xs text-slate-400 font-normal">/ mo</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{plan.description}</p>

                <div className="space-y-1.5 border-t border-slate-800 pt-3 text-xs text-slate-300">
                  {plan.features?.slice(0, 4).map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Quarterly: {formatCurrency(plan.priceQuarterly || plan.priceMonthly * 2.7)}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(plan)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Plan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan)}
                    className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-colors border border-rose-900/30"
                    title="Delete Plan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span>{editingPlan ? 'Edit Retainer Plan' : 'Add New Pricing Plan'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Plan Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Growth Engine Retainer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Badge / Subtitle</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Most Popular"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Monthly Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.priceMonthly}
                    onChange={(e) => setFormData({ ...formData, priceMonthly: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="4500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Quarterly Price ($)</label>
                  <input
                    type="number"
                    value={formData.priceQuarterly}
                    onChange={(e) => setFormData({ ...formData, priceQuarterly: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="12000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Plan Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Summary of who this tier is designed for..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Included Features (1 per line)</label>
                <textarea
                  rows={4}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none font-mono"
                  placeholder="Full Technical SEO Audit&#10;Core Web Vitals Remediation&#10;Dedicated Slack Hotline"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="popular" className="text-xs font-bold text-slate-300 cursor-pointer">
                  Mark as "Most Popular" Recommended Tier
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-lg shadow-primary-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingPlan ? 'Update Plan' : 'Save Plan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
