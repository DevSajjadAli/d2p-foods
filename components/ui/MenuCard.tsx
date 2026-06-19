'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/lib/data/menu';
import { useCartStore } from '@/lib/store/cart';
import { useEmberTrail, EmberTrailCanvas } from '@/components/animations/EmberTrail';
import RatingBadge from './RatingBadge';
import VegMarker from './VegMarker';

type MenuCardProps = {
  item: MenuItem;
};

/**
 * Zomato-style food card: image-dominant, rating overlay, veg marker,
 * overlapping "Add" button with +/− stepper. Used on the home grid and menu grid.
 * Zomato conventions: large photo, green rating pill overlay, white "ADD" CTA with
 * a top-right clipped shadow. Popular items get a flame/bestseller overlay.
 */
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
      <Link
        href={`/menu/${item.id}`}
        className="group block relative bg-ash overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        style={{
          backgroundColor: '#E7E1D3',
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
        }}
        aria-label={item.name}
      >
        {/* Image — aspect 4:3, edge-to-edge at top */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-bone">
          <Image
            src={item.image}
            alt={`${item.name} — ${item.description}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating overlay — Zomato green pill (top-left) */}
          <div className="absolute top-2 left-2">
            <RatingBadge
              rating={item.rating}
              ratingCount={item.ratingCount}
              size="sm"
              variant="solid"
            />
          </div>

          {/* Bestseller / Popular badge */}
          {item.popular && (
            <span
              className="absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide"
              style={{
                background: '#D62828',
                fontFamily: "'Work Sans', sans-serif",
                clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
              }}
            >
              Bestseller
            </span>
          )}

          {/* Delivery time overlay */}
          <span
            className="absolute bottom-2 right-2 text-white text-[10px] font-bold px-2 py-0.5"
            style={{
              background: 'rgba(27,23,20,0.75)',
              fontFamily: "'Work Sans', sans-serif",
              backdropFilter: 'blur(4px)',
            }}
          >
            ⏱ {item.prepTime + 15} min
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col p-4 gap-1.5">
          {/* Title + VegMarker */}
          <div className="flex items-start gap-2">
            <VegMarker veg={item.veg} size={14} />
            <h3
              className="font-bold text-sm leading-tight flex-1"
              style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
            >
              {item.name}
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
          >
            {item.description}
          </p>

          {/* Price + Add/Stepper */}
          <div className="flex items-center justify-between mt-1.5">
            <span
              className="text-sm font-bold"
              style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}
              aria-label={`Price: Rs. ${item.price}`}
            >
              Rs. {item.price.toLocaleString()}
            </span>

            {/* Out-of-band: buttons must not navigate. Use div instead */}
            <div
              onClick={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
              }}
            >
              <AddButton
                quantity={quantity}
                onAdd={handleAdd}
                onDecrement={handleDecrement}
                buttonRef={buttonRef}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

/* ─── Sub-component: Add / Stepper button ─── */

function AddButton({
  quantity,
  onAdd,
  onDecrement,
  buttonRef,
}: {
  quantity: number;
  onAdd: () => void;
  onDecrement: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) {
  if (quantity === 0) {
    return (
      <motion.button
        ref={buttonRef}
        whileTap={{ scale: 0.95 }}
        onClick={onAdd}
        className="h-8 px-4 text-xs font-bold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember border-2"
        style={{
          borderColor: '#D62828',
          color: '#D62828',
          background: '#fff',
          fontFamily: "'Work Sans', sans-serif",
        }}
        aria-label="Add to cart"
      >
        ADD
      </motion.button>
    );
  }

  return (
    <motion.div
      key="stepper"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      className="flex items-center border-2 h-8"
      role="group"
      style={{ borderColor: '#D62828', background: '#fff' }}
    >
      <button
        onClick={onDecrement}
        className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-ash/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        style={{ color: '#D62828' }}
        aria-label="Remove one"
      >
        <Minus size={12} aria-hidden="true" />
      </button>
      <span
        className="w-6 text-center font-bold text-xs"
        style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        ref={buttonRef}
        onClick={onAdd}
        className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-ash/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        style={{ color: '#D62828' }}
        aria-label="Add one more"
      >
        <Plus size={12} aria-hidden="true" />
      </button>
    </motion.div>
  );
}
