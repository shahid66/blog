"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../auth&user/user.constant");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogControllers.createBlog);
router.get('/', blog_controller_1.BlogControllers.getBlogs);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogControllers.updateBlog);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogControllers.deleteBlogs);
exports.BlogRoutes = router;
