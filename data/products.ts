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
  platform: 'Shopee' | 'Lazada' | 'TikTok';
};

// เพิ่มบรรทัดนี้ เพื่อให้เข้ากับโค้ดเดิม
export type Product = AffiliateProduct;

// ข้อมูลและฟังก์ชันอื่นๆ เหมือนเดิมครับ
export const affiliateProducts: AffiliateProduct[] = [
  // ... ข้อมูลสินค้าของคุณ
];

export function getAllProducts(): AffiliateProduct[] {
  return affiliateProducts;
}
export function getProductById(id: string): AffiliateProduct | undefined {
  return affiliateProducts.find(p => p.id === id);
}

// ฟังก์ชันต่างๆ เหมือนเดิม
export function getAllProducts(): AffiliateProduct[] {
  return affiliateProducts;
}
export function getProductById(id: string): AffiliateProduct | undefined {
  return affiliateProducts.find(p => p.id === id);
}

// ข้อมูลร้านค้า
export const affiliateShops = [
  { id: "1", name: "AD เทคโนโลยีความงามและอุปกรณ์ท", maxCommission: 82, url: "https://shopee.co.th/shop/1600612362" },
];

// ✅ เพิ่มฟังก์ชันที่หายไป
export function getAllProducts(): AffiliateProduct[] {
  return affiliateProducts;
}

export function getProductById(id: string): AffiliateProduct | undefined {
  return affiliateProducts.find(product => product.id === id);
}

export function searchProducts(keyword: string): AffiliateProduct[] {
  const lowerKeyword = keyword.toLowerCase();
  return affiliateProducts.filter(product => 
    product.name.toLowerCase().includes(lowerKeyword) ||
    product.shopName.toLowerCase().includes(lowerKeyword)
  );
}

export function getBestSellingProducts(limit = 10): AffiliateProduct[] {
  return affiliateProducts.slice(0, limit);
}
