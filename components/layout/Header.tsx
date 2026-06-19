'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown, Search, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import { setCartIconRef } from '@/components/animations/EmberTrail';
import { locations } from '@/lib/data/locations';

export default function Header() {
  const cartRef = useRef<HTMLButtonElement>(null);
  const itemCount = useCartStore((s) => s.getItemCount());
  const [prevCount, setPrevCount] = useState(0);
  const [bump, setBump] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const openCartDrawer = useUIStore((s) => s.openCartDrawer);
  const setSelectedLocation = useUIStore((s) => s.setSelectedLocation);
  const selectedLocation = useUIStore((s) => s.selectedLocation);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setCartIconRef(cartRef as unknown as React.RefObject<HTMLElement>); }, []);
  useEffect(() => {
    if (itemCount > prevCount) { setBump(true); setTimeout(() => setBump(false), 400); }
    setPrevCount(itemCount);
  }, [itemCount, prevCount]);

  const navLinks = [
    { href: '/menu', label: 'Menu' },
    { href: '/deals', label: 'Deals' },
    { href: '/about', label: 'About' },
  ];

  const cities = Array.from(new Set(locations.map((l) => l.city)));

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface shadow-sm text-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="D2P Foods Home">
              <span className="text-2xl font-bold tracking-tight text-ink font-display italic">
                d2p
              </span>
            </Link>

            {/* Zomato-style Search & Location (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm items-center h-12 relative">
              {/* Location Selector */}
              <div className="relative border-r border-gray-200 h-full flex items-center px-4 w-56 shrink-0">
                <button
                  onClick={() => setLocOpen(o => !o)}
                  className="flex items-center gap-2 w-full text-sm font-medium focus:outline-none"
                  aria-expanded={locOpen}
                  aria-haspopup="listbox"
                >
                  <MapPin size={18} className="text-primary shrink-0" />
                  <span className="truncate flex-1 text-left">Deliver to {selectedLocation || 'Lahore'}</span>
                  <ChevronDown size={16} className={`text-muted transition-transform ${locOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {locOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-card border border-gray-100 py-2 z-50"
                    >
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => { setSelectedLocation(city); setLocOpen(false); }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-bg transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Bar */}
              <div className="flex-1 h-full flex items-center px-4">
                <Search size={18} className="text-muted mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search for dishes or categories..."
                  className="w-full h-full bg-transparent outline-none text-sm placeholder-muted"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-base font-medium text-muted hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Account Link - visible on desktop */}
              <Link href="/account" className="hidden md:block text-base font-medium text-muted hover:text-ink transition-colors">
                Account
              </Link>

              {/* Cart Button */}
              <button
                ref={cartRef}
                id="cart-icon"
                onClick={openCartDrawer}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-bg transition-colors focus:outline-none"
                aria-label={mounted ? `Cart, ${itemCount} items` : 'Shopping cart'}
              >
                <ShoppingCart size={22} className="text-ink" aria-hidden="true" />
                <AnimatePresence>
                  {mounted && itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: bump ? 1.3 : 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-primary rounded-full"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-bg focus:outline-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} className="text-ink" /> : <Menu size={22} className="text-ink" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-100 bg-surface overflow-hidden"
            >
              <nav className="flex flex-col py-2" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-6 py-4 text-base font-medium border-b border-gray-50 last:border-b-0 hover:bg-bg transition-colors">
                    {link.label}
                  </Link>
                ))}
                <Link href="/account" onClick={() => setMobileOpen(false)} className="px-6 py-4 text-base font-medium hover:bg-bg transition-colors">
                  Account
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
