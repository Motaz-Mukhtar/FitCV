import model from "@/shared/lib/model";
import { validateAIResponse } from "@/shared/utils/prompt-security";

export class GenerateService {
  /**
   * Retry with exponential backoff
   */
  static async retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        const isLastAttempt = attempt === maxRetries - 1;
        const isRetryableError = 
          error.message?.includes('503') || 
          error.message?.includes('high demand') ||
          error.message?.includes('rate limit') ||
          error.message?.includes('429');

        if (!isRetryableError || isLastAttempt) {
          throw error;
        }

        // Exponential backoff: 1s, 2s, 4s
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  static async generate(promptData) {
    try {
      const { prompt, delimiters } = promptData;
      
      // Retry logic for API calls
      const result = await this.retryWithBackoff(async () => {
        return await model.generateContent(prompt);
      });

      const response = await result.response;

      // In case it's coming from the AI model at the server not gemini
      const text = typeof response === 'string' ? response : response.text();
      
      // Validate response for security issues
      if (!validateAIResponse(text, delimiters)) {
        console.error("AI response failed security validation");
        throw new Error("Generated content failed security checks");
      }
      
      // Clean up potential markdown formatting
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        const parsed = JSON.parse(cleaned);
        
        // Additional validation: ensure response doesn't contain delimiter tags
        const responseStr = JSON.stringify(parsed);
        if (!validateAIResponse(responseStr, delimiters)) {
          throw new Error("Parsed response contains suspicious content");
        }
        
        return parsed;
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", cleaned);
        throw new Error("Invalid AI response format");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      
      // Provide user-friendly error messages
      if (error.message?.includes('503') || error.message?.includes('high demand')) {
        throw new Error("AI service is currently experiencing high demand. Please try again in a few moments.");
      } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
        throw new Error("Rate limit exceeded. Please wait a moment before trying again.");
      } else if (error.message?.includes('401') || error.message?.includes('API key')) {
        throw new Error("API authentication failed. Please check your configuration.");
      } else if (error.message?.includes('Invalid AI response format')) {
        throw new Error("AI generated an invalid response. Please try again.");
      } else if (error.message?.includes('security checks')) {
        throw new Error("Generated content failed security validation. Please try again.");
      }
      
      throw error;
    }
  }
}
