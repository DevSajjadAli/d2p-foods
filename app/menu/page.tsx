'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '@/components/ui/MenuCard';
import CategoryChipRow from '@/components/ui/CategoryChipRow';
import RestaurantHeader from '@/components/ui/RestaurantHeader';
import FilterSheet, { Filters, defaultFilters } from '@/components/ui/FilterSheet';
import { useUIStore } from '@/lib/store/ui';
import { menuItems, Category, getItemsByCategory, categories } from '@/lib/data/menu';

export default function MenuPage() {
  // Local UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters });
  const openFilterSheet = useUIStore((s) => s.openFilterSheet);

  const activeCount = (filters.sort !== 'relevance' ? 1 : 0) +
    (filters.vegOnly ? 1 : 0) +
    (filters.rating !== 'all' ? 1 : 0) +
    (filters.cost !== 'all' ? 1 : 0);

  // Filter logic
  const filtered = useMemo(() => {
    let items = [...menuItems];

    // Category filter
    if (activeCategory !== 'all') {
      items = items.filter((i) => i.category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }

    // Veg-only
    if (filters.vegOnly) {
      items = items.filter((i) => i.veg);
    }

    // Rating filter
    if (filters.rating !== 'all') {
      const min = parseFloat(filters.rating);
      items = items.filter((i) => i.rating >= min);
    }

    // Cost filter
    if (filters.cost !== 'all') {
      switch (filters.cost) {
        case 'under500': items = items.filter((i) => i.price < 500); break;
        case '500-1000': items = items.filter((i) => i.price >= 500 && i.price <= 1000); break;
        case '1000-2000': items = items.filter((i) => i.price > 1000 && i.price <= 2000); break;
        case 'above2000': items = items.filter((i) => i.price > 2000); break;
      }
    }

    // Sort
    switch (filters.sort) {
      case 'rating': items.sort((a, b) => b.rating - a.rating); break;
      case 'cost-low': items.sort((a, b) => a.price - b.price); break;
      case 'cost-high': items.sort((a, b) => b.price - a.price); break;
      case 'time': items.sort((a, b) => a.prepTime - b.prepTime); break;
    }

    return items;
  }, [activeCategory, searchQuery, filters]);

  // Grouped sections (only when no search / single category)
  const grouped = activeCategory === 'all' && !searchQuery && activeCount === 0;
  const groupedItems = grouped
    ? categories.map((c) => ({ category: c.id, label: c.label, items: getItemsByCategory(c.id) })).filter((g) => g.items.length > 0)
    : [];

  return (
    <main className="min-h-screen bg-bg">
      <RestaurantHeader />

      {/* Sticky filter bar */}
      <div className="sticky top-14 z-30 border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Search + Filter button */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the menu..."
                className="w-full h-12 pl-11 pr-10 text-sm bg-bg border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-colors text-ink placeholder-muted"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors focus:outline-none" aria-label="Clear search">
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              onClick={openFilterSheet}
              className={`relative h-12 px-5 text-sm font-semibold flex items-center gap-2 transition-all rounded-xl border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeCount > 0 ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-gray-200 text-ink hover:bg-bg'
              }`}
            >
              Filters
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full text-[11px] font-bold text-white bg-primary">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* Category chips */}
          <CategoryChipRow active={activeCategory} onChange={setActiveCategory} />
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            {activeCategory === 'all' ? 'Full Menu' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h1>
          <p className="text-sm mt-1 text-muted">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            grouped ? (
              // Grouped sections
              <div className="space-y-10">
                {groupedItems.map(({ category, label, items }) => (
                  <section key={category}>
                    <h2 className="text-xl font-bold mb-4 text-ink">{label}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                      {items.map((item) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                          <MenuCard item={item} />
                        </motion.div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {filtered.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </motion.div>
            )
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 flex flex-col items-center">
              <Search size={48} className="text-muted mb-4 opacity-30" />
              <p className="text-lg font-bold text-ink">No results found</p>
              <p className="text-sm mt-1 text-muted">Try a different category or search term.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Sheet */}
      <FilterSheet filters={filters} onChange={setFilters} activeCount={activeCount} />
    </main>
  );
}
