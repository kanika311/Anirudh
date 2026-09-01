'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ArrowRight, Calendar, Clock, X, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'SEO',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
    readTimeMinutes: 5,
    tags: 'Technical SEO, Growth',
    status: 'published' as 'draft' | 'published',
    seoTitle: '',
    seoDesc: '',
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getBlogPosts({ limit: 50 });
      setPosts(data.data || []);
    } catch (e) {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      category: 'SEO',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
      readTimeMinutes: 5,
      tags: 'Technical SEO, Growth',
      status: 'published',
      seoTitle: '',
      seoDesc: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      readTimeMinutes: post.readTimeMinutes || 5,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      status: post.status || 'published',
      seoTitle: post.seo?.metaTitle || '',
      seoDesc: post.seo?.metaDescription || '',
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingPost ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast.error('Title and Slug are required');
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('admin_token') || '';

    const payload = {
      title: formData.title,
      slug: formData.slug.toLowerCase().trim(),
      category: formData.category,
      excerpt: formData.excerpt,
      content: formData.content,
      coverImage: formData.coverImage,
      readTimeMinutes: Number(formData.readTimeMinutes) || 5,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status: formData.status,
      seo: {
        metaTitle: formData.seoTitle || formData.title,
        metaDescription: formData.seoDesc || formData.excerpt,
      },
    };

    try {
      if (editingPost) {
        const idOrSlug = editingPost._id || editingPost.slug;
        const res = await api.adminUpdateBlog(token, idOrSlug, payload);
        if (res.success) {
          toast.success('Article updated successfully!');
          setModalOpen(false);
          fetchPosts();
        } else {
          toast.error(res.message || 'Failed to update post');
        }
      } else {
        const res = await api.adminCreateBlog(token, payload);
        if (res.success) {
          toast.success('Article created and published!');
          setModalOpen(false);
          fetchPosts();
        } else {
          toast.error(res.message || 'Failed to create post');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    const token = localStorage.getItem('admin_token') || '';
    const idOrSlug = post._id || post.slug;

    try {
      const res = await api.adminDeleteBlog(token, idOrSlug);
      if (res.success) {
        toast.success('Article deleted successfully');
        setPosts((prev) => prev.filter((p) => (p._id || p.slug) !== idOrSlug));
      } else {
        toast.error(res.message || 'Failed to delete article');
      }
    } catch (e: any) {
      toast.error(e.message || 'Error deleting article');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            SEO & Growth Insights Articles
          </h1>
          <p className="text-xs text-slate-400">
            Publish playbooks, algorithm guides, and case breakdowns to drive organic traffic.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Article</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading articles...</div>
      ) : posts.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400 bg-slate-900/50 rounded-3xl border border-slate-800">
          No articles found. Click "Create New Article" to publish your first post!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id || post.slug}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-950 text-primary-400 border border-primary-800">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTimeMinutes} min read</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="mx-1">•</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${post.status === 'draft' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}`}>
                    {post.status || 'published'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-primary-400 hover:underline flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(post)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-colors border border-rose-900/30"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</span>
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
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. The Modern Technical SEO Playbook"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. modern-technical-seo-playbook"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="SEO">SEO</option>
                    <option value="CRO">CRO</option>
                    <option value="PPC">PPC</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Read Time (Mins)</label>
                  <input
                    type="number"
                    value={formData.readTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, readTimeMinutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <ImageUpload
                label="Cover Image"
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                placeholder="https://images.unsplash.com/..."
              />

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Brief summary appearing on blog feed cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Markdown Content</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="## Heading&#10;&#10;Write your in-depth guide or playbook here using standard Markdown..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Technical SEO, Next.js, Core Web Vitals"
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
                  <span>{editingPost ? 'Update Article' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
