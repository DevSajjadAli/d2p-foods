'use client';

import Link from 'next/link';
import { Package, Clock, User, ChevronRight } from 'lucide-react';

const mockOrders = [
  { id: 'D2P-ABC123', date: '2026-06-17', items: ['D2P Flame Burger', 'Crispy Fries (Large)', 'Soft Drink (Regular)'], total: 1349, status: 'Delivered' },
  { id: 'D2P-DEF456', date: '2026-06-14', items: ['Family Feast Box', 'Fresh Lemonade'], total: 3499, status: 'Delivered' },
  { id: 'D2P-GHI789', date: '2026-06-10', items: ['Inferno Wings (12 pcs)', 'Garlic Bread'], total: 1800, status: 'Delivered' },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen pb-32" style={{ background: '#F7F3EA' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-4xl sm:text-5xl mb-8"
          style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}
        >
          MY ACCOUNT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div
            className="p-5"
            style={{
              background: '#E7E1D3',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
            }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center mb-4"
              style={{
                background: '#1B1714',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
              }}
            >
              <User size={28} className="text-white" aria-hidden="true" />
            </div>
            <h2
              className="font-bold text-lg mb-0.5"
              style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
            >
              Ahmed Khan
            </h2>
            <p
              className="text-sm mb-4"
              style={{ color: '#6E6557', fontFamily: "'IBM Plex Mono', monospace" }}
            >
              ahmed@example.com
            </p>
            <p
              className="text-sm"
              style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
            >
              📍 House 12, Street 4, Gulberg III, Lahore
            </p>

            <div className="mt-5 space-y-2">
              <button
                className="w-full h-10 text-sm font-semibold text-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                style={{
                  background: '#D62828',
                  fontFamily: "'Work Sans', sans-serif",
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
                }}
              >
                Edit Profile
              </button>
              <button
                className="w-full h-10 text-sm font-semibold border-2 transition-colors hover:bg-bone/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                style={{
                  borderColor: '#1B1714',
                  color: '#1B1714',
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <h2
              className="font-bold text-lg mb-4"
              style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
            >
              Order History
            </h2>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/order/${order.id}`}
                  className="flex items-start gap-4 p-4 group hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  style={{
                    background: '#E7E1D3',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                    display: 'flex',
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ background: '#1B1714', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                  >
                    <Package size={16} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="font-bold text-sm"
                        style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        #{order.id}
                      </span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 text-white"
                        style={{
                          background: order.status === 'Delivered' ? '#22c55e' : '#D62828',
                          fontFamily: "'Work Sans', sans-serif",
                          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)',
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p
                      className="text-xs mb-1 truncate"
                      style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
                    >
                      {order.items.join(', ')}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs"
                        style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
                      >
                        <Clock size={10} className="inline mr-1" aria-hidden="true" />
                        {order.date}
                      </span>
                      <span
                        className="font-bold text-sm"
                        style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Rs. {order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: '#6E6557', flexShrink: 0, alignSelf: 'center' }} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
