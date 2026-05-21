import express from 'express';
import { submitCode, runCode, getSubmissions, getSubmissionById, getActivityMap } from '../controllers/submission.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/submit', protect, submitCode);
router.post('/run', protect, runCode);
router.get('/history', protect, getSubmissions);
router.get('/activity', protect, getActivityMap);
router.get('/:id', protect, getSubmissionById);

export default router;
