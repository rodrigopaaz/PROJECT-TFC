import { Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import { MatchesController } from '../controllers';
import ValidateTeams from '../middlewares/ValidateTeams';

const matchController = new MatchesController();
const validateTeams = new ValidateTeams();

const router = Router();

router.get('/', matchController.FilteredMatches);

router.post(
  '/',
  ValidateToken,
  validateTeams.validateEqual,
  validateTeams.validateMatch,
  matchController.CreateMAtch,
);

router.patch('/:id/finish', ValidateToken, matchController.FinishMatch);

router.patch('/:id', ValidateToken, matchController.UpdateMatch);

export default router;
