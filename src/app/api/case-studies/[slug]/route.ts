import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { CaseStudy } from '@/models/CaseStudy';
import { verifyAuth } from '@/lib/auth';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    let caseStudy = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      caseStudy = await CaseStudy.findById(params.slug);
    }
    if (!caseStudy) {
      caseStudy = await CaseStudy.findOne({ slug: params.slug.toLowerCase() });
    }

    if (!caseStudy) {
      return NextResponse.json({ success: false, message: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: caseStudy });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    let caseStudy = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      caseStudy = await CaseStudy.findByIdAndUpdate(params.slug, body, { new: true, runValidators: true });
    }
    if (!caseStudy) {
      caseStudy = await CaseStudy.findOneAndUpdate({ slug: params.slug.toLowerCase() }, body, { new: true, runValidators: true });
    }

    if (!caseStudy) {
      return NextResponse.json({ success: false, message: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Case study updated successfully', data: caseStudy });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    await connectDB();

    let caseStudy = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      caseStudy = await CaseStudy.findByIdAndDelete(params.slug);
    }
    if (!caseStudy) {
      caseStudy = await CaseStudy.findOneAndDelete({ slug: params.slug.toLowerCase() });
    }

    if (!caseStudy) {
      return NextResponse.json({ success: false, message: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Case study deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
