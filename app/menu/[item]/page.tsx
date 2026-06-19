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
  const { buttonRef, embers, triggerEmber } = useEmberTrail();
  const quantity = 0;

  const handleAdd = () => {
    if (buttonRef.current) {
      triggerEmber();
    }
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
  };

  const related = menuItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen" style={{ background: '#F7F3EA' }}>
      <EmberTrailCanvas embers={embers} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:underline focus:outline-none focus-visible:underline"
          
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to Menu
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full aspect-square overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-3 left-3">
              <RatingBadge rating={item.rating} ratingCount={item.ratingCount} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <VegMarker veg={item.veg} size={16} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                
              >
                {item.category}
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl leading-tight mb-3"
              style={{
                
                color: '#1B1714',
                letterSpacing: '-0.02em' }}
            >
              {item.name.toUpperCase()}
            </h1>
            <p
              className="text-base leading-relaxed flex-1 mb-4"
              
            >
              {item.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <MetaTag label={`⏱ ${item.prepTime + 15} min`} />
              <MetaTag label="🍽 1 serving" />
              {item.spicy && <MetaTag label="🔥 Spicy" accent />}
            </div>
            <div
              className="text-4xl font-bold mb-6"
              
              aria-label={`Price: Rs. ${item.price}`}
            >
              Rs. {item.price.toLocaleString()}
            </div>
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
                    className="w-11 h-11 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    className="w-10 text-center font-bold"
                    
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="w-11 h-11 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    
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
                  
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}
                aria-label="Add to cart"
              >
                ADD TO CART →
              </button>
            </div>
            <p
              className="text-xs mt-6"
              
            >
              🌿 100% Halal certified. All prices include applicable taxes.
            </p>
          </motion.div>
        </div>
        {related.length > 0 && (
          <div className="mt-12">
            <h2
              className="text-xl font-bold mb-4"
              style={{
                
                color: '#1B1714',
                letterSpacing: '-0.01em' }}
            >
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rel) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/menu/${rel.id}`}
                    className="block overflow-hidden transition-all hover:shadow-md"
                    style={{
                      background: '#E7E1D3',
                      clipPath:
                        'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p
                        className="text-sm font-bold"
                        
                      >
                        {rel.name}
                      </p>
                      <p
                        className="text-sm font-bold"
                        
                      >
                        Rs. {rel.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function MetaTag({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span
      className="text-xs font-medium px-2 py-0.5"
      style={{
        background: accent ? '#D6282830' : '#E7E1D3',
        color: '#1B1714',
        
        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)' }}
    >
      {label}
    </span>
  );
}
