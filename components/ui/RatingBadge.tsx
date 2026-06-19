import { Star } from 'lucide-react';

type RatingBadgeProps = {
  rating: number;
  ratingCount?: number;
  size?: 'sm' | 'md';
  variant?: 'solid' | 'ghost';
};

/**
 * Zomato-style rating pill: green background, white star, score inline.
 * Used on MenuCard overlay and on the RestaurantHeader band.
 */
export default function RatingBadge({
  rating,
  ratingCount,
  size = 'md',
  variant = 'solid',
}: RatingBadgeProps) {
  if (rating <= 0) return null;

  const padding = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';
  const iconSize = size === 'sm' ? 9 : 11;
  const bg = variant === 'solid' ? '#127A4B' : 'rgba(18, 122, 75, 0.92)';

  return (
    <span
      className={`inline-flex items-center gap-1 ${padding} font-bold text-white rounded-sm`}
      style={{ background: bg, fontFamily: "'Work Sans', sans-serif", lineHeight: 1 }}
      aria-label={`Rated ${rating} out of 5${ratingCount ? ` from ${ratingCount} ratings` : ''}`}
    >
      <Star size={iconSize} fill="#fff" aria-hidden="true" />
      <span>{rating.toFixed(1)}</span>
      {ratingCount !== undefined && size === 'md' && (
        <span className="opacity-80 font-medium">
          ({ratingCount > 999 ? `${(ratingCount / 1000).toFixed(1)}k` : ratingCount})
       </span>
      )}
   </span>
  );
}
