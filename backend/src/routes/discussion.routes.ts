import express from 'express';
import {
  createThread, getThreads, getThreadById,
  addReply, upvoteThread, downvoteThread, deleteThread,
} from '../controllers/discussion.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', protect, createThread);
router.post('/:id/reply', protect, addReply);
router.post('/:id/upvote', protect, upvoteThread);
router.post('/:id/downvote', protect, downvoteThread);
router.delete('/:id', protect, deleteThread);

export default router;
