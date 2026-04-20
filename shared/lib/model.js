import { GoogleGenerativeAI } from "@google/generative-ai";


class FitCVModel {
    constructor () {
        this.MODEL_API = process.env.MODEL_API;
        this.MODEL_NAME = process.env.MODEL_NAME;
    }

    /**
     * Generate resume content
     * @param {string} prompt 
     * @returns - Return the AI Response
     */
    async generateContent(prompt) {
        // Send the prompt to the AI model and pass the token
        try {
            const result = await axios(`${this.MODEL_API}/api/generate`, prompt);
    
            return result.response;
        } catch(error) {
            console.log(`Error while generating content: ${error.message}`);
            throw new Error(error.message);
        }
    }

    async isEnabled() {
        try {
            if (!this.MODEL_API || typeof this.model !== 'string')
                return false;
    
            const result = await axios(`${this.MODEL_API}`);
    
            if (result.response) return true
    
            return false;
        } catch(error) {
            return false;
        }
    }
};


let model;

model = new FitCVModel();

// If fitcv model is not enabled then the app will
// use gemini as an alternative.
try {
    if (await model.isEnabled());
    else {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL_NAME,
        });
    }
} catch(error) {
    console.log(`Error while init AI model: ${error.message}`);
}

export default model;