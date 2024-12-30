import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth&user/user.constant';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminControllers.deleteBlog);
router.post(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockUser,
);

export const AdminRoutes = router;
