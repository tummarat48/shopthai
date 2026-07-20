import { Product } from '@/data/products';

/**
 * แปลงเลขขายจากรูปแบบ "90พัน+" เป็นตัวเลข
 */
export function parseSalesNumber(salesStr: string): number {
  const cleaned = salesStr.replace(/[^\d]/g, ''); // เอาเฉพาะตัวเลข
  const num = parseInt(cleaned, 10);
  
  if (salesStr.includes('พัน')) {
    return num * 1000;
  } else if (salesStr.includes('หมื่น')) {
    return num * 10000;
  } else if (salesStr.includes('แสน')) {
    return num * 100000;
  } else if (salesStr.includes('ล้าน')) {
    return num * 1000000;
  }
  
  return num;
}

/**
 * ดึงสินค้าขายดีตามปริมาณการขาย
 */
export function getTopSellersByVolume(
  products: Product[],
  limit: number = 5
): Product[] {
  return [...products]
    .sort((a, b) => parseSalesNumber(b.sales) - parseSalesNumber(a.sales))
    .slice(0, limit);
}

/**
 * จัดรูปแบบข้อมูลสินค้าเพื่อให้ AI วิเคราะห์
 */
export function formatProductAnalysis(products: Product[]): string {
  const analysis = products.map((p, index) => `
${index + 1}. ${p.name}
   • ยอดขาย: ${p.sales}
   • ราคา: ${p.price} บาท
   • คอมมิชชั่น: ${p.commissionRate}% (${p.commissionAmount} บาท)
   • ร้าน: ${p.shopName}
   • แพลตฟอร์ม: ${p.platform}
  `.trim());
  
  return analysis.join('\n\n');
}

/**
 * เปรียบเทียบราคาสินค้า
 */
export function comparePriceRanges(products: Product[]): string {
  if (products.length === 0) return 'ไม่มีข้อมูลสินค้า';
  
  const prices = products.map(p => p.price).sort((a, b) => a - b);
  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  
  return `
สถิติราคาสินค้า:
• ราคาต่ำสุด: ${minPrice} บาท
• ราคาสูงสุด: ${maxPrice} บาท
• ราคาเฉลี่ย: ${avgPrice} บาท
• จำนวนสินค้า: ${products.length} รายการ
  `.trim();
}

/**
 * ดึงข้อมูลอัตราคอมมิชชั่น
 */
export function getCommissionStats(products: Product[]): string {
  if (products.length === 0) return 'ไม่มีข้อมูลคอมมิชชั่น';
  
  const rates = products.map(p => p.commissionRate).sort((a, b) => a - b);
  const amounts = products.map(p => p.commissionAmount).sort((a, b) => a - b);
  
  const minRate = rates[0];
  const maxRate = rates[rates.length - 1];
  const avgRate = Math.round((rates.reduce((a, b) => a + b, 0) / rates.length) * 100) / 100;
  
  const totalCommission = Math.round(amounts.reduce((a, b) => a + b, 0));
  
  return `
สถิติคอมมิชชั่น:
• อัตรา: ${minRate}% - ${maxRate}% (เฉลี่ย ${avgRate}%)
• คอมมิชชั่นรวม (ถ้าขายได้ทั้งหมด): ${totalCommission} บาท
  `.trim();
}
