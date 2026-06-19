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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto md:left-auto md:h-full md:w-[400px] flex flex-col bg-surface rounded-t-3xl md:rounded-none shadow-2xl max-h-[90vh] md:max-h-none overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0 bg-white">
              <div>
                <h2 className="text-lg font-bold text-ink">
                  Your Cart
                </h2>
                <p className="text-xs text-muted">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={close}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-bg focus:outline-none"
                aria-label="Close cart"
              >
                <X size={20} className="text-ink" aria-hidden="true" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-bg">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-sm mb-2 text-muted">
                    Your cart is empty
                  </p>
                  <p className="text-xs mb-6 text-muted">
                    Add something delicious!
                  </p>
                  <button
                    onClick={close}
                    className="inline-flex items-center gap-2 h-12 px-6 bg-primary text-white font-bold text-sm rounded-xl transition-all hover:bg-primary/90 active:scale-95"
                  >
                    Browse Menu <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink line-clamp-2">
                        {item.name}
                      </p>
                      {item.customizations && (
                        <p className="text-[10px] text-muted mb-1 line-clamp-1">
                          {Object.values(item.customizations).join(', ')}
                        </p>
                      )}
                      <p className="text-sm font-bold text-ink">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center bg-white border border-primary rounded-md overflow-hidden" role="group">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-primary/10 text-primary transition-colors focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-primary/10 text-primary transition-colors focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1"
                        aria-label="Remove from cart"
                      >
                        <Trash2 size={12} aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with totals + checkout */}
            {items.length > 0 && (
              <div className="flex-shrink-0 p-5 border-t border-gray-100 bg-white space-y-4">
                {/* Promo code */}
                <PromoCodeInput />

                {/* Summary */}
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="text-ink font-medium">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Promo ({discount}% off)</span>
                      <span>− Rs. {(subtotal - total).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-ink font-medium">Rs. {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100 text-ink">
                    <span>Grand Total</span>
                    <span>Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={close}
                  className="block w-full h-12 text-center leading-[48px] bg-primary text-white font-bold rounded-xl transition-all hover:bg-primary/90 active:scale-95"
                >
                  Proceed to Pay — Rs. {finalTotal.toLocaleString()}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
