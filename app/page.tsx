import Link from 'next/link';
import Image from 'next/image';
import { affiliateProducts } from '@/data/products';
import AddToCartBtn from '@/components/AddProductButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ส่วนหัวแบนเนอร์หลัก */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            ช้อปสินค้าดี ราคาโดน ไม่ต้องออกจากเว็บ!
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto">
            รวมสินค้ายอดนิยมจากทุกแพลตฟอร์ม TikTok • Lazada • Shopee พร้อม AI แนะนำสินค้าส่วนตัว และรับค่าคอมมิชชันพิเศษ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-block bg-white text-orange-600 font-bold px-10 py-4 rounded-full hover:bg-gray-50 transition-all shadow-xl text-lg"
            >
              เริ่มช้อปเลย →
            </Link>
            <Link 
              href="/cart" 
              className="inline-block bg-transparent border-2 border-white text-white font-semibold px-10 py-4 rounded-full hover:bg-white/10 transition-all text-lg"
            >
              ดูตะกร้าสินค้า 🛒
            </Link>
          </div>
        </div>
      </section>

      {/* ส่วนแสดงสินค้าแนะนำ */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">สินค้าแนะนำยอดฮิต</h2>
            <p className="text-gray-500 mt-2">คัดสรรสินค้าคุณภาพ ราคาประหยัด พร้อมส่งทันที</p>
          </div>
          <Link href="/products" className="hidden md:block text-orange-600 font-medium hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>

        {/* ตารางสินค้า */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {affiliateProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* ภาพสินค้าเต็มขนาด */}
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                {/* ป้ายแพลตฟอร์ม */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                  {product.platform}
                </span>
                {/* ป้ายคอมมิชชัน */}
                <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  คอมฯ {product.commissionRate}%
                </span>
              </div>

              {/* ข้อมูลรายละเอียดสินค้า */}
              <div className="p-6">
                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* ราคาและยอดขาย */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-orange-600">฿{product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-2">/ ชิ้น</span>
                  </div>
                  <span className="text-sm text-gray-500">ขายแล้ว {product.sales}</span>
                </div>

                {/* ชื่อร้านค้า */}
                <p className="text-sm text-gray-600 mb-5">
                  ร้านค้า: <span className="font-medium">{product.shopName}</span>
                </p>

                {/* ปุ่มทำงาน */}
                <div className="flex flex-col gap-3">
                  <AddToCartBtn product={product} />
                  <Link 
                    href={`/products/${product.id}`}
                    className="w-full py-2.5 border border-orange-500 text-orange-600 rounded-xl text-center font-medium hover:bg-orange-50 transition-colors"
                  >
                    ดูรายละเอียด + AI แนะนำ
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ปุ่มดูทั้งหมดสำหรับมือถือ */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-xl font-medium">
            ดูสินค้าทั้งหมด →
          </Link>
        </div>
      </section>

      {/* ส่วนข้อมูลเพิ่มเติม */}
      <section className="bg-white py-12 px-4 border-t">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="font-semibold text-gray-800 mb-2">ไม่ต้องออกจากเว็บ</h4>
              <p className="text-sm text-gray-500">ช้อป ค้นหา ดูรายละเอียด ครบทุกฟีเจอร์ภายในที่เดียว</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold text-gray-800 mb-2">รับค่าคอมมิชชันพิเศษ</h4>
              <p className="text-sm text-gray-500">ทุกการสั่งซื้อผ่านลิงก์ของเรา คุณจะได้รับส่วนแบ่งค่าคอมมิชชัน</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-3">🤖</div>
              <h4 className="font-semibold text-gray-800 mb-2">มี AI ช่วยแนะนำ</h4>
              <p className="text-sm text-gray-500">แชทถามข้อมูลสินค้า เปรียบเทียบราคา ได้ตลอดเวลา</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
