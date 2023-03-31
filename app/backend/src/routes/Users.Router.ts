import { Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import { UsersController } from '../controllers';
import ValidateUser from '../middlewares/ValidateUser';

const validateUser = new ValidateUser();
const userController = new UsersController();

const router = Router();

router.post('/', validateUser.validate, userController.findByUser);

router.get('/role', ValidateToken, userController.findByRole);

export default router;
