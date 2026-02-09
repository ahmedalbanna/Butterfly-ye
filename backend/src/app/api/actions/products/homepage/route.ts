import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withCors } from '@/middleware/cors';

async function handler(request: NextRequest) {
  try {
    // Get all products with their categories
    const allProducts = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get all categories
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Group products by category for homepage display
    const groupedByCategory: any = {};
    
    categories.forEach(category => {
      const categoryProducts = allProducts.filter(p => p.categoryId === category.id);
      if (categoryProducts.length > 0) {
        groupedByCategory[category.name] = categoryProducts;
      }
    });

    // Get featured products (first 5)
    const featured = allProducts.slice(0, 5);

    // Get new arrivals (most recent 5)
    const newArrivals = allProducts.slice(0, 5);

    const response = {
      featured,
      newArrivals,
      byCategory: groupedByCategory,
    };

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch homepage data' },
      { status: 500 }
    );
  }
}

export const GET = withCors(handler);
