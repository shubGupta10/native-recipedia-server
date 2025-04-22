import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

export const generateAI = async (ingredients) => {
    try {
        const prompt = `
        You are an expert Indian chef who explains recipes to complete beginners in a clear, step-by-step, friendly style using **Hinglish** (mix of Hindi and English).
        
        Using the following ingredients: ${ingredients.join(", ")}, generate a complete and **detailed** recipe that any beginner can easily follow.
        
        ⚠️ IMPORTANT: Return the output in **strict JSON format** only — no extra text, no explanation outside the JSON.
        
        The structure should be:
        
        {
          "name": "Recipe ka naam (Hinglish)",
          "prepTime": "Preparation time (e.g. 10 mins)",
          "cookTime": "Cooking time (e.g. 20 mins)",
          "ingredients": [
            "ingredient 1",
            "ingredient 2",
            ...
          ],
          "instructions": [
            "Step 1: Detail mein batao kya karna hai, kaise karna hai aur kyun zaroori hai.",
            "Step 2: Har step simple Hinglish mein ho, jaise kisi beginner ko guide kar rahe ho.",
            "Step 3: Tips bhi do jaise 'flame medium rakho' ya 'yahan dhyan dena, jaldi jal sakta hai'."
          ],
          "servingSuggestion": "Recipe serve karne ka best tareeka, kis ke saath enjoy karein."
        }
        
        ✅ Guidelines:
        - Instructions should be **detailed**, not short. Har step explain karo with what, why, how.
        - Tone: Helpful, friendly, like a chef on YouTube teaching someone who’s never cooked.
        - Keep Hinglish simple and clear. Avoid slang and jokes.
        - Do not break JSON structure.
        `;

        // Generate recipe content.
        const result = await model.generateContent(prompt);

        // Handle the response properly, assuming it's a text response.
        const recipe = result.response.text ? result.response.text() : result.response;

        console.log(recipe);
        return recipe;
    } catch (error) {
        console.error("Error generating recipe:", error.message || error);
        throw new Error("Something went wrong while generating the recipe.");
    }
};
