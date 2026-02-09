import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withCors } from '@/middleware/cors';
import { requireAuth } from '@/middleware/auth';

async function handler(request: NextRequest, user: any) {
  try {
    const body = await request.json();
    const { items, shippingAddress, paymentMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid order items' },
        { status: 400 }
      );
    }

    // Use transaction to ensure atomic stock updates
    const result = await prisma.$transaction(async (tx) => {
      // Calculate total and verify stock
      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.id },
        });

        if (!product) {
          throw new Error(`Product ${item.id} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        total += product.price * item.quantity;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });

        // Update stock
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Create order
      const order = await tx.order.create({
        data: {
          userId: user.uid,
          total,
          status: 'pending',
          shippingAddress: shippingAddress || '',
          paymentMethod: paymentMethod || 'card',
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return order;
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export const POST = withCors(requireAuth(handler));
