'use client';


import Image from 'next/image';
import { Plus, Minus, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '@/lib/data/menu';
import { useCartStore } from '@/lib/store/cart';
import { useEmberTrail, EmberTrailCanvas } from '@/components/animations/EmberTrail';

type MenuCardProps = {
  item: MenuItem;
};

export default function MenuCard({ item }: MenuCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const { buttonRef, embers, triggerEmber } = useEmberTrail();

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    triggerEmber();
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
    <>
      <EmberTrailCanvas embers={embers} />
      <article
        className="group relative flex flex-col bg-ash overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          backgroundColor: '#E7E1D3',
          clipPath:
            'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
        }}
        aria-label={item.name}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-bone">
          <Image
            src={item.image}
            alt={`${item.name} — ${item.description}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {item.popular && (
              <span
                className="text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide"
                style={{
                  background: '#D62828',
                  fontFamily: "'Work Sans', sans-serif",
                  clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
                }}
              >
                Popular
              </span>
            )}
            {item.spicy && (
              <span
                className="text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide flex items-center gap-0.5"
                style={{
                  background: '#1B1714',
                  fontFamily: "'Work Sans', sans-serif",
                  clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
                }}
              >
                <Flame size={8} aria-hidden="true" /> Spicy
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <h3
            className="font-bold text-base leading-tight"
            style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
          >
            {item.name}
          </h3>
          <p
            className="text-xs leading-relaxed flex-1"
            style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
          >
            {item.description}
          </p>

          {/* Price + Add */}
          <div className="flex items-center justify-between mt-2">
            <span
              className="text-base font-bold"
              style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}
              aria-label={`Price: Rs. ${item.price}`}
            >
              Rs. {item.price.toLocaleString()}
            </span>

            {/* Add / Stepper */}
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add"
                  ref={buttonRef}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleAdd}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white font-bold text-lg transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  style={{
                    background: '#D62828',
                    clipPath:
                      'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                    fontFamily: "'Work Sans', sans-serif",
                  }}
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus size={18} aria-hidden="true" />
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center"
                  role="group"
                  aria-label={`Quantity for ${item.name}`}
                >
                  <button
                    onClick={handleDecrement}
                    className="min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors hover:bg-bone/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                    style={{ color: '#D62828' }}
                    aria-label={`Remove one ${item.name}`}
                  >
                    <Minus size={14} aria-hidden="true" />
                  </button>
                  <span
                    className="w-8 text-center font-bold text-sm"
                    style={{
                      color: '#1B1714',
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors hover:bg-bone/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                    style={{ color: '#D62828' }}
                    aria-label={`Add one more ${item.name}`}
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </article>
    </>
  );
}
