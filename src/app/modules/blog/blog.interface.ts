import mongoose, { Document } from 'mongoose';

// Define the BlogPost interface
export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId; // Reference to the User model
  isPublished: boolean;

  authorizeDelete(userId: string, userRole: string): boolean;
}

export interface BlogCreation {
  title: string;
  content: string;
  author: string; // Reference to User ID
}
