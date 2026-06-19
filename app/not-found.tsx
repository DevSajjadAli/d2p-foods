'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-flex justify-center items-center text-ember mb-6"
        >
          <Flame size={120} strokeWidth={1} />
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-display text-ink mb-4">404</h1>
        <p className="text-xl md:text-2xl text-muted font-medium mb-8">
          Looks like this page got burnt to a crisp.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ember text-white rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={20} />
          Back to Menu
        </Link>
      </motion.div>
    </main>
  );
}
