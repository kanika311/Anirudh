import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMetricPair {
  label: string;
  before: string;
  after: string;
  change: string;
}

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  client: string;
  clientIndustry: string;
  timeframe: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string[];
  results: string[];
  metrics: IMetricPair[];
  coverImage: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  featured: boolean;
  order: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

const MetricPairSchema = new Schema(
  {
    label: { type: String, required: true },
    before: { type: String, required: true },
    after: { type: String, required: true },
    change: { type: String, required: true },
  },
  { _id: false }
);

const CaseStudySchema: Schema<ICaseStudy> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    client: { type: String, required: true },
    clientIndustry: { type: String, required: true },
    timeframe: { type: String, default: '6 Months' },
    summary: { type: String, required: true },
    challenge: { type: String, required: true },
    strategy: { type: String, required: true },
    execution: { type: [String], default: [] },
    results: { type: [String], default: [] },
    metrics: { type: [MetricPairSchema], default: [] },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    },
    testimonialQuote: { type: String },
    testimonialAuthor: { type: String },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

export const CaseStudy: Model<ICaseStudy> = mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
