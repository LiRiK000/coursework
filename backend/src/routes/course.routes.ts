import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { courseController } from '../controllers/course.controller';

const router = Router();
router.use(protect);

router.get('/', courseController.getAll);
router.post('/', restrictTo(['ADMIN'], ['AUTHOR']), courseController.create);
router.get('/:id', courseController.getById);
router.patch(
  '/:id',
  restrictTo(['ADMIN'], ['AUTHOR']),
  courseController.update,
);
router.delete(
  '/:id',
  restrictTo(['ADMIN'], ['AUTHOR']),
  courseController.delete,
);

export const courseRouter = router;
