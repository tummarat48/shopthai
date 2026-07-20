import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { product, prompt } = await req.json();
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`${prompt}\n\nสินค้า: ${product.name}\nราคา: ${product.price} บาท\nข้อมูลเดิม: ${product.originalDesc}`);
  
  return Response.json({ text: result.response.text() });
}
