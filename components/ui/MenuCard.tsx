'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '@/lib/data/menu';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import { useEmberTrail, EmberTrailCanvas } from '@/components/animations/EmberTrail';
import RatingBadge from './RatingBadge';
import VegMarker from './VegMarker';

type MenuCardProps = {
  item: MenuItem;
};

export default function MenuCard({ item }: MenuCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const openCustomizationModal = useUIStore((s) => s.openCustomizationModal);
  const { buttonRef, embers, triggerEmber } = useEmberTrail();

  const quantity = cartItems.filter((i) => (i.baseId || i.id) === item.id).reduce((sum, i) => sum + i.quantity, 0);

  const handleAdd = () => {
    if (item.customizable) {
      openCustomizationModal(item);
    } else {
      addItem({
        id: item.id,
        baseId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
      triggerEmber();
    }
  };

  const handleDecrement = () => {
    if (item.customizable) {
       const firstInstance = cartItems.find(i => (i.baseId || i.id) === item.id);
       if (firstInstance) {
          updateQuantity(firstInstance.id, firstInstance.quantity - 1);
       }
    } else {
      if (quantity > 0) {
        updateQuantity(item.id, quantity - 1);
      }
    }
  };

  return (
    <>
      <EmberTrailCanvas embers={embers} />
      <Link
        href={`/menu/${item.id}`}
        className="group block relative bg-surface rounded-card shadow-card overflow-hidden transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border border-gray-100"
        aria-label={item.name}
      >
        {/* Image — aspect 4:3, edge-to-edge at top */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-bg">
          <Image
            src={item.image}
            alt={`${item.name} — ${item.description}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating overlay */}
          <div className="absolute top-2 left-2">
            <RatingBadge
              rating={item.rating}
              ratingCount={item.ratingCount}
              size="sm"
              variant="solid"
            />
          </div>

          {/* Bestseller Badge */}
          {item.popular && (
            <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wide">
              Bestseller
            </span>
          )}

          {/* Delivery time overlay */}
          <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            ⏱ {item.prepTime + 15} min
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col p-4 gap-1.5">
          {/* Title + VegMarker */}
          <div className="flex items-start gap-2">
            <VegMarker veg={item.veg} size={14} />
            <h3 className="font-bold text-base leading-tight flex-1 text-ink">
              {item.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed line-clamp-2 text-muted">
            {item.description}
          </p>

          {/* Price + Add/Stepper */}
          <div className="flex items-center justify-between mt-2">
            <span
              className="text-base font-bold text-ink"
              aria-label={`Price: Rs. ${item.price}`}
            >
              Rs. {item.price.toLocaleString()}
            </span>

            {/* Out-of-band actions */}
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
  return (
    <div className="h-8 w-20 relative">
      <AnimatePresence initial={false} mode="wait">
        {quantity === 0 ? (
          <motion.button
            key="add-btn"
            ref={buttonRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="absolute inset-0 w-full h-full flex items-center justify-center text-sm font-bold uppercase tracking-wide text-primary bg-primary/10 border border-primary/20 rounded-md hover:bg-primary hover:text-white transition-colors focus:outline-none"
            aria-label="Add to cart"
          >
            ADD
          </motion.button>
        ) : (
          <motion.div
            key="stepper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 w-full h-full flex items-center justify-between border border-primary bg-white rounded-md overflow-hidden"
            role="group"
          >
            <button
              onClick={onDecrement}
              className="w-7 h-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors focus:outline-none"
              aria-label="Remove one"
            >
              <Minus size={14} aria-hidden="true" />
            </button>
            <span className="flex-1 text-center font-bold text-sm text-ink bg-white">
              {quantity}
            </span>
            <button
              ref={buttonRef}
              onClick={onAdd}
              className="w-7 h-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors focus:outline-none"
              aria-label="Add one more"
            >
              <Plus size={14} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
