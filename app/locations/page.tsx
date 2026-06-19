'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import { locations } from '@/lib/data/locations';
import dynamic from 'next/dynamic';

const LocationsMap = dynamic(() => import('@/components/ui/LocationsMap'), { ssr: false });

export default function LocationsPage() {
  return (
    <main className="min-h-screen pb-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest mb-2 text-primary">
            Find Us
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Our Locations
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map */}
          <div className="lg:col-span-3 h-80 lg:h-auto overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white min-h-[320px]">
            <LocationsMap locations={locations} />
          </div>

          {/* Location list */}
          <div className="lg:col-span-2 space-y-4">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-lg text-ink">
                      {loc.name}
                    </h2>
                    <p className="text-xs uppercase tracking-wide font-semibold text-muted mt-0.5">
                      {loc.city}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      loc.isOpen ? 'bg-success/10 text-success' : 'bg-gray-100 text-muted'
                    }`}
                  >
                    {loc.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-ink/80 leading-relaxed">
                      {loc.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-ink/80">
                      {loc.hours.weekday} (Weekdays)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${loc.phone}`}
                      className="text-sm text-ink/80 hover:text-primary transition-colors font-medium"
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
