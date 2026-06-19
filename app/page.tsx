'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';

import { cuisineTiles, featuredItems } from '@/lib/data/menu';

import MenuCard from '@/components/ui/MenuCard';

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="bg-bg min-h-screen pb-24">
      {/* ─── ZOMATO-STYLE HERO ─── */}
      <section ref={heroRef} className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src="/images/hero_burger_cinematic.png" 
            alt="Delicious food" 
            fill 
            priority 
            sizes="100vw" 
            className="object-cover object-center" 
          />
          {/* Lighter gradient for cleaner look */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center mt-12 md:mt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-white text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg"
          >
            D2P Foods
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-white/90 text-2xl md:text-4xl font-medium mb-10 drop-shadow-md"
          >
            Discover the best food & drinks in town
          </motion.p>

          {/* Search Bar Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center bg-white rounded-xl md:rounded-full p-2 md:p-3 shadow-2xl max-w-3xl mx-auto gap-2"
          >
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="text-ember mr-2" size={24} />
              <input 
                type="text" 
                placeholder="Lahore, Pakistan" 
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
            <div className="flex items-center flex-[2] w-full px-4 py-3 md:py-2">
              <Search className="text-gray-400 mr-2" size={24} />
              <input 
                type="text" 
                placeholder="Search for restaurant, cuisine or a dish" 
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT'S ON YOUR MIND? ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-bold text-ink mb-6">What&apos;s on your mind?</h2>
        <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {cuisineTiles.slice(0, 6).map((c) => (
            <Link key={c.id} href={`/menu`} className="min-w-[80px] md:min-w-[120px] flex flex-col items-center group cursor-pointer">
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-shadow mb-3 bg-white">
                <Image src={c.image} alt={c.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-sm md:text-base font-semibold text-ink/80 group-hover:text-ink">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── REORDER CAROUSEL ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl md:text-2xl font-bold text-ink mb-6">Reorder</h2>
        <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[featuredItems[0], featuredItems[2], featuredItems[3]].map((item) => (
            <div key={`reorder-${item.id}`} className="min-w-[280px] md:min-w-[320px]">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-bg shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <h3 className="font-bold text-ink text-sm line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-muted mb-2">Ordered 3 days ago</p>
                  <Link href={`/menu`} className="text-primary text-xs font-bold uppercase tracking-wider flex items-center hover:opacity-80">
                    Reorder <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COLLECTIONS ROW ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-char mb-2">Collections</h2>
            <p className="text-gray-600 text-sm md:text-base">Explore curated lists of top dishes, combos, and sides based on trends</p>
          </div>
          <Link href="/menu" className="text-ember text-sm md:text-base hidden sm:flex items-center hover:underline">
            All collections <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: "Trending This Week", places: "12 Items", img: "/images/double_smash_moody.png" },
            { title: "Spicy & Hot", places: "8 Items", img: "/images/spicy_wings_large.png" },
            { title: "Wraps & More", places: "15 Items", img: "/images/chicken_wrap_moody.png" },
            { title: "Best Burgers", places: "10 Items", img: "/images/hero_burger_cinematic.png" }
          ].map((col, idx) => (
            <Link key={idx} href="/menu" className="relative h-64 md:h-80 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <Image src={col.img} alt={col.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 food-image" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg drop-shadow-md leading-tight mb-1">{col.title}</h3>
                <p className="text-sm text-white/90 flex items-center">{col.places} <ChevronRight size={14} className="ml-1" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── SHOWCASE FULL WIDTH ─── */}
      <section className="w-full py-8 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 font-display">Signature Series</h2>
          <p className="text-lg text-white/70">The items that made us famous. Uncompromising quality.</p>
        </div>
        
        <div className="w-full flex flex-col">
          {[
            { title: 'The Double Smash', subtitle: 'Two 100% beef patties, caramelized onions, melted cheddar.', image: '/images/double_smash_moody.png', price: 'Rs. 1150', id: 'double-smash' },
            { title: 'Inferno Wings', subtitle: 'Ghost-pepper glazed, flame-finished perfection.', image: '/images/spicy_wings_large.png', price: 'Rs. 1450', id: 'spicy-wings-12' },
            { title: 'Family Feast Box', subtitle: 'Because sharing is caring (sometimes).', image: '/images/family_feast.png', price: 'Rs. 3200', id: 'family-feast' }
          ].map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden group cursor-pointer"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out food-image" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-3">Signature</span>
                  <h3 className="text-4xl md:text-7xl font-bold text-white mb-2 leading-none drop-shadow-md font-display">{item.title}</h3>
                  <p className="text-white/90 text-xl md:text-3xl drop-shadow-sm font-medium">{item.subtitle}</p>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <span className="text-white font-bold text-3xl md:text-4xl">{item.price}</span>
                  <Link href={`/menu`} className="px-8 py-4 bg-white text-ink font-bold rounded-full hover:bg-primary hover:text-white transition-colors duration-300 text-lg md:text-xl text-center w-full md:w-auto">
                    Order Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TOP RESTAURANTS / ITEMS GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <h2 className="text-xl md:text-2xl font-bold text-ink mb-6">Top Picks for You</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredItems.map((item, i) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group flex flex-col"
            >
              <MenuCard item={item} />
              {item.popular && (
                <div className="mt-2 text-xs text-muted flex items-center px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5" />
                  120+ ordered recently
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
