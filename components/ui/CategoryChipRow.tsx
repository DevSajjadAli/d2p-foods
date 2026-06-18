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
        className="flex-shrink-0 flex items-center gap-1.5 px-4 h-11 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember whitespace-nowrap"
        style={{
          fontFamily: "'Work Sans', sans-serif",
          clipPath:
            'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
          background: active === 'all' ? '#D62828' : '#E7E1D3',
          color: active === 'all' ? '#fff' : '#1B1714',
        }}
      >
        🍽️ All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onChange(cat.id)}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 h-11 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember whitespace-nowrap"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            clipPath:
              'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
            background: active === cat.id ? '#D62828' : '#E7E1D3',
            color: active === cat.id ? '#fff' : '#1B1714',
          }}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
