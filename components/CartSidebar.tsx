'use client';
import { X, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/data/products';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCartStore();

  if (!isOpen) return null;

  const handleCheckout = () => {
    alert('กำลังนำไปสู่ลิงก์ Affiliate... (ในระบบจริงจะเปิดหลายแท็บ)');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="flex-1 bg-black/60" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">ตะกร้าสินค้า</h2>
          <button onClick={onClose}><X size={28} /></button>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-20">ตะกร้าว่างเปล่า</p>
          ) : (
            cart.map((item: Product & { quantity: number }) => (
              <div key={item.id} className="flex gap-4 mb-8 border-b pb-8">
                <img src={item.img} alt="" className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-orange-600">{item.price} บาท</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 border rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 border rounded">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between text-xl mb-4">
              <span>ยอดรวม</span>
              <span className="font-bold">{totalPrice().toLocaleString()} บาท</span>
            </div>
            <button onClick={handleCheckout} className="w-full py-4 bg-green-600 text-white rounded-2xl text-lg font-semibold">
              ดำเนินการสั่งซื้อ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
