import { NextResponse } from 'next/server';
import { menuItems, categories } from '@/lib/data/menu';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('q');

  let items = [...menuItems];

  if (category && category !== 'all') {
    items = items.filter((item) => item.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    items,
    categories,
    total: items.length,
  });
}
