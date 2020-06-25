import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import APIError from '../errors/APIError';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    next(new APIError('Unauthorized', 401));
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error: any) => {
    if (error) {
      next(new APIError('Forbidden', 403));
      return;
    }

    next();
  })
}
