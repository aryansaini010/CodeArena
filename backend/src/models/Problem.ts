import mongoose, { Document, Schema } from 'mongoose';

export interface IProblem extends Document {
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: { inputText: string; outputText: string; explanation?: string }[];
  constraints: string[];
  testCases: { input: string; output: string }[];
  starterCode: { language: string; code: string }[];
  editorial?: string;
  tags: string[];
  companies: string[];
}

const ProblemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    description: { type: String, required: true },
    examples: [
      {
        inputText: { type: String },
        outputText: { type: String },
        explanation: { type: String },
      },
    ],
    constraints: [{ type: String }],
    testCases: [
      {
        input: { type: String },
        output: { type: String },
      },
    ],
    starterCode: [
      {
        language: { type: String },
        code: { type: String },
      },
    ],
    editorial: { type: String },
    tags: [{ type: String }],
    companies: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProblem>('Problem', ProblemSchema);
