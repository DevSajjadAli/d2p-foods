'use client';

import { useEffect, useState } from 'react';
import { X, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> } | null>(null);

  useEffect(() => {
    // Track visits
    const visits = parseInt(localStorage.getItem('d2p-visits') ?? '0', 10);
    localStorage.setItem('d2p-visits', String(visits + 1));

    const checkShouldShow = () => {
      const dismissedAt = localStorage.getItem('d2p-install-dismissed');
      if (dismissedAt) {
        const timePassed = Date.now() - parseInt(dismissedAt, 10);
        // 24 hours in milliseconds
        if (timePassed < 24 * 60 * 60 * 1000) {
          return false;
        }
      }
      return true;
    };

    // Listen for browser install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (visits >= 1 && checkShouldShow()) {
        setShow(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Also expose trigger for first add-to-cart
  useEffect(() => {
    const triggerOnCart = () => {
      const dismissedAt = localStorage.getItem('d2p-install-dismissed');
      let shouldShow = true;
      if (dismissedAt) {
        const timePassed = Date.now() - parseInt(dismissedAt, 10);
        if (timePassed < 24 * 60 * 60 * 1000) {
          shouldShow = false;
        }
      }
      if (shouldShow && deferredPrompt) setShow(true);
    };
    window.addEventListener('d2p:first-cart-add', triggerOnCart);
    return () => window.removeEventListener('d2p:first-cart-add', triggerOnCart);
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShow(false);
        setDeferredPrompt(null);
      }
    }
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('d2p-install-dismissed', Date.now().toString());
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed top-[68px] left-0 right-0 z-50 flex justify-center px-4"
          role="banner"
          aria-label="Install D2P Foods app"
        >
          <div
            className="w-full max-w-md flex items-center gap-3 px-4 py-3 shadow-xl"
            style={{
              background: '#1B1714',
              clipPath:
                'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
            }}
          >
            <div
              className="w-9 h-9 flex items-center justify-center flex-shrink-0"
              style={{ background: '#D62828', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
            >
              <Smartphone size={16} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-white text-xs font-bold"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Add D2P Foods to your home screen
              </p>
              <p
                className="text-white/60 text-[11px]"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Faster ordering, offline menu, order tracking.
              </p>
            </div>
            <button
              onClick={handleInstall}
              className="flex-shrink-0 h-8 px-3 text-xs font-bold text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              style={{
                background: '#D62828',
                fontFamily: "'Work Sans', sans-serif",
                clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
              }}
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              aria-label="Dismiss install prompt"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
