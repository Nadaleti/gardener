import { Request, Response, NextFunction } from 'express';

import AuthService from '../../services/auth';

const authService = new AuthService();

class AuthController {
  register(request: Request, response: Response, next: NextFunction) {
    const registration: RegistrationRequest = request.body;
    
    authService.register(registration)
      .then(() => {response.status(201).send()})
      .catch((error) => {next(error)});
  }
}

export default AuthController;
