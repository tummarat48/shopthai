import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/data/products';
import AddToCartButton from '@/components/AddProductButton';

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* ปุ่มย้อนกลับ */}
        <Link href="/" className="inline-flex items-center text-orange-600 mb-6 hover:underline">
          ← กลับหน้าแรก
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* ภาพสินค้า */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                {product.platform}
              </span>
            </div>

            {/* รายละเอียดสินค้า */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>

              <div className="mb-4">
                <span className="text-3xl font-bold text-orange-600">
                  ฿{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 ml-3">ขายแล้ว {product.sales}</span>
              </div>

              <div className="space-y-2 mb-6 text-gray-700">
                <p><span className="font-medium">ร้านค้า:</span> {product.shopName}</p>
                <p><span className="font-medium">ค่าคอมมิชชัน:</span> {product.commissionRate}% (฿{product.commissionAmount.toLocaleString()})</p>
              </div>

              {/* ปุ่มทำงาน */}
              <div className="flex flex-col gap-3 mt-auto">
                <AddToCartButton product={product} />
                <a
                  href={product.offerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-orange-500 text-orange-600 text-center font-semibold rounded-xl hover:bg-orange-50 transition-colors"
                >
                  ไปซื้อสินค้าต้นทาง →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
