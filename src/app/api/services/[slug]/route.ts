import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Service } from '@/models/Service';
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
    const identifier = params.slug.toLowerCase();
    
    let service = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      service = await Service.findById(params.slug);
    }
    if (!service) {
      service = await Service.findOne({ slug: identifier });
    }

    if (!service) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: service });
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

    let service = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      service = await Service.findByIdAndUpdate(params.slug, body, { new: true, runValidators: true });
    }
    if (!service) {
      service = await Service.findOneAndUpdate({ slug: params.slug.toLowerCase() }, body, { new: true, runValidators: true });
    }

    if (!service) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Service updated successfully', data: service });
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

    let service = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      service = await Service.findByIdAndDelete(params.slug);
    }
    if (!service) {
      service = await Service.findOneAndDelete({ slug: params.slug.toLowerCase() });
    }

    if (!service) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
