import { Router } from 'express';
import teamController from '../controllers';

const router = Router();

router.get('/', teamController.getAll);

router.get('/:id', teamController.findById);

export default router;
