import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/Admin';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const createAdminSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'superadmin', 'editor']).default('admin'),
});

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({
        success: true,
        data: [
          {
            _id: 'default-admin-1',
            name: authResult.admin.name || 'Alex Rivera',
            email: authResult.admin.email || 'admin@apexconsulting.com',
            role: authResult.admin.role || 'superadmin',
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }

    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: admins });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch admin accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createAdminSchema.parse(body);

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({
        success: true,
        message: 'Admin account created (preview mode)',
        data: {
          _id: `admin-${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role,
          createdAt: new Date().toISOString(),
        },
      });
    }

    const existingAdmin = await Admin.findOne({ email: data.email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'An admin with this email address already exists.' },
        { status: 400 }
      );
    }

    const newAdmin = await Admin.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      role: data.role,
    });

    const adminResponse = {
      _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      createdAt: newAdmin.createdAt,
    };

    return NextResponse.json({
      success: true,
      message: `Admin account for ${data.name} created successfully!`,
      data: adminResponse,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create admin account' },
      { status: 500 }
    );
  }
}
