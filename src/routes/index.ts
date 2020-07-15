import express from 'express';
import { catchErrors } from '../handlers/errors';
import { getWeeklyChartList } from '../controllers/musicController';

const router = express.Router();

router.get('/api/v0/getWeeklyChartList', catchErrors(getWeeklyChartList));

export default router;
