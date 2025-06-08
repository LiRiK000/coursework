import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { sectionRouter } from './routes/section.routes';
import { progressRouter } from './routes/progress.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { errorHandler } from './middleware/error.middleware';
import express from 'express';
import { courseRouter } from './routes/course.routes';
import { achievementRouter } from './routes/achievement.routes';
import { authorshipRequestRouter } from './routes/authorshipRequest.routes';
import { favoriteRouter } from './routes/favorite.routes';
import { setupSwagger } from './lib/swagger';
import certificateRoutes from './routes/certificate.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
};
// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Middleware
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Swagger setup
setupSwagger(app);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/courses', courseRouter);
app.use('/api/progress', progressRouter);
app.use('/api/achievements', achievementRouter);
app.use('/api/authorship/request', authorshipRequestRouter);
app.use('/api/favorites', favoriteRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`,
  );
});
