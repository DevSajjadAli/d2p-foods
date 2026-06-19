import Image from 'next/image';
import Link from 'next/link';

type CuisineCircleProps = {
  image: string;
  label: string;
  href?: string;
};

/**
 * Round cuisine tile used in the "What's on Your Mind" carousel on the
 * homepage. Zomato's intent-first pattern: a circular photo with a label
 * underneath, side-scrolling horizontally.
 */
export default function CuisineCircle({ image, label, href = '/menu' }: CuisineCircleProps) {
  return (
    <Link
      href={href}
      className="group flex-shrink-0 flex flex-col items-center gap-2 w-[88px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-md"
      aria-label={`Browse ${label}`}
    >
      <div
        className="relative w-20 h-20 overflow-hidden transition-transform duration-300 group-hover:scale-105"
        style={{
          borderRadius: '50%',
          background: '#E7E1D3',
          padding: 3,
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: '50%' }}
        >
          <Image
            src={image}
            alt={label}
            fill
            sizes="80px"
            className="object-cover"
          />
       </div>
     </div>
      <span
        className="text-xs font-semibold text-center leading-tight"
        style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
      >
        {label}
     </span>
   </Link>
  );
}
