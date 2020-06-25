import jwt from 'jsonwebtoken';

class JWTService {
  generateAccessToken(userId: number) {
    return jwt.sign({id: userId}, process.env.JWT_SECRET as string, { expiresIn: 60800 });
  }
}

export default JWTService;
