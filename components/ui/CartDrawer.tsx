'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import PromoCodeInput from './PromoCodeInput';

export default function CartDrawer() {
  const open = useUIStore((s) => s.cartDrawerOpen);
  const close = useUIStore((s) => s.closeCartDrawer);
  const drawerRef = useRef<HTMLDivElement>(null);

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const total = useCartStore((s) => s.getTotal());
  const discount = useCartStore((s) => s.discount);

  const deliveryFee = items.length > 0 ? 100 : 0;
  const finalTotal = total + deliveryFee;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (open) {
      window.addEventListener('keydown', handleKey);
      // prevent scrolling
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/40"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] flex flex-col"
            style={{ background: '#F7F3EA' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b-2 flex-shrink-0"
              style={{ borderColor: '#E7E1D3', background: '#F7F3EA' }}
            >
              <div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
                >
                  Your Cart
                </h2>
                <p
                  className="text-xs"
                  style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
                >
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={close}
                className="w-10 h-10 flex items-center justify-center rounded-md transition-colors hover:bg-ash focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                aria-label="Close cart"
              >
                <X size={20} style={{ color: '#1B1714' }} aria-hidden="true" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-sm mb-2" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                    Your cart is empty
                  </p>
                  <p className="text-xs mb-6" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                    Add something delicious!
                  </p>
                  <button
                    onClick={close}
                    className="inline-flex items-center gap-2 h-10 px-6 text-white font-bold text-sm transition-all active:scale-95"
                    style={{
                      background: '#D62828',
                      fontFamily: "'Work Sans', sans-serif",
                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
                    }}
                  >
                    Browse Menu <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3"
                    style={{
                      background: '#E7E1D3',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                        style={{
                          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-xs font-bold"
                        style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center" role="group" aria-label={`Quantity for ${item.name}`}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-bone/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                        style={{ color: '#D62828' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} aria-hidden="true" />
                      </button>
                      <span
                        className="w-6 text-center text-sm font-bold"
                        style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-bone/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                        style={{ color: '#D62828' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-bone/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                      style={{ color: '#6E6557' }}
                      aria-label="Remove from cart"
                    >
                      <Trash2 size={12} aria-hidden="true" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer with totals + checkout */}
            {items.length > 0 && (
              <div
                className="flex-shrink-0 p-5 border-t-2 space-y-3"
                style={{ background: '#F7F3EA', borderColor: '#E7E1D3' }}
              >
                {/* Promo code */}
                <PromoCodeInput />

                {/* Summary */}
                <div className="space-y-1.5 text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <div className="flex justify-between" style={{ color: '#6E6557' }}>
                    <span>Subtotal</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between" style={{ color: '#16a34a' }}>
                      <span>Promo ({discount}% off)</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        − Rs. {(subtotal - total).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between" style={{ color: '#6E6557' }}>
                    <span>Delivery</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Rs. {deliveryFee}</span>
                  </div>
                  <div
                    className="flex justify-between font-bold text-base pt-2 border-t-2"
                    style={{ borderColor: '#D5CEBC', color: '#1B1714' }}
                  >
                    <span>Total</span>
                    <span style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}>
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={close}
                  className="block w-full h-12 text-center leading-[48px] text-white font-bold text-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  style={{
                    background: '#D62828',
                    fontFamily: "'Work Sans', sans-serif",
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                  }}
                >
                  PROCEED TO CHECKOUT →
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
