import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth&user/user.constant';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), BlogControllers.createBlog);
router.get('/', BlogControllers.getBlogs);
router.put('/:id', auth(USER_ROLE.user), BlogControllers.updateBlog);
router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlogs);

export const BlogRoutes = router;
