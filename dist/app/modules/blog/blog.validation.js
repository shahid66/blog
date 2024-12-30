"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidations = void 0;
const zod_1 = require("zod");
const blogPostValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must not exceed 100 characters'),
    content: zod_1.z.string().min(10, 'Content must be at least 10 characters long'),
    isPublished: zod_1.z.boolean().default(true),
});
exports.blogValidations = {
    blogPostValidationSchema,
};
