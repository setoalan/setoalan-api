import express from 'express';
import { getWeeklyChartList } from '../controllers/musicController';

const router = express.Router();

router.get('/api/v0/getWeeklyChartList', getWeeklyChartList);

export default router;
