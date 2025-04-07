import { Router } from 'express';
import { progressController } from '../controllers/progress.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();
router.use(protect);

router.post('/progress/validate', progressController.validateAnswer);

router.get('/courses/:courseId/progress', progressController.getProgress);

export const progressRouter = router;
