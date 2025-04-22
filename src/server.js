import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import recipeRouter from './routes/recipeRoute.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", recipeRouter)

app.get('/', (req, res) => {
    res.send("Heyyyyyyyy")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening to PORT:${PORT}`);
    
})