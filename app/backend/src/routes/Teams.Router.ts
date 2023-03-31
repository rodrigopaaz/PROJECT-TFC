import { Router } from 'express';
import { TeamController } from '../controllers';

const teamController = new TeamController();

const router = Router();

router.get('/', teamController.getAll);

router.get('/:id', teamController.findById);

export default router;
