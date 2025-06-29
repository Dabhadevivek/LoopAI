import { Router } from 'express';
import { exportCSV } from '../controllers/exportController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, exportCSV);

export default router; 