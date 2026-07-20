export type AffiliateProduct = {
  id: string;
  name: string;
  price: number;
  sales: string;
  shopName: string;
  commissionRate: number;
  commissionAmount: number;
  productUrl: string;
  offerUrl: string;
  imageUrl: string;
  // เพิ่มฟิลด์ image ให้ตรงกับที่เรียกใช้
  image: string;
  platform: 'Shopee' | 'Lazada' | 'TikTok';
};

export type Product = AffiliateProduct;

// ข้อมูลสินค้าทั้งหมด ต้องมี image ทุกอัน
export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "29401703698",
    name: "หูฟังไร้สาย คุณภาพสูง",
    price: 890,
    sales: "90พัน+",
    shopName: "ร้าน Gadget Pro",
    commissionRate: 12,
    commissionAmount: 106.8,
    productUrl: "https://shopee.co.th/product/1019521485/29401703698",
    offerUrl: "https://s.shopee.co.th/BSLrASdCp",
    imageUrl: "https://picsum.photos/id/1/400/300",
    image: "https://picsum.photos/id/1/400/300",
    platform: "Shopee"
  }
  // ... สินค้าอื่นๆ เหมือนเดิม อย่าลืมเพิ่ม image ทุกอัน
];

export function getAllProducts(): Product[] { return affiliateProducts; }
export function getProductById(id: string): Product | undefined {
  return affiliateProducts.find(p => p.id === id);
}
