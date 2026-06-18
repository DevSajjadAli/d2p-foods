'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function UpdateToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setShow(true);
      });

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                setShow(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-24 left-0 right-0 z-50 flex justify-center px-4"
          role="alert"
          aria-live="polite"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 shadow-xl"
            style={{
              background: '#2A2521',
              clipPath:
                'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
            }}
          >
            <RefreshCw size={16} style={{ color: '#D62828', flexShrink: 0 }} aria-hidden="true" />
            <p
              className="text-white text-xs"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Update available!
            </p>
            <button
              onClick={handleRefresh}
              className="h-7 px-3 text-xs font-bold text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              style={{
                background: '#D62828',
                fontFamily: "'Work Sans', sans-serif",
                clipPath:
                  'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
              }}
            >
              Refresh
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
