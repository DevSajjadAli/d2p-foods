'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Flame, ShieldCheck, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { getItemById, menuItems } from '@/lib/data/menu';
import { useCartStore } from '@/lib/store/cart';
import { useEmberTrail, EmberTrailCanvas } from '@/components/animations/EmberTrail';
import RatingBadge from '@/components/ui/RatingBadge';
import VegMarker from '@/components/ui/VegMarker';

export default function ItemPage({ params }: { params: { item: string } }) {
  const item = getItemById(params.item);
  if (!item) notFound();

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const { buttonRef, embers, triggerEmber } = useEmberTrail();
  const quantity = cartItems
    .filter((cartItem) => (cartItem.baseId || cartItem.id) === item.id)
    .reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  const handleAdd = () => {
    if (buttonRef.current) {
      triggerEmber();
    }
    addItem({ id: item.id, baseId: item.id, name: item.name, price: item.price, image: item.image });
  };

  const handleDecrement = () => {
    const firstInstance = cartItems.find((cartItem) => (cartItem.baseId || cartItem.id) === item.id);
    if (firstInstance) {
      updateQuantity(firstInstance.id, firstInstance.quantity - 1);
    }
  };

  const related = menuItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-bg">
      <EmberTrailCanvas embers={embers} />
      <div className="mx-auto max-w-7xl px-4 py-6 pb-14 sm:px-6 lg:px-8">
        <Link
          href="/menu"
          className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-ink shadow-sm transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to Menu
        </Link>
        <div className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="relative min-h-[360px] overflow-hidden bg-bg md:min-h-[620px]"
          >
            <Image
              src={item.image}
              alt={`${item.name} — ${item.description}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover food-image"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            <div className="absolute left-4 top-4">
              <RatingBadge rating={item.rating} ratingCount={item.ratingCount} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="flex flex-col p-5 sm:p-8 lg:p-10"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <VegMarker veg={item.veg} size={16} />
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-primary">
                {item.category}
              </span>
              {item.popular && <span className="rounded-full bg-bg px-3 py-1 text-xs font-bold text-muted">Bestseller</span>}
            </div>
            <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {item.name}
            </h1>
            <p className="mb-6 text-base leading-relaxed text-muted sm:text-lg">
              {item.description}
            </p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <MetaTag icon={<Clock size={16} />} label={`${item.prepTime + 15} min`} />
              <MetaTag icon={<Utensils size={16} />} label="1 serving" />
              {item.spicy && <MetaTag icon={<Flame size={16} />} label="Spicy" accent />}
            </div>
            <div className="mb-8 rounded-3xl bg-bg p-5">
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted">Price</span>
              <div className="text-4xl font-extrabold tabular-nums text-ink" aria-label={`Price: Rs. ${item.price}`}>
                Rs. {item.price.toLocaleString()}
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
              {quantity > 0 && (
                <div className="flex h-14 items-center justify-between overflow-hidden rounded-2xl border border-primary bg-white sm:w-40" role="group" aria-label="Quantity">
                  <button
                    onClick={handleDecrement}
                    className="flex h-full w-14 items-center justify-center text-xl font-bold text-primary transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-lg font-extrabold tabular-nums text-primary" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="flex h-full w-14 items-center justify-center text-xl font-bold text-primary transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}
              <button
                ref={buttonRef}
                onClick={handleAdd}
                className="h-14 flex-1 rounded-2xl bg-primary px-6 text-base font-extrabold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Add to cart"
              >
                Add to cart
              </button>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-muted">
              <ShieldCheck size={16} className="text-success" aria-hidden="true" /> 100% Halal certified. All prices include applicable taxes.
            </p>
          </motion.div>
        </div>
        {related.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">More to love</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">You might also like</h2>
              </div>
              <Link href="/menu" className="hidden text-sm font-bold text-primary hover:underline sm:inline-flex">
                See all dishes
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {related.map((rel) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href={`/menu/${rel.id}`}
                    className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover food-image transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-1 text-sm font-extrabold text-ink">{rel.name}</p>
                      <p className="mt-1 text-sm font-bold tabular-nums text-primary">Rs. {rel.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function MetaTag({
  icon,
  label,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <span className={`inline-flex min-h-12 items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold ${accent ? 'bg-primary/10 text-primary' : 'bg-bg text-ink'}`}>
      <span className={accent ? 'text-primary' : 'text-muted'}>{icon}</span>
      {label}
    </span>
  );
}
