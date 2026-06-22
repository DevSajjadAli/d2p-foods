'use client';

import { Category, categories } from '@/lib/data/menu';

type CategoryChipRowProps = {
  active: Category | 'all';
  onChange: (cat: Category | 'all') => void;
};

export default function CategoryChipRow({ active, onChange }: CategoryChipRowProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto no-scrollbar py-2"
      role="tablist"
      aria-label="Filter menu by category"
    >
      {/* All chip */}
      <button
        role="tab"
        aria-selected={active === 'all'}
        onClick={() => onChange('all')}
        className={`flex h-11 flex-shrink-0 items-center gap-1.5 rounded-full border px-5 text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          active === 'all'
            ? 'bg-primary text-white border-primary shadow-sm'
            : 'bg-white text-ink border-gray-200 hover:bg-bg'
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex h-11 flex-shrink-0 items-center gap-1.5 rounded-full border px-5 text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            active === cat.id
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-white text-ink border-gray-200 hover:bg-bg'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
