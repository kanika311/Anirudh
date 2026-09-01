'use client';

import React, { useEffect, useState } from 'react';
import { Star, Plus, Edit2, Trash2, X, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { Testimonial } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: 'VP of Marketing',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    rating: 5,
    quote: '',
    metricHighlight: '+240% Pipeline Growth',
    serviceProvided: 'Technical SEO',
    initials: 'TC',
    avatar: '',
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await api.getTestimonials();
      setTestimonials(data || []);
    } catch (e) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: 'VP of Growth',
      company: 'Acme SaaS',
      location: 'New York, NY',
      rating: 5,
      quote: '',
      metricHighlight: '+310% MRR Growth',
      serviceProvided: 'Technical SEO & CRO',
      initials: 'AS',
      avatar: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (test: Testimonial) => {
    setEditingTestimonial(test);
    setFormData({
      name: test.name,
      role: test.role,
      company: test.company,
      location: test.location || 'San Francisco, CA',
      rating: test.rating || 5,
      quote: test.quote,
      metricHighlight: test.metricHighlight || '',
      serviceProvided: test.serviceProvided || 'Technical SEO',
      initials: test.initials || 'CL',
      avatar: test.avatar || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) {
      toast.error('Name and Quote are required');
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('admin_token') || '';

    const payload = {
      name: formData.name,
      role: formData.role,
      company: formData.company,
      location: formData.location,
      rating: Number(formData.rating) || 5,
      quote: formData.quote,
      metricHighlight: formData.metricHighlight,
      serviceProvided: formData.serviceProvided,
      initials: formData.initials || formData.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      avatar: formData.avatar,
    };

    try {
      if (editingTestimonial && editingTestimonial._id) {
        const res = await api.adminUpdateTestimonial(token, editingTestimonial._id, payload);
        if (res.success) {
          toast.success('Testimonial updated successfully!');
          setModalOpen(false);
          fetchTestimonials();
        } else {
          toast.error(res.message || 'Failed to update testimonial');
        }
      } else {
        const res = await api.adminCreateTestimonial(token, payload);
        if (res.success) {
          toast.success('Testimonial added!');
          setModalOpen(false);
          fetchTestimonials();
        } else {
          toast.error(res.message || 'Failed to add testimonial');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (test: Testimonial) => {
    if (!test._id) return;
    if (!window.confirm(`Are you sure you want to delete testimonial from "${test.name}"?`)) return;

    const token = localStorage.getItem('admin_token') || '';

    try {
      const res = await api.adminDeleteTestimonial(token, test._id);
      if (res.success) {
        toast.success('Testimonial deleted successfully');
        setTestimonials((prev) => prev.filter((t) => t._id !== test._id));
      } else {
        toast.error(res.message || 'Failed to delete testimonial');
      }
    } catch (e: any) {
      toast.error(e.message || 'Error deleting testimonial');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Client Testimonials & Executive Proof
          </h1>
          <p className="text-xs text-slate-400">
            Manage star reviews, executive quotes, and verified metric callouts.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400 bg-slate-900/50 rounded-3xl border border-slate-800">
          No testimonials found. Click "Add New Testimonial" to add executive proof!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test._id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {test.metricHighlight && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {test.metricHighlight}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {test.initials || 'CL'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{test.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {test.role}, {test.company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(test)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(test)}
                    className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-colors border border-rose-900/30"
                    title="Delete Testimonial"
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
                <span>{editingTestimonial ? 'Edit Testimonial' : 'Add New Client Testimonial'}</span>
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
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Role / Title</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. VP of Demand Gen"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. CloudScale AI"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Star Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                    <option value="3">⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Metric Callout</label>
                  <input
                    type="text"
                    value={formData.metricHighlight}
                    onChange={(e) => setFormData({ ...formData, metricHighlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="+340% Pipeline"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Client Photo / Avatar (Optional)"
                  value={formData.avatar}
                  onChange={(url) => setFormData({ ...formData, avatar: url })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Client Executive Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Detailed endorsement about results and ROI delivered..."
                />
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
                  <span>{editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
