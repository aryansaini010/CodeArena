import mongoose, { Document, Schema } from 'mongoose';

export interface IContest extends Document {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  problems: mongoose.Types.ObjectId[];
  participants: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

const ContestSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IContest>('Contest', ContestSchema);
