import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { FAQ } from '@/models/FAQ';
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
    const faq = await FAQ.findById(params.id);
    if (!faq) {
      return NextResponse.json({ success: false, message: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: faq });
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
      return NextResponse.json({ success: true, message: 'FAQ updated in preview mode', data: { ...body, _id: params.id } });
    }

    const faq = await FAQ.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!faq) {
      return NextResponse.json({ success: false, message: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'FAQ updated', data: faq });
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
      return NextResponse.json({ success: true, message: 'FAQ deleted in preview mode' });
    }

    const faq = await FAQ.findByIdAndDelete(params.id);

    if (!faq) {
      return NextResponse.json({ success: false, message: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'FAQ deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
