type VegMarkerProps = {
  veg: boolean;
  size?: number;
  label?: boolean; // show "VEG"/"NON-VEG" text alongside
};

/**
 * Zomato's signature veg/non-veg marker: a small box with a colored border
 * and a filled dot of the same color inside. Green = veg, red-brown = non-veg.
 * Used inline next to dish names on cards and detail pages.
 */
export default function VegMarker({
  veg,
  size = 14,
  label = false,
}: VegMarkerProps) {
  const color = veg ? '#0F8A3F' : '#B23B3B';
  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      <span
        aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
        role="img"
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          border: `1.5px solid ${color}`,
          padding: 2,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            background: color,
            borderRadius: '50%',
          }}
        />
     </span>
      {label && (
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color, fontFamily: "'Work Sans', sans-serif", lineHeight: 1 }}
        >
          {veg ? 'Veg' : 'Non-Veg'}
       </span>
      )}
   </span>
  );
}
