import Image from 'next/image';
import { notFound } from 'next/navigation';
import { affiliateProducts, type AffiliateProduct } from '@/data/products';
import AddToCartButton from '@/components/AddProductButton';

// ... ส่วนอื่นๆ เหมือนเดิม

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = affiliateProducts.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* รูปสินค้า */}
        <div className="relative aspect-square rounded-xl overflow-hidden border">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* ข้อมูลสินค้า */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500">ร้านค้า: {product.shopName} • ขายแล้ว {product.sales}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-red-600">฿{product.price.toLocaleString()}</p>
            <p className="text-sm text-red-500 mt-1">รับค่าคอมมิชชัน {product.commissionRate}% ({product.commissionAmount.toLocaleString()} บาท)</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">รายละเอียดสินค้า</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ สินค้าตรงตามรูป</li>
              <li>✅ จัดส่งจากไทย</li>
              <li>✅ คืนสินค้าได้ภายใน 7 วัน</li>
              <li>✅ รับประกันความพึงพอใจ</li>
            </ul>
          </div>

          {/* ปุ่มทำงาน */}
          <div className="flex flex-col gap-3 mt-auto">
            <AddToCartButton product={product} />
            <a
              href={product.offerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-center rounded-lg font-medium transition-colors"
            >
              🔗 สั่งซื้อที่ Shopee (ลิงก์ Affiliate)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
