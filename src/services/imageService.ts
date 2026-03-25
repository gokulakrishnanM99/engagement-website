import { GoogleGenAI } from "@google/genai";

export async function generateWeddingImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const bridePrompt = "A beautiful 3D animated style Indian bride (Pixar/Disney style) in traditional wedding attire, wearing elegant jewelry, soft lighting, cinematic, deep burgundy and gold theme, high resolution.";
  const groomPrompt = "A handsome 3D animated style Indian groom (Pixar/Disney style) in traditional wedding attire (Sherwani), elegant and sophisticated, soft lighting, cinematic, deep burgundy and gold theme, high resolution.";

  const brideResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: bridePrompt }] },
  });

  const groomResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: groomPrompt }] },
  });

  let brideUrl = "";
  let groomUrl = "";

  for (const part of brideResponse.candidates[0].content.parts) {
    if (part.inlineData) {
      brideUrl = `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  for (const part of groomResponse.candidates[0].content.parts) {
    if (part.inlineData) {
      groomUrl = `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  return { brideUrl, groomUrl };
}
