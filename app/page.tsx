'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronRight, Star } from 'lucide-react';
import CuisineCircle from '@/components/ui/CuisineCircle';
import { cuisineTiles, featuredItems } from '@/lib/data/menu';

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ─── ZOMATO-STYLE HERO ─── */}
      <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/images/hero_burger.png" 
            alt="Delicious food" 
            fill 
            priority 
            sizes="100vw" 
            className="object-cover object-center" 
          />
          {/* Lighter gradient for cleaner look */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />
        </div>
        
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

      {/* ─── INSPIRATION CIRCLES ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-char mb-8">Inspiration for your first order</h2>
        <div className="flex overflow-x-auto no-scrollbar gap-6 pb-4">
          {cuisineTiles.map((c) => (
            <div key={c.id} className="min-w-[120px] md:min-w-[140px]">
              <CuisineCircle image={c.image} label={c.label} href={`/menu`} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── COLLECTIONS ROW ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-char mb-2">Collections</h2>
            <p className="text-gray-600 text-sm md:text-base">Explore curated lists of top dishes, cafes, pubs, and bars, based on trends</p>
          </div>
          <Link href="/menu" className="text-ember text-sm md:text-base hidden sm:flex items-center hover:underline">
            All collections in town <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: "Trending This Week", places: "12 Places", img: "/images/hero_burger.png" },
            { title: "Newly Opened", places: "8 Places", img: "/images/hero_burger.png" },
            { title: "Best Pizzas", places: "15 Places", img: "/images/hero_burger.png" },
            { title: "Best Burgers", places: "10 Places", img: "/images/hero_burger.png" }
          ].map((col, idx) => (
            <Link key={idx} href="/menu" className="relative h-64 md:h-80 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <Image src={col.img} alt={col.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg drop-shadow-md leading-tight mb-1">{col.title}</h3>
                <p className="text-sm text-white/90 flex items-center">{col.places} <ChevronRight size={14} className="ml-1" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── TOP RESTAURANTS / ITEMS GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
        <h2 className="text-2xl md:text-3xl font-semibold text-char mb-8">Delivery Restaurants in Lahore</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, i) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group"
            >
              <Link href={`/menu/${item.id}`} className="block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white p-3 cursor-pointer">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 flex items-center shadow-sm">
                    {item.rating} <Star size={12} className="ml-1 text-green-600 fill-green-600" />
                  </div>
                  {item.ratingCount > 100 && (
                     <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">
                       Promoted
                     </div>
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg text-char truncate pr-2">{item.name}</h3>
                  <div className="flex items-center justify-center bg-green-700 text-white rounded-md px-1.5 py-0.5 text-xs font-bold shrink-0">
                    4.2 <Star size={10} className="ml-0.5 fill-white" />
                  </div>
                </div>
                
                <div className="flex justify-between text-gray-500 text-sm mb-3">
                  <span className="truncate pr-2">{item.category} • Fast Food</span>
                  <span className="shrink-0">Rs {item.price} for one</span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center text-xs text-gray-500">
                  <div className="bg-blue-50 text-blue-600 font-medium px-2 py-1 rounded mr-2">
                    50% OFF
                  </div>
                  <span>Use WELCOME50</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
