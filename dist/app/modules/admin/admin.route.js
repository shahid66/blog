"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../auth&user/user.constant");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.deleteBlog);
router.post('/users/:userId/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.blockUser);
exports.AdminRoutes = router;
