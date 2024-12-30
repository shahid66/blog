import { Router } from 'express';
import { AdminRoutes } from '../modules/admin/admin.route';
import { UserRoutes } from '../modules/auth&user/user.route';
import { BlogRoutes } from '../modules/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },

  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
