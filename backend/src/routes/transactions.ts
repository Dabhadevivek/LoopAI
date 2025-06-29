import { Router } from 'express';
import { getTransactions, addTransaction, seedTransactions } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getTransactions);
router.post('/', authMiddleware, addTransaction);
router.post('/seed', authMiddleware, seedTransactions);

export default router; 