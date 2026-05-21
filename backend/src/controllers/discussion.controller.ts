import { Request, Response } from 'express';
import Discussion from '../models/Discussion';

interface AuthRequest extends Request {
  user?: any;
}

export const createThread = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const thread = await Discussion.create({ ...req.body, author: req.user.id });
    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getThreads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { problemId } = req.query;
    const filter: any = {};
    if (problemId) filter.problemId = problemId;

    const threads = await Discussion.find(filter)
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar')
      .populate('replies.author', 'name avatar');
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getThreadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thread = await Discussion.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('replies.author', 'name avatar');
    if (!thread) {
      res.status(404).json({ message: 'Thread not found' });
      return;
    }
    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addReply = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const thread = await Discussion.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          replies: { author: req.user.id, content: req.body.content },
        },
      },
      { new: true }
    ).populate('replies.author', 'name avatar');
    if (!thread) {
      res.status(404).json({ message: 'Thread not found' });
      return;
    }
    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const upvoteThread = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const thread = await Discussion.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { upvotes: req.user.id },
        $pull: { downvotes: req.user.id },
      },
      { new: true }
    );
    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const downvoteThread = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const thread = await Discussion.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { downvotes: req.user.id },
        $pull: { upvotes: req.user.id },
      },
      { new: true }
    );
    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteThread = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const thread = await Discussion.findById(req.params.id);
    if (!thread) {
      res.status(404).json({ message: 'Thread not found' });
      return;
    }
    if (thread.author.toString() !== req.user.id) {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }
    await Discussion.deleteOne({ _id: req.params.id });
    res.json({ message: 'Thread deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
