'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ChefHat, Bike, PartyPopper } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const OrderMap = dynamic(() => import('@/components/ui/OrderMap'), { ssr: false });

type OrderStatus = 'received' | 'preparing' | 'out_for_delivery' | 'delivered';

const statusSteps: {
  key: OrderStatus;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  duration: number; // ms until auto-advance (mock)
}[] = [
  { key: 'received', label: 'Order Received', subtitle: 'We got your order!', icon: CheckCircle, duration: 4000 },
  { key: 'preparing', label: 'Preparing', subtitle: 'Your food is being flame-grilled.', icon: ChefHat, duration: 8000 },
  { key: 'out_for_delivery', label: 'Out for Delivery', subtitle: 'Your rider is on the way!', icon: Bike, duration: 8000 },
  { key: 'delivered', label: 'Delivered', subtitle: 'Enjoy your meal! 🔥', icon: PartyPopper, duration: 0 },
];

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const currentStatus = statusSteps[currentStatusIndex];

  // Auto-advance status (mock)
  useEffect(() => {
    if (currentStatusIndex >= statusSteps.length - 1) return;
    const duration = statusSteps[currentStatusIndex].duration;
    const timer = setTimeout(() => {
      setCurrentStatusIndex((i) => Math.min(i + 1, statusSteps.length - 1));
    }, duration);
    return () => clearTimeout(timer);
  }, [currentStatusIndex]);

  const eta = currentStatusIndex >= 2 ? '8–12 min' : currentStatusIndex === 1 ? '20–25 min' : '30–35 min';

  return (
    <main className="min-h-screen pb-20" style={{ background: '#F7F3EA' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
          >
            Order Tracking
          </p>
          <h1
            className="text-3xl"
            style={{
              fontFamily: "'Anton', sans-serif",
              color: '#1B1714',
              letterSpacing: '-0.02em',
            }}
          >
            ORDER{' '}
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.85em' }}>
              #{params.id}
            </span>
          </h1>
          {currentStatusIndex < statusSteps.length - 1 && (
            <p className="text-sm mt-1" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
              Estimated delivery: <strong style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}>{eta}</strong>
            </p>
          )}
        </div>

        {/* Map */}
        <div
          className="w-full h-52 mb-6 overflow-hidden relative"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
          }}
        >
          <OrderMap statusIndex={currentStatusIndex} />
        </div>

        {/* Status Timeline */}
        <div
          className="p-5 mb-6"
          style={{
            background: '#E7E1D3',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
          }}
        >
          <h2
            className="font-bold text-sm mb-4"
            style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
          >
            Order Status
          </h2>
          <ol className="relative space-y-0" aria-label="Order progress">
            {statusSteps.map((s, i) => {
              const Icon = s.icon;
              const isDone = i < currentStatusIndex;
              const isActive = i === currentStatusIndex;
              return (
                <li
                  key={s.key}
                  className="flex items-start gap-4 pb-6 last:pb-0 relative"
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Vertical line */}
                  {i < statusSteps.length - 1 && (
                    <div
                      className="absolute left-5 top-10 w-0.5 h-full"
                      style={{ background: isDone ? '#D62828' : '#D5CEBC' }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: isDone ? '#D62828' : isActive ? '#1B1714' : '#D5CEBC',
                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={16} className="text-white" />
                  </motion.div>

                  {/* Text */}
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{
                        color: isDone || isActive ? '#1B1714' : '#6E6557',
                        fontFamily: "'Work Sans', sans-serif",
                      }}
                    >
                      {s.label}
                    </p>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs mt-0.5"
                        style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
                      >
                        {s.subtitle}
                      </motion.p>
                    )}
                    {isDone && (
                      <p className="text-xs mt-0.5" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                        ✓ Done
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Delivered CTA */}
        {currentStatusIndex === statusSteps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <p
              className="text-2xl font-bold"
              style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714' }}
            >
              ENJOY YOUR MEAL! 🔥
            </p>
            <Link
              href="/menu"
              className="inline-block h-12 px-8 leading-[48px] text-white font-bold text-sm transition-all active:scale-95"
              style={{
                background: '#D62828',
                fontFamily: "'Work Sans', sans-serif",
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
              }}
            >
              ORDER AGAIN →
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
