'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import { locations } from '@/lib/data/locations';
import dynamic from 'next/dynamic';

const LocationsMap = dynamic(() => import('@/components/ui/LocationsMap'), { ssr: false });

export default function LocationsPage() {
  return (
    <main className="min-h-screen pb-20" style={{ background: '#F7F3EA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
          >
            Find Us
          </p>
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}
          >
            OUR LOCATIONS
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map */}
          <div
            className="lg:col-span-3 h-80 lg:h-auto overflow-hidden"
            style={{
              minHeight: 320,
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
            }}
          >
            <LocationsMap locations={locations} />
          </div>

          {/* Location list */}
          <div className="lg:col-span-2 space-y-3">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="p-5"
                style={{
                  background: '#E7E1D3',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2
                      className="font-bold text-base"
                      style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
                    >
                      {loc.name}
                    </h2>
                    <p
                      className="text-xs uppercase tracking-wide font-semibold"
                      style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
                    >
                      {loc.city}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 text-white"
                    style={{
                      background: loc.isOpen ? '#22c55e' : '#6E6557',
                      clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
                      fontFamily: "'Work Sans', sans-serif",
                    }}
                  >
                    {loc.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin size={12} style={{ color: '#D62828', marginTop: 3, flexShrink: 0 }} aria-hidden="true" />
                    <p className="text-sm" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                      {loc.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={12} style={{ color: '#D62828', marginTop: 3, flexShrink: 0 }} aria-hidden="true" />
                    <p className="text-sm" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                      {loc.hours.weekday} (weekdays)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={12} style={{ color: '#D62828', marginTop: 3, flexShrink: 0 }} aria-hidden="true" />
                    <a
                      href={`tel:${loc.phone}`}
                      className="text-sm hover:text-ember transition-colors"
                      style={{ color: '#6E6557', fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
