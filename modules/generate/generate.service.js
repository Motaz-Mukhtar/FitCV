import model from "@/shared/lib/gemini";

export class GenerateService {
  static async generate(prompt) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean up potential markdown formatting (sometimes Gemini adds it anyway)
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        return JSON.parse(cleaned);
      } catch (parseError) {
        console.error("Failed to parse Gemini response as JSON:", cleaned);
        throw new Error("Invalid AI response format");
      }
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  }
}
