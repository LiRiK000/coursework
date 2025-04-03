import { authRouter } from './routes/auth.routes';
import { certificateRouter } from './routes/certificate.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/certificates', certificateRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
