import { Router } from 'express';
import UsersController from '../controllers/User.Controller';
import ValidateUser from '../middlewares/ValidateUser';

const validateUser = new ValidateUser();
const userController = new UsersController();

const router = Router();

router.post('/', validateUser.validate, userController.findByUser);

export default router;
