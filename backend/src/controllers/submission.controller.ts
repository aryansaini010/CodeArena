import { Request, Response } from 'express';
import Submission from '../models/Submission';
import Problem from '../models/Problem';
import User from '../models/User';
import { executeCode } from '../services/judgeService';

interface AuthRequest extends Request {
  user?: any;
}

export const submitCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { problemId, languageId, code } = req.body;
    const userId = req.user.id;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      res.status(404).json({ message: 'Problem not found' });
      return;
    }

    let maxRuntime = 0;
    let maxMemory = 0;
    let finalVerdict = 'Accepted';

    for (const testCase of problem.testCases) {
      const result = await executeCode(languageId, code, testCase.input);

      if (result.status.description !== 'Accepted') {
        finalVerdict = result.status.description;
        break;
      }

      if (result.stdout?.trim() !== testCase.output.trim()) {
        finalVerdict = 'Wrong Answer';
        break;
      }

      maxRuntime = Math.max(maxRuntime, result.time || 0);
      maxMemory = Math.max(maxMemory, result.memory || 0);
    }

    const submission = await Submission.create({
      userId,
      problemId,
      language: languageId.toString(),
      code,
      verdict: finalVerdict,
      runtime: maxRuntime,
      memory: maxMemory,
    });

    if (finalVerdict === 'Accepted') {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { solvedProblems: problemId },
      });
    }

    res.json({
      submissionId: submission._id,
      verdict: finalVerdict,
      runtime: maxRuntime,
      memory: maxMemory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const runCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { languageId, code, input } = req.body;
    const result = await executeCode(languageId, code, input || '');
    res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status,
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Code execution failed' });
  }
};

export const getSubmissions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { problemId } = req.query;

    const query: any = { userId };
    if (problemId) query.problemId = problemId;

    const submissions = await Submission.find(query)
      .sort({ createdAt: -1 })
      .populate('problemId', 'title slug difficulty');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getSubmissionById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const submission = await Submission.findById(req.params.id).populate('problemId', 'title slug');
    if (!submission) {
      res.status(404).json({ message: 'Submission not found' });
      return;
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getActivityMap = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const submissions = await Submission.find({ userId });
    
    const map: Record<string, number> = {};
    submissions.forEach(s => {
      const date = new Date(s.createdAt).toISOString().split('T')[0];
      map[date] = (map[date] || 0) + 1;
    });
    
    res.json(map);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
