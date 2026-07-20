import Link from 'next/link';
import CartCounter from '@/components/CartCounter';
import ShopAssistant from '@/components/ShopAssistant';
import type { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="th">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f9fafb' }}>
        {/* ส่วนหัวเมนู */}
        <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* โลโก้ */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <span className="text-xl font-bold text-orange-600">ShopThai</span>
            </Link>

            {/* ช่องค้นหา */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <input 
                type="text" 
                placeholder="ค้นหาสินค้า..." 
                className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* เมนูแพลตฟอร์ม */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">TikTok</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Lazada</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Shopee</a>
              <Link href="/cart" className="relative">
                <span className="text-xl">🛒</span>
                <CartCounter />
              </Link>
            </nav>
          </div>
        </header>

        {/* เนื้อหาหลัก */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* ผู้ช่วย AI */}
        <ShopAssistant />
      </body>
    </html>
  );
}
