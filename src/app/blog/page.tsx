import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { DualCtaBand } from '@/components/sections/DualCtaBand';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `Growth & SEO Knowledge Hub | ${name} Playbooks & Teardowns`,
    description: `Deep-dive articles and actionable playbooks on Technical SEO, Core Web Vitals, Google Ads ROAS, and conversion rate optimization by ${name}.`,
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?: string };
}) {
  const [blogData, settings] = await Promise.all([
    api.getBlogPosts({
      category: searchParams.category,
      search: searchParams.search,
      page: searchParams.page ? Number(searchParams.page) : 1,
      limit: 12,
    }),
    api.getSettings(),
  ]);

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Blog', url: 'https://alexriveragrowth.com/blog' },
        ]}
      />
      <BlogPreview posts={blogData.data} />
      <DualCtaBand whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
