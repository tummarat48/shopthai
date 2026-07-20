import { create } from 'zustand';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.findIndex(item => item.id === product.id);
    if (existing !== -1) {
      const updated = [...state.cart];
      updated[existing].quantity += 1;
      return { cart: updated };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
  totalItems: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
