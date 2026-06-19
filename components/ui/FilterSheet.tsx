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
            className="fixed inset-0 z-50 bg-black/40"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[380px] flex flex-col"
            style={{ background: '#F7F3EA' }}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b-2 flex-shrink-0" style={{ borderColor: '#E7E1D3', background: '#F7F3EA' }}>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} style={{ color: '#D62828' }} />
                <h2 className="text-lg font-bold" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>Filters</h2>
                {activeCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold text-white" style={{ background: '#D62828' }}>{activeCount}</span>
                )}
              </div>
              <button onClick={close} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-ash focus:outline-none focus-visible:ring-2 focus-visible:ring-ember" aria-label="Close filters">
                <X size={20} style={{ color: '#1B1714' }} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
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
            {activeCount > 0 && (
              <div className="p-5 border-t-2 flex-shrink-0" style={{ borderColor: '#E7E1D3', background: '#F7F3EA' }}>
                <button onClick={reset} className="w-full py-3 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif", border: '2px solid #D62828', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}>
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>{title}</h3>
      <div className="grid grid-cols-1 gap-2">{children}</div>
    </div>
  );
}

function FilterOption({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember ${checked ? 'text-white' : 'text-ash'}`} style={{ background: checked ? '#D62828' : '#E7E1D3', clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)', color: checked ? '#fff' : '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
      {label}
      <span className={`w-4 h-4 rounded-full border-2 ${checked ? 'border-white bg-white' : 'border-slate'}`} style={{ background: checked ? '#fff' : 'transparent' }}>
        {checked && <span style={{ display: 'inline-block', width: '100%', height: '100%', background: '#D62828', borderRadius: '50%', border: '2px solid #F7F3EA', boxSizing: 'border-box' as const }} />}
      </span>
    </button>
  );
}

function Toggle({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <div className={`relative w-10 h-6 rounded-full transition-colors ${checked ? 'bg-ember' : 'bg-ash'}`} style={{ background: checked ? '#D62828' : '#E7E1D3' }}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
      </div>
      <span className="text-sm font-medium" style={{ color: '#1B1714' }}>{label}</span>
    </button>
  );
}
