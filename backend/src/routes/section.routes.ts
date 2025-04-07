import { Router } from 'express';
import { sectionController } from '../controllers/section.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = Router();
router.use(protect);

router.post(
  '/courses/:courseId/sections',
  restrictTo('AUTHOR'),
  sectionController.create,
);

router.get('/courses/:courseId/sections', sectionController.getAll);
router.get('/sections/:id', sectionController.getById);
router.patch('/sections/:id', restrictTo('AUTHOR'), sectionController.update);
router.delete('/sections/:id', restrictTo('AUTHOR'), sectionController.delete);

export const sectionRouter = router;
