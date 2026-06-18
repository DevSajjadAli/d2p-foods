'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Ember = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

// Global cart icon ref to target animation
let cartIconRef: React.RefObject<HTMLElement> | null = null;

export function setCartIconRef(ref: React.RefObject<HTMLElement>) {
  cartIconRef = ref;
}

export function useEmberTrail() {
  const [embers, setEmbers] = useState<Ember[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);

  const triggerEmber = () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!buttonRef.current || !cartIconRef?.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    const count = 4;
    const newEmbers: Ember[] = Array.from({ length: count }, (_, i) => ({
      id: ++idRef.current,
      startX: startX + (Math.random() - 0.5) * 20,
      startY: startY + (Math.random() - 0.5) * 20,
      endX: endX + (Math.random() - 0.5) * 10,
      endY: endY + (Math.random() - 0.5) * 10,
    }));

    setEmbers((prev) => [...prev, ...newEmbers]);

    setTimeout(() => {
      setEmbers((prev) =>
        prev.filter((e) => !newEmbers.find((ne) => ne.id === e.id))
      );
    }, 700);
  };

  return { buttonRef, embers, triggerEmber };
}

export function EmberTrailCanvas({ embers }: { embers: Ember[] }) {
  return (
    <AnimatePresence>
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{
            x: ember.startX,
            y: ember.startY,
            opacity: 1,
            scale: 1,
            position: 'fixed',
            zIndex: 9999,
          }}
          animate={{
            x: ember.endX,
            y: ember.endY,
            opacity: 0,
            scale: 0.3,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            position: 'fixed',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FF6B35, #D62828)',
            boxShadow: '0 0 8px #D62828, 0 0 16px #D62828',
            pointerEvents: 'none',
            zIndex: 9999,
            left: 0,
            top: 0,
            transform: `translate(${ember.startX}px, ${ember.startY}px)`,
          }}
        />
      ))}
    </AnimatePresence>
  );
}
