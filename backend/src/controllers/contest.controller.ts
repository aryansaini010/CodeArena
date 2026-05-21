import { Request, Response } from 'express';
import Contest from '../models/Contest';

interface AuthRequest extends Request {
  user?: any;
}

export const createContest = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const contest = await Contest.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(contest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getContests = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contests = await Contest.find()
      .sort({ startTime: -1 })
      .populate('problems', 'title difficulty')
      .populate('createdBy', 'name');
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getContestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate('problems', 'title difficulty slug')
      .populate('participants', 'name avatar')
      .populate('createdBy', 'name');
    if (!contest) {
      res.status(404).json({ message: 'Contest not found' });
      return;
    }
    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const joinContest = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { participants: req.user.id } },
      { new: true }
    );
    if (!contest) {
      res.status(404).json({ message: 'Contest not found' });
      return;
    }
    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate('participants', 'name avatar ranking');
    if (!contest) {
      res.status(404).json({ message: 'Contest not found' });
      return;
    }
    // Sort participants by ranking for leaderboard
    const leaderboard = (contest.participants as any[]).sort(
      (a: any, b: any) => (b.ranking || 0) - (a.ranking || 0)
    );
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
