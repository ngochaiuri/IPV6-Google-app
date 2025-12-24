
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getProxyRecommendation = async (userInput: string) => {
  if (!API_KEY) return "Vui lòng cấu hình API Key để sử dụng tính năng này.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `Bạn là một chuyên gia tư vấn về Proxy cho người dùng Việt Nam. 
        Hãy tư vấn loại Proxy phù hợp nhất dựa trên nhu cầu của họ (ví dụ: nuôi nick Facebook, chạy ads, cày game, làm mmo).
        Các sản phẩm hiện có:
        1. IPv4 Shared: Rẻ, phù hợp nuôi nhiều nick.
        2. IPv4 Private: Tốc độ cao, dành cho chạy Ads hoặc cần độ tin cậy tuyệt đối.
        3. IPv6: Giá cực rẻ, phù hợp cho các tool hỗ trợ IPv6.
        4. Residential: Proxy dân cư, khó bị phát hiện nhất, dành cho việc đăng ký tài khoản khó hoặc checkout.
        
        Hãy trả lời ngắn gọn, súc tích và chuyên nghiệp bằng Tiếng Việt.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi gặp sự cố khi tư vấn. Vui lòng thử lại sau.";
  }
};
