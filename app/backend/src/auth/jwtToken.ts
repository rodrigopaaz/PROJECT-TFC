import * as jwt from 'jsonwebtoken';
import { IUser } from '../services/interfaces';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export const createToken = (user: IUser) => jwt.sign({ user }, secret, {
  algorithm: 'HS256',
  expiresIn: '7d',
});

export const validateToken = (token: string) => jwt.verify(token, secret);
