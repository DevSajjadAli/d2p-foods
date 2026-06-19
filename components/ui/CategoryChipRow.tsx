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
        className={`flex-shrink-0 flex items-center gap-1.5 px-5 h-10 text-sm font-semibold transition-all duration-200 focus:outline-none rounded-full border ${
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
          className={`flex-shrink-0 flex items-center gap-1.5 px-5 h-10 text-sm font-semibold transition-all duration-200 focus:outline-none rounded-full border ${
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
