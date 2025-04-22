import express from 'express';
import { generateAI } from '../lib/generateRecipe.js';

const recipeRouter = express.Router();

recipeRouter.post("/generate-recipe", async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ message: "Ingredients are required and must be a non-empty array." });
        }

        const result = await generateAI(ingredients);  

        return res.status(200).json({
            message: "Successfully Generated",
            content: result
        });
    } catch (error) {
        console.error("Error generating recipe:", error);
        return res.status(500).json({
            message: "Something went wrong while generating the recipe",
            error: error.message || error
        });
    }
});

export default recipeRouter;
