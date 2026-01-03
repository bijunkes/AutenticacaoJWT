import express from 'express';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando');
})