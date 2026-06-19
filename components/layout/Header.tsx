'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
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
    { href: '/locations', label: 'Locations' },
    { href: '/about', label: 'About' },
  ];

  const cities = Array.from(new Set(locations.map((l) => l.city)));

  return (
    <>
      {/* Offer strip */}
      <div className="hidden sm:flex items-center justify-center h-7 text-[11px] font-semibold" style={{ background: '#D62828', color: '#fff', fontFamily: "'Work Sans', sans-serif" }}>
        Free delivery on your first order. Use code D2PFIRST
      </div>

      <header className="sticky top-0 z-50" style={{ background: '#E7E1D3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="D2P Foods Home">
              <div className="w-9 h-9 flex items-center justify-center font-display text-xs font-black" style={{ background: '#1B1714', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
                🔥
              </div>
              <span className="text-xl font-display tracking-tight" style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}>
                D2P FOODS
              </span>
            </Link>

            {/* Location picker - Zomato style */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLocOpen(o => !o)}
                className="flex items-center gap-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm px-2 py-1"
                style={{ fontFamily: "'Work Sans', sans-serif", color: '#1B1714' }}
                aria-expanded={locOpen}
                aria-haspopup="listbox"
              >
                <span className="font-bold">{selectedLocation || 'Lahore'}</span>
                <span className="text-sm" style={{ color: '#6E6557' }}>— choose city</span>
                <ChevronDown size={14} className={`transition-transform ${locOpen ? 'rotate-180' : ''}`} style={{ color: '#D62828' }} />
              </button>
              <AnimatePresence>
                {locOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 mt-1 w-48 py-1 z-50 shadow-xl"
                    style={{ background: '#F7F3EA', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                  >
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => { setSelectedLocation(city); setLocOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-ash focus:outline-none focus-visible:bg-ash"
                        style={{ fontFamily: "'Work Sans', sans-serif", color: '#1B1714' }}
                      >
                        {city}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart + Mobile Menu */}
            <div className="flex items-center gap-3">
              <button
                ref={cartRef}
                id="cart-icon"
                onClick={openCartDrawer}
                className="relative flex items-center justify-center w-11 h-11 rounded-md transition-colors hover:bg-bone/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                aria-label={mounted ? `Cart, ${itemCount} items` : 'Shopping cart'}
              >
                <ShoppingCart size={22} style={{ color: '#1B1714' }} aria-hidden="true" />
                <AnimatePresence>
                  {mounted && itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: bump ? 1.3 : 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white rounded-full"
                      style={{ background: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-md hover:bg-bone/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} style={{ color: '#1B1714' }} /> : <Menu size={22} style={{ color: '#1B1714' }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-14 left-0 right-0 z-40 md:hidden border-b-2 shadow-lg"
              style={{ background: '#E7E1D3', borderBottomColor: '#D62828' }}
            >
              <nav className="flex flex-col py-2" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-6 py-4 text-base font-medium border-b last:border-b-0 hover:bg-bone/40 transition-colors" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif", borderColor: '#E7E1D3' }}>
                    {link.label}
                  </Link>
                ))}
                <Link href="/account" onClick={() => setMobileOpen(false)} className="px-6 py-4 text-base font-medium hover:bg-bone/40" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                  My Account
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
