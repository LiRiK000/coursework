import { getMe, login, register } from '../controllers/auth.controller';

import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';

export const authRouter = Router();

// Публичные маршруты
authRouter.post('/register', register);
authRouter.post('/login', login);

// Защищенные маршруты
authRouter.get('/me', protect, getMe);
