import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: '#F7F3EA' }}
    >
      <p
        className="text-9xl mb-4 leading-none"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: '#E7E1D3',
          letterSpacing: '-0.04em',
        }}
        aria-hidden="true"
      >
        404
      </p>
      <p className="text-5xl mb-3" aria-hidden="true">🔥</p>
      <h1
        className="text-4xl mb-3"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: '#1B1714',
          letterSpacing: '-0.02em',
        }}
      >
        PAGE NOT FOUND
      </h1>
      <p
        className="text-base mb-8 max-w-md"
        style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
      >
        The page you&apos;re looking for doesn&apos;t exist. Maybe it got flame-grilled.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-13 px-8 py-4 text-white font-bold text-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        style={{
          background: '#D62828',
          fontFamily: "'Work Sans', sans-serif",
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
        }}
      >
        BACK TO HOME →
      </Link>
    </main>
  );
}
