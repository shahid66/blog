"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_model_1 = __importDefault(require("./blog.model"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const newPayload = {
        title: (_a = req.body) === null || _a === void 0 ? void 0 : _a.title,
        content: (_b = req.body) === null || _b === void 0 ? void 0 : _b.content,
        author: req.user.userId,
    };
    const result = yield blog_service_1.BlogServices.createBlogInToDB(newPayload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Blog create successfully',
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
const getBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.getBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blogs is retrieved successfully',
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const user = req.user; // Extracted from authentication middleware
    const postId = req.params.id;
    const newPayload = {
        title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.title,
        content: (_d = req.body) === null || _d === void 0 ? void 0 : _d.content,
        author: req.user.userId,
    };
    // Fetch the blog post
    const blog = yield blog_model_1.default.findById(postId);
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: 'Blog post not found.',
        });
    }
    // Check if the user is authorized to delete the blog
    const isAuthorized = blog.authorizeDelete(user.userId, user.role);
    if (!isAuthorized) {
        return res.status(403).json({
            success: false,
            message: 'You are not authorized to delete this blog post.',
        });
    }
    const result = yield blog_service_1.BlogServices.updateBlogInToDB(req.params.id, newPayload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const deleteBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Extracted from authentication middleware
    const postId = req.params.id;
    // Fetch the blog post
    const blog = yield blog_model_1.default.findById(postId);
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: 'Blog post not found.',
        });
    }
    // Check if the user is authorized to delete the blog
    const isAuthorized = blog.authorizeDelete(user.userId, user.role);
    if (!isAuthorized) {
        return res.status(403).json({
            success: false,
            message: 'You are not authorized to delete this blog post.',
        });
    }
    const result = yield blog_service_1.BlogServices.deleteBlogFromDB(postId);
    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: http_status_1.default.OK,
    });
}));
exports.BlogControllers = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlogs,
};
