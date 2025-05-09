import { Router } from 'express';
import { favoriteController } from '../controllers/favorite.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();
router.use(protect);

router.get('/', favoriteController.getFavoriteCourses);
router.post('/:courseId', favoriteController.toggleFavorite);

export const favoriteRouter = router;
