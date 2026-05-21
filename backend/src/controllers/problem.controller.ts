import { Request, Response } from 'express';
import Problem from '../models/Problem';

export const getProblems = async (req: Request, res: Response): Promise<void> => {
  try {
    const problems = await Problem.find().select('-testCases -starterCode -editorial');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProblemBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug }).select('-testCases');
    if (!problem) {
      res.status(404).json({ message: 'Problem not found' });
      return;
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
