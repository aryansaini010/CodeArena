import mongoose, { Document, Schema } from 'mongoose';

export interface IDiscussion extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  problemId?: mongoose.Types.ObjectId;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  replies: {
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
  tags: string[];
}

const DiscussionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: Schema.Types.ObjectId, ref: 'Problem' },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    replies: [
      {
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IDiscussion>('Discussion', DiscussionSchema);
