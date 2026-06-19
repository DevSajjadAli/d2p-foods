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
  instructions: z.string().optional() });

const paymentSchema = z.object({
  method: z.enum(['cod', 'jazzcash', 'easypaisa', 'card']),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional() });

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
    resolver: zodResolver(addressSchema) });

  const paymentForm = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: 'cod' } });

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

  const inputClassName = "w-full h-12 px-4 text-sm bg-bg border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-ink";
  const labelClassName = "block text-sm font-semibold mb-1.5 text-ink";

  return (
    <main className="min-h-screen pb-20 bg-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
          Checkout
        </h1>

        {/* Step indicator */}
        <nav className="flex items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100" aria-label="Checkout steps">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div
                  className="flex flex-col items-center relative z-10"
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                      isDone ? 'bg-success text-white' : isActive ? 'bg-primary text-white' : 'bg-gray-100 text-muted'
                    }`}
                  >
                    {isDone ? <CheckCircle size={18} aria-hidden="true" /> : <Icon size={18} aria-hidden="true" />}
                  </div>
                  <span
                    className={`text-xs mt-2 font-semibold absolute top-10 whitespace-nowrap ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 h-1 mx-2 rounded-full"
                    style={{ background: step > s.id ? '#267E3E' : '#f3f4f6' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {/* STEP 1: Address */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className={labelClassName}>
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      {...addressForm.register('fullName')}
                      className={inputClassName}
                      placeholder="Ahmed Khan"
                      autoComplete="name"
                    />
                    {addressForm.formState.errors.fullName && (
                      <p className="text-xs mt-1 text-primary">
                        {addressForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClassName}>
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      {...addressForm.register('phone')}
                      className={inputClassName}
                      placeholder="+92 300 0000000"
                      autoComplete="tel"
                      type="tel"
                    />
                    {addressForm.formState.errors.phone && (
                      <p className="text-xs mt-1 text-primary">
                        {addressForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className={labelClassName}>
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      {...addressForm.register('address')}
                      className={`${inputClassName} py-3 h-24 resize-none`}
                      placeholder="House #, Street, Area..."
                      autoComplete="street-address"
                    />
                    {addressForm.formState.errors.address && (
                      <p className="text-xs mt-1 text-primary">
                        {addressForm.formState.errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className={labelClassName}>
                      City *
                    </label>
                    <select
                      id="city"
                      {...addressForm.register('city')}
                      className={inputClassName}
                    >
                      <option value="">Select city...</option>
                      {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'].map((c) => (
                         <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {addressForm.formState.errors.city && (
                      <p className="text-xs mt-1 text-primary">
                        {addressForm.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="instructions" className={labelClassName}>
                      Delivery Instructions <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      id="instructions"
                      {...addressForm.register('instructions')}
                      className={inputClassName}
                      placeholder="Ring the bell, leave at door..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 flex items-center justify-center bg-primary text-white font-bold rounded-xl transition-colors hover:bg-primary/90 mt-6"
                  >
                    Continue to Payment
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
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                  <div role="group" aria-label="Payment method">
                    <p className={labelClassName}>Select Payment Method *</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            className={`flex items-center gap-3 p-4 cursor-pointer transition-all border rounded-xl ${
                              isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 bg-bg hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              value={value}
                              {...paymentForm.register('method')}
                              className="sr-only"
                            />
                            <span className="text-xl" aria-hidden="true">{emoji}</span>
                            <span className={`text-sm font-medium ${isSelected ? 'text-primary font-bold' : 'text-ink'}`}>
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
                      className="space-y-4 pt-2"
                    >
                      <div>
                        <label htmlFor="cardNumber" className={labelClassName}>Card Number</label>
                        <input
                          id="cardNumber"
                          {...paymentForm.register('cardNumber')}
                          className={inputClassName}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className={labelClassName}>Expiry</label>
                          <input
                            id="cardExpiry"
                            {...paymentForm.register('cardExpiry')}
                            className={inputClassName}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCvc" className={labelClassName}>CVC</label>
                          <input
                            id="cardCvc"
                            {...paymentForm.register('cardCvc')}
                            className={inputClassName}
                            placeholder="123"
                            maxLength={4}
                            type="password"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12 flex items-center justify-center font-bold bg-bg text-ink border border-gray-200 rounded-xl transition-colors hover:bg-gray-100"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] h-12 flex items-center justify-center bg-primary text-white font-bold rounded-xl transition-colors hover:bg-primary/90"
                    >
                      Review Order
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
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <h2 className="font-bold text-lg text-ink">
                    Order Items
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted">{item.name} × {item.quantity}</span>
                        <span className="text-ink font-medium">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold pt-4 border-t border-gray-100 text-base">
                    <span className="text-ink">Grand Total</span>
                    <span className="text-primary">
                      Rs. {(total + 100).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Delivery info */}
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-2">
                  <h2 className="font-bold text-lg text-ink mb-2">
                    Delivering To
                  </h2>
                  <p className="text-sm font-medium text-ink">
                    {addressData.fullName}
                  </p>
                  <p className="text-sm text-muted">
                    {addressData.phone}
                  </p>
                  <p className="text-sm text-muted">
                    {addressData.address}, {addressData.city}
                  </p>
                </div>

                {/* Payment method */}
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="font-bold text-lg text-ink mb-2">
                    Payment Method
                  </h2>
                  <p className="text-sm font-medium text-ink capitalize flex items-center gap-2">
                    {paymentData.method === 'cod'
                      ? '💵 Cash on Delivery'
                      : paymentData.method === 'jazzcash'
                      ? '📱 JazzCash'
                      : paymentData.method === 'easypaisa'
                      ? '💚 Easypaisa'
                      : '💳 Debit / Credit Card'}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 h-12 flex items-center justify-center font-bold bg-white text-ink border border-gray-200 rounded-xl transition-colors hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex-[2] h-12 flex items-center justify-center bg-primary text-white font-bold rounded-xl transition-all hover:bg-primary/90 disabled:opacity-70"
                  >
                    {placing ? 'Placing Order...' : 'Place Order 🔥'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
