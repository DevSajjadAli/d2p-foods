import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-20" style={{ background: '#F7F3EA' }}>
      {/* Hero */}
      <section
        className="relative w-full flex items-end overflow-hidden"
        style={{ minHeight: 320 }}
      >
        <Image
          src="/images/grilled_chicken.png"
          alt="D2P Foods - our story"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(27,23,20,0.9) 0%, rgba(27,23,20,0.3) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <h1
            className="text-5xl sm:text-6xl leading-none"
            style={{ fontFamily: "'Anton', sans-serif", color: '#F7F3EA', letterSpacing: '-0.02em' }}
          >
            OUR STORY
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {[
          {
            title: 'WHERE IT STARTED',
            body: "D2P Foods was born from a single conviction: fast food doesn't have to mean shortcuts. We started in Lahore with one grill, one menu, and a stubborn refusal to pre-cook or freeze anything. Every burger, every wing, every wrap goes from raw to your hands in under 12 minutes — because that's how long real food takes.",
          },
          {
            title: 'THE D2P DIFFERENCE',
            body: 'D2P stands for Dev2Production — the idea that food, like great software, should go from origin to delivery with as few compromises as possible. We source locally, marinate daily, and never sacrifice quality for speed. Our grills run at 250°C, because that\'s the temperature where real flavour happens.',
            id: 'halal',
          },
          {
            title: 'HALAL — ALWAYS',
            body: 'Every ingredient at every D2P Foods location is 100% certified Halal. No exceptions. Our certificates are displayed at each branch and updated annually.',
          },
          {
            title: 'CAREERS',
            body: "We're always hiring people who care about food. If you're passionate about hospitality, quality, and building something great — send your CV to careers@d2pfoods.pk.",
            id: 'careers',
          },
          {
            title: 'FRANCHISE',
            body: 'Interested in opening a D2P Foods outlet in your city? We offer a fully supported franchise model with training, supply chain, and brand support. Email franchise@d2pfoods.pk to get started.',
            id: 'franchise',
          },
        ].map(({ title, body, id }) => (
          <div key={title} id={id}>
            <h2
              className="text-2xl mb-3"
              style={{ fontFamily: "'Anton', sans-serif", color: '#D62828', letterSpacing: '-0.02em' }}
            >
              {title}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
