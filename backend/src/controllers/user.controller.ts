import { Request, Response } from 'express';
import User from '../models/User';
import Submission from '../models/Submission';

interface AuthRequest extends Request {
  user?: any;
}

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id || req.user.id)
      .select('-password')
      .populate('solvedProblems', 'title difficulty slug');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, avatar },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getSolvedStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.params.id || req.user.id;
    const submissions = await Submission.find({ userId, verdict: 'Accepted' }).populate(
      'problemId',
      'difficulty'
    );

    const stats = { easy: 0, medium: 0, hard: 0, total: 0 };
    const seen = new Set<string>();

    submissions.forEach((sub) => {
      const problem = sub.problemId as any;
      if (!problem || seen.has(problem._id.toString())) return;
      seen.add(problem._id.toString());
      const diff = problem.difficulty;
      if (diff === 'Easy') stats.easy++;
      else if (diff === 'Medium') stats.medium++;
      else if (diff === 'Hard') stats.hard++;
      stats.total++;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ ranking: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
