import {
  getMe,
  login,
  register,
  refreshTokens,
  logout,
} from '../controllers/auth.controller';

import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';

export const authRouter = Router();

// Публичные маршруты
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refreshTokens);
authRouter.post('/logout', logout);

// Защищенные маршруты
authRouter.get('/me', protect, getMe);
