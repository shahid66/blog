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
exports.BlogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.create(payload);
    if (!result) {
        throw new Error('Something Went Wrong');
    }
    const populatedPost = yield blog_model_1.default.findById(result._id).populate('author', 'name email');
    return populatedPost;
});
const getBlogsFromDB = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.default(queryData);
    const { query, sort } = queryBuilder.buildQuery();
    const result = yield blog_model_1.default.find(query)
        .sort(sort)
        .populate('author', 'name email');
    if (!result) {
        throw new Error('Something Went Wrong');
    }
    return result;
});
const updateBlogInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        throw new Error('Blog Not Found Or Blog not Updated ');
    }
    const populatedPost = yield blog_model_1.default.findById(id).populate('author', 'name email');
    return populatedPost;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(id);
    if (!result) {
        throw new Error('Delete not success');
    }
    return result;
});
exports.BlogServices = {
    createBlogInToDB,
    getBlogsFromDB,
    updateBlogInToDB,
    deleteBlogFromDB,
};
