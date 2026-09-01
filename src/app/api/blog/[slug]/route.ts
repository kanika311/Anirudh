import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { BlogPost } from '@/models/BlogPost';
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
    let post = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      post = await BlogPost.findById(params.slug);
    }
    if (!post) {
      post = await BlogPost.findOne({ slug: params.slug.toLowerCase() });
    }

    if (!post) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    // Get 3 related posts in same category
    const relatedPosts = await BlogPost.find({
      category: post.category,
      _id: { $ne: post._id },
      status: 'published',
    })
      .limit(3)
      .select('title slug category coverImage publishedAt readTimeMinutes excerpt');

    return NextResponse.json({ success: true, data: post, relatedPosts });
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

    let post = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      post = await BlogPost.findByIdAndUpdate(params.slug, body, { new: true, runValidators: true });
    }
    if (!post) {
      post = await BlogPost.findOneAndUpdate({ slug: params.slug.toLowerCase() }, body, { new: true, runValidators: true });
    }

    if (!post) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post updated', data: post });
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
    let post = null;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      post = await BlogPost.findByIdAndDelete(params.slug);
    }
    if (!post) {
      post = await BlogPost.findOneAndDelete({ slug: params.slug.toLowerCase() });
    }

    if (!post) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
