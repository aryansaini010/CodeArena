import express from 'express';
import { createContest, getContests, getContestById, joinContest, getLeaderboard } from '../controllers/contest.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getContests);
router.get('/:id', getContestById);
router.post('/', protect, createContest);
router.post('/:id/join', protect, joinContest);
router.get('/:id/leaderboard', getLeaderboard);

export default router;
