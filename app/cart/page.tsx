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
    <main className="min-h-screen pb-32 bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          /* Empty cart */
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <ShoppingBag
              size={64}
              className="mx-auto mb-4 text-muted opacity-50"
              aria-hidden="true"
            />
            <p className="text-xl font-bold text-ink mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-muted mb-8">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 h-12 px-8 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Browse Menu <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start sm:items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-xl bg-bg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 80px, 96px"
                        className="object-cover"
                      />
                    </div>

                    {/* Name + Customizations + Price */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                      <p className="font-bold text-base text-ink mb-1 line-clamp-2">
                        {item.name}
                      </p>
                      {item.customizations && (
                        <p className="text-xs text-muted mb-2 line-clamp-2">
                          {Object.values(item.customizations).join(', ')}
                        </p>
                      )}
                      <p className="text-base font-bold text-ink mt-auto">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity controls & Remove */}
                    <div className="flex flex-col items-end gap-3 h-full justify-between">
                      <div className="flex items-center bg-white border border-primary rounded-md overflow-hidden" role="group">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 text-primary transition-colors focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 text-primary transition-colors focus:outline-none"
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
                        <Trash2 size={14} aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              {/* Promo */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                <PromoCodeInput />
              </div>

              {/* Summary */}
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h2 className="font-bold text-lg text-ink">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm text-muted">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="text-ink font-medium">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Promo ({discount}% off)</span>
                      <span>
                        − Rs. {(subtotal - total).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span className="text-ink font-medium">
                      Rs. {deliveryFee}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-100 text-ink">
                    <span>Grand Total</span>
                    <span>
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full h-12 items-center justify-center bg-primary text-white font-bold rounded-xl transition-colors hover:bg-primary/90"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
