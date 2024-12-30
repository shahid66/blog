import catchAsync from '../../utils/catchAsync';
import { adminServices } from './admin.service';

const deleteBlog = catchAsync(async (req, res) => {
  const result = await adminServices.deleteBlogFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const result = await adminServices.blockUserIntoDB(req.params.userId);
  res.status(200).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});

export const AdminControllers = {
  deleteBlog,
  blockUser,
};
