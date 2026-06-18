'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart';
import { setCartIconRef } from '@/components/animations/EmberTrail';

export default function Header() {
  const cartRef = useRef<HTMLAnchorElement>(null);
  const itemCount = useCartStore((s) => s.getItemCount());
  const [prevCount, setPrevCount] = useState(0);
  const [bump, setBump] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCartIconRef(cartRef as React.RefObject<HTMLElement>);
  }, []);

  useEffect(() => {
    if (itemCount > prevCount) {
      setBump(true);
      setTimeout(() => setBump(false), 400);
    }
    setPrevCount(itemCount);
  }, [itemCount, prevCount]);

  const navLinks = [
    { href: '/menu', label: 'Menu' },
    { href: '/deals', label: 'Deals' },
    { href: '/locations', label: 'Locations' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-ash border-b-2 border-ember"
        style={{ backgroundColor: '#E7E1D3', borderBottomColor: '#D62828' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="D2P Foods Home"
            >
              <div
                className="w-9 h-9 flex items-center justify-center font-display text-bone text-xs font-black"
                style={{
                  background: '#1B1714',
                  clipPath:
                    'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                }}
              >
                🔥
              </div>
              <span
                className="font-display text-xl tracking-tight"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: '#1B1714',
                  letterSpacing: '-0.02em',
                }}
              >
                D2P FOODS
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-sm"
                  style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Cart Icon */}
              <Link
                ref={cartRef}
                href="/cart"
                id="cart-icon"
                className="relative flex items-center justify-center w-11 h-11 rounded-md transition-colors hover:bg-bone/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                aria-label={mounted ? `Cart, ${itemCount} items` : 'Shopping cart'}
              >
                <ShoppingCart
                  size={22}
                  style={{ color: '#1B1714' }}
                  aria-hidden="true"
                />
                <AnimatePresence>
                  {mounted && itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: bump ? 1.3 : 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white rounded-full"
                      style={{
                        background: '#D62828',
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-md hover:bg-bone/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X size={22} style={{ color: '#1B1714' }} />
                ) : (
                  <Menu size={22} style={{ color: '#1B1714' }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b-2 border-ember shadow-lg"
            style={{ background: '#E7E1D3', borderBottomColor: '#D62828' }}
          >
            <nav className="flex flex-col py-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-4 text-base font-medium border-b last:border-b-0 hover:bg-bone/40 transition-colors focus:outline-none focus-visible:bg-bone/40"
                  style={{
                    color: '#1B1714',
                    fontFamily: "'Work Sans', sans-serif",
                    borderColor: '#E7E1D3',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-base font-medium hover:bg-bone/40 transition-colors"
                style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
              >
                My Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
