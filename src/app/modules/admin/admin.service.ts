import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../auth&user/user.model';
import BlogPostModel from '../blog/blog.model';

const blockUserIntoDB = async (id: string) => {
  const isUserExist = await User.findOne({ _id: id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await BlogPostModel.findById(id);
  if (!result) {
    throw new Error('Delete not success');
  }

  return result;
};

export const adminServices = {
  deleteBlogFromDB,
  blockUserIntoDB,
};
