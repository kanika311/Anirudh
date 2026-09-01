import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  order: number;
  featured: boolean;
  deliverables: string[];
  benefits: string[];
  targetAudience: string;
  startingPrice: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    icon: { type: String, default: 'TrendingUp' },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
    deliverables: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    targetAudience: { type: String, default: 'B2B SaaS, E-Commerce, and Growth-Stage Startups' },
    startingPrice: { type: String, default: '$2,500/mo' },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

export const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
