'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export default function CartBar() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const total = useCartStore((s) => s.getTotal());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AnimatePresence>
      {mounted && itemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <div
            className="max-w-lg mx-auto rounded-none shadow-2xl"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
              background: '#1B1714',
            }}
          >
            <Link
              href="/cart"
              className="flex items-center justify-between px-5 py-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              aria-label={`View cart — ${itemCount} items, Rs. ${total.toLocaleString()}`}
            >
              {/* Left: bag + count */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-sm"
                  style={{ background: '#D62828' }}
                >
                  <ShoppingBag size={18} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <span
                    className="text-white/60 text-xs block"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                  <span
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Right: CTA */}
              <div
                className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all duration-200"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                View Cart
                <ArrowRight size={16} aria-hidden="true" />
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
