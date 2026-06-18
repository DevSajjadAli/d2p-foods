import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Menu | D2P Foods',
  description:
    'Explore the full D2P Foods menu — flame-grilled burgers, crispy wings, family combos, sides, and drinks. Order online for delivery or pickup.',
  openGraph: {
    title: 'Full Menu | D2P Foods',
    description: 'Browse and order from the complete D2P Foods menu.',
    images: ['/images/hero_burger.png'],
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
