'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      // Check if they've seen it this session to not annoy them on every page load
      const hasSeen = sessionStorage.getItem('hasSeenOffer');
      if (!hasSeen) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenOffer', 'true');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-white rounded-full transition-colors"
            >
              <X size={18} className="text-gray-800" />
            </button>
            <div className="relative w-full h-48 bg-ember">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                <span className="text-5xl font-bold mb-2">50% OFF</span>
                <span className="text-lg font-medium">ON YOUR FIRST ORDER</span>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">
                Use code <strong className="text-char">WELCOME50</strong> at checkout and enjoy delicious food at half price!
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-ember text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors"
              >
                Claim Offer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
