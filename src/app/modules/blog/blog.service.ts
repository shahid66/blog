import QueryBuilder from '../../builder/QueryBuilder';
import { BlogCreation } from './blog.interface';
import BlogPostModel from './blog.model';

const createBlogInToDB = async (payload: BlogCreation) => {
  const result = await BlogPostModel.create(payload);
  if (!result) {
    throw new Error('Something Went Wrong');
  }
  const populatedPost = await BlogPostModel.findById(result._id).populate(
    'author',
    'name email',
  );
  return populatedPost;
};
const getBlogsFromDB = async (queryData: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder<typeof BlogPostModel>(queryData);
  const { query, sort } = queryBuilder.buildQuery();
  const result = await BlogPostModel.find(query)
    .sort(sort)
    .populate('author', 'name email');
  if (!result) {
    throw new Error('Something Went Wrong');
  }
  return result;
};
const updateBlogInToDB = async (id: string, payload: BlogCreation) => {
  const result = await BlogPostModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new Error('Blog Not Found Or Blog not Updated ');
  }
  const populatedPost = await BlogPostModel.findById(id).populate(
    'author',
    'name email',
  );
  return populatedPost;
};
const deleteBlogFromDB = async (id: string) => {
  const result = await BlogPostModel.findById(id);
  if (!result) {
    throw new Error('Delete not success');
  }

  return result;
};

export const BlogServices = {
  createBlogInToDB,
  getBlogsFromDB,
  updateBlogInToDB,
  deleteBlogFromDB,
};
