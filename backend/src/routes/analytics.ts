import { Router } from 'express';
import { summary, trends } from '../controllers/analyticsController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/summary', authMiddleware, summary);
router.get('/trends', authMiddleware, trends);

export default router; 