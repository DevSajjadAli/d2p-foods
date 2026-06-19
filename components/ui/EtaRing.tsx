type EtaRingProps = {
  minutes: number;
  maxMinutes?: number;
  size?: number;
  label?: string;
};

/**
 * Circular ETA countdown rendered with conic-gradient. Used on the order
 * tracking page when an order is "Out for Delivery" — gives the user a
 * glance-able progress affordance instead of only text.
 */
export default function EtaRing({
  minutes,
  maxMinutes = 30,
  size = 96,
  label = 'min',
}: EtaRingProps) {
  const pct = Math.min(1, Math.max(0, 1 - minutes / maxMinutes));
  const degrees = Math.round(pct * 360);
  const ring = `conic-gradient(#D62828 ${degrees}deg, #E7E1D3 ${degrees}deg 360deg)`;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Estimated ${minutes} minutes remaining`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: ring,
          borderRadius: '50%',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))',
          WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))',
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center">
        <span
          className="font-bold leading-none"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: size * 0.28,
            color: '#1B1714',
            letterSpacing: '-0.02em',
          }}
        >
          {minutes}
        </span>
        <span
          className="text-[10px] uppercase font-semibold tracking-wider mt-1"
          style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
