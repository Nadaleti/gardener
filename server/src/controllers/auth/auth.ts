import { Request, Response, NextFunction } from 'express';

import AuthService from '../../services/auth';
import LoginResponse from './response/loginResponse';

const authService = new AuthService();

class AuthController {
  login(request: Request, response: Response, next: NextFunction) {
    const login: LoginRequest = request.body;

    authService.login(login.email, login.password)
      .then((token) => {response.status(200).json(new LoginResponse(token))})
      .catch((error) => {next(error)});
  }

  register(request: Request, response: Response, next: NextFunction) {
    const registration: RegistrationRequest = request.body;
    
    authService.register(registration)
      .then(() => {response.status(201).send()})
      .catch((error) => {next(error)});
  }
}

export default AuthController;
