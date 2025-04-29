import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json({limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(express.static('public'));
app.use(cookieParser());

export default app;