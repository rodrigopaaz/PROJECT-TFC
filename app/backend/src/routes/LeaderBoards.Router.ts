import { Router } from 'express';

import LeaderBoard from '../controllers/LeaderBoard.Controller';

const leaderBoardController = new LeaderBoard();

const router = Router();

router.get('/home', leaderBoardController.HomeTeam);
router.get('/away', leaderBoardController.AwayTeam);

export default router;
