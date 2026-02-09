import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withCors } from '@/middleware/cors';

async function handler(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export const GET = withCors(handler);
