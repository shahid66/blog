/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser extends Document {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

export type TLoginUser = {
  email: string;
  password: string;
};
