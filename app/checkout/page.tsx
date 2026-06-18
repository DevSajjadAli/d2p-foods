'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin, CreditCard, ClipboardList } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

// Zod schemas
const addressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().regex(/^(\+92|0)[0-9]{10}$/, 'Enter a valid Pakistani phone number'),
  address: z.string().min(10, 'Please enter a full address'),
  city: z.string().min(2, 'City is required'),
  instructions: z.string().optional(),
});

const paymentSchema = z.object({
  method: z.enum(['cod', 'jazzcash', 'easypaisa', 'card']),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

type AddressForm = z.infer<typeof addressSchema>;
type PaymentForm = z.infer<typeof paymentSchema>;

const steps = [
  { id: 1, label: 'Address', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Review', icon: ClipboardList },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [addressData, setAddressData] = useState<AddressForm | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentForm | null>(null);
  const [placing, setPlacing] = useState(false);
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const addressForm = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  const paymentForm = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: 'cod' },
  });

  const selectedMethod = paymentForm.watch('method');

  const handleAddressSubmit = (data: AddressForm) => {
    setAddressData(data);
    setStep(2);
  };

  const handlePaymentSubmit = (data: PaymentForm) => {
    setPaymentData(data);
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = `D2P-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    router.push(`/order/${orderId}`);
  };

  const inputStyle = {
    fontFamily: "'Work Sans', sans-serif",
    borderColor: '#E7E1D3',
    background: '#fff',
    color: '#1B1714',
    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
  };

  const labelStyle = {
    color: '#1B1714',
    fontFamily: "'Work Sans', sans-serif",
  };

  return (
    <main className="min-h-screen pb-20" style={{ background: '#F7F3EA' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1
          className="text-4xl sm:text-5xl mb-8"
          style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}
        >
          CHECKOUT
        </h1>

        {/* Step indicator */}
        <nav className="flex items-center mb-8" aria-label="Checkout steps">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div
                  className="flex flex-col items-center"
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center font-bold text-sm transition-all"
                    style={{
                      background: isDone ? '#22c55e' : isActive ? '#D62828' : '#E7E1D3',
                      color: isDone || isActive ? '#fff' : '#6E6557',
                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
                    }}
                  >
                    {isDone ? <CheckCircle size={16} aria-hidden="true" /> : <Icon size={16} aria-hidden="true" />}
                  </div>
                  <span
                    className="text-xs mt-1 font-medium"
                    style={{ color: isActive ? '#D62828' : '#6E6557', fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-2 mt-[-12px]"
                    style={{ background: step > s.id ? '#22c55e' : '#E7E1D3' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          {/* STEP 1: Address */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold mb-1" style={labelStyle}>
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    {...addressForm.register('fullName')}
                    className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember transition-colors"
                    style={inputStyle}
                    placeholder="Ahmed Khan"
                    autoComplete="name"
                  />
                  {addressForm.formState.errors.fullName && (
                    <p className="text-xs mt-1" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>
                      {addressForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-1" style={labelStyle}>
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    {...addressForm.register('phone')}
                    className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember transition-colors"
                    style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }}
                    placeholder="+92 300 0000000"
                    autoComplete="tel"
                    type="tel"
                  />
                  {addressForm.formState.errors.phone && (
                    <p className="text-xs mt-1" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>
                      {addressForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold mb-1" style={labelStyle}>
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    {...addressForm.register('address')}
                    className="w-full px-4 py-3 text-sm border-2 focus:outline-none focus:border-ember transition-colors resize-none"
                    style={{ ...inputStyle, height: 80, clipPath: 'none', borderRadius: 0 }}
                    placeholder="House #, Street, Area..."
                    autoComplete="street-address"
                  />
                  {addressForm.formState.errors.address && (
                    <p className="text-xs mt-1" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>
                      {addressForm.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold mb-1" style={labelStyle}>
                    City *
                  </label>
                  <select
                    id="city"
                    {...addressForm.register('city')}
                    className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember transition-colors"
                    style={{ ...inputStyle, clipPath: 'none' }}
                  >
                    <option value="">Select city...</option>
                    {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {addressForm.formState.errors.city && (
                    <p className="text-xs mt-1" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>
                      {addressForm.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="instructions" className="block text-sm font-semibold mb-1" style={labelStyle}>
                    Delivery Instructions <span style={{ color: '#6E6557' }}>(optional)</span>
                  </label>
                  <input
                    id="instructions"
                    {...addressForm.register('instructions')}
                    className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember transition-colors"
                    style={inputStyle}
                    placeholder="Ring the bell, leave at door..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-13 py-4 text-white font-bold text-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember mt-2"
                  style={{
                    background: '#D62828',
                    fontFamily: "'Work Sans', sans-serif",
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                  }}
                >
                  CONTINUE TO PAYMENT →
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                <div role="group" aria-label="Payment method">
                  <p className="text-sm font-semibold mb-3" style={labelStyle}>Select Payment Method *</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'cod', label: 'Cash on Delivery', emoji: '💵' },
                      { value: 'jazzcash', label: 'JazzCash', emoji: '📱' },
                      { value: 'easypaisa', label: 'Easypaisa', emoji: '💚' },
                      { value: 'card', label: 'Debit / Credit Card', emoji: '💳' },
                    ].map(({ value, label, emoji }) => {
                      const isSelected = selectedMethod === value;
                      return (
                        <label
                          key={value}
                          className="flex items-center gap-3 p-4 cursor-pointer transition-all border-2"
                          style={{
                            borderColor: isSelected ? '#D62828' : '#E7E1D3',
                            background: isSelected ? '#fff5f5' : '#E7E1D3',
                            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                          }}
                        >
                          <input
                            type="radio"
                            value={value}
                            {...paymentForm.register('method')}
                            className="sr-only"
                          />
                          <span className="text-xl" aria-hidden="true">{emoji}</span>
                          <span className="text-sm font-medium" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                            {label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Card fields */}
                {selectedMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-semibold mb-1" style={labelStyle}>Card Number</label>
                      <input
                        id="cardNumber"
                        {...paymentForm.register('cardNumber')}
                        className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember"
                        style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-semibold mb-1" style={labelStyle}>Expiry</label>
                        <input
                          id="cardExpiry"
                          {...paymentForm.register('cardExpiry')}
                          className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember"
                          style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-semibold mb-1" style={labelStyle}>CVC</label>
                        <input
                          id="cardCvc"
                          {...paymentForm.register('cardCvc')}
                          className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember"
                          style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12 text-sm font-bold border-2 transition-colors hover:bg-ash focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    style={{
                      borderColor: '#1B1714',
                      color: '#1B1714',
                      fontFamily: "'Work Sans', sans-serif",
                    }}
                  >
                    ← BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] h-12 text-white font-bold text-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                    style={{
                      background: '#D62828',
                      fontFamily: "'Work Sans', sans-serif",
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                    }}
                  >
                    REVIEW ORDER →
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && addressData && paymentData && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Items summary */}
              <div
                className="p-5 space-y-3"
                style={{
                  background: '#E7E1D3',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                <h2 className="font-bold text-sm" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                  Order Items
                </h2>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    <span style={{ color: '#6E6557' }}>{item.name} × {item.quantity}</span>
                    <span style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t-2 text-base" style={{ borderColor: '#D5CEBC' }}>
                  <span style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>Total</span>
                  <span style={{ color: '#D62828', fontFamily: "'IBM Plex Mono', monospace" }}>
                    Rs. {(total + 100).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Delivery info */}
              <div
                className="p-5 space-y-2"
                style={{
                  background: '#E7E1D3',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                <h2 className="font-bold text-sm" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                  Delivering To
                </h2>
                <p className="text-sm" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                  {addressData.fullName} — {addressData.phone}
                </p>
                <p className="text-sm" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                  {addressData.address}, {addressData.city}
                </p>
              </div>

              {/* Payment method */}
              <div
                className="p-5"
                style={{
                  background: '#E7E1D3',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                <h2 className="font-bold text-sm mb-1" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                  Payment
                </h2>
                <p className="text-sm capitalize" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                  {paymentData.method === 'cod'
                    ? '💵 Cash on Delivery'
                    : paymentData.method === 'jazzcash'
                    ? '📱 JazzCash'
                    : paymentData.method === 'easypaisa'
                    ? '💚 Easypaisa'
                    : '💳 Debit / Credit Card'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 text-sm font-bold border-2 transition-colors hover:bg-ash focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  style={{
                    borderColor: '#1B1714',
                    color: '#1B1714',
                    fontFamily: "'Work Sans', sans-serif",
                  }}
                >
                  ← BACK
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="flex-[2] h-12 text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  style={{
                    background: '#D62828',
                    fontFamily: "'Work Sans', sans-serif",
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                  }}
                >
                  {placing ? 'PLACING ORDER...' : 'PLACE ORDER 🔥'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
