import { NextResponse } from 'next/server';

// In-memory order store (demo only)
const orders: Record<string, any> = {};

export async function POST(request: Request) {
  const body = await request.json();
  const orderId = `D2P-${Date.now().toString(36).toUpperCase()}`;
  
  orders[orderId] = {
    id: orderId,
    ...body,
    status: 'received',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
  };

  return NextResponse.json({ orderId, status: 'received' }, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');

  if (!orderId || !orders[orderId]) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(orders[orderId]);
}
