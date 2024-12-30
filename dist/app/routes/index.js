"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/admin/admin.route");
const user_route_1 = require("../modules/auth&user/user.route");
const blog_route_1 = require("../modules/blog/blog.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/blog',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
