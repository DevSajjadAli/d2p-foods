'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '@/components/ui/MenuCard';
import CategoryChipRow from '@/components/ui/CategoryChipRow';
import { menuItems, Category } from '@/lib/data/menu';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main
      className="min-h-screen"
      style={{ background: '#F7F3EA' }}
    >
      {/* Sticky filter bar */}
      <div
        className="sticky top-16 z-30 border-b-2 px-4 sm:px-6 lg:px-8 py-3"
        style={{ background: '#F7F3EA', borderColor: '#E7E1D3' }}
      >
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: '#6E6557' }}
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the menu..."
              className="w-full h-11 pl-9 pr-10 text-sm border-2 focus:outline-none focus:border-ember transition-colors"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                borderColor: '#E7E1D3',
                background: '#fff',
                color: '#1B1714',
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
              }}
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-char transition-colors focus:outline-none"
                aria-label="Clear search"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category chips */}
          <CategoryChipRow active={activeCategory} onChange={setActiveCategory} />
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Heading */}
        <div className="mb-6">
          <h1
            className="text-3xl sm:text-4xl"
            style={{
              fontFamily: "'Anton', sans-serif",
              color: '#1B1714',
              letterSpacing: '-0.02em',
            }}
          >
            {activeCategory === 'all'
              ? 'FULL MENU'
              : activeCategory.toUpperCase()}
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
          >
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            {searchQuery ? ` for "${searchQuery}"` : ''}
          </p>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p
                className="text-5xl mb-3"
                aria-hidden="true"
              >
                🔍
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
              >
                No results found
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
              >
                Try a different category or search term.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
