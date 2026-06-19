'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity steep > 0 ? cartItem.quantity : 0;

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    triggerEmber();
  };

  const handleDecrement = () => {
    if (quantity > 0) updateQuantity(item.id, quantity - 1);
  };

  // Related: same category, excluding current
  const related = menuItems.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 4);

  return (
    <main className="min-h-screen" style={{ background: '#F7F3EA' }}>
      <EmberTrailCanvas embers={embers} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10">
        <Link href="/menu" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:underline" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
          <ArrowLeft size={14} aria-hidden="true" /> Back to Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="relative w-full aspect-square overflow-hidden" style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
            <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
            <div className="absolute top-3 left-3">
              <RatingBadge rating={item.rating} ratingCount={item.ratingCount} />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <VegMarker veg={item.veg} size={16} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>{item.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl leading-tight mb-3" style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}>{item.name.toUpperCase()}</h1>
            <p className="text-base leading-relaxed flex-1 mb-4" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>{item.description}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs font-medium px-2 py-0.5" style={{ background: '#E7E1D3', color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>{item.prepTime + 15} min</span>
              <span className="text-xs font-medium px-2 py-0.5" style={{ background: '#E7E1D3', color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>{item.ratingCount} ratings</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold mb-6" style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }} aria-label={`Price: Rs. ${item.price}`}>Rs. {item.price.toLocaleString()}</div>

            {/* Add / Stepper */}
            <div className="flex items-center gap-4">
              {quantity > 0 && (
                <div className="flex items-center border-2" style={{ borderColor: '#E7E1D3' }} role="group" aria-label="Quantity">
                  <button onClick={handleDecrement} className="w-11 h-11 flex items-center justify-center text-xl" style={{ color: '#D62828' }} aria-label="Decrease">−</button>
                  <span className="w-10 text-center font-bold" style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }} aria-live="polite">{quantity}</span>
                  <button onClick={handleAdd} ref={buttonRef} className="w-11 h-11 flex items-center justify-center text-xl" style={{ color: '#D62828' }} aria-label="Increase">+</button>
                </div>
              )}
              <button onClick={handleAdd} className="flex-1 h-14 text-white font-bold text-lg" style={{ background: '#D62828', fontFamily: "'Work Sans', sans-serif", clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>ADD TO CART →</button>
            </div>
            <p className="text-xs mt-6" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>🌿 100% Halal certified.</p>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714' }}>YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rel) => (
                <Link key={rel.id} href={`/menu/${rel.id}`} className="block overflow-hidden hover:shadow-md transition-all" style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)', background: '#E7E1D3' }}>
                  <div className="relative w-full aspect-[4/3] overflow-hidden"><Image src={rel.image} alt={rel.name} fill sizes="25vw" className="object-cover" /></div>
                  <div className="p-3">
                    <p className="text-sm font-bold" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>{rel.name}</p>
                    <p className="text-sm font-bold" style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}>Rs. {rel.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
