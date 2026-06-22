import Image from 'next/image';
import { Clock, Bike, Flame, Tag } from 'lucide-react';
import { restaurantStats } from '@/lib/data/menu';
import RatingBadge from './RatingBadge';

export default function RestaurantHeader() {
  const stats = restaurantStats();

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
          <div className="grid gap-0 md:grid-cols-[320px_1fr]">
            <div className="relative h-56 overflow-hidden bg-bg md:h-full min-h-[260px]">
              <Image
                src="/images/hero_burger_cinematic.png"
                alt="D2P Foods signature burger"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover food-image"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Open now</p>
                <p className="text-sm font-extrabold text-success">Delivering in Lahore</p>
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-primary">
                    <Flame size={13} aria-hidden="true" /> Zomato-style dining
                  </span>
                  <span className="rounded-full bg-bg px-3 py-1 text-xs font-bold text-muted">Burgers • Wings • Grilled • Combos</span>
                </div>

                <h1 className="text-3xl font-extrabold leading-none tracking-tight text-ink sm:text-4xl lg:text-5xl">
                  D2P Foods
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  Flame-grilled burgers, saucy wings, family boxes and quick comfort meals — made fresh and delivered hot.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <RatingBadge rating={stats.avgRating} ratingCount={stats.totalRatings} size="md" variant="ghost" />
                  <RatingInfo label="Great taste" />
                  <RatingInfo label="100% halal" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <OfferTag label="Free delivery on first order" icon={<Tag size={15} />} />
                <OfferTag label="25–35 min" icon={<Clock size={15} />} />
                <OfferTag label="Rs. 100 delivery" icon={<Bike size={15} />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatingInfo({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-bg px-3 py-1 text-xs font-bold text-muted">
      {label}
    </span>
  );
}

function OfferTag({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-gray-100 bg-bg px-4 py-3 text-sm font-bold text-ink">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      {label}
    </span>
  );
}
