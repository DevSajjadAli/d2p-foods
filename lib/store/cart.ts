import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  promoCode: string;
  discount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
};

const VALID_PROMO_CODES: Record<string, number> = {
  D2PFIRST: 15,  // 15% off
  EMBER10: 10,   // 10% off
  FLAME20: 20,   // 20% off
  WINGS50: 50,   // 50 PKR flat off (handled as %)
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: '',
      discount: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: '', discount: 0 }),

      applyPromo: (code) => {
        const upper = code.toUpperCase().trim();
        if (VALID_PROMO_CODES[upper] !== undefined) {
          set({ promoCode: upper, discount: VALID_PROMO_CODES[upper] });
          return true;
        }
        return false;
      },

      removePromo: () => set({ promoCode: '', discount: 0 }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discount;
        if (discount === 0) return subtotal;
        return Math.round(subtotal * (1 - discount / 100));
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'd2p-cart-storage',
    }
  )
);
