import { Router } from 'express';
import { USER_ROLES } from '@prisma/client';
import { authorshipRequestController } from '../controllers/authorshipRequest.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
const router = Router();
router.use(protect);

router.post('/', authorshipRequestController.create);

router.get(
  '/',
  restrictTo([USER_ROLES.ADMIN]),
  authorshipRequestController.getAll,
);

router.get('/me', authorshipRequestController.userRequest);

router.patch(
  '/:id',
  restrictTo([USER_ROLES.ADMIN]),
  authorshipRequestController.updateStatus,
);

export const authorshipRequestRouter = router;
