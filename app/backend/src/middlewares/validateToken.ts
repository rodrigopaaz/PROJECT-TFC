import { NextFunction, Response, Request } from 'express';

import handleToken from '../auth/jwtToken';

const ValidateToken = (req:Request, res:Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json(
        { message: 'Token not found' },
      );
    }
    handleToken.validateToken(authorization);
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token must be a valid token',
    });
  }
};

export default ValidateToken;
