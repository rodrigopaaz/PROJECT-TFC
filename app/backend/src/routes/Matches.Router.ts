import { Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import { MatchesController } from '../controllers';

const matchController = new MatchesController();

const router = Router();

router.get('/', matchController.FilteredMatches);

router.post('/', ValidateToken, matchController.CreateMAtch);

router.patch('/:id/finish', ValidateToken, matchController.FinishMatch);

router.patch('/:id', ValidateToken, matchController.UpdateMatch);

export default router;
