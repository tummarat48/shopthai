import { GoogleGenerativeAI } from '@google/generative-ai';

// ป้องกันการสร้างอ็อบเจกต์ซ้ำซ้อนขณะพัฒนา
const globalGemini = globalThis as unknown as { gemini?: GoogleGenerativeAI };

if (!globalGemini.gemini) {
  globalGemini.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
}

export const gemini = globalGemini.gemini;
export const model = gemini.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1000,
  },
});
