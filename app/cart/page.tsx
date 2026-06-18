'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart';
import PromoCodeInput from '@/components/ui/PromoCodeInput';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const total = useCartStore((s) => s.getTotal());
  const discount = useCartStore((s) => s.discount);

  const deliveryFee = items.length > 0 ? 100 : 0;
  const finalTotal = total + deliveryFee;

  return (
    <main className="min-h-screen pb-32" style={{ background: '#F7F3EA' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-4xl sm:text-5xl mb-8"
          style={{
            fontFamily: "'Anton', sans-serif",
            color: '#1B1714',
            letterSpacing: '-0.02em',
          }}
        >
          YOUR CART
        </h1>

        {items.length === 0 ? (
          /* Empty cart */
          <div className="text-center py-20">
            <ShoppingBag
              size={64}
              className="mx-auto mb-4"
              style={{ color: '#E7E1D3' }}
              aria-hidden="true"
            />
            <p
              className="text-xl font-bold mb-2"
              style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
            >
              Your cart is empty
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
            >
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 h-12 px-8 text-white font-bold text-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              style={{
                background: '#D62828',
                fontFamily: "'Work Sans', sans-serif",
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
              }}
            >
              Browse Menu <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-4"
                    style={{
                      background: '#E7E1D3',
                      clipPath:
                        'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        style={{
                          clipPath:
                            'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
                        }}
                      />
                    </div>

                    {/* Name + Stepper */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm mb-1 truncate"
                        style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-sm font-bold"
                        style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div
                      className="flex items-center"
                      role="group"
                      aria-label={`Quantity for ${item.name}`}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-bone/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                        style={{ color: '#D62828' }}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <span
                        className="w-8 text-center text-sm font-bold"
                        style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-bone/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                        style={{ color: '#D62828' }}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-bone/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                      style={{ color: '#6E6557' }}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              {/* Promo */}
              <div
                className="p-5"
                style={{
                  background: '#E7E1D3',
                  clipPath:
                    'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                <PromoCodeInput />
              </div>

              {/* Summary */}
              <div
                className="p-5 space-y-3"
                style={{
                  background: '#E7E1D3',
                  clipPath:
                    'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                <h2
                  className="font-bold text-base"
                  style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
                >
                  Order Summary
                </h2>

                <div
                  className="space-y-2 text-sm"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  <div className="flex justify-between" style={{ color: '#6E6557' }}>
                    <span>Subtotal</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between" style={{ color: '#22c55e' }}>
                      <span>Promo ({discount}% off)</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        − Rs. {(subtotal - total).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between" style={{ color: '#6E6557' }}>
                    <span>Delivery fee</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      Rs. {deliveryFee}
                    </span>
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
                  className="block w-full h-12 text-center leading-[48px] text-white font-bold text-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember mt-4"
                  style={{
                    background: '#D62828',
                    fontFamily: "'Work Sans', sans-serif",
                    clipPath:
                      'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                  }}
                >
                  PROCEED TO CHECKOUT →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
