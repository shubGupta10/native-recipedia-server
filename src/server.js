import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import recipeRouter from './routes/recipeRoute.js';
import job from './cron/cron.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
job.start();

app.use("/api", recipeRouter)

app.get('/', (req, res) => {
    res.send("Heyyyyyyyy")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening to PORT:${PORT}`);
    
})