'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  };

  const inputBase = {
    fontFamily: "'Work Sans', sans-serif",
    borderColor: '#E7E1D3',
    background: '#fff',
    color: '#1B1714',
  };

  return (
    <main className="min-h-screen pb-20" style={{ background: '#F7F3EA' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}
          >
            Get In Touch
          </p>
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714', letterSpacing: '-0.02em' }}
          >
            CONTACT US
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Call Us', value: '+92 21 3357 1000', href: 'tel:+922133571000' },
              { icon: Mail, label: 'Email Us', value: 'hello@d2pfoods.pk', href: 'mailto:hello@d2pfoods.pk' },
              { icon: MapPin, label: 'Head Office', value: 'Gulberg III, Lahore, Pakistan', href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5"
                style={{
                  background: '#E7E1D3',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: '#D62828', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                >
                  <Icon size={16} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-sm hover:text-ember transition-colors" style={{ color: '#1B1714', fontFamily: "'IBM Plex Mono', monospace" }}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div
              className="p-5"
              style={{
                background: '#1B1714',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
              }}
            >
              <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                Business Hours
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Mon – Fri: 9 AM – 6 PM<br />
                Sat – Sun: 11 AM – 4 PM
              </p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center p-10">
              <CheckCircle size={48} style={{ color: '#22c55e' }} className="mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Anton', sans-serif", color: '#1B1714' }}>
                MESSAGE SENT!
              </h2>
              <p className="text-sm" style={{ color: '#6E6557', fontFamily: "'Work Sans', sans-serif" }}>
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { id: 'name', label: 'Your Name *', placeholder: 'Ahmed Khan', type: 'text' },
                { id: 'email', label: 'Email Address *', placeholder: 'you@example.com', type: 'email' },
                { id: 'subject', label: 'Subject *', placeholder: 'Feedback, complaint, franchise...', type: 'text' },
              ].map(({ id, label, placeholder, type }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-semibold mb-1" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    {...register(id as any)}
                    placeholder={placeholder}
                    className="w-full h-11 px-4 text-sm border-2 focus:outline-none focus:border-ember transition-colors"
                    style={{ ...inputBase, clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                  />
                  {errors[id as keyof FormData] && (
                    <p className="text-xs mt-1" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>
                      {errors[id as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-1" style={{ color: '#1B1714', fontFamily: "'Work Sans', sans-serif" }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 text-sm border-2 focus:outline-none focus:border-ember transition-colors resize-none"
                  style={{ ...inputBase, borderRadius: 0 }}
                />
                {errors.message && (
                  <p className="text-xs mt-1" style={{ color: '#D62828', fontFamily: "'Work Sans', sans-serif" }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                style={{
                  background: '#D62828',
                  fontFamily: "'Work Sans', sans-serif",
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
