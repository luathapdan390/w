import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ManifestationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateWealthReasons = async (amount: string): Promise<ManifestationResponse> => {
  const modelId = "gemini-2.5-flash"; // Efficient for text generation

  const prompt = `
    Bạn là một chuyên gia về tư duy thịnh vượng (Wealth Consciousness) và ngôn ngữ học NLP. 
    Người dùng mong muốn sở hữu số tiền: ${amount} VND.
    
    Nhiệm vụ: Hãy viết ra chính xác 100 lý do/khẳng định (affirmations) tại sao người dùng đã, đang và sẽ sở hữu số tiền này.
    
    Yêu cầu cấu trúc cực kỳ quan trọng:
    1. **12 Thì Tiếng Anh (English Tenses):** Áp dụng cấu trúc ngữ pháp của 12 thì tiếng Anh nhưng viết bằng Tiếng Việt để tạo ra các mốc thời gian tâm lý (Ví dụ: "Tôi đã sở hữu...", "Tôi đang sở hữu...", "Tôi sẽ đang tận hưởng...", "Tôi đã hoàn thành việc thu hút...").
    2. **6 Nhu cầu của Tony Robbins:** Đảm bảo các lý do phủ sóng đủ 6 nhu cầu: Sự chắc chắn (Certainty), Sự đa dạng (Variety), Tầm quan trọng (Significance), Kết nối/Yêu thương (Connection), Phát triển (Growth), Cống hiến (Contribution).
    3. **Nguyên lý Quy Mô Lớn (Scale):** BẮT BUỘC chèn các cụm từ sau vào rải rác các câu: 
       - "Thành công cho 12 thế hệ"
       - "Gia tộc thịnh vượng"
       - "Đội nhóm nhân bản gấp 2 mỗi ngày"
       - "Chia sẻ bộ công thức hút nguồn lực cho 10 thế hệ"
       - "Tự do tài chính vĩnh viễn"
    
    Output Format: JSON object with a single property 'affirmations' which is an array of objects.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      affirmations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            category: { type: Type.STRING, description: "Kết hợp Nhu cầu và Thì (Ví dụ: Cống hiến - Tương lai đơn)" },
            content: { type: Type.STRING, description: "Nội dung khẳng định bằng tiếng Việt" },
          },
          required: ["id", "category", "content"],
        },
      },
    },
    required: ["affirmations"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Creativity balance
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ManifestationResponse;
    }
    throw new Error("No response text from Gemini");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
