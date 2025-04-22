import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAI = async (ingredients) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = `
        You are an expert chef and recipe creator. Using the following ingredients: ${ingredients.join(", ")}, create a delicious, easy-to-understand recipe in a mix of Hindi and English (Hinglish). Keep the tone professional but friendly, jaise ek experienced chef kisi naye cook ko samjha raha ho. Instructions should be step-by-step, clear, and helpful.
        
        Include:
        - Recipe ka naam (in Hinglish)
        - Prep time and cook time
        - Ingredients ki proper list
        - Step-by-step instructions in Hinglish
        - Serving suggestion
        
        Make sure the recipe feels personal, like you're guiding someone through it with a smile. Tone should be helpful and trustworthy, bina kisi vulgarity ke.`;
        

        const result = await model.generateContent(prompt);
        const recipe = result.response.text();
        console.log(recipe);
        return recipe;
    } catch (error) {
        console.error("Error generating recipe:", error);
        throw new Error("Something went wrong while generating the recipe.");
    }
};
