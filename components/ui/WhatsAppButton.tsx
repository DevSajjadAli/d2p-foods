'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923704604266"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-20 md:bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:animate-pulse" />
      <span className="absolute right-16 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Need help? Chat with us
      </span>
    </a>
  );
}
