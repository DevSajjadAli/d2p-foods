'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Tag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export default function PromoCodeInput() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const applyPromo = useCartStore((s) => s.applyPromo);
  const removePromo = useCartStore((s) => s.removePromo);
  const promoCode = useCartStore((s) => s.promoCode);
  const discount = useCartStore((s) => s.discount);

  const handleApply = () => {
    if (promoCode) {
      removePromo();
      setCode('');
      setStatus('idle');
      return;
    }
    const valid = applyPromo(code);
    setStatus(valid ? 'success' : 'error');
    if (!valid) setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="promo-code"
        className="text-sm font-semibold flex items-center gap-1.5"
        style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}
      >
        <Tag size={14} style={{ color: '#D62828' }} aria-hidden="true" />
        Promo Code
      </label>

      <div className="flex gap-2">
        <input
          id="promo-code"
          type="text"
          value={promoCode || code}
          onChange={(e) => !promoCode && setCode(e.target.value.toUpperCase())}
          placeholder="Enter code (try D2PFIRST)"
          disabled={!!promoCode}
          className="flex-1 h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember transition-colors"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            borderColor: status === 'error' ? '#D62828' : status === 'success' ? '#22c55e' : '#E7E1D3',
            background: promoCode ? '#f0fdf4' : '#F7F3EA',
            color: '#1B1714',
            clipPath:
              'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
          }}
          aria-describedby={status !== 'idle' ? 'promo-status' : undefined}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <button
          onClick={handleApply}
          className="h-11 px-5 text-sm font-bold text-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          style={{
            background: promoCode ? '#6E6557' : '#D62828',
            fontFamily: "'Work Sans', sans-serif",
            clipPath:
              'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
          }}
          aria-label={promoCode ? 'Remove promo code' : 'Apply promo code'}
        >
          {promoCode ? 'Remove' : 'Apply'}
        </button>
      </div>

      {/* Status message */}
      {status === 'success' && (
        <p
          id="promo-status"
          className="text-sm flex items-center gap-1.5"
          style={{ color: '#22c55e', fontFamily: "'Work Sans', sans-serif" }}
          role="alert"
        >
          <CheckCircle size={14} aria-hidden="true" />
          {discount}% discount applied!
        </p>
      )}
      {status === 'error' && (
        <p
          id="promo-status"
          className="text-sm flex items-center gap-1.5"
          style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
          role="alert"
        >
          <XCircle size={14} aria-hidden="true" />
          Invalid promo code.
        </p>
      )}
    </div>
  );
}
