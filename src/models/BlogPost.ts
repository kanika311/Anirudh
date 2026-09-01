import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTimeMinutes: number;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: Date;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

const BlogPostSchema: Schema<IBlogPost> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, default: 'SEO' },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
    },
    author: {
      name: { type: String, default: 'Alex Rivera' },
      role: { type: String, default: 'Senior Growth & SEO Consultant' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' },
    },
    readTimeMinutes: { type: Number, default: 6 },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    publishedAt: { type: Date, default: Date.now },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
