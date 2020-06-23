import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    next();
  })
}
