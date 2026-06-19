import Image from 'next/image';
import { Clock, Bike } from 'lucide-react';
import { restaurantStats } from '@/lib/data/menu';
import RatingBadge from './RatingBadge';

export default function RestaurantHeader() {
  const stats = restaurantStats();

  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#F7F3EA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Hero image */}
          <div
            className="relative w-full md:w-72 h-48 md:h-48 flex-shrink-0 overflow-hidden"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}
          >
            <Image
              src="/images/hero_burger.png"
              alt="D2P Foods restaurant"
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Name + Rating */}
            <div>
              <h1
                className="text-2xl sm:text-3xl leading-none"
                style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}
              >
                D2P FOODS
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
              >
                🔥 Flame-Grilled. No Shortcuts.
              </p>

              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <RatingBadge
                  rating={stats.avgRating}
                  size="md"
                  variant="ghost"
                />
                <RatingInfo label={`${stats.totalRatings.toLocaleString()} ratings`} />
                <RatingInfo label={'"Great taste"'} />
              </div>
            </div>

            {/* Offers row */}
            <div className="flex flex-wrap gap-2 mt-3">
              <OfferTag label="Free delivery on first order" />
              <OfferTag label="25–35 min" icon={<Clock size={12} />} />
              <OfferTag label="Rs. 100 Delivery" icon={<Bike size={12} />} />
            </div>

            {/* Cuisine strip */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['Burgers', 'Wings', 'Grilled', 'Combos'].map((c) => (
                <span
                  key={c}
                  className="text-xs font-semibold px-2 py-0.5"
                  style={{
                    background: '#E7E1D3',
                    color: '#1B1714',
                    fontFamily: "'Work Sans', sans-serif",
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatingInfo({ label }: { label: string }) {
  return (
    <span
      className="text-xs font-medium"
      style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
    >
      {label}
    </span>
  );
}

function OfferTag({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5"
      style={{
        background: '#1B1714',
        color: '#F7F3EA',
        fontFamily: "'Work Sans', sans-serif",
        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
      }}
    >
      {icon}
      {label}
    </span>
  );
}
