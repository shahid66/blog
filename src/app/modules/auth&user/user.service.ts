import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import { IUser, TLoginUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  const user = await User.findById(result._id);
  return user;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked

  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string,
  // );

  return {
    accessToken,
  };
};

const blockUserIntoDB = async (id: string) => {
  const isUserExist = await User.findOne({ _id: id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  blockUserIntoDB,
};
