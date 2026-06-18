'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MenuCard from '@/components/ui/MenuCard';
import CategoryChipRow from '@/components/ui/CategoryChipRow';
import { featuredItems, Category, menuItems } from '@/lib/data/menu';
import { useState } from 'react';

export default function HomePage() {
  const [activeChip, setActiveChip] = useState<Category | 'all'>('all');

  const displayItems = activeChip === 'all'
    ? featuredItems
    : menuItems.filter((item) => item.category === activeChip);

  return (
    <main style={{ background: '#F7F3EA' }}>
      {/* ───── HERO ───── */}
      <section
        className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: 'clamp(480px, 60vh, 700px)' }}
        aria-label="Hero banner"
      >
        {/* Background image */}
        <Image
          src="/images/hero_burger.png"
          alt="D2P Foods signature flame-grilled burger"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(27,23,20,0.95) 0%, rgba(27,23,20,0.5) 50%, rgba(27,23,20,0.15) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-ember text-xs sm:text-sm font-bold uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Work Sans', sans-serif", color: '#D62828' }}
            >
              🔥 Flame-Grilled. No Shortcuts.
            </p>
            <h1
              className="text-bone mb-4 leading-none"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                color: '#F7F3EA',
                letterSpacing: '-0.02em',
              }}
            >
              EAT LIKE YOU<br />MEAN IT.
            </h1>
            <p
              className="text-white/70 max-w-md mb-6"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              }}
            >
              Burgers, wings, and combos — all flame-grilled to order. Delivery &amp; pickup across Pakistan.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 h-14 px-8 text-white font-bold transition-all active:scale-95 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  background: '#D62828',
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                  clipPath:
                    'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                ORDER NOW <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 h-14 px-8 font-bold transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  color: '#F7F3EA',
                  border: '2px solid rgba(247,243,234,0.4)',
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                }}
              >
                View Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── CATEGORY CHIPS ───── */}
      <section
        className="border-b-2 px-4 sm:px-6 lg:px-8"
        style={{ borderColor: '#E7E1D3', background: '#F7F3EA' }}
        aria-label="Menu categories"
      >
        <div className="max-w-7xl mx-auto">
          <CategoryChipRow active={activeChip} onChange={setActiveChip} />
        </div>
      </section>

      {/* ───── FEATURED ITEMS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-end justify-between mb-6">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
              >
                {activeChip === 'all' ? 'Most Ordered' : 'Category'}
              </p>
              <h2
                className="text-3xl sm:text-4xl leading-none"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: '#1B1714',
                  letterSpacing: '-0.02em',
                }}
              >
                {activeChip === 'all' ? 'CROWD FAVOURITES' : activeChip.toUpperCase()}
              </h2>
            </div>
            <Link
              href="/menu"
              className="text-sm font-semibold hover:underline focus:outline-none focus-visible:underline hidden sm:block"
              style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 h-12 px-8 text-white font-bold text-sm transition-all active:scale-95"
              style={{
                background: '#D62828',
                fontFamily: "'Work Sans', sans-serif",
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
              }}
            >
              See Full Menu <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        {/* ───── BRAND STRIP ───── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { emoji: '🔥', title: 'FLAME-GRILLED', body: 'Every item cooked over real fire. No shortcuts, ever.' },
            { emoji: '⚡', title: '30-MIN DELIVERY', body: 'Fresh off the grill and at your door in under 30 minutes.' },
            { emoji: '🌿', title: '100% HALAL', body: 'Fully certified halal. Every ingredient, every time.' },
          ].map(({ emoji, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-5"
              style={{
                background: '#E7E1D3',
                clipPath:
                  'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
              }}
            >
              <span className="text-3xl" aria-hidden="true">{emoji}</span>
              <div>
                <p
                  className="font-bold text-sm mb-1"
                  style={{ fontFamily: "'Work Sans', sans-serif", color: '#1B1714' }}
                >
                  {title}
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: "'Work Sans', sans-serif", color: '#6E6557' }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
