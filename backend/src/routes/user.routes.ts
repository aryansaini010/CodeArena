import express from 'express';
import { getProfile, updateProfile, getSolvedStats, getAllUsers } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/all', protect, getAllUsers);
router.get('/stats', protect, getSolvedStats);
router.get('/stats/:id', protect, getSolvedStats);
router.get('/profile', protect, getProfile);
router.get('/profile/:id', protect, getProfile);
router.put('/update', protect, updateProfile);

export default router;
