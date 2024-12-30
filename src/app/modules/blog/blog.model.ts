import mongoose, { model, Schema } from 'mongoose';
import { User } from '../auth&user/user.model';
import { IBlogPost } from './blog.interface';

// Define the BlogPost schema
const BlogPostSchema: Schema<IBlogPost> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save middleware to check if the author exists
BlogPostSchema.pre('save', async function (next) {
  const authorExists = await User.findById(this.author);
  if (!authorExists) {
    const error = new Error('Author not found. Cannot create blog post.');
    next(error);
  } else {
    next();
  }
});

// Instance method to check authorization
BlogPostSchema.methods.authorizeDelete = function (
  userId: string,
  userRole: string,
): boolean {
  return userRole === 'admin' || this.author.toString() === userId;
};

// Create the BlogPost model
const BlogPostModel = model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPostModel;
