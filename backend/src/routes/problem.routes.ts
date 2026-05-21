import express from 'express';
import { getProblems, getProblemBySlug, createProblem } from '../controllers/problem.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getProblems);
router.get('/:slug', getProblemBySlug);
// Admins only for createProblem ideally
router.post('/', protect, createProblem);

export default router;
