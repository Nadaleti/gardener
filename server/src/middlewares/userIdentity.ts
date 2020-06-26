import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import APIError from '../errors/APIError';

export const verifyUserIdentity = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return;

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: number};
  const jwtUserId = decoded.id;
  const pathUserId = Number.parseInt(req.params['userId']);

  if (jwtUserId !== pathUserId) {
    next(new APIError('User id mismatch', 403));
  }

  next();
}
