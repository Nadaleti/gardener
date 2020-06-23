import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export class JWTService {
  generateAccessToken(userId: number) {
    return jwt.sign({id: userId}, process.env.TOKEN_SECRET as string, { expiresIn: 60800 });
  }
}
