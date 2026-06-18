'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { getItemById } from '@/lib/data/menu';
import { useCartStore } from '@/lib/store/cart';
import { useEmberTrail, EmberTrailCanvas } from '@/components/animations/EmberTrail';

export default function ItemPage({ params }: { params: { item: string } }) {
  const item = getItemById(params.item);
  if (!item) notFound();

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const { buttonRef, embers, triggerEmber } = useEmberTrail();

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    triggerEmber();
  };

  return (
    <main className="min-h-screen" style={{ background: '#F7F3EA' }}>
      <EmberTrailCanvas embers={embers} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm mb-6 hover:text-ember transition-colors focus:outline-none focus-visible:underline"
          style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full aspect-square overflow-hidden"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {item.popular && (
                <span
                  className="text-white text-xs font-bold px-3 py-1 uppercase tracking-wide"
                  style={{
                    background: '#D62828',
                    fontFamily: "'Work Sans', sans-serif",
                    clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%)',
                  }}
                >
                  Popular
                </span>
              )}
              {item.spicy && (
                <span
                  className="text-white text-xs font-bold px-3 py-1 uppercase tracking-wide flex items-center gap-1"
                  style={{
                    background: '#1B1714',
                    fontFamily: "'Work Sans', sans-serif",
                    clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%)',
                  }}
                >
                  <Flame size={10} aria-hidden="true" /> Spicy
                </span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
            >
              {item.category}
            </p>
            <h1
              className="text-3xl sm:text-4xl leading-tight mb-3"
              style={{
                fontFamily: "'Anton', sans-serif",
                color: '#1B1714',
                letterSpacing: '-0.02em',
              }}
            >
              {item.name.toUpperCase()}
            </h1>
            <p
              className="text-base leading-relaxed flex-1 mb-6"
              style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
            >
              {item.description}
            </p>

            {/* Price */}
            <div
              className="text-4xl font-bold mb-8"
              style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}
              aria-label={`Price: Rs. ${item.price}`}
            >
              Rs. {item.price.toLocaleString()}
            </div>

            {/* Quantity + Add */}
            <div className="flex items-center gap-4">
              {quantity > 0 && (
                <div
                  className="flex items-center border-2"
                  style={{ borderColor: '#E7E1D3' }}
                  role="group"
                  aria-label="Quantity"
                >
                  <button
                    onClick={() => updateQuantity(item.id, quantity - 1)}
                    className="w-11 h-11 flex items-center justify-center text-xl font-bold transition-colors hover:bg-ash focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    className="w-10 text-center font-bold"
                    style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="w-11 h-11 flex items-center justify-center text-xl font-bold transition-colors hover:bg-ash focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                ref={buttonRef}
                onClick={handleAdd}
                className="flex-1 h-14 text-white font-bold text-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                style={{
                  background: '#D62828',
                  fontFamily: "'Work Sans', sans-serif",
                  clipPath:
                    'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
                aria-label={quantity > 0 ? `Add another ${item.name}` : `Add ${item.name} to cart`}
              >
                {quantity > 0 ? 'ADD MORE' : 'ADD TO CART'} →
              </button>
            </div>

            {/* Nutrition notice */}
            <p
              className="text-xs mt-6"
              style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
            >
              🌿 100% Halal certified. All prices include applicable taxes.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
