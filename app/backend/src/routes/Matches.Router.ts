import { Router } from 'express';
import { MatchesController } from '../controllers';

const matchController = new MatchesController();

const router = Router();

router.get('/', matchController.GetMatchesNoFilter);

router.get('/:id', matchController.findById);

export default router;
