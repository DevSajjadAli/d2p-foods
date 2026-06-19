'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useUIStore } from '@/lib/store/ui';
import { useCartStore } from '@/lib/store/cart';

export default function CustomizationModal() {
  const open = useUIStore((s) => s.customizationModalOpen);
  const close = useUIStore((s) => s.closeCustomizationModal);
  const item = useUIStore((s) => s.selectedMenuItemForCustomization);
  const addItem = useCartStore((s) => s.addItem);

  // CategoryID -> OptionID
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults
  useEffect(() => {
    if (open && item && item.customizations) {
      const initial: Record<string, string> = {};
      item.customizations.forEach((cat) => {
        if (cat.options.length > 0) {
          initial[cat.id] = cat.options[0].id; // Default to first option
        }
      });
      setSelections(initial);
      setQuantity(1);
    }
  }, [open, item]);

  if (!item) return null;

  const handleSelect = (catId: string, optId: string) => {
    setSelections((prev) => ({ ...prev, [catId]: optId }));
  };

  const calculateTotal = () => {
    let total = item.price;
    if (item.customizations) {
      item.customizations.forEach((cat) => {
        const selectedOptId = selections[cat.id];
        if (selectedOptId) {
          const opt = cat.options.find((o) => o.id === selectedOptId);
          if (opt) total += opt.priceDelta;
        }
      });
    }
    return total * quantity;
  };

  const handleAddToCart = () => {
    // Generate unique ID based on selections
    const selectionHash = Object.entries(selections)
      .sort(([k1], [k2]) => k1.localeCompare(k2))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const cartItemId = `${item.id}-${selectionHash}`;

    // Calculate per-item final price
    const finalPrice = calculateTotal() / quantity;

    addItem({
      id: cartItemId,
      baseId: item.id,
      name: item.name,
      price: finalPrice,
      image: item.image,
      customizations: selections,
    });

    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto md:left-auto md:h-full md:w-[450px] md:transform-none md:initial-x-[100%] md:animate-x-0 md:exit-x-[100%] bg-surface rounded-t-3xl md:rounded-none shadow-2xl flex flex-col max-h-[90vh] md:max-h-none overflow-hidden"
          >
            {/* Header / Image */}
            <div className="relative h-48 sm:h-56 flex-shrink-0 bg-bg">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <p className="text-sm text-white/80 line-clamp-1">{item.description}</p>
              </div>
            </div>

            {/* Customizations */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {item.customizations?.map((cat) => (
                <div key={cat.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-ink">{cat.name}</h3>
                    {cat.required && (
                      <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {cat.options.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-bg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={cat.id}
                            checked={selections[cat.id] === opt.id}
                            onChange={() => handleSelect(cat.id, opt.id)}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-ink">{opt.name}</span>
                        </div>
                        {opt.priceDelta > 0 && (
                          <span className="text-sm text-muted">+Rs. {opt.priceDelta}</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-white space-y-4">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-bg text-primary"
                >
                  <Minus size={18} />
                </button>
                <span className="text-lg font-bold text-ink w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-bg text-primary"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-between px-6 hover:bg-primary/90 transition-colors"
              >
                <span>Add to Cart</span>
                <span>Rs. {calculateTotal().toLocaleString()}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
