'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart';
import { useEmberTrail, EmberTrailCanvas } from '@/components/animations/EmberTrail';
import { menuItems } from '@/lib/data/menu';

const deals = [
  {
    id: 'deal1',
    title: 'Lunchtime Special',
    subtitle: 'Mon–Fri, 12–3 PM',
    description: 'Any burger + regular fries + drink for just Rs. 999.',
    badge: '17% OFF',
    promo: 'EMBER10',
    image: '/images/combo_meal.png',
    color: '#D62828',
  },
  {
    id: 'deal2',
    title: 'Family Feast Friday',
    subtitle: 'Every Friday',
    description: 'Family Feast Box upgraded with extra wings. Feed the family for Rs. 2,999.',
    badge: 'FRIDAY ONLY',
    promo: 'FLAME20',
    image: '/images/family_combo.png',
    color: '#1B1714',
  },
  {
    id: 'deal3',
    title: 'First Order Deal',
    subtitle: 'New customers only',
    description: 'Get 15% off your first order. Use code D2PFIRST at checkout.',
    badge: '15% OFF',
    promo: 'D2PFIRST',
    image: '/images/double_smash.png',
    color: '#D62828',
  },
  {
    id: 'deal4',
    title: 'Wings Wednesday',
    subtitle: 'Every Wednesday',
    description: 'Order any wings and get a free dipping sauce and a regular drink.',
    badge: 'FREE DRINK',
    promo: 'EMBER10',
    image: '/images/spicy_wings_platter.png',
    color: '#1B1714',
  },
];

export default function DealsPage() {
  const addItem = useCartStore((s) => s.addItem);
  const { buttonRef, embers, triggerEmber } = useEmberTrail();

  return (
    <main className="min-h-screen pb-32" style={{ background: '#F7F3EA' }}>
      <EmberTrailCanvas embers={embers} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
          >
            Hot Promotions
          </p>
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}
          >
            TODAY'S DEALS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="relative overflow-hidden flex flex-col sm:flex-row"
              style={{
                background: '#E7E1D3',
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
              }}
            >
              {/* Image */}
              <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Badge */}
                  <span
                    className="inline-block text-white text-[11px] font-bold px-2 py-0.5 mb-2 uppercase tracking-wide"
                    style={{
                      background: deal.color,
                      fontFamily: "'Work Sans', sans-serif",
                      clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
                    }}
                  >
                    {deal.badge}
                  </span>
                  <h2
                    className="font-bold text-lg leading-tight mb-1"
                    style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {deal.title}
                  </h2>
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {deal.subtitle}
                  </p>
                  <p
                    className="text-sm mb-3"
                    style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {deal.description}
                  </p>
                </div>

                {/* Promo code */}
                <div className="flex items-center gap-2">
                  <code
                    className="text-xs font-bold px-2 py-1 border-2 border-dashed"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      borderColor: '#D62828',
                      color: '#D62828',
                    }}
                  >
                    {deal.promo}
                  </code>
                  <span
                    className="text-xs"
                    style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
                  >
                    Use at checkout
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/menu"
            className="inline-flex items-center gap-2 h-13 px-10 py-4 text-white font-bold transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            style={{
              background: '#D62828',
              fontFamily: "'Work Sans', sans-serif",
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
            }}
          >
            ORDER NOW & SAVE 🔥
          </a>
        </div>
      </div>
    </main>
  );
}
