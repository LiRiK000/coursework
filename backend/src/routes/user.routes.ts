import { Router } from 'express';
import {
  updateProfile,
  updatePassword,
  getProfile,
  updateAvatar,
  resetAvatar,
} from '../controllers/user.controller';
import { upload } from '../middleware/upload.middleware';
import { protect } from '../middleware/auth.middleware';

export const userRouter = Router();

// Защищенные маршруты (требуют аутентификации)
userRouter.use(protect);

// Маршруты для управления профилем пользователя
userRouter.get('/profile', getProfile);
userRouter.patch('/profile', upload.single('avatar'), updateProfile);
userRouter.patch('/password', updatePassword);
userRouter.delete('/avatar', resetAvatar);
