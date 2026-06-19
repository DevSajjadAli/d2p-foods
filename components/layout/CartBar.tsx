'use client';

import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';

export default function CartBar() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const total = useCartStore((s) => s.getTotal());
  const openCartDrawer = useUIStore((s) => s.openCartDrawer);
  const [mounted, setMounted] = useState(false);
  const amountToFreeDelivery = 2000 - total;
  const isFreeDelivery = total >= 2000;
  
  useEffect(() => setMounted(true), []);

  return (
    <AnimatePresence>
      {mounted && itemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe lg:hidden"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <div className="max-w-lg mx-auto bg-primary rounded-xl shadow-lg">
            <button
              onClick={openCartDrawer}
              className="w-full flex items-center justify-between px-5 py-3 focus:outline-none"
              aria-label={`View cart — ${itemCount} items, Rs. ${total.toLocaleString()}`}
            >
              {/* Left: bag + count */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-md">
                  <ShoppingBag size={18} className="text-white" aria-hidden="true" />
                </div>
                <div className="text-left flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-base leading-tight">
                      Rs. {total.toLocaleString()}
                    </span>
                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/20">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <span className="text-white/90 text-[10px] mt-0.5">
                    {isFreeDelivery ? '🎉 Free Delivery Unlocked' : `Add Rs. ${amountToFreeDelivery.toLocaleString()} for Free Delivery`}
                  </span>
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex items-center gap-1 text-sm font-bold text-white transition-all duration-200">
                View Cart
                <ArrowRight size={18} aria-hidden="true" />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
