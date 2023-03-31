import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../services/interfaces';
import { UsersService } from '../services';

export default class ValidateUser {
  constructor(private _service = new UsersService()) { }

  validateFields = ({ email, password }:IUser) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validateEmail = emailRegex.test(email);
    const validatePassword = password.length > 6;
    return validateEmail && validatePassword;
  };

  validateLogin = async (user:IUser) => {
    const { email, password } = user;
    if (!email || !password) return false;
    const users = await this._service.findUser(user);
    const checkPassword = await bcrypt.compare(password, users?.password || '');
    return users?.email !== email || !checkPassword;
  };

  validate = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const { email, password } = user;

    const validateLogin = await this.validateLogin(user);
    if (!email || !password) {
      return res.status(400)
        .json({ message: 'All fields must be filled' });
    }
    const validations = this.validateFields({ email, password });
    if (!validations || validateLogin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  };
}
