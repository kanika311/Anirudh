import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Testimonial } from '@/models/Testimonial';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: false, message: 'Database offline' }, { status: 404 });
    }
    const testimonial = await Testimonial.findById(params.id);
    if (!testimonial) {
      return NextResponse.json({ success: false, message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: testimonial });
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
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: 'Testimonial updated in preview mode', data: { ...body, _id: params.id } });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return NextResponse.json({ success: false, message: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Testimonial updated successfully', data: testimonial });
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

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: 'Testimonial deleted in preview mode' });
    }

    const testimonial = await Testimonial.findByIdAndDelete(params.id);

    if (!testimonial) {
      return NextResponse.json({ success: false, message: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
