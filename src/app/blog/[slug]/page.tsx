import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Share2,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { DualCtaBand } from '@/components/sections/DualCtaBand';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const [{ data: post }, settings] = await Promise.all([
    api.getBlogPostBySlug(params.slug),
    api.getSettings(),
  ]);
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const name = settings.consultantName || 'Alex Rivera';

  return {
    title: post.seo?.metaTitle || `${post.title} | ${name} Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
    openGraph: {
      type: 'article',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      authors: [post.author?.name || name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const [{ data: post, relatedPosts }, settings] = await Promise.all([
    api.getBlogPostBySlug(params.slug),
    api.getSettings(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-28 md:pt-36 pb-20">
      {/* Schema */}
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://alexriveragrowth.com/blog/${post.slug}`}
        image={post.coverImage}
        datePublished={post.publishedAt}
        authorName={post.author?.name || 'Alex Rivera'}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Blog', url: 'https://alexriveragrowth.com/blog' },
          { name: post.title, url: `https://alexriveragrowth.com/blog/${post.slug}` },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Post Header */}
        <div className="space-y-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'}
                  alt={post.author?.name || 'Alex Rivera'}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-200">
                {post.author?.name || 'Alex Rivera'}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTimeMinutes} min read
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[320px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md space-y-6 text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
          {/* Excerpt Lead */}
          <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed border-b border-slate-100 dark:border-slate-800/80 pb-6">
            {post.excerpt}
          </p>

          {/* Simple Markdown Formatter for demo and CMS content */}
          <div className="space-y-6 whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                Tagged with:
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="pt-12 space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Related Playbooks in {post.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel._id || rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-md transition-all group"
                >
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dual CTA */}
        <DualCtaBand whatsappNumber={settings.whatsappNumber} />
      </article>
    </div>
  );
}
