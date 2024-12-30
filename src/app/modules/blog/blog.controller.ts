import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogCreation } from './blog.interface';
import BlogPostModel from './blog.model';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const newPayload: BlogCreation = {
    title: req.body?.title,
    content: req.body?.content,
    author: req.user.userId,
  };
  const result = await BlogServices.createBlogInToDB(newPayload);

  sendResponse(res, {
    success: true,
    message: 'Blog create successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const getBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs is retrieved successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const user = req.user; // Extracted from authentication middleware
  const postId = req.params.id;

  const newPayload: BlogCreation = {
    title: req.body?.title,
    content: req.body?.content,
    author: req.user.userId,
  };

  // Fetch the blog post
  const blog = await BlogPostModel.findById(postId);
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
  const result = await BlogServices.updateBlogInToDB(req.params.id, newPayload);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteBlogs = catchAsync(async (req, res) => {
  const user = req.user; // Extracted from authentication middleware
  const postId = req.params.id;

  // Fetch the blog post
  const blog = await BlogPostModel.findById(postId);
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
  const result = await BlogServices.deleteBlogFromDB(postId);

  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const BlogControllers = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlogs,
};
