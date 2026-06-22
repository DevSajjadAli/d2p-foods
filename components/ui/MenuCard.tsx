'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Clock } from 'lucide-react';
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
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link
          href={`/menu/${item.id}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${item.name}, Rs. ${item.price}`}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg">
            <Image
              src={item.image}
              alt={`${item.name} — ${item.description}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover food-image transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 opacity-80" />

            <div className="absolute top-2 left-2">
              <RatingBadge rating={item.rating} ratingCount={item.ratingCount} size="sm" variant="solid" />
            </div>

            {item.popular && (
              <span className="absolute top-2 right-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary shadow-sm">
                Bestseller
              </span>
            )}

            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-ink shadow-sm">
              <Clock size={11} aria-hidden="true" /> {item.prepTime + 15} min
            </span>
          </div>

          <div className="p-3.5 pb-0 md:p-4 md:pb-0">
            <div className="flex items-start gap-2">
              <VegMarker veg={item.veg} size={14} />
              <h3 className="line-clamp-2 flex-1 text-sm font-bold leading-snug text-ink md:text-base">
                {item.name}
              </h3>
            </div>

            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted md:text-sm">
              {item.description}
            </p>
          </div>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 p-3.5 pt-4 md:p-4 md:pt-4">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">From</span>
            <span className="text-base font-extrabold tabular-nums text-ink md:text-lg" aria-label={`Price: Rs. ${item.price}`}>
              Rs. {item.price.toLocaleString()}
            </span>
          </div>

          <AddButton quantity={quantity} onAdd={handleAdd} onDecrement={handleDecrement} buttonRef={buttonRef} />
        </div>
      </article>
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
    <div className="relative h-10 w-[92px]">
      <AnimatePresence initial={false} mode="wait">
        {quantity === 0 ? (
          <motion.button
            key="add-btn"
            ref={buttonRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            whileTap={{ scale: 0.96 }}
            onClick={onAdd}
            className="absolute inset-0 flex h-full w-full items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-sm font-extrabold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Add to cart"
          >
            Add
          </motion.button>
        ) : (
          <motion.div
            key="stepper"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            className="absolute inset-0 flex h-full w-full items-center justify-between overflow-hidden rounded-xl border border-primary bg-white shadow-sm"
            role="group"
            aria-label="Cart quantity controls"
          >
            <button
              onClick={onDecrement}
              className="flex h-full w-9 items-center justify-center text-primary transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Remove one"
            >
              <Minus size={14} aria-hidden="true" />
            </button>
            <span className="flex-1 bg-white text-center text-sm font-extrabold tabular-nums text-primary" aria-live="polite">
              {quantity}
            </span>
            <button
              ref={buttonRef}
              onClick={onAdd}
              className="flex h-full w-9 items-center justify-center text-primary transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
