'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { useUIStore } from '@/lib/store/ui';

export type SortOption = 'relevance' | 'rating' | 'cost-low' | 'cost-high' | 'time';
export type RatingFilter = 'all' | '4.0' | '4.5';
export type CostFilter = 'all' | 'under500' | '500-1000' | '1000-2000' | 'above2000';

export type Filters = {
  sort: SortOption;
  vegOnly: boolean;
  rating: RatingFilter;
  cost: CostFilter;
};

export const defaultFilters: Filters = {
  sort: 'relevance',
  vegOnly: false,
  rating: 'all',
  cost: 'all',
};

type FilterSheetProps = {
  filters: Filters;
  onChange: (f: Filters) => void;
  activeCount: number;
};

export default function FilterSheet({ filters, onChange, activeCount }: FilterSheetProps) {
  const open = useUIStore((s) => s.filterSheetOpen);
  const close = useUIStore((s) => s.closeFilterSheet);

  const setField = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const reset = () => onChange({ ...defaultFilters });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl sm:w-[420px]"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            {/* Header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <SlidersHorizontal size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-ink">Filters</h2>
                  <p className="text-xs text-muted">Refine dishes by rating, cost and diet</p>
                </div>
                {activeCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white">{activeCount}</span>
                )}
              </div>
              <button onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close filters">
                <X size={20} className="text-ink" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              {/* Sort */}
              <Section title="Sort by">
                {[{v:'relevance',l:'Relevance'},{v:'rating',l:'Rating: High to Low'},{v:'cost-low',l:'Cost: Low to High'},{v:'cost-high',l:'Cost: High to Low'},{v:'time',l:'Delivery Time'}].map((opt) => (
                  <FilterOption key={opt.v} label={opt.l} checked={filters.sort === opt.v} onClick={() => setField('sort', opt.v as SortOption)}/>
                ))}
              </Section>

              {/* Veg/Non-Veg */}
              <Section title="Dietary">
                <div className="flex items-center gap-3">
                  <Toggle checked={filters.vegOnly} onClick={() => setField('vegOnly', !filters.vegOnly)} label={filters.vegOnly ? 'Veg Only' : 'All Items'} />
                </div>
              </Section>

              {/* Rating */}
              <Section title="Rating">
                {[{v:'all',l:'Any'},{v:'4.0',l:'4.0+ Rated'},{v:'4.5',l:'4.5+ Rated'}].map((opt) => (
                  <FilterOption key={opt.v} label={opt.l} checked={filters.rating === opt.v} onClick={() => setField('rating', opt.v as RatingFilter)}/>
                ))}
              </Section>

              {/* Cost */}
              <Section title="Cost for two">
                {[{v:'all',l:'Any'},{v:'under500',l:'Under Rs. 500'},{v:'500-1000',l:'Rs. 500 – 1,000'},{v:'1000-2000',l:'Rs. 1,000 – 2,000'},{v:'above2000',l:'Above Rs. 2,000'}].map((opt) => (
                  <FilterOption key={opt.v} label={opt.l} checked={filters.cost === opt.v} onClick={() => setField('cost', opt.v as CostFilter)}/>
                ))}
              </Section>
            </div>

            {/* Footer: Check if any active and show clear all */}
            <div className="flex flex-shrink-0 gap-3 border-t border-gray-100 bg-white p-5 pb-safe">
              {activeCount > 0 && (
                <button onClick={reset} className="h-12 flex-1 rounded-2xl border border-primary bg-white text-sm font-extrabold text-primary transition-colors hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  Clear all
                </button>
              )}
              <button onClick={close} className="h-12 flex-1 rounded-2xl bg-primary text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Show results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-ink">{title}</h3>
      <div className="grid grid-cols-1 gap-2">{children}</div>
    </div>
  );
}

function FilterOption({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${checked ? 'border-primary bg-primary/10 text-primary' : 'border-gray-100 bg-bg text-ink hover:bg-gray-100'}`}
      aria-pressed={checked}
    >
      {label}
      <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${checked ? 'border-primary' : 'border-gray-300'}`}>
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
    </button>
  );
}

function Toggle({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex min-h-12 items-center gap-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-pressed={checked}>
      <div className={`relative h-7 w-12 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </div>
      <span className="text-sm font-bold text-ink">{label}</span>
    </button>
  );
}
