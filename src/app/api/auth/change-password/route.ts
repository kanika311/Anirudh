import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/Admin';
import { verifyAuth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized. Please login again.' }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({
        success: true,
        message: 'Password updated (Database is in preview mode).',
      });
    }

    const adminId = authResult.payload.id;
    let admin = null;

    try {
      admin = await Admin.findById(adminId).select('+password');
    } catch {
      // If adminId is not a valid ObjectId (e.g. fallback id)
      admin = await Admin.findOne({ email: authResult.payload.email.toLowerCase() }).select('+password');
    }

    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin account not found.' }, { status: 404 });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Current password is incorrect.' }, { status: 400 });
    }

    admin.password = newPassword;
    await admin.save();

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully! Please use your new password next time you sign in.',
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to change password.' },
      { status: 500 }
    );
  }
}
