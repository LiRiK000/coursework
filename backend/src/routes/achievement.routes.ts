import { Router } from 'express';
import { achievementController } from '../controllers/achievement.controller';
import { protect } from '../middleware/auth.middleware';

export const router = Router();

router.get('/', protect, achievementController.getAchievements);
router.post('/check', protect, achievementController.checkAchievements);

export const achievementRouter = router;
