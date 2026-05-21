import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  solvedProblems: mongoose.Types.ObjectId[];
  streak: number;
  ranking: number;
  badges: string[];
  submissions: mongoose.Types.ObjectId[];
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google OAuth users
    avatar: { type: String, default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default' },
    solvedProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    streak: { type: Number, default: 0 },
    ranking: { type: Number, default: 0 },
    badges: [{ type: String }],
    submissions: [{ type: Schema.Types.ObjectId, ref: 'Submission' }],
    googleId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
