'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChefHat, Bike, PartyPopper } from 'lucide-react';
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
    <main className="min-h-screen pb-20 bg-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-bold uppercase tracking-widest mb-1 text-primary">
            Order Tracking
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            Order <span className="text-muted text-xl">#{params.id}</span>
          </h1>
          {currentStatusIndex < statusSteps.length - 1 && (
            <p className="text-sm mt-2 text-ink/80 font-medium">
              Estimated delivery: <strong className="text-ink font-bold">{eta}</strong>
            </p>
          )}
        </div>

        {/* Map */}
        <div className="w-full h-56 mb-6 overflow-hidden relative rounded-2xl shadow-sm border border-gray-100 bg-white">
          <OrderMap statusIndex={currentStatusIndex} />
        </div>

        {/* Status Timeline */}
        <div className="p-6 mb-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-6 text-ink">
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
                  className="flex items-start gap-5 pb-8 last:pb-0 relative"
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Vertical line */}
                  {i < statusSteps.length - 1 && (
                    <div
                      className="absolute left-6 top-10 w-0.5 h-[calc(100%-1rem)]"
                      style={{ background: isDone ? '#E23744' : '#f3f4f6' }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      isDone ? 'bg-primary text-white' : isActive ? 'bg-ink text-white shadow-lg' : 'bg-gray-100 text-muted'
                    }`}
                    aria-hidden="true"
                  >
                    <Icon size={20} />
                  </motion.div>

                  {/* Text */}
                  <div className="pt-1">
                    <p className={`font-bold text-base ${isDone || isActive ? 'text-ink' : 'text-muted'}`}>
                      {s.label}
                    </p>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm mt-1 text-primary font-medium"
                      >
                        {s.subtitle}
                      </motion.p>
                    )}
                    {isDone && (
                      <p className="text-sm mt-1 text-muted">
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
            className="text-center space-y-6 pt-4"
          >
            <p className="text-2xl font-bold text-ink">
              Enjoy your meal! 🔥
            </p>
            <Link
              href="/menu"
              className="inline-flex h-12 px-8 items-center justify-center bg-primary text-white font-bold rounded-xl transition-all hover:bg-primary/90"
            >
              Order Again
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
