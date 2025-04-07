import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { courseController } from '../controllers/course.controller';

const router = Router();
router.use(protect);

router.get('/', courseController.getAll);
router.post('/', restrictTo('AUTHOR'), courseController.create);
router.get('/:id', courseController.getById);
router.patch('/:id', restrictTo('AUTHOR'), courseController.update);
router.delete('/:id', restrictTo('AUTHOR'), courseController.delete);

export const courseRouter = router;
