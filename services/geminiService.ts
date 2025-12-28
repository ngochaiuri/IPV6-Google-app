
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

// Removed global API_KEY definition to follow coding guidelines

/**
 * Gets a proxy recommendation from Gemini based on user input.
 * Strictly follows @google/genai guidelines for client initialization.
 */
export const getProxyRecommendation = async (userInput: string, lang: Language = 'vi') => {
  // Always use process.env.API_KEY directly in the named parameter.
  // Initialization is done inside the function to ensure it uses the current API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `You are a professional Proxy consultant for ProxyNuoiNick.
        Your goal is to suggest the best proxy type based on user needs (Facebook account farming, TikTok, Gaming, Ads, MMO).
        Language to respond in: ${lang}.
        Current offerings:
        1. IPv4 Shared: Cheap, good for multi-accounting.
        2. IPv4 Private: High speed, dedicated, for Ads or high reliability.
        3. IPv6: Extremely cheap, for IPv6 compatible tools.
        4. Residential: Residential IP, hardest to detect, best for checkouts or registration on strict sites.
        Keep your answer concise and professional.`,
      },
    });
    // Directly access .text property as per guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with AI.";
  }
};
