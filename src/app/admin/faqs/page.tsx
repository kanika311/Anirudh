'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, HelpCircle, X, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { FAQ } from '@/types';
import toast from 'react-hot-toast';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const data = await api.getFAQs();
      setFaqs(data || []);
    } catch (e) {
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      order: faqs.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      order: faq.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      toast.error('Question and Answer are required');
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('admin_token') || '';

    const payload = {
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      order: Number(formData.order) || 0,
    };

    try {
      if (editingFaq && editingFaq._id) {
        const res = await api.adminUpdateFAQ(token, editingFaq._id, payload);
        if (res.success) {
          toast.success('FAQ updated successfully!');
          setModalOpen(false);
          fetchFaqs();
        } else {
          toast.error(res.message || 'Failed to update FAQ');
        }
      } else {
        const res = await api.adminCreateFAQ(token, payload);
        if (res.success) {
          toast.success('FAQ added!');
          setModalOpen(false);
          fetchFaqs();
        } else {
          toast.error(res.message || 'Failed to add FAQ');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (faq: FAQ) => {
    if (!faq._id) return;
    if (!window.confirm(`Are you sure you want to delete this FAQ: "${faq.question}"?`)) return;

    const token = localStorage.getItem('admin_token') || '';

    try {
      const res = await api.adminDeleteFAQ(token, faq._id);
      if (res.success) {
        toast.success('FAQ deleted successfully');
        setFaqs((prev) => prev.filter((f) => f._id !== faq._id));
      } else {
        toast.error(res.message || 'Failed to delete FAQ');
      }
    } catch (e: any) {
      toast.error(e.message || 'Error deleting FAQ');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            FAQ & Structured Data Knowledge Base
          </h1>
          <p className="text-xs text-slate-400">
            Frequently asked questions automatically generate FAQPage JSON-LD schema for rich Google search results.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading FAQs...</div>
      ) : faqs.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400 bg-slate-900/50 rounded-3xl border border-slate-800">
          No FAQs found. Click "Add New FAQ" to create your knowledge base entries!
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {faq.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(faq)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit FAQ"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq)}
                    className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-colors border border-rose-900/30"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white">{faq.question}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span>{editingFaq ? 'Edit FAQ Item' : 'Add New FAQ'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. How fast can we expect organic traffic results?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="General">General</option>
                  <option value="Services">Services</option>
                  <option value="Process">Process</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Guarantees">Guarantees</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Detailed Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Provide a clear, helpful explanation..."
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
                  <span>{editingFaq ? 'Update FAQ' : 'Save FAQ'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
