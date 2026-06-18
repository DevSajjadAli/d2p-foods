import Link from 'next/link';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-white"
      style={{ background: '#2A2521' }}
      role="contentinfo"
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center text-sm"
                style={{
                  background: '#D62828',
                  clipPath:
                    'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                }}
              >
                🔥
              </div>
              <span
                className="text-xl text-white"
                style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em' }}
              >
                D2P FOODS
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: '#9E9589', fontFamily: "'Work Sans', sans-serif" }}
            >
              Flame-grilled. No shortcuts. Every order cooked to order, every time.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter / X' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-sm transition-colors hover:bg-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  style={{ background: '#3A332E', color: '#9E9589' }}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/menu', label: 'Full Menu' },
                { href: '/deals', label: 'Current Deals' },
                { href: '/locations', label: 'Find a Branch' },
                { href: '/order/track', label: 'Track Order' },
                { href: '/account', label: 'My Account' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white focus:outline-none focus-visible:underline"
                    style={{ color: '#9E9589', fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
            >
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/about#careers', label: 'Careers' },
                { href: '/about#franchise', label: 'Franchise' },
                { href: '/about#halal', label: 'Halal Certification' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white focus:outline-none focus-visible:underline"
                    style={{ color: '#9E9589', fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={14} style={{ color: '#D62828', marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
                <a
                  href="tel:+922133571000"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: '#9E9589', fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  +92 21 3357 1000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} style={{ color: '#D62828', marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
                <a
                  href="mailto:hello@d2pfoods.pk"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: '#9E9589', fontFamily: "'Work Sans', sans-serif" }}
                >
                  hello@d2pfoods.pk
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} style={{ color: '#D62828', marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
                <span
                  className="text-sm"
                  style={{ color: '#9E9589', fontFamily: "'Work Sans', sans-serif" }}
                >
                  5 locations across Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #3A332E' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs"
            style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
          >
            © {currentYear} D2P Foods. All rights reserved. 100% Halal.
          </p>
          <div className="flex gap-4">
            {[
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs hover:text-white transition-colors"
                style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
