import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/Admin';
import { verifyAuth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

const updateAdminSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(['admin', 'superadmin', 'editor']).optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = updateAdminSchema.parse(body);

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({
        success: true,
        message: 'Admin updated successfully (preview mode)',
      });
    }

    const admin = await Admin.findById(params.id);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
    }

    if (data.name) admin.name = data.name;
    if (data.role) admin.role = data.role;
    if (data.newPassword) {
      admin.password = data.newPassword;
    }

    await admin.save();

    return NextResponse.json({
      success: true,
      message: data.newPassword ? 'Admin password and details updated successfully!' : 'Admin details updated successfully!',
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update admin' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: 'Admin deleted (preview mode)' });
    }

    const totalAdmins = await Admin.countDocuments();
    if (totalAdmins <= 1) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete the only remaining admin account.' },
        { status: 400 }
      );
    }

    if (authResult.payload.id === params.id) {
      return NextResponse.json(
        { success: false, message: 'You cannot delete your own active admin account while logged in.' },
        { status: 400 }
      );
    }

    await Admin.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Admin account deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
